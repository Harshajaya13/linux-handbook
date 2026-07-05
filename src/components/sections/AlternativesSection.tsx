'use client';

import React from 'react';
import { Alternative } from '../../types/playbook';
import { RefreshCw, Check, X, Shield, Cpu, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import TerminalCodeBlock from '../TerminalCodeBlock';

interface AlternativesSectionProps {
  alternatives: Alternative[];
  playbookName: string;
}

export default function AlternativesSection({ alternatives, playbookName }: AlternativesSectionProps) {
  if (alternatives.length === 0) {
    return (
      <div className="p-10 text-center rounded-2xl bg-zinc-900/30 border border-zinc-800/60 space-y-3 font-sans">
        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 flex items-center justify-center mx-auto">
          <RefreshCw className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-white text-base">No Direct Alternatives Listed</h3>
        <p className="text-zinc-400 text-xs max-w-sm mx-auto">
          We are currently benchmarking replacement tools for {playbookName} on Ubuntu 24.04 LTS.
        </p>
      </div>
    );
  }

  const getTagStyle = (tag: Alternative['tag']) => {
    switch (tag) {
      case 'Best Alternative':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold';
      default:
        return 'bg-zinc-800/80 border-zinc-700/80 text-zinc-300';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans">
      {/* Introduction */}
      <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-1.5">
        <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
          Why replace {playbookName}?
        </h3>
        <p className="text-zinc-300 text-sm leading-relaxed">
          Whether you need a lighter CPU footprint on headless servers, a strictly open-source license without telemetry, or a tool designed specifically for Wayland tiling window managers, these verified Linux alternatives solve the problem without bloated setups.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {alternatives.map((alt) => (
          <div
            key={alt.id}
            className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700/80 transition-all overflow-hidden flex flex-col justify-between p-6 space-y-5"
          >
            <div className="space-y-5">
              {/* Card Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-800/60 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {alt.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-mono border ${getTagStyle(
                        alt.tag
                      )}`}
                    >
                      {alt.tag}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {alt.whyItExists}
                  </p>
                </div>

                {alt.slug && (
                  <Link
                    href={`/playbook/${alt.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs transition-colors border border-zinc-700/80 shrink-0"
                  >
                    <span>View Playbook</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-500">License:</span>
                  <strong className="text-white font-sans">{alt.license}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-500">Resource:</span>
                  <strong className="text-white font-sans">{alt.resourceUsage}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">Compat:</span>
                  <strong className="text-emerald-400 font-sans">{alt.compatibility}</strong>
                </div>
              </div>

              {/* Pros & Cons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                {/* Pros */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Advantages over {playbookName}</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {alt.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0 mt-2" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5" />
                    <span>Trade-offs & Limitations</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {alt.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                        <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0 mt-2" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Calm Terminal Install Command */}
            {alt.installCommand && (
              <div className="space-y-1.5 pt-2 border-t border-zinc-800/60">
                <div className="text-xs font-mono text-zinc-500 uppercase font-bold">
                  Quick Install
                </div>
                <TerminalCodeBlock
                  code={alt.installCommand}
                  label="Copy Install"
                  size="sm"
                  showPrompt={true}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
