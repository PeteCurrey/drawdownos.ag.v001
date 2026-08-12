'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { DEMO_OPPORTUNITIES } from '@/lib/executive/demo-executive-data';

export default function OpportunitiesPage() {
  const pathname = usePathname();

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[#F5F6F7] font-display text-lg font-bold">OPPORTUNITY ENGINE</h1>
            <p className="text-[#A2A6AD] text-sm">Every commercial opportunity, scored and ranked.</p>
          </div>
          
          <div className="flex flex-wrap gap-2 text-xs font-display">
            <button className="px-3 py-1.5 bg-[#D6A84B] text-[#0A0B0D] font-bold rounded">BIGGEST UPSIDE</button>
            <button className="px-3 py-1.5 bg-[#17191E] text-[#A2A6AD] hover:bg-[#1C1F24] border border-white/10 rounded">FASTEST RETURN</button>
            <button className="px-3 py-1.5 bg-[#17191E] text-[#A2A6AD] hover:bg-[#1C1F24] border border-white/10 rounded">LOWEST EFFORT</button>
            <button className="px-3 py-1.5 bg-[#17191E] text-[#A2A6AD] hover:bg-[#1C1F24] border border-white/10 rounded">BEST RISK-ADJUSTED</button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {DEMO_OPPORTUNITIES.map((opp) => (
            <div key={opp.id} className="industrial-panel p-5 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute top-0 right-0 bg-[#D6A84B]/10 border-b border-l border-[#D6A84B]/30 px-3 py-2 rounded-bl-lg">
                <div className="text-center">
                  <div className="text-[10px] text-[#D6A84B] font-display leading-none mb-1">SCORE</div>
                  <div className="text-xl font-data text-[#D6A84B] font-bold leading-none">{opp.opportunityScore}</div>
                </div>
              </div>
              
              <div className="pr-16">
                <span className="inline-block text-[10px] font-data px-2 py-0.5 rounded border border-white/10 bg-[#1C1F24] text-[#A2A6AD] mb-2">
                  {opp.category}
                </span>
                <h3 className="text-[#F5F6F7] font-bold text-base mb-2">{opp.title}</h3>
                <p className="text-[#A2A6AD] text-sm mb-4 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                  {opp.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4 text-xs font-data border-y border-white/5 py-3">
                <div>
                  <span className="text-[#626770] block mb-1">Annual Value</span>
                  <span className="text-[#22C55E]">£{opp.estimatedAnnualValueGbp.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[#626770] block mb-1">30-Day Value</span>
                  <span className="text-[#38BDF8]">£{opp.expected30DayGbp.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[#626770] block mb-1">90-Day Value</span>
                  <span className="text-[#D6A84B]">£{opp.expected90DayGbp.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#626770]">Cost to Implement</span>
                    <span className="font-data text-[#F5F6F7]">£{opp.implementationCostGbp.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#626770]">Effort</span>
                    <span className="font-data text-[#F5F6F7]">{opp.effortHours} hrs</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#626770]">Time to Revenue</span>
                    <span className="font-data text-[#F5F6F7]">{opp.timeToFirstRevenueDays} days</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#626770]">Success Prob.</span>
                    <span className="font-data text-[#F5F6F7]">{opp.successProbabilityPct}%</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#1C1F24] border border-white/5 text-[#A2A6AD]">
                  Scale: {opp.scalability}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#1C1F24] border border-white/5 text-[#A2A6AD]">
                  Auto: {opp.automationPotential}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#1C1F24] border border-white/5 text-[#A2A6AD]">
                  Reversible: {opp.reversibility}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8]">
                  {opp.confidence} CONFIDENCE
                </span>
              </div>

              <p className="text-[10px] text-[#626770] italic mb-4">
                Note: {opp.downside}
              </p>

              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold rounded transition-colors">
                  ACTIVATE &rarr;
                </button>
                <button className="flex-1 py-2 bg-[#1C1F24] hover:bg-white/5 border border-white/10 text-[#F5F6F7] font-display text-xs font-bold rounded transition-colors">
                  MODEL FIRST
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ExecutiveShell>
  );
}
