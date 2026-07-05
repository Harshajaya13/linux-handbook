'use client';

import React, { useState, useEffect } from 'react';
import { Problem } from '../../types/playbook';
import { Wrench, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, ExternalLink, Search } from 'lucide-react';
import CopyButton from '../CopyButton';

interface ProblemsSectionProps {
  problems: Problem[];
  defaultOpenId?: string | null;
}

export default function ProblemsSection({ problems, defaultOpenId }: ProblemsSectionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenId ? [defaultOpenId] : problems.map(p => p.id)));
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    if (defaultOpenId) {
      setOpenIds(new Set([defaultOpenId]));
      setTimeout(() => {
        const el = document.getElementById(`problem-${defaultOpenId}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [defaultOpenId]);

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredProblems = problems.filter((p) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.cause.toLowerCase().includes(q) ||
      p.solution.toLowerCase().includes(q) ||
      p.symptoms?.some((s) => s.toLowerCase().includes(q))
    );
  });

  if (problems.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-3">
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-white text-base">No Common Problems Reported</h3>
        <p className="text-zinc-400 text-xs max-w-sm mx-auto">
          This playbook has verified rock-solid stability on Ubuntu 24.04 LTS without major recurring installation bugs.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Filter Bar */}
      {problems.length > 1 && (
        <div className="relative flex items-center px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <Search className="w-4 h-4 text-zinc-500 mr-2.5 shrink-0" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter problems by symptom, error code, or keyword... (e.g. wayland, lock, permission)"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
        </div>
      )}

      {/* Problems List */}
      <div className="space-y-4">
        {filteredProblems.map((prob) => {
          const isOpen = openIds.has(prob.id);
          const isHighlighted = defaultOpenId === prob.id;

          return (
            <div
              key={prob.id}
              id={`problem-${prob.id}`}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isHighlighted
                  ? 'border-amber-500/60 bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/30'
                  : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700/80'
              }`}
            >
              {/* Header Toggle */}
              <button
                onClick={() => toggleOpen(prob.id)}
                type="button"
                className="w-full p-5 sm:p-6 flex items-start justify-between gap-4 text-left cursor-pointer select-none bg-zinc-900/90 hover:bg-zinc-900 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-base sm:text-lg leading-snug">
                      {prob.title}
                    </h3>
                    {prob.symptoms && prob.symptoms.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {prob.symptoms.map((symptom, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700/80 text-[11px] font-mono text-zinc-300"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-1 rounded-md text-zinc-400 group-hover:text-white shrink-0 mt-1">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Collapsible Content */}
              {isOpen && (
                <div className="p-5 sm:p-6 border-t border-zinc-800/80 space-y-6 bg-zinc-950/60">
                  {/* Cause */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-bold">
                      <span>Root Cause</span>
                    </div>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800/80">
                      {prob.cause}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-bold">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified Fix & Solution</span>
                    </div>
                    <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-sans font-medium">
                      {prob.solution}
                    </p>

                    {/* Commands Box */}
                    {prob.commands && prob.commands.length > 0 && (
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden font-mono mt-2">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800">
                          <span className="text-xs text-zinc-500 uppercase font-bold">
                            Resolution Terminal Commands
                          </span>
                          <CopyButton text={prob.commands.join('\n')} label="Copy Fix" size="sm" />
                        </div>
                        <pre className="p-4 text-xs sm:text-sm text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                          {prob.commands.join('\n')}
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Explanation */}
                  {prob.explanation && (
                    <div className="pt-2 border-t border-zinc-900 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      <strong className="text-zinc-300">Why this works: </strong>
                      {prob.explanation}
                    </div>
                  )}

                  {/* References */}
                  {prob.references && prob.references.length > 0 && (
                    <div className="pt-3 border-t border-zinc-900 flex flex-wrap items-center gap-4 text-xs font-mono">
                      <span className="text-zinc-500">References:</span>
                      {prob.references.map((ref, idx) => (
                        <a
                          key={idx}
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-400 hover:underline"
                        >
                          <span>{ref.title}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
