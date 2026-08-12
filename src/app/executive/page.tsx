'use client';

import React, { useState } from 'react';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import PriorityCard from '@/components/executive/PriorityCard';
import HealthStatus from '@/components/executive/HealthStatus';
import { 
  DEMO_PORTFOLIO_HEALTH, 
  DEMO_FIVE_THINGS, 
  DEMO_APPROVALS, 
  DEMO_INSIGHTS 
} from '@/lib/executive/demo-executive-data';

export default function ExecutiveCommandCentrePage() {
  const [expandedId, setExpandedId] = useState<string | null>(DEMO_FIVE_THINGS[0]?.id || null);

  return (
    <ExecutiveShell>
      <div className="flex flex-col gap-8 pb-12">
        {/* 1. Executive Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6">
          <div className="flex flex-col gap-2">
            <div className="font-data text-xs text-[#A2A6AD]">Wednesday, 12 August 2026</div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl text-[#F5F6F7]">EXECUTIVE COMMAND</h1>
              <span className="font-display text-[9px] px-2 py-0.5 rounded border border-[#D6A84B]/30 text-[#D6A84B] bg-[#D6A84B]/10">
                DECISION SYSTEM ACTIVE
              </span>
            </div>
            <div className="mt-2">
              <HealthStatus size="lg" status={DEMO_PORTFOLIO_HEALTH.status} reason={DEMO_PORTFOLIO_HEALTH.reason} />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-8 font-data text-xs">
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[#626770] font-display text-[10px]">NET CONTRIB MTD</span>
              <span className="text-[#22C55E] text-lg font-bold">£{DEMO_PORTFOLIO_HEALTH.netContributionMtdGbp.toLocaleString()}</span>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[#626770] font-display text-[10px]">FORECAST</span>
              <span className="text-[#38BDF8] text-lg">£{DEMO_PORTFOLIO_HEALTH.forecastGbp.toLocaleString()}</span>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[#626770] font-display text-[10px]">TARGET ATTAINMENT</span>
              <span className="text-[#22C55E] text-lg">{DEMO_PORTFOLIO_HEALTH.targetAttainmentPct.toFixed(1)}% ↑</span>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[#626770] font-display text-[10px]">AUTOPILOT TASKS TODAY</span>
              <span className="text-[#F5F6F7] text-lg">{DEMO_PORTFOLIO_HEALTH.autopilotActionsToday}</span>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[#626770] font-display text-[10px]">APPROVALS</span>
              <span className="text-[#D6A84B] animate-pulse text-lg">{DEMO_PORTFOLIO_HEALTH.pendingApprovals} PENDING</span>
            </div>
          </div>
        </div>

        {/* 2. THE FIVE THINGS THAT MATTER TODAY */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="font-display text-xl text-[#D6A84B]">THE FIVE THINGS THAT MATTER TODAY</h2>
            <p className="font-data text-xs text-[#626770] mt-1">Executive Priority Engine — ranked by Impact × Confidence × Urgency × Strategic Fit ÷ Effort</p>
          </div>
          <div className="flex flex-col gap-3">
            {DEMO_FIVE_THINGS.map(priority => (
              <PriorityCard 
                key={priority.id} 
                priority={priority} 
                isExpanded={expandedId === priority.id}
                onToggleExpand={() => setExpandedId(expandedId === priority.id ? null : priority.id)}
              />
            ))}
          </div>
        </section>

        {/* Grid layout for lower sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 3. PORTFOLIO OVERVIEW */}
          <section className="industrial-panel p-5 flex flex-col gap-4 lg:col-span-1">
            <h3 className="font-display text-sm text-[#F5F6F7] border-b border-white/5 pb-2">PORTFOLIO OVERVIEW</h3>
            <div className="flex flex-col gap-4 font-data text-xs">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[#A2A6AD]">
                  <span>Net Contribution</span>
                  <span className="text-white">{DEMO_PORTFOLIO_HEALTH.targetAttainmentPct.toFixed(1)}% of Target</span>
                </div>
                <div className="h-1.5 bg-[#121418] rounded-full overflow-hidden w-full border border-white/5">
                  <div className="h-full bg-gradient-to-r from-[#22C55E] to-[#38BDF8]" style={{ width: `${DEMO_PORTFOLIO_HEALTH.targetAttainmentPct}%` }} />
                </div>
              </div>
              
              <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                <span className="text-[#626770] font-display text-[10px]">TOP PERFORMER</span>
                <div className="flex items-center gap-2">
                  <span className="text-white">HTT Premium Pack</span>
                  <span className="text-[10px] text-[#D6A84B] border border-[#D6A84B]/30 px-1 rounded">STAR</span>
                  <span className="ml-auto text-[#22C55E]">↑ 14%</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                <span className="text-[#626770] font-display text-[10px]">DISTRIBUTION BREADTH</span>
                <div className="flex items-center gap-2">
                  <span className="text-white">7 Active Marketplaces</span>
                  <span className="ml-auto text-[#38BDF8]">Stable →</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. PENDING APPROVALS QUEUE */}
          <section className="industrial-panel p-5 flex flex-col gap-4 lg:col-span-1">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h3 className="font-display text-sm text-[#F5F6F7]">CEO APPROVAL QUEUE</h3>
              <span className="text-[#D6A84B] font-data text-xs">{DEMO_APPROVALS.length} PENDING</span>
            </div>
            <div className="flex flex-col gap-3">
              {DEMO_APPROVALS.map(approval => (
                <div key={approval.id} className="p-3 bg-[#0D0E11] rounded-lg border border-white/5 flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="text-sm text-white leading-tight">{approval.requestedAction}</div>
                    {approval.deadline && (
                      <div className="font-data text-[9px] text-[#EF4444] shrink-0 border border-[#EF4444]/30 px-1 rounded">
                        DUE TODAY
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-end font-data text-xs text-[#A2A6AD]">
                    <span className="uppercase">{approval.requestingModule}</span>
                    <span className={approval.financialImpactGbp >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}>
                      {approval.financialImpactGbp >= 0 ? '+' : ''}£{Math.abs(approval.financialImpactGbp).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#D6A84B] text-black font-display text-[9px] py-1 rounded">APPROVE</button>
                    <button className="flex-1 bg-[#1C1F24] border border-white/10 text-white font-display text-[9px] py-1 rounded hover:bg-white/5">MODEL FIRST</button>
                    <button className="flex-1 bg-transparent border border-[#EF4444]/30 text-[#EF4444] font-display text-[9px] py-1 rounded hover:bg-[#EF4444]/10">REJECT</button>
                  </div>
                </div>
              ))}
              {DEMO_APPROVALS.length === 0 && (
                <div className="text-center text-[#626770] font-data text-xs py-4">No pending approvals</div>
              )}
            </div>
          </section>

          {/* 5 & 6. COMBINED FEED / LOG */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            {/* AUTOPILOT */}
            <section className="industrial-panel p-5 flex flex-col gap-3">
              <h3 className="font-display text-sm text-[#F5F6F7] border-b border-white/5 pb-2">WHAT THE OS DID TODAY</h3>
              <div className="font-data text-xs flex flex-col gap-2 text-[#A2A6AD]">
                <div className="flex justify-between">
                  <span>Distribution tasks completed</span>
                  <span className="text-white">{DEMO_PORTFOLIO_HEALTH.autopilotActionsToday || 14}</span>
                </div>
                <div className="flex justify-between">
                  <span>Listing quality improvements</span>
                  <span className="text-white">3</span>
                </div>
                <div className="flex justify-between">
                  <span>Pricing guardrail checks passed</span>
                  <span className="text-white">1</span>
                </div>
                <div className="flex justify-between">
                  <span>Intervention threshold violations</span>
                  <span className="text-white">0</span>
                </div>
              </div>
            </section>
            
            {/* INTELLIGENCE FEED */}
            <section className="industrial-panel p-5 flex flex-col gap-3 flex-1">
              <h3 className="font-display text-sm text-[#F5F6F7] border-b border-white/5 pb-2">LIVE INTELLIGENCE FEED</h3>
              <div className="flex flex-col gap-3">
                {DEMO_INSIGHTS.slice(0, 3).map(insight => (
                  <div key={insight.id} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#38BDF8]" />
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="font-data text-xs text-white truncate">{insight.title}</div>
                      <div className="flex items-center gap-2 font-display text-[8px] text-[#626770]">
                        <span className="border border-white/10 px-1 rounded">{insight.category}</span>
                        <span>JUST NOW</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="/executive/intelligence" className="text-center font-display text-[10px] text-[#D6A84B] mt-auto pt-2 hover:text-[#FF6A18] transition-colors">
                VIEW ALL →
              </a>
            </section>
          </div>

        </div>
      </div>
    </ExecutiveShell>
  );
}
