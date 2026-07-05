'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Terminal, Home, ChevronRight, AlertCircle, ArrowLeft, ExternalLink } from 'lucide-react';
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
  
  const [activeTab, setActiveTab] = useState<TabType>(tabParam || 'install');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const playbook = PLAYBOOKS.find((p) => p.slug === slug);

  useEffect(() => {
    if (tabParam && ['install', 'overview', 'problems', 'alternatives', 'files', 'remove', 'notes'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (newTab: TabType) => {
    setActiveTab(newTab);
    router.push(`/playbook/${slug}?tab=${newTab}`, { scroll: false });
  };

  if (!playbook) {
    return (
      <div className="min-h-screen bg-[#0f1114] flex flex-col justify-between font-sans">
        <Navbar onOpenSearch={() => setIsSearchModalOpen(true)} />
        <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4 animate-in fade-in">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-white font-display">Playbook Not Found</h1>
          <p className="text-[#a8adb5] text-sm">
            The software playbook &ldquo;{slug}&rdquo; does not exist in the current Linux catalog.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5EEAD4] text-[#0f1114] font-semibold hover:bg-[#4dd0ba] text-sm transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Search Homepage</span>
            </Link>
          </div>
        </div>
        <footer className="py-8 border-t border-zinc-900 text-center text-xs text-zinc-600 font-sans">
          Linux Handbook Playbooks
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1114] text-zinc-100 flex flex-col justify-between selection:bg-zinc-800 selection:text-white font-sans">
      <Navbar onOpenSearch={() => setIsSearchModalOpen(true)} />

      {/* Search Modal */}
      <SearchBar
        variant="modal"
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      <main className="flex-1 pb-24">
        {/* Breadcrumb & Top Bar (Apple discipline: zero borders, soft text) */}
        <div className="bg-[#0f1114]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 flex-wrap text-xs text-zinc-500 font-sans">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-zinc-300 transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>Search</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-zinc-700" />
              <span className="text-zinc-400">{playbook.category}</span>
              <ChevronRight className="w-3 h-3 text-zinc-700" />
              <span className="text-zinc-200 font-medium">{playbook.name}</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-zinc-500">
                Verified: <strong className="text-zinc-300 font-normal">{playbook.overview.lastVerified || 'Ubuntu 24.04 LTS'}</strong>
              </span>
              <a
                href={playbook.overview.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
              >
                <span>Official Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Header (Apple restraint: off-white body text, generous vertical breathing room) */}
        <div className="bg-[#0f1114] pt-6 pb-8 border-b border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#f4f4f5] tracking-tight font-display">
                  {playbook.name}
                </h1>
                <p className="text-sm sm:text-base text-[#a8adb5] mt-2 font-sans leading-relaxed max-w-2xl">
                  {playbook.tagline}
                </p>
              </div>

              {/* Quick Action: Apple discipline — One solid filled primary CTA per screen */}
              {activeTab !== 'install' && !playbook.isUnsupported && (
                <button
                  onClick={() => handleTabChange('install')}
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5EEAD4] hover:bg-[#4dd0ba] text-[#0f1114] font-semibold text-xs transition-all cursor-pointer shrink-0 shadow-[0_4px_14px_rgba(94,234,212,0.25)] font-sans"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#0f1114]" />
                  <span>Install Now</span>
                </button>
              )}
            </div>
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

        {/* Section Container with generous breathing room (Apple spacing 32-48px) */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12">
          {activeTab === 'install' && (
            <InstallSection playbook={playbook} />
          )}

          {activeTab === 'overview' && (
            <OverviewSection
              playbook={playbook}
              onGoToInstall={() => handleTabChange('install')}
              onGoToAlternatives={() => handleTabChange('alternatives')}
            />
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
      <footer className="border-t border-white/[0.04] bg-[#0f1114] py-12 text-center text-xs text-zinc-600 font-sans space-y-2">
        <div className="flex items-center justify-center gap-2 text-zinc-500 font-medium">
          <span>Linux Handbook</span>
        </div>
        <p className="text-zinc-600">
          A collection of solved problems. Verified on Ubuntu 24.04 LTS Headless Server.
        </p>
      </footer>
    </div>
  );
}
