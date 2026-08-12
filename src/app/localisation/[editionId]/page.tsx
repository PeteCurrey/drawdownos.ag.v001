'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  Languages, ChevronRight, BookOpen, Globe, ShieldCheck, FileText,
  DollarSign, Image, Layers, History, ClipboardCheck, AlertTriangle,
  CheckCircle2, ExternalLink, RefreshCw, Eye, Edit3, Database
} from 'lucide-react';

function stateColor(state: string): string {
  const map: Record<string, string> = {
    LIVE: '#22C55E', APPROVED_FOR_SALE: '#22C55E', READY: '#22C55E', APPROVED: '#22C55E',
    TRANSLATING: '#D6A84B', TRANSLATED_DRAFT: '#D6A84B', LOCALISING: '#D6A84B', PREPARING: '#D6A84B',
    EDITORIAL_REVIEW: '#F97316', COMPLIANCE_REVIEW: '#F97316', VISUAL_QA: '#F97316', FORMAT_QA: '#F97316',
    STALE: '#F59E0B', BLOCKED: '#EF4444', REJECTED: '#EF4444',
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

const TABS = [
  { id: 'overview', label: 'OVERVIEW', icon: Languages },
  { id: 'translation', label: 'TRANSLATION', icon: FileText },
  { id: 'terminology', label: 'TERMINOLOGY', icon: BookOpen },
  { id: 'segments', label: 'SEGMENTS', icon: Edit3 },
  { id: 'compliance', label: 'COMPLIANCE', icon: ShieldCheck },
  { id: 'visual-qa', label: 'VISUAL QA', icon: Eye },
  { id: 'formats', label: 'FORMATS', icon: Layers },
  { id: 'pricing', label: 'PRICING', icon: DollarSign },
  { id: 'packages', label: 'PACKAGES', icon: Globe },
  { id: 'versions', label: 'VERSIONS', icon: History },
  { id: 'audit', label: 'AUDIT', icon: ClipboardCheck },
] as const;

type TabId = typeof TABS[number]['id'];

export default function LocalEditionDetailCommandCentre({
  params,
}: {
  params: Promise<{ editionId: string }>;
}) {
  const { editionId } = use(params);
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const edition = {
    id: editionId,
    titleLocalised: 'Edition Not Found',
    localeName: 'Unknown',
    localeCode: 'XX',
    editionVersion: 'v0.0',
    state: 'BLOCKED',
    sourceEditionId: 'Unknown',
    sourceVersion: 'v0.0',
    completionPct: 0,
    totalUnits: 0,
    approvedUnits: 0,
    complianceStatus: 'WARN',
    blockingIssuesCount: 0,
    translatorName: '',
    reviewerName: '',
    translationMethod: 'N/A'
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/localisation" className="hover:text-[#A2A6AD]">GLOBAL LOCALISATION ENGINE</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/localisation/editions" className="hover:text-[#A2A6AD]">LOCAL EDITIONS</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">{edition.localeName}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Languages className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">{edition.titleLocalised}</h1>
                  <span className="font-data text-[9px] text-[#D6A84B]">{edition.editionVersion}</span>
                  <StatePill state={edition.state} />
                </div>
                <div className="font-data text-[10px] text-[#626770]">Locale: {edition.localeName} ({edition.localeCode}) · Source: {edition.sourceEditionId}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 font-data text-xs">
            <Link
              href={`/localisation/${edition.id}/review`}
              className="flex items-center gap-1.5 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-[10px] font-bold px-4 py-2 rounded-lg transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" /> OPEN SEGMENT REVIEW STUDIO
            </Link>
          </div>
        </div>

        {/* Instrumentation Row */}
        <div className="grid grid-cols-6 gap-3 font-data text-xs">
          {[
            { label: 'COMPLETION', value: `${edition.completionPct}%`, color: '#22C55E' },
            { label: 'TOTAL UNITS', value: edition.totalUnits.toString(), color: '#F5F6F7' },
            { label: 'APPROVED UNITS', value: edition.approvedUnits.toString(), color: '#22C55E' },
            { label: 'COMPLIANCE STATUS', value: edition.complianceStatus, color: edition.complianceStatus === 'PASS' ? '#22C55E' : '#F97316' },
            { label: 'BLOCKING ISSUES', value: edition.blockingIssuesCount.toString(), color: edition.blockingIssuesCount > 0 ? '#EF4444' : '#22C55E' },
            { label: 'TRANSLATOR', value: edition.translatorName || 'Unassigned', color: '#38BDF8' },
          ].map(s => (
            <div key={s.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 text-center space-y-1">
              <div className="text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* 11 Tabs Bar */}
        <div className="flex items-center gap-1 overflow-x-auto bg-[#0E1014] border border-white/8 rounded-xl p-1">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-display text-[10px] tracking-wider whitespace-nowrap transition-all shrink-0 ${activeTab === tab.id ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30' : 'text-[#626770] hover:text-[#A2A6AD]'}`}
              >
                <Icon className="w-3 h-3" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB PANELS */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-12 gap-4 font-data text-xs">
            <div className="col-span-6 bg-[#0E1014] border border-white/8 rounded-xl p-4 space-y-3">
              <div className="font-display text-xs tracking-wider text-[#626770]">CANONICAL SOURCE LINKAGE</div>
              <div className="space-y-2">
                <div className="bg-[#121418] p-3 rounded-lg border border-white/5 space-y-1">
                  <div className="text-[9px] text-[#D6A84B] font-bold">CANONICAL SOURCE EDITION</div>
                  <div className="text-[#F5F6F7]">{edition.sourceEditionId} ({edition.sourceVersion})</div>
                  <div className="text-[10px] text-[#626770]">How to Trade (Complete Manual) · EN-GB Master</div>
                </div>
                <div className="bg-[#121418] p-3 rounded-lg border border-[#D6A84B]/30 space-y-1">
                  <div className="text-[9px] text-[#22C55E] font-bold">TARGET LOCALE EDITION</div>
                  <div className="text-[#F5F6F7]">{edition.titleLocalised} ({edition.localeCode})</div>
                  <div className="text-[10px] text-[#626770]">Method: {edition.translationMethod} · Reviewer: {edition.reviewerName || 'Pending'}</div>
                </div>
              </div>
            </div>

            <div className="col-span-6 bg-[#0E1014] border border-white/8 rounded-xl p-4 space-y-3">
              <div className="font-display text-xs tracking-wider text-[#626770]">QUALITY GATES & READINESS</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#626770]">Translation Completion</span>
                  <span className="text-[#22C55E] font-bold">{edition.completionPct}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#626770]">Compliance Status</span>
                  <span className="text-[#F97316] font-bold">{edition.complianceStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#626770]">Blocking Issues</span>
                  <span className={edition.blockingIssuesCount > 0 ? 'text-[#EF4444] font-bold' : 'text-[#22C55E]'}>{edition.blockingIssuesCount}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'translation' && (
          <div className="space-y-3 font-data text-xs">
            <div className="font-display text-xs tracking-wider text-[#626770]">TRANSLATION SEGMENTS PREVIEW</div>
            <div className="bg-[#0E1014] border border-white/8 rounded-xl p-8 text-center space-y-3 industrial-panel">
              <Database className="w-6 h-6 text-[#626770] mx-auto" />
              <div className="font-display text-sm text-[#F5F6F7]">NO TRANSLATION UNITS LOADED</div>
              <div className="text-xs text-[#626770] max-w-md mx-auto">
                Connect your CMS or Translation Management System to pull real source strings and translated segments.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'terminology' && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden font-data text-xs">
            <div className="px-4 py-3 border-b border-white/8 font-display text-xs tracking-wider text-[#626770]">DRAWDOWN TERM BASE & LOCALE TRANSLATIONS</div>
            <div className="p-8 text-center space-y-3 industrial-panel">
              <Database className="w-6 h-6 text-[#626770] mx-auto" />
              <div className="font-display text-sm text-[#F5F6F7]">TERM BASE DISCONNECTED</div>
              <div className="text-xs text-[#626770] max-w-md mx-auto">
                No term base entries are available for this locale. Please configure the term base connector.
              </div>
            </div>
          </div>
        )}

        {/* Fallback for remaining tabs */}
        {!['overview', 'translation', 'terminology'].includes(activeTab) && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl p-8 text-center font-data text-xs space-y-2">
            <div className="font-display text-sm text-[#D6A84B]">{activeTab.toUpperCase().replace('-', ' ')} PANEL</div>
            <div className="text-[#626770]">Telemetry, visual overflow checks, format builds & compliance overlays for {edition.localeName}.</div>
          </div>
        )}

      </div>
    </div>
  );
}
