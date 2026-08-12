'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { DEMO_INTERVENTION_RULES } from '@/lib/executive/demo-executive-data';

export default function InterventionsPage() {
  const pathname = usePathname();

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
      case 1: return 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30';
      case 2: return 'bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30';
      case 3: return 'bg-[#F97316]/10 text-[#F97316] border-[#F97316]/30';
      case 4: return 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30';
      case 5: return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6">
        <div>
          <h1 className="text-[#F5F6F7] font-display text-lg font-bold">INTERVENTION SYSTEM</h1>
          <p className="text-[#A2A6AD] text-sm">Configurable thresholds. Automatic detection. Classified response.</p>
        </div>

        <div className="industrial-panel p-4 flex flex-wrap gap-2 text-[10px] font-display">
          <span className="px-2 py-1 rounded border bg-gray-500/10 text-gray-400 border-gray-500/30">0=OBSERVE</span>
          <span className="px-2 py-1 rounded border bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30">1=WATCH</span>
          <span className="px-2 py-1 rounded border bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30">2=RECOMMEND</span>
          <span className="px-2 py-1 rounded border bg-[#F97316]/10 text-[#F97316] border-[#F97316]/30">3=REQUEST APPROVAL</span>
          <span className="px-2 py-1 rounded border bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30">4=AUTONOMOUS</span>
          <span className="px-2 py-1 rounded border bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30">5=EMERGENCY STOP</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-[#F5F6F7] font-display text-sm">ACTIVE TRIGGERS</h2>
          
          <div className="industrial-panel-elevated p-5 border-l-4 border-l-[#F97316] bg-gradient-to-r from-[#F97316]/5 to-transparent">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block text-[10px] font-display px-2 py-0.5 rounded border bg-[#F97316]/10 text-[#F97316] border-[#F97316]/30 mb-2 font-bold">
                  LEVEL 3: REQUEST APPROVAL
                </span>
                <h3 className="text-[#F5F6F7] font-bold text-base">Gumroad DE refund threshold breached (rsk-002)</h3>
              </div>
              <span className="text-[#A2A6AD] text-xs font-data">08:14 TODAY</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#1C1F24] p-3 rounded border border-white/5">
                <span className="text-[#626770] text-[10px] uppercase block mb-1">Rule</span>
                <span className="text-[#F5F6F7] font-data text-sm">refund_rate_pct &gt; 7.0%</span>
              </div>
              <div className="bg-[#1C1F24] p-3 rounded border border-[#EF4444]/30 bg-[#EF4444]/5">
                <span className="text-[#EF4444] text-[10px] uppercase block mb-1">Current Value</span>
                <span className="text-[#EF4444] font-data text-lg font-bold">8.2%</span>
              </div>
              <div className="bg-[#1C1F24] p-3 rounded border border-white/5">
                <span className="text-[#626770] text-[10px] uppercase block mb-1">Financial Exposure</span>
                <span className="text-[#F5F6F7] font-data text-sm font-bold">£4,500</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm font-data">
                <span className="text-[#626770]">Status: </span>
                <span className="text-[#F97316] font-bold animate-pulse">PENDING APPROVAL</span>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold rounded transition-colors">
                  APPROVE INTERVENTION (PAUSE TRAFFIC)
                </button>
                <button className="px-4 py-2 bg-[#1C1F24] hover:bg-white/10 text-[#F5F6F7] font-display text-xs font-bold border border-white/20 rounded transition-colors">
                  DISMISS
                </button>
                <button className="px-4 py-2 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-[#EF4444] font-display text-xs font-bold border border-[#EF4444]/30 rounded transition-colors">
                  ESCALATE
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="industrial-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#F5F6F7] font-display text-sm">INTERVENTION RULES</h2>
            <button className="px-4 py-2 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold rounded transition-colors">
              ADD RULE
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-[#626770] font-display text-xs border-b border-white/10">
                <tr>
                  <th className="py-3 px-2">RULE NAME</th>
                  <th className="py-3 px-2">METRIC</th>
                  <th className="py-3 px-2">THRESHOLD</th>
                  <th className="py-3 px-2">LEVEL</th>
                  <th className="py-3 px-2 text-center">ACTIVE</th>
                </tr>
              </thead>
              <tbody className="text-[#A2A6AD] font-data">
                {DEMO_INTERVENTION_RULES.map(rule => (
                  <tr key={rule.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-2 font-sans text-[#F5F6F7]">{rule.name}</td>
                    <td className="py-3 px-2">{rule.metric}</td>
                    <td className="py-3 px-2">{rule.threshold}</td>
                    <td className="py-3 px-2">
                      <span className={`text-[10px] font-display px-2 py-0.5 rounded border ${getLevelColor(rule.level)}`}>
                        LVL {rule.level}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <button className={`w-8 h-4 rounded-full relative transition-colors ${rule.isActive ? 'bg-[#22C55E]' : 'bg-[#1C1F24] border border-white/20'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${rule.isActive ? 'left-4' : 'left-0.5'}`} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-[#A2A6AD] font-display text-xs mb-3">INTERVENTION HISTORY</h2>
          <div className="bg-[#1C1F24] border border-white/10 p-4 rounded text-sm text-[#626770] italic">
            No recent intervention history. Current intervention is first recorded.
          </div>
        </div>

      </div>
    </ExecutiveShell>
  );
}
