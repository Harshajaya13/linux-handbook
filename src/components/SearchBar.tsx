'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, Wrench, RefreshCw, ArrowRight, X, Command } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { searchHandbook, SearchResultItem, addToRecentlyViewed } from '../lib/search';
import CopyButton from './CopyButton';

interface SearchBarProps {
  variant?: 'hero' | 'modal';
  isOpen?: boolean;
  onClose?: () => void;
  defaultQuery?: string;
}

export default function SearchBar({
  variant = 'hero',
  isOpen = true,
  onClose,
  defaultQuery = ''
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultQuery);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const res = searchHandbook(query);
    setResults(res);
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Global shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && variant === 'modal' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [variant, onClose]);

  const handleSelect = (item: SearchResultItem) => {
    addToRecentlyViewed(item.slug);
    if (onClose) onClose();

    if (item.type === 'playbook') {
      router.push(`/playbook/${item.slug}`);
    } else if (item.type === 'problem') {
      router.push(`/playbook/${item.slug}?tab=problems&problemId=${item.problemId}`);
    } else if (item.type === 'alternative') {
      router.push(`/playbook/${item.slug}?tab=alternatives`);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      if (query) {
        setQuery('');
      } else if (onClose) {
        onClose();
      }
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'playbook':
        return <Terminal className="w-4 h-4 text-emerald-500/80" />;
      case 'problem':
        return <Wrench className="w-4 h-4 text-amber-400" />;
      case 'alternative':
        return <RefreshCw className="w-4 h-4 text-cyan-400" />;
      default:
        return <Search className="w-4 h-4 text-zinc-400" />;
    }
  };

  if (variant === 'modal' && !isOpen) return null;

  if (variant === 'hero') {
    // Move #4: Let the terminal be the visual identity, not a decorative afterthought or SaaS command palette.
    return (
      <div className="w-full max-w-3xl mx-auto relative font-mono">
        <div className="w-full bg-zinc-950/95 border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl shadow-2xl transition-all duration-200 overflow-hidden p-1 sm:p-2">
          {/* Authentic terminal prompt layout */}
          <div className="flex items-center px-3 sm:px-4 py-3 bg-zinc-900/40 rounded-lg">
            <span className="text-emerald-500/80 select-none font-bold mr-3 shrink-0">$</span>
            <span className="text-zinc-500 select-none mr-2.5 hidden sm:inline font-semibold">linux-handbook search</span>
            <div className="relative flex-1 flex items-center min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="software, commands, error messages, or fixes... (e.g. niri, wayland, audio)"
                className="w-full bg-transparent text-white placeholder-zinc-600 font-mono text-sm sm:text-base focus:outline-none pr-8"
              />
              {!query && (
                <span className="inline-block w-2 h-4 bg-zinc-500/60 animate-pulse pointer-events-none -ml-6 sm:-ml-2" />
              )}
            </div>
            {query ? (
              <button
                onClick={() => setQuery('')}
                type="button"
                className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs select-none shrink-0">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            )}
          </div>

          {/* Results Dropdown */}
          {results.length > 0 && (
            <div className="max-h-[50vh] overflow-y-auto divide-y divide-zinc-800/60 mt-1 p-1 bg-zinc-950">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`group flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer ${
                      isSelected ? 'bg-zinc-800/90 text-white' : 'hover:bg-zinc-900/80 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0 pr-3">
                      <div className="p-2 rounded-md bg-zinc-900 border border-zinc-800 shrink-0 mt-0.5">
                        {getIcon(item.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm sm:text-base text-white truncate font-sans">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 truncate mt-0.5 font-sans">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.commandSnippet && (
                        <div className="hidden lg:block">
                          <CopyButton
                            text={item.commandSnippet}
                            label="Copy CMD"
                            size="sm"
                          />
                        </div>
                      )}
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? 'text-white translate-x-0.5' : 'text-zinc-600 group-hover:text-zinc-400'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {query && results.length === 0 && (
            <div className="p-8 text-center text-zinc-500 font-sans">
              <p className="text-sm font-medium text-zinc-400">No playbooks or fixes found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1 text-zinc-600">Try searching for an error message (like &ldquo;display&rdquo; or &ldquo;lock&rdquo;) or a tool (like &ldquo;niri&rdquo; or &ldquo;pipewire&rdquo;).</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Modal variant (quiet, considered, without SaaS shortcut fluff bars)
  const containerClasses =
    'fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[15vh] p-4 animate-in fade-in duration-150 font-sans';

  const boxClasses =
    'w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden font-mono';

  return (
    <div className={containerClasses} onClick={onClose}>
      <div className={boxClasses} onClick={(e) => e.stopPropagation()}>
        <div className="relative flex items-center px-4 py-4 border-b border-zinc-800/80 bg-zinc-900/40">
          <span className="text-emerald-500/80 select-none font-bold mr-3 shrink-0">$</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search software, commands, error messages, or fixes..."
            className="w-full bg-transparent text-white placeholder-zinc-600 font-mono text-sm sm:text-base focus:outline-none pr-8"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              type="button"
              className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs select-none">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto divide-y divide-zinc-800/60 p-2 bg-zinc-950">
            {results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                    isSelected ? 'bg-zinc-800/90 text-white' : 'hover:bg-zinc-900/80 text-zinc-300'
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0 pr-3">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0 mt-0.5">
                      {getIcon(item.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm sm:text-base text-white truncate font-sans">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 truncate mt-0.5 font-sans">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.commandSnippet && (
                      <div className="hidden lg:block">
                        <CopyButton
                          text={item.commandSnippet}
                          label="Copy CMD"
                          size="sm"
                        />
                      </div>
                    )}
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-white translate-x-0.5' : 'text-zinc-600 group-hover:text-zinc-400'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="p-8 text-center text-zinc-500 font-sans">
            <p className="text-sm font-medium text-zinc-400">No playbooks found for &ldquo;{query}&rdquo;</p>
            <p className="text-xs mt-1 text-zinc-600">Try searching for an error message or tool name.</p>
          </div>
        )}
      </div>
    </div>
  );
}
