'use client';

import React, { useState } from 'react';
import { Playbook, DistroType } from '../../types/playbook';
import { Terminal, Shield, CheckCircle2, AlertCircle, Sparkles, ExternalLink, Cpu } from 'lucide-react';
import DistroBadge from '../DistroBadge';
import CopyButton from '../CopyButton';

interface InstallSectionProps {
  playbook: Playbook;
}

export default function InstallSection({ playbook }: InstallSectionProps) {
  const [selectedDistro, setSelectedDistro] = useState<DistroType>('Ubuntu');

  const allDistros: DistroType[] = [
    'Ubuntu',
    'Debian',
    'Arch',
    'Fedora',
    'NixOS',
    'Flatpak',
    'Snap',
    'AppImage'
  ];

  const currentMethods = playbook.installMethods.filter((m) => m.distro === selectedDistro);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Distro Picker Bar */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span>Select Distribution / Format</span>
        </label>
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-zinc-900/80 border border-zinc-800">
          {allDistros.map((d) => {
            const hasMethod = playbook.installMethods.some((m) => m.distro === d);
            return (
              <DistroBadge
                key={d}
                distro={d}
                isActive={selectedDistro === d}
                onClick={() => setSelectedDistro(d)}
                showVerified={d === 'Ubuntu'}
              />
            );
          })}
        </div>
      </div>

      {/* Methods Display */}
      {currentMethods.length > 0 ? (
        <div className="space-y-8">
          {currentMethods.map((method) => (
            <div
              key={method.id}
              className={`rounded-2xl border transition-all overflow-hidden bg-zinc-900/60 shadow-lg ${
                method.isRecommended
                  ? 'border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.08)]'
                  : 'border-zinc-800'
              }`}
            >
              {/* Header */}
              <div className="p-5 sm:p-6 bg-zinc-900/90 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white">
                    <Terminal className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2.5">
                      <span>{selectedDistro} Installation</span>
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      Estimated Size: {method.sizeEstimate || 'Varies'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {method.isRecommended && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                      <Sparkles className="w-3 h-3" />
                      Recommended
                    </span>
                  )}
                  {method.isOfficial ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-semibold">
                      <Shield className="w-3 h-3" />
                      Official
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      Community / Unofficial
                    </span>
                  )}
                </div>
              </div>

              {/* Command Box */}
              <div className="p-5 sm:p-6 bg-zinc-950/90 font-mono relative group">
                <div className="flex items-center justify-between gap-4 mb-3 pb-3 border-b border-zinc-800/80">
                  <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
                    Terminal Command
                  </span>
                  <CopyButton text={method.command} label="Copy Command" size="md" />
                </div>
                <pre className="text-sm sm:text-base text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed py-2 select-all">
                  {method.command}
                </pre>
              </div>

              {/* 3. Why this method? (Mandatory Playbook Section) */}
              <div className="p-5 sm:p-6 bg-zinc-900/40 border-t border-zinc-800/80 space-y-4">
                <div className="flex items-center gap-2 text-white font-bold font-sans text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <h4>Why this method?</h4>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed">
                  {method.whyThisMethod.summary}
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {method.whyThisMethod.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {method.sourceUrl && (
                  <div className="pt-2 flex justify-end">
                    <a
                      href={method.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      <span>Verify Official Source Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Coming soon placeholder for non-Ubuntu distros */
        <div className="p-8 sm:p-12 rounded-2xl border border-dashed border-zinc-700/80 bg-zinc-900/30 text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center mx-auto text-zinc-400">
            <Cpu className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-white text-lg">
              {selectedDistro} Playbook In Progress
            </h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
              We are actively expanding and testing verified commands for <strong>{selectedDistro}</strong>. Currently, all core playbooks are rigorously verified on <strong>Ubuntu 24.04 LTS Headless Server</strong>.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => setSelectedDistro('Ubuntu')}
              type="button"
              className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs border border-zinc-700 transition-colors cursor-pointer"
            >
              Switch to Verified Ubuntu 24.04 LTS Instructions →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
