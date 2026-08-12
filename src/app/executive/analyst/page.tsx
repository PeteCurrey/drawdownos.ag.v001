'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { DEMO_ANALYST_QUERIES } from '@/lib/executive/demo-executive-data';
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
          {DEMO_ANALYST_QUERIES.map((q) => (
            <button key={q.id} className="p-2 text-left bg-white/5 hover:bg-white/10 rounded text-xs text-[#A2A6AD] hover:text-[#F5F6F7]">
              {q.question}
            </button>
          ))}
        </div>

        {/* Demo Response Panel */}
        <div className="industrial-panel-elevated p-6 border-t-4 border-t-[#818CF8] bg-gradient-to-b from-[#818CF8]/5 to-transparent">
          <div className="space-y-6">
            
            <div className="space-y-2">
              <h3 className="text-[#818CF8] font-display text-xs font-bold tracking-widest">ANSWER</h3>
              <p className="text-[#F5F6F7] text-lg leading-relaxed">
                Three high-confidence opportunities can collectively generate £4,820–£6,140 of additional contribution within 30 days.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-[#A2A6AD] font-display text-xs font-bold tracking-widest">WHY</h3>
              <p className="text-[#F5F6F7] text-sm">Based on current trading patterns, portfolio economics, and marketplace signals:</p>
              <ul className="list-disc pl-5 text-[#A2A6AD] text-sm space-y-2">
                <li><strong className="text-[#F5F6F7]">Etsy US price increase (+£5):</strong> +£480–£720 contribution (65% confidence)</li>
                <li><strong className="text-[#F5F6F7]">Payhip launch:</strong> +£240–£580 (70% confidence)</li>
                <li><strong className="text-[#F5F6F7]">Bundle strategy on Etsy US:</strong> +£420–£840 (70% confidence)</li>
              </ul>
              <p className="text-[#F5F6F7] text-sm">Total: £1,140–£2,140 from new actions, on top of existing £4,820 forecast.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-[#A2A6AD] font-display text-xs font-bold tracking-widest">VALUE</h3>
              <p className="text-[#22C55E] text-sm font-bold">
                Combined expected value: £5,960 (median case) against a 30-day forecast baseline of £4,820.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-[#A2A6AD] font-display text-xs font-bold tracking-widest">OPTIONS</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#1C1F24] p-3 rounded border border-[#D6A84B]/30">
                  <div className="text-[#D6A84B] font-bold text-sm mb-1">A. Approve all three</div>
                  <div className="text-[#A2A6AD] text-xs">Highest expected value</div>
                </div>
                <div className="bg-[#1C1F24] p-3 rounded border border-white/5">
                  <div className="text-[#F5F6F7] font-bold text-sm mb-1">B. Price test + Payhip</div>
                  <div className="text-[#A2A6AD] text-xs">Lower effort, lower risk</div>
                </div>
                <div className="bg-[#1C1F24] p-3 rounded border border-white/5">
                  <div className="text-[#F5F6F7] font-bold text-sm mb-1">C. Bundle only</div>
                  <div className="text-[#A2A6AD] text-xs">Lowest effort, most reversible</div>
                </div>
              </div>
            </div>

            <div className="bg-[#D6A84B]/10 border border-[#D6A84B]/30 p-4 rounded space-y-2">
              <h3 className="text-[#D6A84B] font-display text-xs font-bold tracking-widest">RECOMMENDATION</h3>
              <p className="text-[#F5F6F7] text-sm font-bold">Option A — approve all three.</p>
              <p className="text-[#F5F6F7] text-sm">Each is low effort, reversible, and contributes independently. Start with price test (highest confidence), then Payhip, then bundle.</p>
            </div>

            <div className="text-xs text-[#A2A6AD] bg-white/5 p-3 rounded">
              <strong className="text-[#38BDF8]">CONFIDENCE: MODERATE</strong> — Payhip estimates have limited prior data. Price test requires experiment to confirm elasticity.
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
              <button className="px-4 py-2 bg-[#1C1F24] hover:bg-white/10 border border-white/20 text-[#F5F6F7] font-display text-xs font-bold rounded transition-colors">
                RUN PRICE TEST SCENARIO
              </button>
              <button className="px-4 py-2 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold rounded transition-colors">
                APPROVE PAYHIP LAUNCH
              </button>
              <button className="px-4 py-2 bg-[#1C1F24] hover:bg-white/10 border border-white/20 text-[#F5F6F7] font-display text-xs font-bold rounded transition-colors">
                CREATE BUNDLE EXPERIMENT
              </button>
            </div>

            <p className="text-[9px] text-[#626770] italic text-center mt-4">
              Revenue estimates are associated with, not caused by, these actions. Results will vary.
            </p>
          </div>
        </div>

      </div>
    </ExecutiveShell>
  );
}
