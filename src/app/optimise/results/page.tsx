'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
import { DEMO_EXPERIMENTS } from '@/lib/optimise/demo-optimise-data';

export default function ResultsPage() {
  const [filter, setFilter] = useState('ALL');
  const completed = DEMO_EXPERIMENTS.filter(e => ['WINNER', 'LOSER', 'INCONCLUSIVE', 'ROLLED_OUT', 'ROLLED_BACK', 'STOPPED'].includes(e.state));

  const filtered = filter === 'ALL' 
    ? completed 
    : completed.filter(e => {
        if (filter === 'WINNERS') return e.result?.outcome === 'WINNER';
        if (filter === 'LOSERS') return e.result?.outcome === 'LOSER';
        if (filter === 'INCONCLUSIVE') return e.result?.outcome === 'INCONCLUSIVE';
        if (filter === 'STOPPED') return e.state === 'STOPPED';
        return true;
      });

  return (
    <OptimiseShell>
      <div className="bg-[#0A0B0D] min-h-screen text-white p-8">
        <div className="mb-8 border-b border-white/10 pb-4">
          <h1 className="font-display text-2xl text-white tracking-[0.08em] font-bold">EXPERIMENT RESULTS</h1>
          <p className="text-gray-400 font-data">Evaluated tests and commercial evidence.</p>
        </div>

        <div className="flex space-x-3 mb-8">
          {['ALL', 'WINNERS', 'LOSERS', 'INCONCLUSIVE', 'STOPPED'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`font-display text-xs tracking-wider px-4 py-2 rounded-full border transition-colors ${filter === f ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          {filtered.map(exp => (
            <div key={exp.id} className="industrial-panel bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6 shadow-xl flex flex-col justify-between h-full transform hover:scale-[1.01] transition-transform">
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div className="text-xs font-data text-gray-500 bg-black/40 px-2 py-1 rounded">{exp.id}</div>
                  <div className={`font-display text-[10px] tracking-wider px-2.5 py-1 rounded shadow-sm ${
                    exp.result?.outcome === 'WINNER' ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30' :
                    exp.result?.outcome === 'LOSER' ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30' :
                    exp.state === 'STOPPED' ? 'bg-[#FF6A18]/20 text-[#FF6A18] border border-[#FF6A18]/30' :
                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {exp.state === 'STOPPED' ? 'STOPPED' : exp.result?.outcome || 'UNKNOWN'}
                  </div>
                </div>
                <h3 className="font-display text-lg text-white mb-2 leading-snug">{exp.hypothesis.statement}</h3>
                <p className="text-gray-400 font-data text-xs mb-8">{exp.marketplaceName ?? exp.productName}</p>
              </div>

              {exp.result && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                      <div className="text-[10px] font-display tracking-wider text-gray-500 mb-1">UPLIFT</div>
                       <div className={`font-data text-xl ${(exp.result.primaryMetricUpliftPercent ?? exp.result.bayesian.expectedUpliftMedianPct) > 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                         {(exp.result.primaryMetricUpliftPercent ?? exp.result.bayesian.expectedUpliftMedianPct) > 0 ? '+' : ''}{exp.result.primaryMetricUpliftPercent ?? exp.result.bayesian.expectedUpliftMedianPct}%
                      </div>
                    </div>
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                      <div className="text-[10px] font-display tracking-wider text-gray-500 mb-1">PROBABILITY</div>
                      <div className="font-data text-xl text-white">{((exp.result.probabilityVariantBeatsControl ?? (exp.result.bayesian.probabilityVariantBetterPct / 100)) * 100).toFixed(0)}%</div>
                    </div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-[#D6A84B]/20">
                     <div className="text-[10px] font-display tracking-wider text-gray-500 mb-1">ANNUALISED IMPACT</div>
                      <div className="font-data text-2xl text-[#D6A84B]">£{(exp.result.annualisedValueGbp ?? exp.result.practicalSignificance?.annualisedImpactGbp ?? exp.result.annualisedValueEstimate ?? 0).toLocaleString()}</div>
                  </div>
                </div>
              )}
              
              <div className="mt-8 pt-5 border-t border-white/10">
                <Link href={`/optimise/results/${exp.id}`} className="inline-flex items-center space-x-2 text-[#38BDF8] font-display text-xs tracking-wider hover:text-white transition-colors">
                  <span>VIEW DETAILS</span>
                  <span className="text-[10px]">-&gt;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OptimiseShell>
  );
}
