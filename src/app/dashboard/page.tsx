import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Globe, 
  BarChart3, 
  AlertTriangle, 
  Plus, 
  ChevronRight, 
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Clock,
  Layers
} from 'lucide-react';
import { supabaseServer } from '@/lib/supabase/server';
import { getWhopStatus, getDigistore24Status } from '@/lib/integrations/status';

export const revalidate = 0; // Dynamic server page

export default async function DashboardPage() {
  // Fetch real counts from Supabase
  let publicationsCount = 0;
  let activeListingsCount = 0;
  let totalMarketplacesCount = 0;
  let connectedChannelsCount = 0;
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

    const { count: mpCount } = await supabaseServer
      .from('marketplaces')
      .select('*', { count: 'exact', head: true })
      .eq('active', true);

    totalMarketplacesCount = mpCount ?? 0;

    const { count: connCount } = await supabaseServer
      .from('marketplace_accounts')
      .select('*', { count: 'exact', head: true })
      .in('connection_status', ['CONNECTED', 'MANUAL']);

    connectedChannelsCount = connCount ?? 0;

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: salesData } = await supabaseServer
      .from('sales_transactions')
      .select('net_amount')
      .eq('status', 'COMPLETED')
      .gte('transacted_at', startOfMonth.toISOString());

    if (salesData && salesData.length > 0) {
      revenueMtd = salesData.reduce((acc, curr) => acc + Number(curr.net_amount || 0), 0);
    }
  } catch (err) {
    // If tables don't exist yet or connection fails, default to 0 / empty state
  }

  // Check integration health
  const whopState = await getWhopStatus();
  const ds24State = await getDigistore24Status();

  // Attention items generated from real data
  const attentionItems: Array<{ label: string; detail: string; action: string; href: string }> = [];

  if (whopState.status === 'ERROR') {
    attentionItems.push({
      label: 'Whop Integration',
      detail: whopState.error ?? 'API connection failing',
      action: 'CHECK KEY',
      href: '/settings/integrations',
    });
  }

  if (ds24State.status === 'ERROR') {
    attentionItems.push({
      label: 'Digistore24 Integration',
      detail: ds24State.error ?? 'API connection failing',
      action: 'CHECK KEY',
      href: '/settings/integrations',
    });
  }

  if (publicationsCount === 0) {
    attentionItems.push({
      label: 'No Publications',
      detail: 'Add your first PDF or publication to begin distribution.',
      action: 'ADD PUBLICATION',
      href: '/library/new',
    });
  }

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider uppercase">PUBLISHING DASHBOARD</h1>
            <span className="text-[10px] font-mono text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              PRODUCTION CORE RESET
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-mono mt-1">
            Single-source publishing, global distribution tracking, and real revenue reconciliation
          </p>
        </div>

        <Link
          href="/library/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] text-xs font-bold tracking-wider transition-colors"
        >
          <Plus className="w-4 h-4" /> ADD PUBLICATION
        </Link>
      </div>

      {/* KPI Row (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="industrial-panel p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-[#A2A6AD] uppercase">Publications</span>
            <BookOpen className="w-4 h-4 text-[#D6A84B]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-mono font-bold text-[#F5F6F7]">{publicationsCount}</div>
            <div className="text-[10px] font-mono text-[#626770] mt-0.5">Canonical catalogue records</div>
          </div>
        </div>

        <div className="industrial-panel p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-[#A2A6AD] uppercase">Active Listings</span>
            <Globe className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-mono font-bold text-[#F5F6F7]">{activeListingsCount}</div>
            <div className="text-[10px] font-mono text-[#626770] mt-0.5">Live marketplace listings</div>
          </div>
        </div>

        <div className="industrial-panel p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-[#A2A6AD] uppercase">API Channels</span>
            <Layers className="w-4 h-4 text-[#22C55E]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-mono font-bold text-[#F5F6F7]">
              {whopState.status === 'CONNECTED' ? 1 : 0} / 2
            </div>
            <div className="text-[10px] font-mono text-[#626770] mt-0.5">Whop & Digistore24 API links</div>
          </div>
        </div>

        <div className="industrial-panel p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-[#A2A6AD] uppercase">Revenue MTD</span>
            <BarChart3 className="w-4 h-4 text-[#D6A84B]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-mono font-bold text-[#F5F6F7]">
              {revenueMtd > 0 ? `£${revenueMtd.toLocaleString('en-GB', { minimumFractionDigits: 2 })}` : '—'}
            </div>
            <div className="text-[10px] font-mono text-[#626770] mt-0.5">Verified settled transactions</div>
          </div>
        </div>
      </div>

      {/* Needs Attention Section */}
      {attentionItems.length > 0 && (
        <div className="industrial-panel p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <AlertTriangle className="w-4 h-4 text-[#D6A84B]" />
            <h2 className="text-xs font-bold tracking-wider text-[#F5F6F7] uppercase">NEEDS ATTENTION</h2>
          </div>
          <div className="space-y-2">
            {attentionItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-[#0D0E11] border border-white/5">
                <div>
                  <div className="text-sm font-medium text-[#F5F6F7]">{item.label}</div>
                  <div className="text-xs text-[#626770] mt-0.5">{item.detail}</div>
                </div>
                <Link
                  href={item.href}
                  className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold tracking-wider text-[#D6A84B] transition-colors"
                >
                  {item.action}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid: Distribution Overview + Integrations Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2 Cols: Distribution Overview */}
        <div className="lg:col-span-2 industrial-panel p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#D6A84B]" />
              <h2 className="text-xs font-bold tracking-wider text-[#F5F6F7] uppercase">CONNECTED DISTRIBUTION CHANNELS</h2>
            </div>
            <Link href="/distribution" className="text-xs text-[#D6A84B] hover:underline font-mono">
              VIEW ALL MARKETPLACES →
            </Link>
          </div>

          <div className="space-y-3">
            {/* Whop Card */}
            <div className="p-4 rounded-lg bg-[#0D0E11] border border-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#F5F6F7]">Whop Direct API</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                    whopState.status === 'CONNECTED' 
                      ? 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30' 
                      : 'text-[#626770] bg-white/5 border-white/10'
                  }`}>
                    {whopState.status}
                  </span>
                </div>
                <div className="text-xs text-[#626770] mt-1 font-mono">
                  {whopState.error ?? (whopState.status === 'CONNECTED' ? 'Live API authenticated' : 'API key required in .env.local')}
                </div>
              </div>
              <Link
                href="/settings/integrations"
                className="px-3 py-1.5 rounded border border-white/10 text-xs font-mono text-[#A2A6AD] hover:text-[#F5F6F7] hover:border-white/20 transition-colors"
              >
                CONFIGURE
              </Link>
            </div>

            {/* Digistore24 Card */}
            <div className="p-4 rounded-lg bg-[#0D0E11] border border-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#F5F6F7]">Digistore24 Direct API</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                    ds24State.status === 'CONNECTED' 
                      ? 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30' 
                      : 'text-[#626770] bg-white/5 border-white/10'
                  }`}>
                    {ds24State.status}
                  </span>
                </div>
                <div className="text-xs text-[#626770] mt-1 font-mono">
                  {ds24State.error ?? (ds24State.status === 'CONNECTED' ? 'Live API authenticated' : 'API key required in .env.local')}
                </div>
              </div>
              <Link
                href="/settings/integrations"
                className="px-3 py-1.5 rounded border border-white/10 text-xs font-mono text-[#A2A6AD] hover:text-[#F5F6F7] hover:border-white/20 transition-colors"
              >
                CONFIGURE
              </Link>
            </div>

            {/* Manual Distribution Summary */}
            <div className="p-4 rounded-lg bg-[#0D0E11] border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#A2A6AD] uppercase">Manual Marketplace Registry</span>
                <Link href="/distribution" className="text-xs text-[#D6A84B] hover:underline font-mono">MANAGE →</Link>
              </div>
              <p className="text-xs text-[#626770] leading-relaxed">
                Track manual listings across Etsy, Amazon KDP, Gumroad, Payhip, Kobo, and Apple Books.
              </p>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Recent Publications */}
        <div className="industrial-panel p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D6A84B]" />
              <h2 className="text-xs font-bold tracking-wider text-[#F5F6F7] uppercase">RECENT PUBLICATIONS</h2>
            </div>
            <Link href="/library" className="text-xs text-[#D6A84B] hover:underline font-mono">LIBRARY →</Link>
          </div>

          {publications.length === 0 ? (
            <div className="p-8 text-center space-y-3">
              <BookOpen className="w-8 h-8 text-[#626770] mx-auto" />
              <div className="text-xs text-[#626770]">No publications ingested yet.</div>
              <Link
                href="/library/new"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#D6A84B] text-[#0A0B0D] text-xs font-bold tracking-wider"
              >
                <Plus className="w-3.5 h-3.5" /> ADD FIRST PUBLICATION
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {publications.map((pub) => (
                <Link
                  key={pub.id}
                  href={`/library/${pub.id}`}
                  className="block p-3 rounded bg-[#0D0E11] hover:bg-white/5 border border-white/5 transition-colors"
                >
                  <div className="text-sm font-bold text-[#F5F6F7] truncate">{pub.title}</div>
                  <div className="flex items-center justify-between text-xs text-[#626770] mt-1 font-mono">
                    <span>{pub.author || 'Author not set'}</span>
                    <span className="text-[#D6A84B]">{pub.status}</span>
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
