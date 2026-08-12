'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { AlertCircle, Server } from 'lucide-react';
import Link from 'next/link';

export default function ScenariosPage() {
  const pathname = usePathname();

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6">
        <div>
          <h1 className="text-[#F5F6F7] font-display text-lg font-bold">STRATEGIC SCENARIO MODELLER — What If Analysis</h1>
          <p className="text-[#A2A6AD] text-sm font-data">Model decisions before implementation. Compare cases. Save scenarios.</p>
        </div>

        <div className="industrial-panel p-10 flex flex-col items-center justify-center text-center gap-4">
          <AlertCircle className="w-10 h-10 text-[#D6A84B]/60" />
          <div className="font-display text-base text-[#A2A6AD]">NO SCENARIO DATA</div>
          <p className="text-[13px] font-data text-[#626770] max-w-lg">
            Strategic scenarios require real historical trading baselines and active connector data.
            Simulations cannot be run without underlying factual metrics.
          </p>
          <Link href="/integrations" className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D6A84B] text-[#0A0B0D] font-display text-xs font-bold hover:bg-[#e2b558] transition-colors">
            <Server className="w-3.5 h-3.5" /> CONNECT MARKETPLACE
          </Link>
        </div>

        <div className="industrial-panel p-6">
          <h2 className="text-[#D6A84B] font-display text-sm mb-4">SAVED SCENARIOS</h2>
          <div className="text-center text-[#626770] font-data text-xs py-6">
            0 saved scenarios.
          </div>
        </div>
      </div>
    </ExecutiveShell>
  );
}
