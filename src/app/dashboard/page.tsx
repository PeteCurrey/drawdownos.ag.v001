import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Globe,
  BarChart3,
  AlertTriangle,
  Plus,
  Layers,
} from 'lucide-react';
import { supabaseServer } from '@/lib/supabase/server';
import { getWhopStatus, getDigistore24Status } from '@/lib/integrations/status';

export const revalidate = 0;

export default async function DashboardPage() {
  let publicationsCount = 0;
  let activeListingsCount = 0;
  let revenueMtd = 0;
  let publications: any[] = [];

  try {
    const { count: pubCount, data: pubData } = await supabaseServer
      .from('publications')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(5);
    publicationsCount = pubCount ?? 0;
    publications = pubData ?? [];

    const { count: listingCount } = await supabaseServer
      .from('publication_listings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'LISTED');
    activeListingsCount = listingCount ?? 0;

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const { data: salesData } = await supabaseServer
      .from('sales_transactions')
      .select('net_amount')
      .eq('status', 'COMPLETED')
      .gte('transacted_at', startOfMonth.toISOString());
    if (salesData) revenueMtd = salesData.reduce((acc, curr) => acc + Number(curr.net_amount || 0), 0);
  } catch {}

  const whopState = await getWhopStatus();
  const ds24State = await getDigistore24Status();

  const attentionItems: Array<{ label: string; detail: string; action: string; href: string }> = [];
  if (whopState.status === 'ERROR') attentionItems.push({ label: 'Whop Integration', detail: whopState.error ?? 'API connection failing', action: 'CHECK KEY', href: '/settings/integrations' });
  if (ds24State.status === 'ERROR') attentionItems.push({ label: 'Digistore24 Integration', detail: ds24State.error ?? 'API connection failing', action: 'CHECK KEY', href: '/settings/integrations' });
  if (publicationsCount === 0) attentionItems.push({ label: 'No Publications', detail: 'Add your first PDF to begin distribution.', action: 'ADD PUBLICATION', href: '/library/new' });

  return (
    <div className="space-y-6 pb-16">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/8 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#0D0F12] font-bold tracking-wider">PUBLISHING DASHBOARD</h1>
            <span className="text-[10px] font-mono text-[#1E3A5F] px-2 py-0.5 rounded bg-[#1E3A5F]/10 border border-[#1E3A5F]/20">
              PRODUCTION CORE
            </span>
          </div>
          <p className="text-xs text-[#6B7280] font-mono mt-1">
            Single-source publishing, global distribution tracking, and real revenue reconciliation
          </p>
        </div>
        <Link
          href="/library/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1E3A5F] hover:bg-[#162d4a] text-white text-xs font-bold tracking-wider transition-colors"
        >
          <Plus className="w-4 h-4" /> ADD PUBLICATION
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Publications', value: publicationsCount, sub: 'Canonical catalogue records', icon: BookOpen, color: 'text-[#1E3A5F]' },
          { label: 'Active Listings', value: activeListingsCount, sub: 'Live marketplace listings', icon: Globe, color: 'text-[#1D5F8A]' },
          { label: 'API Channels', value: `${whopState.status === 'CONNECTED' ? 1 : 0} / 2`, sub: 'Whop & Digistore24 API links', icon: Layers, color: 'text-[#166534]' },
          { label: 'Revenue MTD', value: revenueMtd > 0 ? `£${revenueMtd.toFixed(2)}` : '—', sub: 'Verified settled transactions', icon: BarChart3, color: 'text-[#1E3A5F]' },
        ].map((card) => (
          <div key={card.label} className="industrial-panel p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-[#6B7280] uppercase">{card.label}</span>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
            <div className="mt-3">
              <div className={`text-2xl font-mono font-bold text-[#0D0F12]`}>{card.value}</div>
              <div className="text-[10px] font-mono text-[#9CA3AF] mt-0.5">{card.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Needs Attention */}
      {attentionItems.length > 0 && (
        <div className="industrial-panel p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-black/8 pb-3">
            <AlertTriangle className="w-4 h-4 text-[#D44E00]" />
            <h2 className="text-xs font-bold tracking-wider text-[#0D0F12] uppercase">NEEDS ATTENTION</h2>
          </div>
          <div className="space-y-2">
            {attentionItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-[#F4F5F7] border border-black/6">
                <div>
                  <div className="text-sm font-medium text-[#0D0F12]">{item.label}</div>
                  <div className="text-xs text-[#6B7280] mt-0.5">{item.detail}</div>
                </div>
                <Link href={item.href} className="px-3 py-1.5 rounded bg-[#1E3A5F]/10 hover:bg-[#1E3A5F]/20 border border-[#1E3A5F]/20 text-xs font-bold tracking-wider text-[#1E3A5F] transition-colors">
                  {item.action}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Distribution Overview */}
        <div className="lg:col-span-2 industrial-panel p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-black/8 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#1E3A5F]" />
              <h2 className="text-xs font-bold tracking-wider text-[#0D0F12] uppercase">CONNECTED DISTRIBUTION CHANNELS</h2>
            </div>
            <Link href="/distribution" className="text-xs text-[#1E3A5F] hover:underline font-mono">VIEW ALL →</Link>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Whop Direct API', state: whopState },
              { name: 'Digistore24 Direct API', state: ds24State },
            ].map((ch) => (
              <div key={ch.name} className="p-4 rounded-lg bg-[#F4F5F7] border border-black/6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#0D0F12]">{ch.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                      ch.state.status === 'CONNECTED'
                        ? 'text-[#166534] bg-green-50 border-green-200'
                        : 'text-[#6B7280] bg-gray-100 border-gray-200'
                    }`}>
                      {ch.state.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#6B7280] mt-1 font-mono">
                    {ch.state.error ?? (ch.state.status === 'CONNECTED' ? 'Live API authenticated' : 'API key required in .env.local')}
                  </div>
                </div>
                <Link href="/settings/integrations" className="px-3 py-1.5 rounded border border-black/10 text-xs font-mono text-[#3D4452] hover:bg-black/5 transition-colors">
                  CONFIGURE
                </Link>
              </div>
            ))}
            <div className="p-4 rounded-lg bg-[#F4F5F7] border border-black/6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#3D4452] uppercase">Manual Marketplace Registry</span>
                <Link href="/distribution" className="text-xs text-[#1E3A5F] hover:underline font-mono">MANAGE →</Link>
              </div>
              <p className="text-xs text-[#6B7280]">Track manual listings across Etsy, Amazon KDP, Gumroad, Payhip, Kobo, and Apple Books.</p>
            </div>
          </div>
        </div>

        {/* Recent Publications */}
        <div className="industrial-panel p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-black/8 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#1E3A5F]" />
              <h2 className="text-xs font-bold tracking-wider text-[#0D0F12] uppercase">RECENT PUBLICATIONS</h2>
            </div>
            <Link href="/library" className="text-xs text-[#1E3A5F] hover:underline font-mono">LIBRARY →</Link>
          </div>
          {publications.length === 0 ? (
            <div className="p-8 text-center space-y-3">
              <BookOpen className="w-8 h-8 text-[#9CA3AF] mx-auto" />
              <div className="text-xs text-[#6B7280]">No publications ingested yet.</div>
              <Link href="/library/new" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1E3A5F] text-white text-xs font-bold tracking-wider hover:bg-[#162d4a] transition-colors">
                <Plus className="w-3.5 h-3.5" /> ADD FIRST PUBLICATION
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {publications.map((pub) => (
                <Link key={pub.id} href={`/library/${pub.id}`} className="block p-3 rounded bg-[#F4F5F7] hover:bg-[#ECEEF2] border border-black/6 transition-colors">
                  <div className="text-sm font-bold text-[#0D0F12] truncate">{pub.title}</div>
                  <div className="flex items-center justify-between text-xs text-[#6B7280] mt-1 font-mono">
                    <span>{pub.author || 'No author'}</span>
                    <span className="text-[#1E3A5F] font-bold">{pub.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
