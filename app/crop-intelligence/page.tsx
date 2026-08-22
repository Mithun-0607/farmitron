'use client';

import React, { useState } from 'react';
import { 
  Sprout, 
  MapPin, 
  Layers, 
  Droplets, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  Award,
  AlertCircle,
  Thermometer,
  Wind,
  Brain,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const STATES = [
  'Punjab', 'Maharashtra', 'Uttar Pradesh', 'Telangana', 'Madhya Pradesh', 
  'Haryana', 'Gujarat', 'Rajasthan', 'Karnataka', 'Tamil Nadu', 'Bihar', 'West Bengal'
];

const SOIL_TYPES = [
  { id: 'alluvial', label: 'Alluvial Soil (Gangetic/Plains)', desc: 'Rich in potash, ideal for wheat, paddy, sugarcane, mustard.' },
  { id: 'black', label: 'Black Cotton Soil (Regur)', desc: 'High clay content & moisture retention. Great for cotton, soybean, pulses.' },
  { id: 'red', label: 'Red & Yellow Soil', desc: 'Slightly acidic to neutral. Suitable for groundnut, pulses, millets.' },
  { id: 'sandy', label: 'Sandy Loam', desc: 'Well-drained. Excellent for mustard, bajra, vegetables.' },
];

interface MlPrediction {
  success?: boolean;
  recommended_crop: string;
  confidence: number;
  recommendation: string;
  inputs_received: {
    N: number;
    P: number;
    K: number;
    temperature: number;
    humidity: number;
    ph: number;
    rainfall: number;
  };
}

export default function CropIntelligencePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mlResult, setMlResult] = useState<MlPrediction | null>(null);

  // 7 Feature Form State matching FastAPI model requirements
  const [formData, setFormData] = useState({
    state: 'Punjab',
    district: 'Sangrur',
    season: 'Rabi',
    soilType: 'alluvial',
    ph: 6.5,
    N: 43,
    P: 42,
    K: 43,
    temperature: 23.6,
    humidity: 82.0,
    rainfall: 202.9,
    acres: 3.5,
    waterSource: 'Borewell + Drip',
    budgetPerAcre: 15000,
    priorityGoal: 'profit',
  });

  const handleNext = async () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsAnalyzing(true);
      setErrorMessage(null);

      try {
        const response = await fetch("http://127.0.0.1:8000/predict-crop", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            N: Number(formData.N),
            P: Number(formData.P),
            K: Number(formData.K),
            temperature: Number(formData.temperature),
            humidity: Number(formData.humidity),
            ph: Number(formData.ph),
            rainfall: Number(formData.rainfall),
          }),
        });

        if (!response.ok) {
          throw new Error(`FastAPI Server Error (${response.status}): ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data && (data.success || data.recommended_crop)) {
          setMlResult(data);
          setIsCompleted(true);
        } else {
          throw new Error(data.error || "Unexpected data response from Python ML backend.");
        }
      } catch (err: any) {
        console.error("FastAPI Crop Prediction Error:", err);
        setErrorMessage(
          err.message || "Unable to connect to FastAPI backend at http://127.0.0.1:8000/predict-crop. Please ensure uvicorn server is active."
        );
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setIsCompleted(false);
    setErrorMessage(null);
    setCurrentStep(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* PAGE TITLE & BRAND HEADER */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EFEAE1] shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="green" icon={<Brain className="w-3.5 h-3.5 text-[#2F6B45]" />}>
                Live FastAPI Model: RandomForestClassifier
              </Badge>
              <span className="text-xs font-mono text-[#66706A]">Endpoint: http://127.0.0.1:8000/predict-crop</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111815] tracking-tight">
              Crop Suitability Intelligence Engine
            </h1>
          </div>

          {isCompleted && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#EFEAE1] bg-[#F9F7F1] text-xs font-bold text-[#16352B] hover:bg-[#EFEAE1]"
            >
              <span>Modify Inputs / New Prediction</span>
            </button>
          )}
        </div>
        <p className="text-sm md:text-base text-[#66706A] max-w-3xl">
          Powered by a trained Machine Learning model evaluating NPK nutrients, soil pH, temperature, humidity, and rainfall vectors in real-time.
        </p>
      </div>

      {/* ERROR MESSAGE DISPLAY BANNER */}
      {errorMessage && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex items-start gap-4 shadow-sm">
          <div className="p-2.5 bg-amber-100 text-amber-800 rounded-2xl shrink-0 mt-0.5">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2 flex-grow">
            <h4 className="font-bold text-amber-950 text-base">Backend Connection Notice</h4>
            <p className="text-xs text-amber-900 leading-relaxed">{errorMessage}</p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-amber-800 text-white text-xs font-bold hover:bg-amber-900 transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Connection</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {!isCompleted && !isAnalyzing && (
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#EFEAE1] shadow-md space-y-8">
          
          {/* MULTI-STEP PROGRESS BAR */}
          <div className="grid grid-cols-4 gap-2 border-b border-[#EFEAE1] pb-6">
            {[
              { step: 1, title: 'Location & Season', icon: MapPin },
              { step: 2, title: 'Soil NPK & pH', icon: Layers },
              { step: 3, title: 'Climate Telemetry', icon: Thermometer },
              { step: 4, title: 'Farming Goal', icon: Award },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentStep === item.step;
              const isPassed = currentStep > item.step;
              return (
                <div key={item.step} className="flex flex-col items-center text-center space-y-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    isActive
                      ? 'bg-[#0A1D16] text-[#E2C889] shadow-md ring-4 ring-[#2F6B45]/20'
                      : isPassed
                      ? 'bg-[#2F6B45] text-white'
                      : 'bg-[#F9F7F1] text-[#66706A] border border-[#EFEAE1]'
                  }`}>
                    {isPassed ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-xs font-semibold hidden md:block ${isActive ? 'text-[#0A1D16]' : 'text-[#66706A]'}`}>
                    Step {item.step}: {item.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* STEP 1: LOCATION & SEASON */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-[#EFEAE1] pb-3">
                <h3 className="text-xl font-extrabold text-[#111815]">Step 1: Select Agro Location & Cropping Season</h3>
                <p className="text-xs text-[#66706A]">Pinpoint your agro-ecological zone for localized weather & soil telemetry.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111815] mb-2">State</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#EFEAE1] bg-[#F9F7F1] text-sm font-medium text-[#111815] focus:outline-none focus:border-[#2F6B45]"
                  >
                    {STATES.map((st) => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111815] mb-2">District / Taluka</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#EFEAE1] bg-[#F9F7F1] text-sm font-medium text-[#111815] focus:outline-none focus:border-[#2F6B45]"
                    placeholder="e.g. Sangrur, Ludhiana, Pune"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111815] mb-2">Cropping Season</label>
                  <select
                    value={formData.season}
                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#EFEAE1] bg-[#F9F7F1] text-sm font-medium text-[#111815] focus:outline-none focus:border-[#2F6B45]"
                  >
                    <option value="Kharif">Kharif (Monsoon: Jun - Oct)</option>
                    <option value="Rabi">Rabi (Winter: Oct - Mar)</option>
                    <option value="Zaid">Zaid (Summer: Mar - Jun)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SOIL NPK & pH (7 ML FEATURES) */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-[#EFEAE1] pb-3">
                <h3 className="text-xl font-extrabold text-[#111815]">Step 2: Soil NPK Nutrients & pH Level</h3>
                <p className="text-xs text-[#66706A]">Values passed directly to the http://127.0.0.1:8000/predict-crop API.</p>
              </div>

              {/* NPK Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F9F7F1] p-5 rounded-2xl border border-[#EFEAE1]">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111815] mb-1">
                    Nitrogen (N): <strong className="text-[#2F6B45] text-sm">{formData.N} kg/ha</strong>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="140"
                    value={formData.N}
                    onChange={(e) => setFormData({ ...formData, N: parseFloat(e.target.value) })}
                    className="w-full accent-[#2F6B45] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111815] mb-1">
                    Phosphorus (P): <strong className="text-[#2F6B45] text-sm">{formData.P} kg/ha</strong>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="145"
                    value={formData.P}
                    onChange={(e) => setFormData({ ...formData, P: parseFloat(e.target.value) })}
                    className="w-full accent-[#2F6B45] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111815] mb-1">
                    Potassium (K): <strong className="text-[#2F6B45] text-sm">{formData.K} kg/ha</strong>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="205"
                    value={formData.K}
                    onChange={(e) => setFormData({ ...formData, K: parseFloat(e.target.value) })}
                    className="w-full accent-[#2F6B45] cursor-pointer"
                  />
                </div>
              </div>

              {/* pH Slider */}
              <div className="bg-[#F9F7F1] p-5 rounded-2xl border border-[#EFEAE1] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111815]">
                    Soil pH Level: <strong className="text-[#2F6B45] text-sm">{formData.ph}</strong>
                  </span>
                  <Badge variant="leaf">
                    {formData.ph < 6.0 ? 'Acidic' : formData.ph > 7.5 ? 'Alkaline' : 'Optimal Neutral'}
                  </Badge>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="8.5"
                  step="0.1"
                  value={formData.ph}
                  onChange={(e) => setFormData({ ...formData, ph: parseFloat(e.target.value) })}
                  className="w-full accent-[#2F6B45] cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* STEP 3: CLIMATE TELEMETRY (TEMP, HUMIDITY, RAINFALL) */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-[#EFEAE1] pb-3">
                <h3 className="text-xl font-extrabold text-[#111815]">Step 3: Microclimate Telemetry Inputs</h3>
                <p className="text-xs text-[#66706A]">Temperature, Humidity, and Seasonal Rainfall features for ML prediction.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#F9F7F1] p-5 rounded-2xl border border-[#EFEAE1] space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111815]">
                    Avg Temperature (°C): <strong className="text-[#2F6B45]">{formData.temperature}°C</strong>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="45"
                    step="0.5"
                    value={formData.temperature}
                    onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                    className="w-full accent-[#2F6B45] cursor-pointer"
                  />
                </div>

                <div className="bg-[#F9F7F1] p-5 rounded-2xl border border-[#EFEAE1] space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111815]">
                    Relative Humidity (%): <strong className="text-[#2F6B45]">{formData.humidity}%</strong>
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="95"
                    step="1"
                    value={formData.humidity}
                    onChange={(e) => setFormData({ ...formData, humidity: parseFloat(e.target.value) })}
                    className="w-full accent-[#2F6B45] cursor-pointer"
                  />
                </div>

                <div className="bg-[#F9F7F1] p-5 rounded-2xl border border-[#EFEAE1] space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111815]">
                    Seasonal Rainfall (mm): <strong className="text-[#2F6B45]">{formData.rainfall} mm</strong>
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="300"
                    step="5"
                    value={formData.rainfall}
                    onChange={(e) => setFormData({ ...formData, rainfall: parseFloat(e.target.value) })}
                    className="w-full accent-[#2F6B45] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: FARMING GOAL */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-[#EFEAE1] pb-3">
                <h3 className="text-xl font-extrabold text-[#111815]">Step 4: Primary Agronomic Goal</h3>
                <p className="text-xs text-[#66706A]">Execute ML inference engine against loaded model.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priorityGoal: 'profit' })}
                  className={`p-5 rounded-2xl border text-left space-y-2 transition-all ${
                    formData.priorityGoal === 'profit'
                      ? 'border-[#2F6B45] bg-[#2F6B45]/10 shadow-sm'
                      : 'border-[#EFEAE1] bg-[#F9F7F1]'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-[#E2C889]/20 text-[#0A1D16] w-max">
                    <TrendingUp className="w-5 h-5 text-[#2F6B45]" />
                  </div>
                  <h4 className="font-bold text-sm text-[#111815]">Maximize Yield Profit</h4>
                  <p className="text-xs text-[#66706A]">Prioritizes high mandi market rates and cash crop returns.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priorityGoal: 'water' })}
                  className={`p-5 rounded-2xl border text-left space-y-2 transition-all ${
                    formData.priorityGoal === 'water'
                      ? 'border-[#2F6B45] bg-[#2F6B45]/10 shadow-sm'
                      : 'border-[#EFEAE1] bg-[#F9F7F1]'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-[#4ADE80]/20 text-[#0A1D16] w-max">
                    <Droplets className="w-5 h-5 text-[#2F6B45]" />
                  </div>
                  <h4 className="font-bold text-sm text-[#111815]">Water & Drought Resilience</h4>
                  <p className="text-xs text-[#66706A]">Favors low-water requirement crops.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priorityGoal: 'resilience' })}
                  className={`p-5 rounded-2xl border text-left space-y-2 transition-all ${
                    formData.priorityGoal === 'resilience'
                      ? 'border-[#2F6B45] bg-[#2F6B45]/10 shadow-sm'
                      : 'border-[#EFEAE1] bg-[#F9F7F1]'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-[#0A1D16]/10 text-[#0A1D16] w-max">
                    <ShieldCheck className="w-5 h-5 text-[#2F6B45]" />
                  </div>
                  <h4 className="font-bold text-sm text-[#111815]">Pest & Pathogen Resistance</h4>
                  <p className="text-xs text-[#66706A]">Selects hardy crop varieties resistant to blights.</p>
                </button>
              </div>
            </div>
          )}

          {/* STEP CONTROLS FOOTER */}
          <div className="flex items-center justify-between pt-6 border-t border-[#EFEAE1]">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#EFEAE1] text-xs font-bold text-[#111815] transition-colors ${
                currentStep === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#F9F7F1]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A1D16] text-white text-sm font-bold hover:bg-[#2F6B45] transition-all shadow-md"
            >
              <span>{currentStep === 4 ? 'Predict Crop (FastAPI Model)' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4 text-[#E2C889]" />
            </button>
          </div>

        </div>
      )}

      {/* AI LOADING STATE */}
      {isAnalyzing && (
        <div className="bg-white rounded-3xl p-16 border border-[#EFEAE1] text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#0A1D16] text-[#E2C889] mx-auto flex items-center justify-center animate-bounce">
            <Brain className="w-8 h-8 text-[#4ADE80]" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-[#111815]">Communicating with FastAPI ML Backend...</h3>
            <p className="text-sm text-[#66706A]">
              Sending N:{formData.N}, P:{formData.P}, K:{formData.K}, Temp:{formData.temperature}°C, Hum:{formData.humidity}%, pH:{formData.ph}, Rain:{formData.rainfall}mm to http://127.0.0.1:8000/predict-crop.
            </p>
          </div>
        </div>
      )}

      {/* COMPLETED REAL ML MODEL OUTPUT RESULT SCREEN */}
      {isCompleted && mlResult && (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EFEAE1] shadow-sm space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EFEAE1] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#66706A]">FastAPI Trained ML Model Output</span>
                <h3 className="text-2xl font-extrabold text-[#111815]">Recommended Crop: {mlResult.recommended_crop}</h3>
              </div>
              <Badge variant="forest">
                {mlResult.confidence}% Model Confidence
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Result Highlight Card */}
              <div className="lg:col-span-6 card-premium p-6 rounded-2xl border-2 border-[#2F6B45] space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="green">PRIMARY ML MATCH</Badge>
                  <span className="text-3xl font-extrabold text-[#2F6B45]">{mlResult.confidence}%</span>
                </div>

                <div>
                  <h4 className="text-2xl font-extrabold text-[#111815]">{mlResult.recommended_crop}</h4>
                  <p className="text-xs text-[#66706A] mt-1">RandomForestClassifier Model (http://127.0.0.1:8000/predict-crop)</p>
                </div>

                <div className="bg-[#0A1D16] text-white p-4 rounded-xl space-y-2 border border-[#E2C889]/20">
                  <span className="text-[10px] font-bold uppercase text-[#E2C889]">Farmer-Friendly Recommendation</span>
                  <p className="text-xs text-[#F9F7F1] leading-relaxed">
                    {mlResult.recommendation}
                  </p>
                </div>
              </div>

              {/* Right Column: 7 Inputs Received Summary */}
              {mlResult.inputs_received && (
                <div className="lg:col-span-6 bg-[#F9F7F1] p-6 rounded-2xl border border-[#EFEAE1] space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#111815]">Inputs Evaluated By ML Model</h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-[#EFEAE1]">
                      <span className="text-[10px] text-[#66706A] block">Nitrogen (N)</span>
                      <span className="font-bold text-[#111815] text-sm">{mlResult.inputs_received.N} kg/ha</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-[#EFEAE1]">
                      <span className="text-[10px] text-[#66706A] block">Phosphorus (P)</span>
                      <span className="font-bold text-[#111815] text-sm">{mlResult.inputs_received.P} kg/ha</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-[#EFEAE1]">
                      <span className="text-[10px] text-[#66706A] block">Potassium (K)</span>
                      <span className="font-bold text-[#111815] text-sm">{mlResult.inputs_received.K} kg/ha</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-[#EFEAE1]">
                      <span className="text-[10px] text-[#66706A] block">Soil pH</span>
                      <span className="font-bold text-[#2F6B45] text-sm">{mlResult.inputs_received.ph}</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-[#EFEAE1]">
                      <span className="text-[10px] text-[#66706A] block">Temperature</span>
                      <span className="font-bold text-[#111815] text-sm">{mlResult.inputs_received.temperature}°C</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-[#EFEAE1]">
                      <span className="text-[10px] text-[#66706A] block">Humidity</span>
                      <span className="font-bold text-[#111815] text-sm">{mlResult.inputs_received.humidity}%</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-[#EFEAE1] col-span-2">
                      <span className="text-[10px] text-[#66706A] block">Rainfall</span>
                      <span className="font-bold text-[#2F6B45] text-sm">{mlResult.inputs_received.rainfall} mm</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
