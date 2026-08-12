'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PortfolioPage() {
  const pathname = usePathname();

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6">
        <div>
          <h1 className="text-[#F5F6F7] font-display text-lg font-bold">PORTFOLIO INTELLIGENCE — Investment View</h1>
          <p className="text-[#A2A6AD] text-sm font-data">The portfolio treated as an asset mix, not a task list.</p>
        </div>

        <div className="industrial-panel p-10 flex flex-col items-center justify-center text-center gap-4">
          <AlertCircle className="w-10 h-10 text-[#D6A84B]/60" />
          <div className="font-display text-base text-[#A2A6AD]">NO PORTFOLIO DATA</div>
          <p className="text-[13px] font-data text-[#626770] max-w-lg">
            Portfolio intelligence requires real catalog publications with verified sales records.
            Ingest at least one publication and connect a marketplace to generate portfolio classification metrics.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link href="/factory" className="px-4 py-2 rounded-lg bg-[#D6A84B] text-[#0A0B0D] font-display text-xs font-bold hover:bg-[#e2b558] transition-colors">
              GO TO PRODUCT FACTORY
            </Link>
            <Link href="/integrations" className="px-4 py-2 rounded-lg bg-[#1C1F24] text-[#A2A6AD] font-display text-xs border border-white/10 hover:bg-white/5 transition-colors">
              CONNECT MARKETPLACE
            </Link>
          </div>
        </div>

        {/* PRODUCT PORTFOLIO — empty state */}
        <div className="industrial-panel p-6">
          <h2 className="text-[#F5F6F7] font-display text-sm mb-4">PRODUCT PORTFOLIO</h2>
          <div className="text-center text-[#626770] font-data text-xs py-6">
            No catalog products. Ingest a publication to begin.
          </div>
        </div>

        {/* MARKETPLACE PORTFOLIO — empty state */}
        <div className="industrial-panel p-6">
          <h2 className="text-[#F5F6F7] font-display text-sm mb-4">MARKETPLACE PORTFOLIO</h2>
          <div className="text-center text-[#626770] font-data text-xs py-6">
            No configured marketplace connectors.
          </div>
        </div>
      </div>
    </ExecutiveShell>
  );
}
