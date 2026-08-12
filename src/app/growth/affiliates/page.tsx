'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users, ChevronRight, Filter, Search, Plus, DollarSign, ShieldCheck,
  CheckCircle2, AlertTriangle, Sparkles, ExternalLink, Zap
} from 'lucide-react';
import { DEMO_AFFILIATES } from '@/lib/growth/demo-growth-data';

export default function AffiliateGrowthCommand() {
  const [selectedStage, setSelectedStage] = useState<string>('ALL');

  const stages = ['ALL', 'ACTIVE', 'APPLIED', 'PROSPECT', 'INACTIVE'];

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/growth" className="hover:text-[#A2A6AD]">GROWTH COMMAND</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#818CF8]">AFFILIATE GROWTH COMMAND</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#818CF8]/30 flex items-center justify-center">
                <Users className="w-4 h-4 text-[#818CF8]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">AFFILIATE GROWTH COMMAND & RECRUITMENT PIPELINE</h1>
            </div>
          </div>
          <Link href="/growth" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO CONTROL ROOM
          </Link>
        </div>

        {/* Header Stats */}
        <div className="grid grid-cols-4 gap-3 font-data text-xs">
          {[
            { label: 'ACTIVE AFFILIATES', value: DEMO_AFFILIATES.filter(a => a.pipelineStage === 'ACTIVE').length, color: '#22C55E' },
            { label: 'TOTAL AFFILIATE CONTRIBUTION', value: `£${DEMO_AFFILIATES.reduce((sum, a) => sum + a.netContributionGbp, 0).toLocaleString()}`, color: '#22C55E' },
            { label: 'AVG CONTRIBUTION / 100 CLICKS', value: `£${(DEMO_AFFILIATES.reduce((sum, a) => sum + a.contributionPer100ClicksGbp, 0) / DEMO_AFFILIATES.length).toFixed(2)}`, color: '#38BDF8' },
            { label: 'PROSPECT PIPELINE', value: DEMO_AFFILIATES.filter(a => a.pipelineStage === 'PROSPECT' || a.pipelineStage === 'APPLIED').length, color: '#D6A84B' },
          ].map(s => (
            <div key={s.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-1">
              <div className="text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Pipeline & Partners List */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden font-data text-xs space-y-3 p-4">
          <div className="font-display text-xs tracking-wider text-[#626770] pb-2 border-b border-white/5">
            AFFILIATE RECRUITMENT & HEALTH TELEMETRY
          </div>
          <div className="divide-y divide-white/5">
            {DEMO_AFFILIATES.map(aff => (
              <div key={aff.id} className="py-4 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-bold text-[#F5F6F7]">{aff.name}</span>
                    <span className="text-[9px] text-[#D6A84B] font-bold">Score: {aff.opportunityScore}/100</span>
                    <span className="font-data text-[9px] px-2 py-0.5 rounded border border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]">
                      {aff.activeTier}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#626770]">{aff.businessName} · Territory: {aff.territory} · Language: {aff.language.toUpperCase()}</div>
                </div>

                <div className="flex items-center gap-6 text-[10px]">
                  <div>
                    <span className="text-[#626770]">Clicks: </span>
                    <strong className="text-[#F5F6F7]">{aff.totalClicks}</strong>
                  </div>
                  <div>
                    <span className="text-[#626770]">Orders: </span>
                    <strong className="text-[#22C55E]">{aff.totalOrders}</strong>
                  </div>
                  <div>
                    <span className="text-[#626770]">Net Contribution: </span>
                    <strong className="text-[#22C55E]">£{aff.netContributionGbp.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[#626770]">Per 100 Clicks: </span>
                    <strong className="text-[#38BDF8]">£{aff.contributionPer100ClicksGbp}</strong>
                  </div>
                  <button className="bg-[#1C1F24] hover:bg-white/10 text-[#818CF8] font-display text-[9px] font-bold px-3 py-1.5 rounded border border-[#818CF8]/30">
                    GENERATE CREATIVE PACK
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
