import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, HardDrive, Globe, BarChart3, Tag } from 'lucide-react';
import { supabaseServer } from '@/lib/supabase/server';

export const revalidate = 0;

interface Props {
  params: Promise<{ publicationId: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function PublicationDetailPage({ params, searchParams }: Props) {
  const { publicationId } = await params;
  const { tab = 'overview' } = await searchParams;

  let publication: any = null;
  let files: any[] = [];
  let listings: any[] = [];

  try {
    const { data: pubData } = await supabaseServer
      .from('publications')
      .select('*')
      .eq('id', publicationId)
      .single();

    if (!pubData) {
      notFound();
    }

    publication = pubData;

    const { data: fileData } = await supabaseServer
      .from('publication_files')
      .select('*')
      .eq('publication_id', publicationId)
      .order('created_at', { ascending: false });

    files = fileData ?? [];

    const { data: listingData } = await supabaseServer
      .from('publication_listings')
      .select(`
        *,
        marketplaces ( name, slug, region )
      `)
      .eq('publication_id', publicationId);

    listings = listingData ?? [];
  } catch (err) {
    notFound();
  }

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', icon: BookOpen },
    { id: 'files', label: 'FILES & R2', icon: HardDrive },
    { id: 'distribution', label: 'DISTRIBUTION', icon: Globe },
    { id: 'sales', label: 'SALES', icon: BarChart3 },
    { id: 'metadata', label: 'METADATA', icon: Tag },
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-black/8 pb-4">
        <Link href="/library" className="text-[#6B7280] hover:text-[#3D4452] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#0D0F12] font-bold tracking-wider uppercase">
              {publication.title}
            </h1>
            <span className="text-[10px] font-mono text-[#1E3A5F] px-2 py-0.5 rounded bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 uppercase font-bold">
              {publication.status}
            </span>
          </div>
          <p className="text-xs text-[#6B7280] font-mono mt-0.5">
            {publication.author ? `By ${publication.author}` : 'Author not set'} · ID: {publication.id}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-black/8 overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <Link
              key={t.id}
              href={`/library/${publicationId}?tab=${t.id}`}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                active
                  ? 'border-[#1E3A5F] text-[#1E3A5F] bg-[#1E3A5F]/5'
                  : 'border-transparent text-[#6B7280] hover:text-[#3D4452]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </Link>
          );
        })}
      </div>

      {/* Tab Content */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 industrial-panel p-5 space-y-4">
            <h2 className="text-xs font-bold font-mono tracking-wider text-[#3D4452] uppercase border-b border-black/8 pb-2">
              Publication Overview
            </h2>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-[#6B7280] block">Subtitle:</span>
                <span className="text-[#0D0F12] font-medium">{publication.subtitle || '—'}</span>
              </div>
              <div>
                <span className="text-[#6B7280] block">Description:</span>
                <p className="text-[#3D4452] leading-relaxed mt-1">
                  {publication.description || 'No description provided.'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-[#6B7280] block">Language:</span>
                  <span className="text-[#0D0F12] font-medium uppercase">{publication.language}</span>
                </div>
                <div>
                  <span className="text-[#6B7280] block">Default Price:</span>
                  <span className="text-[#0D0F12] font-medium">
                    {publication.default_price ? `${publication.default_currency || 'GBP'} £${publication.default_price}` : '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="industrial-panel p-5 space-y-4 font-mono text-xs">
            <h2 className="text-xs font-bold tracking-wider text-[#3D4452] uppercase border-b border-black/8 pb-2">
              Quick Stats
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-[#F4F5F7] rounded border border-black/6">
                <span className="text-[#6B7280]">Files</span>
                <span className="text-[#0D0F12] font-bold">{files.length}</span>
              </div>
              <div className="flex justify-between p-2 bg-[#F4F5F7] rounded border border-black/6">
                <span className="text-[#6B7280]">Live Listings</span>
                <span className="text-[#0D0F12] font-bold">{listings.filter(l => l.status === 'LISTED').length}</span>
              </div>
              <div className="flex justify-between p-2 bg-[#F4F5F7] rounded border border-black/6">
                <span className="text-[#6B7280]">Created</span>
                <span className="text-[#3D4452]">
                  {new Date(publication.created_at).toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'files' && (
        <div className="industrial-panel p-5 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-black/8 pb-3">
            <h2 className="text-xs font-bold tracking-wider text-[#3D4452] uppercase">
              ASSOCIATED BINARY FILES ({files.length})
            </h2>
          </div>

          {files.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <HardDrive className="w-6 h-6 text-[#9CA3AF] mx-auto" />
              <div className="text-[#6B7280]">No files uploaded for this publication.</div>
              <p className="text-[11px] text-[#9CA3AF]">
                Configure R2 credentials in .env.local to enable PDF and cover upload.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.id} className="p-3 bg-[#F4F5F7] rounded border border-black/6 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#0D0F12]">{file.filename}</div>
                    <div className="text-[10px] text-[#6B7280] mt-0.5">
                      Role: {file.file_role} · Size: {file.size_bytes ? `${(file.size_bytes / 1024 / 1024).toFixed(2)} MB` : '—'}
                    </div>
                  </div>
                  <span className="text-[10px] text-[#1E3A5F] font-bold px-2 py-0.5 rounded bg-[#1E3A5F]/10 border border-[#1E3A5F]/20">
                    {file.version}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'distribution' && (
        <div className="industrial-panel p-5 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-black/8 pb-3">
            <h2 className="text-xs font-bold tracking-wider text-[#3D4452] uppercase">
              MARKETPLACE LISTINGS ({listings.length})
            </h2>
            <Link href="/distribution" className="text-xs text-[#1E3A5F] font-bold hover:underline">
              MANAGE DISTRIBUTION →
            </Link>
          </div>

          {listings.length === 0 ? (
            <div className="p-8 text-center text-[#6B7280]">
              This publication has not been listed on any marketplace yet.
            </div>
          ) : (
            <div className="space-y-2">
              {listings.map((l) => (
                <div key={l.id} className="p-3 bg-[#F4F5F7] rounded border border-black/6 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#0D0F12]">{l.marketplaces?.name || 'Marketplace'}</div>
                    <div className="text-[10px] text-[#6B7280] mt-0.5">
                      {l.listing_url ? <a href={l.listing_url} target="_blank" rel="noreferrer" className="text-[#1D5F8A] hover:underline">{l.listing_url}</a> : 'No listing URL set'}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1E3A5F]/10 text-[#1E3A5F] border border-[#1E3A5F]/20">
                    {l.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'sales' && (
        <div className="industrial-panel p-8 text-center text-xs font-mono text-[#6B7280]">
          No transactions recorded for this publication yet.
        </div>
      )}

      {tab === 'metadata' && (
        <div className="industrial-panel p-5 space-y-3 font-mono text-xs">
          <h2 className="text-xs font-bold tracking-wider text-[#3D4452] uppercase border-b border-black/8 pb-2">
            Canonical Metadata JSON
          </h2>
          <pre className="p-4 bg-[#F4F5F7] border border-black/6 rounded text-[#0D0F12] overflow-x-auto text-[11px]">
            {JSON.stringify(publication, null, 2)}
          </pre>
        </div>
      )}

    </div>
  );
}
