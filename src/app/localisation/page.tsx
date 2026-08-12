'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe, Languages, MapPin, Cpu, ShieldCheck, AlertTriangle,
  CheckCircle2, Clock, ChevronRight, Zap, ArrowRight, TrendingUp,
  BarChart3, FlaskConical, History, Eye, Play, Sparkles, Filter
} from 'lucide-react';
import {
  LOCALISED_EDITIONS, TERRITORIES, LOCALES, LOCALISATION_OPPORTUNITIES,
  TRANSLATION_MEMORY, DRAWDOWN_TERM_BASE
} from '@/lib/localisation/demo-localisation-data';
import { calculateLocalisationRSA, runExpandWinners } from '@/lib/localisation/flagship-actions';
import { simulateLocaleUnlock } from '@/lib/localisation/opportunity-engine';

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

  const locRsa = calculateLocalisationRSA(64.0);
  const winnersPlan = runExpandWinners();
  const simResult = simulateLocaleUnlock(simLocale);

  const totalEditions = LOCALISED_EDITIONS.length;
  const liveEditions = LOCALISED_EDITIONS.filter(e => e.state === 'LIVE').length;
  const inReviewEditions = LOCALISED_EDITIONS.filter(e => ['EDITORIAL_REVIEW', 'COMPLIANCE_REVIEW', 'VISUAL_QA'].includes(e.state)).length;
  const inTranslationEditions = LOCALISED_EDITIONS.filter(e => ['TRANSLATING', 'TRANSLATED_DRAFT', 'PREPARING'].includes(e.state)).length;

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
            { label: 'ACTIVE LOCALES', value: `${LOCALES.filter(l => l.isActive).length}`, icon: Globe, color: '#38BDF8' },
            { label: 'LIVE EDITIONS', value: `${liveEditions}/${totalEditions}`, icon: CheckCircle2, color: '#22C55E' },
            { label: 'IN TRANSLATION', value: `${inTranslationEditions}`, icon: Clock, color: '#D6A84B' },
            { label: 'IN REVIEW', value: `${inReviewEditions}`, icon: AlertTriangle, color: '#F97316' },
            { label: 'OPPORTUNITIES', value: `${LOCALISATION_OPPORTUNITIES.length}`, icon: Sparkles, color: '#818CF8' },
            { label: 'TM ENTRIES', value: `${TRANSLATION_MEMORY.length}`, icon: Languages, color: '#22C55E' },
            { label: 'LOCAL RSA', value: `${locRsa.localisedRsaPct}%`, icon: Globe, color: '#D6A84B' },
            { label: 'RSA UNLOCKABLE', value: `+${locRsa.additionalUnlockableLocalRsaPts} pts`, icon: TrendingUp, color: '#22C55E' },
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
          <div className="grid grid-cols-3 gap-4 font-data text-xs">
            {TERRITORIES.map(ter => {
              const localEditions = LOCALISED_EDITIONS.filter(e => e.territoryCode === ter.id);
              return (
                <div key={ter.id} className="bg-[#0E1014] border border-white/8 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-base font-bold text-[#F5F6F7]">{ter.name}</span>
                      <span className="text-[10px] text-[#D6A84B] font-bold">({ter.id})</span>
                    </div>
                    <span className="text-[10px] text-[#38BDF8] font-bold">{ter.defaultCurrencyCode}</span>
                  </div>

                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-[#626770]">Languages:</span>
                      <span className="text-[#A2A6AD]">{ter.primaryLanguages.join(', ').toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#626770]">Regulatory Context:</span>
                      <span className="text-[#22C55E] font-bold">{ter.regulatoryContext}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[9px] text-[#626770] tracking-wider">LOCAL EDITIONS ({localEditions.length})</div>
                    {localEditions.length > 0 ? (
                      <div className="space-y-1">
                        {localEditions.map(ed => (
                          <div key={ed.id} className="flex items-center justify-between bg-[#121418] p-2 rounded border border-white/5 text-[10px]">
                            <span className="text-[#F5F6F7] truncate max-w-44">{ed.titleLocalised}</span>
                            <StatePill state={ed.state} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[10px] text-[#626770] italic">No local editions created yet</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden font-data text-xs">
            <div className="px-4 py-3 border-b border-white/8 font-display text-xs tracking-wider text-[#A2A6AD]">RANKED LOCALISATION OPPORTUNITIES (WHAT LANGUAGE NEXT?)</div>
            <div className="divide-y divide-white/5">
              {LOCALISATION_OPPORTUNITIES.map((opp, i) => (
                <div key={opp.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#D6A84B] text-sm w-6">#{i + 1}</span>
                    <div className="space-y-0.5">
                      <div className="font-display text-sm font-bold text-[#F5F6F7]">{opp.localeName} ({opp.localeCode})</div>
                      <div className="text-[10px] text-[#626770]">{opp.productName} ({opp.productSku})</div>
                      {opp.existingSalesSignal && <div className="text-[9px] text-[#22C55E] italic">Signal: {opp.existingSalesSignal}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-[10px]">
                    <div>
                      <span className="text-[#626770]">Priority Score: </span>
                      <strong className="text-[#D6A84B] font-bold text-sm">{opp.priorityScore}/100</strong>
                    </div>
                    <div>
                      <span className="text-[#626770]">RSA Unlock: </span>
                      <strong className="text-[#22C55E] font-bold text-sm">+{opp.rsaUnlockPts} pts</strong>
                    </div>
                    <div>
                      <span className="text-[#626770]">Effort: </span>
                      <strong className="text-[#F5F6F7]">{opp.estimatedEffort}</strong>
                    </div>
                    <StatePill state={opp.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'editions' && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden font-data text-xs">
            <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
              <span className="font-display text-xs tracking-wider text-[#A2A6AD]">LOCAL EDITIONS PIPELINE</span>
              <Link href="/localisation/editions" className="font-display text-[10px] text-[#D6A84B]">MANAGE ALL EDITIONS →</Link>
            </div>
            <div className="divide-y divide-white/5 p-4 space-y-3">
              {LOCALISED_EDITIONS.map(ed => (
                <div key={ed.id} className="bg-[#121418] border border-white/5 rounded-lg p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm font-bold text-[#F5F6F7]">{ed.titleLocalised}</span>
                      <StatePill state={ed.state} />
                    </div>
                    <div className="text-[10px] text-[#626770]">Locale: {ed.localeName} ({ed.localeCode}) · Canonical Source: {ed.sourceEditionId}</div>
                  </div>
                  <div className="flex items-center gap-4 text-[10px]">
                    <span className="text-[#626770]">Completion: <strong className="text-[#22C55E]">{ed.completionPct}%</strong></span>
                    <Link href={`/localisation/${ed.id}`} className="bg-[#1C1F24] hover:bg-white/10 text-[#D6A84B] px-3 py-1.5 rounded border border-[#D6A84B]/30 font-display text-[10px]">
                      OPEN EDITION
                    </Link>
                  </div>
                </div>
              ))}
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

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-[#121418] p-3 rounded border border-white/5">
                <div className="text-[#626770] text-[9px]">SIMULATED LOCALE</div>
                <div className="text-[#F5F6F7] font-bold text-sm">{simResult.localeName}</div>
              </div>
              <div className="bg-[#121418] p-3 rounded border border-white/5">
                <div className="text-[#626770] text-[9px]">RSA UNLOCK</div>
                <div className="text-[#22C55E] font-bold text-sm">+{simResult.rsaUnlockPts} PTS</div>
              </div>
              <div className="bg-[#121418] p-3 rounded border border-white/5">
                <div className="text-[#626770] text-[9px]">UNLOCKED MARKETPLACES</div>
                <div className="text-[#38BDF8] font-bold text-xs">{simResult.unlockedMarketplaces.length} major channels</div>
              </div>
              <div className="bg-[#121418] p-3 rounded border border-white/5">
                <div className="text-[#626770] text-[9px]">EST. REVIEW HOURS</div>
                <div className="text-[#F97316] font-bold text-sm">{simResult.estimatedReviewHours} hrs</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[9px] text-[#626770]">SIMULATION SUMMARY</div>
              <div className="text-[#A2A6AD] bg-[#121418] p-3 rounded border border-white/5 italic">{simResult.summary}</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
