'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sliders, ChevronRight, Filter, Search, Globe, AlertTriangle,
  CheckCircle2, Clock, Cpu, BarChart3, Eye, ArrowRight, ExternalLink
} from 'lucide-react';
import type { ListingState } from '@/lib/merchandising/types';

function statusColor(status: string): string {
  const map: Record<string, string> = {
    LIVE: '#22C55E', APPROVED: '#22C55E', PUBLISHED: '#22C55E',
    RUNNING: '#D6A84B', OPTIMISING: '#D6A84B', GENERATING: '#D6A84B',
    STALE: '#F59E0B', DRIFTED: '#EF4444', NEEDS_REVIEW: '#F97316', REJECTED: '#EF4444', FAILED: '#EF4444',
    DRAFT: '#6B7280', UNKNOWN: '#6B7280'
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
            { label: 'TOTAL LISTINGS', value: '-', color: '#626770' },
            { label: 'LIVE & SYNCED', value: '-', color: '#626770' },
            { label: 'ACTION REQUIRED', value: '-', color: '#626770' },
            { label: 'AVG QUALITY SCORE', value: '-', color: '#626770' },
          ].map(s => (
            <div key={s.label} className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-1">
              <div className="font-data text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="font-data text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div className="flex items-center justify-between gap-4 bg-[#0E1014] border border-white/8 rounded-xl p-3 industrial-panel">
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
        <div className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden font-data text-xs">
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

          <div className="p-16 flex flex-col items-center justify-center text-center space-y-4">
            <AlertTriangle className="w-10 h-10 text-[#D6A84B]" />
            <div className="font-display text-sm tracking-wider text-[#F5F6F7]">NO CHANNEL LISTINGS AVAILABLE</div>
            <div className="font-data text-xs text-[#626770] max-w-lg">
              Drawdown OS cannot prove the existence of any listings. 
              Values are only displayed when verified by a real internal record or active channel integration.
            </div>
            <div className="font-display text-[10px] text-[#D6A84B] px-4 py-2 border border-[#D6A84B]/30 bg-[#D6A84B]/10 rounded-lg">
              CONNECT SALES CHANNEL
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
