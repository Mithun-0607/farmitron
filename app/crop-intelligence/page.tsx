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
  FileSpreadsheet,
  Download
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ConfidenceGauge } from '@/components/ui/ConfidenceGauge';

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

export default function CropIntelligencePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    state: 'Punjab',
    district: 'Sangrur',
    season: 'Rabi',
    soilType: 'alluvial',
    ph: 6.8,
    nitrogen: 'Medium',
    phosphorus: 'Medium',
    potassium: 'High',
    acres: 3.5,
    waterSource: 'Borewell + Drip',
    budgetPerAcre: 15000,
    priorityGoal: 'profit', // profit, water, resilience
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Trigger AI recommendation simulation
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setIsCompleted(true);
      }, 1500);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setIsCompleted(false);
    setCurrentStep(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* PAGE TITLE & BRAND HEADER */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EDE5D4] shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="green" icon={<Sprout className="w-3.5 h-3.5" />}>
                Guided Multi-Step Suite
              </Badge>
              <span className="text-xs font-mono text-[#66706A]">Model ID: CropEngine-IN-v3.1</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#17221C] tracking-tight">
              Crop Suitability Intelligence Engine
            </h1>
          </div>

          {isCompleted && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#EDE5D4] bg-[#F7F5EF] text-xs font-bold text-[#16352B] hover:bg-[#EDE5D4]"
            >
              <span>Modify Inputs / New Search</span>
            </button>
          )}
        </div>
        <p className="text-sm md:text-base text-[#66706A] max-w-3xl">
          Enter your local soil physics, water availability, and economic budget to receive AI-ranked crop suitability recommendations with detailed profit projections and cultivation schedules.
        </p>
      </div>

      {!isCompleted && !isAnalyzing && (
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#EDE5D4] shadow-md space-y-8">
          
          {/* MULTI-STEP PROGRESS BAR */}
          <div className="grid grid-cols-4 gap-2 border-b border-[#EDE5D4] pb-6">
            {[
              { step: 1, title: 'Location & Season', icon: MapPin },
              { step: 2, title: 'Soil Profile & Chemistry', icon: Layers },
              { step: 3, title: 'Acreage & Water', icon: Droplets },
              { step: 4, title: 'Farming Priority', icon: Award },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentStep === item.step;
              const isPassed = currentStep > item.step;
              return (
                <div key={item.step} className="flex flex-col items-center text-center space-y-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    isActive
                      ? 'bg-[#16352B] text-[#D6A84A] shadow-md ring-4 ring-[#2F6B45]/20'
                      : isPassed
                      ? 'bg-[#2F6B45] text-white'
                      : 'bg-[#F7F5EF] text-[#66706A] border border-[#EDE5D4]'
                  }`}>
                    {isPassed ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-xs font-semibold hidden md:block ${isActive ? 'text-[#16352B]' : 'text-[#66706A]'}`}>
                    Step {item.step}: {item.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* STEP 1: LOCATION & SEASON */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-[#EDE5D4] pb-3">
                <h3 className="text-xl font-extrabold text-[#17221C]">Step 1: Select Agro Location & Cropping Season</h3>
                <p className="text-xs text-[#66706A]">Pinpoint your agro-ecological zone for localized weather & soil telemetry.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17221C] mb-2">
                    State
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#EDE5D4] bg-[#F7F5EF] text-sm font-medium text-[#17221C] focus:outline-none focus:border-[#2F6B45]"
                  >
                    {STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17221C] mb-2">
                    District / Taluka
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#EDE5D4] bg-[#F7F5EF] text-sm font-medium text-[#17221C] focus:outline-none focus:border-[#2F6B45]"
                    placeholder="e.g. Sangrur, Ludhiana, Pune"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17221C] mb-2">
                    Cropping Season
                  </label>
                  <select
                    value={formData.season}
                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#EDE5D4] bg-[#F7F5EF] text-sm font-medium text-[#17221C] focus:outline-none focus:border-[#2F6B45]"
                  >
                    <option value="Kharif">Kharif (Monsoon: Jun - Oct)</option>
                    <option value="Rabi">Rabi (Winter: Oct - Mar)</option>
                    <option value="Zaid">Zaid (Summer: Mar - Jun)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SOIL PROFILE & CHEMISTRY */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-[#EDE5D4] pb-3">
                <h3 className="text-xl font-extrabold text-[#17221C]">Step 2: Soil Classification & Telemetry</h3>
                <p className="text-xs text-[#66706A]">Provide your soil pH and nutrient levels (or use sample defaults).</p>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#17221C]">
                  Select Dominant Soil Classification
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SOIL_TYPES.map((soil) => (
                    <button
                      key={soil.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, soilType: soil.id })}
                      className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
                        formData.soilType === soil.id
                          ? 'border-[#2F6B45] bg-[#2F6B45]/10 shadow-xs'
                          : 'border-[#EDE5D4] bg-[#F7F5EF] hover:border-[#6E9F5B]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#17221C]">{soil.label}</span>
                        {formData.soilType === soil.id && <CheckCircle2 className="w-4 h-4 text-[#2F6B45]" />}
                      </div>
                      <p className="text-xs text-[#66706A]">{soil.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* pH Slider */}
              <div className="bg-[#F7F5EF] p-5 rounded-2xl border border-[#EDE5D4] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#17221C]">
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
                <div className="flex justify-between text-[10px] text-[#66706A] font-mono">
                  <span>5.0 (Acidic)</span>
                  <span>6.5 - 7.2 (Ideal neutral)</span>
                  <span>8.5 (Alkaline)</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ACREAGE & WATER */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-[#EDE5D4] pb-3">
                <h3 className="text-xl font-extrabold text-[#17221C]">Step 3: Field Size, Irrigation & Budget</h3>
                <p className="text-xs text-[#66706A]">Helps calculate cost-profit returns per acre.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17221C] mb-2">
                    Total Cultivation Land Size (Acres)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.acres}
                    onChange={(e) => setFormData({ ...formData, acres: parseFloat(e.target.value) || 1 })}
                    className="w-full p-3 rounded-xl border border-[#EDE5D4] bg-[#F7F5EF] text-sm font-bold text-[#17221C] focus:outline-none focus:border-[#2F6B45]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17221C] mb-2">
                    Primary Irrigation Source
                  </label>
                  <select
                    value={formData.waterSource}
                    onChange={(e) => setFormData({ ...formData, waterSource: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#EDE5D4] bg-[#F7F5EF] text-sm font-medium text-[#17221C] focus:outline-none focus:border-[#2F6B45]"
                  >
                    <option value="Borewell + Drip">Borewell + Drip System (High control)</option>
                    <option value="Canal Irrigation">Canal Irrigation (Seasonal water)</option>
                    <option value="Rainfed">Rainfed (Dependent on monsoon)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17221C] mb-2">
                    Working Budget (₹ / Acre)
                  </label>
                  <select
                    value={formData.budgetPerAcre}
                    onChange={(e) => setFormData({ ...formData, budgetPerAcre: parseInt(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-[#EDE5D4] bg-[#F7F5EF] text-sm font-medium text-[#17221C] focus:outline-none focus:border-[#2F6B45]"
                  >
                    <option value={10000}>₹10,000 / acre (Low budget)</option>
                    <option value={15000}>₹15,000 / acre (Standard budget)</option>
                    <option value={25000}>₹25,000 / acre (High yield input)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: FARMING PRIORITY */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-[#EDE5D4] pb-3">
                <h3 className="text-xl font-extrabold text-[#17221C]">Step 4: Primary Agronomic Goal</h3>
                <p className="text-xs text-[#66706A]">Choose how the AI should optimize its recommendations.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priorityGoal: 'profit' })}
                  className={`p-5 rounded-2xl border text-left space-y-2 transition-all ${
                    formData.priorityGoal === 'profit'
                      ? 'border-[#2F6B45] bg-[#2F6B45]/10 shadow-sm'
                      : 'border-[#EDE5D4] bg-[#F7F5EF]'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-[#D6A84A]/20 text-[#16352B] w-max">
                    <TrendingUp className="w-5 h-5 text-[#2F6B45]" />
                  </div>
                  <h4 className="font-bold text-sm text-[#17221C]">Maximize Net Profit</h4>
                  <p className="text-xs text-[#66706A]">Prioritizes high mandi market rates and cash crop returns.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priorityGoal: 'water' })}
                  className={`p-5 rounded-2xl border text-left space-y-2 transition-all ${
                    formData.priorityGoal === 'water'
                      ? 'border-[#2F6B45] bg-[#2F6B45]/10 shadow-sm'
                      : 'border-[#EDE5D4] bg-[#F7F5EF]'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-[#6E9F5B]/20 text-[#16352B] w-max">
                    <Droplets className="w-5 h-5 text-[#2F6B45]" />
                  </div>
                  <h4 className="font-bold text-sm text-[#17221C]">Water & Drought Resilience</h4>
                  <p className="text-xs text-[#66706A]">Favors low-water requirement crops (mustard, chickpeas, millets).</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priorityGoal: 'resilience' })}
                  className={`p-5 rounded-2xl border text-left space-y-2 transition-all ${
                    formData.priorityGoal === 'resilience'
                      ? 'border-[#2F6B45] bg-[#2F6B45]/10 shadow-sm'
                      : 'border-[#EDE5D4] bg-[#F7F5EF]'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-[#16352B]/10 text-[#16352B] w-max">
                    <ShieldCheck className="w-5 h-5 text-[#2F6B45]" />
                  </div>
                  <h4 className="font-bold text-sm text-[#17221C]">Pest & Disease Resistance</h4>
                  <p className="text-xs text-[#66706A]">Selects hardy crop varieties resistant to local fungal blights.</p>
                </button>
              </div>
            </div>
          )}

          {/* STEP CONTROLS FOOTER */}
          <div className="flex items-center justify-between pt-6 border-t border-[#EDE5D4]">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#EDE5D4] text-xs font-bold text-[#17221C] transition-colors ${
                currentStep === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#F7F5EF]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#16352B] text-[#F7F5EF] text-sm font-bold hover:bg-[#2F6B45] transition-all shadow-md"
            >
              <span>{currentStep === 4 ? 'Run AI Suitability Engine' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4 text-[#D6A84A]" />
            </button>
          </div>

        </div>
      )}

      {/* LOADING STATE SIMULATION */}
      {isAnalyzing && (
        <div className="bg-white rounded-3xl p-16 border border-[#EDE5D4] text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#16352B] text-[#D6A84A] mx-auto flex items-center justify-center animate-bounce">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-[#17221C]">Analyzing Agro-Ecological Matrices...</h3>
            <p className="text-sm text-[#66706A]">
              Matching soil pH {formData.ph}, {formData.season} season, and district telemetry with ICAR agronomic database.
            </p>
          </div>
        </div>
      )}

      {/* COMPLETED RESULTS SCREEN */}
      {isCompleted && (
        <div className="space-y-8">
          
          {/* TOP SUITABILITY RANKINGS */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EDE5D4] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#EDE5D4] pb-4">
              <div>
                <h3 className="font-bold text-[#17221C] text-xl">Top Recommended Crops for Your Land</h3>
                <span className="text-xs text-[#66706A]">
                  Ranked by agro suitability for {formData.district}, {formData.state} ({formData.season} Season)
                </span>
              </div>
              <Badge variant="green">AI MATCH COMPLETE</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* RANK 1 */}
              <div className="card-premium p-6 rounded-2xl border-2 border-[#2F6B45] relative space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="forest">RANK #1 MATCH</Badge>
                  <span className="text-2xl font-extrabold text-[#2F6B45]">94.2%</span>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#17221C]">Mustard / Sarson (Pusa Bold)</h4>
                  <p className="text-xs text-[#66706A] mt-0.5">Oilseed Crop · High Market Mandi Demand</p>
                </div>

                <div className="bg-[#F7F5EF] p-3 rounded-xl space-y-1.5 text-xs text-[#17221C]">
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Est. Cost / Acre:</span>
                    <span className="font-bold">₹11,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Est. Yield Revenue:</span>
                    <span className="font-bold text-[#2F6B45]">₹54,000</span>
                  </div>
                  <div className="flex justify-between border-t border-[#EDE5D4] pt-1.5 font-bold">
                    <span>Est. Net Profit:</span>
                    <span className="text-[#16352B]">₹42,500 / Acre</span>
                  </div>
                </div>

                <ul className="text-xs text-[#66706A] space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6E9F5B]" />
                    <span>Low water requirement (2 irrigations)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6E9F5B]" />
                    <span>Perfect fit for pH {formData.ph} Alluvial soil</span>
                  </li>
                </ul>
              </div>

              {/* RANK 2 */}
              <div className="card-premium p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="green">RANK #2 MATCH</Badge>
                  <span className="text-2xl font-extrabold text-[#6E9F5B]">88.5%</span>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#17221C]">Chickpea / Kabuli Chana</h4>
                  <p className="text-xs text-[#66706A] mt-0.5">Pulse Crop · Natural Soil Nitrogen Fixer</p>
                </div>

                <div className="bg-[#F7F5EF] p-3 rounded-xl space-y-1.5 text-xs text-[#17221C]">
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Est. Cost / Acre:</span>
                    <span className="font-bold">₹9,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Est. Yield Revenue:</span>
                    <span className="font-bold text-[#2F6B45]">₹47,800</span>
                  </div>
                  <div className="flex justify-between border-t border-[#EDE5D4] pt-1.5 font-bold">
                    <span>Est. Net Profit:</span>
                    <span className="text-[#16352B]">₹38,000 / Acre</span>
                  </div>
                </div>

                <ul className="text-xs text-[#66706A] space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6E9F5B]" />
                    <span>Requires zero nitrogen fertilizer</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6E9F5B]" />
                    <span>High drought tolerance</span>
                  </li>
                </ul>
              </div>

              {/* RANK 3 */}
              <div className="card-premium p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="sand">RANK #3 MATCH</Badge>
                  <span className="text-2xl font-extrabold text-[#D6A84A]">81.0%</span>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#17221C]">Wheat (HD-2967)</h4>
                  <p className="text-xs text-[#66706A] mt-0.5">Cereal Staple · High Input Requirement</p>
                </div>

                <div className="bg-[#F7F5EF] p-3 rounded-xl space-y-1.5 text-xs text-[#17221C]">
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Est. Cost / Acre:</span>
                    <span className="font-bold">₹16,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Est. Yield Revenue:</span>
                    <span className="font-bold text-[#2F6B45]">₹51,700</span>
                  </div>
                  <div className="flex justify-between border-t border-[#EDE5D4] pt-1.5 font-bold">
                    <span>Est. Net Profit:</span>
                    <span className="text-[#16352B]">₹35,200 / Acre</span>
                  </div>
                </div>

                <ul className="text-xs text-[#66706A] space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6E9F5B]" />
                    <span>Standard MSP government procurement</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6E9F5B]" />
                    <span>Requires 4 timely irrigations</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* CULTIVATION TIMELINE CALENDAR */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EDE5D4] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#EDE5D4] pb-4">
              <div>
                <h3 className="font-bold text-[#17221C] text-xl">Cultivation Calendar: Mustard (Pusa Bold)</h3>
                <span className="text-xs text-[#66706A]">Step-by-step field execution calendar</span>
              </div>
              <Badge variant="gold" icon={<Calendar className="w-3.5 h-3.5" />}>
                110-Day Crop Duration
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#EDE5D4] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6A84A]">Phase 1 · Days 1-10</span>
                <h4 className="font-bold text-[#17221C] text-sm">Sowing & Seed Treatment</h4>
                <p className="text-xs text-[#66706A] leading-relaxed">
                  Treat seeds with Trichoderma @ 5g/kg. Sow at 2.5kg/acre with 30cm row spacing.
                </p>
              </div>

              <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#EDE5D4] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F6B45]">Phase 2 · Days 25-30</span>
                <h4 className="font-bold text-[#17221C] text-sm">First Irrigation & Thinning</h4>
                <p className="text-xs text-[#66706A] leading-relaxed">
                  Apply 1st light irrigation. Top-dress 20kg Urea per acre during thinning.
                </p>
              </div>

              <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#EDE5D4] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E9F5B]">Phase 3 · Days 50-60</span>
                <h4 className="font-bold text-[#17221C] text-sm">Flowering & Aphid Guard</h4>
                <p className="text-xs text-[#66706A] leading-relaxed">
                  Inspect leaves for mustard aphids. Spray Neem Oil 1500ppm if pest count exceeds 5/plant.
                </p>
              </div>

              <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#EDE5D4] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#16352B]">Phase 4 · Days 100-110</span>
                <h4 className="font-bold text-[#17221C] text-sm">Pod Maturity & Harvesting</h4>
                <p className="text-xs text-[#66706A] leading-relaxed">
                  Harvest when 75% pods turn golden yellow to avoid shattering loss in field.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
