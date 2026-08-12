'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Clock, AlertTriangle, ArrowUpRight, CheckCircle2, Server, Sliders, TrendingUp, DollarSign, Brain } from 'lucide-react';
import TelemetryGrid from '@/components/command/TelemetryGrid';
import LiveActivityStream from '@/components/command/LiveActivityStream';

export default function CommandPage() {
  return (
    <div className="space-y-5 pb-12">
      
      {/* Top Banner Context Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-[#17191E] via-[#121418] to-[#17191E] border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-lg text-[#F5F6F7] font-bold">COMMAND CENTRE</h1>
            <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              OPERATING SYSTEM ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
            Central publishing, distribution, marketplace revenue & intelligence command system
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-data">
          <div className="flex flex-col text-right">
            <span className="text-[#626770] text-[10px]">SYSTEM STATUS</span>
            <span className="text-[#22C55E] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" /> 100% OPERATIONAL
            </span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col text-right">
            <span className="text-[#626770] text-[10px]">CANONICAL TITLES</span>
            <span className="text-[#F5F6F7] font-bold">3 TITLES / 14 SKUs</span>
          </div>
        </div>
      </div>

      {/* Industrial Telemetry Counters Bar */}
      <TelemetryGrid />

      {/* Executive Intelligence Module Card */}
      <div className="industrial-panel p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-[#818CF8]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#818CF8]/10 border border-[#818CF8]/30 flex items-center justify-center">
            <Brain className="w-5 h-5 text-[#818CF8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-sm font-bold text-[#F5F6F7]">EXECUTIVE INTELLIGENCE</h3>
              <span className="text-[10px] font-data text-[#818CF8] px-2 py-0.5 rounded bg-[#818CF8]/10 border border-[#818CF8]/30">
                DECISION SYSTEM ACTIVE
              </span>
            </div>
            <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
              Portfolio: <strong className="text-[#F97316]">AMBER</strong> — Gumroad DE refund threshold breached · 5 priority items · 3 pending approvals · Autopilot: 14 tasks today
            </p>
          </div>
        </div>

        <Link
          href="/executive"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C1F24] hover:bg-white/10 text-[#818CF8] font-display text-xs font-bold border border-[#818CF8]/30 transition-colors"
        >
          OPEN EXECUTIVE <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Autopilot & Connector Engine Modules Grid (§42, §89) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Autopilot Overview Module (§42) */}
        <div className="industrial-panel p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-[#D6A84B]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D6A84B]/10 border border-[#D6A84B]/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#D6A84B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-bold text-[#F5F6F7]">AUTOPILOT ENGINE ACTIVE</h3>
                <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
                  ASSISTED
                </span>
              </div>
              <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
                Objective: <strong className="text-[#F5F6F7]">GET HOW TO TRADE TO 60% RSA</strong> • 17 actions today
              </p>
            </div>
          </div>

          <Link
            href="/autopilot"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md transition-colors"
          >
            OPEN AUTOPILOT <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Connector Network Summary Module (§89) */}
        <div className="industrial-panel p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-[#38BDF8]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center">
              <Server className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-bold text-[#F5F6F7]">CONNECTOR NETWORK</h3>
                <span className="text-[10px] font-data text-[#22C55E] px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30">
                  98.4% API HEALTH
                </span>
              </div>
              <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
                17 configured • 8 Autopilot certified • 4 partial • 3 manual • 1 degraded
              </p>
            </div>
          </div>

          <Link
            href="/integrations"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C1F24] hover:bg-white/10 text-[#38BDF8] font-display text-xs font-bold border border-[#38BDF8]/30 transition-colors"
          >
            OPEN NETWORK <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Merchandising Engine Executive Card (§133) */}
      <div className="industrial-panel p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-[#818CF8]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#818CF8]/10 border border-[#818CF8]/30 flex items-center justify-center">
            <Sliders className="w-5 h-5 text-[#818CF8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-sm font-bold text-[#F5F6F7]">MERCHANDISING ENGINE</h3>
              <span className="text-[10px] font-data text-[#22C55E] px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30">
                5 LIVE LISTINGS
              </span>
            </div>
            <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
              Healthy: <strong className="text-[#22C55E]">3</strong> • Needs action: <strong className="text-[#F97316]">2</strong> • Experiments: <strong className="text-[#818CF8]">2</strong> • Drift: <strong className="text-[#EF4444]">1</strong> • Top opp: <strong className="text-[#D6A84B]">Add Etsy Gallery Worksheets (+4.5 pts)</strong>
            </p>
          </div>
        </div>

        <Link
          href="/merchandising"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C1F24] hover:bg-white/10 text-[#818CF8] font-display text-xs font-bold border border-[#818CF8]/30 transition-colors"
        >
          OPEN MERCHANDISING <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Global Localisation Executive Card (§100) */}
      <div className="industrial-panel p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-[#38BDF8]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center">
            <Sliders className="w-5 h-5 text-[#38BDF8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-sm font-bold text-[#F5F6F7]">GLOBAL LOCALISATION ENGINE</h3>
              <span className="text-[10px] font-data text-[#22C55E] px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30">
                1 LIVE LOCALE (EN-US)
              </span>
            </div>
            <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
              Live: <strong className="text-[#22C55E]">1</strong> • In translation: <strong className="text-[#D6A84B]">2</strong> • In review: <strong className="text-[#F97316]">1</strong> • Largest unlock: <strong className="text-[#D6A84B]">German DACH (+4.2 pts RSA)</strong> • Total unlockable: <strong className="text-[#22C55E]">+12.2 pts</strong>
            </p>
          </div>
        </div>

        <Link
          href="/localisation"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C1F24] hover:bg-white/10 text-[#38BDF8] font-display text-xs font-bold border border-[#38BDF8]/30 transition-colors"
        >
          OPEN GLOBAL ENGINE <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Executive Growth Engine Card (§142) */}
      <div className="industrial-panel p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-[#22C55E]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#22C55E]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-sm font-bold text-[#F5F6F7]">GROWTH COMMAND</h3>
              <span className="text-[10px] font-data text-[#22C55E] px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30">
                REVENUE, NOT THEATRE
              </span>
            </div>
            <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
              Net Attributed: <strong className="text-[#22C55E]">£4,690</strong> • Campaigns: <strong className="text-[#D6A84B]">2 Running</strong> • Affiliates: <strong className="text-[#818CF8]">2 Active</strong> • New Customers: <strong className="text-[#38BDF8]">230</strong> • Demand Gaps: <strong className="text-[#F97316]">3</strong> • Next move: <strong className="text-[#D6A84B]">Recruit LatAm Hotmart Affiliates (+£1.8k/mo)</strong>
            </p>
          </div>
        </div>

        <Link
          href="/growth"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C1F24] hover:bg-white/10 text-[#22C55E] font-display text-xs font-bold border border-[#22C55E]/30 transition-colors"
        >
          OPEN GROWTH COMMAND <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Executive Financial Engine Card (§168) */}
      <div className="industrial-panel p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-[#D6A84B]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#D6A84B]/10 border border-[#D6A84B]/30 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-[#D6A84B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-sm font-bold text-[#F5F6F7]">FINANCIAL ENGINE</h3>
              <span className="text-[10px] font-data text-[#22C55E] px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30">
                REVENUE IS NOT PROFIT
              </span>
            </div>
            <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
              Net Revenue: <strong className="text-[#38BDF8]">£9,840</strong> • Net Contribution: <strong className="text-[#22C55E]">£6,650 (46.7% margin)</strong> • Outstanding Payouts: <strong className="text-[#D6A84B]">£1,895</strong> • Unreconciled: <strong className="text-[#22C55E]">£0.00</strong> • Best surface: <strong className="text-[#22C55E]">Amazon KDP US (52% margin)</strong> • Issue: <strong className="text-[#F97316]">£3.00 FX wire fee variance on Hotmart BR</strong>
            </p>
          </div>
        </div>

        <Link
          href="/finance"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C1F24] hover:bg-white/10 text-[#D6A84B] font-display text-xs font-bold border border-[#D6A84B]/30 transition-colors"
        >
          OPEN FINANCIAL COMMAND <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Bottom Row: Live Telemetry Stream */}
      <LiveActivityStream />

    </div>
  );
}
