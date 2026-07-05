'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, Search, ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {!isHome && (
            <Link
              href="/"
              className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors flex items-center gap-1.5 text-sm font-medium"
              title="Back to Search"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </Link>
          )}

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-white shadow-inner group-hover:border-zinc-500 transition-colors">
              <Terminal className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-white text-base leading-none">
                Linux Handbook
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 leading-none mt-1">
                Playbook MVP
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            type="button"
            className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-all text-xs font-mono select-none shadow-sm cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span>Search apps, commands, fixes...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-zinc-800 text-zinc-300 rounded border border-zinc-700 font-semibold">
              ⌘K
            </kbd>
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Ubuntu 24.04 LTS
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
