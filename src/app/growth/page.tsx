'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp, Zap, BarChart3, Users, DollarSign, Target, ShieldCheck,
  ChevronRight, ArrowRight, AlertTriangle, CheckCircle2, Clock, Sparkles,
  Layers, Search, Sliders, Play, RefreshCw, Eye, ArrowUpRight
} from 'lucide-react';
import {
  GROWTH_CHANNELS, GROWTH_CAMPAIGNS, DEMO_AFFILIATES, DEMO_LEAD_MAGNETS,
  DEMO_SEO_OPPORTUNITIES, DEMO_EFFECTIVE_SURFACE
} from '@/lib/growth/demo-growth-data';
import { identifyDemandGaps } from '@/lib/growth/demand-gap-engine';
import { growProduct, growTheMachine } from '@/lib/growth/flagship-actions';

function campaignStatusColor(status: string): string {
  const map: Record<string, string> = {
    RUNNING: '#22C55E', READY: '#38BDF8', COMPLETED: '#22C55E',
    DRAFT: '#D6A84B', PAUSED: '#F97316', STOPPED_OUT: '#EF4444',
  };
  return map[status] ?? '#6B7280';
}

export default function GrowthCommandControlRoom() {
  const [metricView, setMetricView] = useState<'NET_REVENUE' | 'ORDERS' | 'TRAFFIC'>('NET_REVENUE');
  const [showMachineDrawer, setShowMachineDrawer] = useState(false);

  const demandGaps = identifyDemandGaps();
  const growthPlan = growProduct('DD-HTT-001');
  const machinePlan = growTheMachine();

  const totalAttributedNetContribution = GROWTH_CAMPAIGNS.reduce((sum, c) => sum + c.netContributionGbp, 0);
  const totalNewCustomers = GROWTH_CAMPAIGNS.reduce((sum, c) => sum + c.newCustomersCount, 0);
  const runningCampaigns = GROWTH_CAMPAIGNS.filter(c => c.status === 'RUNNING').length;
  const activeAffiliates = DEMO_AFFILIATES.filter(a => a.pipelineStage === 'ACTIVE').length;

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* ── HEADER ── */}
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#22C55E]/30 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[#22C55E]" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-wider text-[#F5F6F7]">GROWTH COMMAND CONTROL ROOM</h1>
              <span className="font-data text-[10px] px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">REVENUE, NOT THEATRE</span>
            </div>
            <p className="font-data text-xs text-[#626770] tracking-wide">MEASURABLE · COMPLIANT · PROFITABLE COMMERCIAL ACQUISITION</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMachineDrawer(!showMachineDrawer)}
              className="flex items-center gap-2 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-[11px] font-bold px-4 py-2 rounded-lg transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              GROW THE MACHINE
            </button>
            <Link
              href="/growth/campaigns"
              className="flex items-center gap-2 bg-[#121418] hover:bg-[#17191E] border border-white/10 text-[#A2A6AD] font-display text-[11px] px-4 py-2 rounded-lg transition-colors"
            >
              CAMPAIGN FACTORY
            </Link>
          </div>
        </div>

        {/* ── TOP HERO INSTRUMENTATION ── */}
        <div className="grid grid-cols-8 gap-3">
          {[
            { label: 'NET CONTRIBUTION', value: `£${totalAttributedNetContribution.toLocaleString()}`, icon: DollarSign, color: '#22C55E' },
            { label: 'NEW CUSTOMERS', value: `${totalNewCustomers}`, icon: Users, color: '#38BDF8' },
            { label: 'ACTIVE CAMPAIGNS', value: `${runningCampaigns}`, icon: Target, color: '#D6A84B' },
            { label: 'ACTIVE AFFILIATES', value: `${activeAffiliates}`, icon: Users, color: '#818CF8' },
            { label: 'RAW RSA', value: `${DEMO_EFFECTIVE_SURFACE.rawRsaPct}%`, icon: Layers, color: '#626770' },
            { label: 'GROWTH ACTIVATED', value: `${DEMO_EFFECTIVE_SURFACE.growthActivatedRsaPct}%`, icon: TrendingUp, color: '#D6A84B' },
            { label: 'REVENUE GENERATING', value: `${DEMO_EFFECTIVE_SURFACE.revenueGeneratingRsaPct}%`, icon: DollarSign, color: '#22C55E' },
            { label: 'DEMAND GAPS', value: `${demandGaps.length}`, icon: AlertTriangle, color: '#F97316' },
          ].map(item => (
            <div key={item.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
              </div>
              <div className="font-data text-lg font-bold text-[#F5F6F7]">{item.value}</div>
              <div className="font-data text-[9px] text-[#626770] tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>

        {/* ── GROWTH FLOW HERO (§6) ── */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <div className="font-display text-xs tracking-wider text-[#A2A6AD]">COMMERCIAL TRAFFIC & REVENUE ROUTING FLOW</div>
            <div className="flex items-center gap-1 bg-[#121418] p-1 rounded-lg border border-white/10">
              {(['NET_REVENUE', 'ORDERS', 'TRAFFIC'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setMetricView(v)}
                  className={`px-3 py-1 rounded font-display text-[9px] ${metricView === v ? 'bg-[#D6A84B] text-[#0A0B0D] font-bold' : 'text-[#626770]'}`}
                >
                  {v.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3 text-center text-[10px]">
            <div className="bg-[#121418] border border-white/5 p-3 rounded-lg space-y-1">
              <div className="text-[#626770]">TRAFFIC SOURCES</div>
              <div className="font-bold text-[#F5F6F7]">Hotmart LatAm / Google SEO / Direct</div>
              <div className="text-[9px] text-[#38BDF8]">6,430 visits</div>
            </div>
            <div className="bg-[#121418] border border-white/5 p-3 rounded-lg space-y-1">
              <div className="text-[#626770]">LANDING SURFACES</div>
              <div className="font-bold text-[#F5F6F7]">Pre-Trade Checklist / Direct Store</div>
              <div className="text-[9px] text-[#38BDF8]">2,732 views</div>
            </div>
            <div className="bg-[#121418] border border-white/5 p-3 rounded-lg space-y-1">
              <div className="text-[#626770]">PRODUCTS</div>
              <div className="font-bold text-[#F5F6F7]">How to Trade (DD-HTT-001)</div>
              <div className="text-[9px] text-[#D6A84B]">272 orders</div>
            </div>
            <div className="bg-[#121418] border border-white/5 p-3 rounded-lg space-y-1">
              <div className="text-[#626770]">MARKETPLACES</div>
              <div className="font-bold text-[#F5F6F7]">Hotmart / Amazon / Direct Store</div>
              <div className="text-[9px] text-[#22C55E]">£7,140 Gross Revenue</div>
            </div>
            <div className="bg-[#121418] border border-[#22C55E]/30 p-3 rounded-lg space-y-1">
              <div className="text-[#22C55E] font-bold">NET CONTRIBUTION</div>
              <div className="font-bold text-[#22C55E] text-sm">£4,690 Net Contribution</div>
              <div className="text-[9px] text-[#22C55E]">Contribution ROAS: 9.8x</div>
            </div>
          </div>
        </div>

        {/* ── DEMAND GAPS & NEXT BEST ACTIONS ── */}
        <div className="grid grid-cols-12 gap-6 font-data text-xs">
          
          {/* Left: Identified Demand Gaps */}
          <div className="col-span-7 bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <span className="font-display text-xs tracking-wider text-[#F97316]">DEMAND GAPS (LIVE LISTINGS WITHOUT TRAFFIC)</span>
              <span className="text-[10px] text-[#626770]">{demandGaps.length} gaps identified</span>
            </div>
            <div className="space-y-3">
              {demandGaps.map(gap => (
                <div key={gap.id} className="bg-[#121418] border border-white/5 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-display text-sm font-bold text-[#F5F6F7]">{gap.productName}</div>
                    <span className="font-bold text-[#D6A84B]">{gap.marketplaceName}</span>
                  </div>
                  <div className="text-[10px] text-[#626770]">{gap.identifiedGapReason}</div>
                  <div className="bg-[#D6A84B]/10 border border-[#D6A84B]/20 p-2 rounded text-[10px] text-[#D6A84B]">
                    <strong>RECOMMENDED ACTION:</strong> {gap.recommendedAction}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Growth Subsystem Navigation */}
          <div className="col-span-5 space-y-3">
            <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-3">
              <div className="font-display text-xs tracking-wider text-[#626770]">GROWTH SUBSYSTEMS</div>
              <div className="space-y-2">
                {[
                  { title: 'CAMPAIGN FACTORY', href: '/growth/campaigns', desc: 'Objectives, Stop-Loss & Contribution ROAS', icon: Target, color: '#22C55E' },
                  { title: 'AFFILIATE COMMAND', href: '/growth/affiliates', desc: 'Recruitment Pipeline & Creative Packs', icon: Users, color: '#818CF8' },
                  { title: 'SEO COMMAND', href: '/growth/seo', desc: 'Owned Organic Acquisition & Topic Repurposing', icon: Search, color: '#38BDF8' },
                  { title: 'OWNED AUDIENCE', href: '/growth/audiences', desc: 'Lead Magnets & Free-to-Paid Funnels', icon: Layers, color: '#D6A84B' },
                  { title: 'CREATIVE LIBRARY', href: '/growth/creatives', desc: 'Compliance-Approved Asset Derivative Packs', icon: Eye, color: '#F97316' },
                ].map(sub => (
                  <Link key={sub.title} href={sub.href} className="flex items-center justify-between bg-[#121418] hover:bg-white/5 p-3 rounded-lg border border-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <sub.icon className="w-4 h-4" style={{ color: sub.color }} />
                      <div>
                        <div className="font-display text-xs font-bold text-[#F5F6F7]">{sub.title}</div>
                        <div className="text-[9px] text-[#626770]">{sub.desc}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#626770]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── GROW THE MACHINE DRAWER ── */}
        {showMachineDrawer && (
          <div className="bg-[#0E1014] border border-[#D6A84B]/40 rounded-xl p-5 space-y-4 font-data text-xs">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#D6A84B]" />
                <span className="font-display text-sm font-bold text-[#D6A84B]">PORTFOLIO GROWTH MACHINE PLAN (GROW THE MACHINE)</span>
              </div>
              <button onClick={() => setShowMachineDrawer(false)} className="text-[#626770] hover:text-[#F5F6F7]">CLOSE</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#121418] p-3 rounded border border-white/5 space-y-2">
                <div className="font-bold text-[#22C55E]">EASY WINS</div>
                {machinePlan.easyWins.map((item, i) => (
                  <div key={i} className="text-[10px] text-[#A2A6AD]">• {item}</div>
                ))}
              </div>
              <div className="bg-[#121418] p-3 rounded border border-white/5 space-y-2">
                <div className="font-bold text-[#818CF8]">AFFILIATE EXPANSION</div>
                {machinePlan.affiliateExpansion.map((item, i) => (
                  <div key={i} className="text-[10px] text-[#A2A6AD]">• {item}</div>
                ))}
              </div>
              <div className="bg-[#121418] p-3 rounded border border-white/5 space-y-2">
                <div className="font-bold text-[#38BDF8]">SEO & LOCALISATION</div>
                {machinePlan.seoOpportunities.concat(machinePlan.localisationLaunches).map((item, i) => (
                  <div key={i} className="text-[10px] text-[#A2A6AD]">• {item}</div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
