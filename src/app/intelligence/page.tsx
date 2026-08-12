'use client';

import React from 'react';
import Link from 'next/link';
import { Brain, Radio, TrendingUp, AlertTriangle, ExternalLink, RefreshCw, CheckCircle2, Target, Globe, Zap, ArrowUpRight, ChevronRight } from 'lucide-react';


export default function IntelligencePage() {
  const candidates: any[] = [];
  const S: any = {
    portfolioCapturedPercent: 0,
    portfolioSurfaceScore: 0,
    totalLiveChannelPositions: 0,
    totalEligibleUnexplored: 0,
    portfolioMonthlyRevenueLive: 0,
    portfolioMonthlyRevenuePotential: 0
  };

  const modules = [
    {
      href: '/intelligence/surface-area',
      icon: Globe,
      name: 'REVENUE SURFACE AREA',
      desc: 'Commercial distribution intelligence. Measure how much of the global market each publication is reaching and identify unexplored opportunities.',
      metric: `${S.portfolioCapturedPercent.toFixed(1)}% captured`,
      metricLabel: 'of addressable surface',
      badge: 'FLAGSHIP',
      badgeColor: 'bg-[#D6A84B] text-[#0A0B0D]',
      glow: 'border-[#D6A84B]/30 hover:border-[#D6A84B]/60',
      urgent: true,
    },
    {
      href: '/intelligence',
      icon: Radio,
      name: 'MARKETPLACE RADAR',
      desc: 'Automated discovery agent evaluating new sales channels, regional digital retailers, and partner platforms globally.',
      metric: `${candidates.length} candidates`,
      metricLabel: 'in discovery pipeline',
      badge: 'ACTIVE',
      badgeColor: 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30',
      glow: 'border-white/10 hover:border-[#22C55E]/30',
      urgent: false,
    },
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">INTELLIGENCE CENTRE</h1>
            <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              2 SYSTEMS ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Market discovery, commercial surface analysis, opportunity identification, and competitive monitoring
          </p>
        </div>
      </div>

      {/* Intelligence Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {modules.map(mod => {
          const Icon = mod.icon;
          return (
            <Link key={mod.href} href={mod.href} className={`industrial-panel p-6 flex flex-col gap-4 border transition-all ${mod.glow} group`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0D0E11] border border-white/10 flex items-center justify-center group-hover:border-[#D6A84B]/30 transition-colors">
                    <Icon className="w-5 h-5 text-[#D6A84B]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-display text-sm font-bold text-[#F5F6F7]">{mod.name}</h2>
                      <span className={`text-[9px] font-display px-2 py-0.5 rounded ${mod.badgeColor}`}>
                        {mod.badge}
                      </span>
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#626770] group-hover:text-[#D6A84B] transition-colors" />
              </div>
              
              <p className="text-xs text-[#A2A6AD] leading-relaxed">{mod.desc}</p>
              
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div>
                  <div className="font-data text-lg font-bold text-[#F5F6F7]">{mod.metric}</div>
                  <div className="text-[9px] font-display text-[#626770]">{mod.metricLabel}</div>
                </div>
                <div className="flex items-center gap-1 text-xs font-display text-[#D6A84B] group-hover:gap-2 transition-all">
                  OPEN <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Portfolio Surface Summary */}
      <div className="industrial-panel p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#D6A84B]" />
            <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider">PORTFOLIO COMMERCIAL SURFACE SUMMARY</h3>
          </div>
          <Link href="/intelligence/surface-area" className="text-[10px] font-display text-[#D6A84B] hover:underline flex items-center gap-1">
            FULL ANALYSIS <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-data text-xs">
          <div className="p-3 bg-[#0D0E11] rounded-lg">
            <div className="text-[9px] font-display text-[#626770]">SURFACE SCORE</div>
            <div className="text-xl font-bold text-[#D6A84B] mt-1">{S.portfolioSurfaceScore}<span className="text-xs text-[#626770]">/100</span></div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-lg">
            <div className="text-[9px] font-display text-[#626770]">LIVE CHANNELS</div>
            <div className="text-xl font-bold text-[#22C55E] mt-1">{S.totalLiveChannelPositions}</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-lg">
            <div className="text-[9px] font-display text-[#626770]">UNEXPLORED (HIGH-VALUE)</div>
            <div className="text-xl font-bold text-[#FF6A18] mt-1">{S.totalEligibleUnexplored}</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-lg">
            <div className="text-[9px] font-display text-[#626770]">REVENUE CAPTURED</div>
            <div className="text-xl font-bold text-[#D6A84B] mt-1">{S.portfolioCapturedPercent.toFixed(1)}%</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-data text-[#A2A6AD]">
            <span className="text-[#22C55E]">${(S.portfolioMonthlyRevenueLive / 1000).toFixed(0)}k/mo captured</span>
            <span className="text-[#626770]">${(S.portfolioMonthlyRevenuePotential / 1000).toFixed(0)}k/mo total potential</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#22C55E] to-[#D6A84B]"
              style={{ width: `${S.portfolioCapturedPercent}%`, boxShadow: '0 0 8px rgba(34,197,94,0.4)' }}
            />
          </div>
        </div>
      </div>

      {/* Marketplace Radar Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xs text-[#626770] tracking-wider uppercase">
            MARKETPLACE RADAR — HIGH-SCORE DISCOVERY CANDIDATES
          </h2>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md">
            <RefreshCw className="w-4 h-4" /> RUN DISCOVERY SCAN
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="col-span-full industrial-panel p-8 flex flex-col items-center justify-center text-center space-y-3">
            <AlertTriangle className="w-8 h-8 text-[#D6A84B]" />
            <div className="font-display text-sm font-bold text-[#F5F6F7]">NO REAL MARKETPLACE CANDIDATES AVAILABLE</div>
            <div className="text-[10px] text-[#626770] max-w-md">
              Cannot display discovery pipeline. Requires active connection to external marketplace discovery agent.
            </div>
          </div>
        </div>
      </div>

      {/* Marketplace Change Monitor */}
      <div className="industrial-panel p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#FF6A18]" />
            <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider">MARKETPLACE CHANGE MONITOR</h3>
          </div>
          <span className="text-[10px] font-data text-[#22C55E]">MONITORING 6 LIVE CHANNELS</span>
        </div>

        <div className="space-y-2.5 font-data text-xs">
          <div className="p-3 bg-[#0D0E11] rounded-lg border border-white/5 flex items-center justify-between">
            <div>
              <span className="font-bold text-[#F5F6F7]">Amazon KDP UK:</span>
              <span className="text-[#A2A6AD] ml-2">Royalties fee table updated for high-file-size PDFs (&gt;10MB). Confidence: 98%</span>
            </div>
            <span className="text-[10px] font-display text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10">REVIEW REQUIRED</span>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-lg border border-white/5 flex items-center justify-between">
            <div>
              <span className="font-bold text-[#F5F6F7]">Gumroad:</span>
              <span className="text-[#A2A6AD] ml-2">New affiliate commission cap of $2,500/transaction introduced. No action needed at current price points.</span>
            </div>
            <span className="text-[10px] font-display text-[#22C55E] px-2 py-0.5 rounded bg-[#22C55E]/10">MONITORED</span>
          </div>
        </div>
      </div>

    </div>
  );
}
