'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
import { DEMO_EXPERIMENTS } from '@/lib/optimise/demo-optimise-data';

export default function ResultDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const experiment = DEMO_EXPERIMENTS.find(e => e.id === id);

  if (!experiment) {
    return (
      <OptimiseShell>
        <div className="bg-[#0A0B0D] min-h-screen text-white p-8">
           <div className="mb-8 border-b border-white/10 pb-4">
             <h1 className="font-display text-2xl text-white tracking-[0.08em] font-bold">NOT FOUND</h1>
             <p className="text-gray-400 font-data">Experiment not found.</p>
           </div>
        </div>
      </OptimiseShell>
    );
  }

  const result = experiment.result;
  const isWinner = result?.outcome === 'WINNER';
  const isLoser = result?.outcome === 'LOSER';
  
  return (
    <OptimiseShell>
      <div className="bg-[#0A0B0D] min-h-screen text-white p-8">
        <div className="mb-6">
          <Link href="/optimise/results" className="text-gray-500 hover:text-white font-display text-xs tracking-wider flex items-center space-x-2 transition-colors">
            <span>&lt;-</span>
            <span>BACK TO RESULTS</span>
          </Link>
        </div>

        <div className="flex justify-between items-start mb-10 border-b border-white/10 pb-6">
          <div>
             <div className="flex items-center space-x-3 mb-2">
                <h1 className="font-display text-3xl text-white tracking-wide">{experiment.hypothesis.statement}</h1>
             </div>
             <p className="font-data text-gray-400 text-sm">Resolved: {experiment.actualEnd ? new Date(experiment.actualEnd).toLocaleDateString() : 'N/A'} • {experiment.marketplaceName || experiment.productName}</p>
          </div>
          <div className={`font-display font-bold text-sm tracking-widest px-4 py-2 rounded shadow-sm border ${
            isWinner ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30 shadow-[0_0_10px_rgba(34,197,94,0.1)]' :
            isLoser ? 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30' :
            experiment.state === 'STOPPED' ? 'bg-[#FF6A18]/10 text-[#FF6A18] border-[#FF6A18]/30' :
            'bg-gray-500/10 text-gray-400 border-gray-500/30'
          }`}>
            {experiment.state === 'STOPPED' ? 'STOPPED' : result?.outcome || 'UNKNOWN'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="col-span-2 industrial-panel bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-8 shadow-xl">
             <h3 className="font-display text-xs tracking-widest text-[#D6A84B] mb-6">HYPOTHESIS & DESIGN</h3>
             <div className="grid grid-cols-2 gap-6">
                <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                  <div className="text-[10px] font-display tracking-wider text-gray-500 mb-1.5">MARKETPLACE / CHANNEL</div>
                  <div className="font-data text-white">{experiment.marketplaceName || experiment.productName}</div>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                  <div className="text-[10px] font-display tracking-wider text-gray-500 mb-1.5">TYPE / SUBTYPE</div>
                  <div className="font-data text-white">{experiment.type} <span className="text-gray-500 mx-1">/</span> {experiment.subtype}</div>
                </div>
                <div className="col-span-2 mt-2">
                  <div className="text-[10px] font-display tracking-wider text-gray-500 mb-2">CONTROL A</div>
                  <div className="font-data text-gray-300 bg-black/50 p-4 rounded-lg border border-white/10">
                    {experiment.variants.find(v => v.role === 'CONTROL')?.description || 'N/A'}
                  </div>
                </div>
                 <div className="col-span-2 mt-2">
                  <div className="text-[10px] font-display tracking-wider text-gray-500 mb-2">VARIANT B</div>
                  <div className="font-data text-[#38BDF8] bg-[#38BDF8]/10 p-4 rounded-lg border border-[#38BDF8]/30">
                    {experiment.variants.find(v => v.role !== 'CONTROL')?.description || 'N/A'}
                  </div>
                </div>
             </div>
          </div>
          
          <div className="industrial-panel bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-8 shadow-xl">
             <h3 className="font-display text-xs tracking-widest text-[#D6A84B] mb-6">BAYESIAN EVALUATION</h3>
             {result ? (
               <div className="space-y-6">
                 <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                    <div className="text-[10px] font-display tracking-wider text-gray-500 mb-2">PROBABILITY VARIANT BETTER</div>
                    <div className="font-data text-4xl text-white">{((result.probabilityVariantBeatsControl ?? result.bayesian.probabilityVariantBetterPct / 100) * 100).toFixed(1)}%</div>
                 </div>
                 <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                    <div className="text-[10px] font-display tracking-wider text-gray-500 mb-2">UPLIFT ESTIMATE</div>
                    <div className={`font-data text-3xl ${(result.primaryMetricUpliftPercent ?? result.bayesian.expectedUpliftMedianPct) > 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                      {(result.primaryMetricUpliftPercent ?? result.bayesian.expectedUpliftMedianPct) > 0 ? '+' : ''}{result.primaryMetricUpliftPercent ?? result.bayesian.expectedUpliftMedianPct}%
                    </div>
                 </div>
                 <div className="pt-6 border-t border-white/10">
                   <div className="text-[10px] font-display tracking-wider text-gray-500 mb-2">CREDIBLE INTERVAL (95%)</div>
                   <div className="font-data text-sm text-gray-300 bg-black/40 px-3 py-2 rounded">
                     +6.2% <span className="text-gray-600 mx-2">to</span> +16.8%
                   </div>
                 </div>
               </div>
             ) : (
               <div className="text-gray-500 font-data">No result data available.</div>
             )}
          </div>
        </div>

        <div className="industrial-panel bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-8 mb-8 shadow-xl overflow-x-auto">
          <h3 className="font-display text-xs tracking-widest text-[#D6A84B] mb-6">PERFORMANCE DATA</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-display tracking-widest text-gray-500">
                <th className="pb-3 font-normal">VARIATION</th>
                <th className="pb-3 font-normal text-right">VISITORS</th>
                <th className="pb-3 font-normal text-right">ORDERS</th>
                <th className="pb-3 font-normal text-right">CONV %</th>
                <th className="pb-3 font-normal text-right">REVENUE</th>
                <th className="pb-3 font-normal text-right">CONTRIBUTION</th>
                <th className="pb-3 font-normal text-right">REFUNDS</th>
              </tr>
            </thead>
            <tbody className="font-data text-sm">
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 text-gray-400">Control A</td>
                <td className="py-4 text-right text-gray-300">4,210</td>
                <td className="py-4 text-right text-gray-300">105</td>
                <td className="py-4 text-right text-gray-300">2.49%</td>
                <td className="py-4 text-right text-gray-300">£4,095</td>
                <td className="py-4 text-right text-gray-300">£3,100</td>
                <td className="py-4 text-right text-gray-300">2.1%</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-4 text-[#38BDF8] font-bold">Variant B</td>
                <td className="py-4 text-right text-white">4,198</td>
                <td className="py-4 text-right text-white">117</td>
                <td className="py-4 text-right text-[#22C55E] font-bold">2.78%</td>
                <td className="py-4 text-right text-white">£4,563</td>
                <td className="py-4 text-right text-[#22C55E] font-bold">£3,450</td>
                <td className="py-4 text-right text-white">2.2%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
           <div className="industrial-panel bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-8 shadow-xl">
             <h3 className="font-display text-xs tracking-widest text-[#D6A84B] mb-6">PRACTICAL SIGNIFICANCE & ECONOMICS</h3>
             {result ? (
               <div className="space-y-4">
                 <div className="flex justify-between items-center bg-black/40 p-4 rounded-lg border border-white/5">
                   <span className="font-display text-xs tracking-wider text-gray-400">ANNUALISED IMPACT</span>
                   <span className="font-data text-2xl text-[#22C55E]">£{(result.annualisedValueGbp ?? result.practicalSignificance?.annualisedImpactGbp ?? 0).toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center bg-black/40 p-4 rounded-lg border border-white/5">
                   <span className="font-display text-xs tracking-wider text-gray-400">ROI ON DEV TIME</span>
                   <span className="font-data text-xl text-white">18.4x</span>
                 </div>
                 <div className="flex justify-between items-center bg-black/40 p-4 rounded-lg border border-white/5">
                   <span className="font-display text-xs tracking-wider text-gray-400">IMPLEMENTATION COMPLEXITY</span>
                   <span className="font-display text-sm tracking-wider text-[#38BDF8] bg-[#38BDF8]/10 px-3 py-1 rounded">LOW</span>
                 </div>
               </div>
             ) : (
               <div className="text-gray-500">N/A</div>
             )}
           </div>

           <div className="industrial-panel bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-8 shadow-xl">
             <h3 className="font-display text-xs tracking-widest text-[#D6A84B] mb-6">INSTITUTIONAL LEARNING EXTRACTED</h3>
             <div className="bg-[#D6A84B]/10 border border-[#D6A84B]/30 rounded-lg p-5 mb-8 shadow-inner">
               <p className="text-sm font-data text-gray-200 leading-relaxed">
                 {experiment.aiCommentary || experiment.learningExtract || "Price elasticity is lower than modelled. Increasing price by £10 resulted in only a marginal conversion drop, leading to significant net contribution increase."}
               </p>
             </div>
             <h3 className="font-display text-xs tracking-widest text-gray-400 mb-4">GUARDRAILS & SAFETY LOG</h3>
             <div className="flex items-center space-x-3 text-sm font-data text-gray-300 bg-black/40 p-3 rounded-lg border border-white/5">
               <span className="text-[#22C55E] bg-[#22C55E]/20 rounded-full p-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></span>
               <span>No significant increase in refund rate detected during lifecycle.</span>
             </div>
           </div>
        </div>

        <div className="industrial-panel border-[#D6A84B]/30 bg-gradient-to-r from-[#D6A84B]/10 to-[#121418] rounded-xl p-8 shadow-[0_0_20px_rgba(214,168,75,0.05)]">
           <h3 className="font-display text-xs tracking-widest text-[#D6A84B] mb-4">ROLLOUT ACTION</h3>
           <div className="flex justify-between items-center">
              <p className="text-sm text-gray-300 font-data">This variant is evaluated and ready for final action.</p>
              <div className="flex space-x-4">
                 <button className="bg-black/50 border border-white/20 text-white hover:bg-white/10 font-display text-xs tracking-wider px-6 py-3 rounded transition-colors">
                   ARCHIVE
                 </button>
                 {isWinner && (
                   <button className="bg-[#D6A84B] text-black hover:bg-[#c49842] font-display text-xs tracking-wider font-bold px-8 py-3 rounded transition-colors shadow-lg">
                     ROLLOUT TO 100%
                   </button>
                 )}
              </div>
           </div>
        </div>
      </div>
    </OptimiseShell>
  );
}
