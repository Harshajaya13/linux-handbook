'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isPrimary?: boolean;
}

export default function CopyButton({ text, label, className = '', size = 'md', isPrimary = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-xs sm:text-sm gap-2',
    lg: 'px-4 py-2 text-sm gap-2.5'
  };

  // Apple design discipline: The primary action is the ONLY filled, colored button on screen.
  // Everything else stays quiet ghost style.
  const styleClasses = copied
    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)] font-semibold'
    : isPrimary
    ? 'bg-[#5EEAD4] hover:bg-[#4dd0ba] text-[#0f1114] font-semibold border border-transparent shadow-[0_4px_14px_rgba(94,234,212,0.25)] hover:shadow-[0_6px_20px_rgba(94,234,212,0.35)]'
    : 'bg-white/[0.04] hover:bg-white/[0.08] text-[#a8adb5] hover:text-white border border-white/[0.08] font-medium';

  return (
    <button
      onClick={handleCopy}
      type="button"
      title="Copy to clipboard"
      className={`inline-flex items-center justify-center font-sans rounded-lg transition-all duration-150 cursor-pointer select-none ${styleClasses} ${sizeClasses[size]} ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400 animate-in zoom-in-50 duration-150 shrink-0" />
          <span>{label || 'Copied'}</span>
        </>
      ) : (
        <>
          <Copy className={`w-3.5 h-3.5 shrink-0 ${isPrimary ? 'text-[#0f1114]' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
          <span>{label || 'Copy'}</span>
        </>
      )}
    </button>
  );
}
