'use client';

import React from 'react';
import OptimiseShell from '@/components/optimise/OptimiseShell';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export default function ConflictsPage() {
  return (
    <OptimiseShell header="EXPERIMENT CONFLICT ENGINE" description="Cross-test interference detection & resolution.">
      <div className="space-y-6">
        
        {/* Status Panel */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-[#22C55E]/30 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#22C55E]" />
            </div>
            <div>
              <h2 className="font-display text-[#F5F6F7] text-lg font-bold tracking-[0.08em]">SYSTEM CLEAR</h2>
              <p className="font-data text-[#A2A6AD] text-sm mt-1">0 active conflicts detected.</p>
            </div>
          </div>
        </div>

        {/* Resolved Conflict Log */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6 text-center">
          <h2 className="font-display text-[#F5F6F7] text-sm font-bold tracking-[0.08em] mb-6 text-left">RESOLVED CONFLICT LOG</h2>
          <div className="p-8 border-dashed border-2 border-white/10 rounded-lg flex flex-col items-center justify-center">
            <AlertCircle className="w-8 h-8 text-[#626770] mb-2" />
            <div className="font-display text-sm text-[#A2A6AD]">NO RESOLVED CONFLICTS</div>
            <p className="font-data text-xs text-[#626770] mt-1">
              Conflict logs strictly reflect detected trial collisions. Zero conflicts recorded.
            </p>
          </div>
        </div>

      </div>
    </OptimiseShell>
  );
}
