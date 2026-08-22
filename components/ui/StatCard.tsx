import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  description?: string;
  accentColor?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  change,
  changeType = 'positive',
  icon: Icon,
  description,
  accentColor = '#6E9F5B',
  className = '',
}) => {
  return (
    <div className={`card-premium rounded-2xl p-5 relative overflow-hidden group ${className}`}>
      {/* Decorative accent top line */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#66706A]">
            {title}
          </span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl md:text-3xl font-extrabold text-[#17221C] tracking-tight">
              {value}
            </span>
            {unit && <span className="text-sm font-medium text-[#66706A]">{unit}</span>}
          </div>
        </div>

        <div 
          className="p-2.5 rounded-xl border border-[#EDE5D4] transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: `${accentColor}12` }}
        >
          <Icon className="w-5 h-5" style={{ color: accentColor === '#6E9F5B' ? '#2F6B45' : accentColor }} />
        </div>
      </div>

      {(change || description) && (
        <div className="mt-4 pt-3 border-t border-[#EDE5D4]/70 flex items-center justify-between text-xs">
          {change && (
            <span className={`font-semibold flex items-center gap-1 ${
              changeType === 'positive' 
                ? 'text-[#2F6B45]' 
                : changeType === 'negative' 
                ? 'text-amber-800' 
                : 'text-[#66706A]'
            }`}>
              {change}
            </span>
          )}
          {description && (
            <span className="text-[#66706A] truncate max-w-[180px]">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
