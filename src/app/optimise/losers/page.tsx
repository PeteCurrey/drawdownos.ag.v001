'use client';

import React from 'react';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
// import { Experiment } from '@/lib/optimise/types';

export default function LoserLibraryPage() {
  const losers: any[] = [];

  return (
    <OptimiseShell title="LOSER LIBRARY" subtitle="Recorded failures & post-mortems.">
      <div className="space-y-6">
        {losers.length === 0 && (
          <div className="industrial-panel bg-[#0A0B0D] border border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center">
            <div className="text-[#EF4444] font-display text-sm tracking-widest mb-4">NO FAILED EXPERIMENTS LOGGED</div>
            <p className="text-white/60 text-sm font-data max-w-lg">
              Losers are valuable signals, but none are currently recorded. Connect your testing platform to track failed interventions and automatically calculate losses prevented.
            </p>
          </div>
        )}
        {losers.map(loser => (
          <div key={loser.id} className="bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/8 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span 
                  className="inline-block px-2 py-1 border rounded text-xs font-display mb-2"
                  style={{ backgroundColor: `${loser.color}1A`, color: loser.color, borderColor: `${loser.color}33` }}
                >
                  {loser.status}
                </span>
                <h3 className="text-xl text-white font-medium">{loser.intervention}</h3>
              </div>
              <div className="text-right">
                <div style={{ color: loser.color }} className="font-data text-lg">{loser.outcome}</div>
                <div className="text-white/60 text-sm">Outcome</div>
              </div>
            </div>
            
            <div className="bg-[#0A0B0D] p-4 rounded-lg border border-white/5 mb-6 space-y-4">
              <div>
                <div className="text-white/40 text-xs font-display mb-1">FAILURE NARRATIVE & ROOT CAUSE</div>
                <div className="text-white">{loser.narrative}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-white/40 text-xs font-display mb-1">FINANCIAL LOSS PREVENTED</div>
                  <div className="text-[#22C55E] font-data">{loser.lossPrevented}</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs font-display mb-1">REVERSION STATUS</div>
                  <div className="text-white/80 font-data">{loser.reversion}</div>
                </div>
              </div>
              <div>
                <div className="text-white/40 text-xs font-display mb-1">LEARNING EXTRACTED</div>
                <div className="text-[#38BDF8]">{loser.learning}</div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </OptimiseShell>
  );
}
