'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from './BrandLogo';
import { 
  ChevronDown, 
  Globe, 
  Menu, 
  X,
  Sprout,
  Scan,
  CloudSun,
  MessageSquareText,
  Sparkles
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#F9F7F1]/95 backdrop-blur-md border-b border-[#EFEAE1] shadow-xs' 
        : 'bg-[#F9F7F1] border-b border-[#EFEAE1]/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Emblem */}
          <BrandLogo size="md" />

          {/* Desktop Navigation Links matching Mockup */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#111815]">
            <Link 
              href="/" 
              className={`transition-colors hover:text-[#2F6B45] ${pathname === '/' ? 'text-[#2F6B45]' : ''}`}
            >
              Home
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative" onMouseLeave={() => setSolutionsOpen(false)}>
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                onMouseEnter={() => setSolutionsOpen(true)}
                className="flex items-center gap-1 transition-colors hover:text-[#2F6B45] py-2"
              >
                <span>Solutions</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#66706A]" />
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-0 w-64 rounded-2xl bg-white border border-[#EFEAE1] shadow-xl py-2 z-50">
                  <Link
                    href="/crop-intelligence"
                    className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#111815] hover:bg-[#F9F7F1] hover:text-[#2F6B45]"
                  >
                    <Sprout className="w-4 h-4 text-[#4ADE80]" />
                    <div>
                      <span className="font-bold block">Crop Intelligence</span>
                      <span className="text-[10px] text-[#66706A]">Multi-step soil recommendations</span>
                    </div>
                  </Link>

                  <Link
                    href="/disease-detection"
                    className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#111815] hover:bg-[#F9F7F1] hover:text-[#2F6B45]"
                  >
                    <Scan className="w-4 h-4 text-[#4ADE80]" />
                    <div>
                      <span className="font-bold block">Disease Detection</span>
                      <span className="text-[10px] text-[#66706A]">Computer vision leaf diagnostic</span>
                    </div>
                  </Link>

                  <Link
                    href="/weather-intelligence"
                    className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#111815] hover:bg-[#F9F7F1] hover:text-[#2F6B45]"
                  >
                    <CloudSun className="w-4 h-4 text-[#4ADE80]" />
                    <div>
                      <span className="font-bold block">Weather Intelligence</span>
                      <span className="text-[10px] text-[#66706A]">Actionable spray & rain advisory</span>
                    </div>
                  </Link>

                  <Link
                    href="/farm-assistant"
                    className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#111815] hover:bg-[#F9F7F1] hover:text-[#2F6B45]"
                  >
                    <MessageSquareText className="w-4 h-4 text-[#4ADE80]" />
                    <div>
                      <span className="font-bold block">AI Farm Assistant</span>
                      <span className="text-[10px] text-[#66706A]">Multilingual voice support</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/about" 
              className={`transition-colors hover:text-[#2F6B45] ${pathname === '/about' ? 'text-[#2F6B45]' : ''}`}
            >
              How It Works
            </Link>

            <Link 
              href="/about" 
              className="transition-colors hover:text-[#2F6B45]"
            >
              About Us
            </Link>

            <Link 
              href="/dashboard" 
              className={`transition-colors hover:text-[#2F6B45] ${pathname === '/dashboard' ? 'text-[#2F6B45]' : ''}`}
            >
              Dashboard
            </Link>
          </nav>

          {/* Right Header Actions matching Mockup */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Language Pill */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#EFEAE1] bg-white text-xs font-semibold text-[#111815] hover:border-[#2F6B45]"
              >
                <Globe className="w-3.5 h-3.5 text-[#2F6B45]" />
                <span>{selectedLang}</span>
                <ChevronDown className="w-3 h-3 text-[#66706A]" />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white border border-[#EFEAE1] shadow-lg py-1 z-50">
                  {['EN', 'HI', 'PA', 'MR', 'TE'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#111815] hover:bg-[#F9F7F1] hover:text-[#2F6B45]"
                    >
                      {lang === 'EN' ? 'English' : lang === 'HI' ? 'हिंदी (Hindi)' : lang === 'PA' ? 'ਪੰਜਾਬੀ (Punjabi)' : lang === 'MR' ? 'मराठी (Marathi)' : 'తెలుగు (Telugu)'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Get Started Gold Button Pill */}
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#E2C889] text-[#0A1D16] text-xs font-extrabold hover:bg-[#D6A84A] transition-all shadow-xs"
            >
              Get Started
            </Link>

          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-[#EFEAE1] bg-white text-[#111815]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F9F7F1] border-b border-[#EFEAE1] px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-2 text-sm font-semibold">
            <Link href="/" className="px-3 py-2 rounded-xl hover:bg-white">Home</Link>
            <Link href="/dashboard" className="px-3 py-2 rounded-xl hover:bg-white">Dashboard</Link>
            <Link href="/crop-intelligence" className="px-3 py-2 rounded-xl hover:bg-white">Crop Intelligence</Link>
            <Link href="/disease-detection" className="px-3 py-2 rounded-xl hover:bg-white">Disease Detection</Link>
            <Link href="/weather-intelligence" className="px-3 py-2 rounded-xl hover:bg-white">Weather Intelligence</Link>
            <Link href="/farm-assistant" className="px-3 py-2 rounded-xl hover:bg-white">AI Assistant</Link>
            <Link href="/about" className="px-3 py-2 rounded-xl hover:bg-white">About Us</Link>
          </div>
        </div>
      )}
    </header>
  );
};
