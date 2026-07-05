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
      <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-3">
        <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
          <FolderTree className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-white text-base">No System Paths Documented</h3>
        <p className="text-zinc-400 text-xs max-w-sm mx-auto">
          This software runs entirely self-contained without generating standard Linux user configurations.
        </p>
      </div>
    );
  }

  const getIcon = (type: ConfigFile['type']) => {
    switch (type) {
      case 'Configuration':
        return <FileCode className="w-5 h-5 text-emerald-400" />;
      case 'Cache':
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 'Logs':
        return <FileText className="w-5 h-5 text-cyan-400" />;
      case 'Data Directory':
        return <HardDrive className="w-5 h-5 text-purple-400" />;
      case 'Binary Location':
        return <Terminal className="w-5 h-5 text-orange-400" />;
      case 'Desktop Entry':
        return <FolderTree className="w-5 h-5 text-pink-400" />;
      case 'Systemd Service':
        return <Cpu className="w-5 h-5 text-blue-400" />;
      default:
        return <FolderTree className="w-5 h-5 text-zinc-400" />;
    }
  };

  const getBadgeStyle = (type: ConfigFile['type']) => {
    switch (type) {
      case 'Configuration':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'Cache':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'Logs':
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
      case 'Data Directory':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
      case 'Binary Location':
        return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case 'Desktop Entry':
        return 'bg-pink-500/10 border-pink-500/30 text-pink-400';
      case 'Systemd Service':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      default:
        return 'bg-zinc-800 border-zinc-700 text-zinc-300';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Introduction */}
      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
        <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400 font-bold">
          {playbookName} Filesystem & Configuration Paths
        </h3>
        <p className="text-zinc-300 text-sm leading-relaxed">
          Need to back up dotfiles, clear cached state after an update, or inspect runtime systemd logs? Here are all exact directory and executable paths for {playbookName} on Ubuntu Linux.
        </p>
      </div>

      {/* Files List */}
      <div className="space-y-4">
        {files.map((file, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0 mt-0.5">
                {getIcon(file.type)}
              </div>
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${getBadgeStyle(
                      file.type
                    )}`}
                  >
                    {file.type}
                  </span>
                </div>
                <div className="font-mono text-sm sm:text-base text-white font-semibold truncate select-all">
                  {file.path}
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  {file.description}
                </p>
              </div>
            </div>

            <div className="shrink-0 self-end sm:self-center">
              <CopyButton text={file.path} label="Copy Path" size="md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
