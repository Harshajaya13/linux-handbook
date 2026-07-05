'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Clock, Flame, Sparkles, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { getRecentlyViewed, getPopularPlaybooks, getRecentlyAddedPlaybooks } from '../lib/search';
import { Playbook } from '../types/playbook';

export default function HomePage() {
  const [recentlyViewed, setRecentlyViewed] = useState<Playbook[]>([]);
  const [popular, setPopular] = useState<Playbook[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<Playbook[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setRecentlyViewed(getRecentlyViewed());
    setPopular(getPopularPlaybooks());
    setRecentlyAdded(getRecentlyAddedPlaybooks());
  }, []);

  // Lighter, borderless card design with subtle background and hover transition (Rule #9)
  const renderPlaybookItem = (pb: Playbook, badge?: string) => (
    <Link
      key={pb.slug}
      href={`/playbook/${pb.slug}`}
      className="group p-4 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-transparent hover:border-zinc-800 transition-all flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold shrink-0 group-hover:scale-105 transition-transform">
          <Terminal className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm sm:text-base tracking-tight truncate group-hover:text-emerald-400 transition-colors">
              {pb.name}
            </span>
            {badge && (
              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-zinc-800/60 text-zinc-500 shrink-0">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 truncate font-sans">
            {pb.tagline}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 group-hover:text-zinc-400 shrink-0 transition-colors">
        <span className="hidden sm:inline">{pb.category}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-emerald-500/60 group-hover:text-emerald-400" />
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-emerald-500/30 font-sans">
      {/* Top bar */}
      <header className="w-full border-b border-zinc-900/60 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight">
              Linux Handbook
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/60 border border-zinc-800/60 text-zinc-400">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ubuntu 24.04 Server Headless</span>
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              ⌘K
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchBar
        variant="modal"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Main Container: Search is the undisputed HERO (Rule #1) */}
      <main className="flex-1 flex flex-col items-center justify-start max-w-4xl mx-auto w-full px-4 sm:px-6 pt-16 sm:pt-24 pb-20 space-y-14">
        {/* Hero Section */}
        <div className="w-full text-center space-y-6 animate-in fade-in duration-300">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              What do you need to install or fix?
            </h1>
            <p className="text-xs sm:text-sm font-mono text-zinc-500 max-w-md mx-auto">
              Search software, installation commands, troubleshooting gotchas, and Linux alternatives.
            </p>
          </div>

          {/* Huge Hero Search Bar */}
          <div className="w-full pt-2">
            <SearchBar variant="hero" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-600 pt-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Zero AI filler</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Under 30s solutions</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-500" />
              <span>Copyable commands</span>
            </span>
          </div>
        </div>

        {/* Below Search: Lighter, quieter list sections (Rule #1 & #9) */}
        <div className="w-full space-y-10 pt-6 border-t border-zinc-900/80 animate-in fade-in duration-500">
          {/* Recently Viewed */}
          {recentlyViewed && recentlyViewed.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Recently Viewed</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {recentlyViewed.map((pb) => renderPlaybookItem(pb, 'Recent'))}
              </div>
            </section>
          )}

          {/* Popular */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Popular Playbooks</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {popular.map((pb) => renderPlaybookItem(pb))}
            </div>
          </section>

          {/* Recently Added */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Recently Added (Ubuntu 24.04 Server Headless)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {recentlyAdded.map((pb) => renderPlaybookItem(pb, 'New'))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900/60 bg-zinc-950 py-8 text-center text-xs text-zinc-600 font-mono space-y-2">
        <div className="flex items-center justify-center gap-2 text-zinc-500">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold tracking-wider uppercase">Linux Handbook Playbook</span>
        </div>
        <p className="max-w-md mx-auto leading-relaxed">
          Can a user go from &ldquo;I need this software&rdquo; to &ldquo;It&apos;s working&rdquo; in under 30 seconds without leaving this page?
        </p>
      </footer>
    </div>
  );
}
