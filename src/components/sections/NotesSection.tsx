'use client';

import React, { useState, useEffect } from 'react';
import { CommunityNote } from '../../types/playbook';
import { MessageSquare, ThumbsUp, Send, CheckCircle2, User, Sparkles } from 'lucide-react';

interface NotesSectionProps {
  initialNotes: CommunityNote[];
  playbookSlug: string;
}

export default function NotesSection({ initialNotes, playbookSlug }: NotesSectionProps) {
  const [notes, setNotes] = useState<CommunityNote[]>(initialNotes);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Load custom notes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`notes_${playbookSlug}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setNotes([...initialNotes, ...parsed]);
      }
    } catch {
      // ignore
    }
  }, [playbookSlug, initialNotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newNote: CommunityNote = {
      id: `custom-${Date.now()}`,
      author: author.trim() || 'Anonymous Linux User',
      date: new Date().toISOString().split('T')[0],
      content: content.trim(),
      upvotes: 1
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    setContent('');
    setAuthor('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    try {
      const existingCustom = localStorage.getItem(`notes_${playbookSlug}`);
      const customArray = existingCustom ? JSON.parse(existingCustom) : [];
      localStorage.setItem(`notes_${playbookSlug}`, JSON.stringify([newNote, ...customArray]));
    } catch {
      // ignore
    }
  };

  const handleUpvote = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, upvotes: n.upvotes + 1 } : n))
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Introduction */}
      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
        <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Community Troubleshooting Notes & Gotchas</span>
        </h3>
        <p className="text-zinc-300 text-sm leading-relaxed">
          Real-world tips contributed by users running this software. Found a specific flag needed for Wayland, or a workaround for Ubuntu 24.04 Server? Leave a note below!
        </p>
      </div>

      {/* Submit Form */}
      <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-lg relative overflow-hidden">
        <h4 className="font-bold text-white text-base mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Add Your Field Note</span>
        </h4>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-3 text-sm animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Thank you! Your note has been added to this playbook.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='e.g. "On Ubuntu 24.04 headless, make sure to export DISPLAY=:0 before starting..."'
                rows={3}
                required
                className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 text-white placeholder-zinc-500 text-sm focus:outline-none transition-all font-sans"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 max-w-xs w-full">
                <User className="w-4 h-4 text-zinc-500 shrink-0" />
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your Name / Handle (Optional)"
                  className="w-full p-2 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Note</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-5 sm:p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700/80 transition-all flex items-start justify-between gap-4 shadow-sm"
          >
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap text-xs font-mono">
                <span className="font-bold text-white bg-zinc-800 px-2.5 py-0.5 rounded border border-zinc-700/80">
                  @{note.author}
                </span>
                <span className="text-zinc-500">{note.date}</span>
                {note.distro && (
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {note.distro}
                  </span>
                )}
              </div>

              <p className="text-zinc-200 text-sm sm:text-base font-sans leading-relaxed pt-1">
                {note.content}
              </p>
            </div>

            <button
              onClick={() => handleUpvote(note.id)}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-600 text-zinc-300 hover:text-white transition-all text-xs font-mono shrink-0 cursor-pointer"
              title="Helpful note"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>{note.upvotes}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
