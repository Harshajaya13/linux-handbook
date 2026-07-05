'use client';

import React, { useState, useEffect } from 'react';
import { Problem } from '../../types/playbook';
import { Wrench, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, ExternalLink, Search, CheckCircle2 } from 'lucide-react';
import TerminalCodeBlock from '../TerminalCodeBlock';

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
      <div className="p-10 text-center rounded-2xl bg-zinc-900/30 border border-zinc-800/60 space-y-3 font-sans">
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-white text-base">No Common Problems Reported</h3>
        <p className="text-zinc-400 text-xs max-w-sm mx-auto">
          This software runs with verified rock-solid stability on Ubuntu 24.04 LTS without major recurring installation bugs.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans">
      {/* Filter Bar */}
      {problems.length > 1 && (
        <div className="relative flex items-center px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
          <Search className="w-4 h-4 text-zinc-500 mr-2.5 shrink-0" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter solution cards by keyword, symptom, or error code... (e.g. xwayland, lock, permission)"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
        </div>
      )}

      {/* Solution Cards (No loud borders! Soft gray! Calm terminal blocks!) */}
      <div className="space-y-4">
        {filteredProblems.map((prob) => {
          const isOpen = openIds.has(prob.id);
          const isHighlighted = defaultOpenId === prob.id;

          return (
            <div
              key={prob.id}
              id={`problem-${prob.id}`}
              className={`rounded-2xl transition-all overflow-hidden ${
                isHighlighted
                  ? 'border border-amber-500/40 bg-amber-500/5 shadow-md'
                  : 'border border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700/80'
              }`}
            >
              {/* Header Toggle */}
              <button
                onClick={() => toggleOpen(prob.id)}
                type="button"
                className="w-full p-5 sm:p-6 flex items-start justify-between gap-4 text-left cursor-pointer select-none bg-zinc-900/40 hover:bg-zinc-900/80 transition-colors"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="font-bold text-white text-base sm:text-lg leading-snug">
                      {prob.title}
                    </h3>
                    {prob.symptoms && prob.symptoms.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {prob.symptoms.map((symptom, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/60 text-[11px] font-mono text-zinc-300"
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

              {/* Solution Content */}
              {isOpen && (
                <div className="p-5 sm:p-6 border-t border-zinc-800/60 space-y-6 bg-zinc-950/30">
                  {/* Cause */}
                  <div className="space-y-1.5">
                    <div className="text-zinc-400 font-mono text-xs uppercase tracking-wider font-bold">
                      Root Cause
                    </div>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800/60">
                      {prob.cause}
                    </p>
                  </div>

                  {/* Solution & Commands */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-bold">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified Solution</span>
                    </div>
                    <p className="text-white text-sm sm:text-base leading-relaxed font-semibold">
                      {prob.solution}
                    </p>

                    {/* Calm Terminal Block without decorative header banners */}
                    {prob.commands && prob.commands.length > 0 && (
                      <div className="pt-1">
                        <TerminalCodeBlock
                          code={prob.commands.join('\n')}
                          label="Copy Fix"
                          size="sm"
                          showPrompt={true}
                        />
                      </div>
                    )}
                  </div>

                  {/* Verification Step */}
                  {prob.verificationCommand && (
                    <div className="space-y-2 pt-2 border-t border-zinc-800/60 font-mono">
                      <div className="flex items-center gap-2 text-cyan-300 text-xs sm:text-sm font-bold font-sans">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Verify Fix Success</span>
                      </div>
                      <TerminalCodeBlock
                        code={prob.verificationCommand}
                        label="Copy Verify"
                        size="sm"
                        showPrompt={true}
                      />
                    </div>
                  )}

                  {/* Explanation */}
                  {prob.explanation && (
                    <div className="pt-2 border-t border-zinc-900/80 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                      <strong className="text-zinc-300">Why this works: </strong>
                      {prob.explanation}
                    </div>
                  )}

                  {/* References */}
                  {prob.references && prob.references.length > 0 && (
                    <div className="pt-2 border-t border-zinc-900/80 flex flex-wrap items-center gap-4 text-xs font-mono">
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
