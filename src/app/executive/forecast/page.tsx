'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';


export default function ForecastPage() {
  const pathname = usePathname();


  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6">
        <div>
          <h1 className="text-[#F5F6F7] font-display text-lg font-bold">EXECUTIVE FORECAST</h1>
          <p className="text-[#A2A6AD] text-sm">Revenue and contribution projections with driver attribution.</p>
        </div>

        <div className="flex border-b border-white/10 font-display text-xs">
          <button className="px-4 py-3 text-[#626770] hover:text-[#A2A6AD]">7 DAYS</button>
          <button className="px-4 py-3 text-[#D6A84B] border-b-2 border-[#D6A84B]">30 DAYS</button>
          <button className="px-4 py-3 text-[#626770] hover:text-[#A2A6AD]">90 DAYS</button>
          <button className="px-4 py-3 text-[#626770] hover:text-[#A2A6AD] flex items-center gap-1">
            12 MONTHS <span className="text-[9px] bg-[#EF4444]/20 text-[#EF4444] px-1 rounded">LOW CONF</span>
          </button>
        </div>

        <div className="industrial-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#F5F6F7] font-display text-sm">30-DAY FORECAST</h2>
            <span className="text-[10px] font-data px-2 py-0.5 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
              MODERATE CONFIDENCE
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="p-3 bg-[#1C1F24] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] uppercase block mb-1">Gross Rev</span>
              <span className="text-[#F5F6F7] font-data font-bold">—</span>
            </div>
            <div className="p-3 bg-[#1C1F24] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] uppercase block mb-1">Net Rev</span>
              <span className="text-[#38BDF8] font-data font-bold">—</span>
            </div>
            <div className="p-3 bg-[#1C1F24] rounded border border-[#D6A84B]/30 bg-[#D6A84B]/5">
              <span className="text-[#D6A84B] text-[10px] uppercase block mb-1">Contribution</span>
              <span className="text-[#D6A84B] font-data font-bold text-lg">—</span>
            </div>
            <div className="p-3 bg-[#1C1F24] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] uppercase block mb-1">Orders</span>
              <span className="text-[#F5F6F7] font-data font-bold">—</span>
            </div>
            <div className="p-3 bg-[#1C1F24] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] uppercase block mb-1">AOV</span>
              <span className="text-[#F5F6F7] font-data font-bold">—</span>
            </div>
            <div className="p-3 bg-[#1C1F24] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] uppercase block mb-1">Refunds</span>
              <span className="text-[#EF4444] font-data font-bold">—</span>
            </div>
          </div>

          <div className="industrial-panel p-6 text-center border-dashed border-2 border-white/10">
            <h3 className="text-[#D6A84B] font-display text-sm font-bold mb-2">NO DATA CONNECTED</h3>
            <p className="text-[#A2A6AD] text-sm">This module requires an active database connection or platform integration to display real data. Fake data is prohibited.</p>
          </div>
        </div>
      </div>
    </ExecutiveShell>
  );
}
