'use client';

import React, { useState } from 'react';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';

export default function ExperimentDesignerPage() {
  const [mode, setMode] = useState<'AI' | 'MANUAL'>('AI');

  return (
    <OptimiseShell>
      <div className="bg-[#0A0B0D] min-h-screen text-white p-8">
        <div className="mb-8 border-b border-white/10 pb-4">
          <h1 className="font-display text-2xl text-white tracking-[0.08em] font-bold">EXPERIMENT DESIGNER</h1>
          <p className="text-gray-400 font-data">Design experiments manually or use natural language.</p>
        </div>

        <div className="flex space-x-4 mb-6 border-b border-white/10 pb-4">
          <button 
            onClick={() => setMode('AI')}
            className={`font-display text-sm px-4 py-2 rounded-md transition-colors ${mode === 'AI' ? 'bg-[#D6A84B]/20 text-[#D6A84B]' : 'text-gray-400 hover:text-white'}`}
          >
            AI PROMPT DESIGNER
          </button>
          <button 
            onClick={() => setMode('MANUAL')}
            className={`font-display text-sm px-4 py-2 rounded-md transition-colors ${mode === 'MANUAL' ? 'bg-[#D6A84B]/20 text-[#D6A84B]' : 'text-gray-400 hover:text-white'}`}
          >
            MANUAL DESIGNER
          </button>
        </div>

        {mode === 'AI' ? (
          <div className="grid grid-cols-2 gap-6">
            <div className="industrial-panel bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6 shadow-xl">
              <h3 className="font-display text-[#38BDF8] mb-4 text-sm tracking-wider">Prompt</h3>
              <textarea 
                className="w-full bg-black/50 border border-white/10 rounded-md p-4 text-gray-300 font-data h-40 focus:outline-none focus:border-[#D6A84B]"
                placeholder="State your hypothesis or test idea... e.g. 'Test £39 price point for PDF product on Whop Marketplace'"
              />
              <button className="mt-4 bg-white/5 hover:bg-white/10 text-white font-display text-xs px-4 py-3 rounded-md border border-white/10 w-full transition-colors">
                PARSE & DESIGN TEST -&gt;
              </button>
            </div>
            <div className="industrial-panel bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6 shadow-xl flex flex-col justify-center items-center text-center">
              <div className="text-gray-500 font-display text-sm mb-2 animate-pulse">Awaiting prompt...</div>
              <div className="text-gray-600 text-xs max-w-xs font-data">Live generated design preview (Hypothesis, Control, Variant, Target Marketplace, Required Sample, Guardrails, Priority Score) will appear here.</div>
            </div>
          </div>
        ) : (
          <div className="industrial-panel bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6 shadow-xl space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-display text-gray-400 mb-2">Type</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md p-2.5 text-gray-300 font-data" />
              </div>
              <div>
                <label className="block text-xs font-display text-gray-400 mb-2">Subtype</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md p-2.5 text-gray-300 font-data" />
              </div>
              <div>
                <label className="block text-xs font-display text-gray-400 mb-2">Product</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md p-2.5 text-gray-300 font-data" />
              </div>
              <div>
                <label className="block text-xs font-display text-gray-400 mb-2">Marketplace</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md p-2.5 text-gray-300 font-data" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-display text-gray-400 mb-2">Hypothesis statement</label>
              <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md p-2.5 text-gray-300 font-data" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-display text-gray-400 mb-2">Control value</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md p-2.5 text-gray-300 font-data" />
              </div>
              <div>
                <label className="block text-xs font-display text-gray-400 mb-2">Variant value</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md p-2.5 text-gray-300 font-data" />
              </div>
              <div>
                <label className="block text-xs font-display text-gray-400 mb-2">Primary Metric</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md p-2.5 text-gray-300 font-data" />
              </div>
              <div>
                <label className="block text-xs font-display text-gray-400 mb-2">Target Uplift %</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md p-2.5 text-gray-300 font-data" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-display text-gray-400 mb-2">Guardrail thresholds</label>
              <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md p-2.5 text-gray-300 font-data" />
            </div>
          </div>
        )}

        <div className="mt-8 flex space-x-4">
          <button className="bg-[#D6A84B] text-black hover:bg-[#c49842] font-display font-bold px-6 py-3 rounded-md transition-colors shadow-lg">
            LAUNCH EXPERIMENT
          </button>
          <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-display px-6 py-3 rounded-md transition-colors">
            SAVE TO QUEUE
          </button>
        </div>
      </div>
    </OptimiseShell>
  );
}
