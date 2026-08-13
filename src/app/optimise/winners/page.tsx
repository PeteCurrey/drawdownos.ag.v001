'use client';

import React from 'react';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
import { AlertCircle } from 'lucide-react';

export default function WinnerLibraryPage() {
  const winners: any[] = [];

  return (
    <OptimiseShell title="WINNER LIBRARY" subtitle="Proven commercial interventions.">
      <div className="space-y-6">
        {winners.length === 0 ? (
          <div className="industrial-panel bg-[#0A0B0D] border border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-10 h-10 text-[#22C55E]/60 mb-3" />
            <div className="text-[#22C55E] font-display text-base tracking-widest mb-2">NO VALIDATED WINNERS</div>
            <p className="text-white/60 text-sm font-data max-w-lg">
              The Winner Library stores proven commercial interventions derived from real trials.
              Zero validated winners exist yet.
            </p>
          </div>
        ) : null}
      </div>
    </OptimiseShell>
  );
}
