'use client';

import React from 'react';
import { BookOpen, Terminal, Wrench, RefreshCw, FolderTree, Trash2, MessageSquare } from 'lucide-react';

export type TabType = 'install' | 'overview' | 'problems' | 'alternatives' | 'files' | 'remove' | 'notes';

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
    { id: 'install', label: 'Install', icon: <Terminal className="w-4 h-4" /> },
    { id: 'overview', label: 'Overview', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'problems', label: 'Problems', icon: <Wrench className="w-4 h-4" />, count: counts.problems },
    { id: 'alternatives', label: 'Alternatives', icon: <RefreshCw className="w-4 h-4" />, count: counts.alternatives },
    { id: 'files', label: 'Files & Config', icon: <FolderTree className="w-4 h-4" /> },
    { id: 'remove', label: 'Remove', icon: <Trash2 className="w-4 h-4" /> },
    { id: 'notes', label: 'Notes', icon: <MessageSquare className="w-4 h-4" />, count: counts.notes },
  ];

  return (
    <div className="border-b border-white/[0.04] bg-[#0f1114]/90 sticky top-14 z-30 backdrop-blur-md overflow-x-auto no-scrollbar font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center gap-8 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              type="button"
              className={`flex items-center gap-2 py-4 text-sm transition-all cursor-pointer select-none border-b-2 -mb-px ${
                isActive
                  ? 'border-[#5EEAD4] text-white font-medium'
                  : 'border-transparent text-[#a8adb5] hover:text-zinc-200'
              }`}
            >
              <span className={isActive ? 'text-[#5EEAD4]' : 'text-zinc-500'}>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[11px] font-sans ${
                    isActive ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-900/80 text-zinc-500'
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
