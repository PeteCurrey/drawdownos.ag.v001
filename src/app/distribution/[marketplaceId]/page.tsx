import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { supabaseServer } from '@/lib/supabase/server';

export const revalidate = 0;

interface Props {
  params: Promise<{ marketplaceId: string }>;
}

export default async function MarketplaceWorkflowPage({ params }: Props) {
  const { marketplaceId } = await params;

  let publications: any[] = [];
  try {
    const { data } = await supabaseServer
      .from('publications')
      .select('*')
      .order('title', { ascending: true });
    publications = data ?? [];
  } catch {
    publications = [];
  }

  const marketplaceName = marketplaceId.replace(/_/g, ' ').toUpperCase();

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-black/8 pb-4">
        <Link href="/distribution" className="text-[#6B7280] hover:text-[#3D4452] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-xl text-[#0D0F12] font-bold tracking-wider uppercase">
            {marketplaceName} DISTRIBUTION WORKFLOW
          </h1>
          <p className="text-xs text-[#6B7280] font-mono mt-0.5">
            Manual listing helper. Copy formatted titles, descriptions, and metadata.
          </p>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="industrial-panel p-4 space-y-2">
          <div className="text-xs font-bold text-[#1E3A5F] uppercase">1. Select Publication</div>
          <p className="text-[#6B7280]">Choose a publication from your catalogue below to load metadata.</p>
        </div>

        <div className="industrial-panel p-4 space-y-2">
          <div className="text-xs font-bold text-[#1D5F8A] uppercase">2. Copy Listing Data</div>
          <p className="text-[#6B7280]">Copy title, description, and keywords to your clipboard.</p>
        </div>

        <div className="industrial-panel p-4 space-y-2">
          <div className="text-xs font-bold text-[#166534] uppercase">3. Record Live URL</div>
          <p className="text-[#6B7280]">Paste the published listing URL back into Drawdown OS.</p>
        </div>
      </div>

      {/* Publications Selection Table */}
      <div className="industrial-panel p-5 space-y-4 font-mono text-xs">
        <h2 className="text-xs font-bold tracking-wider text-[#3D4452] uppercase border-b border-black/8 pb-2">
          CATALOGUE PUBLICATIONS ({publications.length})
        </h2>

        {publications.length === 0 ? (
          <div className="p-8 text-center text-[#6B7280]">
            No publications found in your library. Add a publication first.
          </div>
        ) : (
          <div className="space-y-3">
            {publications.map((pub) => (
              <div key={pub.id} className="p-4 bg-[#F4F5F7] rounded-lg border border-black/6 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#0D0F12]">{pub.title}</div>
                    <div className="text-xs text-[#6B7280] mt-0.5">{pub.subtitle || 'No subtitle'}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1E3A5F]/10 text-[#1E3A5F] border border-[#1E3A5F]/20">
                    {pub.default_currency || 'GBP'} £{pub.default_price || '—'}
                  </span>
                </div>

                <div className="p-3 bg-white rounded border border-black/6 text-[11px] text-[#3D4452] space-y-2">
                  <div>
                    <span className="text-[#6B7280] block text-[10px] uppercase font-bold">Copyable Title:</span>
                    <code className="text-[#0D0F12] bg-[#F4F5F7] p-1.5 rounded block mt-0.5 select-all border border-black/6">{pub.title}</code>
                  </div>
                  {pub.description && (
                    <div>
                      <span className="text-[#6B7280] block text-[10px] uppercase font-bold">Copyable Description:</span>
                      <code className="text-[#3D4452] bg-[#F4F5F7] p-1.5 rounded block mt-0.5 select-all max-h-24 overflow-y-auto border border-black/6">{pub.description}</code>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
