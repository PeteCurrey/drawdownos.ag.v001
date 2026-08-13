'use client';

import React from 'react';
import OptimiseShell from '@/components/optimise/OptimiseShell';
import { AlertCircle } from 'lucide-react';

export default function RolloutsPage() {
  return (
    <OptimiseShell header="ROLLOUT ENGINE" description="Phased rollout plans & post-rollout monitoring.">
      <div className="space-y-6">
        
        {/* Active Rollout Tracker */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6">
          <h2 className="font-display text-[#F5F6F7] text-lg font-bold tracking-[0.08em] mb-6">ACTIVE ROLLOUT TRACKER</h2>
          <div className="p-8 border-dashed border-2 border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-8 h-8 text-[#D6A84B]/60 mb-2" />
            <div className="font-display text-sm text-[#A2A6AD]">NO ACTIVE ROLLOUTS</div>
            <p className="font-data text-xs text-[#626770] mt-1">
              Rollout plans require a verified winner from a concluded experiment trial.
            </p>
          </div>
        </div>

        {/* Post-Rollout Monitoring */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6">
          <h2 className="font-display text-[#F5F6F7] text-lg font-bold tracking-[0.08em] mb-6">POST-ROLLOUT MONITORING</h2>
          <div className="p-8 border-dashed border-2 border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-8 h-8 text-[#626770] mb-2" />
            <div className="font-display text-sm text-[#A2A6AD]">NO MONITORED ROLLOUTS</div>
            <p className="font-data text-xs text-[#626770] mt-1">
              Monitoring telemetry requires a live deployed rollout.
            </p>
          </div>
        </div>

      </div>
    </OptimiseShell>
  );
}
