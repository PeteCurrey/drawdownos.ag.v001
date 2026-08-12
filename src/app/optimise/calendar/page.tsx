'use client';

import React from 'react';
import OptimiseShell from '@/components/optimise/OptimiseShell';

export default function CalendarPage() {
  return (
    <OptimiseShell header="EXPERIMENT CALENDAR" description="Testing schedule, blackout periods & seasonal windows.">
      <div className="space-y-6">
        
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-[#F5F6F7] text-lg font-bold tracking-[0.08em]">AUGUST 2026</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 font-display text-xs bg-[#1C1F24] border border-white/10 rounded text-[#A2A6AD]">PREV</button>
              <button className="px-3 py-1 font-display text-xs bg-[#1C1F24] border border-white/10 rounded text-[#F5F6F7]">NEXT</button>
            </div>
          </div>

          <div className="space-y-3">
            
            {/* Completed Event */}
            <div className="flex items-stretch bg-[#0A0B0D] rounded-lg border border-white/5 overflow-hidden">
              <div className="w-2 bg-[#22C55E]"></div>
              <div className="flex-1 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-display text-sm text-[#F5F6F7] mb-1">EXP-001 (PRICING)</div>
                  <div className="font-data text-xs text-[#A2A6AD]">16 Jul - 1 Aug</div>
                </div>
                <span className="inline-block px-2 py-1 bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-display rounded border border-[#22C55E]/30">COMPLETED</span>
              </div>
            </div>

            {/* Running Event */}
            <div className="flex items-stretch bg-[#0A0B0D] rounded-lg border border-white/5 overflow-hidden">
              <div className="w-2 bg-[#D6A84B] animate-pulse"></div>
              <div className="flex-1 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-display text-sm text-[#F5F6F7] mb-1">EXP-003 (PAYHIP LAUNCH)</div>
                  <div className="font-data text-xs text-[#A2A6AD]">5 Aug - 4 Sep</div>
                </div>
                <span className="inline-block px-2 py-1 bg-[#D6A84B]/10 text-[#D6A84B] text-[10px] font-display rounded border border-[#D6A84B]/30">RUNNING</span>
              </div>
            </div>

            {/* Blackout Window */}
            <div className="flex items-stretch bg-[#0A0B0D] rounded-lg border border-[#EF4444]/20 overflow-hidden relative">
              {/* Hatch pattern overlay for blackout */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #EF4444 25%, transparent 25%, transparent 75%, #EF4444 75%, #EF4444), repeating-linear-gradient(45deg, #EF4444 25%, #0A0B0D 25%, #0A0B0D 75%, #EF4444 75%, #EF4444)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
              <div className="w-2 bg-[#EF4444] z-10"></div>
              <div className="flex-1 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
                <div>
                  <div className="font-display text-sm text-[#EF4444] mb-1">BLACKOUT WINDOW: BANK HOLIDAY</div>
                  <div className="font-data text-xs text-[#A2A6AD]">28 Aug - 31 Aug &middot; No pricing tests permitted during promotional window.</div>
                </div>
                <span className="inline-block px-2 py-1 bg-[#EF4444]/10 text-[#EF4444] text-[10px] font-display rounded border border-[#EF4444]/30">SYSTEM LOCKED</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </OptimiseShell>
  );
}
