'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sliders, Globe, Package, Cpu, ShieldCheck, AlertTriangle,
  CheckCircle2, Clock, ChevronRight, Zap, ArrowRight, TrendingUp,
  BarChart3, FlaskConical, History, Eye, Play, Sparkles, Filter
} from 'lucide-react';
import {
  DEMO_LISTINGS, MARKETPLACE_PROFILES, MERCHANDISING_EXPERIMENTS,
  DRIFT_EVENTS, RECOMMENDATIONS, LISTING_PRICES
} from '@/lib/merchandising/demo-merchandising-data';
import { runTuneTheMachine, simulateMaximiseMerchandising, calculateEffectiveRevenueSurface } from '@/lib/merchandising/flagship-actions';

function statusColor(status: string): string {
  const map: Record<string, string> = {
    LIVE: '#22C55E', APPROVED: '#22C55E', PUBLISHED: '#22C55E', COMPLETED: '#22C55E', PASS: '#22C55E',
    RUNNING: '#D6A84B', OPTIMISING: '#D6A84B', GENERATING: '#D6A84B', LEARNING: '#D6A84B',
    STALE: '#F59E0B', DRIFTED: '#EF4444', NEEDS_REVIEW: '#F97316', REJECTED: '#EF4444', FAILED: '#EF4444',
    DRAFT: '#6B7280', PAUSED: '#6B7280',
  };
  return map[status] ?? '#6B7280';
}

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className="font-data text-[9px] px-2 py-0.5 rounded border"
      style={{ color: statusColor(status), borderColor: `${statusColor(status)}30`, backgroundColor: `${statusColor(status)}10` }}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
}

export default function MerchandisingCommandCentre() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'listings' | 'experiments' | 'drift' | 'tune'>('matrix');
  const [isTuningPlanOpen, setIsTuningPlanOpen] = useState(false);

  const totalListings = DEMO_LISTINGS.length;
  const liveListings = DEMO_LISTINGS.filter(l => l.status === 'LIVE').length;
  const staleListings = DEMO_LISTINGS.filter(l => l.status === 'STALE').length;
  const driftedListings = DEMO_LISTINGS.filter(l => l.isDrifted).length;
  const activeExperiments = MERCHANDISING_EXPERIMENTS.filter(e => e.status === 'RUNNING').length;
  const totalNetRevenue = DEMO_LISTINGS.reduce((sum, l) => sum + l.netRevenueGbp, 0);

  const effectiveSurface = calculateEffectiveRevenueSurface(64.0);
  const tunePlan = runTuneTheMachine();
  const maximisePlan = simulateMaximiseMerchandising('DD-HTT-001');

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* ── HEADER ── */}
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Sliders className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-wider text-[#F5F6F7]">AUTONOMOUS LISTING & MERCHANDISING ENGINE</h1>
              <span className="font-data text-[10px] px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">ACTIVE</span>
            </div>
            <p className="font-data text-xs text-[#626770] tracking-wide">CANONICAL PRODUCT VS CHANNEL LISTING · COMMERCIAL TUNING & TELEMETRY</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTuningPlanOpen(!isTuningPlanOpen)}
              className="flex items-center gap-2 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-[11px] font-bold px-4 py-2 rounded-lg transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              TUNE THE MACHINE
            </button>
            <Link
              href="/merchandising/listings"
              className="flex items-center gap-2 bg-[#121418] hover:bg-[#17191E] border border-white/10 text-[#A2A6AD] font-display text-[11px] px-4 py-2 rounded-lg transition-colors"
            >
              LISTINGS FACTORY
            </Link>
          </div>
        </div>

        {/* ── TOP HERO INSTRUMENTATION ── */}
        <div className="grid grid-cols-8 gap-3">
          {[
            { label: 'LIVE LISTINGS', value: `${liveListings}/${totalListings}`, icon: Globe, color: '#22C55E' },
            { label: 'NEEDS ACTION', value: (staleListings + driftedListings).toString(), icon: AlertTriangle, color: '#F97316' },
            { label: 'ACTIVE EXPERIMENTS', value: activeExperiments.toString(), icon: FlaskConical, color: '#818CF8' },
            { label: 'LISTING DRIFT', value: driftedListings.toString(), icon: AlertTriangle, color: '#EF4444' },
            { label: 'RAW RSA', value: `${effectiveSurface.rawRsaPct}%`, icon: Globe, color: '#38BDF8' },
            { label: 'EFFECTIVE RSA', value: `${effectiveSurface.effectivelyMerchandisedRsaPct}%`, icon: Sparkles, color: '#D6A84B' },
            { label: 'NET REVENUE', value: `£${totalNetRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`, icon: BarChart3, color: '#22C55E' },
            { label: 'AUTOPILOT POLICY', value: 'ASSISTED', icon: Cpu, color: '#D6A84B' },
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

        {/* ── FLAGSHIP TUNE THE MACHINE DRAWER / PANEL ── */}
        {isTuningPlanOpen && (
          <div className="bg-[#0E1014] border border-[#D6A84B]/40 rounded-xl p-5 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#D6A84B]" />
                <span className="font-display text-sm font-bold text-[#D6A84B] tracking-wider">TUNE THE MACHINE — PORTFOLIO MERCHANDISING ANALYSIS</span>
              </div>
              <button onClick={() => setIsTuningPlanOpen(false)} className="text-[#626770] hover:text-[#F5F6F7] text-xs font-data">CLOSE ✕</button>
            </div>
            <div className="grid grid-cols-4 gap-4 font-data text-xs">
              <div className="bg-[#121418] p-3 rounded-lg border border-white/5 space-y-1">
                <div className="text-[#626770] text-[9px]">SCANNED LISTINGS</div>
                <div className="text-[#F5F6F7] font-bold text-lg">{tunePlan.totalListingsScanned}</div>
              </div>
              <div className="bg-[#121418] p-3 rounded-lg border border-white/5 space-y-1">
                <div className="text-[#626770] text-[9px]">DRIFT FIXES READY</div>
                <div className="text-[#EF4444] font-bold text-lg">{tunePlan.driftFixesReady}</div>
              </div>
              <div className="bg-[#121418] p-3 rounded-lg border border-white/5 space-y-1">
                <div className="text-[#626770] text-[9px]">EST. NET REVENUE GAIN</div>
                <div className="text-[#22C55E] font-bold text-lg">+£{tunePlan.estimatedNetRevenueGainGbp}</div>
              </div>
              <div className="bg-[#121418] p-3 rounded-lg border border-white/5 space-y-1">
                <div className="text-[#626770] text-[9px]">APPROVALS REQUIRED</div>
                <div className="text-[#F97316] font-bold text-lg">{tunePlan.humanApprovalsRequired}</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-display text-xs text-[#A2A6AD]">PROPOSED ACTIONS</div>
              {tunePlan.recommendations.map(rec => (
                <div key={rec.id} className="flex items-center justify-between bg-[#121418] p-3 rounded-lg border border-white/5 font-data text-xs">
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#F5F6F7]">{rec.title}</div>
                    <div className="text-[#626770] text-[10px]">{rec.proposedAction}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#22C55E] font-bold">+{rec.estimatedImpactPts} pts</span>
                    <span className="text-[#626770]">{rec.requiresHumanApproval ? 'APPROVAL REQUIRED' : 'AUTOPILOT ELIGIBLE'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MERCHANDISING FLOW PIPELINE (INDUSTRIAL AESTHETIC) ── */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-3">
          <div className="font-display text-xs tracking-wider text-[#626770]">INDUSTRIAL MERCHANDISING PIPELINE</div>
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 font-data text-[9px]">
            {[
              { step: '01. CANONICAL PRODUCT', sub: 'Factory Metadata', color: '#D6A84B' },
              { step: '02. CHANNEL STRATEGY', sub: 'Target Positioning', color: '#818CF8' },
              { step: '03. COPY ENGINE', sub: 'Condensed Variants', color: '#38BDF8' },
              { step: '04. SEARCH INTENT', sub: 'Keyword Taxonomy', color: '#38BDF8' },
              { step: '05. GALLERY ASSETS', sub: 'Story Sequence', color: '#818CF8' },
              { step: '06. PRICE & OFFER', sub: 'Net Contribution', color: '#22C55E' },
              { step: '07. COMPLIANCE', sub: 'Zero Signals Pass', color: '#22C55E' },
              { step: '08. PUBLISH & VERIFY', sub: 'Live Telemetry', color: '#22C55E' },
              { step: '09. EXPERIMENT', sub: 'Net Revenue Winner', color: '#F97316' },
            ].map((s, i) => (
              <React.Fragment key={s.step}>
                <div className="bg-[#121418] border border-white/5 rounded-lg p-2.5 space-y-1 text-center shrink-0 min-w-36">
                  <div className="font-bold text-[#F5F6F7]">{s.step}</div>
                  <div className="text-[#626770] text-[8px]">{s.sub}</div>
                </div>
                {i < 8 && <ChevronRight className="w-3.5 h-3.5 text-[#626770] shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── TABS BAR ── */}
        <div className="flex items-center gap-1 bg-[#0E1014] border border-white/8 rounded-xl p-1 w-fit">
          {(['matrix', 'listings', 'experiments', 'drift', 'tune'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg font-display text-[10px] tracking-wider transition-all ${activeTab === tab ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30' : 'text-[#626770] hover:text-[#A2A6AD]'}`}
            >
              {tab === 'matrix' ? 'MERCHANDISING MATRIX' : tab === 'listings' ? 'CHANNEL LISTINGS' : tab === 'experiments' ? 'EXPERIMENT STUDIO' : tab === 'drift' ? 'LISTING DRIFT' : 'MAXIMISE HOW TO TRADE'}
            </button>
          ))}
        </div>

        {/* ── TAB CONTENT ── */}
        {activeTab === 'matrix' && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
              <span className="font-display text-xs tracking-wider text-[#A2A6AD]">MERCHANDISING MATRIX — PRODUCTS × MARKETPLACES</span>
              <Link href="/merchandising/matrix" className="font-display text-[10px] text-[#D6A84B] hover:text-[#e2b558] flex items-center gap-1">
                FULL POSITIONING MAP <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {DEMO_LISTINGS.map(lst => (
                <div key={lst.id} className="flex items-center gap-4 px-4 py-3 hover:bg-white/2 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: statusColor(lst.status) }} />
                  <div className="w-36 font-display text-xs font-bold text-[#F5F6F7]">{lst.marketplaceName}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-xs text-[#F5F6F7] truncate">{lst.productName}</div>
                    <div className="font-data text-[9px] text-[#626770]">SKU: {lst.productSku} · ID: {lst.externalListingId}</div>
                  </div>
                  <div className="w-28 text-center font-data text-xs">
                    <span className="text-[#626770]">Quality: </span>
                    <strong style={{ color: lst.listingQualityScore >= 85 ? '#22C55E' : '#D6A84B' }}>{lst.listingQualityScore}%</strong>
                  </div>
                  <div className="w-28 text-center font-data text-xs">
                    <span className="text-[#626770]">Conv: </span>
                    <strong className="text-[#22C55E]">{lst.conversionRatePct}%</strong>
                  </div>
                  <div className="w-28 text-right font-data text-xs font-bold text-[#F5F6F7]">
                    £{lst.netRevenueGbp.toFixed(2)}
                  </div>
                  <StatusPill status={lst.status} />
                  <Link href={`/merchandising/listings/${lst.id}`} className="font-display text-[9px] text-[#D6A84B] hover:text-[#e2b558] flex items-center gap-1">
                    DETAILS <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
              <span className="font-display text-xs tracking-wider text-[#A2A6AD]">ALL CHANNEL LISTINGS</span>
              <Link href="/merchandising/listings" className="font-display text-[10px] text-[#D6A84B] hover:text-[#e2b558]">OPEN LISTINGS FACTORY →</Link>
            </div>
            <div className="divide-y divide-white/5 font-data text-xs">
              {DEMO_LISTINGS.map(lst => (
                <div key={lst.id} className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-display text-sm font-bold text-[#F5F6F7]">{lst.productName}</div>
                    <div className="text-[10px] text-[#626770]">{lst.marketplaceName} · {lst.territoryId} · v{lst.listingVersion}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusPill status={lst.status} />
                    <Link href={`/merchandising/listings/${lst.id}`} className="bg-[#121418] hover:bg-[#17191E] border border-white/10 px-3 py-1.5 rounded text-[10px] text-[#A2A6AD]">
                      MANAGE LISTING
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experiments' && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
              <span className="font-display text-xs tracking-wider text-[#A2A6AD]">ACTIVE & RECENT EXPERIMENTS</span>
              <Link href="/merchandising/experiments" className="font-display text-[10px] text-[#D6A84B]">OPEN EXPERIMENT STUDIO →</Link>
            </div>
            <div className="divide-y divide-white/5 font-data text-xs p-4 space-y-3">
              {MERCHANDISING_EXPERIMENTS.map(exp => (
                <div key={exp.id} className="bg-[#121418] border border-white/5 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-[#F5F6F7]">{exp.experimentName}</span>
                    <StatusPill status={exp.status} />
                  </div>
                  <div className="text-[10px] text-[#A2A6AD] italic">&ldquo;{exp.hypothesis}&rdquo;</div>
                  <div className="flex items-center gap-4 text-[9px] text-[#626770]">
                    <span>Marketplace: <strong className="text-[#F5F6F7]">{exp.marketplaceName}</strong></span>
                    <span>Variable: <strong className="text-[#D6A84B]">{exp.variableTested}</strong></span>
                    <span>Success Metric: <strong className="text-[#22C55E]">{exp.successMetric}</strong></span>
                    {exp.winnerVariant && <span>Winner: <strong className="text-[#22C55E]">{exp.winnerVariant}</strong></span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'drift' && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl p-4 space-y-3">
            <div className="font-display text-xs tracking-wider text-[#EF4444]">LISTING DRIFT TELEMETRY</div>
            {DRIFT_EVENTS.map(drf => (
              <div key={drf.id} className="bg-[#121418] border border-[#EF4444]/30 rounded-lg p-4 font-data text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#EF4444]">{drf.marketplaceId.toUpperCase()} — {drf.fieldDrifted.toUpperCase()} DRIFT</span>
                  <span className="text-[9px] px-2 py-0.5 rounded border border-[#EF4444]/30 text-[#EF4444] bg-[#EF4444]/10">{drf.severity} SEVERITY</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-[10px]">
                  <div>
                    <div className="text-[#626770]">EXPECTED DRAWDOWN STATE</div>
                    <div className="text-[#22C55E] font-bold mt-0.5">{drf.expectedValue}</div>
                  </div>
                  <div>
                    <div className="text-[#626770]">LIVE MARKETPLACE STATE</div>
                    <div className="text-[#EF4444] font-bold mt-0.5">{drf.liveValue}</div>
                  </div>
                </div>
                <button className="bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/30 text-[#EF4444] text-[10px] font-bold px-3 py-1 rounded">
                  AUTOPILOT DRIFT REPAIR
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tune' && (
          <div className="bg-[#0E1014] border border-[#D6A84B]/30 rounded-xl p-5 space-y-4 font-data text-xs">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <span className="font-display text-sm text-[#D6A84B] font-bold tracking-wider">MAXIMISE HOW TO TRADE MERCHANDISING PLAN</span>
              <span className="text-[#22C55E] font-bold">POTENTIAL RSA UNLOCK: +{maximisePlan.totalUnlockPts} PTS</span>
            </div>
            <div className="space-y-2">
              {maximisePlan.rankedActions.map(act => (
                <div key={act.step} className="flex items-center justify-between bg-[#121418] p-3 rounded-lg border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#D6A84B] w-6">#{act.step}</span>
                    <div>
                      <div className="font-bold text-[#F5F6F7]">{act.channel} — {act.action}</div>
                      <div className="text-[10px] text-[#626770]">{act.reason}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[#22C55E] font-bold">+{act.impactPts} pts</span>
                    <span className="text-[#626770] text-[9px]">{act.requiresHumanApproval ? 'APPROVAL REQUIRED' : 'AUTOPILOT READY'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
