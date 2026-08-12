import React from 'react';
import { Experiment } from '@/lib/optimise/types';
import { BayesianMeter } from './BayesianMeter';

interface ExperimentCardProps {
  experiment: Experiment;
  onAction?: (action: string) => void;
}

export function ExperimentCard({ experiment, onAction }: ExperimentCardProps) {
  const getGuardrailColor = (status: string) => {
    if (status === 'HEALTHY') return 'text-[#22C55E] border-[#22C55E]/30 bg-[#22C55E]/10';
    if (status === 'BREACHED') return 'text-[#EF4444] border-[#EF4444]/30 bg-[#EF4444]/10';
    return 'text-white/60 border-white/20';
  };

  return (
    <div className="bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-5 flex flex-col space-y-4">
      {/* Header section */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-display text-[10px] px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/80 uppercase">
              {experiment.type} • {experiment.subtype}
            </span>
            {experiment.priorityScore && (
              <span className="font-data text-xs px-2 py-0.5 rounded border border-[#D6A84B]/50 bg-[#D6A84B]/10 text-[#D6A84B]">
                PRIORITY: {experiment.priorityScore}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-white font-medium text-lg">{experiment.title ?? experiment.name}</h3>
            <p className="font-display text-[11px] text-white/50 tracking-widest mt-1 uppercase">
              {experiment.affectedEntity ?? experiment.hypothesis.affectedEntity}
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/10">
        <div>
          <span className="font-display text-[10px] text-white/40 mb-1 block">EXPECTED IMPACT</span>
          <div className="font-data text-sm text-[#22C55E]">
            {experiment.primaryMetric} : {experiment.impactRange?.low ?? experiment.hypothesis.expectedImpactLowGbp} - {experiment.impactRange?.high ?? experiment.hypothesis.expectedImpactHighGbp}
          </div>
        </div>
        <div className="flex flex-col justify-center">
           <BayesianMeter probWinPct={experiment.probWinPct ?? 0} label="PROBABILITY OF OUTPERFORMING" />
        </div>
      </div>

      {/* Status Indicators */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className={`font-display text-[10px] px-2 py-1 rounded border ${getGuardrailColor(experiment.guardrailStatus ?? (experiment.health === 'HEALTHY' ? 'HEALTHY' : 'UNKNOWN'))}`}>
            GUARDRAILS: {experiment.guardrailStatus ?? experiment.health}
          </span>
          {experiment.dataSufficiency && (
            <span className="font-display text-[10px] text-white/60">
              DATA: {experiment.dataSufficiency}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2 pt-2">
        <button 
          onClick={() => onAction && onAction('LAUNCH')}
          className="flex-1 bg-[#D6A84B] text-black font-display text-xs py-2 rounded hover:bg-[#E3B65B] transition-colors font-bold"
        >
          LAUNCH
        </button>
        <button 
          onClick={() => onAction && onAction('SIMULATE')}
          className="flex-1 bg-white/10 text-white font-display text-xs py-2 rounded border border-white/20 hover:bg-white/20 transition-colors"
        >
          SIMULATE
        </button>
        <button 
          onClick={() => onAction && onAction('REVIEW DESIGN')}
          className="flex-1 bg-white/10 text-white font-display text-xs py-2 rounded border border-white/20 hover:bg-white/20 transition-colors"
        >
          REVIEW DESIGN
        </button>
        <button 
          onClick={() => onAction && onAction('REJECT')}
          className="bg-transparent text-[#EF4444] border border-[#EF4444]/30 px-3 py-2 rounded hover:bg-[#EF4444]/10 transition-colors font-display text-xs"
        >
          REJECT
        </button>
      </div>
    </div>
  );
}
