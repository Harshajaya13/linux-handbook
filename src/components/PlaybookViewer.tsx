'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Terminal, Home, ChevronRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { PLAYBOOKS } from '../data/playbooks';
import PlaybookTabs, { TabType } from './PlaybookTabs';
import OverviewSection from './sections/OverviewSection';
import InstallSection from './sections/InstallSection';
import ProblemsSection from './sections/ProblemsSection';
import AlternativesSection from './sections/AlternativesSection';
import FilesSection from './sections/FilesSection';
import RemoveSection from './sections/RemoveSection';
import NotesSection from './sections/NotesSection';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

interface PlaybookViewerProps {
  slug: string;
}

export default function PlaybookViewer({ slug }: PlaybookViewerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const tabParam = searchParams.get('tab') as TabType;
  const problemIdParam = searchParams.get('problemId');
  
  const [activeTab, setActiveTab] = useState<TabType>(tabParam || 'overview');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const playbook = PLAYBOOKS.find((p) => p.slug === slug);

  useEffect(() => {
    if (tabParam && ['overview', 'install', 'problems', 'alternatives', 'files', 'remove', 'notes'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (newTab: TabType) => {
    setActiveTab(newTab);
    router.push(`/playbook/${slug}?tab=${newTab}`, { scroll: false });
  };

  if (!playbook) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-between">
        <Navbar onOpenSearch={() => setIsSearchModalOpen(true)} />
        <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4 animate-in fade-in">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-white">Playbook Not Found</h1>
          <p className="text-zinc-400 text-sm">
            The software playbook &ldquo;{slug}&rdquo; does not exist in the current Ubuntu 24.04 LTS catalog.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-colors shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Search Homepage</span>
            </Link>
          </div>
        </div>
        <footer className="py-8 border-t border-zinc-900 text-center text-xs text-zinc-600 font-mono">
          Linux Handbook Playbook MVP
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-emerald-500/30">
      <Navbar onOpenSearch={() => setIsSearchModalOpen(true)} />

      {/* Search Modal */}
      <SearchBar
        variant="modal"
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      <main className="flex-1 pb-20">
        {/* Breadcrumb Header */}
        <div className="border-b border-zinc-900 bg-zinc-950/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs font-mono text-zinc-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-zinc-300 transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Search</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
            <span className="text-zinc-400">{playbook.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
            <span className="text-emerald-400 font-bold">{playbook.name}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <PlaybookTabs
          activeTab={activeTab}
          onSelectTab={handleTabChange}
          counts={{
            problems: playbook.problems.length,
            alternatives: playbook.alternatives.length,
            notes: playbook.communityNotes.length
          }}
        />

        {/* Section Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
          {activeTab === 'overview' && (
            <OverviewSection
              playbook={playbook}
              onGoToInstall={() => handleTabChange('install')}
              onGoToAlternatives={() => handleTabChange('alternatives')}
            />
          )}

          {activeTab === 'install' && (
            <InstallSection playbook={playbook} />
          )}

          {activeTab === 'problems' && (
            <ProblemsSection
              problems={playbook.problems}
              defaultOpenId={problemIdParam}
            />
          )}

          {activeTab === 'alternatives' && (
            <AlternativesSection
              alternatives={playbook.alternatives}
              playbookName={playbook.name}
            />
          )}

          {activeTab === 'files' && (
            <FilesSection
              files={playbook.configFiles}
              playbookName={playbook.name}
            />
          )}

          {activeTab === 'remove' && (
            <RemoveSection
              uninstall={playbook.uninstall}
              playbookName={playbook.name}
            />
          )}

          {activeTab === 'notes' && (
            <NotesSection
              initialNotes={playbook.communityNotes}
              playbookSlug={playbook.slug}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 text-center text-xs text-zinc-500 font-mono space-y-2">
        <div className="flex items-center justify-center gap-2 text-zinc-400">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-bold tracking-wider uppercase">Linux Handbook Playbook</span>
        </div>
        <p>
          Verified on Ubuntu 24.04 LTS Headless Server. Never make the user leave the page.
        </p>
      </footer>
    </div>
  );
}
