'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';


export default function RisksPage() {
  const pathname = usePathname();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30';
      case 'ESCALATED': return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30';
      case 'MITIGATED': return 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30';
      default: return 'bg-[#1C1F24] text-[#A2A6AD] border-white/10';
    }
  };

  const getVelocityColor = (velocity: string) => {
    switch (velocity) {
      case 'FAST': case 'IMMEDIATE': return 'text-[#EF4444]';
      case 'MEDIUM': return 'text-[#D6A84B]';
      case 'SLOW': return 'text-[#38BDF8]';
      default: return 'text-[#A2A6AD]';
    }
  };

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6">
        <div>
          <h1 className="text-[#F5F6F7] font-display text-lg font-bold">RISK REGISTER</h1>
          <p className="text-[#A2A6AD] text-sm">Material risks tracked, classified, and mitigated.</p>
        </div>

          <div className="col-span-full">
            <div className="industrial-panel p-6 text-center border-dashed border-2 border-white/10">
              <h3 className="text-[#D6A84B] font-display text-sm font-bold mb-2">NO DATA CONNECTED</h3>
              <p className="text-[#A2A6AD] text-sm">This module requires an active database connection or platform integration to display real data. Fake data is prohibited.</p>
            </div>
          </div>
      </div>
    </ExecutiveShell>
  );
}
