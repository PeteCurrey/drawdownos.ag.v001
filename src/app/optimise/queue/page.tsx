'use client';

import React from 'react';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
import { DEMO_EXPERIMENTS } from '@/lib/optimise/demo-optimise-data';

export default function ExperimentQueuePage() {
  const queued = DEMO_EXPERIMENTS.filter(e => e.state === 'READY' || e.state === 'APPROVAL_REQUIRED').sort((a, b) => b.priorityScore - a.priorityScore);

  return (
    <OptimiseShell>
      <div className="bg-[#0A0B0D] min-h-screen text-white p-8">
        <div className="mb-8 border-b border-white/10 pb-4">
          <h1 className="font-display text-2xl text-white tracking-[0.08em] font-bold">EXPERIMENT QUEUE</h1>
          <p className="text-gray-400 font-data">Ranked experiment candidate pipeline.</p>
        </div>

        <div className="mb-6 flex justify-between items-center bg-[#D6A84B]/10 border border-[#D6A84B]/30 p-4 rounded-xl shadow-lg">
          <span className="font-display text-[#D6A84B] text-sm tracking-wider">3 HIGH-PRIORITY EXPERIMENTS READY</span>
          <button className="bg-[#D6A84B] text-black font-display font-bold text-xs px-5 py-2.5 rounded hover:bg-[#c49842] transition-colors">
            APPROVE TOP 3 LOW-RISK EXPERIMENTS
          </button>
        </div>

        <div className="space-y-4">
          {queued.map((exp, idx) => (
            <div key={exp.id} className="industrial-panel bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6 shadow-xl flex items-center justify-between">
              <div className="flex items-center space-x-6 w-1/2">
                <div className="font-data text-2xl text-gray-500 font-bold w-8">#{idx + 1}</div>
                <div>
                  <h3 className="font-display text-white tracking-wide text-sm">{exp.hypothesis.statement}</h3>
                  <div className="text-gray-400 text-xs font-data mt-1">{exp.id} | {exp.subtype} | {exp.marketplaceName ?? exp.productName}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-8">
                 <div className="text-right">
                    <div className="text-[10px] font-display text-gray-500 tracking-wider">EXPECTED VALUE</div>
                    <div className="font-data text-[#22C55E]">£450 - £1.2k</div>
                 </div>
                 <div className="text-center">
                    <div className="text-[10px] font-display text-gray-500 tracking-wider mb-1">PRIORITY</div>
                    <div className={`font-data font-bold rounded px-2 py-0.5 inline-block text-xs ${exp.priorityScore > 80 ? 'bg-green-500/20 text-[#22C55E]' : 'bg-yellow-500/20 text-yellow-500'}`}>
                      {exp.priorityScore}
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] font-display text-gray-500 tracking-wider">DURATION</div>
                    <div className="font-data text-white">{exp.sampleRequirements?.minDurationDays ?? exp.minimumDurationDays}d / {exp.sampleRequirements?.minSampleTarget ?? exp.requiredSampleSize}</div>
                 </div>
                 <div className="text-center">
                   <div className="text-[10px] font-display text-gray-500 tracking-wider">RISK</div>
                   <div className="font-data text-[#38BDF8]">LOW</div>
                 </div>
              </div>

              <div className="flex space-x-2">
                <button className="bg-white/5 hover:bg-white/10 text-white font-display tracking-wider text-[10px] px-3 py-1.5 rounded border border-white/10 transition-colors">EDIT</button>
                <button className="bg-white/5 hover:bg-white/10 text-white font-display tracking-wider text-[10px] px-3 py-1.5 rounded border border-white/10 transition-colors">SNOOZE</button>
                <button className="bg-red-500/10 hover:bg-red-500/20 text-[#EF4444] font-display tracking-wider text-[10px] px-3 py-1.5 rounded border border-red-500/20 transition-colors">REJECT</button>
                <button className="bg-[#22C55E]/10 hover:bg-[#22C55E]/20 text-[#22C55E] font-display tracking-wider text-[10px] px-3 py-1.5 rounded border border-[#22C55E]/20 transition-colors">APPROVE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OptimiseShell>
  );
}
