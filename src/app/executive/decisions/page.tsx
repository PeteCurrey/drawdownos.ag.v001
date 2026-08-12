'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';


export default function DecisionsPage() {
  const pathname = usePathname();

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'POSITIVE': return 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30';
      case 'NEGATIVE': return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30';
      case 'PENDING': return 'bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30';
      default: return 'bg-[#1C1F24] text-[#A2A6AD] border-white/10';
    }
  };

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[#F5F6F7] font-display text-lg font-bold">DECISION REGISTER — Commercial Learning System</h1>
            <p className="text-[#A2A6AD] text-sm">Every material decision tracked. Expected vs actual. Forecast accuracy improving over time.</p>
          </div>
          <button className="px-4 py-2 bg-[#D6A84B] text-[#0A0B0D] font-display text-xs font-bold rounded shadow-md hover:bg-[#e2b558] transition-colors">
            NEW DECISION
          </button>
        </div>

        <div className="industrial-panel p-4 flex gap-6 text-sm overflow-x-auto whitespace-nowrap">
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">DECISIONS TRACKED</span>
            <span className="text-[#F5F6F7] font-data text-lg">—</span>
          </div>
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">POSITIVE OUTCOMES</span>
            <span className="text-[#22C55E] font-data text-lg">—</span>
          </div>
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">FORECAST ACCURACY</span>
            <span className="text-[#38BDF8] font-data text-lg">—</span>
          </div>
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">CEO APPROVAL RATE</span>
            <span className="text-[#D6A84B] font-data text-lg">—</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="industrial-panel p-6 text-center border-dashed border-2 border-white/10">
              <h3 className="text-[#D6A84B] font-display text-sm font-bold mb-2">NO DATA CONNECTED</h3>
              <p className="text-[#A2A6AD] text-sm">This module requires an active database connection or platform integration to display real data. Fake data is prohibited.</p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="industrial-panel p-5">
              <h3 className="text-[#F5F6F7] font-display text-sm mb-4">DECISION QUALITY</h3>
              
              <div className="industrial-panel p-6 text-center border-dashed border-2 border-white/10">
                <h3 className="text-[#D6A84B] font-display text-sm font-bold mb-2">NO DATA CONNECTED</h3>
                <p className="text-[#A2A6AD] text-sm">This module requires an active database connection or platform integration to display real data. Fake data is prohibited.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExecutiveShell>
  );
}
