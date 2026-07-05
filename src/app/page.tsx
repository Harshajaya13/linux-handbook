'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Clock, Cpu, Layers, Wrench, ArrowRight } from 'lucide-react';
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

  // Lighter, borderless card design with subtle background and hover transition
  const renderPlaybookItem = (pb: Playbook, badge?: string) => (
    <Link
      key={pb.slug}
      href={`/playbook/${pb.slug}`}
      className="group p-4 rounded-xl bg-zinc-900/30 hover:bg-zinc-900/80 border border-transparent hover:border-zinc-800 transition-all flex items-center justify-between gap-4 font-sans"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500/80 font-mono text-xs font-bold shrink-0 group-hover:scale-105 transition-transform">
          <Terminal className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm sm:text-base tracking-tight truncate group-hover:text-emerald-500/90 transition-colors">
              {pb.name}
            </span>
            {badge && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 shrink-0">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 truncate font-sans mt-0.5">
            {pb.tagline}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 group-hover:text-zinc-400 shrink-0 transition-colors">
        <span className="hidden sm:inline">{pb.category}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-zinc-600 group-hover:text-zinc-400" />
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-emerald-500/20 font-sans">
      {/* Top bar (Move #5: Removed static distro badge) */}
      <header className="w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500/80">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight font-display">
              Linux Handbook
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
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
      <main className="flex-1 flex flex-col items-center justify-start max-w-4xl mx-auto w-full px-4 sm:px-6 pt-16 sm:pt-24 pb-20 space-y-14">
        {/* Hero Section */}
        <div className="w-full text-center space-y-6 animate-in fade-in duration-300">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              What do you need to install or fix?
            </h1>
            {/* Move #1: Killed feature pill overload. Say it in one plain sentence. */}
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
              No fluff, no &ldquo;as an AI language model&rdquo; &mdash; just the exact terminal command and why it works.
            </p>
          </div>

          {/* Huge Hero Terminal Prompt (Move #4) */}
          <div className="w-full pt-2">
            <SearchBar variant="hero" />
          </div>
        </div>

        {/* Below Search: Thoughtful developer categories (Move #4) */}
        <div className="w-full space-y-10 pt-6 border-t border-zinc-900/80 animate-in fade-in duration-500">
          {/* Recently Viewed */}
          {recentlyViewed && recentlyViewed.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>Recently Viewed</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {recentlyViewed.map((pb) => renderPlaybookItem(pb, 'Recent'))}
              </div>
            </section>
          )}

          {/* Move #4: Essential System Workflows instead of generic "Popular Playbooks" */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              <Layers className="w-3.5 h-3.5 text-emerald-500/80" />
              <span>Essential System Workflows</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {popular.map((pb) => renderPlaybookItem(pb))}
            </div>
          </section>

          {/* Move #4: Verified Developer Playbooks instead of generic "Recently Added" */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              <Wrench className="w-3.5 h-3.5 text-zinc-400" />
              <span>Verified Developer Playbooks</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {recentlyAdded.map((pb) => renderPlaybookItem(pb, 'Verified'))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer (Move #2: Killed KPI meta-commentary box, replaced with quiet specification) */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 text-center text-xs text-zinc-600 font-mono space-y-2">
        <div className="flex items-center justify-center gap-2 text-zinc-500">
          <Terminal className="w-3.5 h-3.5 text-emerald-500/80" />
          <span className="font-bold tracking-wider uppercase">Linux Handbook</span>
        </div>
        <p className="max-w-md mx-auto leading-relaxed text-zinc-500 font-sans">
          A collection of solved problems. Verified on Ubuntu 24.04 LTS Headless Server.
        </p>
      </footer>
    </div>
  );
}
