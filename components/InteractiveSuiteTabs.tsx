'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sprout, 
  Scan, 
  CloudSun, 
  MessageSquareText, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Droplets,
  AlertTriangle,
  Mic,
  TrendingUp,
  Award
} from 'lucide-react';
import { ConfidenceGauge } from './ui/ConfidenceGauge';
import { Badge } from './ui/Badge';

export const InteractiveSuiteTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'crop' | 'disease' | 'weather' | 'assistant'>('crop');

  return (
    <div className="card-premium rounded-3xl p-6 md:p-10 border border-[#EDE5D4] shadow-xl bg-white">
      {/* Tab Navigation Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDE5D4] pb-6 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('crop')}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'crop'
                ? 'bg-[#16352B] text-[#F7F5EF] shadow-md'
                : 'bg-[#F7F5EF] text-[#17221C] hover:bg-[#EDE5D4]'
            }`}
          >
            <Sprout className={`w-4 h-4 ${activeTab === 'crop' ? 'text-[#D6A84A]' : 'text-[#2F6B45]'}`} />
            <span>Crop Intelligence</span>
          </button>

          <button
            onClick={() => setActiveTab('disease')}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'disease'
                ? 'bg-[#16352B] text-[#F7F5EF] shadow-md'
                : 'bg-[#F7F5EF] text-[#17221C] hover:bg-[#EDE5D4]'
            }`}
          >
            <Scan className={`w-4 h-4 ${activeTab === 'disease' ? 'text-[#D6A84A]' : 'text-[#2F6B45]'}`} />
            <span>Disease Detection</span>
          </button>

          <button
            onClick={() => setActiveTab('weather')}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'weather'
                ? 'bg-[#16352B] text-[#F7F5EF] shadow-md'
                : 'bg-[#F7F5EF] text-[#17221C] hover:bg-[#EDE5D4]'
            }`}
          >
            <CloudSun className={`w-4 h-4 ${activeTab === 'weather' ? 'text-[#D6A84A]' : 'text-[#2F6B45]'}`} />
            <span>Weather Advisor</span>
          </button>

          <button
            onClick={() => setActiveTab('assistant')}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'assistant'
                ? 'bg-[#16352B] text-[#F7F5EF] shadow-md'
                : 'bg-[#F7F5EF] text-[#17221C] hover:bg-[#EDE5D4]'
            }`}
          >
            <MessageSquareText className={`w-4 h-4 ${activeTab === 'assistant' ? 'text-[#D6A84A]' : 'text-[#2F6B45]'}`} />
            <span>AI Farm Assistant</span>
          </button>
        </div>

        <Badge variant="gold" icon={<Sparkles className="w-3.5 h-3.5 text-[#2F6B45]" />}>
          Interactive Demo Preview
        </Badge>
      </div>

      {/* Tab Content Display */}
      {activeTab === 'crop' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <Badge variant="green">Multi-Parameter Agro Matching</Badge>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#17221C] leading-tight">
              Precision crop selection tailored for your soil & water budget.
            </h3>
            <p className="text-sm md:text-base text-[#66706A] leading-relaxed">
              Input your district, soil pH, NPK balance, and irrigation capacity to receive AI-ranked crop recommendations with verified profit yields per acre.
            </p>
            <ul className="space-y-2.5 text-sm text-[#17221C]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6E9F5B]" />
                <span>Calibrated against 12 Indian agro-climatic zones & Kharif/Rabi cycles</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6E9F5B]" />
                <span>Integrated Mandi demand forecasting to prevent post-harvest gluts</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6E9F5B]" />
                <span>Custom fertilizer dosage schedule & water budgeting plan</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/crop-intelligence"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2F6B45] text-white font-semibold text-sm hover:bg-[#16352B] transition-colors shadow-sm"
              >
                <span>Launch Crop Suitability Wizard</span>
                <ArrowRight className="w-4 h-4 text-[#D6A84A]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F7F5EF] p-6 rounded-2xl border border-[#EDE5D4] space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE5D4] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#66706A]">Sample Agro Profile · Punjab (Rabi)</span>
              <span className="text-xs font-mono text-[#2F6B45] bg-[#2F6B45]/10 px-2 py-0.5 rounded">Alluvial Soil pH 6.8</span>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-xl border border-[#EDE5D4] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#17221C]">Mustard / Sarson (Pusa Bold)</span>
                    <Badge variant="green">#1 Match</Badge>
                  </div>
                  <p className="text-xs text-[#66706A] mt-1">Est. Net Profit: ₹42,500 / acre · Low Water Deficit</p>
                </div>
                <span className="text-xl font-extrabold text-[#2F6B45]">94.2%</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#EDE5D4] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#17221C]">Chickpea / Kabuli Chana</span>
                    <Badge variant="sand">High Demand</Badge>
                  </div>
                  <p className="text-xs text-[#66706A] mt-1">Est. Net Profit: ₹38,000 / acre · Nitrogen Fixer</p>
                </div>
                <span className="text-xl font-extrabold text-[#6E9F5B]">88.5%</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#EDE5D4] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#17221C]">Wheat (HD-2967)</span>
                    <Badge variant="sand">Standard</Badge>
                  </div>
                  <p className="text-xs text-[#66706A] mt-1">Est. Net Profit: ₹35,200 / acre · Requires 4 Irrigations</p>
                </div>
                <span className="text-xl font-extrabold text-[#D6A84A]">81.0%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'disease' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <Badge variant="gold">Computer Vision Diagnostic</Badge>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#17221C] leading-tight">
              Instant leaf image diagnosis with 96.4% confidence rating.
            </h3>
            <p className="text-sm md:text-base text-[#66706A] leading-relaxed">
              Upload leaf photos directly from your phone camera. Farmitron detects fungal, bacterial, or pest damage instantly and generates dosage remedies.
            </p>
            <ul className="space-y-2.5 text-sm text-[#17221C]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6E9F5B]" />
                <span>Identifies 45+ crop pathogens including Rice Blast & Late Blight</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6E9F5B]" />
                <span>Provides organic bio-control & chemical fungicide dosage calculation</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6E9F5B]" />
                <span>Generates printable/shareable diagnostic report for local Krishi Kendras</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/disease-detection"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2F6B45] text-white font-semibold text-sm hover:bg-[#16352B] transition-colors shadow-sm"
              >
                <span>Upload Leaf Image for Scan</span>
                <ArrowRight className="w-4 h-4 text-[#D6A84A]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <ConfidenceGauge
              score={96.4}
              label="Early Blight (Alternaria solani)"
              sublabel="Pathogen detected on Solanaceae (Tomato) foliage"
            />
            
            <div className="bg-[#16352B] text-[#F7F5EF] p-5 rounded-2xl border border-[#EDE5D4]/20 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#D6A84A]">
                <span className="font-semibold uppercase tracking-wider">Actionable Protocol</span>
                <span>Immediate Remedy</span>
              </div>
              <p className="text-sm text-[#EDE5D4] leading-snug">
                Spray <strong className="text-white">Mancozeb 75% WP @ 2g/liter</strong> of water or bio-agent <strong className="text-white">Trichoderma viride</strong> within 48 hours to prevent canopy spread.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'weather' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <Badge variant="leaf">Actionable Microclimate</Badge>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#17221C] leading-tight">
              Actionable weather insights, not just raw temperatures.
            </h3>
            <p className="text-sm md:text-base text-[#66706A] leading-relaxed">
              Know the exact window to spray pesticides without rain wash-off, calculate irrigation evapotranspiration, and receive frost/heatwave warnings.
            </p>
            <ul className="space-y-2.5 text-sm text-[#17221C]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6E9F5B]" />
                <span>Pesticide Spraying Viability Score based on wind & precipitation</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6E9F5B]" />
                <span>Soil Evapotranspiration water deficit calculation</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6E9F5B]" />
                <span>7-Day microclimate timeline for district-level field planning</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/weather-intelligence"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2F6B45] text-white font-semibold text-sm hover:bg-[#16352B] transition-colors shadow-sm"
              >
                <span>View Hyper-Local Weather Advisor</span>
                <ArrowRight className="w-4 h-4 text-[#D6A84A]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F7F5EF] p-6 rounded-2xl border border-[#EDE5D4] space-y-4">
            <div className="bg-white p-4 rounded-xl border border-[#EDE5D4] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#6E9F5B]/15 text-[#2F6B45]">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-[#17221C] text-sm">Spraying Safety Window</h5>
                  <p className="text-xs text-[#66706A]">Wind 6 km/h · RH 58% · Rain prob 5%</p>
                </div>
              </div>
              <Badge variant="green">OPTIMAL WINDOW</Badge>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-amber-950 text-sm">Unseasonal Frost Alert (Day 4)</h5>
                  <p className="text-xs text-amber-800">Min Temp 3°C expected in Mustard fields</p>
                </div>
              </div>
              <span className="text-xs font-bold uppercase text-amber-900 bg-amber-200 px-2 py-1 rounded">ACTION NEEDED</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'assistant' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <Badge variant="sand">Multilingual Voice AI</Badge>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#17221C] leading-tight">
              Ask agricultural questions in your regional Indian language.
            </h3>
            <p className="text-sm md:text-base text-[#66706A] leading-relaxed">
              No technical jargon or complex apps. Speak or type in Hindi, Marathi, Punjabi, Telugu, or English to receive instant agronomic guidance.
            </p>
            <ul className="space-y-2.5 text-sm text-[#17221C]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6E9F5B]" />
                <span>Voice input & audio read-aloud support ("Suno / Listen")</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6E9F5B]" />
                <span>Real-time Mandi price queries across Agmarknet markets</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6E9F5B]" />
                <span>Government scheme guidance (PM-Kisan, PMFBY, Soil Health Card)</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/farm-assistant"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2F6B45] text-white font-semibold text-sm hover:bg-[#16352B] transition-colors shadow-sm"
              >
                <span>Chat with Voice Farm Assistant</span>
                <ArrowRight className="w-4 h-4 text-[#D6A84A]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#16352B] text-[#F7F5EF] p-6 rounded-2xl border border-[#EDE5D4]/20 space-y-4">
            {/* User Message Bubble */}
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-[#2F6B45] text-white p-3.5 rounded-2xl rounded-tr-none text-xs md:text-sm max-w-[80%] space-y-1">
                <p>"मेरे गेहूँ के खेत में पत्तियाँ पीली पड़ रही हैं, क्या करूँ?"</p>
                <span className="text-[10px] text-[#EDE5D4]/60 block text-right">Hindi Voice Prompt</span>
              </div>
            </div>

            {/* Assistant Response Bubble */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#EDE5D4] text-[#16352B] shrink-0 mt-1">
                <Mic className="w-4 h-4 text-[#2F6B45]" />
              </div>
              <div className="bg-white/10 text-[#F7F5EF] p-4 rounded-2xl rounded-tl-none text-xs md:text-sm border border-white/15 space-y-2 max-w-[90%]">
                <div className="flex items-center justify-between text-xs text-[#D6A84A]">
                  <span className="font-semibold">Farmitron Advisor</span>
                  <span className="bg-[#6E9F5B]/20 text-[#6E9F5B] px-2 py-0.5 rounded text-[10px]">Audio Ready</span>
                </div>
                <p className="text-[#EDE5D4] leading-relaxed">
                  पत्तियों का पीलापन नाइट्रोजन की कमी या येलो रस्ट (Yellow Rust) का लक्षण हो सकता है। यदि धारियां दिखें तो प्रोपिकोनाज़ोल 25% EC का 1 ml/लीटर पानी में छिड़काव करें।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
