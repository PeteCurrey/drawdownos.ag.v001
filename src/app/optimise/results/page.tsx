'use client';

import React, { useState } from 'react';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
import { AlertCircle } from 'lucide-react';

export default function ResultsPage() {
  const [filter, setFilter] = useState('ALL');

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

        <div className="industrial-panel bg-[#0A0B0D] border border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-10 h-10 text-[#D6A84B]/60 mb-4" />
          <div className="text-[#D6A84B] font-display text-base tracking-widest mb-2">NO COMPLETED EXPERIMENTS</div>
          <p className="text-white/60 text-sm font-data max-w-lg">
            Evaluation metrics require concluded experiment data.
            No completed experiments exist yet.
          </p>
        </div>
      </div>
    </OptimiseShell>
  );
}
