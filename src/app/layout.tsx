import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Linux Handbook — Instant Software Playbooks & Fixes',
  description: 'Search software, installation guides, troubleshooting fixes, and Linux alternatives. Fast, minimal, search-first technical playbooks for Ubuntu and Linux distributions.',
  keywords: ['linux', 'ubuntu', 'handbook', 'playbook', 'niri', 'wayland', 'troubleshooting', 'commands', 'alternatives', 'pipewire', 'neovim'],
  other: {
    'darkreader-lock': 'true',
    'color-scheme': 'dark'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-[#0d0e12] text-zinc-100 antialiased ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-[#0d0e12] selection:bg-zinc-800 selection:text-white font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
