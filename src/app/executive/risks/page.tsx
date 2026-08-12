'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { DEMO_RISKS } from '@/lib/executive/demo-executive-data';

export default function RisksPage() {
  const pathname = usePathname();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30';
      case 'ESCALATED': return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30';
      case 'MITIGATED': return 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30';
      default: return 'bg-[#1C1F24] text-[#A2A6AD] border-white/10';
    }
  };

  const getVelocityColor = (velocity: string) => {
    switch (velocity) {
      case 'FAST': case 'IMMEDIATE': return 'text-[#EF4444]';
      case 'MEDIUM': return 'text-[#D6A84B]';
      case 'SLOW': return 'text-[#38BDF8]';
      default: return 'text-[#A2A6AD]';
    }
  };

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6">
        <div>
          <h1 className="text-[#F5F6F7] font-display text-lg font-bold">RISK REGISTER</h1>
          <p className="text-[#A2A6AD] text-sm">Material risks tracked, classified, and mitigated.</p>
        </div>

        <div className="industrial-panel p-4 flex gap-6 text-sm overflow-x-auto whitespace-nowrap border-l-4 border-l-[#EF4444]">
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">ACTIVE RISKS</span>
            <span className="text-[#D6A84B] font-data text-lg">{DEMO_RISKS.filter(r => r.status === 'ACTIVE').length}</span>
          </div>
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">ESCALATED</span>
            <span className="text-[#EF4444] font-data text-lg">{DEMO_RISKS.filter(r => r.status === 'ESCALATED').length}</span>
          </div>
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">MITIGATED</span>
            <span className="text-[#22C55E] font-data text-lg">{DEMO_RISKS.filter(r => r.status === 'MITIGATED').length}</span>
          </div>
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">TOTAL EXPOSURE</span>
            <span className="text-[#F5F6F7] font-data text-lg">
              £{DEMO_RISKS.filter(r => r.status !== 'MITIGATED').reduce((acc, curr) => acc + curr.exposureGbp, 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {DEMO_RISKS.map((risk) => (
              <div key={risk.id} className="industrial-panel p-5 relative">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block text-[10px] font-data px-2 py-0.5 rounded border border-white/10 bg-[#1C1F24] text-[#A2A6AD] mb-2 mr-2">
                      {risk.category}
                    </span>
                    <span className={`inline-block text-[10px] font-data px-2 py-0.5 rounded border ${getStatusColor(risk.status)} mb-2`}>
                      {risk.status}
                    </span>
                    <h3 className="text-[#F5F6F7] font-bold text-base">{risk.title}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[#626770] text-[10px] font-data block">EXPOSURE</span>
                    <span className="text-[#EF4444] font-data font-bold">£{risk.exposureGbp.toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-[#A2A6AD] text-sm mb-4">{risk.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                  <div>
                    <div className="flex justify-between text-[#626770] mb-1">
                      <span>Likelihood</span>
                      <span className="font-data">{risk.likelihood}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#1C1F24] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D6A84B]" style={{ width: `${risk.likelihood}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[#626770] mb-1">
                      <span>Impact</span>
                      <span className="font-data">{risk.impact}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#1C1F24] rounded-full overflow-hidden">
                      <div className="h-full bg-[#EF4444]" style={{ width: `${risk.impact}%` }} />
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C1F24] p-3 rounded border border-white/5 mb-4 text-xs">
                  <div className="mb-2">
                    <span className="text-[#626770]">Trigger: </span>
                    <span className="text-[#F5F6F7]">{risk.triggerCondition}</span>
                  </div>
                  <div>
                    <span className="text-[#626770]">Mitigation: </span>
                    <span className="text-[#A2A6AD]">{risk.mitigation}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-data">
                  <div className="flex gap-4">
                    <span className="text-[#626770]">Velocity: <span className={getVelocityColor(risk.velocity)}>{risk.velocity}</span></span>
                    <span className="text-[#626770]">Owner: <span className="text-[#F5F6F7]">{risk.owner}</span></span>
                    <span className="text-[#626770]">Review: <span className="text-[#F5F6F7]">{risk.reviewDate ? new Date(risk.reviewDate).toLocaleDateString() : 'N/A'}</span></span>
                  </div>
                  <div className="flex gap-2">
                    {risk.status !== 'ESCALATED' && (
                      <button className="px-2 py-1 bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30 hover:bg-[#EF4444]/20 rounded transition-colors">
                        ESCALATE
                      </button>
                    )}
                    {risk.status !== 'MITIGATED' && (
                      <button className="px-2 py-1 bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 hover:bg-[#22C55E]/20 rounded transition-colors">
                        MITIGATE
                      </button>
                    )}
                    <button className="px-2 py-1 bg-[#1C1F24] text-[#A2A6AD] hover:bg-white/10 border border-white/10 rounded transition-colors">
                      ACCEPT
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="industrial-panel p-5 sticky top-20">
              <h3 className="text-[#F5F6F7] font-display text-sm mb-4">RISK MATRIX</h3>
              
              <div className="relative aspect-square w-full bg-[#121418] border border-white/10 rounded-lg overflow-hidden text-[10px] font-data text-[#A2A6AD] p-6">
                {/* 5x5 Grid lines */}
                {[20, 40, 60, 80].map(val => (
                  <React.Fragment key={val}>
                    <div className="absolute left-0 right-0 h-px bg-white/5" style={{ bottom: `${val}%` }} />
                    <div className="absolute top-0 bottom-0 w-px bg-white/5" style={{ left: `${val}%` }} />
                  </React.Fragment>
                ))}
                
                {/* Axis Labels */}
                <div className="absolute bottom-1 right-2">Impact &rarr;</div>
                <div className="absolute top-2 left-1 rotate-90 origin-top-left">Likelihood &rarr;</div>

                {/* Risk Dots */}
                {DEMO_RISKS.map(risk => {
                  const xPos = risk.impact;
                  const yPos = risk.likelihood;
                  const color = risk.status === 'ACTIVE' ? '#D6A84B' : risk.status === 'ESCALATED' ? '#EF4444' : '#22C55E';
                  
                  return (
                    <div 
                      key={risk.id}
                      className="absolute w-3 h-3 rounded-full border border-white/50 shadow-[0_0_8px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-150 transition-transform z-10"
                      style={{
                        left: `calc(${xPos}% - 6px)`,
                        bottom: `calc(${yPos}% - 6px)`,
                        backgroundColor: color
                      }}
                      title={`${risk.title}\nImpact: ${risk.impact}%\nLikelihood: ${risk.likelihood}%`}
                    />
                  );
                })}

                {/* Background color zones */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#EF4444]/5 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#22C55E]/5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExecutiveShell>
  );
}
