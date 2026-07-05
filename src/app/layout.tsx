import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Linux Handbook — Instant Software Playbooks & Fixes',
  description: 'Search software, installation guides, troubleshooting fixes, and Linux alternatives. Fast, minimal, search-first technical playbooks for Ubuntu and Linux distributions.',
  keywords: ['linux', 'ubuntu', 'handbook', 'playbook', 'niri', 'wayland', 'troubleshooting', 'commands', 'alternatives', 'pipewire', 'neovim']
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-zinc-950 text-zinc-100 antialiased">
      <body className="min-h-screen bg-zinc-950 selection:bg-emerald-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
