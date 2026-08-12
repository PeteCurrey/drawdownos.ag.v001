'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';

import { Brain } from 'lucide-react';

export default function AnalystPage() {
  const pathname = usePathname();

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#818CF8]/10 border border-[#818CF8]/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-6 h-6 text-[#818CF8]" />
          </div>
          <h1 className="text-[#F5F6F7] font-display text-2xl font-bold mb-2">AI EXECUTIVE ANALYST</h1>
          <p className="text-[#A2A6AD] text-sm">Ask anything about the business. Get structured answers backed by OS data.</p>
        </div>

        <div className="relative">
          <textarea 
            className="w-full bg-[#121418] border border-white/20 rounded-xl p-4 text-[#F5F6F7] placeholder-[#626770] focus:outline-none focus:border-[#818CF8] min-h-[100px] resize-none text-lg"
            placeholder="Ask the Executive Analyst..."
            defaultValue="Where can we generate another £5,000 next month?"
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button className="px-4 py-2 bg-transparent text-[#A2A6AD] hover:text-[#F5F6F7] font-display text-xs font-bold rounded transition-colors">
              CLEAR
            </button>
            <button className="px-6 py-2 bg-[#D6A84B] text-[#0A0B0D] hover:bg-[#e2b558] font-display text-xs font-bold rounded shadow-md transition-colors">
              SUBMIT
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <div className="p-2 text-left bg-white/5 rounded text-xs text-[#626770]">
            Connect queries database to view past questions.
          </div>
        </div>

        <div className="industrial-panel p-6 text-center border-dashed border-2 border-white/10">
          <h3 className="text-[#D6A84B] font-display text-sm font-bold mb-2">NO DATA CONNECTED</h3>
          <p className="text-[#A2A6AD] text-sm">This module requires an active database connection or platform integration to display real data. Fake data is prohibited.</p>
        </div>

      </div>
    </ExecutiveShell>
  );
}
