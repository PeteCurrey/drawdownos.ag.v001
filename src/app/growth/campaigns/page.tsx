'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Target, ChevronRight, Filter, Search, Plus, DollarSign, Users,
  CheckCircle2, AlertTriangle, ShieldCheck, Clock, Zap
} from 'lucide-react';

function campaignStatusColor(status: string): string {
  const map: Record<string, string> = {
    RUNNING: '#22C55E', READY: '#38BDF8', COMPLETED: '#22C55E',
    DRAFT: '#D6A84B', PAUSED: '#F97316', STOPPED_OUT: '#EF4444',
  };
  return map[status] ?? '#6B7280';
}

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className="font-data text-[9px] px-2 py-0.5 rounded border"
      style={{ color: campaignStatusColor(status), borderColor: `${campaignStatusColor(status)}30`, backgroundColor: `${campaignStatusColor(status)}10` }}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
}

export default function CampaignFactoryPage() {
  const [selectedObjective, setSelectedObjective] = useState<string>('ALL');

  const filterTabs = [
    'ALL', 'NET_REVENUE', 'FREE_TO_PAID_CONVERSION', 'LOCAL_EDITION_LAUNCH', 'AFFILIATE_RECRUITMENT'
  ];

  const filteredCampaigns: any[] = [];

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/growth" className="hover:text-[#A2A6AD]">GROWTH COMMAND</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#22C55E]">CAMPAIGN FACTORY</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#22C55E]/30 flex items-center justify-center">
                <Target className="w-4 h-4 text-[#22C55E]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">CAMPAIGN FACTORY & MANAGER</h1>
            </div>
          </div>
          <Link href="/growth" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO CONTROL ROOM
          </Link>
        </div>

        {/* Header Stats */}
        <div className="grid grid-cols-4 gap-3 font-data text-xs">
          {[
            { label: 'TOTAL CAMPAIGNS', value: 0, color: '#D6A84B' },
            { label: 'RUNNING CAMPAIGNS', value: 0, color: '#22C55E' },
            { label: 'TOTAL ATTRIBUTED NET', value: `£0.00`, color: '#22C55E' },
            { label: 'AVG CONTRIBUTION ROAS', value: `0.00x`, color: '#38BDF8' },
          ].map(s => (
            <div key={s.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-1">
              <div className="text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-4 bg-[#0E1014] border border-white/8 rounded-xl p-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {filterTabs.map(t => (
              <button
                key={t}
                onClick={() => setSelectedObjective(t)}
                className={`px-3 py-1.5 rounded-lg font-display text-[10px] tracking-wider transition-all whitespace-nowrap ${selectedObjective === t ? 'bg-[#1C1F24] text-[#22C55E] border border-[#22C55E]/30' : 'text-[#626770] hover:text-[#A2A6AD]'}`}
              >
                {t.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 bg-[#22C55E] hover:bg-[#1fb354] text-[#0A0B0D] font-display text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" /> CREATE NEW CAMPAIGN
          </button>
        </div>

        {/* Campaigns List */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden font-data text-xs space-y-3 p-4">
          <div className="font-display text-xs tracking-wider text-[#626770] pb-2 border-b border-white/5">
            ACTIVE & PREPARED GROWTH CAMPAIGNS
          </div>
          <div className="space-y-4">
            <div className="bg-[#121418] border border-white/5 rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-3 industrial-panel">
              <Target className="w-8 h-8 text-[#D6A84B]" />
              <div className="font-display text-sm font-bold text-[#F5F6F7]">NO REAL CAMPAIGN DATA AVAILABLE</div>
              <div className="text-[10px] text-[#626770] max-w-md">
                Cannot display active campaigns. Requires active connection to advertising accounts (Google/Meta Ads) and attribution tracking to sync real ROAS and spend metrics.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
