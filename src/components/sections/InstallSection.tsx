'use client';

import React, { useState } from 'react';
import { Playbook, DistroType } from '../../types/playbook';
import { Shield, Sparkles, AlertCircle, Cpu, CheckCircle2, Check, FolderTree, Wrench } from 'lucide-react';
import DistroBadge from '../DistroBadge';
import TerminalCodeBlock from '../TerminalCodeBlock';
import { useRouter } from 'next/navigation';

interface InstallSectionProps {
  playbook: Playbook;
}

export default function InstallSection({ playbook }: InstallSectionProps) {
  const [selectedDistro, setSelectedDistro] = useState<DistroType>('Ubuntu');
  const router = useRouter();

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

  const goToTab = (tab: string) => {
    router.push(`/playbook/${playbook.slug}?tab=${tab}`, { scroll: false });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 font-sans">
      {/* Distro Picker Bar */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-zinc-400" />
          <span>Select Distribution / Format</span>
        </label>
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
          {allDistros.map((d) => (
            <DistroBadge
              key={d}
              distro={d}
              isActive={selectedDistro === d}
              onClick={() => setSelectedDistro(d)}
              showVerified={d === 'Ubuntu'}
            />
          ))}
        </div>
      </div>

      {/* Methods Display (No green outlines! Soft gray borders! No nested Box-in-Box!) */}
      {currentMethods.length > 0 ? (
        <div className="space-y-8">
          {currentMethods.map((method) => (
            <div
              key={method.id}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 sm:p-8 space-y-6 transition-all hover:border-zinc-700/80"
            >
              {/* Top Meta Header: Clean inline badges without boxed header rows */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-bold text-white text-lg sm:text-xl">
                    Install via {selectedDistro}
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">
                    Estimated Size: {method.sizeEstimate || 'Varies'}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {method.isRecommended && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500/90 font-mono text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      Recommended
                    </span>
                  )}
                  {method.isOfficial ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/80 text-zinc-300 font-mono text-xs font-medium">
                      <Shield className="w-3 h-3 text-zinc-400" />
                      Official Repo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      Community
                    </span>
                  )}
                </div>
              </div>

              {/* Why this method? (Clean text without border box!) */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  {method.whyThisMethod.points.map((point, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900/80 border border-zinc-800/80 text-xs font-mono text-zinc-300 select-none"
                    >
                      <Check className="w-3 h-3 text-emerald-500/80" />
                      <span>{point}</span>
                    </span>
                  ))}
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {method.whyThisMethod.summary}
                </p>
              </div>

              {/* The Command Block (The Main Character! Clean terminal panel with syntax highlighting) */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-bold">
                  Terminal Installation Command
                </div>
                <TerminalCodeBlock
                  code={method.command}
                  label="Copy Install"
                  size="md"
                  showPrompt={true}
                />
              </div>

              {/* Step 2: Verification Command (Clean open layout without nested box!) */}
              {method.verificationCommand && (
                <div className="space-y-2 pt-2 border-t border-zinc-800/60">
                  <div className="flex items-center gap-2 text-white font-bold font-sans text-xs sm:text-sm pt-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500/90 shrink-0" />
                    <span>Verify Installation Success</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans">
                    Run this quick check in your terminal to confirm the binary is active in your system PATH:
                  </p>
                  <TerminalCodeBlock
                    code={method.verificationCommand}
                    label="Copy Verify"
                    size="sm"
                    showPrompt={true}
                  />
                </div>
              )}

              {/* Next Steps Workflow Footer (Quiet text links) */}
              <div className="pt-4 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  <span>Installed & Verified</span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => goToTab('files')}
                    type="button"
                    className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <FolderTree className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="underline decoration-zinc-700 underline-offset-4">Step 3: Configure Files →</span>
                  </button>

                  <button
                    onClick={() => goToTab('problems')}
                    type="button"
                    className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Wrench className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="underline decoration-zinc-700 underline-offset-4">Step 4: Common Fixes →</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Placeholder for non-Ubuntu distros */
        <div className="p-8 sm:p-12 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
            <Cpu className="w-6 h-6 text-zinc-400" />
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
              className="px-5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs border border-zinc-800 transition-colors cursor-pointer"
            >
              Switch to Verified Ubuntu 24.04 LTS Instructions →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
