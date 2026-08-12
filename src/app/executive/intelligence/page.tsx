'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';


export default function IntelligenceFeedPage() {
  const pathname = usePathname();



  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'CRITICAL': return 'bg-[#EF4444] shadow-[0_0_8px_#EF4444]';
      case 'IMPORTANT': return 'bg-[#FF6A18]';
      case 'WATCH': return 'bg-[#D6A84B]';
      case 'INFO': return 'bg-[#38BDF8]';
      default: return 'bg-[#626770]';
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    switch (status) {
      case 'NEW': return <span className="text-[9px] font-data px-1.5 py-0.5 bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 rounded">NEW</span>;
      case 'RECOMMENDED': return <span className="text-[9px] font-data px-1.5 py-0.5 bg-[#D6A84B]/10 text-[#D6A84B] border border-[#D6A84B]/30 rounded">RECOMMENDED</span>;
      case 'ACTIONED': return <span className="text-[9px] font-data px-1.5 py-0.5 bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 rounded">ACTIONED</span>;
      case 'WATCHING': return <span className="text-[9px] font-data px-1.5 py-0.5 bg-white/5 text-[#A2A6AD] border border-white/10 rounded">WATCHING</span>;
      default: return null;
    }
  };

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-[#F5F6F7] font-display text-lg font-bold">INTELLIGENCE FEED</h1>
          <p className="text-[#A2A6AD] text-sm">Signal &rarr; Insight &rarr; Recommendation &rarr; Action &rarr; Result &rarr; Learning</p>
        </div>

        <div className="industrial-panel p-4 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-wrap gap-2 text-xs font-display">
            <button className="px-3 py-1.5 bg-[#1C1F24] text-[#F5F6F7] border border-[#D6A84B]/50 rounded">ALL</button>
            <button className="px-3 py-1.5 bg-[#121418] text-[#A2A6AD] hover:bg-[#1C1F24] border border-white/5 rounded">PERFORMANCE</button>
            <button className="px-3 py-1.5 bg-[#121418] text-[#A2A6AD] hover:bg-[#1C1F24] border border-white/5 rounded">OPPORTUNITY</button>
            <button className="px-3 py-1.5 bg-[#121418] text-[#A2A6AD] hover:bg-[#1C1F24] border border-white/5 rounded">RISK</button>
            <button className="px-3 py-1.5 bg-[#121418] text-[#A2A6AD] hover:bg-[#1C1F24] border border-white/5 rounded">ANOMALY</button>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] font-display items-center">
            <span className="text-[#626770] mr-2">SEVERITY:</span>
            <button className="px-2 py-1 text-[#F5F6F7] bg-white/10 rounded">ALL</button>
            <button className="px-2 py-1 text-[#EF4444] hover:bg-white/5 rounded">CRITICAL</button>
            <button className="px-2 py-1 text-[#FF6A18] hover:bg-white/5 rounded">IMPORTANT</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="industrial-panel p-6 text-center border-dashed border-2 border-white/10">
              <h3 className="text-[#D6A84B] font-display text-sm font-bold mb-2">NO DATA CONNECTED</h3>
              <p className="text-[#A2A6AD] text-sm">This module requires an active database connection or platform integration to display real data. Fake data is prohibited.</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="industrial-panel p-5 sticky top-20">
              <h3 className="text-[#F5F6F7] font-display text-sm mb-4">SIGNAL TO INSIGHT LINEAGE</h3>
              
              <div className="industrial-panel p-6 text-center border-dashed border-2 border-white/10 mt-6">
                <h3 className="text-[#D6A84B] font-display text-sm font-bold mb-2">NO DATA CONNECTED</h3>
                <p className="text-[#A2A6AD] text-sm">This module requires an active database connection or platform integration to display real data. Fake data is prohibited.</p>
              </div>
              
              <p className="text-[10px] text-[#626770] mt-6 italic">
                OS automatically clusters raw signals into actionable insights to prevent alert fatigue.
              </p>
            </div>
          </div>
        </div>

      </div>
    </ExecutiveShell>
  );
}
