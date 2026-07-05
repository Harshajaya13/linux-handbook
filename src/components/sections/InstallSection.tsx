'use client';

import React, { useState } from 'react';
import { Playbook, DistroType } from '../../types/playbook';
import { Shield, Sparkles, AlertCircle, CheckCircle2, FolderTree, Wrench } from 'lucide-react';
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
    <div className="space-y-12 animate-in fade-in duration-200 font-sans">
      {/* Apple restraint: Neutral segmented control for distros without rainbow dots or heavy borders */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-zinc-500 font-medium tracking-wide uppercase">
            Target Distribution / Package Format
          </span>
          <span className="text-xs text-zinc-600 hidden sm:inline">
            Select format to swap commands
          </span>
        </div>
        <div className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-xl bg-[#17191d] border border-white/[0.04] shadow-sm">
          {allDistros.map((d) => {
            const isActive = selectedDistro === d;
            const hasMethods = playbook.installMethods.some((m) => m.distro === d);
            return (
              <button
                key={d}
                onClick={() => setSelectedDistro(d)}
                type="button"
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-zinc-800 text-white shadow-sm font-semibold border border-white/[0.06]'
                    : hasMethods
                    ? 'text-[#a8adb5] hover:text-zinc-200 hover:bg-zinc-800/40'
                    : 'text-zinc-600 hover:text-zinc-500'
                }`}
              >
                <span>{d}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Command Workspace Panel (Reserved emphasis: Subtle elevation around the command block and primary actions only) */}
      <div className="space-y-10">
        {currentMethods.length > 0 ? (
          <div className="space-y-12 font-sans">
            {currentMethods.map((method) => (
              <div key={method.id} className="space-y-8">
                {/* Method Header Info (Quiet, unboxed, humanist sans) */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/[0.04]">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold text-[#f4f4f5] text-xl sm:text-2xl font-display tracking-tight">
                      Install via {selectedDistro}
                    </h3>
                    {method.sizeEstimate && (
                      <span className="text-xs font-sans text-zinc-500 font-medium">
                        Size: {method.sizeEstimate}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {method.isRecommended && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-300 text-xs font-sans font-medium">
                        <Sparkles className="w-3 h-3 text-zinc-400" />
                        Recommended
                      </span>
                    )}
                    {method.isOfficial ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-400 text-xs font-sans font-medium">
                        <Shield className="w-3 h-3 text-zinc-500" />
                        Official Repo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 text-amber-400/90 text-xs font-sans font-medium">
                        <AlertCircle className="w-3 h-3" />
                        Community
                      </span>
                    )}
                  </div>
                </div>

                {/* Apple discipline: Say it once, written as a plain sentence in off-white body text */}
                <p className="text-[#a8adb5] text-sm sm:text-base leading-relaxed font-sans max-w-3xl">
                  {method.whyThisMethod.summary}
                </p>

                {/* The Command Block (Signature Visual Anchor with primary CTA button) */}
                <div className="space-y-3 pt-1">
                  <div className="text-xs font-sans text-zinc-500 font-medium flex items-center justify-between">
                    <span>Terminal Command</span>
                    <span className="text-zinc-600">Copy & run in terminal</span>
                  </div>
                  <TerminalCodeBlock
                    code={method.command}
                    label="Copy Install"
                    size="md"
                    showPrompt={true}
                    isPrimary={true}
                  />
                </div>

                {/* Verification Command (Secondary ghost styling) */}
                {method.verificationCommand && (
                  <div className="space-y-4 pt-8 border-t border-white/[0.04]">
                    <div className="flex items-center gap-2 text-zinc-200 font-semibold font-sans text-sm">
                      <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>Verify Installation</span>
                    </div>
                    <p className="text-xs text-zinc-500 font-sans">
                      Run this quick check to confirm the binary is active in your system PATH:
                    </p>
                    <TerminalCodeBlock
                      code={method.verificationCommand}
                      label="Copy Verify"
                      size="sm"
                      showPrompt={true}
                      isPrimary={false}
                    />
                  </div>
                )}

                {/* Next Steps Workflow Footer (Quiet text links without borders) */}
                <div className="pt-10 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
                  <div className="flex items-center gap-2 text-zinc-500 font-medium">
                    <span className="w-2 h-2 rounded-full bg-zinc-500" />
                    <span>Installed & Verified</span>
                  </div>

                  <div className="flex items-center gap-6 flex-wrap font-medium">
                    <button
                      onClick={() => goToTab('files')}
                      type="button"
                      className="inline-flex items-center gap-1.5 text-[#a8adb5] hover:text-white transition-colors cursor-pointer"
                    >
                      <FolderTree className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Step 3: Configure Files →</span>
                    </button>

                    <button
                      onClick={() => goToTab('problems')}
                      type="button"
                      className="inline-flex items-center gap-1.5 text-[#a8adb5] hover:text-white transition-colors cursor-pointer"
                    >
                      <Wrench className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Step 4: Common Fixes →</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Placeholder for non-Ubuntu distros without methods */
          <div className="p-10 sm:p-14 text-center space-y-4 font-sans rounded-xl border border-white/[0.04] bg-[#17191d] shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="font-bold text-[#f4f4f5] text-base sm:text-lg font-display">
                {selectedDistro} Instructions In Progress
              </h3>
              <p className="text-[#a8adb5] text-xs sm:text-sm leading-relaxed">
                We are actively expanding and verifying commands for <strong>{selectedDistro}</strong>. Currently, all core playbooks are rigorously verified on <strong>Ubuntu 24.04 LTS Headless Server</strong>.
              </p>
            </div>
            <div className="pt-3">
              <button
                onClick={() => setSelectedDistro('Ubuntu')}
                type="button"
                className="px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 font-sans text-xs transition-colors cursor-pointer border border-white/[0.08]"
              >
                Switch to Verified Ubuntu 24.04 LTS Instructions →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
