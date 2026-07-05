'use client';

import React from 'react';
import { UninstallCommands } from '../../types/playbook';
import { Trash2, ShieldAlert, AlertCircle } from 'lucide-react';
import TerminalCodeBlock from '../TerminalCodeBlock';

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
      icon: <Trash2 className="w-4 h-4 text-amber-400" />,
      badgeClass: 'bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold',
      badgeText: 'Tier 1: Standard Remove'
    },
    {
      key: 'removeConfig',
      title: uninstall.removeConfig.title,
      command: uninstall.removeConfig.command,
      description: uninstall.removeConfig.description,
      icon: <AlertCircle className="w-4 h-4 text-orange-400" />,
      badgeClass: 'bg-orange-500/10 border-orange-500/30 text-orange-400 font-bold',
      badgeText: 'Tier 2: Clean Dotfiles & Cache'
    },
    {
      key: 'completeCleanup',
      title: uninstall.completeCleanup.title,
      command: uninstall.completeCleanup.command,
      description: uninstall.completeCleanup.description,
      icon: <ShieldAlert className="w-4 h-4 text-red-400" />,
      badgeClass: 'bg-red-500/10 border-red-500/30 text-red-400 font-bold',
      badgeText: 'Tier 3: Complete Purge & Wipe'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans">
      {/* Introduction */}
      <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-1.5">
        <h3 className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          <span>Clean System Uninstall & Purge</span>
        </h3>
        <p className="text-zinc-300 text-sm leading-relaxed">
          One of the biggest headaches on Linux is leaving orphaned config files, dangling GPG keys, and stale cache directories when you remove software. Select the exact level of cleanup you need for {playbookName}.
        </p>
      </div>

      {/* Cards (No loud borders, calm Terminal blocks!) */}
      <div className="space-y-6">
        {tiers.map((tier) => (
          <div
            key={tier.key}
            className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700/80 transition-all overflow-hidden p-6 space-y-4"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0">
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

              <span className={`px-2.5 py-1 rounded-full text-xs font-mono border ${tier.badgeClass}`}>
                {tier.badgeText}
              </span>
            </div>

            {/* Calm Terminal Command without decorative box header rows */}
            <div className="space-y-1.5 pt-1">
              <div className="text-xs font-mono text-zinc-500 uppercase font-bold">
                Terminal Removal Command
              </div>
              <TerminalCodeBlock
                code={tier.command}
                label="Copy CMD"
                size="sm"
                showPrompt={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
