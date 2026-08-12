'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Cpu, ChevronRight, ShieldCheck, AlertTriangle, CheckCircle2, Sliders, Save
} from 'lucide-react';
import { DEFAULT_AUTOPILOT_POLICY } from '@/lib/merchandising/demo-merchandising-data';

export default function MerchandisingAutopilotSettings() {
  const [policy, setPolicy] = useState(DEFAULT_AUTOPILOT_POLICY);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1200px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/merchandising" className="hover:text-[#A2A6AD]">MERCHANDISING ENGINE</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">AUTOPILOT POLICY SETTINGS</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">MERCHANDISING AUTOPILOT CONTROLS</h1>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-[10px] font-bold px-4 py-2 rounded-lg transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            {saved ? 'POLICY SAVED!' : 'SAVE POLICY'}
          </button>
        </div>

        {/* Autopilot Safeguard Warning */}
        <div className="bg-[#0E1014] border border-[#D6A84B]/30 rounded-xl p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#D6A84B] shrink-0 mt-0.5" />
          <div className="space-y-1 font-data text-xs">
            <div className="font-display text-sm font-bold text-[#D6A84B]">AUTONOMOUS MERCHANDISING POLICY</div>
            <div className="text-[#A2A6AD]">
              Drawdown OS automatically performs repetitive, low-risk merchandising actions (drift repairs, keyword updates, price syncs within limits). High-consequence actions (new positioning, material price changes, new claims) permanently require explicit human approval.
            </div>
          </div>
        </div>

        {/* Toggles & Controls */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl p-6 space-y-6 font-data text-xs">
          <div className="font-display text-xs tracking-wider text-[#626770]">AUTONOMOUS REPAIR & SYNC CONTROLS</div>

          <div className="space-y-4">
            {[
              { key: 'autoRepairDrift', label: 'AUTO REPAIR LISTING DRIFT', desc: 'Automatically restore expected title/file/asset state when non-critical drift is detected.' },
              { key: 'autoUpdateKeywords', label: 'AUTO UPDATE APPROVED KEYWORDS', desc: 'Synchronise approved search keywords to marketplaces when intent data updates.' },
              { key: 'autoSyncPrice', label: 'AUTO SYNC APPROVED PRICES', desc: 'Sync approved price updates within autopilot floor boundaries.' },
              { key: 'autoEndPromotions', label: 'AUTO END SCHEDULED PROMOTIONS', desc: 'Automatically restore base price when scheduled promotional period expires.' },
              { key: 'autoDeployApprovedWinner', label: 'AUTO DEPLOY EXPERIMENT WINNER', desc: 'Automatically deploy experiment winners that pass compliance and guardrails.' },
              { key: 'autoUpdateApprovedAssets', label: 'AUTO UPDATE APPROVED ASSETS', desc: 'Automatically push newly approved gallery images from Product Factory.' },
            ].map(item => (
              <div key={item.key} className="flex items-start justify-between bg-[#121418] p-4 rounded-lg border border-white/5">
                <div className="space-y-1 max-w-xl">
                  <div className="font-display text-xs font-bold text-[#F5F6F7]">{item.label}</div>
                  <div className="text-[10px] text-[#626770]">{item.desc}</div>
                </div>
                <input
                  type="checkbox"
                  checked={policy[item.key as keyof typeof policy] as boolean}
                  onChange={e => setPolicy({ ...policy, [item.key]: e.target.checked })}
                  className="w-4 h-4 accent-[#D6A84B] rounded cursor-pointer mt-1"
                />
              </div>
            ))}
          </div>

          <div className="font-display text-xs tracking-wider text-[#626770] pt-4 border-t border-white/8">EXPERIMENT SAFETY LIMITS</div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#121418] p-4 rounded-lg border border-white/5 space-y-2">
              <label className="text-[10px] text-[#626770] font-bold">MAX CONCURRENT EXPERIMENTS</label>
              <input
                type="number"
                value={policy.maxConcurrentExperiments}
                onChange={e => setPolicy({ ...policy, maxConcurrentExperiments: parseInt(e.target.value) || 1 })}
                className="w-full bg-[#0A0B0D] border border-white/10 rounded p-2 text-xs text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]"
              />
            </div>
            <div className="bg-[#121418] p-4 rounded-lg border border-white/5 space-y-2">
              <label className="text-[10px] text-[#626770] font-bold">MAX PRICE VARIANCE (%)</label>
              <input
                type="number"
                value={policy.maxPriceVariancePct}
                onChange={e => setPolicy({ ...policy, maxPriceVariancePct: parseFloat(e.target.value) || 5 })}
                className="w-full bg-[#0A0B0D] border border-white/10 rounded p-2 text-xs text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]"
              />
            </div>
            <div className="bg-[#121418] p-4 rounded-lg border border-white/5 space-y-2">
              <label className="text-[10px] text-[#626770] font-bold">MIN TRAFFIC FOR EXPERIMENT</label>
              <input
                type="number"
                value={policy.minTrafficForExperiment}
                onChange={e => setPolicy({ ...policy, minTrafficForExperiment: parseInt(e.target.value) || 100 })}
                className="w-full bg-[#0A0B0D] border border-white/10 rounded p-2 text-xs text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
