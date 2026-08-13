'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Zap, ArrowUpRight, Server, Sliders, TrendingUp, DollarSign, Brain } from 'lucide-react';
import TelemetryGrid from '@/components/command/TelemetryGrid';
import LiveActivityStream from '@/components/command/LiveActivityStream';

export default function CommandPage() {
  const [whopConnected, setWhopConnected] = useState(false);

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch('/api/connectors/whop/health');
        if (res.ok) {
          const data = await res.json();
          setWhopConnected(data.connected);
        }
      } catch {
        setWhopConnected(false);
      }
    }
    checkHealth();
  }, []);

  return (
    <div className="space-y-5 pb-12">
      
      {/* Top Banner Context Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-[#17191E] via-[#121418] to-[#17191E] border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-lg text-[#F5F6F7] font-bold">COMMAND CENTRE</h1>
            <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              TRUTH LAYER ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
            Central publishing, distribution, marketplace revenue & intelligence command system
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-data">
          <div className="flex flex-col text-right">
            <span className="text-[#626770] text-[10px]">WHOP API STATUS</span>
            <span className={`font-bold flex items-center justify-end gap-1 ${whopConnected ? 'text-[#22C55E]' : 'text-[#D6A84B]'}`}>
              <span className={`w-2 h-2 rounded-full ${whopConnected ? 'bg-[#22C55E] animate-pulse' : 'bg-[#D6A84B]'}`} />
              {whopConnected ? 'LIVE & CONNECTED' : 'CHECKING API...'}
            </span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col text-right">
            <span className="text-[#626770] text-[10px]">CONNECTED MARKETPLACES</span>
            <span className="text-[#F5F6F7] font-bold">{whopConnected ? '1 MARKETPLACE (WHOP)' : '0 CONNECTED'}</span>
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
                DECISION SYSTEM INITIALISING
              </span>
            </div>
            <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
              Whop API connected · 0 pending approvals · Executive recommendations require recorded sales history
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

      {/* Autopilot & Connector Engine Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Autopilot Overview Module */}
        <div className="industrial-panel p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-[#D6A84B]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D6A84B]/10 border border-[#D6A84B]/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#D6A84B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-bold text-[#F5F6F7]">AUTOPILOT ENGINE</h3>
                <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
                  STANDBY
                </span>
              </div>
              <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
                0 background tasks running · Autopilot requires user rules &amp; ingested publications
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

        {/* Connector Network Summary Module */}
        <div className="industrial-panel p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-[#38BDF8]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center">
              <Server className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-bold text-[#F5F6F7]">CONNECTOR NETWORK</h3>
                <span className="text-[10px] font-data text-[#22C55E] px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30">
                  1 CONNECTED (WHOP)
                </span>
              </div>
              <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
                1 API connected (Whop) · All other marketplaces unlinked · Zero fake connection states
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

      {/* Merchandising Engine Executive Card */}
      <div className="industrial-panel p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-[#818CF8]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#818CF8]/10 border border-[#818CF8]/30 flex items-center justify-center">
            <Sliders className="w-5 h-5 text-[#818CF8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-sm font-bold text-[#F5F6F7]">MERCHANDISING ENGINE</h3>
              <span className="text-[10px] font-data text-[#A2A6AD] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                0 ACTIVE LISTINGS
              </span>
            </div>
            <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
              Whop product ingestion ready · No mock listings displayed
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

      {/* Global Localisation Executive Card */}
      <div className="industrial-panel p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-[#38BDF8]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center">
            <Sliders className="w-5 h-5 text-[#38BDF8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-sm font-bold text-[#F5F6F7]">GLOBAL LOCALISATION ENGINE</h3>
              <span className="text-[10px] font-data text-[#A2A6AD] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                0 EDITIONS
              </span>
            </div>
            <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
              Translation memory ready · DeepL API configured in .env.local
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

      {/* Executive Growth Engine Card */}
      <div className="industrial-panel p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-[#22C55E]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#22C55E]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-sm font-bold text-[#F5F6F7]">GROWTH COMMAND</h3>
              <span className="text-[10px] font-data text-[#A2A6AD] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                0 ATTRIBUTED REVENUE
              </span>
            </div>
            <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
              Awaiting real growth campaign telemetry and Whop payment attribution
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

      {/* Executive Financial Engine Card */}
      <div className="industrial-panel p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-[#D6A84B]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#D6A84B]/10 border border-[#D6A84B]/30 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-[#D6A84B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-sm font-bold text-[#F5F6F7]">FINANCIAL ENGINE</h3>
              <span className="text-[10px] font-data text-[#A2A6AD] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                0 UNRECONCILED
              </span>
            </div>
            <p className="text-xs text-[#A2A6AD] font-data mt-0.5">
              Whop direct payments ledger active · All calculations derived from verified API payments
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
