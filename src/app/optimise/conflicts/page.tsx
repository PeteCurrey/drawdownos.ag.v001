'use client';

import React from 'react';
import OptimiseShell from '@/components/optimise/OptimiseShell';
import { ShieldCheck } from 'lucide-react';

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
              <p className="font-data text-[#A2A6AD] text-sm mt-1">0 active conflicts detected. 1 potential overlap resolved.</p>
            </div>
          </div>
        </div>

        {/* Resolved Conflict Log */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6">
          <h2 className="font-display text-[#F5F6F7] text-sm font-bold tracking-[0.08em] mb-6">RESOLVED CONFLICT LOG</h2>
          
          <div className="bg-[#0A0B0D] p-5 rounded-lg border border-white/5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border border-white/10 rounded bg-[#1C1F24]">
                <div className="text-[10px] font-display text-[#A2A6AD] mb-1">EXPERIMENT A</div>
                <div className="font-data text-sm text-[#F5F6F7]">HTT Price Test Gumroad UK</div>
              </div>
              <div className="p-3 border border-white/10 rounded bg-[#1C1F24]">
                <div className="text-[10px] font-display text-[#A2A6AD] mb-1">EXPERIMENT B</div>
                <div className="font-data text-sm text-[#F5F6F7]">HTT Bundle Test Gumroad UK</div>
              </div>
            </div>
            
            <div className="flex gap-4 p-4 bg-[#38BDF8]/10 border border-[#38BDF8]/20 rounded-lg">
              <div className="font-display text-[#38BDF8] text-xs mt-0.5">RESOLUTION</div>
              <div className="font-data text-sm text-[#F5F6F7]">
                Rescheduled <span className="text-[#38BDF8]">Exp B</span> by 14 days to isolate price elasticity signal and prevent audience contamination.
              </div>
            </div>
          </div>
        </div>

      </div>
    </OptimiseShell>
  );
}
