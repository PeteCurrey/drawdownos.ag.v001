'use client';

import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { AlertCircle, Server } from 'lucide-react';
import Link from 'next/link';

export default function TodayPage() {
  const pathname = usePathname();
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-8 pb-12">
        <div className="border-b border-white/10 pb-6">
          <div className="font-data text-xs text-[#A2A6AD]">{today}</div>
          <h1 className="font-display text-2xl text-[#F5F6F7] mt-1">TODAY&apos;S EXECUTIVE BRIEF</h1>
          <p className="font-data text-xs text-[#626770] mt-1">Daily briefing — generated from real data only</p>
        </div>

        {/* DAILY BRIEF */}
        <section>
          <h2 className="font-display text-sm text-[#D6A84B] mb-4">DAILY BRIEF</h2>
          <div className="industrial-panel p-8 flex flex-col items-center text-center gap-4">
            <AlertCircle className="w-8 h-8 text-[#D6A84B]/60" />
            <div className="font-display text-sm text-[#A2A6AD]">NO BRIEFING DATA AVAILABLE</div>
            <p className="font-data text-xs text-[#626770] max-w-md">
              Daily briefings are generated from real trading activity. Connect a marketplace to generate your first briefing.
            </p>
          </div>
        </section>

        {/* TOP OPPORTUNITIES */}
        <section>
          <h2 className="font-display text-sm text-[#38BDF8] mb-4">TOP OPPORTUNITIES TODAY</h2>
          <div className="industrial-panel p-6 text-center text-[#626770] font-data text-xs">
            No opportunities generated. Opportunities require live marketplace signals.
          </div>
        </section>

        {/* TOP RISKS */}
        <section>
          <h2 className="font-display text-sm text-[#EF4444] mb-4">RISKS TO MONITOR</h2>
          <div className="industrial-panel p-6 text-center text-[#626770] font-data text-xs">
            No risk signals active.
          </div>
        </section>

        {/* APPROVAL QUEUE */}
        <section>
          <h2 className="font-display text-sm text-[#F5F6F7] mb-4">PENDING APPROVALS</h2>
          <div className="industrial-panel p-6 text-center text-[#626770] font-data text-xs">
            0 pending approvals.
          </div>
        </section>

        {/* FORECAST SUMMARY */}
        <section>
          <h2 className="font-display text-sm text-[#F5F6F7] mb-4">30-DAY FORECAST</h2>
          <div className="industrial-panel p-6 text-center">
            <div className="font-data text-[#A2A6AD] text-sm">INSUFFICIENT HISTORY</div>
            <div className="font-data text-xs text-[#626770] mt-2">
              A 30-day forecast requires at least 30 days of real trading history.
            </div>
          </div>
        </section>

        <div className="flex gap-3 pt-4 border-t border-white/10">
          <Link href="/integrations" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D6A84B] text-[#0A0B0D] font-display text-xs font-bold hover:bg-[#e2b558] transition-colors">
            <Server className="w-3.5 h-3.5" /> CONNECT MARKETPLACE
          </Link>
        </div>
      </div>
    </ExecutiveShell>
  );
}
