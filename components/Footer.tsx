import React from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { Sprout, ShieldCheck, MapPin, Radio, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#16352B] text-[#F7F5EF] pt-16 pb-12 border-t border-[#2F6B45]/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#EDE5D4]/15">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" size="lg" />
            <p className="text-sm text-[#EDE5D4]/80 leading-relaxed max-w-md font-sans">
              Farmitron is an AI-powered agricultural intelligence platform designed specifically for small and marginal farmers in India. Combining satellite remote sensing, edge computer vision, and hyper-local agronomic models.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-[#D6A84A]">
              <span className="w-2 h-2 rounded-full bg-[#6E9F5B] animate-pulse" />
              <span className="font-mono tracking-wide">SYSTEM ACTIVE: Indian Agro-Climatic Grid v2.4</span>
            </div>
          </div>

          {/* Platform Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D6A84A]">Intelligence Suite</h4>
            <ul className="space-y-2 text-sm text-[#EDE5D4]/75">
              <li>
                <Link href="/crop-intelligence" className="hover:text-[#6E9F5B] transition-colors flex items-center gap-1.5">
                  <span>Crop Suitability Engine</span>
                </Link>
              </li>
              <li>
                <Link href="/disease-detection" className="hover:text-[#6E9F5B] transition-colors flex items-center gap-1.5">
                  <span>Leaf Disease Diagnostic</span>
                </Link>
              </li>
              <li>
                <Link href="/weather-intelligence" className="hover:text-[#6E9F5B] transition-colors flex items-center gap-1.5">
                  <span>Spraying & Rain Advisor</span>
                </Link>
              </li>
              <li>
                <Link href="/farm-assistant" className="hover:text-[#6E9F5B] transition-colors flex items-center gap-1.5">
                  <span>Voice AI Farm Assistant</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#6E9F5B] transition-colors flex items-center gap-1.5">
                  <span>Field Telemetry Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Agricultural Context */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D6A84A]">Indian Agro Zones</h4>
            <ul className="space-y-2 text-sm text-[#EDE5D4]/75">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#6E9F5B]" />
                <span>Indo-Gangetic Plains</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#6E9F5B]" />
                <span>Deccan Plateau Black Soil</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#6E9F5B]" />
                <span>Western Coastal Alluvial</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#6E9F5B]" />
                <span>Eastern Red & Yellow Soils</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#6E9F5B]" />
                <span>Himalayan Temperate Belt</span>
              </li>
            </ul>
          </div>

          {/* Farmers & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D6A84A]">Farmer Empowerment</h4>
            <div className="bg-[#2F6B45]/40 border border-[#EDE5D4]/15 rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F7F5EF]">
                <ShieldCheck className="w-4 h-4 text-[#6E9F5B]" />
                <span>ICAR Alignment</span>
              </div>
              <p className="text-xs text-[#EDE5D4]/70">
                Agronomic models calibrated using Indian Council of Agricultural Research & Krishi Vigyan Kendra guidelines.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#EDE5D4]/60">
          <p>© {new Date().getFullYear()} FARMiTRON. Smarter Decisions. Stronger Harvests.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Krishi Helpline 1800-180-1551</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
