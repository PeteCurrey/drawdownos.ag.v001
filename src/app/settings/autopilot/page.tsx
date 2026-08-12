'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Settings, 
  ShieldCheck, 
  Lock, 
  Sliders, 
  AlertTriangle, 
  Check, 
  DollarSign, 
  Globe, 
  Zap, 
  ArrowLeft,
  Info,
  Server
} from 'lucide-react';
import { 
  DEFAULT_AUTOPILOT_POLICY, 
  PROHIBITED_CLASS_D_ACTIONS, 
  CONNECTOR_CERTIFICATIONS,
  AutopilotPolicyConfig,
  AutopilotMode
} from '@/lib/autopilot-data';

export default function AutopilotSettingsPage() {
  const [policy, setPolicy] = useState<AutopilotPolicyConfig>(DEFAULT_AUTOPILOT_POLICY);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggle = (key: keyof AutopilotPolicyConfig) => {
    setPolicy(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleModeChange = (newMode: AutopilotMode) => {
    setPolicy(prev => ({
      ...prev,
      mode: newMode,
      status: newMode === 'OFF' ? 'OFF' : newMode === 'AUTOPILOT' ? 'ACTIVE' : newMode,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/autopilot" className="text-[#626770] hover:text-[#F5F6F7] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">AUTOPILOT POLICY ENGINE & GUARDRAILS</h1>
            <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              CONFIGURABLE POLICY
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Define exactly what Autopilot may execute autonomously, configure commercial price & margin guardrails, and review prohibited actions.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md transition-colors"
        >
          <Check className="w-4 h-4 stroke-[3]" /> SAVE AUTOPILOT POLICY
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 text-xs font-data text-[#22C55E] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
          <span>Autopilot Policy & Commercial Guardrails saved successfully. Policy active across all dispatchers.</span>
        </div>
      )}

      {/* ── 1. SYSTEM OPERATING MODE SELECTOR (§2) ────── */}
      <div className="industrial-panel p-6 space-y-4 border-l-4 border-l-[#D6A84B]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#D6A84B]">
            <Sliders className="w-5 h-5" />
            <h2 className="font-display text-sm font-bold tracking-wider text-[#F5F6F7]">SYSTEM OPERATING MODE</h2>
          </div>
          <span className="text-[10px] font-data text-[#626770]">DEFAULT: ADVISORY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-data">
          {[
            { mode: 'OFF' as const, label: 'OFF', desc: 'Zero autonomous execution. Recommendations only.', color: 'border-white/10 text-[#626770]' },
            { mode: 'ADVISORY' as const, label: 'ADVISORY (Default)', desc: 'Autopilot creates action plans. Nothing executes automatically.', color: 'border-[#38BDF8]/40 text-[#38BDF8]' },
            { mode: 'ASSISTED' as const, label: 'ASSISTED', desc: 'Safe actions prepared. Pete approves each action or plan before execution.', color: 'border-[#D6A84B]/40 text-[#D6A84B]' },
            { mode: 'AUTOPILOT' as const, label: 'FULL AUTOPILOT', desc: 'Pre-approved Class A/B actions execute automatically within policies.', color: 'border-[#22C55E]/40 text-[#22C55E]' },
          ].map(m => {
            const isSelected = policy.mode === m.mode;
            return (
              <div
                key={m.mode}
                onClick={() => handleModeChange(m.mode)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? `bg-[#1C1F24] ${m.color} shadow-lg ring-1 ring-[#D6A84B]`
                    : 'bg-[#0D0E11] border-white/5 hover:border-white/20 text-[#A2A6AD]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-xs font-bold">{m.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#D6A84B]" />}
                </div>
                <p className="text-[11px] leading-relaxed mt-1">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 2. POLICY TOGGLES (§5) ────────────────────── */}
      <div className="industrial-panel p-6 space-y-4">
        <h2 className="font-display text-xs text-[#626770] tracking-wider uppercase">
          AUTOMATION PERMISSION TOGGLES (10 SPECIFIC RULES)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-data text-xs">
          {[
            { key: 'autoCreateListings', label: 'AUTOMATIC LISTING CREATION', desc: 'Allow Autopilot to automatically create new listings on certified marketplaces' },
            { key: 'autoUpdateListings', label: 'AUTOMATIC LISTING UPDATES', desc: 'Allow Autopilot to update existing listings with approved metadata' },
            { key: 'autoSyncPrices', label: 'AUTOMATIC PRICE SYNCHRONISATION', desc: 'Allow Autopilot to sync product prices across authorised channels within limits' },
            { key: 'autoActivateAggregators', label: 'AUTOMATIC AGGREGATOR ACTIVATION', desc: 'Allow Autopilot to enable approved aggregator destinations (PublishDrive / D2D)' },
            { key: 'autoRetryFailedJobs', label: 'AUTOMATIC FAILED-JOB RETRY', desc: 'Automatically retry transient API timeouts, rate-limits, and 5xx errors' },
            { key: 'autoSyncAssets', label: 'AUTOMATIC ASSET SYNCHRONISATION', desc: 'Sync approved PDF master files, EPUBs, and covers to connected endpoints' },
            { key: 'autoUpdateAffiliateAssets', label: 'AUTOMATIC AFFILIATE ASSET UPDATES', desc: 'Keep affiliate creative packs and promotional links synchronised' },
            { key: 'autoExecuteCampaigns', label: 'AUTOMATIC CAMPAIGN EXECUTION', desc: 'Launch pre-approved promotional discount campaigns on scheduled dates' },
            { key: 'autoPauseOnBlocking', label: 'AUTOMATIC MARKETPLACE PAUSE ON BLOCKING', desc: 'Automatically pause connected channel write operations if compliance issue opens' },
          ].map(item => {
            const val = policy[item.key as keyof AutopilotPolicyConfig] as boolean;
            return (
              <div key={item.key} className="p-4 bg-[#0D0E11] rounded-xl border border-white/5 flex items-start justify-between gap-3">
                <div>
                  <div className="font-bold text-[#F5F6F7]">{item.label}</div>
                  <div className="text-[10px] text-[#A2A6AD] mt-0.5">{item.desc}</div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggle(item.key as keyof AutopilotPolicyConfig)}
                  className={`w-12 h-6 rounded-full transition-colors p-0.5 flex items-center shrink-0 ${
                    val ? 'bg-[#22C55E]' : 'bg-[#1C1F24]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    val ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            );
          })}

          {/* Special Select Toggles: Derivative & Translation */}
          <div className="p-4 bg-[#0D0E11] rounded-xl border border-white/5 space-y-1">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-[#F5F6F7]">AUTOMATIC PRODUCT DERIVATIVE CREATION</div>
                <div className="text-[10px] text-[#A2A6AD]">Format factory & workbook generator rule</div>
              </div>
              <span className="text-[10px] font-display px-2 py-0.5 rounded bg-[#D6A84B]/10 text-[#D6A84B] border border-[#D6A84B]/30">
                DRAFT ONLY
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#0D0E11] rounded-xl border border-white/5 space-y-1">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-[#F5F6F7]">AUTOMATIC TRANSLATION</div>
                <div className="text-[10px] text-[#A2A6AD]">Never automatically publish AI-generated translations without human QA</div>
              </div>
              <span className="text-[10px] font-display px-2 py-0.5 rounded bg-[#D6A84B]/10 text-[#D6A84B] border border-[#D6A84B]/30">
                DRAFT ONLY
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. COMMERCIAL GUARDRAILS (§6) ──────────────── */}
      <div className="industrial-panel p-6 space-y-4">
        <div className="flex items-center gap-2 text-[#D6A84B]">
          <DollarSign className="w-5 h-5" />
          <h2 className="font-display text-xs text-[#F5F6F7] tracking-wider uppercase">
            COMMERCIAL FINANCIAL GUARDRAILS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-data text-xs">
          <div className="p-4 bg-[#0D0E11] rounded-xl border border-white/5 space-y-1">
            <label className="text-[10px] font-display text-[#626770]">MINIMUM PRODUCT PRICE</label>
            <div className="text-base font-bold text-[#F5F6F7]">£{policy.minProductPriceGbp.toFixed(2)}</div>
            <p className="text-[10px] text-[#A2A6AD]">Autopilot refuses price updates below this floor</p>
          </div>

          <div className="p-4 bg-[#0D0E11] rounded-xl border border-white/5 space-y-1">
            <label className="text-[10px] font-display text-[#626770]">MAX AUTONOMOUS DISCOUNT</label>
            <div className="text-base font-bold text-[#D6A84B]">{policy.maxAutonomousDiscountPct}%</div>
            <p className="text-[10px] text-[#A2A6AD]">Maximum promotional discount Autopilot can apply</p>
          </div>

          <div className="p-4 bg-[#0D0E11] rounded-xl border border-white/5 space-y-1">
            <label className="text-[10px] font-display text-[#626770]">MAX AUTONOMOUS PRICE DRIFT</label>
            <div className="text-base font-bold text-[#D6A84B]">{policy.maxAutonomousPriceChangePct}%</div>
            <p className="text-[10px] text-[#A2A6AD]">Maximum single price update percentage limit</p>
          </div>

          <div className="p-4 bg-[#0D0E11] rounded-xl border border-white/5 space-y-1">
            <label className="text-[10px] font-display text-[#626770]">MINIMUM NET MARGIN</label>
            <div className="text-base font-bold text-[#22C55E]">{policy.minNetMarginPct}%</div>
            <p className="text-[10px] text-[#A2A6AD]">Minimum net profit margin required per unit sold</p>
          </div>

          <div className="p-4 bg-[#0D0E11] rounded-xl border border-white/5 space-y-1">
            <label className="text-[10px] font-display text-[#626770]">MAXIMUM MARKETPLACE FEE</label>
            <div className="text-base font-bold text-[#EF4444]">{policy.maxMarketplaceFeePct}%</div>
            <p className="text-[10px] text-[#A2A6AD]">Refuse distribution to channels charging higher fees</p>
          </div>

          <div className="p-4 bg-[#0D0E11] rounded-xl border border-white/5 space-y-1">
            <label className="text-[10px] font-display text-[#626770]">MAX AFFILIATE COMMISSION</label>
            <div className="text-base font-bold text-[#D6A84B]">{policy.maxAffiliateCommissionPct}%</div>
            <p className="text-[10px] text-[#A2A6AD]">Maximum automated commission rate for affiliate networks</p>
          </div>
        </div>
      </div>

      {/* ── 4. CLASS D — PROHIBITED AUTONOMOUS ACTIONS (§4) ──── */}
      <div className="industrial-panel p-6 space-y-4 border-l-4 border-l-[#EF4444]">
        <div className="flex items-center gap-2 text-[#EF4444]">
          <Lock className="w-5 h-5" />
          <h2 className="font-display text-xs text-[#F5F6F7] tracking-wider uppercase">
            CLASS D — PERMANENTLY PROHIBITED AUTONOMOUS ACTIONS (HARD-BLOCKED IN CODE)
          </h2>
        </div>
        <p className="text-xs text-[#A2A6AD] font-data">
          Autopilot must NEVER execute any of the following actions autonomously under any settings configuration. These require explicit human action by Pete Currey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-data text-xs">
          {PROHIBITED_CLASS_D_ACTIONS.map((act, idx) => (
            <div key={idx} className="p-2.5 bg-[#0D0E11] rounded-lg border border-[#EF4444]/20 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#EF4444] shrink-0" />
              <span className="text-[#F5F6F7]">{act}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. CONNECTOR CERTIFICATION STATUS MATRIX (§53) ────── */}
      <div className="industrial-panel p-6 space-y-4">
        <div className="flex items-center gap-2 text-[#38BDF8]">
          <Server className="w-5 h-5" />
          <h2 className="font-display text-xs text-[#F5F6F7] tracking-wider uppercase">
            MARKETPLACE CONNECTOR CERTIFICATION MATRIX (§53)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-data text-xs">
            <thead className="bg-[#17191E] border-b border-white/10 font-display text-[10px] text-[#626770]">
              <tr>
                <th className="p-3">CONNECTOR</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">CAPABILITY</th>
                <th className="p-3">CREDS</th>
                <th className="p-3">IDEMPOTENT</th>
                <th className="p-3">ROLLBACK</th>
                <th className="p-3">LAST TESTED</th>
                <th className="p-3">NOTES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {CONNECTOR_CERTIFICATIONS.map((cert) => (
                <tr key={cert.marketplaceId} className="hover:bg-[#17191E] transition-colors">
                  <td className="p-3 font-bold text-[#F5F6F7]">{cert.name}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-display ${
                      cert.status === 'CERTIFIED' ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30' :
                      cert.status === 'TESTING' ? 'bg-[#D6A84B]/10 text-[#D6A84B] border border-[#D6A84B]/30' : 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30'
                    }`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="p-3">{cert.capabilityVerified ? '✓' : '✗'}</td>
                  <td className="p-3">{cert.credentialsTested ? '✓' : '✗'}</td>
                  <td className="p-3">{cert.idempotencyTested ? '✓' : '✗'}</td>
                  <td className="p-3">{cert.rollbackSupported ? '✓' : '✗'}</td>
                  <td className="p-3 text-[#626770]">{cert.lastTestedAt}</td>
                  <td className="p-3 text-[#A2A6AD]">{cert.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
