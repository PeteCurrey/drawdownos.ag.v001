'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { DEMO_PREFERENCES } from '@/lib/executive/demo-executive-data';

export default function SettingsPage() {
  const pathname = usePathname();

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-[#F5F6F7] font-display text-lg font-bold">EXECUTIVE SETTINGS</h1>
          <p className="text-[#A2A6AD] text-sm">Configure intelligence, targets, weights, and reporting.</p>
        </div>

        {/* BUSINESS GOALS */}
        <div className="industrial-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#F5F6F7] font-display text-sm">BUSINESS GOALS</h2>
            <span className="text-[10px] text-[#626770] italic">Edit requires CEO approval</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-display text-[#A2A6AD] block mb-2">ANNUAL REVENUE TARGET</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#626770] font-data">£</span>
                <input 
                  type="text" 
                  readOnly 
                  value="120,000"
                  className="w-full bg-[#121418] border border-white/10 rounded p-2 pl-7 text-[#F5F6F7] font-data opacity-80 cursor-not-allowed focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-display text-[#A2A6AD] block mb-2">ANNUAL CONTRIBUTION TARGET</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#626770] font-data">£</span>
                <input 
                  type="text" 
                  readOnly 
                  value="55,000"
                  className="w-full bg-[#121418] border border-white/10 rounded p-2 pl-7 text-[#F5F6F7] font-data opacity-80 cursor-not-allowed focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-display text-[#A2A6AD] block mb-2">REFUND CEILING</label>
              <div className="relative">
                <input 
                  type="text" 
                  readOnly 
                  value="5.0"
                  className="w-full bg-[#121418] border border-white/10 rounded p-2 pr-7 text-[#F5F6F7] font-data opacity-80 cursor-not-allowed focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#626770] font-data">%</span>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-display text-[#A2A6AD] block mb-2">GROWTH TARGET (MoM)</label>
              <div className="relative">
                <input 
                  type="text" 
                  readOnly 
                  value="25"
                  className="w-full bg-[#121418] border border-white/10 rounded p-2 pr-7 text-[#F5F6F7] font-data opacity-80 cursor-not-allowed focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#626770] font-data">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* STRATEGY SETTINGS */}
        <div className="industrial-panel p-6">
          <h2 className="text-[#F5F6F7] font-display text-sm mb-6">STRATEGY SETTINGS</h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-display text-[#A2A6AD] block mb-2">RISK TOLERANCE</label>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#121418] border border-white/10 text-[#626770] rounded text-xs font-display">LOW</button>
                <button className="px-4 py-2 bg-[#D6A84B]/10 border border-[#D6A84B]/50 text-[#D6A84B] rounded text-xs font-display font-bold">BALANCED</button>
                <button className="px-4 py-2 bg-[#121418] border border-white/10 text-[#626770] rounded text-xs font-display">AGGRESSIVE</button>
              </div>
            </div>
            
            <div>
              <label className="text-[10px] font-display text-[#A2A6AD] block mb-2">TIME HORIZON</label>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#121418] border border-white/10 text-[#626770] rounded text-xs font-display">SHORT</button>
                <button className="px-4 py-2 bg-[#38BDF8]/10 border border-[#38BDF8]/50 text-[#38BDF8] rounded text-xs font-display font-bold">MEDIUM</button>
                <button className="px-4 py-2 bg-[#121418] border border-white/10 text-[#626770] rounded text-xs font-display">LONG</button>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-display text-[#A2A6AD] block mb-2">AUTONOMY MODE</label>
              <div className="flex items-center gap-4">
                <span className="text-[#D6A84B] font-display text-sm font-bold bg-[#1C1F24] px-4 py-2 border border-[#D6A84B]/30 rounded">OPERATOR</span>
                <a href="/executive/autonomy" className="text-[#38BDF8] text-xs hover:underline">Manage Autonomy Controls &rarr;</a>
              </div>
            </div>
          </div>
        </div>

        {/* PRIORITY SCORE WEIGHTS */}
        <div className="industrial-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#F5F6F7] font-display text-sm">PRIORITY SCORE WEIGHTS</h2>
            <span className="text-[10px] font-data text-[#22C55E]">TOTAL: 1.00 (VALID)</span>
          </div>
          
          <div className="space-y-6">
            {[
              { key: 'impact', label: 'Impact Weight', val: DEMO_PREFERENCES.priorityWeights.impact, desc: 'Favours high financial impact.' },
              { key: 'confidence', label: 'Confidence Weight', val: DEMO_PREFERENCES.priorityWeights.confidence, desc: 'Favours verified data.' },
              { key: 'urgency', label: 'Urgency Weight', val: DEMO_PREFERENCES.priorityWeights.urgency, desc: 'Favours time-critical items.' },
              { key: 'strategicFit', label: 'Strategic Fit Weight', val: DEMO_PREFERENCES.priorityWeights.strategicFit, desc: 'Favours alignment with CEO goals.' },
              { key: 'leverage', label: 'Leverage Weight', val: DEMO_PREFERENCES.priorityWeights.leverage, desc: 'Favours high ROI / reusable outputs.' }
            ].map(w => (
              <div key={w.key}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#F5F6F7] text-sm">{w.label}</span>
                  <span className="font-data text-[#D6A84B]">{w.val.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-[#121418] rounded-full overflow-hidden mb-1 border border-white/5">
                  <div className="h-full bg-[#D6A84B]" style={{ width: `${w.val * 100}%` }} />
                </div>
                <p className="text-[10px] text-[#626770] italic">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ALERT & REPORTING */}
        <div className="industrial-panel p-6">
          <h2 className="text-[#F5F6F7] font-display text-sm mb-6">ALERT & REPORTING</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#1C1F24] border border-white/5 rounded">
              <div>
                <h4 className="text-[#F5F6F7] text-sm">Daily Brief</h4>
                <p className="text-[#A2A6AD] text-xs">Morning summary of critical signals and autopilot actions.</p>
              </div>
              <button className="w-10 h-5 rounded-full relative bg-[#22C55E]">
                <div className="absolute top-0.5 w-4 h-4 rounded-full bg-[#0A0B0D] left-[22px]" />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#1C1F24] border border-white/5 rounded">
              <div>
                <h4 className="text-[#F5F6F7] text-sm">Weekly Review</h4>
                <p className="text-[#A2A6AD] text-xs">Comprehensive portfolio analysis and decision register update.</p>
              </div>
              <button className="w-10 h-5 rounded-full relative bg-[#22C55E]">
                <div className="absolute top-0.5 w-4 h-4 rounded-full bg-[#0A0B0D] left-[22px]" />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#1C1F24] border border-white/5 rounded">
              <div>
                <h4 className="text-[#F5F6F7] text-sm">Monthly Board Report</h4>
                <p className="text-[#A2A6AD] text-xs">PDF generation of full financial and strategic metrics.</p>
              </div>
              <button className="w-10 h-5 rounded-full relative bg-[#22C55E]">
                <div className="absolute top-0.5 w-4 h-4 rounded-full bg-[#0A0B0D] left-[22px]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </ExecutiveShell>
  );
}
