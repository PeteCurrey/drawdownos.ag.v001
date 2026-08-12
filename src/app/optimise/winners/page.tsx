'use client';

import React from 'react';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
// import { DEMO_EXPERIMENTS } from '@/lib/optimise/demo-optimise-data';
// import { Experiment } from '@/lib/optimise/types';

export default function WinnerLibraryPage() {
  const winners = [
    {
      id: 'exp-001',
      intervention: 'Gumroad UK pricing £29 -> £34',
      uplift: '+11.4%',
      annualisedValue: '£1,840/yr',
      evidenceStrength: 'STRONG (312 customers)',
      keyInsight: 'Beginner trading PDFs show low price elasticity between £24-£34',
    }
  ];

  return (
    <OptimiseShell title="WINNER LIBRARY" subtitle="Proven commercial interventions.">
      <div className="space-y-6">
        {winners.map(winner => (
          <div key={winner.id} className="bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/8 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block px-2 py-1 bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 rounded text-xs font-display mb-2">WINNER</span>
                <h3 className="text-xl text-white font-medium">{winner.intervention}</h3>
              </div>
              <div className="text-right">
                <div className="text-[#22C55E] font-data text-lg">{winner.uplift}</div>
                <div className="text-white/60 text-sm">net contribution</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#0A0B0D] p-3 rounded-lg border border-white/5">
                <div className="text-white/40 text-xs font-display mb-1">ANNUALISED VALUE</div>
                <div className="text-[#22C55E] font-data">{winner.annualisedValue}</div>
              </div>
              <div className="bg-[#0A0B0D] p-3 rounded-lg border border-white/5">
                <div className="text-white/40 text-xs font-display mb-1">EVIDENCE STRENGTH</div>
                <div className="text-white font-data">{winner.evidenceStrength}</div>
              </div>
              <div className="bg-[#0A0B0D] p-3 rounded-lg border border-white/5">
                <div className="text-white/40 text-xs font-display mb-1">KEY INSIGHT</div>
                <div className="text-white text-sm">{winner.keyInsight}</div>
              </div>
            </div>
            
            <div className="flex justify-end border-t border-white/10 pt-4">
              <button className="px-4 py-2 bg-[#D6A84B] text-black font-display text-sm rounded hover:bg-[#D6A84B]/90 transition-colors">
                APPLY ELSEWHERE
              </button>
            </div>
          </div>
        ))}
      </div>
    </OptimiseShell>
  );
}
