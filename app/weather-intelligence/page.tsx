'use client';

import React, { useState } from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Thermometer, 
  Sun, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  ShieldAlert, 
  Info,
  ChevronDown
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';

const FORECAST_7DAYS = [
  { day: 'Today (Sat)', tempMax: 28, tempMin: 17, rainProb: 10, wind: 7, humidity: 62, icon: '🌤️', sprayWindow: 'Optimal (2PM - 6PM)' },
  { day: 'Sun (Tomorrow)', tempMax: 27, tempMin: 16, rainProb: 15, wind: 8, humidity: 65, icon: '⛅', sprayWindow: 'Good (Morning)' },
  { day: 'Monday', tempMax: 25, tempMin: 14, rainProb: 75, wind: 16, humidity: 82, icon: '🌧️', sprayWindow: 'UNSAFE - Rain Washoff' },
  { day: 'Tuesday', tempMax: 22, tempMin: 11, rainProb: 30, wind: 12, humidity: 70, icon: '🌦️', sprayWindow: 'Caution' },
  { day: 'Wednesday', tempMax: 20, tempMin: 4, rainProb: 5, wind: 5, humidity: 55, icon: '❄️', sprayWindow: 'Optimal (Frost Alert)' },
  { day: 'Thursday', tempMax: 24, tempMin: 10, rainProb: 0, wind: 6, humidity: 50, icon: '☀️', sprayWindow: 'Optimal' },
  { day: 'Friday', tempMax: 26, tempMin: 13, rainProb: 0, wind: 7, humidity: 52, icon: '☀️', sprayWindow: 'Optimal' },
];

export default function WeatherIntelligencePage() {
  const [selectedDay, setSelectedDay] = useState(FORECAST_7DAYS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER SECTION */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EDE5D4] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="leaf" icon={<CloudSun className="w-3.5 h-3.5" />}>
              Actionable Agro Microclimate
            </Badge>
            <span className="text-xs font-mono text-[#66706A]">Station: Sangrur Grid #402</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#17221C] tracking-tight">
            Weather Intelligence & Field Action Advisor
          </h1>
          <p className="text-sm md:text-base text-[#66706A] max-w-2xl">
            We convert weather data into direct farm decisions: pesticide spraying safety, irrigation scheduling, and crop frost protection.
          </p>
        </div>

        <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#EDE5D4] text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#66706A] block">Location</span>
          <span className="text-sm font-bold text-[#16352B] block">Sangrur District, Punjab</span>
          <span className="text-xs text-[#2F6B45]">Elevation: 232m · Alluvial Plain</span>
        </div>
      </div>

      {/* ACTIONABLE ADVISORY CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: SPRAYING VIABILITY INDEX */}
        <div className="card-premium p-6 rounded-3xl space-y-4 border-2 border-[#2F6B45]">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-[#2F6B45]/10 text-[#2F6B45]">
              <Droplets className="w-5 h-5" />
            </div>
            <Badge variant="green">OPTIMAL SPRAY WINDOW</Badge>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#17221C]">Pesticide Spraying Viability</h3>
            <p className="text-xs text-[#66706A] mt-0.5">Evaluated against wind speed, drift & rain likelihood</p>
          </div>

          <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#EDE5D4] space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#16352B]">
              <span>Best Spray Window Today:</span>
              <span>2:00 PM – 6:00 PM</span>
            </div>
            <p className="text-xs text-[#17221C] leading-relaxed">
              Wind speed is low (7 km/h) and no rainfall expected for 18 hours. Spraying fungicides today ensures 98% foliar absorption without wash-off loss.
            </p>
          </div>

          <div className="pt-2 text-xs text-[#66706A] flex justify-between border-t border-[#EDE5D4]">
            <span>Wind Drift Risk: <strong className="text-[#2F6B45]">Very Low</strong></span>
            <span>Rain Washoff: <strong className="text-[#2F6B45]">Minimal</strong></span>
          </div>
        </div>

        {/* CARD 2: IRRIGATION DEFICIT ADVISOR */}
        <div className="card-premium p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-[#6E9F5B]/20 text-[#16352B]">
              <Sun className="w-5 h-5 text-[#2F6B45]" />
            </div>
            <Badge variant="gold">18mm WATER DEFICIT</Badge>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#17221C]">Soil Irrigation Advisor</h3>
            <p className="text-xs text-[#66706A] mt-0.5">Based on Evapotranspiration (ET0) rates</p>
          </div>

          <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#EDE5D4] space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#16352B]">
              <span>Recommended Irrigation:</span>
              <span>Light Irrigation in 48 Hours</span>
            </div>
            <p className="text-xs text-[#17221C] leading-relaxed">
              Recent solar radiation increased soil moisture loss to 3.8 mm/day. Delaying irrigation until Monday's light shower saves 35% borewell energy.
            </p>
          </div>

          <div className="pt-2 text-xs text-[#66706A] flex justify-between border-t border-[#EDE5D4]">
            <span>Root Zone Moisture: <strong className="text-[#D6A84A]">58%</strong></span>
            <span>Est. Water Need: <strong>12,000 L / Acre</strong></span>
          </div>
        </div>

        {/* CARD 3: CLIMATE SEVERE WEATHER ALERT */}
        <div className="bg-[#16352B] text-[#F7F5EF] p-6 rounded-3xl space-y-4 border border-[#2F6B45] shadow-md">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-[#D6A84A]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-[#D6A84A] px-2.5 py-1 rounded-full border border-amber-500/40">
              FROST RISK WARNING
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">Unseasonal Frost Alert (Wed)</h3>
            <p className="text-xs text-[#EDE5D4]/70 mt-0.5">Temperatures dropping to 4°C</p>
          </div>

          <div className="bg-[#2F6B45]/40 p-4 rounded-2xl border border-[#EDE5D4]/20 space-y-2">
            <h4 className="text-xs font-bold text-[#D6A84A] uppercase">Protection Advisory for Mustard & Wheat</h4>
            <p className="text-xs text-[#EDE5D4] leading-relaxed">
              Apply light evening irrigation on Tuesday night to increase heat capacity of soil and shield mustard pods from frost damage.
            </p>
          </div>

          <div className="pt-2 text-xs text-[#EDE5D4]/70 flex justify-between border-t border-[#EDE5D4]/20">
            <span>Alert Code: <strong>AG-FROST-04</strong></span>
            <span className="text-[#D6A84A] font-bold">Action Window: 96 Hrs</span>
          </div>
        </div>

      </div>

      {/* 7-DAY MICROCLIMATE MATRIX */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EDE5D4] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#EDE5D4] pb-4">
          <div>
            <h3 className="font-bold text-[#17221C] text-xl">7-Day Field Planning Forecast</h3>
            <span className="text-xs text-[#66706A]">Click any day to view detailed agronomic recommendations</span>
          </div>
          <Badge variant="sand">Live Grid Data</Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {FORECAST_7DAYS.map((fc) => (
            <button
              key={fc.day}
              onClick={() => setSelectedDay(fc)}
              className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                selectedDay.day === fc.day
                  ? 'border-[#2F6B45] bg-[#2F6B45]/10 shadow-sm font-bold'
                  : 'border-[#EDE5D4] bg-[#F7F5EF] hover:border-[#6E9F5B]'
              }`}
            >
              <span className="text-xs text-[#17221C] block font-bold">{fc.day.split(' ')[0]}</span>
              <span className="text-2xl block my-1">{fc.icon}</span>
              
              <div className="text-xs font-extrabold text-[#17221C]">
                {fc.tempMax}° / <span className="text-[#66706A] font-normal">{fc.tempMin}°</span>
              </div>

              <div className="text-[10px] text-[#2F6B45] font-mono">
                💧 {fc.rainProb}% Rain
              </div>
            </button>
          ))}
        </div>

        {/* SELECTED DAY DETAILED DRILLDOWN */}
        <div className="bg-[#F7F5EF] p-6 rounded-2xl border border-[#EDE5D4] grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#66706A]">Detailed Microclimate</span>
            <h4 className="text-2xl font-extrabold text-[#17221C] mt-1">{selectedDay.day}</h4>
            <p className="text-xs text-[#66706A] mt-1">Humidity: {selectedDay.humidity}% · Wind: {selectedDay.wind} km/h NW</p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#17221C] block mb-1">Spraying Safety Rating</span>
            <Badge variant={selectedDay.sprayWindow.includes('UNSAFE') ? 'alert' : 'green'}>
              {selectedDay.sprayWindow}
            </Badge>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#EDE5D4] space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#66706A]">Agronomic Field Note</span>
            <p className="text-xs text-[#17221C]">
              {selectedDay.rainProb > 50
                ? 'High precipitation likely. Postpone all fertilizer top-dressing and pesticide sprays.'
                : 'Favorable condition for routine farm cultivation and crop monitoring.'}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
