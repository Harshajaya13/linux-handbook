'use client';

import React from 'react';
import { BookOpen, Terminal, Wrench, RefreshCw, FolderTree, Trash2, MessageSquare } from 'lucide-react';

export type TabType = 'overview' | 'install' | 'problems' | 'alternatives' | 'files' | 'remove' | 'notes';

interface PlaybookTabsProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  counts?: {
    problems?: number;
    alternatives?: number;
    notes?: number;
  };
}

export default function PlaybookTabs({ activeTab, onSelectTab, counts = {} }: PlaybookTabsProps) {
  const tabs: { id: TabType; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'install', label: 'Install', icon: <Terminal className="w-4 h-4" /> },
    { id: 'problems', label: 'Problems', icon: <Wrench className="w-4 h-4" />, count: counts.problems },
    { id: 'alternatives', label: 'Alternatives', icon: <RefreshCw className="w-4 h-4" />, count: counts.alternatives },
    { id: 'files', label: 'Files & Config', icon: <FolderTree className="w-4 h-4" /> },
    { id: 'remove', label: 'Remove', icon: <Trash2 className="w-4 h-4" /> },
    { id: 'notes', label: 'Notes', icon: <MessageSquare className="w-4 h-4" />, count: counts.notes },
  ];

  return (
    <div className="border-b border-zinc-800/80 bg-zinc-950/40 sticky top-14 z-30 backdrop-blur-md overflow-x-auto no-scrollbar">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              type="button"
              className={`flex items-center gap-2 px-3.5 py-3 text-sm font-medium border-b-2 transition-all cursor-pointer select-none ${
                isActive
                  ? 'border-emerald-400 text-white bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              <span className={isActive ? 'text-emerald-400' : 'text-zinc-500'}>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[11px] font-mono ${
                    isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
