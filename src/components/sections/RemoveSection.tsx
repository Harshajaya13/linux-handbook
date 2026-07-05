'use client';

import React from 'react';
import { UninstallCommands } from '../../types/playbook';
import { Trash2, ShieldAlert, AlertCircle, Sparkles } from 'lucide-react';
import CopyButton from '../CopyButton';

interface RemoveSectionProps {
  uninstall: UninstallCommands;
  playbookName: string;
}

export default function RemoveSection({ uninstall, playbookName }: RemoveSectionProps) {
  const tiers = [
    {
      key: 'normal',
      title: uninstall.normal.title,
      command: uninstall.normal.command,
      description: uninstall.normal.description,
      icon: <Trash2 className="w-5 h-5 text-amber-400" />,
      badgeClass: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      badgeText: 'Tier 1: Standard Remove'
    },
    {
      key: 'removeConfig',
      title: uninstall.removeConfig.title,
      command: uninstall.removeConfig.command,
      description: uninstall.removeConfig.description,
      icon: <AlertCircle className="w-5 h-5 text-orange-400" />,
      badgeClass: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
      badgeText: 'Tier 2: Clean Dotfiles & Cache'
    },
    {
      key: 'completeCleanup',
      title: uninstall.completeCleanup.title,
      command: uninstall.completeCleanup.command,
      description: uninstall.completeCleanup.description,
      icon: <ShieldAlert className="w-5 h-5 text-red-400" />,
      badgeClass: 'bg-red-500/10 border-red-500/30 text-red-400',
      badgeText: 'Tier 3: Complete Purge & Wipe'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Introduction */}
      <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-2">
        <h3 className="text-sm font-mono uppercase tracking-wider text-red-400 font-bold flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          <span>Uninstall & Clean System Cleanup</span>
        </h3>
        <p className="text-zinc-300 text-sm leading-relaxed">
          One of the biggest headaches on Linux is leaving orphaned config files, dangling GPG keys, and stale cache directories when you remove software. Use these exact commands to uninstall {playbookName} cleanly according to your needs.
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {tiers.map((tier) => (
          <div
            key={tier.key}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700/80 transition-all overflow-hidden shadow-lg"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-zinc-900/90 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700">
                  {tier.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">
                    {tier.description}
                  </p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${tier.badgeClass}`}>
                {tier.badgeText}
              </span>
            </div>

            {/* Command Box */}
            <div className="p-5 sm:p-6 bg-zinc-950/90 font-mono">
              <div className="flex items-center justify-between gap-4 mb-3 pb-3 border-b border-zinc-800/80">
                <span className="text-xs text-zinc-500 uppercase font-bold">
                  Terminal Command
                </span>
                <CopyButton text={tier.command} label="Copy CMD" size="md" />
              </div>
              <pre className="text-sm sm:text-base text-red-300/90 overflow-x-auto whitespace-pre-wrap leading-relaxed py-1 select-all">
                {tier.command}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
