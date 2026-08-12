'use client';

import React from 'react';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import DistributionFlowGraph from '@/components/command/DistributionFlowGraph';
import RevenueGauge from '@/components/command/RevenueGauge';
import Link from 'next/link';
import { AlertCircle, Database, Server } from 'lucide-react';

export default function ExecutiveCommandCentrePage() {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <ExecutiveShell>
      <div className="flex flex-col gap-8 pb-12">
        {/* 1. Executive Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6">
          <div className="flex flex-col gap-2">
            <div className="font-data text-xs text-[#A2A6AD]">{today}</div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl text-[#F5F6F7]">EXECUTIVE COMMAND</h1>
              <span className="font-display text-[9px] px-2 py-0.5 rounded border border-[#D6A84B]/30 text-[#D6A84B] bg-[#D6A84B]/10">
                INITIALISING
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#D6A84B]" />
              <span className="text-[11px] font-data text-[#D6A84B]">SYSTEM STATUS: AWAITING MARKETPLACE DATA</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-8 font-data text-xs">
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[#626770] font-display text-[10px]">NET CONTRIB MTD</span>
              <span className="text-[#A2A6AD] text-lg font-bold">—</span>
              <span className="text-[9px] text-[#626770]">Awaiting marketplace data</span>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[#626770] font-display text-[10px]">FORECAST</span>
              <span className="text-[#A2A6AD] text-lg">INSUFFICIENT HISTORY</span>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[#626770] font-display text-[10px]">TARGET ATTAINMENT</span>
              <span className="text-[#A2A6AD] text-lg">NO TARGET SET</span>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[#626770] font-display text-[10px]">APPROVALS</span>
              <span className="text-[#F5F6F7] text-lg">0 PENDING</span>
            </div>
          </div>
        </div>

        {/* 1.5. GLOBAL DISTRIBUTION FLOW & REVENUE ENGINE — Top of CEO Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8">
            <DistributionFlowGraph />
          </div>
          <div className="lg:col-span-4">
            <RevenueGauge />
          </div>
        </div>

        {/* 2. EXECUTIVE INTELLIGENCE — Truthful Insufficient Data State */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="font-display text-xl text-[#D6A84B]">EXECUTIVE INTELLIGENCE</h2>
            <p className="font-data text-xs text-[#626770] mt-1">Priority Engine — ranked by Impact × Confidence × Urgency × Strategic Fit ÷ Effort</p>
          </div>

          <div className="industrial-panel p-10 flex flex-col items-center justify-center text-center gap-4">
            <AlertCircle className="w-10 h-10 text-[#D6A84B]/60" />
            <div className="font-display text-base text-[#A2A6AD]">EXECUTIVE INTELLIGENCE IS COLLECTING EVIDENCE</div>
            <p className="text-[13px] font-data text-[#626770] max-w-lg">
              Connect and authenticate at least one marketplace connector, accumulate trading history,
              and configure a monthly revenue target before executive recommendations are generated.
              A recommendation is not valuable if its evidence was invented.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <Link
                href="/integrations"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D6A84B] text-[#0A0B0D] font-display text-xs font-bold hover:bg-[#e2b558] transition-colors"
              >
                <Server className="w-3.5 h-3.5" /> CONNECT MARKETPLACE
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1C1F24] text-[#A2A6AD] font-display text-xs font-bold border border-white/10 hover:bg-white/5 transition-colors"
              >
                SET MONTHLY TARGET
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Lower Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* PORTFOLIO OVERVIEW — Truthful Empty State */}
          <section className="industrial-panel p-5 flex flex-col gap-4 lg:col-span-1">
            <h3 className="font-display text-sm text-[#F5F6F7] border-b border-white/5 pb-2">PORTFOLIO OVERVIEW</h3>
            <div className="flex flex-col gap-4 font-data text-xs">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[#A2A6AD]">
                  <span>Net Contribution</span>
                  <span className="text-[#626770]">—</span>
                </div>
                <div className="h-1.5 bg-[#121418] rounded-full w-full border border-white/5">
                  <div className="h-full bg-[#1C1F24] rounded-full" style={{ width: '0%' }} />
                </div>
              </div>
              <div className="text-[#626770] text-center py-3">No catalog records. Ingest a publication to begin.</div>
              <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                <span className="text-[#626770] font-display text-[10px]">DISTRIBUTION BREADTH</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#A2A6AD]">0 CONFIGURED CONNECTORS</span>
                </div>
              </div>
            </div>
          </section>

          {/* CEO APPROVAL QUEUE — Truthful Empty State */}
          <section className="industrial-panel p-5 flex flex-col gap-4 lg:col-span-1">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h3 className="font-display text-sm text-[#F5F6F7]">CEO APPROVAL QUEUE</h3>
              <span className="text-[#626770] font-data text-xs">0 PENDING</span>
            </div>
            <div className="text-center text-[#626770] font-data text-xs py-10">
              No pending approvals.
              <br />Autonomous actions require real connector activity to generate approvals.
            </div>
          </section>

          {/* WHAT THE OS DID TODAY — Truthful Empty State */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <section className="industrial-panel p-5 flex flex-col gap-3">
              <h3 className="font-display text-sm text-[#F5F6F7] border-b border-white/5 pb-2">WHAT THE OS DID TODAY</h3>
              <div className="font-data text-xs flex flex-col gap-2 text-[#A2A6AD]">
                <div className="flex justify-between">
                  <span>Distribution tasks completed</span>
                  <span className="text-white">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Listing quality improvements</span>
                  <span className="text-white">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Pricing guardrail checks</span>
                  <span className="text-white">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Intervention violations</span>
                  <span className="text-white">0</span>
                </div>
              </div>
              <div className="text-[10px] font-data text-[#626770] pt-1 border-t border-white/5">
                Figures are zero until real marketplace connections produce verifiable data.
              </div>
            </section>

            <section className="industrial-panel p-5 flex flex-col gap-3 flex-1">
              <h3 className="font-display text-sm text-[#F5F6F7] border-b border-white/5 pb-2">INTELLIGENCE FEED</h3>
              <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
                <Database className="w-6 h-6 text-[#626770]" />
                <span className="text-[11px] font-data text-[#626770]">No intelligence available yet.</span>
                <span className="text-[10px] font-data text-[#626770]">Connect a marketplace to begin.</span>
              </div>
              <Link href="/executive/intelligence" className="text-center font-display text-[10px] text-[#D6A84B] mt-auto pt-2 hover:text-[#FF6A18] transition-colors">
                VIEW ALL →
              </Link>
            </section>
          </div>

        </div>
      </div>
    </ExecutiveShell>
  );
}
