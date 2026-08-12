'use client';

import React from 'react';
import OptimiseShell from '@/components/optimise/OptimiseShell';

export default function RolloutsPage() {
  return (
    <OptimiseShell header="ROLLOUT ENGINE" description="Phased rollout plans & post-rollout monitoring.">
      <div className="space-y-6">
        
        {/* Active Rollout Tracker */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-[#F5F6F7] text-lg font-bold tracking-[0.08em]">ACTIVE ROLLOUT TRACKER</h2>
            <span className="font-data text-xs px-2 py-1 bg-[#0A0B0D] text-[#A2A6AD] border border-white/10 rounded">EXP-001 ROLLOUT</span>
          </div>
          
          <div className="mb-6 p-4 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-lg flex items-start gap-3">
            <div className="mt-0.5 w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E]"></div>
            <div>
              <div className="font-display text-sm text-[#F5F6F7] tracking-wider mb-1">WINNER: £34 PRICING ON GUMROAD UK</div>
              <div className="font-data text-[#22C55E] text-sm">+11.4% Contribution Margin</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center font-data text-sm border border-[#22C55E]/30">1</div>
              <div className="flex-1">
                <div className="font-display text-sm text-[#F5F6F7]">PHASE 1: GUMROAD UK</div>
                <div className="font-data text-xs text-[#A2A6AD]">100% Complete - 2 Aug</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#D6A84B]/20 text-[#D6A84B] flex items-center justify-center font-data text-sm border border-[#D6A84B]/30 animate-pulse">2</div>
              <div className="flex-1">
                <div className="font-display text-sm text-[#F5F6F7]">PHASE 2: PAYHIP UK</div>
                <div className="font-data text-xs text-[#D6A84B]">Scheduled - In Progress</div>
              </div>
            </div>

            <div className="flex items-center gap-4 opacity-50">
              <div className="w-8 h-8 rounded-full bg-[#1C1F24] text-[#A2A6AD] flex items-center justify-center font-data text-sm border border-white/10">3</div>
              <div className="flex-1">
                <div className="font-display text-sm text-[#F5F6F7]">PHASE 3: DIRECT UK</div>
                <div className="font-data text-xs text-[#A2A6AD]">Planned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Rollout Monitoring */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6">
          <h2 className="font-display text-[#F5F6F7] text-lg font-bold tracking-[0.08em] mb-6">POST-ROLLOUT MONITORING</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#0A0B0D] p-4 rounded-lg border border-white/5">
              <div className="font-display text-xs text-[#A2A6AD] tracking-widest mb-2">7-DAY CHECK</div>
              <div className="font-data text-sm mb-1 text-[#F5F6F7]">Expected: <span className="text-[#A2A6AD]">£420/day</span></div>
              <div className="font-data text-sm mb-3 text-[#F5F6F7]">Observed: <span className="text-[#F5F6F7]">£445/day</span> <span className="text-[#22C55E]">(+5.9% variance)</span></div>
              <div className="inline-block px-2 py-0.5 bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 rounded text-xs font-display">ON TRACK</div>
            </div>
            
            <div className="bg-[#0A0B0D] p-4 rounded-lg border border-white/5">
              <div className="font-display text-xs text-[#A2A6AD] tracking-widest mb-2">30-DAY CHECK</div>
              <div className="font-data text-sm text-[#F5F6F7] mb-3">Pending</div>
              <div className="inline-block px-2 py-0.5 bg-[#D6A84B]/10 text-[#D6A84B] border border-[#D6A84B]/30 rounded text-xs font-display">DAY 11 OF 30</div>
            </div>
          </div>

          <div className="p-4 bg-[#EF4444]/5 border border-[#EF4444]/20 rounded-lg">
            <div className="font-display text-sm text-[#EF4444] tracking-wider mb-1">AUTO-REVERT GUARDRAIL</div>
            <div className="font-data text-[#A2A6AD] text-sm">System will automatically revert to control if performance deteriorates by <span className="text-[#F5F6F7]">-10%</span> or more.</div>
          </div>
        </div>

      </div>
    </OptimiseShell>
  );
}
