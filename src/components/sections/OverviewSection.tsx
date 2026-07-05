import React from 'react';
import { Playbook } from '../../types/playbook';
import { ExternalLink, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import DistroBadge from '../DistroBadge';

interface OverviewSectionProps {
  playbook: Playbook;
  onGoToInstall: () => void;
  onGoToAlternatives: () => void;
}

export default function OverviewSection({ playbook, onGoToInstall, onGoToAlternatives }: OverviewSectionProps) {
  const { overview } = playbook;

  if (playbook.isUnsupported) {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-bold text-amber-300 text-lg">Unsupported / Proprietary Software</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">{playbook.unsupportedMessage}</p>
            <div className="pt-2">
              <button
                onClick={onGoToAlternatives}
                type="button"
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-colors cursor-pointer"
              >
                View Recommended Linux Alternatives →
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
          <h4 className="font-semibold text-white">About {playbook.name}</h4>
          <p className="text-zinc-400 text-sm leading-relaxed">{overview.whatIsIt}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 border border-zinc-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-6 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {playbook.name}
              </h2>
              <p className="text-zinc-400 text-base">{playbook.tagline}</p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={overview.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs transition-colors border border-zinc-700 shadow-sm"
              >
                <span>Official Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>
              <button
                onClick={onGoToInstall}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-pointer"
              >
                <span>Install Now</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                What is it?
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
                {overview.whatIsIt}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                Who is it for?
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
                {overview.whoIsItFor}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Version: <strong className="text-white">{overview.version || 'Latest'}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified On: <strong className="text-white">{overview.lastVerified || 'Ubuntu 24.04 LTS'}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span>Category: <strong className="text-emerald-400">{playbook.category}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Status Box */}
      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          Supported Distribution Environments
        </h3>
        <p className="text-xs text-zinc-400">
          This playbook currently features deep, tested verification and compilation scripts for headless and minimal builds on <strong>Ubuntu 24.04 Server LTS</strong>.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <DistroBadge distro="Ubuntu" showVerified />
          <DistroBadge distro="Debian" />
          <DistroBadge distro="Arch" />
          <DistroBadge distro="Fedora" />
          <DistroBadge distro="NixOS" />
          <DistroBadge distro="Flatpak" />
          <DistroBadge distro="Snap" />
          <DistroBadge distro="AppImage" />
        </div>
      </div>
    </div>
  );
}
