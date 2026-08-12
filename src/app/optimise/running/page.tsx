'use client';

import React from 'react';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
import { DEMO_EXPERIMENTS } from '@/lib/optimise/demo-optimise-data';

export default function RunningExperimentsPage() {
  const running = DEMO_EXPERIMENTS.find(e => e.id === 'exp-003');

  return (
    <OptimiseShell>
      <div className="bg-[#0A0B0D] min-h-screen text-white p-8">
        <div className="mb-8 border-b border-white/10 pb-4">
          <h1 className="font-display text-2xl text-white tracking-[0.08em] font-bold">RUNNING EXPERIMENTS</h1>
          <p className="text-gray-400 font-data">Live telemetry & guardrail safety monitoring.</p>
        </div>

        {running ? (
          <div className="industrial-panel bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-8 shadow-xl">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8] animate-pulse"></div>
                  <h2 className="font-display text-xl text-white tracking-wide">{running.id}: {running.hypothesis.statement}</h2>
                </div>
                <p className="text-gray-400 font-data text-sm">{running.marketplaceName ?? running.productName} • {running.subtype}</p>
              </div>
              <div className="bg-[#FF6A18]/10 border border-[#FF6A18]/30 px-3 py-1.5 rounded text-[#FF6A18] font-display text-xs tracking-wider shadow-inner">
                TOO EARLY TO CALL
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="bg-black/40 rounded-lg p-5 border border-white/5 shadow-inner">
                <div className="text-[10px] font-display tracking-wider text-gray-500 mb-2">ELAPSED DURATION</div>
                <div className="font-data text-2xl text-white">Day 8 <span className="text-gray-500 text-sm">of {running.minimumDurationDays}</span></div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div className="bg-[#38BDF8] h-full" style={{ width: '26%' }}></div>
                </div>
              </div>
              <div className="bg-black/40 rounded-lg p-5 border border-white/5 shadow-inner">
                <div className="text-[10px] font-display tracking-wider text-gray-500 mb-2">SAMPLE PROGRESS</div>
                <div className="font-data text-2xl text-white">38 <span className="text-gray-500 text-sm">/ {running.requiredSampleSize} visitors</span></div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div className="bg-[#D6A84B] h-full shadow-[0_0_5px_#D6A84B]" style={{ width: '38%' }}></div>
                </div>
              </div>
              <div className="bg-black/40 rounded-lg p-5 border border-white/5 shadow-inner">
                <div className="text-[10px] font-display tracking-wider text-gray-500 mb-2">PROBABILITY TO BEAT CONTROL</div>
                <div className="font-data text-3xl text-white">52%</div>
                <div className="text-gray-400 text-xs font-data mt-2 flex items-center">
                   <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   Inconclusive trend
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="border border-white/10 rounded-xl p-6 bg-black/20">
                  <h3 className="font-display text-xs tracking-wider text-gray-400 mb-4">CONTROL A</h3>
                  <div className="font-data text-3xl text-white mb-2">£39.00</div>
                  <div className="text-sm text-gray-500 mt-1 font-data">Conv: 7.8% • Orders: 2</div>
              </div>
              <div className="border border-[#38BDF8]/40 bg-[#38BDF8]/5 rounded-xl p-6 relative overflow-hidden shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                  <div className="absolute top-0 right-0 bg-[#38BDF8] text-black font-display font-bold text-[10px] px-3 py-1 rounded-bl-lg">TEST VARIANT B</div>
                  <h3 className="font-display text-xs tracking-wider text-[#38BDF8] mb-4">TEST VARIANT</h3>
                  <div className="font-data text-3xl text-white mb-2">£49.00</div>
                  <div className="text-sm text-[#38BDF8]/80 mt-1 font-data">Conv: 8.0% • Orders: 1</div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="font-display text-xs tracking-wider text-gray-400 mb-4">GUARDRAIL HEALTH</h3>
              <div className="bg-black/40 border border-white/10 rounded-xl p-5 flex items-center justify-between shadow-inner">
                <div className="flex items-center space-x-4">
                  <div className="text-[#22C55E] bg-[#22C55E]/10 p-2 rounded-full"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                  <span className="font-display text-sm tracking-wide">Refund Rate</span>
                </div>
                <div className="font-data text-lg">
                  <span className="text-white">0.0%</span>
                  <span className="text-gray-500 text-sm ml-2">/ limit 6.0%</span>
                </div>
                <div className="text-[#22C55E] font-display text-[10px] tracking-wider font-bold border border-[#22C55E]/40 bg-[#22C55E]/10 px-3 py-1.5 rounded shadow-sm">HEALTHY</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#D6A84B]/10 to-transparent border border-[#D6A84B]/20 rounded-xl p-5 mb-8 flex items-start space-x-4">
              <div className="text-[#D6A84B] mt-1"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
              <div>
                <div className="font-display text-xs tracking-wider font-bold text-[#D6A84B] mb-2">AI COMMENTARY</div>
                <p className="font-data text-sm text-gray-300 leading-relaxed">Day 8 of 30. Sample currently 38 visitors / 3 sales (£87 gross). 0 refunds. On track. Variance is well within normal bounds for early stage.</p>
              </div>
            </div>

            <div className="flex space-x-4 border-t border-white/10 pt-8 mt-4">
              <button className="bg-white/5 hover:bg-white/10 text-white font-display text-xs tracking-wider px-6 py-2.5 rounded border border-white/10 transition-colors">PAUSE TEST</button>
              <button className="bg-red-500/10 hover:bg-red-500/20 text-[#EF4444] font-display text-xs tracking-wider px-6 py-2.5 rounded border border-red-500/30 transition-colors">EMERGENCY STOP & REVERT</button>
              <button className="bg-white/5 hover:bg-white/10 text-white font-display text-xs tracking-wider px-6 py-2.5 rounded border border-white/10 transition-colors">EXTEND DURATION</button>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 font-data">No running experiments.</div>
        )}
      </div>
    </OptimiseShell>
  );
}
