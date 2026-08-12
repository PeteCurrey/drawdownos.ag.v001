'use client';
import React from 'react';
import { ExecutivePriority } from '@/lib/executive/types';
import ConfidenceBadge from './ConfidenceBadge';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PriorityCardProps {
  priority: ExecutivePriority;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export default function PriorityCard({ priority, isExpanded, onToggleExpand }: PriorityCardProps) {
  const isPositive = priority.impact30DayLowGbp >= 0;
  
  return (
    <div className={`industrial-panel-elevated p-5 flex flex-col gap-4 border-l-2 ${isExpanded ? 'border-l-[#D6A84B] amber-glow-box' : 'border-l-transparent hover:border-l-[#D6A84B]/50'} transition-all duration-300`}>
      {/* Header / Collapsed view */}
      <div className="flex items-start justify-between cursor-pointer" onClick={onToggleExpand}>
        <div className="flex items-start gap-4 flex-1">
          <div className="text-3xl font-display text-[#D6A84B]/70 shrink-0 tabular-nums">
            {priority.rank.toString().padStart(2, '0')}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="font-display text-base text-[#F5F6F7]">{priority.title}</div>
            <div className="font-data text-xs text-[#A2A6AD]">{priority.subtitle}</div>
            
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <ConfidenceBadge level={priority.confidence} pct={priority.confidencePct} />
              <div className="font-data text-[10px] px-2 py-0.5 rounded bg-[#1C1F24] border border-white/10 uppercase text-[#A2A6AD]">
                {priority.category}
              </div>
              {priority.reversible ? (
                <div className="font-data text-[10px] px-2 py-0.5 rounded border border-[#22C55E]/30 text-[#22C55E]">REVERSIBLE</div>
              ) : (
                <div className="font-data text-[10px] px-2 py-0.5 rounded border border-[#D6A84B]/30 text-[#D6A84B]">APPROVAL REQUIRED</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className="flex flex-col items-end gap-1">
            <div className="text-[10px] text-[#626770] font-display">IMPACT</div>
            <div className={`font-data text-sm font-bold ${isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
              {isPositive ? '+' : ''}£{Math.abs(priority.impact30DayLowGbp).toLocaleString()} – £{Math.abs(priority.impact30DayHighGbp).toLocaleString()}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1 w-24">
            <div className="text-[10px] text-[#626770] font-display">PRIORITY SCORE</div>
            <div className="w-full h-1.5 bg-[#121418] rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-[#D6A84B] to-[#FF6A18]" 
                style={{ width: `${priority.priorityScore}%` }}
              />
            </div>
          </div>
          
          <button className="p-1 hover:text-white text-[#626770] transition-colors">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
          
          {/* Main Narrative */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 flex flex-col gap-4">
              <div>
                <h4 className="font-display text-[10px] text-[#A2A6AD] mb-2">WHY IT MATTERS</h4>
                <p className="text-sm text-[#F5F6F7] leading-relaxed">{priority.whyItMatters}</p>
              </div>
              <div className="p-4 bg-[#121418] border border-[#D6A84B]/20 rounded-lg">
                <h4 className="font-display text-[10px] text-[#D6A84B] mb-2">RECOMMENDED ACTION</h4>
                <p className="text-sm font-medium text-[#F5F6F7]">{priority.recommendedAction}</p>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-3 mt-2">
                {priority.actions.map((act, i) => (
                  <button 
                    key={i}
                    className={`px-4 py-2 text-xs font-display rounded-md transition-all ${
                      act.variant === 'primary' 
                        ? 'bg-[#D6A84B] text-black hover:bg-[#FF6A18]' 
                        : act.variant === 'danger'
                        ? 'bg-transparent border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10'
                        : act.variant === 'ghost'
                        ? 'text-[#626770] hover:text-[#A2A6AD]'
                        : 'bg-[#1C1F24] border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {act.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Evidence Sidebar */}
            <div className="col-span-1 flex flex-col gap-4">
              <div className="p-3 bg-[#0D0E11] rounded-lg border border-white/5">
                <h4 className="font-display text-[10px] text-[#626770] mb-3">SHOW EVIDENCE</h4>
                <div className="space-y-3 font-data text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#626770]">Source:</span>
                    <span className="text-[#A2A6AD] text-right">{priority.evidence.dataSource}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#626770]">Period:</span>
                    <span className="text-[#A2A6AD] text-right">{priority.evidence.dataPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#626770]">Baseline:</span>
                    <span className="text-[#A2A6AD] text-right truncate ml-2">{priority.evidence.baselineDescription}</span>
                  </div>
                  
                  <div className="pt-2 border-t border-white/10">
                    {priority.evidence.keyMetrics.map((km, i) => (
                      <div key={i} className="flex justify-between items-center mt-1.5">
                        <span className="text-[#A2A6AD]">{km.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">{km.value}</span>
                          {km.trend === 'UP' && <span className="text-[#22C55E]">↑</span>}
                          {km.trend === 'DOWN' && <span className="text-[#EF4444]">↓</span>}
                          {km.trend === 'FLAT' && <span className="text-[#626770]">→</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Score Decomposition Details */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-[10px] text-[#626770]">WHY IS THIS RANKED HERE?</h4>
            <div className="text-xs text-[#A2A6AD] mb-2">{priority.whyRankedHere}</div>
            <div className="grid grid-cols-7 gap-2">
              {Object.entries(priority.scoreComponents).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-1">
                  <div className="font-display text-[8px] text-[#626770] uppercase truncate">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  <div className="h-1 bg-[#121418] rounded-full overflow-hidden w-full">
                    <div className="h-full bg-white/20" style={{ width: `${value}%` }} />
                  </div>
                  <div className="font-data text-[9px] text-[#A2A6AD]">{Number(value).toFixed(0)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
