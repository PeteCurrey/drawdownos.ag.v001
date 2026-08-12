'use client';

import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { DEMO_OBJECTIVES } from '@/lib/executive/demo-executive-data';
import Link from 'next/link';

export default function ObjectivesPage() {
  const pathname = usePathname();

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* Header */}
        <header className="space-y-2 pb-4">
          <h1 className="text-3xl font-display text-white">OBJECTIVE ENGINE</h1>
          <p className="text-white/50 font-data text-sm">Issue natural-language objectives. The OS converts them into strategy.</p>
        </header>

        {/* ISSUE NEW OBJECTIVE */}
        <div className="industrial-panel p-6 space-y-6">
          <h2 className="text-sm font-display text-[#D6A84B]">ISSUE NEW OBJECTIVE</h2>
          <textarea 
            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white font-data text-sm focus:outline-none focus:border-[#D6A84B]/50 transition-colors"
            rows={4}
            placeholder="State your objective in plain English..."
            defaultValue="Maximise net contribution from How to Trade over 90 days without increasing refund rate"
          />
          
          <div className="space-y-3">
            <div className="text-xs font-display text-white/30">EXAMPLES</div>
            <div className="flex flex-wrap gap-2">
              {[
                'Grow US revenue by 30% without spending more than £1,000 on paid acquisition',
                'Generate £10,000 in monthly revenue from the current PDF catalogue',
                'Find the best five new marketplaces for How to Trade and launch controlled tests'
              ].map((ex, i) => (
                <button key={i} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-xs text-white/70 transition-colors border border-white/5">
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-white/10 pt-6">
            <div className="text-xs text-white/40 max-w-md">
              The Objective Engine will parse your request, generate a strategy tree, and highlight potential constraints or risks before execution.
            </div>
            <button className="px-6 py-2 bg-[#D6A84B] hover:bg-[#D6A84B]/90 text-black font-display text-sm rounded transition-colors">
              PARSE OBJECTIVE →
            </button>
          </div>
        </div>

        {/* OBJECTIVE PARSER PREVIEW */}
        <div className="industrial-panel border border-[#38BDF8]/30 p-6 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#38BDF8]/20 text-[#38BDF8] text-[10px] font-display rounded-bl-lg">
            PREVIEW
          </div>
          <h2 className="text-sm font-display text-white/70">PARSED INTERPRETATION <span className="text-white/40 font-data normal-case ml-2">— Review before generating strategy</span></h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-[10px] font-display text-white/50">GOAL</div>
              <div className="text-sm text-white">Maximise Net Contribution</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-display text-white/50">TARGET METRIC</div>
              <div className="text-sm text-white">£ Net Contribution</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-display text-white/50">SCOPE</div>
              <div className="text-sm text-[#38BDF8]">Product: How to Trade</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-display text-white/50">TIME HORIZON</div>
              <div className="text-sm text-white">90 Days</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-display text-white/50">CONSTRAINTS</div>
              <div className="text-sm text-[#EF4444]">Refund Rate ≤ Current (2.1%)</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-display text-white/50">RISK TOLERANCE</div>
              <div className="text-sm text-white">Moderate</div>
            </div>
            <div className="space-y-1 md:col-span-2">
              <div className="text-[10px] font-display text-white/50">AVAILABLE LEVERS</div>
              <div className="text-sm text-white/70">Price Optimization, Marketplace Expansion, Bundle Creation</div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button className="px-6 py-2 bg-[#38BDF8]/20 hover:bg-[#38BDF8]/30 text-[#38BDF8] border border-[#38BDF8]/50 font-display text-sm rounded transition-colors">
              GENERATE STRATEGY →
            </button>
          </div>
        </div>

        {/* ACTIVE OBJECTIVES */}
        <div className="space-y-4">
          <h2 className="text-sm font-display text-white/50 pl-1">ACTIVE OBJECTIVES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEMO_OBJECTIVES.map((obj) => {
              const formatCurrency = (val: number) => `£${val.toLocaleString()}`;
              const progressPct = (obj.currentValue / obj.targetValue) * 100;
              const isAtRisk = obj.status === 'AT_RISK';
              const isGreen = obj.status === 'ON_TRACK';
              const badgeColor = isGreen ? 'bg-[#22C55E]/20 text-[#22C55E]' : isAtRisk ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-[#D6A84B]/20 text-[#D6A84B]';

              return (
                <div key={obj.id} className="industrial-panel p-5 space-y-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-display ${badgeColor}`}>
                        {obj.status.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-data text-white/40">{obj.daysRemaining} days left</span>
                    </div>
                    <h3 className="text-lg text-white font-medium leading-tight mb-4">{obj.naturalLanguage}</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-data">
                        <span className="text-white/50">Progress</span>
                        <span className="text-white">{formatCurrency(obj.currentValue)} / {formatCurrency(obj.targetValue)} ({progressPct.toFixed(1)}%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full ${isGreen ? 'bg-[#22C55E]' : isAtRisk ? 'bg-[#EF4444]' : 'bg-[#D6A84B]'}`} style={{ width: `${progressPct}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-white/10 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] font-display text-white/40">PROBABILITY</div>
                        <div className={`text-xl font-data mt-0.5 ${obj.successProbabilityPct > 70 ? 'text-[#22C55E]' : 'text-[#D6A84B]'}`}>
                          {obj.successProbabilityPct}%
                        </div>
                        <div className="text-xs text-white/50 mt-1 line-clamp-1" title={obj.whyProbability}>{obj.whyProbability}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-display text-white/40">STRATEGY</div>
                        <div className="text-sm text-white mt-1">{obj.strategyElements.length} active initiatives</div>
                      </div>
                    </div>
                    
                    {obj.parsed.constraints.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {obj.parsed.constraints.map((c: any, i: number) => (
                          <div key={i} className={`px-2 py-1 rounded text-[10px] font-data border ${c.isViolated ? 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444]' : 'bg-white/5 border-white/10 text-white/50'}`}>
                            {c.metric} {c.operator} {c.value}
                          </div>
                        ))}
                      </div>
                    )}

                    <Link href={`/executive/objectives/${obj.id}`} className="block w-full text-center py-2 bg-white/5 hover:bg-white/10 rounded text-xs font-display text-white transition-colors">
                      OPEN COCKPIT →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ExecutiveShell>
  );
}
