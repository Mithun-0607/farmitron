'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Play, 
  MousePointer, 
  Sprout, 
  Scan, 
  CloudSun, 
  MessageSquareText, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  Droplets, 
  Wind, 
  Thermometer, 
  CheckCircle2, 
  Lock, 
  Globe, 
  Sliders, 
  Zap, 
  ChevronRight,
  Sun,
  Smartphone,
  Bot,
  Brain,
  Upload
} from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { Badge } from '@/components/ui/Badge';

export default function LandingPage() {
  const [phLevel, setPhLevel] = useState(6.5);
  const [soilType, setSoilType] = useState('Loamy');

  return (
    <div className="space-y-16 pb-20 bg-[#F9F7F1]">
      
      {/* BRAND & HERO TOP SECTION - EXACT MATCH WITH USER MOCKUP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* TOP BANNER GRID: BRAND SHOWCASE + HERO MAIN + MOBILE APP PREVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* BRAND EMBLEM CARD (LEFT SIDE MOCKUP) */}
          <div className="lg:col-span-3 bg-[#0A1D16] text-white p-8 rounded-3xl border border-[#E2C889]/20 flex flex-col justify-between items-center text-center relative overflow-hidden shadow-xl">
            {/* Background Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#4ADE80]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 pt-4 relative z-10">
              {/* Large Circular Emblem */}
              <div className="w-32 h-32 rounded-full bg-[#0A1D16] border-4 border-[#E2C889] mx-auto flex items-center justify-center p-4 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
                <svg className="w-full h-full" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 4C18 4 23 9 23 16C23 20 20 22 18 23C16 22 13 20 13 16C13 9 18 4 18 4Z" fill="#4ADE80" stroke="#E2C889" strokeWidth="1.2" />
                  <path d="M18 16C18 16 11 15 8 19C5.5 22 8 26 12 25C15 24 17 20 18 16Z" fill="#2F6B45" stroke="#E2C889" strokeWidth="1" />
                  <path d="M18 16C18 16 25 15 28 19C30.5 22 28 26 24 25C21 24 19 20 18 16Z" fill="#2F6B45" stroke="#E2C889" strokeWidth="1" />
                  <path d="M18 23V31M18 27H13M18 29H23" stroke="#E2C889" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="13" cy="27" r="1.5" fill="#4ADE80" />
                  <circle cx="23" cy="29" r="1.5" fill="#4ADE80" />
                  <circle cx="18" cy="31" r="1.5" fill="#E2C889" />
                </svg>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold tracking-wider text-white">
                  FARM<span className="text-[#4ADE80]">i</span>TRON
                </h2>
                <p className="text-xs font-semibold text-[#E2C889] uppercase tracking-wider mt-1.5">
                  Smarter Decisions. Stronger Harvests.
                </p>
              </div>
            </div>

            {/* Icon Feature Row at Bottom */}
            <div className="grid grid-cols-5 gap-2 w-full pt-8 border-t border-white/10 relative z-10 text-[10px]">
              <div className="flex flex-col items-center gap-1 text-[#E2C889]">
                <Brain className="w-4 h-4 text-[#4ADE80]" />
                <span>Smart AI</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[#E2C889]">
                <Sprout className="w-4 h-4 text-[#4ADE80]" />
                <span>Crop Intel</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[#E2C889]">
                <Scan className="w-4 h-4 text-[#4ADE80]" />
                <span>Disease</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[#E2C889]">
                <CloudSun className="w-4 h-4 text-[#4ADE80]" />
                <span>Weather</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[#E2C889]">
                <MessageSquareText className="w-4 h-4 text-[#4ADE80]" />
                <span>AI Assist</span>
              </div>
            </div>
          </div>

          {/* MAIN HERO LANDING CARD (CENTER MOCKUP) */}
          <div className="lg:col-span-6 bg-[#FDFBF7] rounded-3xl p-8 md:p-10 border border-[#EFEAE1] shadow-lg relative overflow-hidden flex flex-col justify-between space-y-8">
            
            {/* Soft Warm Sunlight Gradient Background */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-amber-100/50 via-[#4ADE80]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Hero Copy Content */}
            <div className="space-y-5 relative z-10">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111815] tracking-tight leading-[1.15]">
                Farming,<br />
                guided by <span className="text-[#2F6B45]">intelligence<span className="text-[#4ADE80]">.</span></span>
              </h1>

              <p className="text-sm sm:text-base text-[#66706A] leading-relaxed max-w-md">
                AI-powered insights for crop recommendation, disease detection, weather intelligence and personalized farming support.
              </p>

              {/* Action Buttons matching mockup */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/crop-intelligence"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#16352B] text-white font-extrabold text-xs hover:bg-[#2F6B45] transition-all shadow-md group"
                >
                  <span>Explore Farmitron</span>
                  <ArrowRight className="w-4 h-4 text-[#E2C889] group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white border border-[#EFEAE1] text-[#111815] font-extrabold text-xs hover:bg-[#F9F7F1] transition-all shadow-xs"
                >
                  <span className="w-4 h-4 rounded-full bg-[#E2C889]/30 text-[#16352B] flex items-center justify-center text-[8px] font-bold">▶</span>
                  <span>See How It Works</span>
                </Link>
              </div>
            </div>

            {/* Glowing Holographic Neural Sprout Graphic & Floating Cards */}
            <div className="relative pt-6 min-h-[220px]">
              
              {/* Floating Card 1: Weather Insight Top-Right */}
              <div className="glass-pill-card p-3 rounded-2xl border border-[#EFEAE1] absolute top-0 right-2 z-20 space-y-1 shadow-md w-44">
                <div className="flex items-center justify-between text-[9px] font-bold uppercase text-[#66706A]">
                  <span>WEATHER INSIGHT</span>
                  <CloudSun className="w-3.5 h-3.5 text-[#2F6B45]" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-[#111815]">29°C</span>
                  <span className="text-[10px] text-[#2F6B45] font-semibold">Moderate Rain</span>
                </div>
                {/* Mini Wave Graph */}
                <div className="h-4 w-full flex items-end gap-1 pt-1">
                  <div className="bg-[#4ADE80] w-1/5 h-2/3 rounded-t" />
                  <div className="bg-[#2F6B45] w-1/5 h-full rounded-t" />
                  <div className="bg-[#4ADE80] w-1/5 h-1/2 rounded-t" />
                  <div className="bg-[#E2C889] w-1/5 h-4/5 rounded-t" />
                  <div className="bg-[#2F6B45] w-1/5 h-1/3 rounded-t" />
                </div>
              </div>

              {/* Floating Card 2: Field Health Mid-Left */}
              <div className="glass-pill-card p-3 rounded-2xl border border-[#EFEAE1] absolute top-12 left-0 z-20 space-y-1.5 shadow-md w-44">
                <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-[#66706A]">
                  <Sprout className="w-3.5 h-3.5 text-[#4ADE80]" />
                  <span>FIELD HEALTH</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-extrabold text-[#111815]">Excellent</span>
                  <span className="text-xs font-mono font-bold text-[#2F6B45]">92% Score</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#2F6B45] h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              {/* Floating Card 3: AI Recommendation Bottom Center */}
              <div className="glass-pill-card p-3.5 rounded-2xl border border-[#EFEAE1] absolute bottom-2 left-1/2 -translate-x-1/2 z-30 shadow-lg w-64 flex items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#E2C889] bg-[#0A1D16] px-1.5 py-0.5 rounded flex items-center gap-1 w-max">
                    <Sparkles className="w-2.5 h-2.5 text-[#4ADE80]" />
                    AI RECOMMENDATION
                  </span>
                  <p className="text-[11px] font-semibold text-[#111815]">
                    Delay pesticide application for 24 hours
                  </p>
                </div>
                <Link href="/weather-intelligence" className="p-1.5 rounded-full bg-[#16352B] text-white hover:bg-[#2F6B45]">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E2C889]" />
                </Link>
              </div>

              {/* Holographic Concentric Rings Sprout Visual */}
              <div className="relative mx-auto w-36 h-36 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#4ADE80]/40 animate-neural-ring" />
                <div className="absolute inset-2 rounded-full border border-[#E2C889]/30" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-t from-[#2F6B45]/20 to-[#4ADE80]/30 flex items-center justify-center">
                  <span className="text-4xl animate-bounce">🌱</span>
                </div>
              </div>

            </div>

            {/* Scroll Down Indicator Pill */}
            <div className="flex justify-center pt-2 relative z-10">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#66706A] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-[#EFEAE1]">
                <MousePointer className="w-3 h-3 text-[#2F6B45]" />
                Scroll Down
              </span>
            </div>

          </div>

          {/* MOBILE APP PREVIEW CARD (RIGHT MOCKUP) */}
          <div className="lg:col-span-3 bg-[#0A1D16] rounded-3xl p-5 border border-[#E2C889]/20 shadow-xl flex flex-col justify-between text-white relative">
            
            {/* Phone Screen Mockup Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#E2C889] border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#4ADE80]" />
                  <span className="font-extrabold tracking-wider text-white">FARMiTRON</span>
                </div>
                <span className="text-[10px]">9:41 AM</span>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                  Hello, Farmer! 👋
                </h4>
                <p className="text-xs text-[#E2C889]">Here's your farm overview</p>
              </div>

              {/* Mobile Phone Widgets */}
              <div className="space-y-3">
                
                {/* Weather Now Pill */}
                <div className="bg-[#16352B] p-3 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#E2C889]">Weather Now</span>
                    <span className="block text-xl font-extrabold text-white">29°C</span>
                    <span className="text-[10px] text-[#4ADE80]">Cloudy</span>
                  </div>
                  <CloudSun className="w-8 h-8 text-[#E2C889]" />
                </div>

                {/* Field Health Widget */}
                <div className="bg-[#16352B] p-3 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#E2C889]">Field Health</span>
                    <span className="block text-sm font-extrabold text-[#4ADE80]">Excellent 92%</span>
                  </div>
                  <Sprout className="w-6 h-6 text-[#4ADE80]" />
                </div>

                {/* Quick Actions 4 Grid */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#E2C889] block mb-2">Quick Actions</span>
                  <div className="grid grid-cols-4 gap-1.5 text-[9px] text-center">
                    <Link href="/crop-intelligence" className="bg-white/5 p-2 rounded-xl border border-white/10 flex flex-col items-center gap-1">
                      <Sprout className="w-3.5 h-3.5 text-[#4ADE80]" />
                      <span className="truncate">Crop Intel</span>
                    </Link>
                    <Link href="/disease-detection" className="bg-white/5 p-2 rounded-xl border border-white/10 flex flex-col items-center gap-1">
                      <Scan className="w-3.5 h-3.5 text-[#4ADE80]" />
                      <span className="truncate">Disease</span>
                    </Link>
                    <Link href="/weather-intelligence" className="bg-white/5 p-2 rounded-xl border border-white/10 flex flex-col items-center gap-1">
                      <CloudSun className="w-3.5 h-3.5 text-[#4ADE80]" />
                      <span className="truncate">Weather</span>
                    </Link>
                    <Link href="/farm-assistant" className="bg-white/5 p-2 rounded-xl border border-white/10 flex flex-col items-center gap-1">
                      <MessageSquareText className="w-3.5 h-3.5 text-[#4ADE80]" />
                      <span className="truncate">AI Assist</span>
                    </Link>
                  </div>
                </div>

                {/* AI Insight Mobile Banner */}
                <div className="bg-[#2F6B45]/50 p-3 rounded-2xl border border-[#4ADE80]/30 space-y-1">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-[#E2C889]">
                    <Sparkles className="w-3 h-3 text-[#4ADE80]" />
                    <span>AI Insight</span>
                  </div>
                  <p className="text-[10px] text-white leading-tight">
                    Rain expected tomorrow. Consider delaying pesticide application.
                  </p>
                </div>

              </div>
            </div>

            {/* Mobile Bottom Navbar Simulation */}
            <div className="pt-4 border-t border-white/10 flex justify-around text-[9px] text-[#E2C889]">
              <span className="font-bold text-[#4ADE80]">Home</span>
              <span>Dashboard</span>
              <span>Assistant</span>
              <span>Profile</span>
            </div>

          </div>

        </div>
      </section>

      {/* 3 FEATURE CAROUSEL / SUITE CARDS (BOTTOM RIGHT MOCKUP MATCH) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* CARD 1: CROP INTELLIGENCE (WITH EMBEDDED STEP WIZARD FORM) */}
          <div className="bg-[#0D261E] text-white p-6 rounded-3xl border border-[#E2C889]/20 shadow-xl space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-[#4ADE80]/20 text-[#4ADE80]">
                  <Sprout className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-[#E2C889]">•••</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Crop Intelligence</h3>
                <p className="text-xs text-[#E2C889]/80 mt-1">
                  Get the best crop recommendations based on your soil & environment.
                </p>
              </div>

              {/* Step indicator pills */}
              <div className="flex items-center gap-2 pt-2">
                <span className="w-6 h-6 rounded-full bg-[#4ADE80] text-[#0A1D16] text-xs font-extrabold flex items-center justify-center">1</span>
                <span className="w-6 h-6 rounded-full bg-white/10 text-white text-xs flex items-center justify-center">2</span>
                <span className="w-6 h-6 rounded-full bg-white/10 text-white text-xs flex items-center justify-center">3</span>
                <span className="w-6 h-6 rounded-full bg-white/10 text-white text-xs flex items-center justify-center">4</span>
              </div>

              {/* Embedded Step 1 Card matching mockup */}
              <div className="bg-white text-[#111815] p-4 rounded-2xl space-y-3 shadow-inner">
                <div className="border-b border-[#EFEAE1] pb-2">
                  <span className="text-xs font-extrabold text-[#16352B] block">Step 1</span>
                  <span className="text-[11px] text-[#66706A]">Soil Information</span>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#66706A] mb-1">Soil Type</label>
                  <select 
                    value={soilType} 
                    onChange={(e) => setSoilType(e.target.value)}
                    className="w-full p-2 rounded-xl bg-[#F9F7F1] border border-[#EFEAE1] text-xs font-bold text-[#111815]"
                  >
                    <option value="Loamy">Loamy Soil</option>
                    <option value="Alluvial">Alluvial Soil</option>
                    <option value="Black Cotton">Black Cotton Soil</option>
                    <option value="Sandy">Sandy Loam</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-[#111815] mb-1">
                    <span>pH Level</span>
                    <span className="text-[#2F6B45] font-extrabold">{phLevel}</span>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="8.5"
                    step="0.1"
                    value={phLevel}
                    onChange={(e) => setPhLevel(parseFloat(e.target.value))}
                    className="w-full accent-[#2F6B45] cursor-pointer"
                  />
                </div>

                <Link
                  href="/crop-intelligence"
                  className="w-full py-2.5 rounded-xl bg-[#2F6B45] text-white text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#16352B] transition-colors"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E2C889]" />
                </Link>
              </div>

            </div>
          </div>

          {/* CARD 2: DISEASE DETECTION (DARK SLATE SCANNER MOCKUP MATCH) */}
          <div className="bg-[#122A38] text-white p-6 rounded-3xl border border-sky-400/20 shadow-xl space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-sky-400/20 text-sky-300">
                  <Scan className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-sky-300">•••</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Disease Detection</h3>
                <p className="text-xs text-sky-200/70 mt-1">
                  Upload a leaf image and let AI detect the disease.
                </p>
              </div>

              {/* Drag & Drop Scanner Area matching mockup */}
              <div className="border-2 border-dashed border-sky-400/30 bg-sky-950/40 p-8 rounded-2xl text-center space-y-3 hover:border-sky-400 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-sky-400/20 text-sky-300 mx-auto flex items-center justify-center">
                  <Scan className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-white">Drag & drop leaf image</h5>
                  <p className="text-[10px] text-sky-300">or click to upload</p>
                </div>
                <span className="text-[9px] text-sky-200/60 block uppercase font-mono">Supports JPG, PNG formats</span>
              </div>

            </div>

            <Link
              href="/disease-detection"
              className="w-full py-3 rounded-2xl bg-sky-600 text-white font-extrabold text-xs text-center hover:bg-sky-500 transition-colors shadow-sm"
            >
              Launch Leaf AI Scan
            </Link>
          </div>

          {/* CARD 3: WEATHER INTELLIGENCE (SUNSET GRADIENT MOCKUP MATCH) */}
          <div className="bg-gradient-to-b from-[#2A1E38] via-[#1A2E3D] to-[#0A1D16] text-white p-6 rounded-3xl border border-amber-300/20 shadow-xl space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-300">
                  <Sun className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-amber-300">•••</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Weather Intelligence</h3>
                <p className="text-xs text-amber-200/70 mt-1">
                  Real-time weather updates & smart farming advice.
                </p>
              </div>

              {/* Weather Stats Row */}
              <div className="bg-white/10 p-4 rounded-2xl space-y-3 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-200">Today</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-white">29°C</span>
                    <span className="text-xs text-amber-300">Cloudy</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10px] text-amber-100 text-center pt-2 border-t border-white/10">
                  <div className="bg-white/5 p-1.5 rounded-lg">
                    <span className="block text-white font-bold">65%</span>
                    <span>Humidity</span>
                  </div>
                  <div className="bg-white/5 p-1.5 rounded-lg">
                    <span className="block text-white font-bold">12 km/h</span>
                    <span>Wind</span>
                  </div>
                  <div className="bg-white/5 p-1.5 rounded-lg">
                    <span className="block text-white font-bold">60%</span>
                    <span>Rain Prob</span>
                  </div>
                </div>
              </div>

              {/* Farmitron Insight Pill Box matching mockup */}
              <div className="bg-[#0A1D16] p-3 rounded-2xl border border-amber-300/30 space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#E2C889]">
                  <Sparkles className="w-3 h-3 text-[#4ADE80]" />
                  <span>Farmitron Insight</span>
                </div>
                <p className="text-[11px] text-white leading-tight">
                  High humidity increases disease risk. Monitor your crops closely.
                </p>
              </div>

            </div>

            <Link
              href="/weather-intelligence"
              className="w-full py-3 rounded-2xl bg-[#E2C889] text-[#0A1D16] font-extrabold text-xs text-center hover:bg-[#D6A84A] transition-colors shadow-sm"
            >
              View Weather Insights
            </Link>
          </div>

        </div>

      </section>

      {/* QUOTE BANNER & VALUE PROPOSITION BAR MATCHING MOCKUP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-6">
        
        {/* Quote Banner */}
        <div className="text-center space-y-2 py-4">
          <p className="text-lg md:text-xl font-serif italic text-[#111815]">
            "Technology is best when it brings people together."
          </p>
          <p className="text-xs font-semibold text-[#2F6B45] tracking-wider uppercase">
            Farmitron brings intelligence to every field. 🌿
          </p>
        </div>

        {/* 5-Feature Value Proposition Bar */}
        <div className="bg-[#0A1D16] text-[#E2C889] rounded-3xl p-6 border border-[#E2C889]/20 shadow-xl grid grid-cols-2 md:grid-cols-5 gap-6 text-center text-xs">
          
          <div className="space-y-1.5 flex flex-col items-center">
            <div className="p-2 rounded-xl bg-[#4ADE80]/20 text-[#4ADE80]">
              <Brain className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-white">AI Powered</h5>
            <p className="text-[10px] text-[#E2C889]/70">Advanced machine learning for accurate predictions</p>
          </div>

          <div className="space-y-1.5 flex flex-col items-center">
            <div className="p-2 rounded-xl bg-[#4ADE80]/20 text-[#4ADE80]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-white">Smart Insights</h5>
            <p className="text-[10px] text-[#E2C889]/70">Real-time recommendations for better decisions</p>
          </div>

          <div className="space-y-1.5 flex flex-col items-center">
            <div className="p-2 rounded-xl bg-[#4ADE80]/20 text-[#4ADE80]">
              <Sprout className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-white">Easy to Use</h5>
            <p className="text-[10px] text-[#E2C889]/70">Designed for farmers, built for everyone</p>
          </div>

          <div className="space-y-1.5 flex flex-col items-center">
            <div className="p-2 rounded-xl bg-[#4ADE80]/20 text-[#4ADE80]">
              <Lock className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-white">Secure & Private</h5>
            <p className="text-[10px] text-[#E2C889]/70">Your data is safe and confidential</p>
          </div>

          <div className="col-span-2 md:col-span-1 space-y-1.5 flex flex-col items-center">
            <div className="p-2 rounded-xl bg-[#4ADE80]/20 text-[#4ADE80]">
              <Globe className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-white">Multi Language</h5>
            <p className="text-[10px] text-[#E2C889]/70">Support for regional languages</p>
          </div>

        </div>

      </section>

    </div>
  );
}
