'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Languages, ChevronRight, Filter, Search, Globe, AlertTriangle,
  CheckCircle2, Clock, Cpu, BarChart3, Eye, ArrowRight
} from 'lucide-react';
import { LOCALISED_EDITIONS } from '@/lib/localisation/demo-localisation-data';

function stateColor(state: string): string {
  const map: Record<string, string> = {
    LIVE: '#22C55E', APPROVED_FOR_SALE: '#22C55E', READY: '#22C55E', APPROVED: '#22C55E',
    TRANSLATING: '#D6A84B', TRANSLATED_DRAFT: '#D6A84B', LOCALISING: '#D6A84B', PREPARING: '#D6A84B',
    EDITORIAL_REVIEW: '#F97316', COMPLIANCE_REVIEW: '#F97316', VISUAL_QA: '#F97316', FORMAT_QA: '#F97316',
    STALE: '#F59E0B', BLOCKED: '#EF4444', REJECTED: '#EF4444',
    OPPORTUNITY: '#818CF8', APPROVED_FOR_LOCALISATION: '#38BDF8',
  };
  return map[state] ?? '#6B7280';
}

function StatePill({ state }: { state: string }) {
  return (
    <span
      className="font-data text-[9px] px-2 py-0.5 rounded border"
      style={{ color: stateColor(state), borderColor: `${stateColor(state)}30`, backgroundColor: `${stateColor(state)}10` }}
    >
      {state.replace(/_/g, ' ')}
    </span>
  );
}

export default function LocalEditionsManager() {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    'ALL', 'OPPORTUNITY', 'PREPARING', 'TRANSLATING',
    'IN REVIEW', 'READY', 'LIVE', 'STALE', 'BLOCKED'
  ];

  const filteredEditions = LOCALISED_EDITIONS.filter(e => {
    let matchesFilter = true;
    if (selectedFilter === 'OPPORTUNITY') matchesFilter = e.state === 'OPPORTUNITY';
    else if (selectedFilter === 'PREPARING') matchesFilter = e.state === 'PREPARING';
    else if (selectedFilter === 'TRANSLATING') matchesFilter = ['TRANSLATING', 'TRANSLATED_DRAFT', 'LOCALISING'].includes(e.state);
    else if (selectedFilter === 'IN REVIEW') matchesFilter = ['EDITORIAL_REVIEW', 'COMPLIANCE_REVIEW', 'VISUAL_QA', 'FORMAT_QA'].includes(e.state);
    else if (selectedFilter === 'READY') matchesFilter = ['READY', 'APPROVED_FOR_SALE'].includes(e.state);
    else if (selectedFilter === 'LIVE') matchesFilter = e.state === 'LIVE';
    else if (selectedFilter === 'STALE') matchesFilter = e.state === 'STALE';
    else if (selectedFilter === 'BLOCKED') matchesFilter = e.blockingIssuesCount > 0;

    const matchesSearch = searchQuery === '' ||
      e.titleLocalised.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.localeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.productSku.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/localisation" className="hover:text-[#A2A6AD]">GLOBAL LOCALISATION ENGINE</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">LOCAL EDITIONS QUEUE</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Languages className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">LOCAL EDITIONS FACTORY QUEUE</h1>
            </div>
          </div>
          <Link href="/localisation" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO COMMAND CENTRE
          </Link>
        </div>

        {/* Header Stats */}
        <div className="grid grid-cols-4 gap-3 font-data text-xs">
          {[
            { label: 'TOTAL EDITIONS', value: LOCALISED_EDITIONS.length, color: '#D6A84B' },
            { label: 'LIVE EDITIONS', value: LOCALISED_EDITIONS.filter(e => e.state === 'LIVE').length, color: '#22C55E' },
            { label: 'IN REVIEW', value: LOCALISED_EDITIONS.filter(e => ['EDITORIAL_REVIEW', 'COMPLIANCE_REVIEW'].includes(e.state)).length, color: '#F97316' },
            { label: 'BLOCKING ISSUES', value: LOCALISED_EDITIONS.reduce((sum, e) => sum + e.blockingIssuesCount, 0), color: '#EF4444' },
          ].map(s => (
            <div key={s.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-1">
              <div className="text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
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
              placeholder="Filter editions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#121418] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 font-data text-xs text-[#F5F6F7] placeholder-[#626770] focus:outline-none focus:border-[#D6A84B]/50"
            />
          </div>
        </div>

        {/* Editions Table */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden font-data text-xs">
          <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between text-[10px] text-[#626770] tracking-wider font-display">
            <div className="w-44">LOCALE / LANGUAGE</div>
            <div className="flex-1">LOCALISED TITLE / SKU</div>
            <div className="w-36">CANONICAL SOURCE</div>
            <div className="w-28 text-center">COMPLETION</div>
            <div className="w-32 text-center">COMPLIANCE</div>
            <div className="w-28 text-center">STATE</div>
            <div className="w-24 text-right">ACTION</div>
          </div>

          <div className="divide-y divide-white/5">
            {filteredEditions.map(ed => (
              <div key={ed.id} className="px-4 py-3.5 flex items-center justify-between hover:bg-white/2 transition-colors">
                <div className="w-44 space-y-0.5">
                  <div className="font-display text-xs font-bold text-[#F5F6F7]">{ed.localeName}</div>
                  <div className="text-[9px] text-[#D6A84B] font-mono">{ed.localeCode}</div>
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <div className="font-display text-xs text-[#F5F6F7]">{ed.titleLocalised}</div>
                  <div className="text-[9px] text-[#626770]">SKU: {ed.productSku} · Version: {ed.editionVersion}</div>
                </div>
                <div className="w-36 text-[10px] text-[#A2A6AD] font-mono">{ed.sourceEditionId}</div>
                <div className="w-28 text-center">
                  <div className="flex items-center gap-1.5 justify-center">
                    <div className="w-12 h-1.5 bg-[#121418] rounded-full overflow-hidden">
                      <div className="h-full bg-[#22C55E]" style={{ width: `${ed.completionPct}%` }} />
                    </div>
                    <span className="font-bold text-[#22C55E]">{ed.completionPct}%</span>
                  </div>
                </div>
                <div className="w-32 text-center">
                  <span className={`font-data text-[9px] font-bold ${ed.complianceStatus === 'PASS' ? 'text-[#22C55E]' : ed.complianceStatus === 'WARN' ? 'text-[#F97316]' : 'text-[#EF4444]'}`}>
                    {ed.complianceStatus} {ed.blockingIssuesCount > 0 && `(${ed.blockingIssuesCount} BLOCK)`}
                  </span>
                </div>
                <div className="w-28 text-center">
                  <StatePill state={ed.state} />
                </div>
                <div className="w-24 text-right">
                  <Link href={`/localisation/${ed.id}`} className="font-display text-[9px] text-[#D6A84B] hover:text-[#e2b558] flex items-center justify-end gap-1">
                    OPEN <ChevronRight className="w-3 h-3" />
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
