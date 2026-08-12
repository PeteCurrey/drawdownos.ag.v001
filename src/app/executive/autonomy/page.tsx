'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { DEMO_PREFERENCES, DEMO_GUARDRAILS } from '@/lib/executive/demo-executive-data';

export default function AutonomyPage() {
  const pathname = usePathname();
  const currentMode = DEMO_PREFERENCES.autonomyMode;

  const getGuardrailTypeColor = (type: string) => {
    switch (type) {
      case 'FINANCIAL_LIMIT': return 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30';
      case 'APPROVAL_REQUIRED': return 'bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30';
      case 'PERMANENTLY_PROHIBITED': return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6">
        <div>
          <h1 className="text-[#F5F6F7] font-display text-lg font-bold">AUTONOMY CONTROLS</h1>
          <p className="text-[#A2A6AD] text-sm">Define where the OS acts, where it recommends, and where it stops.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { id: 'OBSERVER', name: 'OBSERVER', desc: 'OS analyses only. No action.', color: 'gray-400' },
            { id: 'ADVISER', name: 'ADVISER', desc: 'OS recommends. You decide everything.', color: '[#38BDF8]' },
            { id: 'OPERATOR', name: 'OPERATOR', desc: 'OS executes low-risk actions within guardrails.', color: '[#D6A84B]', active: true },
            { id: 'AUTOPILOT', name: 'AUTOPILOT', desc: 'OS executes within strategic and financial boundaries.', color: '[#22C55E]' },
            { id: 'CUSTOM', name: 'CUSTOM', desc: 'Granular permission control.', color: '[#818CF8]' }
          ].map(mode => (
            <div 
              key={mode.id} 
              className={`p-4 rounded-xl border ${mode.active ? `bg-${mode.color}/10 border-${mode.color}/50 shadow-[0_0_15px_rgba(214,168,75,0.2)]` : 'bg-[#1C1F24] border-white/5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer'}`}
            >
              <h3 className={`font-display text-sm font-bold mb-2 ${mode.active ? `text-${mode.color}` : 'text-[#A2A6AD]'}`}>
                {mode.name}
              </h3>
              <p className="text-xs text-[#A2A6AD]">{mode.desc}</p>
            </div>
          ))}
        </div>

        <div className="industrial-panel p-6">
          <h2 className="text-[#F5F6F7] font-display text-sm mb-6">GUARDRAILS</h2>
          <div className="space-y-3 mb-8">
            {DEMO_GUARDRAILS.map(guardrail => (
              <div key={guardrail.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-[#1C1F24] border border-white/5 rounded gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-[9px] font-display px-2 py-0.5 rounded border ${getGuardrailTypeColor(guardrail.type)}`}>
                      {guardrail.type.replace('_', ' ')}
                    </span>
                    <h4 className="text-[#F5F6F7] font-bold text-sm">{guardrail.name}</h4>
                  </div>
                  <p className="text-[#A2A6AD] text-xs">{guardrail.description}</p>
                </div>
                
                <div className="flex items-center gap-6">
                  {guardrail.value !== undefined && (
                    <div className="text-right">
                      <span className="text-[#626770] font-data text-[10px] block">LIMIT</span>
                      <span className="text-[#F5F6F7] font-data font-bold">
                        {typeof guardrail.value === 'number' && guardrail.type === 'FINANCIAL_LIMIT' ? `£${guardrail.value}` : guardrail.value}
                      </span>
                    </div>
                  )}
                  <button className={`w-10 h-5 rounded-full relative transition-colors ${guardrail.isActive ? 'bg-[#D6A84B]' : 'bg-[#121418] border border-white/20'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-[#0A0B0D] transition-all ${guardrail.isActive ? 'left-5.5 right-0.5' : 'left-0.5'}`} style={guardrail.isActive ? { left: '22px' } : { left: '2px' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-2 border-[#EF4444]/30 bg-[#EF4444]/5 p-5 rounded-lg">
            <h3 className="text-[#EF4444] font-display text-sm font-bold mb-3">CLASS D ACTIONS — PERMANENTLY PROHIBITED</h3>
            <p className="text-[#F5F6F7] text-sm mb-4">The following actions are <strong className="text-[#EF4444]">PERMANENTLY PROHIBITED</strong> from autonomous execution:</p>
            <ul className="list-disc pl-5 text-[#A2A6AD] text-sm space-y-2">
              <li>Accepting legal terms, contracts, KYC documents</li>
              <li>Changing tax configuration or banking details</li>
              <li>Modifying source documents or master IP assets</li>
              <li>Authorising cash movements outside stated rules</li>
              <li>Altering refund policy</li>
            </ul>
          </div>
        </div>

        <div className="industrial-panel p-6">
          <h2 className="text-[#F5F6F7] font-display text-sm mb-4">AUTOMATION STATISTICS (THIS MONTH)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#1C1F24] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] font-display uppercase block mb-1">Tasks Automated</span>
              <span className="text-[#F5F6F7] font-data text-2xl font-bold">67</span>
            </div>
            <div className="p-4 bg-[#1C1F24] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] font-display uppercase block mb-1">Hours Avoided</span>
              <span className="text-[#38BDF8] font-data text-2xl font-bold">14.2h</span>
            </div>
            <div className="p-4 bg-[#1C1F24] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] font-display uppercase block mb-1">Value Created (Est.)</span>
              <span className="text-[#22C55E] font-data text-2xl font-bold">£2,840</span>
            </div>
            <div className="p-4 bg-[#1C1F24] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] font-display uppercase block mb-1">Success Rate</span>
              <span className="text-[#D6A84B] font-data text-2xl font-bold">95.5%</span>
              <span className="text-[#A2A6AD] text-[10px] block mt-1">3 failures (escalated)</span>
            </div>
          </div>
        </div>
      </div>
    </ExecutiveShell>
  );
}
