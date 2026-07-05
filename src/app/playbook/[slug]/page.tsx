import React, { Suspense } from 'react';
import PlaybookViewer from '../../../components/PlaybookViewer';

export default async function PlaybookPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center font-mono text-emerald-400 text-sm">
          <span>Loading Playbook...</span>
        </div>
      }
    >
      <PlaybookViewer slug={slug} />
    </Suspense>
  );
}
