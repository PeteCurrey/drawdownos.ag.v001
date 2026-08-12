'use client';

import React from 'react';
import OptimiseShell from '@/components/optimise/OptimiseShell';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AnalystPage() {
  const chips = [
    "Which pricing changes made us the most money?",
    "What have we learned about German customers?",
    "Why did the Etsy thumbnail test fail?",
    "Which product has the most optimisation debt?"
  ];

  return (
    <OptimiseShell header="AI EXPERIMENT ANALYST" description="Query commercial evidence & learning history.">
      <div className="flex flex-col h-[calc(100vh-200px)] min-h-[600px] space-y-4">
        
        {/* Chat History Area */}
        <div className="flex-1 bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-[#1C1F24] border border-white/10 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                <p className="font-data text-sm text-[#F5F6F7]">Which pricing changes made us the most money?</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#D6A84B]/20 border border-[#D6A84B]/40 flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <div className="bg-[#0A0B0D] border border-white/10 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[90%]">
                <p className="font-data text-sm text-[#F5F6F7] mb-4">
                  Based on the experiment registry and financial telemetry, the most profitable pricing intervention to date was <strong className="text-[#D6A84B]">EXP-001 (Gumroad UK Price Elasticity)</strong>.
                </p>
                
                <div className="bg-[#1C1F24] rounded-lg p-4 border border-white/5 mb-4">
                  <h4 className="font-display text-xs text-[#A2A6AD] tracking-widest mb-2">EVIDENCE BREAKDOWN</h4>
                  <ul className="space-y-2 font-data text-sm text-[#F5F6F7]">
                    <li className="flex justify-between"><span className="text-[#A2A6AD]">Variant:</span> <span>£34 (vs £29 Control)</span></li>
                    <li className="flex justify-between"><span className="text-[#A2A6AD]">Conv. Rate Impact:</span> <span>-2.1% (Acceptable)</span></li>
                    <li className="flex justify-between"><span className="text-[#A2A6AD]">Margin Lift:</span> <span className="text-[#22C55E]">+11.4%</span></li>
                    <li className="flex justify-between"><span className="text-[#A2A6AD]">Bayesian Confidence:</span> <span>98.7%</span></li>
                  </ul>
                </div>

                <div className="flex gap-2 items-start bg-[#38BDF8]/10 p-3 rounded border border-[#38BDF8]/20">
                  <ArrowRight className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <p className="font-data text-sm text-[#38BDF8]">
                    <strong>Recommendation:</strong> Roll out the £34 price point to EU markets immediately. Elasticity curves suggest headroom up to £39 before volume drops offset margin gains.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Input Area */}
        <div className="shrink-0 bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {chips.map((chip, idx) => (
              <button key={idx} className="bg-[#1C1F24] hover:bg-[#2A2E35] border border-white/10 rounded-full px-3 py-1.5 font-data text-xs text-[#A2A6AD] hover:text-[#F5F6F7] transition-colors">
                {chip}
              </button>
            ))}
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask anything about experiment evidence..." 
              className="w-full bg-[#0A0B0D] border border-white/10 rounded-lg py-3 px-4 font-data text-sm text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]/50 transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] p-1.5 rounded-md transition-colors">
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </OptimiseShell>
  );
}
