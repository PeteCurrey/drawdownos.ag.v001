'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, ChevronRight, ShieldCheck, CheckCircle2, AlertTriangle, Sliders } from 'lucide-react';

export default function GrowthAutopilotSettingsPage() {
  const [policies, setPolicies] = useState({
    autoGenerateCampaignDrafts: true,
    autoBuildTrackingLinks: true,
    autoScheduleApprovedCampaigns: false, // Requires human signoff
    autoEndExpiredCampaigns: true,
    autoPauseStopLossBreach: true, // Emergency stop-loss enabled
    autoGenerateAffiliatePacks: true,
    autoReactivateAffiliates: false,
    autoGenerateSeoOpportunities: true,
    autoCreateContentDrafts: true,
  });

  const toggle = (key: keyof typeof policies) => {
    setPolicies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1200px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/settings" className="hover:text-[#A2A6AD]">SETTINGS</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">GROWTH AUTOPILOT POLICIES</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">GROWTH AUTOPILOT POLICY CONTROLS</h1>
            </div>
          </div>
          <Link href="/growth" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO GROWTH COMMAND
          </Link>
        </div>

        {/* Policy Toggles */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
          <div className="font-display text-xs tracking-wider text-[#626770] border-b border-white/8 pb-2">
            SAFE OPERATIONAL AUTOMATION vs MANDATORY HUMAN APPROVAL GATES
          </div>

          <div className="space-y-3">
            {[
              { key: 'autoGenerateCampaignDrafts', label: 'AUTO GENERATE CAMPAIGN DRAFTS', desc: 'Automatically draft campaign proposals when demand gaps are detected.', tier: 'SAFE' },
              { key: 'autoBuildTrackingLinks', label: 'AUTO BUILD TRACKING LINKS', desc: 'Automatically construct UTM parameters and branded short links.', tier: 'SAFE' },
              { key: 'autoPauseStopLossBreach', label: 'AUTO PAUSE STOP-LOSS BREACH', desc: 'Automatically pause paid campaigns if max spend or max CPA limits are exceeded.', tier: 'SAFE_SAFETY' },
              { key: 'autoGenerateAffiliatePacks', label: 'AUTO GENERATE AFFILIATE PACKS', desc: 'Automatically assemble compliance-cleared creative packs for new partners.', tier: 'SAFE' },
              { key: 'autoGenerateSeoOpportunities', label: 'AUTO GENERATE SEO OPPORTUNITIES', desc: 'Scrape canonical source IP to propose topic repurposing candidates.', tier: 'SAFE' },
              { key: 'autoScheduleApprovedCampaigns', label: 'AUTO SCHEDULE APPROVED CAMPAIGNS', desc: 'Automatically launch campaigns once approved by human/compliance.', tier: 'HUMAN_APPROVAL' },
              { key: 'autoReactivateAffiliates', label: 'AUTO REACTIVATE AFFILIATES', desc: 'Automatically send outreach emails to dormant affiliate partners.', tier: 'HUMAN_APPROVAL' },
            ].map(item => {
              const active = policies[item.key as keyof typeof policies];
              return (
                <div key={item.key} className="bg-[#121418] border border-white/5 rounded-lg p-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm font-bold text-[#F5F6F7]">{item.label}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${item.tier.startsWith('SAFE') ? 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30' : 'text-[#D6A84B] bg-[#D6A84B]/10 border-[#D6A84B]/30'}`}>
                        {item.tier.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#626770]">{item.desc}</div>
                  </div>
                  <button
                    onClick={() => toggle(item.key as keyof typeof policies)}
                    className={`w-12 h-6 rounded-full transition-colors relative border ${active ? 'bg-[#22C55E] border-[#22C55E]' : 'bg-[#1C1F24] border-white/10'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-[#0A0B0D] absolute top-1 transition-all ${active ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
