'use client';

import React from 'react';
import OptimiseShell from '@/components/optimise/OptimiseShell';

export default function GuardrailsPage() {
  const rules = [
    { name: 'Max Price Increase', value: '10%' },
    { name: 'Max Price Decrease', value: '10%' },
    { name: 'Refund Ceiling', value: '5.0%' },
    { name: 'Max Conversion Drop', value: '10%' },
  ];

  return (
    <OptimiseShell header="EXPERIMENT GUARDRAILS" description="Safety boundaries & automated hard stops.">
      <div className="space-y-6">
        
        {/* Guardrail Rules List */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6">
          <h2 className="font-display text-[#F5F6F7] text-lg font-bold tracking-[0.08em] mb-6">GLOBAL METRIC BOUNDARIES</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {rules.map(rule => (
              <div key={rule.name} className="bg-[#0A0B0D] p-4 rounded-lg border border-white/5 flex justify-between items-center">
                <span className="font-display text-sm text-[#A2A6AD] tracking-wider">{rule.name}</span>
                <span className="font-data text-[#D6A84B] text-lg">{rule.value}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#0A0B0D] p-5 rounded-lg border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <span className="font-display text-sm text-[#F5F6F7] tracking-wider">MAX DOWNSIDE BUDGET / MO</span>
              <span className="font-data text-[#F5F6F7] text-lg">£500</span>
            </div>
            <div className="w-full bg-[#1C1F24] h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-[#FF6A18] h-full" style={{ width: '28.4%' }} />
            </div>
            <div className="flex justify-between text-xs font-data">
              <span className="text-[#FF6A18]">Used: £142</span>
              <span className="text-[#22C55E]">Remaining: £358</span>
            </div>
          </div>
        </div>

        {/* Prohibited List */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6">
          <h2 className="font-display text-[#EF4444] text-lg font-bold tracking-[0.08em] mb-4">CLASS D ACTIONS (PERMANENTLY PROHIBITED)</h2>
          <div className="font-display text-sm text-[#A2A6AD] leading-relaxed">
            The optimization engine is permanently locked out of modifying:
            <ul className="list-disc pl-5 mt-3 space-y-2 text-[#F5F6F7]">
              <li>Legal Terms & Conditions</li>
              <li>Tax Configuration & Nexus Settings</li>
              <li>Banking & Payout Routing</li>
              <li>Master IP Content & Core Curriculum</li>
            </ul>
          </div>
        </div>

        {/* Active Breaches */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E]"></div>
            <h2 className="font-display text-[#F5F6F7] text-lg font-bold tracking-[0.08em]">ACTIVE BREACHES</h2>
          </div>
          <div className="mt-4 p-4 bg-[#22C55E]/5 border border-[#22C55E]/20 rounded-lg text-center">
            <span className="font-display text-sm text-[#22C55E]">0 ACTIVE BREACHES CURRENTLY DETECTED. SYSTEM SAFE.</span>
          </div>
        </div>

      </div>
    </OptimiseShell>
  );
}
