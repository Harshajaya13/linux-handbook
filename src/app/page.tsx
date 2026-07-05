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

  const renderPlaybookCard = (pb: Playbook, badge?: string) => (
    <Link
      key={pb.slug}
      href={`/playbook/${pb.slug}`}
      className="group p-5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-400 font-mono text-sm font-bold group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-base tracking-tight group-hover:text-emerald-400 transition-colors">
              {pb.name}
            </span>
          </div>
          {badge && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed font-sans">
          {pb.tagline}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
        <span className="text-emerald-400 font-semibold">{pb.category}</span>
        <span className="flex items-center gap-1 text-zinc-400 group-hover:text-white transition-colors">
          <span>Open</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-emerald-500/30 font-sans">
      {/* Top bar with minimal status */}
      <header className="w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
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
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
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

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-20 space-y-16">
        {/* Centered Hero Section (Strictly: Logo, Search bar, Tagline. Nothing else!) */}
        <div className="w-full max-w-3xl text-center space-y-8 animate-in fade-in duration-300">
          {/* Logo & Title */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 border border-zinc-700/80 flex items-center justify-center text-emerald-400 shadow-2xl ring-1 ring-white/10">
              <Terminal className="w-8 h-8 animate-pulse" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Linux Handbook
            </h1>
            <p className="text-sm sm:text-base font-mono text-zinc-400 max-w-lg mx-auto">
              &ldquo;Search software, installation guides, fixes, and Linux alternatives.&rdquo;
            </p>
          </div>

          {/* Large Centered Search Bar */}
          <div className="w-full pt-2">
            <SearchBar variant="hero" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-500 pt-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero AI essays</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Under 30s problem solving</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>100% copyable commands</span>
            </span>
          </div>
        </div>

        {/* Below that: Recently Viewed, Popular, Recently Added. Nothing else. */}
        <div className="w-full space-y-12 pt-8 border-t border-zinc-900 animate-in fade-in duration-500">
          {/* Recently Viewed */}
          {recentlyViewed && recentlyViewed.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Recently Viewed</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recentlyViewed.map((pb) => renderPlaybookCard(pb, 'Recent'))}
              </div>
            </section>
          )}

          {/* Popular */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Popular Playbooks</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {popular.map((pb) => renderPlaybookCard(pb, 'Popular'))}
            </div>
          </section>

          {/* Recently Added */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Recently Added (Ubuntu 24.04 Server Headless)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {recentlyAdded.map((pb) => renderPlaybookCard(pb, 'New'))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 text-center text-xs text-zinc-500 font-mono space-y-3">
        <div className="flex items-center justify-center gap-2 text-zinc-400">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-bold tracking-wider uppercase">Linux Handbook Playbook</span>
        </div>
        <p className="max-w-md mx-auto leading-relaxed">
          Built for results. Could a user reinstall Linux tomorrow and set up their machine using only this website?
        </p>
      </footer>
    </div>
  );
}
