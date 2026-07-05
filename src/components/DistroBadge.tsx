import React from 'react';
import { DistroType } from '../types/playbook';

interface DistroBadgeProps {
  distro: DistroType | string;
  isActive?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
  showVerified?: boolean;
}

export default function DistroBadge({
  distro,
  isActive = false,
  onClick,
  size = 'md',
  showVerified = false
}: DistroBadgeProps) {
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-xs sm:text-sm gap-2'
  };

  const baseClasses = `inline-flex items-center font-medium rounded-lg border transition-all duration-150 select-none font-sans ${sizeClasses[size]}`;
  
  // Move #4: No rainbow dots! Pure neutral selected/unselected segmented tabs.
  const activeClasses = isActive
    ? 'bg-zinc-800 text-white font-semibold border-zinc-700 shadow-sm'
    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 border-transparent';
    
  const cursorClasses = onClick ? 'cursor-pointer' : 'cursor-default';

  return (
    <span
      onClick={onClick}
      className={`${baseClasses} ${activeClasses} ${cursorClasses}`}
    >
      <span>{distro}</span>
      {showVerified && distro === 'Ubuntu' && (
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" title="Verified on Ubuntu 24.04 LTS" />
      )}
    </span>
  );
}
