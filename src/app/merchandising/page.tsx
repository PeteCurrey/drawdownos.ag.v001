'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sliders, Globe, Package, Cpu, ShieldCheck, AlertTriangle,
  CheckCircle2, Clock, ChevronRight, Zap, ArrowRight, TrendingUp,
  BarChart3, FlaskConical, History, Eye, Play, Sparkles, Filter
} from 'lucide-react';
import { runTuneTheMachine, simulateMaximiseMerchandising, calculateEffectiveRevenueSurface } from '@/lib/merchandising/flagship-actions';

function statusColor(status: string): string {
  const map: Record<string, string> = {
    LIVE: '#22C55E', APPROVED: '#22C55E', PUBLISHED: '#22C55E', COMPLETED: '#22C55E', PASS: '#22C55E',
    RUNNING: '#D6A84B', OPTIMISING: '#D6A84B', GENERATING: '#D6A84B', LEARNING: '#D6A84B',
    STALE: '#F59E0B', DRIFTED: '#EF4444', NEEDS_REVIEW: '#F97316', REJECTED: '#EF4444', FAILED: '#EF4444',
    DRAFT: '#6B7280', PAUSED: '#6B7280', UNKNOWN: '#6B7280'
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

function EmptyStatePanel({ title, message, action }: { title: string, message: string, action: string }) {
  return (
    <div className="industrial-panel p-12 flex flex-col items-center justify-center text-center space-y-4 border border-white/8 rounded-xl bg-[#0E1014]">
      <AlertTriangle className="w-8 h-8 text-[#D6A84B]" />
      <div className="font-display text-sm tracking-wider text-[#F5F6F7]">{title}</div>
      <div className="font-data text-xs text-[#626770] max-w-lg">
        {message}
      </div>
      <div className="font-display text-[10px] text-[#D6A84B] px-4 py-2 border border-[#D6A84B]/30 bg-[#D6A84B]/10 rounded-lg">
        {action}
      </div>
    </div>
  );
}

export default function MerchandisingCommandCentre() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'listings' | 'experiments' | 'drift' | 'tune'>('matrix');
  const [isTuningPlanOpen, setIsTuningPlanOpen] = useState(false);

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
            { label: 'LIVE LISTINGS', value: '-', icon: Globe, color: '#626770' },
            { label: 'NEEDS ACTION', value: '-', icon: AlertTriangle, color: '#626770' },
            { label: 'ACTIVE EXPERIMENTS', value: '-', icon: FlaskConical, color: '#626770' },
            { label: 'LISTING DRIFT', value: '-', icon: AlertTriangle, color: '#626770' },
            { label: 'RAW RSA', value: '-', icon: Globe, color: '#626770' },
            { label: 'EFFECTIVE RSA', value: '-', icon: Sparkles, color: '#626770' },
            { label: 'NET REVENUE', value: '-', icon: BarChart3, color: '#626770' },
            { label: 'AUTOPILOT POLICY', value: 'UNCONFIGURED', icon: Cpu, color: '#626770' },
          ].map(item => (
            <div key={item.label} className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-2">
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
          <div className="industrial-panel bg-[#0E1014] border border-[#D6A84B]/40 rounded-xl p-5 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#D6A84B]" />
                <span className="font-display text-sm font-bold text-[#D6A84B] tracking-wider">TUNE THE MACHINE — PORTFOLIO MERCHANDISING ANALYSIS</span>
              </div>
              <button onClick={() => setIsTuningPlanOpen(false)} className="text-[#626770] hover:text-[#F5F6F7] text-xs font-data">CLOSE ✕</button>
            </div>
            <EmptyStatePanel 
              title="NO LISTINGS TO TUNE"
              message="Machine tuning requires active marketplace records to generate recommendations. Please connect a sales channel to begin continuous optimization."
              action="CONNECT CHANNEL"
            />
          </div>
        )}

        {/* ── MERCHANDISING FLOW PIPELINE (INDUSTRIAL AESTHETIC) ── */}
        <div className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-3">
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
        <div className="flex items-center gap-1 bg-[#0E1014] border border-white/8 rounded-xl p-1 w-fit industrial-panel">
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
          <div className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
              <span className="font-display text-xs tracking-wider text-[#A2A6AD]">MERCHANDISING MATRIX — PRODUCTS × MARKETPLACES</span>
              <Link href="/merchandising/matrix" className="font-display text-[10px] text-[#D6A84B] hover:text-[#e2b558] flex items-center gap-1">
                FULL POSITIONING MAP <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <EmptyStatePanel 
              title="NO PRODUCTION LISTINGS FOUND"
              message="Drawdown OS cannot prove the existence of any listings. Values are only displayed when verified by a real internal record or active channel integration."
              action="CONFIGURE MARKETPLACE CONNECTOR"
            />
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
              <span className="font-display text-xs tracking-wider text-[#A2A6AD]">ALL CHANNEL LISTINGS</span>
              <Link href="/merchandising/listings" className="font-display text-[10px] text-[#D6A84B] hover:text-[#e2b558]">OPEN LISTINGS FACTORY →</Link>
            </div>
            <EmptyStatePanel 
              title="NO CHANNEL LISTINGS AVAILABLE"
              message="No truthful channel listing data can be verified. Connect a marketplace to view active listings."
              action="CONNECT SALES CHANNEL"
            />
          </div>
        )}

        {activeTab === 'experiments' && (
          <div className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
              <span className="font-display text-xs tracking-wider text-[#A2A6AD]">ACTIVE & RECENT EXPERIMENTS</span>
              <Link href="/merchandising/experiments" className="font-display text-[10px] text-[#D6A84B]">OPEN EXPERIMENT STUDIO →</Link>
            </div>
            <EmptyStatePanel 
              title="NO EXPERIMENTS IN PROGRESS"
              message="Experimentation requires active marketplace data to establish control and test variants. Connect data sources to unlock experimentation."
              action="MANAGE CONNECTORS"
            />
          </div>
        )}

        {activeTab === 'drift' && (
          <div className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl p-4 space-y-3">
            <div className="font-display text-xs tracking-wider text-[#EF4444]">LISTING DRIFT TELEMETRY</div>
            <EmptyStatePanel 
              title="NO TELEMETRY DATA"
              message="Drift telemetry requires live listings to monitor. Drawdown OS cannot prove any drift events because no connections exist."
              action="ADD LISTINGS TO MONITOR"
            />
          </div>
        )}

        {activeTab === 'tune' && (
          <div className="industrial-panel bg-[#0E1014] border border-[#D6A84B]/30 rounded-xl p-5 space-y-4 font-data text-xs">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <span className="font-display text-sm text-[#D6A84B] font-bold tracking-wider">MAXIMISE HOW TO TRADE MERCHANDISING PLAN</span>
              <span className="text-[#626770] font-bold">POTENTIAL RSA UNLOCK: UNKNOWN</span>
            </div>
            <EmptyStatePanel 
              title="NO DATA FOR MAXIMISATION PLAN"
              message="Machine tuning requires historical revenue data and channel records. Awaiting connection to generate true plans."
              action="CONNECT DATA SOURCES"
            />
          </div>
        )}

      </div>
    </div>
  );
}
