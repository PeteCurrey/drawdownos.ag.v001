'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { DEMO_DECISIONS } from '@/lib/executive/demo-executive-data';

export default function DecisionsPage() {
  const pathname = usePathname();

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'POSITIVE': return 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30';
      case 'NEGATIVE': return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30';
      case 'PENDING': return 'bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30';
      default: return 'bg-[#1C1F24] text-[#A2A6AD] border-white/10';
    }
  };

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[#F5F6F7] font-display text-lg font-bold">DECISION REGISTER — Commercial Learning System</h1>
            <p className="text-[#A2A6AD] text-sm">Every material decision tracked. Expected vs actual. Forecast accuracy improving over time.</p>
          </div>
          <button className="px-4 py-2 bg-[#D6A84B] text-[#0A0B0D] font-display text-xs font-bold rounded shadow-md hover:bg-[#e2b558] transition-colors">
            NEW DECISION
          </button>
        </div>

        <div className="industrial-panel p-4 flex gap-6 text-sm overflow-x-auto whitespace-nowrap">
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">DECISIONS TRACKED</span>
            <span className="text-[#F5F6F7] font-data text-lg">2</span>
          </div>
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">POSITIVE OUTCOMES</span>
            <span className="text-[#22C55E] font-data text-lg">1 (50%)</span>
          </div>
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">FORECAST ACCURACY</span>
            <span className="text-[#38BDF8] font-data text-lg">81% (average)</span>
          </div>
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">CEO APPROVAL RATE</span>
            <span className="text-[#D6A84B] font-data text-lg">100%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {DEMO_DECISIONS.map((decision) => (
              <div key={decision.id} className="industrial-panel p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-[#F5F6F7] font-bold text-base mb-2">{decision.title}</h3>
                    <div className="flex gap-2 text-[10px] font-data text-[#A2A6AD]">
                      <span className="bg-[#1C1F24] px-2 py-0.5 rounded border border-white/5">
                        Decided: {new Date(decision.decidedAt).toLocaleDateString()}
                      </span>
                      <span className="bg-[#1C1F24] px-2 py-0.5 rounded border border-white/5">
                        By: {decision.decidedBy}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-data px-2 py-0.5 rounded border ${getOutcomeColor(decision.outcome || 'PENDING')}`}>
                    {decision.outcome || 'PENDING'}
                  </span>
                </div>

                <div className="space-y-4 text-sm mb-4 border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[#626770] font-bold text-xs block mb-1">RATIONALE</span>
                    <p className="text-[#F5F6F7]">{decision.rationale}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 bg-[#1C1F24] p-3 rounded border border-white/5">
                    <div>
                      <span className="text-[#626770] font-bold text-xs block mb-1">EXPECTED RESULT</span>
                      <p className="text-[#A2A6AD] text-xs">{decision.expectedResultDescription}</p>
                      <span className="text-[#38BDF8] font-data font-bold block mt-1">£{decision.expectedImpactGbp.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[#626770] font-bold text-xs block mb-1">ACTUAL IMPACT</span>
                      <div className="flex items-center justify-between">
                        <span className="text-[#22C55E] font-data font-bold">
                          {decision.actualImpactGbp !== undefined ? `£${decision.actualImpactGbp.toLocaleString()}` : 'PENDING'}
                        </span>
                        {decision.forecastAccuracyPct !== undefined && (
                          <span className="text-[10px] font-data text-[#A2A6AD]">
                            Accuracy: {decision.forecastAccuracyPct}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-[#626770] font-bold text-xs block mb-1">OUTCOME NARRATIVE</span>
                  <p className="text-[#A2A6AD] mb-3">{decision.outcomeNarrative || 'Awaiting enough data to conclude outcome.'}</p>
                  <div className="text-[10px] font-data text-[#626770] flex gap-4">
                    <span>Review Date: {decision.reviewDate ? new Date(decision.reviewDate).toLocaleDateString() : 'N/A'}</span>
                    {decision.reviewedAt && <span>Reviewed: {new Date(decision.reviewedAt).toLocaleDateString()}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="industrial-panel p-5">
              <h3 className="text-[#F5F6F7] font-display text-sm mb-4">DECISION QUALITY</h3>
              
              <div className="space-y-4">
                <div className="bg-[#38BDF8]/5 border-l-2 border-[#38BDF8] p-3 text-sm">
                  <p className="text-[#F5F6F7]">Pricing recommendations have produced positive contribution changes in 71% of completed experiments.</p>
                </div>
                
                <div className="bg-[#22C55E]/5 border-l-2 border-[#22C55E] p-3 text-sm">
                  <p className="text-[#F5F6F7]">Distribution decisions have 88% forecast accuracy.</p>
                </div>
                
                <div className="p-4 bg-[#1C1F24] rounded border border-white/5 text-xs text-[#A2A6AD]">
                  <p>The system learns from past decisions to improve future recommendations. It heavily penalises confidence scores for action types with historically low forecast accuracy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExecutiveShell>
  );
}
