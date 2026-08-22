'use client';

import React from 'react';

interface ConfidenceGaugeProps {
  score: number; // 0 to 100
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
}

export const ConfidenceGauge: React.FC<ConfidenceGaugeProps> = ({
  score,
  label = 'AI Diagnostic Match',
  sublabel = 'Based on 40,000+ Indian agro dataset samples',
  size = 'md',
  showBadge = true,
}) => {
  const radius = size === 'sm' ? 36 : size === 'md' ? 52 : 68;
  const strokeWidth = size === 'sm' ? 6 : size === 'md' ? 8 : 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (val: number) => {
    if (val >= 90) return '#2F6B45'; // Primary Green
    if (val >= 75) return '#6E9F5B'; // Fresh Leaf
    if (val >= 50) return '#D6A84A'; // Harvest Gold
    return '#C2593F';
  };

  const color = getColor(score);

  return (
    <div className="flex items-center gap-4 bg-white border border-[#EDE5D4] rounded-2xl p-4 shadow-sm">
      {/* SVG Ring Gauge */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg 
          width={radius * 2 + strokeWidth * 2} 
          height={radius * 2 + strokeWidth * 2} 
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="#EDE5D4"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Foreground animated score circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <span className="font-extrabold text-[#17221C] tracking-tight leading-none text-base md:text-lg">
            {score}%
          </span>
        </div>
      </div>

      {/* Label and Details */}
      <div className="flex flex-col justify-center">
        {showBadge && (
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#16352B] bg-[#EDE5D4] px-2 py-0.5 rounded-full w-max mb-1">
            {score >= 90 ? 'High Confidence' : score >= 75 ? 'Moderate Confidence' : 'Review Needed'}
          </span>
        )}
        <h4 className="text-sm font-bold text-[#17221C]">{label}</h4>
        {sublabel && <p className="text-xs text-[#66706A] mt-0.5">{sublabel}</p>}
      </div>
    </div>
  );
};
