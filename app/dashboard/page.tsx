'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Sprout, 
  Scan, 
  CloudSun, 
  MessageSquareText, 
  FileText, 
  Settings, 
  Calendar, 
  CheckCircle2, 
  Droplets, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  MoreVertical, 
  X, 
  Brain, 
  Lock, 
  Globe, 
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { Badge } from '@/components/ui/Badge';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#F9F7F1] flex flex-col lg:flex-row">
      
      {/* DARK FOREST SIDEBAR NAVIGATION MATCHING MOCKUP */}
      <aside className="w-full lg:w-64 bg-[#0A1D16] text-white p-6 border-r border-[#E2C889]/15 flex flex-col justify-between shrink-0">
        
        <div className="space-y-8">
          {/* Sidebar Brand Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <BrandLogo variant="light" size="sm" />
            <button className="text-[#E2C889] hover:text-white lg:hidden">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-xs font-semibold">
            <Link
              href="/dashboard"
              className="flex items-center justify-between px-3.5 py-3 rounded-2xl bg-[#16352B] text-[#4ADE80] border border-[#4ADE80]/30 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4 text-[#4ADE80]" />
                <span>Dashboard</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
            </Link>

            <Link
              href="/crop-intelligence"
              className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[#E2C889]/80 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Sprout className="w-4 h-4 text-[#4ADE80]" />
              <span>Crop Intelligence</span>
            </Link>

            <Link
              href="/disease-detection"
              className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[#E2C889]/80 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Scan className="w-4 h-4 text-[#4ADE80]" />
              <span>Disease Detection</span>
            </Link>

            <Link
              href="/weather-intelligence"
              className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[#E2C889]/80 hover:bg-white/5 hover:text-white transition-colors"
            >
              <CloudSun className="w-4 h-4 text-[#4ADE80]" />
              <span>Weather Intelligence</span>
            </Link>

            <Link
              href="/farm-assistant"
              className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[#E2C889]/80 hover:bg-white/5 hover:text-white transition-colors"
            >
              <MessageSquareText className="w-4 h-4 text-[#4ADE80]" />
              <span>AI Assistant</span>
            </Link>

            <div className="pt-4 border-t border-white/10 space-y-1">
              <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[#E2C889]/60 hover:bg-white/5 hover:text-white transition-colors text-left">
                <FileText className="w-4 h-4" />
                <span>Reports</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[#E2C889]/60 hover:bg-white/5 hover:text-white transition-colors text-left">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </nav>
        </div>

        {/* User Profile Card at Bottom of Sidebar */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2F6B45] text-white flex items-center justify-center font-bold border border-[#E2C889]">
              M
            </div>
            <div>
              <span className="block font-bold text-white leading-tight">Mithun B.</span>
              <span className="text-[10px] text-[#4ADE80]">Premium Farmer</span>
            </div>
          </div>
          <MoreVertical className="w-4 h-4 text-[#E2C889] cursor-pointer" />
        </div>

      </aside>

      {/* MAIN DASHBOARD CONTENT AREA */}
      <main className="flex-grow p-6 lg:p-10 space-y-8 max-w-6xl">
        
        {/* DASHBOARD HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#111815] tracking-tight">
              Dashboard
            </h1>
            <h2 className="text-base font-bold text-[#111815] mt-1">
              Welcome back, Mithun! 👋
            </h2>
            <p className="text-xs text-[#66706A]">
              Here's what's happening on your farm today.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-[#EFEAE1] text-xs font-semibold text-[#111815] shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-[#2F6B45]" />
            <span>20 Aug 2024</span>
          </div>
        </div>

        {/* TOP 4 STAT PILL CARDS MATCHING MOCKUP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Stat 1: Weather */}
          <div className="bg-white p-4 rounded-2xl border border-[#EFEAE1] shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#66706A] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#4ADE80]" />
                Weather
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-[#111815]">29°C</span>
                <span className="text-xs text-[#66706A]">Cloudy</span>
              </div>
            </div>
            <CloudSun className="w-6 h-6 text-[#2F6B45]" />
          </div>

          {/* Stat 2: Field Health */}
          <div className="bg-white p-4 rounded-2xl border border-[#EFEAE1] shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#66706A] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#4ADE80]" />
                Field Health
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-[#111815]">92%</span>
                <span className="text-xs text-[#2F6B45] font-semibold">Excellent</span>
              </div>
            </div>
            <Sprout className="w-6 h-6 text-[#4ADE80]" />
          </div>

          {/* Stat 3: Soil Moisture */}
          <div className="bg-white p-4 rounded-2xl border border-[#EFEAE1] shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#66706A] flex items-center gap-1">
                <Droplets className="w-3 h-3 text-[#2F6B45]" />
                Soil Moisture
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-[#111815]">65%</span>
                <span className="text-xs text-[#2F6B45]">Optimal</span>
              </div>
            </div>
            <Droplets className="w-6 h-6 text-[#2F6B45]" />
          </div>

          {/* Stat 4: AI Insight */}
          <div className="bg-white p-4 rounded-2xl border border-[#EFEAE1] shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#66706A] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E2C889]" />
                AI Insight
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-extrabold text-[#111815]">New</span>
                <span className="text-[10px] text-[#66706A]">Recommendation</span>
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-[#E2C889]" />
          </div>

        </div>

        {/* MAIN INSIGHT CARD + RECENT ACTIVITY GRID MATCHING MOCKUP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT MAIN CARD: TODAY'S AI FARMING INSIGHT */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#EFEAE1] shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden">
            
            <div className="space-y-3 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#66706A] block">
                Today's AI Farming Insight
              </span>
              
              <p className="text-base sm:text-lg font-bold text-[#111815] leading-snug max-w-md">
                Moderate rain expected tomorrow. Consider delaying fertilizer application for best results.
              </p>

              <div className="pt-2">
                <Link
                  href="/crop-intelligence"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2F6B45] text-white text-xs font-bold hover:bg-[#16352B] transition-colors shadow-xs"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E2C889]" />
                </Link>
              </div>
            </div>

            {/* Farm & Drone Image Graphic Overlay */}
            <div className="rounded-2xl overflow-hidden h-36 relative border border-[#EFEAE1]">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80"
                alt="Agricultural drone over crop field"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D16]/80 via-transparent to-transparent flex items-end p-3 text-white">
                <span className="text-[10px] font-semibold text-[#E2C889]">
                  Drone Telemetry & Weather Sync Active
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT CARD: RECENT ACTIVITY LIST MATCHING MOCKUP */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#EFEAE1] shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#66706A] block">
                Recent Activity
              </span>

              <div className="space-y-3">
                
                {/* Item 1 */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F9F7F1] border border-[#EFEAE1]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#4ADE80]/20 text-[#2F6B45]">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#111815]">Crop Recommendation</h4>
                      <p className="text-[10px] text-[#66706A]">Maize • High Suitability</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#66706A] font-mono">2h ago</span>
                </div>

                {/* Item 2 */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F9F7F1] border border-[#EFEAE1]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-400/20 text-amber-800">
                      <Scan className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#111815]">Disease Detection</h4>
                      <p className="text-[10px] text-[#66706A]">Early Blight • Low Risk</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#66706A] font-mono">5h ago</span>
                </div>

                {/* Item 3 */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F9F7F1] border border-[#EFEAE1]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#2F6B45]/20 text-[#2F6B45]">
                      <CloudSun className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#111815]">Weather Update</h4>
                      <p className="text-[10px] text-[#66706A]">Moderate Rain Tomorrow</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#66706A] font-mono">1d ago</span>
                </div>

              </div>
            </div>

            <Link
              href="/farm-assistant"
              className="w-full py-2.5 rounded-xl border border-[#EFEAE1] bg-[#F9F7F1] text-xs font-bold text-[#111815] text-center hover:bg-[#EFEAE1] transition-colors"
            >
              View All Logs & History
            </Link>
          </div>

        </div>

        {/* BOTTOM VALUE PROPOSITION BAR MATCHING MOCKUP */}
        <div className="bg-[#0A1D16] text-[#E2C889] rounded-3xl p-5 border border-[#E2C889]/20 shadow-xl grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-xs">
          <div className="space-y-1">
            <h5 className="font-bold text-white">AI Powered</h5>
            <p className="text-[9px] text-[#E2C889]/70">Advanced machine learning for accurate predictions</p>
          </div>
          <div className="space-y-1">
            <h5 className="font-bold text-white">Smart Insights</h5>
            <p className="text-[9px] text-[#E2C889]/70">Real-time recommendations for better decisions</p>
          </div>
          <div className="space-y-1">
            <h5 className="font-bold text-white">Easy to Use</h5>
            <p className="text-[9px] text-[#E2C889]/70">Designed for farmers, built for everyone</p>
          </div>
          <div className="space-y-1">
            <h5 className="font-bold text-white">Secure & Private</h5>
            <p className="text-[9px] text-[#E2C889]/70">Your data is safe and confidential</p>
          </div>
          <div className="col-span-2 md:col-span-1 space-y-1">
            <h5 className="font-bold text-white">Multi Language</h5>
            <p className="text-[9px] text-[#E2C889]/70">Support for regional languages</p>
          </div>
        </div>

      </main>

    </div>
  );
}
