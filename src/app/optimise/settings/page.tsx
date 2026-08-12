'use client';

import React from 'react';
import OptimiseShell from '@/components/optimise/OptimiseShell';

export default function SettingsPage() {
  return (
    <OptimiseShell header="OPTIMISATION ENGINE SETTINGS" description="Configure core statistical behavior and autonomy constraints.">
      <div className="space-y-6">
        
        {/* Core Statistical Engine */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6">
          <h2 className="font-display text-[#F5F6F7] text-sm font-bold tracking-[0.08em] mb-4">CORE STATISTICAL ENGINE</h2>
          
          <div className="space-y-5">
            <div>
              <label className="font-display text-xs text-[#A2A6AD] tracking-widest block mb-2">ENGINE MODE</label>
              <div className="flex gap-2">
                <button className="flex-1 bg-[#D6A84B]/10 border border-[#D6A84B] text-[#D6A84B] font-display text-sm py-2 rounded">BAYESIAN (DEFAULT)</button>
                <button className="flex-1 bg-[#0A0B0D] border border-white/10 text-[#A2A6AD] hover:bg-white/5 font-display text-sm py-2 rounded transition-colors">FREQUENTIST</button>
              </div>
              <p className="font-data text-xs text-[#626770] mt-2">Bayesian updates continuously. Frequentist waits for fixed horizon.</p>
            </div>

            <div>
              <label className="font-display text-xs text-[#A2A6AD] tracking-widest block mb-2">MINIMUM SAMPLE THRESHOLD</label>
              <input type="number" defaultValue={100} className="w-full bg-[#0A0B0D] border border-white/10 rounded p-2 font-data text-sm text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]/50" />
              <p className="font-data text-xs text-[#626770] mt-1">Visitors required before any interim analysis is permitted.</p>
            </div>
          </div>
        </div>

        {/* Strategy & Budget */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6">
          <h2 className="font-display text-[#F5F6F7] text-sm font-bold tracking-[0.08em] mb-4">STRATEGY & RISK</h2>
          
          <div className="space-y-5">
            <div>
              <label className="font-display text-xs text-[#A2A6AD] tracking-widest block mb-2">EXPLORATION VS EXPLOITATION</label>
              <select className="w-full bg-[#0A0B0D] border border-white/10 rounded p-2 font-data text-sm text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]/50 appearance-none">
                <option>BALANCED (60% Exploit / 40% Learn)</option>
                <option>CONSERVATIVE (80% Exploit / 20% Learn)</option>
                <option>AGGRESSIVE (40% Exploit / 60% Learn)</option>
              </select>
            </div>

            <div>
              <label className="font-display text-xs text-[#A2A6AD] tracking-widest block mb-2">DOWNSIDE BUDGET CEILING</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A2A6AD] font-data text-sm">£</span>
                <input type="number" defaultValue={500} className="w-full bg-[#0A0B0D] border border-white/10 rounded py-2 pl-7 pr-3 font-data text-sm text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]/50" />
              </div>
              <p className="font-data text-xs text-[#626770] mt-1">Maximum accepted revenue loss per month from exploratory testing.</p>
            </div>
          </div>
        </div>

        {/* AI Autonomy */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6">
          <h2 className="font-display text-[#F5F6F7] text-sm font-bold tracking-[0.08em] mb-4">AI AGENT AUTONOMY</h2>
          
          <div>
            <label className="font-display text-xs text-[#A2A6AD] tracking-widest block mb-2">DEFAULT AUTONOMY LEVEL</label>
            <div className="space-y-2">
              <label className="flex items-start gap-3 p-3 bg-[#0A0B0D] border border-white/10 rounded cursor-pointer hover:border-white/20 transition-colors">
                <input type="radio" name="autonomy" className="mt-1" />
                <div>
                  <div className="font-display text-sm text-[#F5F6F7]">ADVISE ONLY</div>
                  <div className="font-data text-xs text-[#626770]">AI generates ideas, human creates and launches tests.</div>
                </div>
              </label>
              <label className="flex items-start gap-3 p-3 bg-[#D6A84B]/10 border border-[#D6A84B]/40 rounded cursor-pointer">
                <input type="radio" name="autonomy" defaultChecked className="mt-1" />
                <div>
                  <div className="font-display text-sm text-[#D6A84B]">LAUNCH (PRE-APPROVED)</div>
                  <div className="font-data text-xs text-[#A2A6AD]">AI launches low-risk tests within guardrails automatically.</div>
                </div>
              </label>
              <label className="flex items-start gap-3 p-3 bg-[#0A0B0D] border border-white/10 rounded cursor-pointer hover:border-white/20 transition-colors">
                <input type="radio" name="autonomy" className="mt-1" />
                <div>
                  <div className="font-display text-sm text-[#F5F6F7]">FULL AUTOPILOT</div>
                  <div className="font-data text-xs text-[#626770]">AI manages entire pipeline, including risk budget allocation.</div>
                </div>
              </label>
            </div>
          </div>
        </div>

      </div>
    </OptimiseShell>
  );
}
