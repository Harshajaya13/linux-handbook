'use client';

import React from 'react';
import { ConfigFile } from '../../types/playbook';
import { FolderTree, FileCode, HardDrive, Terminal, FileText, Cpu, Layers } from 'lucide-react';
import CopyButton from '../CopyButton';

interface FilesSectionProps {
  files: ConfigFile[];
  playbookName: string;
}

export default function FilesSection({ files, playbookName }: FilesSectionProps) {
  if (files.length === 0) {
    return (
      <div className="p-10 text-center rounded-2xl bg-zinc-900/30 border border-zinc-800/60 space-y-3 font-sans">
        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 flex items-center justify-center mx-auto">
          <FolderTree className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-white text-base">No System Paths Documented</h3>
        <p className="text-zinc-400 text-xs max-w-sm mx-auto">
          This software runs entirely self-contained without generating standard Linux user configurations.
        </p>
      </div>
    );
  }

  // Strict color rule #11: Keep Black, Gray, Green. No decorative rainbow badges.
  const getIcon = (type: ConfigFile['type']) => {
    switch (type) {
      case 'Configuration':
        return <FileCode className="w-4 h-4 text-emerald-400" />;
      case 'Cache':
        return <Layers className="w-4 h-4 text-zinc-400" />;
      case 'Logs':
        return <FileText className="w-4 h-4 text-zinc-400" />;
      case 'Data Directory':
        return <HardDrive className="w-4 h-4 text-zinc-400" />;
      case 'Binary Location':
        return <Terminal className="w-4 h-4 text-emerald-400" />;
      case 'Desktop Entry':
        return <FolderTree className="w-4 h-4 text-zinc-400" />;
      case 'Systemd Service':
        return <Cpu className="w-4 h-4 text-zinc-400" />;
      default:
        return <FolderTree className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans">
      {/* Introduction */}
      <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-1.5">
        <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
          {playbookName} Filesystem & Configuration Paths
        </h3>
        <p className="text-zinc-300 text-sm leading-relaxed">
          Need to back up dotfiles, clear cached state after an update, or inspect runtime systemd logs? Here are all exact directory and executable paths for {playbookName} on Ubuntu Linux.
        </p>
      </div>

      {/* Files List */}
      <div className="space-y-3">
        {files.map((file, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0 mt-0.5">
                {getIcon(file.type)}
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
                    {file.type}
                  </span>
                </div>
                <div className="font-mono text-sm sm:text-base text-white font-semibold truncate select-all">
                  {file.path}
                </div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {file.description}
                </p>
              </div>
            </div>

            <div className="shrink-0 self-end sm:self-center">
              <CopyButton text={file.path} label="Copy Path" size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
