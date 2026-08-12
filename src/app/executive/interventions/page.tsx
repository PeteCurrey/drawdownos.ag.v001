'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';


export default function InterventionsPage() {
  const pathname = usePathname();

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
      case 1: return 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30';
      case 2: return 'bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30';
      case 3: return 'bg-[#F97316]/10 text-[#F97316] border-[#F97316]/30';
      case 4: return 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30';
      case 5: return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6">
        <div>
          <h1 className="text-[#F5F6F7] font-display text-lg font-bold">INTERVENTION SYSTEM</h1>
          <p className="text-[#A2A6AD] text-sm">Configurable thresholds. Automatic detection. Classified response.</p>
        </div>

        <div className="industrial-panel p-4 flex flex-wrap gap-2 text-[10px] font-display">
          <span className="px-2 py-1 rounded border bg-gray-500/10 text-gray-400 border-gray-500/30">0=OBSERVE</span>
          <span className="px-2 py-1 rounded border bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30">1=WATCH</span>
          <span className="px-2 py-1 rounded border bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30">2=RECOMMEND</span>
          <span className="px-2 py-1 rounded border bg-[#F97316]/10 text-[#F97316] border-[#F97316]/30">3=REQUEST APPROVAL</span>
          <span className="px-2 py-1 rounded border bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30">4=AUTONOMOUS</span>
          <span className="px-2 py-1 rounded border bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30">5=EMERGENCY STOP</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-[#F5F6F7] font-display text-sm">ACTIVE TRIGGERS</h2>
          
          <div className="industrial-panel p-6 text-center border-dashed border-2 border-white/10 mt-6">
            <h3 className="text-[#D6A84B] font-display text-sm font-bold mb-2">NO DATA CONNECTED</h3>
            <p className="text-[#A2A6AD] text-sm">This module requires an active database connection or platform integration to display real data. Fake data is prohibited.</p>
          </div>
        </div>

        <div className="industrial-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#F5F6F7] font-display text-sm">INTERVENTION RULES</h2>
            <button className="px-4 py-2 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold rounded transition-colors">
              ADD RULE
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-[#626770] font-display text-xs border-b border-white/10">
                <tr>
                  <th className="py-3 px-2">RULE NAME</th>
                  <th className="py-3 px-2">METRIC</th>
                  <th className="py-3 px-2">THRESHOLD</th>
                  <th className="py-3 px-2">LEVEL</th>
                  <th className="py-3 px-2 text-center">ACTIVE</th>
                </tr>
              </thead>
              <tbody className="text-[#A2A6AD] font-data">
                <tr>
                  <td colSpan={5} className="py-8 px-2 text-center">
                    <div className="text-[#D6A84B] font-display text-sm font-bold mb-2">NO DATA CONNECTED</div>
                    <p className="text-[#A2A6AD] text-sm font-sans">This module requires an active database connection or platform integration to display real data. Fake data is prohibited.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-[#A2A6AD] font-display text-xs mb-3">INTERVENTION HISTORY</h2>
          <div className="bg-[#1C1F24] border border-white/10 p-4 rounded text-sm text-[#626770] italic">
            No recent intervention history. Current intervention is first recorded.
          </div>
        </div>

      </div>
    </ExecutiveShell>
  );
}
