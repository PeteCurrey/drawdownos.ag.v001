'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';


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
          <div className="col-span-full">
            <div className="industrial-panel p-6 text-center border-dashed border-2 border-white/10 mt-6">
              <h3 className="text-[#D6A84B] font-display text-sm font-bold mb-2">NO DATA CONNECTED</h3>
              <p className="text-[#A2A6AD] text-sm">This module requires an active database connection or platform integration to display real data. Fake data is prohibited.</p>
            </div>
          </div>
        </div>
      </div>
    </ExecutiveShell>
  );
}
