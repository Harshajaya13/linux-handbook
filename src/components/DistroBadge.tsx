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
  const getBadgeStyles = (d: string) => {
    switch (d) {
      case 'Ubuntu':
        return 'border-orange-500/30 bg-orange-500/10 text-orange-400 hover:border-orange-500/50';
      case 'Debian':
        return 'border-red-500/30 bg-red-500/10 text-red-400 hover:border-red-500/50';
      case 'Arch':
        return 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:border-cyan-500/50';
      case 'Fedora':
        return 'border-blue-500/30 bg-blue-500/10 text-blue-400 hover:border-blue-500/50';
      case 'NixOS':
        return 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:border-indigo-500/50';
      case 'Flatpak':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:border-emerald-500/50';
      case 'Snap':
        return 'border-teal-500/30 bg-teal-500/10 text-teal-400 hover:border-teal-500/50';
      case 'AppImage':
        return 'border-purple-500/30 bg-purple-500/10 text-purple-400 hover:border-purple-500/50';
      default:
        return 'border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-600';
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5'
  };

  const baseClasses = `inline-flex items-center font-medium rounded-md border transition-all duration-150 select-none ${sizeClasses[size]}`;
  const activeClasses = isActive
    ? 'ring-2 ring-white/20 shadow-sm border-transparent bg-zinc-800 text-white'
    : getBadgeStyles(distro);
  const cursorClasses = onClick ? 'cursor-pointer' : 'cursor-default';

  return (
    <span
      onClick={onClick}
      className={`${baseClasses} ${activeClasses} ${cursorClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      <span>{distro}</span>
      {showVerified && distro === 'Ubuntu' && (
        <span className="ml-1 text-[10px] uppercase font-bold tracking-wider px-1 py-0.2 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
          Verified 24.04
        </span>
      )}
    </span>
  );
}
