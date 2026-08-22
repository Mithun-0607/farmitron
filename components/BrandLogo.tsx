import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  variant = 'dark', 
  className = '',
  size = 'md',
  showTagline = false,
}) => {
  const isDark = variant === 'dark'; // dark text for light background

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-24 h-24'
  }[size];

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  }[size];

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.01] ${className}`}
    >
      {/* Circular Emblem with Neural Plant Roots */}
      <div className="relative flex items-center justify-center shrink-0">
        <div className={`rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
          isDark 
            ? 'bg-[#0A1D16] border-[#E2C889] text-[#4ADE80] shadow-sm' 
            : 'bg-[#0A1D16] border-[#E2C889] text-[#4ADE80]'
        } ${iconSizes}`}>
          {/* Stylized 3-Leaf Sprout with Circuit Roots SVG matching mockup */}
          <svg className="w-3/5 h-3/5" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Center Main Leaf */}
            <path d="M18 4C18 4 23 9 23 16C23 20 20 22 18 23C16 22 13 20 13 16C13 9 18 4 18 4Z" fill="#4ADE80" stroke="#E2C889" strokeWidth="1.2" />
            {/* Left Leaf */}
            <path d="M18 16C18 16 11 15 8 19C5.5 22 8 26 12 25C15 24 17 20 18 16Z" fill="#2F6B45" stroke="#E2C889" strokeWidth="1" />
            {/* Right Leaf */}
            <path d="M18 16C18 16 25 15 28 19C30.5 22 28 26 24 25C21 24 19 20 18 16Z" fill="#2F6B45" stroke="#E2C889" strokeWidth="1" />
            {/* Neural Root Lines */}
            <path d="M18 23V31M18 27H13M18 29H23" stroke="#E2C889" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="13" cy="27" r="1.5" fill="#4ADE80" />
            <circle cx="23" cy="29" r="1.5" fill="#4ADE80" />
            <circle cx="18" cy="31" r="1.5" fill="#E2C889" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-wider ${titleSizes} ${isDark ? 'text-[#0A1D16]' : 'text-white'}`}>
          FARM<span className="text-[#4ADE80]">i</span>TRON
        </span>
        
        {showTagline && (
          <span className="text-[11px] tracking-wider font-medium text-[#E2C889] mt-1">
            Smarter Decisions. Stronger Harvests.
          </span>
        )}
      </div>
    </Link>
  );
};
