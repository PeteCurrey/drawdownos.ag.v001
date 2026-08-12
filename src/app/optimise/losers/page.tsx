'use client';

import React from 'react';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
// import { DEMO_EXPERIMENTS } from '@/lib/optimise/demo-optimise-data';
// import { Experiment } from '@/lib/optimise/types';

export default function LoserLibraryPage() {
  const losers = [
    {
      id: 'exp-002',
      status: 'LOSER',
      intervention: 'Promotional guarantee badges',
      outcome: '-8.2% conversion',
      narrative: 'Promotional guarantee badges reduced trust on Etsy US',
      lossPrevented: '£1,450',
      learning: 'Don\'t use spammy guarantee badges on premium products.',
      reversion: 'Rolled back automatically in 47 seconds',
      color: '#EF4444' // Danger
    },
    {
      id: 'exp-004',
      status: 'STOPPED',
      intervention: 'High-promise German copy',
      outcome: 'Guardrail breach 8.2% refunds',
      narrative: 'High-promise German copy created outcome expectation mismatch',
      lossPrevented: '£800',
      learning: 'Localised copy must maintain original realistic expectations.',
      reversion: 'Rolled back automatically in 47 seconds',
      color: '#FF6A18' // Signal
    }
  ];

  return (
    <OptimiseShell title="LOSER LIBRARY" subtitle="Recorded failures & post-mortems.">
      <div className="space-y-6">
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
