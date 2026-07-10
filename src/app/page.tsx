'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Clock, Layers, Wrench, ArrowRight, X } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { getRecentlyViewed, getPopularPlaybooks, getRecentlyAddedPlaybooks } from '../lib/search';
import { Playbook } from '../types/playbook';
import { PLAYBOOKS } from '../data/playbooks';

export default function HomePage() {
  const [recentlyViewed, setRecentlyViewed] = useState<Playbook[]>([]);
  const [popular, setPopular] = useState<Playbook[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<Playbook[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllPlaybooksOpen, setIsAllPlaybooksOpen] = useState(false);

  useEffect(() => {
    setRecentlyViewed(getRecentlyViewed());
    setPopular(getPopularPlaybooks());
    setRecentlyAdded(getRecentlyAddedPlaybooks());
  }, []);

  // Apple restraint: Floating card surface (#17191D) with subtle elevation shadow instead of hard borders
  const renderPlaybookItem = (pb: Playbook, badge?: string) => (
    <Link
      key={pb.slug}
      href={`/playbook/${pb.slug}`}
      className="group p-4.5 rounded-xl bg-[#17191d] hover:bg-[#1f2227] border border-white/[0.03] hover:border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all flex items-center justify-between gap-4 font-sans"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-[#0f1114] border border-white/[0.06] flex items-center justify-center text-[#5EEAD4] font-mono text-xs font-bold shrink-0 group-hover:scale-105 transition-transform">
          <Terminal className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#f4f4f5] text-sm sm:text-base tracking-tight truncate group-hover:text-[#5EEAD4] transition-colors">
              {pb.name}
            </span>
            {badge && (
              <span className="text-[10px] font-sans font-medium px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[#a8adb5] shrink-0">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-[#a8adb5] truncate font-sans mt-0.5">
            {pb.tagline}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs font-sans text-zinc-500 group-hover:text-zinc-300 shrink-0 transition-colors">
        <span className="hidden sm:inline">{pb.category}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-zinc-600 group-hover:text-zinc-400" />
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-[#0f1114] text-zinc-100 flex flex-col justify-between selection:bg-zinc-800 selection:text-white font-sans">
      {/* Top bar */}
      <header className="w-full border-b border-white/[0.04] bg-[#0f1114]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#17191d] border border-white/[0.06] flex items-center justify-center text-[#5EEAD4]">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-[#f4f4f5] text-sm tracking-tight font-display">
              Linux Handbook
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              className="px-2.5 py-1 rounded bg-[#17191d] hover:bg-[#1f2227] border border-white/[0.06] text-[#a8adb5] hover:text-white transition-colors cursor-pointer"
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
      <main className="flex-1 flex flex-col items-center justify-start max-w-4xl mx-auto w-full px-4 sm:px-6 pt-16 sm:pt-24 pb-24 space-y-16">
        {/* Hero Section */}
        <div className="w-full text-center space-y-6 animate-in fade-in duration-300">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#f4f4f5] tracking-tight font-display">
              What do you need to install or fix?
            </h1>
            <p className="text-xs sm:text-sm text-[#a8adb5] max-w-lg mx-auto leading-relaxed">
              No fluff, no &ldquo;as an AI language model&rdquo; &mdash; just the exact terminal command and why it works.
            </p>
          </div>

          {/* Huge Hero Terminal Prompt */}
          <div className="w-full pt-2">
            <SearchBar variant="hero" />
          </div>

          {/* Browse all playbooks button */}
          <div className="flex justify-center pt-1">
            <button
              onClick={() => setIsAllPlaybooksOpen(true)}
              type="button"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#17191d] hover:bg-[#1f2227] text-zinc-300 hover:text-white border border-white/[0.04] hover:border-white/[0.08] text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer select-none"
            >
              <Layers className="w-3.5 h-3.5 text-[#5EEAD4]" />
              <span>Browse All Applications ({PLAYBOOKS.length})</span>
            </button>
          </div>
        </div>

        {/* Below Search: Thoughtful developer categories with generous whitespace (Apple spacing) */}
        <div className="w-full space-y-12 pt-8 border-t border-white/[0.04] animate-in fade-in duration-500">
          {/* Recently Viewed */}
          {recentlyViewed && recentlyViewed.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-[#a8adb5] font-semibold">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>Recently Viewed</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recentlyViewed.map((pb) => renderPlaybookItem(pb, 'Recent'))}
              </div>
            </section>
          )}

          {/* Essential System Workflows */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-[#a8adb5] font-semibold">
              <Layers className="w-3.5 h-3.5 text-[#5EEAD4]" />
              <span>Essential System Workflows</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {popular.map((pb) => renderPlaybookItem(pb))}
            </div>
          </section>

          {/* Verified Developer Playbooks */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-[#a8adb5] font-semibold">
              <Wrench className="w-3.5 h-3.5 text-zinc-400" />
              <span>Verified Developer Playbooks</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recentlyAdded.map((pb) => renderPlaybookItem(pb, 'Verified'))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] bg-[#0f1114] py-12 text-center text-xs text-zinc-600 font-sans space-y-2">
        <div className="flex items-center justify-center gap-2 text-zinc-500 font-medium">
          <Terminal className="w-3.5 h-3.5 text-[#5EEAD4]" />
          <span className="font-semibold tracking-wider uppercase">Linux Handbook</span>
        </div>
        <p className="max-w-md mx-auto leading-relaxed text-[#a8adb5]">
          A collection of solved problems. Verified on Ubuntu 24.04 LTS Headless Server.
        </p>
      </footer>

      {/* All Playbooks Modal */}
      {isAllPlaybooksOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[8vh] p-4 animate-in fade-in duration-150"
          onClick={() => setIsAllPlaybooksOpen(false)}
        >
          <div
            className="w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[84vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-[#17191d]">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-[#5EEAD4]" />
                <h2 className="text-sm sm:text-base font-bold text-white font-display tracking-tight">
                  All Playbooks & Applications
                </h2>
              </div>
              <button
                onClick={() => setIsAllPlaybooksOpen(false)}
                type="button"
                className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer rounded-lg hover:bg-zinc-900"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#0f1114]">
              {Array.from(new Set(PLAYBOOKS.map((pb) => pb.category))).map((cat) => {
                const catPlaybooks = PLAYBOOKS.filter((pb) => pb.category === cat);
                if (catPlaybooks.length === 0) return null;
                return (
                  <div key={cat} className="space-y-3">
                    <h3 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider border-b border-white/[0.03] pb-1.5 font-sans">
                      {cat}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {catPlaybooks.map((pb) => (
                        <Link
                          key={pb.slug}
                          href={`/playbook/${pb.slug}`}
                          onClick={() => setIsAllPlaybooksOpen(false)}
                          className="group p-3 rounded-xl bg-[#17191d] hover:bg-[#1f2227] border border-white/[0.03] hover:border-white/[0.08] transition-all flex items-center justify-between gap-3 font-sans shadow-sm"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-[#0f1114] border border-white/[0.06] flex items-center justify-center text-[#5EEAD4] font-mono text-[10px] shrink-0 group-hover:scale-105 transition-transform">
                              <Terminal className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-semibold text-[#f4f4f5] text-xs sm:text-sm tracking-tight truncate group-hover:text-[#5EEAD4] transition-colors block">
                                {pb.name}
                              </span>
                              <span className="text-[10px] text-[#a8adb5] truncate block mt-0.5 max-w-[240px]">
                                {pb.tagline}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-3 h-3 text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
