'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sliders, ChevronRight, Filter, Search, Globe, AlertTriangle,
  CheckCircle2, Clock, Cpu, BarChart3, Eye, ArrowRight, ExternalLink
} from 'lucide-react';
import { DEMO_LISTINGS } from '@/lib/merchandising/demo-merchandising-data';
import type { ListingState } from '@/lib/merchandising/types';

function statusColor(status: string): string {
  const map: Record<string, string> = {
    LIVE: '#22C55E', APPROVED: '#22C55E', PUBLISHED: '#22C55E',
    RUNNING: '#D6A84B', OPTIMISING: '#D6A84B', GENERATING: '#D6A84B',
    STALE: '#F59E0B', DRIFTED: '#EF4444', NEEDS_REVIEW: '#F97316', REJECTED: '#EF4444', FAILED: '#EF4444',
    DRAFT: '#6B7280',
  };
  return map[status] ?? '#6B7280';
}

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className="font-data text-[9px] px-2 py-0.5 rounded border"
      style={{ color: statusColor(status), borderColor: `${statusColor(status)}30`, backgroundColor: `${statusColor(status)}10` }}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
}

export default function ListingsFactory() {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    'ALL', 'LIVE', 'DRAFT', 'NEEDS REVIEW', 'OPTIMISING',
    'STALE', 'DRIFTED', 'FAILED', 'HIGH OPPORTUNITY', 'LOW PERFORMANCE'
  ];

  const filteredListings = DEMO_LISTINGS.filter(l => {
    let matchesFilter = true;
    if (selectedFilter === 'LIVE') matchesFilter = l.status === 'LIVE';
    else if (selectedFilter === 'DRAFT') matchesFilter = l.status === 'DRAFT';
    else if (selectedFilter === 'NEEDS REVIEW') matchesFilter = l.status === 'NEEDS_REVIEW' || l.approvalStatus === 'PENDING';
    else if (selectedFilter === 'OPTIMISING') matchesFilter = l.status === 'OPTIMISING';
    else if (selectedFilter === 'STALE') matchesFilter = l.status === 'STALE';
    else if (selectedFilter === 'DRIFTED') matchesFilter = l.isDrifted;
    else if (selectedFilter === 'FAILED') matchesFilter = l.status === 'FAILED';
    else if (selectedFilter === 'HIGH OPPORTUNITY') matchesFilter = l.listingQualityScore < 80;
    else if (selectedFilter === 'LOW PERFORMANCE') matchesFilter = l.performanceState === 'UNDERPERFORMING';

    const matchesSearch = searchQuery === '' ||
      l.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.marketplaceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.productSku.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/merchandising" className="hover:text-[#A2A6AD] transition-colors">MERCHANDISING ENGINE</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">LISTINGS FACTORY</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Sliders className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">CHANNEL LISTINGS FACTORY</h1>
            </div>
          </div>
          <Link href="/merchandising" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO COMMAND CENTRE
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'TOTAL LISTINGS', value: DEMO_LISTINGS.length, color: '#D6A84B' },
            { label: 'LIVE & SYNCED', value: DEMO_LISTINGS.filter(l => l.status === 'LIVE').length, color: '#22C55E' },
            { label: 'ACTION REQUIRED', value: DEMO_LISTINGS.filter(l => l.isDrifted || l.status === 'STALE').length, color: '#F97316' },
            { label: 'AVG QUALITY SCORE', value: `${Math.round(DEMO_LISTINGS.reduce((sum, l) => sum + l.listingQualityScore, 0) / DEMO_LISTINGS.length)}%`, color: '#38BDF8' },
          ].map(s => (
            <div key={s.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-1">
              <div className="font-data text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="font-data text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div className="flex items-center justify-between gap-4 bg-[#0E1014] border border-white/8 rounded-xl p-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {filterTabs.map(t => (
              <button
                key={t}
                onClick={() => setSelectedFilter(t)}
                className={`px-3 py-1.5 rounded-lg font-display text-[10px] tracking-wider transition-all whitespace-nowrap ${selectedFilter === t ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30' : 'text-[#626770] hover:text-[#A2A6AD]'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#626770] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter listings..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#121418] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 font-data text-xs text-[#F5F6F7] placeholder-[#626770] focus:outline-none focus:border-[#D6A84B]/50"
            />
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden font-data text-xs">
          <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between text-[10px] text-[#626770] tracking-wider font-display">
            <div className="w-40">MARKETPLACE</div>
            <div className="flex-1">PRODUCT / SKU</div>
            <div className="w-24 text-center">VERSION</div>
            <div className="w-28 text-center">QUALITY</div>
            <div className="w-28 text-center">CONVERSION</div>
            <div className="w-28 text-right">NET REVENUE</div>
            <div className="w-28 text-center">STATUS</div>
            <div className="w-24 text-right">ACTION</div>
          </div>

          <div className="divide-y divide-white/5">
            {filteredListings.map(lst => (
              <div key={lst.id} className="px-4 py-3.5 flex items-center justify-between hover:bg-white/2 transition-colors">
                <div className="w-40 font-display text-xs font-bold text-[#F5F6F7]">{lst.marketplaceName}</div>
                <div className="flex-1 min-w-0 pr-4">
                  <div className="font-display text-xs text-[#F5F6F7]">{lst.productName}</div>
                  <div className="text-[9px] text-[#626770]">SKU: {lst.productSku} · Territory: {lst.territoryId}</div>
                </div>
                <div className="w-24 text-center text-[10px] text-[#D6A84B] font-bold">v{lst.listingVersion}</div>
                <div className="w-28 text-center">
                  <span className="font-bold" style={{ color: lst.listingQualityScore >= 85 ? '#22C55E' : '#D6A84B' }}>{lst.listingQualityScore}%</span>
                </div>
                <div className="w-28 text-center text-[#22C55E] font-bold">{lst.conversionRatePct}%</div>
                <div className="w-28 text-right font-bold text-[#F5F6F7]">£{lst.netRevenueGbp.toFixed(2)}</div>
                <div className="w-28 text-center">
                  <StatusPill status={lst.status} />
                </div>
                <div className="w-24 text-right">
                  <Link href={`/merchandising/listings/${lst.id}`} className="font-display text-[9px] text-[#D6A84B] hover:text-[#e2b558] flex items-center justify-end gap-1">
                    MANAGE <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
