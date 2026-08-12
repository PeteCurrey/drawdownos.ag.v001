'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { DEMO_OBJECTIVES } from '@/lib/executive/demo-executive-data';
import Link from 'next/link';

export default function ObjectiveCockpitPage({ params }: { params: Promise<{ id: string }> }) {
  const pathname = usePathname();
  const { id } = React.use(params);
  
  const objective = DEMO_OBJECTIVES.find(o => o.id === id);

  if (!objective) {
    return (
      <ExecutiveShell currentPath={pathname}>
        <div className="p-8 text-white/50">Objective not found.</div>
      </ExecutiveShell>
    );
  }

  const formatCurrency = (val: number) => `£${val.toLocaleString()}`;
  const isGreen = objective.successProbabilityPct >= 70;
  const isRed = objective.successProbabilityPct < 40;
  const probColor = isGreen ? 'text-[#22C55E]' : isRed ? 'text-[#EF4444]' : 'text-[#D6A84B]';

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* Breadcrumb */}
        <div className="text-xs font-display text-white/40 flex items-center gap-2">
          <Link href="/executive" className="hover:text-white transition-colors">EXECUTIVE</Link>
          <span>/</span>
          <Link href="/executive/objectives" className="hover:text-white transition-colors">OBJECTIVES</Link>
          <span>/</span>
          <span className="text-white/70">{objective.id}</span>
        </div>

        {/* Header */}
        <header className="space-y-4 pb-6 border-b border-white/10">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl md:text-3xl font-medium text-white max-w-3xl leading-snug">{objective.naturalLanguage}</h1>
            <span className={`px-3 py-1 rounded text-xs font-display shrink-0 ${
              objective.status === 'ON_TRACK' ? 'bg-[#22C55E]/20 text-[#22C55E]' : 
              objective.status === 'AT_RISK' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 
              'bg-[#D6A84B]/20 text-[#D6A84B]'
            }`}>
              {objective.status.replace('_', ' ')}
            </span>
          </div>
          <div className="text-xs font-data text-white/40">
            Created: 2026-07-01 • Last Review: Today
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* KEY METRICS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="industrial-panel p-4">
                <div className="text-[10px] font-display text-white/50 mb-1">TARGET</div>
                <div className="text-xl font-data text-white">{formatCurrency(objective.targetValue)}</div>
              </div>
              <div className="industrial-panel p-4">
                <div className="text-[10px] font-display text-white/50 mb-1">CURRENT ({((objective.currentValue/objective.targetValue)*100).toFixed(1)}%)</div>
                <div className="text-xl font-data text-white">{formatCurrency(objective.currentValue)}</div>
              </div>
              <div className="industrial-panel p-4">
                <div className="text-[10px] font-display text-white/50 mb-1">EXPECTED BY DEADLINE</div>
                <div className="text-xl font-data text-white/80">{formatCurrency(objective.targetValue * 0.92)}</div>
              </div>
              <div className="industrial-panel p-4">
                <div className="text-[10px] font-display text-white/50 mb-1">DAYS REMAINING</div>
                <div className="text-xl font-data text-white">{objective.daysRemaining}</div>
              </div>
            </div>

            {/* STRATEGY */}
            <div className="space-y-4">
              <h2 className="text-sm font-display text-white/50">OBJECTIVE STRATEGY — {objective.strategyElements.length} initiatives</h2>
              <div className="space-y-4">
                {objective.strategyElements.map((el, i) => (
                  <div key={i} className="industrial-panel p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium text-sm">{el.title}</h3>
                        <p className="text-white/50 text-xs italic mt-1">"{el.hypothesis}"</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-display text-white/70">
                        {el.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-white/5">
                      <div>
                        <div className="text-[10px] font-display text-white/40">IMPACT / COST</div>
                        <div className="text-xs font-data text-white mt-1">{formatCurrency(el.expectedImpactGbp)} / {formatCurrency(el.costGbp)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-display text-white/40">EFFORT / RISK</div>
                        <div className="text-xs font-data mt-1 flex items-center gap-2">
                          <span className="text-white">{el.effortHours}h</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                            el.risk === 'HIGH' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 
                            el.risk === 'MEDIUM' ? 'bg-[#D6A84B]/20 text-[#D6A84B]' : 
                            'bg-[#22C55E]/20 text-[#22C55E]'
                          }`}>{el.risk}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-display text-white/40">OWNER / AUTONOMY</div>
                        <div className="text-xs text-white mt-1 flex items-center gap-2">
                          <span className="capitalize">{el.ownerModule}</span>
                          <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] text-white/70">{el.autonomyStatus}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-display text-white/40">CONFIDENCE</div>
                        <div className="text-xs font-data text-[#38BDF8] mt-1">{el.confidence}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TREE */}
            <div className="industrial-panel p-6 space-y-4">
              <h2 className="text-sm font-display text-white/50">OBJECTIVE TREE</h2>
              <div className="font-data text-sm space-y-2 text-white/70 bg-white/5 p-4 rounded border border-white/5">
                <div className="text-white">{objective.naturalLanguage}</div>
                {objective.strategyElements.map((el, i) => (
                  <div key={i} className="pl-4">
                    <span className="text-white/30">↳</span> {el.ownerModule} lever <span className="text-white/30">→</span> <span className="text-white/90">{el.title}</span> <span className="text-[10px] text-white/40">({el.status})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* PROBABILITY OF SUCCESS */}
            <div className="industrial-panel p-6 space-y-4">
              <h2 className="text-sm font-display text-white/50">PROBABILITY OF SUCCESS</h2>
              <div className="text-center py-4">
                <div className={`text-6xl font-data ${probColor}`}>{objective.successProbabilityPct}%</div>
                <div className="text-sm text-white/70 mt-4 px-2">{objective.whyProbability}</div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="h-2 w-full bg-white/10 rounded-full relative">
                  <div className={`absolute top-0 left-0 h-full rounded-full ${probColor}`} style={{ width: `${(objective.currentValue/objective.targetValue)*100}%` }} />
                  <div className="absolute top-1/2 -translate-y-1/2 w-1 h-3 bg-white" style={{ left: '92%' }} title="Expected" />
                </div>
                <div className="flex justify-between text-[10px] font-data text-white/40 mt-2">
                  <span>£0</span>
                  <span>Target {formatCurrency(objective.targetValue)}</span>
                </div>
              </div>
            </div>

            {/* CONSTRAINTS MONITOR */}
            <div className="industrial-panel p-6 space-y-4">
              <h2 className="text-sm font-display text-white/50">CONSTRAINTS MONITOR</h2>
              <div className="space-y-3">
                {objective.parsed.constraints.map((c: any, i: number) => (
                  <div key={i} className={`p-3 rounded border ${c.isViolated ? 'bg-[#EF4444]/10 border-[#EF4444]/30' : 'bg-white/5 border-white/10'}`}>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/70">{c.metric}</span>
                      <span className={`font-data ${c.isViolated ? 'text-[#EF4444]' : 'text-white'}`}>
                        {c.operator} {c.value}
                      </span>
                    </div>
                    {c.isViolated && (
                      <div className="text-xs text-[#EF4444] mt-2 border-t border-[#EF4444]/20 pt-2">
                        Constraint breached. Adjusting strategy logic.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="industrial-panel p-6 space-y-4">
              <h2 className="text-sm font-display text-white/50">QUICK ACTIONS</h2>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm rounded transition-colors">
                  + ADD STRATEGY ELEMENT
                </button>
                <button className="w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm rounded transition-colors">
                  ✎ MODIFY OBJECTIVE
                </button>
                <button className="w-full text-left px-4 py-2 bg-[#D6A84B]/10 hover:bg-[#D6A84B]/20 text-[#D6A84B] border border-[#D6A84B]/30 text-sm rounded transition-colors">
                  ⏸ PAUSE OBJECTIVE
                </button>
                <button className="w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 text-sm rounded transition-colors">
                  ↓ EXPORT BRIEF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExecutiveShell>
  );
}
