'use client';

import React from 'react';
import CopyButton from './CopyButton';

interface TerminalCodeBlockProps {
  code: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showPrompt?: boolean;
}

const COMMANDS_SET = new Set([
  'sudo', 'apt', 'git', 'cargo', 'curl', 'wget', 'install', 'rm', 'mv', 'ln', 'tar',
  'chmod', 'chsh', 'mkdir', 'cd', 'source', 'echo', 'export', 'set', 'python3',
  'pip', 'pipx', 'uv', 'flatpak', 'snap', 'systemctl', 'update', 'upgrade', 'remove',
  'purge', 'build', 'clean', 'init', 'run', 'status', 'restart', 'stop', 'enable',
  'disable', 'clone', 'which', 'grep', 'pactl', 'xdg-open', 'bash', 'sh', 'fish',
  'zoxide', 'niri', 'zen', 'nvim', 'code', 'fnm', 'venv', 'activate', 'ipykernel',
  'jupyter', 'jupyterlab', 'gimp', 'krita', 'onlyoffice-desktopeditors', 'xwayland-satellite',
  'tee', 'gpg', 'unzip', 'cat', 'less', 'head', 'tail', 'find', 'sed', 'awk', 'pacman', 'dnf', 'yay'
]);

export default function TerminalCodeBlock({
  code,
  label = 'Copy',
  size = 'md',
  showPrompt = true
}: TerminalCodeBlockProps) {
  const lines = code.trim().split('\n');

  const highlightToken = (token: string, idx: number) => {
    if (!token || /^\s+$/.test(token)) {
      return <span key={idx}>{token}</span>;
    }

    // Flag
    if (token.startsWith('-') && token.length > 1) {
      return (
        <span key={idx} className="text-amber-300/90 font-mono">
          {token}
        </span>
      );
    }

    // Path / URL / File
    if (
      token.startsWith('http://') ||
      token.startsWith('https://') ||
      token.includes('/') ||
      token.startsWith('~') ||
      token.startsWith('./') ||
      token.startsWith('../') ||
      /\.(sh|deb|zip|gz|tar|git|kdl|conf|fish|json|desktop|list|gpg|lua|py|js|ts|txt)$/i.test(token)
    ) {
      return (
        <span key={idx} className="text-sky-300 font-mono">
          {token}
        </span>
      );
    }

    // Operators
    if (['&&', '||', '|', '>', '>>', ';', '=', '2>/dev/null', '|| true'].includes(token)) {
      return (
        <span key={idx} className="text-zinc-500 font-mono">
          {token}
        </span>
      );
    }

    const cleanWord = token.replace(/^["'(]/, '').replace(/["'),;]+$/, '');

    // Known Command
    if (COMMANDS_SET.has(cleanWord.toLowerCase())) {
      return (
        <span key={idx} className="text-zinc-100 font-semibold font-mono">
          {token}
        </span>
      );
    }

    return (
      <span key={idx} className="text-cyan-300/90 font-mono">
        {token}
      </span>
    );
  };

  const highlightLine = (line: string) => {
    const tokens = line.split(/(\s+)/);
    return tokens.map((t, i) => highlightToken(t, i));
  };

  return (
    <div className="rounded-xl bg-[#090a0f] border border-zinc-800/90 p-4 sm:p-5 font-mono relative group shadow-inner transition-all hover:border-zinc-700">
      <div className="absolute top-3.5 right-3.5 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
        <CopyButton text={code} label={label} size="sm" />
      </div>

      <div className={`space-y-1.5 overflow-x-auto pr-20 ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-xs sm:text-sm'} leading-relaxed`}>
        {lines.map((line, lineIdx) => {
          const trimmed = line.trim();

          if (!trimmed) {
            return <div key={lineIdx} className="h-3" />;
          }

          if (trimmed.startsWith('#')) {
            return (
              <div key={lineIdx} className="flex items-start">
                {showPrompt && (
                  <span className="text-zinc-600 select-none mr-3 shrink-0">#</span>
                )}
                <span className="text-zinc-500 italic font-mono">
                  {trimmed.replace(/^#\s*/, '')}
                </span>
              </div>
            );
          }

          return (
            <div key={lineIdx} className="flex items-start">
              {showPrompt && (
                <span className="text-zinc-500 select-none mr-3 shrink-0 font-mono">$</span>
              )}
              <div className="whitespace-pre flex-1 min-w-0 font-mono">
                {highlightLine(line)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
