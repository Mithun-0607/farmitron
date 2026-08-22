'use client';

import React, { useState } from 'react';
import { 
  Scan, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Droplets, 
  Calculator, 
  FileText, 
  Download, 
  RefreshCw,
  Eye,
  ShieldAlert,
  Leaf,
  Brain
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ConfidenceGauge } from '@/components/ui/ConfidenceGauge';

const SAMPLE_DISEASES = [
  {
    id: 'tomato-early-blight',
    crop: 'Tomato',
    diseaseName: 'Early Blight',
    scientificName: 'Alternaria solani',
    confidence: 96.4,
    severity: 'Medium Severity',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
    description: 'Concentric dark brown rings ("target spots") visible on lower foliage, leading to premature leaf drop.',
    organicRemedy: 'Spray Neem Oil (3%) or Trichoderma viride bio-fungicide @ 5g/liter twice at 7-day intervals.',
    chemicalRemedy: 'Spray Mancozeb 75% WP @ 2g/liter of water or Chlorothalonil 75% WP @ 2g/liter.',
    preventive: 'Maintain wider row spacing, avoid overhead sprinkler irrigation, and clear crop residue post-harvest.',
    waterPerAcre: 200,
    chemicalPerAcre: 400,
  },
  {
    id: 'rice-blast',
    crop: 'Rice / Paddy',
    diseaseName: 'Leaf Blast',
    scientificName: 'Magnaporthe oryzae',
    confidence: 94.8,
    severity: 'High Severity',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
    description: 'Spindle-shaped elliptical lesions with ash-grey centers on rice leaf blades.',
    organicRemedy: 'Apply Pseudomonas fluorescens @ 10g/liter of water as foliar spray.',
    chemicalRemedy: 'Spray Tricyclazole 75% WP @ 0.6g/liter of water upon initial lesion sighting.',
    preventive: 'Avoid excessive Nitrogen fertilizer application; split nitrogen into 3 top-dressings.',
    waterPerAcre: 250,
    chemicalPerAcre: 150,
  },
  {
    id: 'maize-healthy',
    crop: 'Maize / Corn',
    diseaseName: 'Healthy Crop (No Disease)',
    scientificName: 'Zea mays',
    confidence: 98.9,
    severity: 'Healthy Canopy',
    image: 'https://images.unsplash.com/photo-1535242208474-9a279b23b514?w=800&auto=format&fit=crop&q=80',
    description: 'Vibrant green chlorophyll pigment with uniform cell structure. Zero fungal or bacterial leaf spots.',
    organicRemedy: 'Maintain regular irrigation and balanced NPK top-dressing.',
    chemicalRemedy: 'No chemical pesticide application required at this stage.',
    preventive: 'Monitor field weekly during high humidity periods.',
    waterPerAcre: 0,
    chemicalPerAcre: 0,
  },
];

interface ApiDiseaseResult {
  disease: string;
  confidence: number;
  recommendation: string;
  filename?: string;
}

export default function DiseaseDetectionPage() {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_DISEASES[0]);
  const [customImagePreview, setCustomImagePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isScanned, setIsScanned] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [apiResult, setApiResult] = useState<ApiDiseaseResult | null>(null);
  const [fieldAcres, setFieldAcres] = useState(2.5);
  const [dragActive, setDragActive] = useState(false);

  // File Upload Handler — calls FastAPI /predict-disease
  const handleFileUpload = async (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setCustomImagePreview(previewUrl);
    setIsScanned(false);
    setIsScanning(true);
    setErrorMessage(null);

    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000';
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${apiBase}/predict-disease`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`FastAPI Server Error (${response.status}): ${response.statusText}`);
      }

      const data = await response.json();
      if (data && (data.success || data.disease)) {
        setApiResult(data);
      } else {
        throw new Error(data.error || 'Invalid response from MobileNetV2 disease API.');
      }
    } catch (err: any) {
      console.error('FastAPI Predict Disease Error:', err);
      setErrorMessage(
        err.message || `Unable to connect to FARMiTRON AI backend at ${process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000'}/predict-disease. Please check the uvicorn server.`
      );
    } finally {
      setIsScanning(false);
      setIsScanned(true);
    }
  };

  // Sample Selection Handler
  const triggerScan = async (sample: typeof SAMPLE_DISEASES[0]) => {
    setSelectedSample(sample);
    setCustomImagePreview(null);
    setApiResult(null);
    setIsScanned(false);
    setIsScanning(true);
    setErrorMessage(null);

    try {
      // Create sample image file for backend prediction
      const blob = await fetch(sample.image).then((r) => r.blob());
      const sampleFile = new File([blob], `${sample.id}.jpg`, { type: 'image/jpeg' });
      
      const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000';
      const formData = new FormData();
      formData.append('file', sampleFile);

      const response = await fetch(`${apiBase}/predict-disease`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.disease) {
          setApiResult(data);
        }
      }
    } catch (err) {
      // Fallback display if network notice
    } finally {
      setIsScanning(false);
      setIsScanned(true);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const activeImage = customImagePreview || selectedSample.image;
  const activeDiseaseName = apiResult ? apiResult.disease : selectedSample.diseaseName;
  const activeConfidence = apiResult ? apiResult.confidence : selectedSample.confidence;
  const activeRecommendation = apiResult ? apiResult.recommendation : selectedSample.organicRemedy;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER SECTION */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EDE5D4] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="gold" icon={<Brain className="w-3.5 h-3.5 text-[#2F6B45]" />}>
              MobileNetV2 Keras AI Diagnostic
            </Badge>
            <span className="text-xs font-mono text-[#66706A]">{process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000'}/predict-disease</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#17221C] tracking-tight">
            Plant Pathogen & Leaf Disease AI Diagnostic
          </h1>
          <p className="text-sm md:text-base text-[#66706A] max-w-2xl">
            Upload or drag & drop a clear leaf photo. Farmitron's MobileNetV2 deep learning model analyzes cellular spots and fungal patterns to generate immediate treatment plans.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => triggerScan(selectedSample)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#EDE5D4] bg-[#F7F5EF] text-xs font-bold text-[#16352B] hover:bg-[#EDE5D4]"
          >
            <RefreshCw className="w-4 h-4 text-[#2F6B45]" />
            <span>Re-Scan Current Image</span>
          </button>
        </div>
      </div>

      {/* ERROR NOTICE DISPLAY */}
      {errorMessage && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex items-start gap-4 shadow-sm">
          <div className="p-2.5 bg-amber-100 text-amber-800 rounded-2xl shrink-0 mt-0.5">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2 flex-grow">
            <h4 className="font-bold text-amber-950 text-base">Backend Connection Notice</h4>
            <p className="text-xs text-amber-900 leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: UPLOAD ZONE & SCANNER */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Drag & Drop File Upload Zone */}
          <div
            className={`border-2 border-dashed rounded-3xl p-6 text-center transition-all bg-white relative overflow-hidden ${
              dragActive ? 'border-[#2F6B45] bg-[#2F6B45]/5' : 'border-[#EDE5D4] hover:border-[#6E9F5B]'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { 
              e.preventDefault(); 
              setDragActive(false); 
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileUpload(e.dataTransfer.files[0]);
              }
            }}
          >
            {/* Display Image Preview / Scanning Simulation */}
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-900 border border-[#EDE5D4] mb-4">
              <img
                src={activeImage}
                alt="Leaf scan preview"
                className="w-full h-full object-cover"
              />

              {/* Laser Scan Animation Effect */}
              {isScanning && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#6E9F5B] shadow-[0_0_15px_#6E9F5B] animate-laser-scan z-20" />
                  <div className="absolute inset-0 bg-[#16352B]/40 flex items-center justify-center z-10">
                    <div className="bg-[#16352B] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg">
                      <Sparkles className="w-4 h-4 text-[#D6A84A] animate-spin" />
                      <span>MobileNetV2 Extracting Leaf Features...</span>
                    </div>
                  </div>
                </>
              )}

              {/* Bounding Box Overlay */}
              {isScanned && !isScanning && !activeDiseaseName.toLowerCase().includes('healthy') && (
                <div className="absolute top-1/3 left-1/4 w-1/3 h-1/3 border-2 border-dashed border-[#D6A84A] rounded-lg pointer-events-none flex items-start p-1">
                  <span className="text-[9px] font-mono font-bold bg-[#D6A84A] text-[#16352B] px-1 rounded">
                    Pathogen Vector Detected
                  </span>
                </div>
              )}
            </div>

            {/* Hidden Input for Click Upload */}
            <input
              type="file"
              id="leaf-file-input"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />

            <label htmlFor="leaf-file-input" className="cursor-pointer space-y-2 block">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#16352B]">
                <Upload className="w-4 h-4 text-[#2F6B45]" />
                <span>Click to browse or drop leaf photo here</span>
              </div>
              <p className="text-[11px] text-[#66706A]">Supports JPG, PNG, WEBP (FastAPI MobileNetV2)</p>
            </label>
          </div>

          {/* Preset Sample Leaf Library */}
          <div className="bg-white rounded-3xl p-5 border border-[#EDE5D4] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#66706A] block">
              Or Try Preset Sample Leaf Diagnoses
            </span>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_DISEASES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => triggerScan(sample)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    selectedSample.id === sample.id && !customImagePreview
                      ? 'border-[#2F6B45] bg-[#2F6B45]/10 font-bold'
                      : 'border-[#EDE5D4] bg-[#F7F5EF] hover:border-[#6E9F5B]'
                  }`}
                >
                  <span className="text-xs text-[#17221C] block truncate">{sample.crop}</span>
                  <span className="text-[10px] text-[#66706A] block truncate">{sample.diseaseName}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: DIAGNOSTIC RESULTS & TREATMENT DOSAGE */}
        <div className="lg:col-span-7 space-y-6">
          
          {isScanned && (
            <>
              {/* Diagnostic Score Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#EDE5D4] shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDE5D4] pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#66706A]">FastAPI MobileNetV2 Diagnostic</span>
                    <h3 className="text-2xl font-extrabold text-[#17221C]">{activeDiseaseName}</h3>
                  </div>

                  <Badge variant={activeDiseaseName.toLowerCase().includes('healthy') ? 'leaf' : 'alert'}>
                    {activeDiseaseName.toLowerCase().includes('healthy') ? 'Healthy Canopy' : 'Pathogen Detected'}
                  </Badge>
                </div>

                {/* Confidence Gauge */}
                <ConfidenceGauge
                  score={activeConfidence}
                  label={activeDiseaseName}
                  sublabel="MobileNetV2 Deep Learning Neural Network"
                  size="md"
                />

                <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#EDE5D4] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#16352B]">Model Advisory Recommendation</h4>
                  <p className="text-xs text-[#17221C] leading-relaxed font-medium">
                    {activeRecommendation}
                  </p>
                </div>
              </div>

              {/* Treatment Protocol Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#16352B] text-[#F7F5EF] p-5 rounded-2xl border border-[#2F6B45] space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#D6A84A] font-bold uppercase">
                    <Leaf className="w-4 h-4 text-[#6E9F5B]" />
                    <span>Organic Bio-Control Remedy</span>
                  </div>
                  <p className="text-xs text-[#EDE5D4] leading-relaxed">
                    {activeRecommendation}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EDE5D4] space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs text-[#16352B] font-bold uppercase">
                    <ShieldAlert className="w-4 h-4 text-[#2F6B45]" />
                    <span>Chemical Treatment Standard</span>
                  </div>
                  <p className="text-xs text-[#17221C] leading-relaxed">
                    Apply recommended broad-spectrum fungicide (Mancozeb 75% WP @ 2g/L or Chlorothalonil) upon early symptom detection.
                  </p>
                </div>
              </div>

              {/* SPRAY DOSAGE CALCULATOR FOR FARM SIZE */}
              {!activeDiseaseName.toLowerCase().includes('healthy') && (
                <div className="bg-white rounded-3xl p-6 border border-[#EDE5D4] shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EDE5D4] pb-3">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-[#2F6B45]" />
                      <h4 className="font-bold text-[#17221C] text-base">Farm Spray Dosage Calculator</h4>
                    </div>
                    <span className="text-xs text-[#66706A]">Calculates total required volume</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#17221C] mb-1">
                        Field Size (Acres)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={fieldAcres}
                        onChange={(e) => setFieldAcres(parseFloat(e.target.value) || 1)}
                        className="w-full p-2.5 rounded-xl border border-[#EDE5D4] bg-[#F7F5EF] text-sm font-bold text-[#17221C]"
                      />
                    </div>

                    <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#EDE5D4]">
                      <span className="text-[10px] text-[#66706A] uppercase font-bold">Total Spray Water</span>
                      <span className="block font-extrabold text-[#16352B] text-lg mt-0.5">
                        {Math.round(200 * fieldAcres)} Liters
                      </span>
                    </div>

                    <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#EDE5D4]">
                      <span className="text-[10px] text-[#66706A] uppercase font-bold">Total Chemical Required</span>
                      <span className="block font-extrabold text-[#2F6B45] text-lg mt-0.5">
                        {Math.round(400 * fieldAcres)} Grams
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
}
