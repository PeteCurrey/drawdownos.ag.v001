'use client';

import React from 'react';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
import { AlertCircle } from 'lucide-react';

export default function RunningExperimentsPage() {
  return (
    <OptimiseShell>
      <div className="bg-[#0A0B0D] min-h-screen text-white p-8">
        <div className="mb-8 border-b border-white/10 pb-4">
          <h1 className="font-display text-2xl text-white tracking-[0.08em] font-bold">RUNNING EXPERIMENTS</h1>
          <p className="text-gray-400 font-data">Live telemetry & guardrail safety monitoring.</p>
        </div>

        <div className="industrial-panel bg-[#0A0B0D] border border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-10 h-10 text-[#38BDF8]/60 mb-4" />
          <div className="text-[#38BDF8] font-display text-base tracking-widest mb-2">NO ACTIVE EXPERIMENTS</div>
          <p className="text-white/60 text-sm font-data max-w-lg">
            Live experiment monitoring requires real-time telemetry from an active experiment.
            No experiments are currently running.
          </p>
        </div>
      </div>
    </OptimiseShell>
  );
}
