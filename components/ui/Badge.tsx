import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'forest' | 'green' | 'leaf' | 'gold' | 'sand' | 'alert';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'green',
  size = 'md',
  icon,
  className = '',
}) => {
  const variantStyles = {
    forest: 'bg-[#16352B] text-[#F7F5EF] border-transparent',
    green: 'bg-[#2F6B45]/10 text-[#16352B] border-[#2F6B45]/20',
    leaf: 'bg-[#6E9F5B]/15 text-[#16352B] border-[#6E9F5B]/30',
    gold: 'bg-[#D6A84A]/15 text-[#16352B] border-[#D6A84A]/40',
    sand: 'bg-[#EDE5D4] text-[#17221C] border-[#EDE5D4]',
    alert: 'bg-amber-100 text-amber-900 border-amber-300',
  }[variant];

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 rounded-lg gap-1.5 font-semibold',
  }[size];

  return (
    <span className={`inline-flex items-center border tracking-wide uppercase ${variantStyles} ${sizeStyles} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
