'use client';

import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';

import Link from 'next/link';

export default function ObjectivesPage() {
  const pathname = usePathname();

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* Header */}
        <header className="space-y-2 pb-4">
          <h1 className="text-3xl font-display text-white">OBJECTIVE ENGINE</h1>
          <p className="text-white/50 font-data text-sm">Issue natural-language objectives. The OS converts them into strategy.</p>
        </header>

        {/* ISSUE NEW OBJECTIVE */}
        <div className="industrial-panel p-6 space-y-6">
          <h2 className="text-sm font-display text-[#D6A84B]">ISSUE NEW OBJECTIVE</h2>
          <textarea 
            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white font-data text-sm focus:outline-none focus:border-[#D6A84B]/50 transition-colors"
            rows={4}
            placeholder="State your objective in plain English..."
            defaultValue="Maximise net contribution from How to Trade over 90 days without increasing refund rate"
          />
          
          <div className="space-y-3">
            <div className="text-xs font-display text-white/30">EXAMPLES</div>
            <div className="flex flex-wrap gap-2">
              {[
                'Grow US revenue by 30% without spending more than £1,000 on paid acquisition',
                'Generate £10,000 in monthly revenue from the current PDF catalogue',
                'Find the best five new marketplaces for How to Trade and launch controlled tests'
              ].map((ex, i) => (
                <button key={i} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-xs text-white/70 transition-colors border border-white/5">
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-white/10 pt-6">
            <div className="text-xs text-white/40 max-w-md">
              The Objective Engine will parse your request, generate a strategy tree, and highlight potential constraints or risks before execution.
            </div>
            <button className="px-6 py-2 bg-[#D6A84B] hover:bg-[#D6A84B]/90 text-black font-display text-sm rounded transition-colors">
              PARSE OBJECTIVE →
            </button>
          </div>
        </div>

        {/* OBJECTIVE PARSER PREVIEW */}
        <div className="industrial-panel border border-[#38BDF8]/30 p-6 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#38BDF8]/20 text-[#38BDF8] text-[10px] font-display rounded-bl-lg">
            PREVIEW
          </div>
          <h2 className="text-sm font-display text-white/70">PARSED INTERPRETATION <span className="text-white/40 font-data normal-case ml-2">— Review before generating strategy</span></h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-[10px] font-display text-white/50">GOAL</div>
              <div className="text-sm text-white">Maximise Net Contribution</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-display text-white/50">TARGET METRIC</div>
              <div className="text-sm text-white">£ Net Contribution</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-display text-white/50">SCOPE</div>
              <div className="text-sm text-[#38BDF8]">Product: How to Trade</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-display text-white/50">TIME HORIZON</div>
              <div className="text-sm text-white">90 Days</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-display text-white/50">CONSTRAINTS</div>
              <div className="text-sm text-[#EF4444]">Refund Rate ≤ Current (2.1%)</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-display text-white/50">RISK TOLERANCE</div>
              <div className="text-sm text-white">Moderate</div>
            </div>
            <div className="space-y-1 md:col-span-2">
              <div className="text-[10px] font-display text-white/50">AVAILABLE LEVERS</div>
              <div className="text-sm text-white/70">Price Optimization, Marketplace Expansion, Bundle Creation</div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button className="px-6 py-2 bg-[#38BDF8]/20 hover:bg-[#38BDF8]/30 text-[#38BDF8] border border-[#38BDF8]/50 font-display text-sm rounded transition-colors">
              GENERATE STRATEGY →
            </button>
          </div>
        </div>

        {/* ACTIVE OBJECTIVES */}
        <div className="space-y-4">
          <h2 className="text-sm font-display text-white/50 pl-1">ACTIVE OBJECTIVES</h2>
          <div className="grid grid-cols-1 gap-4">
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
