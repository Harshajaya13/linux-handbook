import { PLAYBOOKS } from '../data/playbooks';
import { Playbook, Problem, Alternative } from '../types/playbook';

export interface SearchResultItem {
  id: string;
  type: 'playbook' | 'problem' | 'alternative';
  title: string;
  subtitle: string;
  slug: string; // The playbook to navigate to
  problemId?: string; // If navigating to a specific problem card
  alternativeId?: string; // If navigating to a specific alternative
  commandSnippet?: string; // Quick command copy preview
  badge?: string;
}

export function searchHandbook(query: string): SearchResultItem[] {
  if (!query || query.trim() === '') {
    return [];
  }

  const q = query.toLowerCase().trim();
  const results: SearchResultItem[] = [];
  const addedIds = new Set<string>();

  // 1. Direct Software Playbook matches
  for (const pb of PLAYBOOKS) {
    const titleMatch = pb.name.toLowerCase().includes(q) || pb.slug.toLowerCase().includes(q);
    const tagMatch = pb.tagline.toLowerCase().includes(q) || pb.category.toLowerCase().includes(q);
    const whatMatch = pb.overview.whatIsIt.toLowerCase().includes(q);

    if (titleMatch || tagMatch || whatMatch) {
      if (!addedIds.has(`pb-${pb.slug}`)) {
        addedIds.add(`pb-${pb.slug}`);
        const recInstall = pb.installMethods.find(m => m.isRecommended) || pb.installMethods[0];
        results.push({
          id: `pb-${pb.slug}`,
          type: 'playbook',
          title: pb.name,
          subtitle: pb.tagline,
          slug: pb.slug,
          commandSnippet: recInstall?.command ? recInstall.command.split('\n')[0] : undefined,
          badge: pb.category
        });
      }
    }
  }

  // 2. Troubleshooting & Error Message matches
  for (const pb of PLAYBOOKS) {
    for (const prob of pb.problems) {
      const probTitleMatch = prob.title.toLowerCase().includes(q);
      const probCauseMatch = prob.cause.toLowerCase().includes(q);
      const probSolMatch = prob.solution.toLowerCase().includes(q);
      const symptomMatch = prob.symptoms?.some(s => s.toLowerCase().includes(q));

      if (probTitleMatch || probCauseMatch || probSolMatch || symptomMatch) {
        if (!addedIds.has(`prob-${pb.slug}-${prob.id}`)) {
          addedIds.add(`prob-${pb.slug}-${prob.id}`);
          results.push({
            id: `prob-${pb.slug}-${prob.id}`,
            type: 'problem',
            title: prob.title,
            subtitle: `Fix for ${pb.name} — ${prob.cause}`,
            slug: pb.slug,
            problemId: prob.id,
            commandSnippet: prob.commands[0],
            badge: 'Troubleshooting'
          });
        }
      }
    }
  }

  // 3. Alternatives matches (e.g. searching "Photoshop" or "Microsoft Office")
  for (const pb of PLAYBOOKS) {
    for (const alt of pb.alternatives) {
      const altNameMatch = alt.name.toLowerCase().includes(q);
      const whyMatch = alt.whyItExists.toLowerCase().includes(q);
      const isAltQuery = q === 'photoshop' || q === 'office' || q === 'microsoft office' || q === 'chrome' || q === 'pulse' || q === 'nvm';

      if (altNameMatch || whyMatch || (isAltQuery && pb.slug.toLowerCase().includes(q))) {
        if (!addedIds.has(`alt-${pb.slug}-${alt.id}`)) {
          addedIds.add(`alt-${pb.slug}-${alt.id}`);
          results.push({
            id: `alt-${pb.slug}-${alt.id}`,
            type: 'alternative',
            title: `${alt.name} (Alternative to ${pb.name})`,
            subtitle: alt.whyItExists,
            slug: pb.slug,
            alternativeId: alt.id,
            commandSnippet: alt.installCommand,
            badge: alt.tag
          });
        }
      }
    }
  }

  return results;
}

// LocalStorage Helpers for Recently Viewed
const RECENT_KEY = 'linux_handbook_recently_viewed';

export function getRecentlyViewed(): Playbook[] {
  if (typeof window === 'undefined') return PLAYBOOKS.slice(0, 3);
  try {
    const stored = localStorage.getItem(RECENT_KEY);
    if (!stored) return PLAYBOOKS.slice(0, 3);
    const slugs: string[] = JSON.parse(stored);
    return slugs
      .map(s => PLAYBOOKS.find(p => p.slug === s))
      .filter((p): p is Playbook => p !== undefined);
  } catch {
    return PLAYBOOKS.slice(0, 3);
  }
}

export function addToRecentlyViewed(slug: string): void {
  if (typeof window === 'undefined') return;
  try {
    const stored = localStorage.getItem(RECENT_KEY);
    let slugs: string[] = stored ? JSON.parse(stored) : [];
    slugs = [slug, ...slugs.filter(s => s !== slug)].slice(0, 4);
    localStorage.setItem(RECENT_KEY, JSON.stringify(slugs));
  } catch {
    // Ignore storage errors
  }
}

export function getPopularPlaybooks(): Playbook[] {
  return [...PLAYBOOKS].sort((a, b) => (a.popularRank || 99) - (b.popularRank || 99)).slice(0, 4);
}

export function getRecentlyAddedPlaybooks(): Playbook[] {
  return [...PLAYBOOKS].slice(-4).reverse();
}
