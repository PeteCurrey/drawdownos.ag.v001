'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe, Languages, MapPin, Cpu, ShieldCheck, AlertTriangle,
  CheckCircle2, Clock, ChevronRight, Zap, ArrowRight, TrendingUp,
  BarChart3, FlaskConical, History, Eye, Play, Sparkles, Filter, Database
} from 'lucide-react';

function stateColor(state: string): string {
  const map: Record<string, string> = {
    LIVE: '#22C55E', APPROVED_FOR_SALE: '#22C55E', READY: '#22C55E', APPROVED: '#22C55E',
    TRANSLATING: '#D6A84B', TRANSLATED_DRAFT: '#D6A84B', LOCALISING: '#D6A84B', PREPARING: '#D6A84B',
    EDITORIAL_REVIEW: '#F97316', COMPLIANCE_REVIEW: '#F97316', VISUAL_QA: '#F97316', FORMAT_QA: '#F97316',
    STALE: '#F59E0B', BLOCKED: '#EF4444', REJECTED: '#EF4444',
    OPPORTUNITY: '#818CF8', APPROVED_FOR_LOCALISATION: '#38BDF8',
  };
  return map[state] ?? '#6B7280';
}

function StatePill({ state }: { state: string }) {
  return (
    <span
      className="font-data text-[9px] px-2 py-0.5 rounded border"
      style={{ color: stateColor(state), borderColor: `${stateColor(state)}30`, backgroundColor: `${stateColor(state)}10` }}
    >
      {state.replace(/_/g, ' ')}
    </span>
  );
}

export default function LocalisationCommandCentre() {
  const [activeTab, setActiveTab] = useState<'territories' | 'opportunities' | 'editions' | 'simulators'>('territories');
  const [simLocale, setSimLocale] = useState<'de-DE' | 'es-ES' | 'pt-BR'>('de-DE');

  const totalEditions = 0;
  const liveEditions = 0;
  const inReviewEditions = 0;
  const inTranslationEditions = 0;

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* ── HEADER ── */}
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Globe className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-wider text-[#F5F6F7]">GLOBAL LOCALISATION ENGINE</h1>
              <span className="font-data text-[10px] px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">ACTIVE</span>
            </div>
            <p className="font-data text-xs text-[#626770] tracking-wide">CANONICAL SOURCE IP → NATIVE REGIONAL EDITIONS · ZERO-SIGNAL COMPLIANCE MANDATE</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/localisation/editions"
              className="flex items-center gap-2 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-[11px] font-bold px-4 py-2 rounded-lg transition-colors"
            >
              <Languages className="w-3.5 h-3.5" />
              LOCAL EDITIONS QUEUE
            </Link>
            <Link
              href="/localisation/terminology"
              className="flex items-center gap-2 bg-[#121418] hover:bg-[#17191E] border border-white/10 text-[#A2A6AD] font-display text-[11px] px-4 py-2 rounded-lg transition-colors"
            >
              TERM BASE & TM
            </Link>
          </div>
        </div>

        {/* ── TOP HERO INSTRUMENTATION ── */}
        <div className="grid grid-cols-8 gap-3">
          {[
            { label: 'ACTIVE LOCALES', value: '--', icon: Globe, color: '#38BDF8' },
            { label: 'LIVE EDITIONS', value: '--/--', icon: CheckCircle2, color: '#22C55E' },
            { label: 'IN TRANSLATION', value: '--', icon: Clock, color: '#D6A84B' },
            { label: 'IN REVIEW', value: '--', icon: AlertTriangle, color: '#F97316' },
            { label: 'OPPORTUNITIES', value: '--', icon: Sparkles, color: '#818CF8' },
            { label: 'TM ENTRIES', value: '--', icon: Languages, color: '#22C55E' },
            { label: 'LOCAL RSA', value: '--%', icon: Globe, color: '#D6A84B' },
            { label: 'RSA UNLOCKABLE', value: '-- pts', icon: TrendingUp, color: '#22C55E' },
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

        {/* ── INDUSTRIAL LOCALISATION PIPELINE ── */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-3">
          <div className="font-display text-xs tracking-wider text-[#626770]">INDUSTRIAL LOCALISATION PIPELINE</div>
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 font-data text-[9px]">
            {[
              { step: '01. CANONICAL SOURCE', sub: 'DD-HTT-001-EN-GB-v1.2', color: '#D6A84B' },
              { step: '02. LOCALE OPPORTUNITY', sub: 'RSA Priority Score', color: '#818CF8' },
              { step: '03. SEGMENTATION', sub: 'Translation Units', color: '#38BDF8' },
              { step: '04. TRANSLATION MEMORY', sub: 'Term Base Check', color: '#38BDF8' },
              { step: '05. AI DRAFT / HUMAN', sub: 'Hybrid Workflow', color: '#D6A84B' },
              { step: '06. COMPLIANCE REVIEW', sub: 'Territory Overlay', color: '#22C55E' },
              { step: '07. VISUAL QA', sub: 'Layout Overflow Check', color: '#22C55E' },
              { step: '08. NATIVE MERCH.', sub: 'Local Keywords & Pricing', color: '#22C55E' },
              { step: '09. LIVE TELEMETRY', sub: 'Local Net Contribution', color: '#22C55E' },
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
          {(['territories', 'opportunities', 'editions', 'simulators'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg font-display text-[10px] tracking-wider transition-all ${activeTab === tab ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30' : 'text-[#626770] hover:text-[#A2A6AD]'}`}
            >
              {tab === 'territories' ? 'TERRITORY MATRIX' : tab === 'opportunities' ? 'RANKED OPPORTUNITIES' : tab === 'editions' ? 'LOCAL EDITIONS' : 'LOCALE UNLOCK SIMULATOR'}
            </button>
          ))}
        </div>

        {/* ── TAB CONTENT ── */}
        {activeTab === 'territories' && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl p-8 text-center space-y-3 industrial-panel font-data">
            <Database className="w-6 h-6 text-[#626770] mx-auto" />
            <div className="font-display text-sm text-[#F5F6F7]">NO REGIONAL DATA SOURCE CONNECTED</div>
            <div className="text-xs text-[#626770] max-w-md mx-auto">
              Territory matrices require a live connection to the CRM or region management database. Connect a data source to view active territories and compliance rules.
            </div>
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl p-8 text-center space-y-3 industrial-panel font-data">
            <Database className="w-6 h-6 text-[#626770] mx-auto" />
            <div className="font-display text-sm text-[#F5F6F7]">OPPORTUNITY ENGINE DISCONNECTED</div>
            <div className="text-xs text-[#626770] max-w-md mx-auto">
              Ranked opportunities are calculated based on live sales signals and CRM data. Connect your telemetry pipeline to generate localisation priorities.
            </div>
          </div>
        )}

        {activeTab === 'editions' && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl p-8 text-center space-y-3 industrial-panel font-data">
            <Database className="w-6 h-6 text-[#626770] mx-auto" />
            <div className="font-display text-sm text-[#F5F6F7]">NO EDITIONS FOUND</div>
            <div className="text-xs text-[#626770] max-w-md mx-auto">
              The local editions pipeline requires a connection to the Translation Management System (TMS). Integrate your TMS to view active translation projects.
            </div>
          </div>
        )}

        {activeTab === 'simulators' && (
          <div className="bg-[#0E1014] border border-[#D6A84B]/30 rounded-xl p-5 space-y-4 font-data text-xs">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D6A84B]" />
                <span className="font-display text-sm text-[#D6A84B] font-bold tracking-wider">LOCALE UNLOCK SIMULATOR</span>
              </div>
              <div className="flex items-center gap-2">
                {(['de-DE', 'es-ES', 'pt-BR'] as const).map(loc => (
                  <button
                    key={loc}
                    onClick={() => setSimLocale(loc)}
                    className={`px-3 py-1 rounded font-display text-[10px] ${simLocale === loc ? 'bg-[#D6A84B] text-[#0A0B0D] font-bold' : 'bg-[#121418] text-[#A2A6AD] border border-white/10'}`}
                  >
                    WHAT IF WE ADD {loc.toUpperCase()}?
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#121418] border border-dashed border-white/20 rounded-xl p-8 text-center space-y-3 industrial-panel">
              <Database className="w-6 h-6 text-[#626770] mx-auto" />
              <div className="font-display text-sm text-[#F5F6F7]">SIMULATION REQUIRES LIVE DATA</div>
              <div className="text-xs text-[#626770] max-w-md mx-auto">
                The Locale Unlock Simulator depends on live analytics and a connected opportunity engine to forecast RSA points and review hours.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
