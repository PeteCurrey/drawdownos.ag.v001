'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Factory, BookOpen, Layers, Package, Cpu, AlertTriangle,
  CheckCircle2, Clock, ChevronRight, Zap, Globe, ArrowRight,
  TrendingUp, Play, BarChart3, GitBranch, Star, FlaskConical,
} from 'lucide-react';
import {
  HOW_TO_TRADE, HOW_TO_TRADE_FAMILY, IP_YIELD,
  NEXT_FACTORY_JOBS, FACTORY_JOBS, QA_REVIEWS, PRODUCT_OPPORTUNITIES,
  PRODUCT_BOMS, PRODUCT_LADDER,
} from '@/lib/factory/demo-factory-data';

// ─── COLOUR HELPERS ───────────────────────────────────────────────────────────

function statusColor(status: string): string {
  const map: Record<string, string> = {
    COMPLETE: '#22C55E', APPROVED: '#22C55E', APPROVED_FOR_SALE: '#22C55E', LIVE: '#22C55E', PUBLISHED: '#22C55E',
    RUNNING: '#D6A84B', GENERATING: '#D6A84B', IN_FACTORY: '#D6A84B', VALIDATING: '#D6A84B',
    WAITING_HUMAN: '#F97316', NEEDS_QA: '#F97316', AWAITING_QA: '#F97316',
    FAILED: '#EF4444', REJECTED: '#EF4444',
    QUEUED: '#6B7280', NOT_REQUIRED: '#6B7280', DORMANT: '#6B7280',
    OPPORTUNITY: '#818CF8', REVIEWING: '#818CF8',
    STALE: '#F59E0B',
    READY: '#38BDF8', APPROVED_FOR_DEVELOPMENT: '#38BDF8',
  };
  return map[status] ?? '#6B7280';
}

function effortBadge(effort: string): string {
  if (effort === 'LOW') return 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20';
  if (effort === 'MEDIUM') return 'text-[#D6A84B] bg-[#D6A84B]/10 border-[#D6A84B]/20';
  return 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20';
}

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────

function IPYieldDial({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;
  const gap = circumference - dash;
  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="#1C1F24" strokeWidth="10" />
        <circle
          cx="64" cy="64" r={radius} fill="none"
          stroke={score >= 70 ? '#22C55E' : score >= 45 ? '#D6A84B' : '#EF4444'}
          strokeWidth="10"
          strokeDasharray={`${dash} ${gap}`}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-data text-3xl font-bold text-[#F5F6F7]">{score}</span>
        <span className="font-data text-[9px] text-[#626770] uppercase tracking-widest">IP YIELD</span>
      </div>
    </div>
  );
}

function FactoryFlowDiagram() {
  const stages = [
    { label: 'MASTER', color: '#22C55E', active: true },
    { label: 'CONTENT', color: '#22C55E', active: true },
    { label: 'PRODUCT', color: '#22C55E', active: true },
    { label: 'FORMAT', color: '#D6A84B', active: true },
    { label: 'ASSETS', color: '#D6A84B', active: true },
    { label: 'QA', color: '#F97316', active: true },
    { label: 'DIST.', color: '#6B7280', active: false },
    { label: 'REVENUE', color: '#6B7280', active: false },
  ];

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {stages.map((stage, i) => (
        <React.Fragment key={stage.label}>
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: stage.color,
                boxShadow: stage.active ? `0 0 8px ${stage.color}` : 'none',
              }}
            />
            <span className="font-data text-[8px] text-[#626770] tracking-wider whitespace-nowrap">{stage.label}</span>
          </div>
          {i < stages.length - 1 && (
            <div className="h-px w-6 shrink-0" style={{ backgroundColor: stages[i + 1].active ? '#2A2D33' : '#1C1F24' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
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

function LadderTierBadge({ tier }: { tier: string }) {
  const colors: Record<string, string> = {
    FREE: '#6B7280', ENTRY: '#38BDF8', CORE: '#818CF8', FLAGSHIP: '#D6A84B', BUNDLE: '#22C55E',
  };
  return (
    <span className="font-data text-[9px] px-2 py-0.5 rounded border" style={{ color: colors[tier] ?? '#6B7280', borderColor: `${colors[tier] ?? '#6B7280'}30`, backgroundColor: `${colors[tier] ?? '#6B7280'}10` }}>
      {tier}
    </span>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function FactoryDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'queue' | 'opportunities' | 'ladder' | 'next'>('overview');

  const runningJobs = FACTORY_JOBS.filter(j => j.status === 'RUNNING').length;
  const waitingJobs = FACTORY_JOBS.filter(j => j.status === 'WAITING_HUMAN').length;
  const completedJobs = FACTORY_JOBS.filter(j => j.status === 'COMPLETE').length;
  const pendingQA = QA_REVIEWS.filter(q => q.status === 'PENDING' || q.status === 'IN_REVIEW').length;

  const approvedOpportunities = PRODUCT_OPPORTUNITIES.filter(o => o.backlogStatus === 'APPROVED').length;
  const mainBOM = PRODUCT_BOMS['DD-HTT-001'];

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* ── HEADER ── */}
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Factory className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-wider text-[#F5F6F7]">PRODUCT FACTORY</h1>
              <span className="font-data text-[10px] px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">ACTIVE</span>
            </div>
            <p className="font-data text-xs text-[#626770] tracking-wide">CREATE ONCE. STRUCTURE ONCE. PACKAGE MANY WAYS. DISTRIBUTE EVERYWHERE IT MAKES COMMERCIAL SENSE.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/factory/pub-dd-htt-001"
              className="flex items-center gap-2 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-[11px] font-bold px-4 py-2 rounded-lg transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              HOW TO TRADE
            </Link>
            <button className="flex items-center gap-2 bg-[#121418] hover:bg-[#17191E] border border-white/10 text-[#A2A6AD] font-display text-[11px] px-4 py-2 rounded-lg transition-colors">
              <Play className="w-3.5 h-3.5" />
              NEW PUBLICATION
            </button>
          </div>
        </div>

        {/* ── TOP INSTRUMENTATION ROW ── */}
        <div className="grid grid-cols-8 gap-3">
          {[
            { label: 'SOURCE PUBS', value: '1', icon: BookOpen, color: '#D6A84B' },
            { label: 'PRODUCT FAMILIES', value: '1', icon: GitBranch, color: '#818CF8' },
            { label: 'APPROVED PRODUCTS', value: HOW_TO_TRADE_FAMILY.products.filter(p => !['IDEA','OPPORTUNITY'].includes(p.releaseStatus)).length.toString(), icon: Package, color: '#22C55E' },
            { label: 'FORMATS', value: '4', icon: Layers, color: '#38BDF8' },
            { label: 'OPPORTUNITIES', value: approvedOpportunities.toString(), icon: Star, color: '#F97316' },
            { label: 'FACTORY JOBS', value: `${runningJobs} running`, icon: Cpu, color: '#D6A84B' },
            { label: 'AWAITING QA', value: pendingQA.toString(), icon: AlertTriangle, color: '#F97316' },
            { label: 'LIVE SURFACES', value: IP_YIELD.liveCommercialSurfaces.toString(), icon: Globe, color: '#22C55E' },
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

        {/* ── IP YIELD HERO + FLOW ── */}
        <div className="grid grid-cols-12 gap-4">

          {/* IP YIELD DIAL */}
          <div className="col-span-3 bg-[#0E1014] border border-white/8 rounded-xl p-5 flex flex-col items-center justify-center gap-4">
            <div className="font-display text-xs tracking-widest text-[#626770] text-center">IP YIELD SCORE</div>
            <IPYieldDial score={IP_YIELD.ipYieldScore} />
            <div className="text-center space-y-1">
              <div className="font-data text-[10px] text-[#A2A6AD]">
                <span className="text-[#22C55E] font-bold">{IP_YIELD.liveCommercialSurfaces}</span> live · <span className="text-[#D6A84B] font-bold">{IP_YIELD.additionalUnlockableSurfaces}</span> unlockable
              </div>
              <div className="font-data text-[9px] text-[#626770]">{IP_YIELD.derivativeContributionPct}% derivative revenue share</div>
            </div>
          </div>

          {/* ONE SOURCE → GLOBAL PRODUCT FAMILY FUNNEL */}
          <div className="col-span-5 bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4">
            <div className="font-display text-xs tracking-widest text-[#626770]">ONE SOURCE → GLOBAL PRODUCT FAMILY</div>
            <div className="space-y-2">
              {[
                { label: 'MASTER SOURCE', value: '1 publication', color: '#D6A84B', pct: 100 },
                { label: 'APPROVED PRODUCTS', value: '6 commercial products', color: '#818CF8', pct: 85 },
                { label: 'APPROVED FORMATS', value: '4 formats', color: '#38BDF8', pct: 70 },
                { label: 'MARKETPLACE PACKAGES', value: '41 packages', color: '#22C55E', pct: 55 },
                { label: 'LIVE SURFACES', value: '26 destinations', color: '#22C55E', pct: 40 },
                { label: 'REVENUE-GENERATING', value: '18 active', color: '#22C55E', pct: 28 },
              ].map(row => (
                <div key={row.label} className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-data text-[9px] text-[#626770] tracking-wider">{row.label}</span>
                    <span className="font-data text-[9px] font-bold" style={{ color: row.color }}>{row.value}</span>
                  </div>
                  <div className="h-1 bg-[#1C1F24] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${row.pct}%`, backgroundColor: row.color, opacity: 0.7 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FACTORY FLOW + NEXT JOB */}
          <div className="col-span-4 space-y-3">
            <div className="bg-[#0E1014] border border-white/8 rounded-xl p-4 space-y-3">
              <div className="font-display text-[10px] tracking-widest text-[#626770]">MANUFACTURING PIPELINE</div>
              <FactoryFlowDiagram />
            </div>

            <div className="bg-[#0E1014] border border-[#D6A84B]/20 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#D6A84B]" />
                <span className="font-display text-[10px] tracking-widest text-[#D6A84B]">NEXT FACTORY JOB</span>
              </div>
              <div className="space-y-1">
                <div className="font-display text-sm text-[#F5F6F7] leading-tight">{IP_YIELD.nextUnlock.label}</div>
                <div className="font-data text-[10px] text-[#626770]">{IP_YIELD.nextUnlock.description}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-[#22C55E]" />
                  <span className="font-data text-[10px] text-[#22C55E] font-bold">+{IP_YIELD.nextUnlock.surfaceUnlockPts} pts RSA</span>
                </div>
                <span className={`font-data text-[9px] px-1.5 py-0.5 rounded border ${effortBadge(IP_YIELD.nextUnlock.effort)}`}>{IP_YIELD.nextUnlock.effort}</span>
                <span className="font-data text-[9px] text-[#A2A6AD]">{IP_YIELD.nextUnlock.confidence} conf.</span>
              </div>
              <Link href={`/factory/pub-dd-htt-001`} className="flex items-center justify-center gap-2 bg-[#D6A84B]/10 hover:bg-[#D6A84B]/20 border border-[#D6A84B]/30 text-[#D6A84B] font-display text-[10px] px-3 py-2 rounded-lg transition-colors w-full">
                OPEN FACTORY <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="flex items-center gap-1 bg-[#0E1014] border border-white/8 rounded-xl p-1 w-fit">
          {(['overview', 'queue', 'opportunities', 'ladder', 'next'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg font-display text-[10px] tracking-wider transition-all ${activeTab === tab ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30' : 'text-[#626770] hover:text-[#A2A6AD]'}`}
            >
              {tab.toUpperCase().replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* ── TAB CONTENT ── */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-12 gap-4">
            {/* Publication summary */}
            <div className="col-span-5 bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
                <span className="font-display text-xs tracking-wider text-[#A2A6AD]">SOURCE PUBLICATION</span>
                <StatusPill status={HOW_TO_TRADE.qualityState} />
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-14 rounded bg-gradient-to-b from-[#D6A84B]/20 to-[#D6A84B]/5 border border-[#D6A84B]/30 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-[#D6A84B]" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-display text-sm font-bold text-[#F5F6F7]">{HOW_TO_TRADE.title}</div>
                    <div className="font-data text-[10px] text-[#626770]">{HOW_TO_TRADE.subtitle}</div>
                    <div className="font-data text-[9px] text-[#D6A84B]">{HOW_TO_TRADE.canonicalId}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'CHAPTERS', value: HOW_TO_TRADE.chapterCount },
                    { label: 'PAGES', value: HOW_TO_TRADE.pageCount },
                    { label: 'WORDS (est.)', value: (HOW_TO_TRADE.wordCountEstimate / 1000).toFixed(0) + 'k' },
                  ].map(s => (
                    <div key={s.label} className="bg-[#1C1F24] rounded-lg p-2.5 text-center">
                      <div className="font-data text-lg font-bold text-[#F5F6F7]">{s.value}</div>
                      <div className="font-data text-[8px] text-[#626770] tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>
                <Link href="/factory/pub-dd-htt-001" className="flex items-center justify-between px-3 py-2 bg-[#1C1F24] hover:bg-[#232730] border border-white/8 rounded-lg transition-colors">
                  <span className="font-display text-[10px] text-[#A2A6AD]">OPEN PUBLICATION COMMAND CENTRE</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#626770]" />
                </Link>
              </div>
            </div>

            {/* Product family */}
            <div className="col-span-7 bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/8">
                <span className="font-display text-xs tracking-wider text-[#A2A6AD]">HOW TO TRADE — PRODUCT FAMILY</span>
              </div>
              <div className="divide-y divide-white/5">
                {HOW_TO_TRADE_FAMILY.products.map(p => (
                  <div key={p.productSku} className="flex items-center gap-3 px-4 py-3 hover:bg-white/2 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: statusColor(p.releaseStatus), boxShadow: `0 0 6px ${statusColor(p.releaseStatus)}` }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xs text-[#F5F6F7] truncate">{p.name}</span>
                        <span className="font-data text-[9px] text-[#D6A84B] shrink-0">{p.productSku}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="font-data text-[9px] text-[#626770]">{p.customerJob}</span>
                        <span className="font-data text-[9px] text-[#626770]">{p.liveMarketplaces} markets</span>
                        <span className="font-data text-[9px] text-[#626770]">{p.approvedFormats} formats</span>
                        {p.rsaContribution > 0 && <span className="font-data text-[9px] text-[#22C55E]">RSA +{p.rsaContribution} pts</span>}
                      </div>
                    </div>
                    <StatusPill status={p.releaseStatus} />
                    {p.priceGBP && <span className="font-data text-xs font-bold text-[#F5F6F7] shrink-0">£{p.priceGBP}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* BOM Summary for main product */}
            {mainBOM && (
              <div className="col-span-12 bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
                  <span className="font-display text-xs tracking-wider text-[#A2A6AD]">PRODUCT BOM — HOW TO TRADE (COMPLETE MANUAL)</span>
                  <div className="flex items-center gap-2">
                    <span className="font-data text-[10px] text-[#A2A6AD]">READINESS</span>
                    <span className="font-data text-sm font-bold" style={{ color: mainBOM.readinessScorePct >= 90 ? '#22C55E' : '#D6A84B' }}>{mainBOM.readinessScorePct}%</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-6 gap-3 mb-4">
                    {[
                      { label: 'CONTENT', pct: mainBOM.contentPct },
                      { label: 'FORMAT', pct: mainBOM.formatPct },
                      { label: 'ASSETS', pct: mainBOM.assetsPct },
                      { label: 'METADATA', pct: mainBOM.metadataPct },
                      { label: 'COMPLIANCE', pct: mainBOM.compliancePct },
                      { label: 'MARKET REQ.', pct: mainBOM.marketRequirementsPct },
                    ].map(col => (
                      <div key={col.label} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-data text-[9px] text-[#626770] tracking-wider">{col.label}</span>
                          <span className="font-data text-[9px] font-bold" style={{ color: col.pct === 100 ? '#22C55E' : col.pct >= 80 ? '#D6A84B' : '#EF4444' }}>{col.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-[#1C1F24] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${col.pct}%`, backgroundColor: col.pct === 100 ? '#22C55E' : col.pct >= 80 ? '#D6A84B' : '#EF4444', opacity: 0.8 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {mainBOM.blockingItems.length > 0 && (
                    <div className="flex items-start gap-2 bg-[#EF4444]/5 border border-[#EF4444]/20 rounded-lg p-2.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444] shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-display text-[9px] text-[#EF4444] tracking-wider">BLOCKING ITEMS</span>
                        {mainBOM.blockingItems.map(item => (
                          <div key={item} className="font-data text-[10px] text-[#A2A6AD]">· {item}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'queue' && (
          <div className="space-y-3">
            {/* Factory jobs */}
            <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
                <span className="font-display text-xs tracking-wider text-[#A2A6AD]">FACTORY JOB QUEUE</span>
                <div className="flex items-center gap-4 font-data text-[10px]">
                  <span className="text-[#D6A84B]">{runningJobs} running</span>
                  <span className="text-[#F97316]">{waitingJobs} awaiting human</span>
                  <span className="text-[#22C55E]">{completedJobs} complete</span>
                </div>
              </div>
              <div className="divide-y divide-white/5">
                {FACTORY_JOBS.map(job => (
                  <div key={job.id} className="flex items-center gap-4 px-4 py-3">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: statusColor(job.status), boxShadow: job.status === 'RUNNING' ? `0 0 8px ${statusColor(job.status)}` : 'none' }} />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-[11px] text-[#F5F6F7]">{job.jobType.replace(/_/g, ' ')}</span>
                        {job.productSku && <span className="font-data text-[9px] text-[#D6A84B]">{job.productSku}</span>}
                        {job.surfaceUnlockPts && <span className="font-data text-[9px] text-[#22C55E]">+{job.surfaceUnlockPts} pts</span>}
                      </div>
                      {job.progressStage && <div className="font-data text-[9px] text-[#626770]">{job.progressStage}</div>}
                      {job.status === 'RUNNING' && (
                        <div className="h-1 bg-[#1C1F24] rounded-full overflow-hidden w-48">
                          <div className="h-full bg-[#D6A84B] rounded-full transition-all" style={{ width: `${job.progressPct}%` }} />
                        </div>
                      )}
                    </div>
                    <StatusPill status={job.status} />
                    <span className="font-data text-[9px] text-[#626770] shrink-0">{job.id}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* QA Reviews */}
            <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
                <span className="font-display text-xs tracking-wider text-[#A2A6AD]">FACTORY QA QUEUE</span>
                <Link href="/factory/qa" className="font-display text-[10px] text-[#D6A84B] hover:text-[#e2b558] transition-colors flex items-center gap-1">
                  OPEN QA QUEUE <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="divide-y divide-white/5">
                {QA_REVIEWS.map(qa => (
                  <div key={qa.id} className="flex items-center gap-4 px-4 py-3">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: statusColor(qa.status) }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-[11px] text-[#F5F6F7]">{qa.entityLabel}</div>
                      <div className="font-data text-[9px] text-[#626770]">{qa.qaType.replace(/_/g, ' ')}</div>
                      {qa.reviewerNotes && <div className="font-data text-[9px] text-[#A2A6AD] mt-0.5">Note: {qa.reviewerNotes}</div>}
                    </div>
                    <StatusPill status={qa.status} />
                    <Link href="/factory/qa" className="font-display text-[9px] text-[#D6A84B] hover:text-[#e2b558] transition-colors flex items-center gap-1">
                      REVIEW <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div className="space-y-3">
            <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/8">
                <span className="font-display text-xs tracking-wider text-[#A2A6AD]">PRODUCT OPPORTUNITY BACKLOG — HOW TO TRADE FAMILY</span>
              </div>
              <div className="divide-y divide-white/5">
                {PRODUCT_OPPORTUNITIES.map(opp => (
                  <div key={opp.id} className={`px-4 py-4 ${opp.backlogStatus === 'REJECTED' ? 'opacity-50' : ''}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: statusColor(opp.backlogStatus) }} />
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-display text-sm text-[#F5F6F7]">{opp.title}</span>
                              <span className="font-data text-[9px] text-[#D6A84B]">{opp.proposedSku}</span>
                            </div>
                            {opp.subtitle && <div className="font-data text-[10px] text-[#626770]">{opp.subtitle}</div>}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <StatusPill status={opp.backlogStatus} />
                            <span className="font-data text-[9px] px-2 py-0.5 rounded border border-white/10 text-[#A2A6AD]">{opp.opportunityType}</span>
                          </div>
                        </div>
                        {opp.rejectionReason ? (
                          <div className="flex items-start gap-2 bg-[#EF4444]/5 border border-[#EF4444]/20 rounded px-2.5 py-1.5">
                            <AlertTriangle className="w-3 h-3 text-[#EF4444] shrink-0 mt-0.5" />
                            <span className="font-data text-[9px] text-[#A2A6AD]">REJECTED: {opp.rejectionReason}</span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-6 gap-3">
                            <div>
                              <div className="font-data text-[8px] text-[#626770] tracking-wider mb-0.5">SOURCE COVERAGE</div>
                              <div className="font-data text-xs font-bold" style={{ color: opp.sourceCoveragePct >= 85 ? '#22C55E' : opp.sourceCoveragePct >= 60 ? '#D6A84B' : '#EF4444' }}>{opp.sourceCoveragePct}%</div>
                            </div>
                            <div>
                              <div className="font-data text-[8px] text-[#626770] tracking-wider mb-0.5">DISTINCTIVENESS</div>
                              <div className="font-data text-xs font-bold text-[#F5F6F7]">{opp.distinctivenessScore}</div>
                            </div>
                            <div>
                              <div className="font-data text-[8px] text-[#626770] tracking-wider mb-0.5">RSA UNLOCK</div>
                              <div className="font-data text-xs font-bold text-[#22C55E]">+{opp.rsaUnlockPts} pts</div>
                            </div>
                            <div>
                              <div className="font-data text-[8px] text-[#626770] tracking-wider mb-0.5">EFFORT</div>
                              <span className={`font-data text-[9px] px-1.5 py-0.5 rounded border ${effortBadge(opp.editorialEffort)}`}>{opp.editorialEffort}</span>
                            </div>
                            <div>
                              <div className="font-data text-[8px] text-[#626770] tracking-wider mb-0.5">CUSTOMER JOB</div>
                              <div className="font-data text-[9px] text-[#A2A6AD]">{opp.customerJob}</div>
                            </div>
                            <div>
                              <div className="font-data text-[8px] text-[#626770] tracking-wider mb-0.5">CONFIDENCE</div>
                              <div className="font-data text-[9px]" style={{ color: opp.confidence === 'HIGH' ? '#22C55E' : opp.confidence === 'MEDIUM' ? '#D6A84B' : '#EF4444' }}>{opp.confidence}</div>
                            </div>
                          </div>
                        )}
                        {!opp.rejectionReason && opp.whyStandalone && (
                          <div className="font-data text-[9px] text-[#626770] italic">{opp.whyStandalone}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ladder' && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8">
              <span className="font-display text-xs tracking-wider text-[#A2A6AD]">PRODUCT COMMERCIAL LADDER — HOW TO TRADE FAMILY</span>
            </div>
            <div className="p-4 space-y-2">
              {PRODUCT_LADDER.slice().reverse().map((item, i) => (
                <div key={item.productSku} className={`flex items-center gap-4 p-3 rounded-xl border ${i === 1 ? 'border-[#D6A84B]/30 bg-[#D6A84B]/5' : 'border-white/8 bg-[#1C1F24]/40'}`}>
                  <LadderTierBadge tier={item.tier} />
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-sm text-[#F5F6F7]">{item.name}</div>
                    <div className="font-data text-[9px] text-[#D6A84B]">{item.productSku}</div>
                  </div>
                  <StatusPill status={item.releaseStatus} />
                  {item.priceGBP ? (
                    <span className="font-data text-sm font-bold text-[#F5F6F7]">£{item.priceGBP}</span>
                  ) : (
                    <span className="font-data text-xs text-[#22C55E]">FREE</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'next' && (
          <div className="space-y-3">
            <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/8">
                <span className="font-display text-xs tracking-wider text-[#A2A6AD]">RANKED FACTORY JOB RECOMMENDATIONS</span>
              </div>
              <div className="divide-y divide-white/5">
                {NEXT_FACTORY_JOBS.map((rec, i) => (
                  <div key={i} className={`flex items-start gap-4 px-4 py-4 ${i === 0 ? 'bg-[#D6A84B]/3' : ''}`}>
                    <div className="font-data text-lg font-bold text-[#626770] w-6 shrink-0">{i + 1}</div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="font-display text-sm text-[#F5F6F7]">{rec.label}</div>
                      <div className="font-data text-[10px] text-[#626770]">{rec.description}</div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-3 h-3 text-[#22C55E]" />
                          <span className="font-data text-[10px] text-[#22C55E] font-bold">+{rec.surfaceUnlockPts} RSA pts</span>
                        </div>
                        <span className={`font-data text-[9px] px-2 py-0.5 rounded border ${effortBadge(rec.effort)}`}>EFFORT: {rec.effort}</span>
                        <span className="font-data text-[9px]" style={{ color: rec.confidence === 'HIGH' ? '#22C55E' : rec.confidence === 'MEDIUM' ? '#D6A84B' : '#6B7280' }}>CONF: {rec.confidence}</span>
                        <span className="font-data text-[9px] text-[#626770]">{rec.jobType.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                    {i === 0 && (
                      <Link href="/factory/pub-dd-htt-001" className="flex items-center gap-1.5 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0">
                        <FlaskConical className="w-3.5 h-3.5" /> MANUFACTURE
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
