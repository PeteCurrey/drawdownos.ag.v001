'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function ObjectiveCockpitPage({ params }: { params: Promise<{ id: string }> }) {
  const pathname = usePathname();
  const { id } = React.use(params);

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* Breadcrumb */}
        <div className="text-xs font-display text-white/40 flex items-center gap-2">
          <Link href="/executive" className="hover:text-white transition-colors">EXECUTIVE</Link>
          <span>/</span>
          <Link href="/executive/objectives" className="hover:text-white transition-colors">OBJECTIVES</Link>
          <span>/</span>
          <span className="text-white/70">{id}</span>
        </div>

        <header className="space-y-2 pb-6 border-b border-white/10">
          <h1 className="text-2xl font-medium text-white">OBJECTIVE COCKPIT</h1>
          <p className="font-data text-xs text-[#626770]">Objective ID: {id}</p>
        </header>

        <div className="industrial-panel p-10 flex flex-col items-center justify-center text-center gap-4">
          <AlertCircle className="w-10 h-10 text-[#D6A84B]/60" />
          <div className="font-display text-base text-[#A2A6AD]">NO OBJECTIVE DATA</div>
          <p className="text-[13px] font-data text-[#626770] max-w-lg">
            Objectives are generated from real business targets, live marketplace data and verified performance records.
            This objective cockpit will populate once the system has sufficient data to generate a credible strategy.
            Fake objectives are prohibited.
          </p>
          <Link href="/executive/objectives" className="mt-2 px-4 py-2 rounded-lg bg-[#1C1F24] text-[#A2A6AD] font-display text-xs border border-white/10 hover:bg-white/5 transition-colors">
            ← BACK TO OBJECTIVES
          </Link>
        </div>
      </div>
    </ExecutiveShell>
  );
}
