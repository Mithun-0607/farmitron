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
  ChevronDown,
  Brain,
  ArrowRight,
  RefreshCw,
  TrendingUp
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

interface WeatherPrediction {
  predicted_temperature: number;
  temperature_category: string;
  interpretation: string;
  farm_advisory: string;
  heat_stress_risk: string;
  irrigation_alert: boolean;
  inputs_received: Record<string, number>;
}

const today = new Date();

export default function WeatherIntelligencePage() {
  const [selectedDay, setSelectedDay] = useState(FORECAST_7DAYS[0]);

  // AI Forecast Panel State
  const [isForecasting, setIsForecasting] = useState(false);
  const [forecastResult, setForecastResult] = useState<WeatherPrediction | null>(null);
  const [forecastError, setForecastError] = useState<string | null>(null);

  // Editable weather inputs with sensible defaults for North India August
  const [weatherInputs, setWeatherInputs] = useState({
    meantemp: 28.0,
    humidity: 72.0,
    wind_speed: 8.0,
    meanpressure: 1008.0,
    temp_lag1: 27.5,
    humidity_lag1: 70.0,
    wind_lag1: 7.5,
    pressure_lag1: 1007.5,
    temp_avg3: 27.8,
    humidity_avg3: 71.0,
    wind_avg3: 8.0,
    month: today.getMonth() + 1,
    day_of_year: Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000),
  });

  const handleForecast = async () => {
    setIsForecasting(true);
    setForecastError(null);

    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000';
    try {
      const response = await fetch(`${apiBase}/predict-weather`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meantemp: Number(weatherInputs.meantemp),
          humidity: Number(weatherInputs.humidity),
          wind_speed: Number(weatherInputs.wind_speed),
          meanpressure: Number(weatherInputs.meanpressure),
          temp_lag1: Number(weatherInputs.temp_lag1),
          humidity_lag1: Number(weatherInputs.humidity_lag1),
          wind_lag1: Number(weatherInputs.wind_lag1),
          pressure_lag1: Number(weatherInputs.pressure_lag1),
          temp_avg3: Number(weatherInputs.temp_avg3),
          humidity_avg3: Number(weatherInputs.humidity_avg3),
          wind_avg3: Number(weatherInputs.wind_avg3),
          month: Number(weatherInputs.month),
          day_of_year: Number(weatherInputs.day_of_year),
        }),
      });

      if (!response.ok) {
        throw new Error(`FastAPI error (${response.status}): ${response.statusText}`);
      }

      const data = await response.json();
      if (data && (data.success || data.predicted_temperature !== undefined)) {
        setForecastResult(data);
      } else {
        throw new Error(data.error || 'Invalid response from weather ML backend.');
      }
    } catch (err: any) {
      setForecastError(
        err.message ||
          `Unable to connect to FARMiTRON AI backend at ${process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000'}/predict-weather. Please ensure uvicorn is running.`
      );
    } finally {
      setIsForecasting(false);
    }
  };

  const updateInput = (key: keyof typeof weatherInputs, value: string) => {
    setWeatherInputs((prev) => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const heatRiskColor = (risk: string) => {
    if (risk === 'High') return 'text-red-600 font-bold';
    if (risk === 'Moderate') return 'text-amber-600 font-bold';
    return 'text-[#2F6B45] font-bold';
  };

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

      {/* ── AI WEATHER FORECAST PANEL (NEW) ──────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EFEAE1] shadow-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EFEAE1] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="green" icon={<Brain className="w-3.5 h-3.5 text-[#2F6B45]" />}>
                RandomForest Regressor — Tomorrow's Temp
              </Badge>
              <span className="text-xs font-mono text-[#66706A]">{process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000'}/predict-weather</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#111815]">AI Temperature Forecast Engine</h2>
            <p className="text-xs text-[#66706A]">
              Enter today's weather readings. The ML model predicts tomorrow's temperature using 13 telemetry features (lag, rolling averages, seasonality).
            </p>
          </div>
          {forecastResult && (
            <button
              onClick={() => { setForecastResult(null); setForecastError(null); }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#EFEAE1] bg-[#F9F7F1] text-xs font-bold text-[#16352B] hover:bg-[#EFEAE1]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              New Forecast
            </button>
          )}
        </div>

        {/* Input Grid */}
        {!forecastResult && !isForecasting && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'meantemp', label: "Today's Temp (°C)", icon: '🌡️', min: -10, max: 55, step: 0.5 },
                { key: 'humidity', label: "Today's Humidity (%)", icon: '💧', min: 0, max: 100, step: 1 },
                { key: 'wind_speed', label: "Today's Wind (km/h)", icon: '💨', min: 0, max: 100, step: 0.5 },
                { key: 'meanpressure', label: "Today's Pressure (hPa)", icon: '⏱️', min: 950, max: 1050, step: 0.5 },
              ].map(({ key, label, icon, min, max, step }) => (
                <div key={key} className="bg-[#F9F7F1] p-4 rounded-2xl border border-[#EFEAE1] space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#111815]">
                    {icon} {label}
                  </label>
                  <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={weatherInputs[key as keyof typeof weatherInputs]}
                    onChange={(e) => updateInput(key as keyof typeof weatherInputs, e.target.value)}
                    className="w-full p-2 rounded-xl border border-[#EFEAE1] bg-white text-sm font-bold text-[#111815] focus:outline-none focus:border-[#2F6B45]"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'temp_lag1', label: "Yesterday's Temp (°C)", icon: '📅', step: 0.5 },
                { key: 'humidity_lag1', label: "Yesterday's Humidity (%)", icon: '📅', step: 1 },
                { key: 'temp_avg3', label: "3-Day Avg Temp (°C)", icon: '📊', step: 0.5 },
                { key: 'humidity_avg3', label: "3-Day Avg Humidity (%)", icon: '📊', step: 1 },
              ].map(({ key, label, icon, step }) => (
                <div key={key} className="bg-[#F9F7F1] p-4 rounded-2xl border border-[#EFEAE1] space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#111815]">
                    {icon} {label}
                  </label>
                  <input
                    type="number"
                    step={step}
                    value={weatherInputs[key as keyof typeof weatherInputs]}
                    onChange={(e) => updateInput(key as keyof typeof weatherInputs, e.target.value)}
                    className="w-full p-2 rounded-xl border border-[#EFEAE1] bg-white text-sm font-bold text-[#111815] focus:outline-none focus:border-[#2F6B45]"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#EFEAE1]">
              <p className="text-[11px] text-[#66706A]">
                Month: <strong>{weatherInputs.month}</strong> · Day of Year: <strong>{weatherInputs.day_of_year}</strong>
                {' '}(auto-filled from system date)
              </p>
              <button
                onClick={handleForecast}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A1D16] text-white text-sm font-bold hover:bg-[#2F6B45] transition-all shadow-md"
              >
                <Brain className="w-4 h-4 text-[#4ADE80]" />
                <span>Predict Tomorrow's Temperature</span>
                <ArrowRight className="w-4 h-4 text-[#E2C889]" />
              </button>
            </div>
          </>
        )}

        {/* Loading State */}
        {isForecasting && (
          <div className="text-center py-12 space-y-4">
            <div className="w-14 h-14 bg-[#0A1D16] rounded-2xl flex items-center justify-center mx-auto animate-bounce">
              <Brain className="w-7 h-7 text-[#4ADE80]" />
            </div>
            <h3 className="text-lg font-extrabold text-[#111815]">Running RandomForest Weather Model...</h3>
            <p className="text-xs text-[#66706A]">
              Transmitting 13 weather telemetry features to FastAPI /predict-weather.
            </p>
          </div>
        )}

        {/* Error Banner */}
        {forecastError && !isForecasting && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="p-2 bg-amber-100 rounded-xl shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-amber-950 text-sm">Backend Connection Notice</h4>
              <p className="text-xs text-amber-900 leading-relaxed">{forecastError}</p>
              <button
                onClick={handleForecast}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-bold hover:bg-amber-900"
              >
                <RefreshCw className="w-3 h-3" />
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Prediction Result Card */}
        {forecastResult && !isForecasting && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Result */}
              <div className="bg-[#0A1D16] text-white p-6 rounded-2xl border border-[#E2C889]/20 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="green">ML FORECAST RESULT</Badge>
                  <span className="text-xs font-mono text-[#E2C889]">RandomForestRegressor</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-[#E2C889] tracking-wider block mb-1">
                    Predicted Temperature — Tomorrow
                  </span>
                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-extrabold text-[#4ADE80]">
                      {forecastResult.predicted_temperature}°C
                    </span>
                    <span className="text-sm text-[#EDE5D4]/70 pb-1">{forecastResult.temperature_category}</span>
                  </div>
                </div>
                <p className="text-xs text-[#F9F7F1]/80 leading-relaxed">{forecastResult.interpretation}</p>
              </div>

              {/* Farm Advisory */}
              <div className="bg-white border border-[#EFEAE1] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#2F6B45]" />
                  <h4 className="font-bold text-sm text-[#111815] uppercase tracking-wider">Farm Action Advisory</h4>
                </div>
                <p className="text-xs text-[#17221C] leading-relaxed">{forecastResult.farm_advisory}</p>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#EFEAE1]">
                  <div className="bg-[#F9F7F1] p-3 rounded-xl border border-[#EFEAE1]">
                    <span className="text-[10px] text-[#66706A] uppercase font-bold block">Heat Stress Risk</span>
                    <span className={`text-sm mt-0.5 block ${heatRiskColor(forecastResult.heat_stress_risk)}`}>
                      {forecastResult.heat_stress_risk}
                    </span>
                  </div>
                  <div className="bg-[#F9F7F1] p-3 rounded-xl border border-[#EFEAE1]">
                    <span className="text-[10px] text-[#66706A] uppercase font-bold block">Irrigation Alert</span>
                    <span className={`text-sm mt-0.5 font-bold block ${forecastResult.irrigation_alert ? 'text-red-600' : 'text-[#2F6B45]'}`}>
                      {forecastResult.irrigation_alert ? '⚠️ Required' : '✅ Not Required'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── EXISTING ADVISORY CARDS GRID (UNCHANGED) ────────────────────── */}
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

      {/* ── 7-DAY MICROCLIMATE MATRIX (UNCHANGED) ───────────────────────── */}
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
