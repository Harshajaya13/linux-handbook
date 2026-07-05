'use client';

import React from 'react';
import { Playbook } from '../../types/playbook';
import { ExternalLink, Terminal, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';

interface OverviewSectionProps {
  playbook: Playbook;
  onGoToInstall: () => void;
  onGoToAlternatives: () => void;
}

export default function OverviewSection({
  playbook,
  onGoToInstall,
  onGoToAlternatives
}: OverviewSectionProps) {
  const { overview, name, whyChoose } = playbook;

  return (
    <div className="space-y-8 animate-in fade-in duration-200 font-sans">
      {/* Unsupported Banner */}
      {playbook.isUnsupported && (
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-3">
          <div className="flex items-center gap-2 font-bold text-base">
            <span>⚠️ Unsupported Linux Software</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            {playbook.unsupportedMessage}
          </p>
          <div className="pt-2">
            <button
              onClick={onGoToAlternatives}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
            >
              <span>View Native Open-Source Alternatives</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Why Choose Section (Rule #6: Replace passive Who is it for with Why Choose) */}
      {whyChoose && whyChoose.length > 0 && (
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
          <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Why Choose {name}?</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whyChoose.map((point, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-200 text-xs sm:text-sm font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What is it? (Lighter typography without heavy borders) */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
          What is {name}?
        </h3>
        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
          {overview.whatIsIt}
        </p>
      </div>

      {/* Target Audience */}
      <div className="space-y-3 pt-4 border-t border-zinc-900">
        <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
          Best suited for
        </h3>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          {overview.whoIsItFor}
        </p>
      </div>

      {/* Quick Actions Footer */}
      <div className="pt-6 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
          <span>Version: <strong className="text-zinc-300">{overview.version || 'Latest'}</strong></span>
          <span>•</span>
          <span>Verified: <strong className="text-emerald-400">{overview.lastVerified || 'Ubuntu 24.04 LTS'}</strong></span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={overview.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono transition-colors"
          >
            <span>Official Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {!playbook.isUnsupported && (
            <button
              onClick={onGoToInstall}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors shadow-lg cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Go to Installation Commands →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
