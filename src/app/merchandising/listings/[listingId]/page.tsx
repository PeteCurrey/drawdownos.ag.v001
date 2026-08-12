'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  Sliders, ChevronRight, BookOpen, Globe, ShieldCheck, Tag, Hash,
  Image, FileText, DollarSign, Gift, Users, FlaskConical, BarChart3,
  History, Activity, ClipboardCheck, AlertTriangle, CheckCircle2,
  ExternalLink, ArrowRight, Eye, RefreshCw
} from 'lucide-react';

function statusColor(status: string): string {
  const map: Record<string, string> = {
    LIVE: '#22C55E', APPROVED: '#22C55E', PUBLISHED: '#22C55E', PASS: '#22C55E',
    RUNNING: '#D6A84B', OPTIMISING: '#D6A84B', GENERATING: '#D6A84B',
    STALE: '#F59E0B', DRIFTED: '#EF4444', NEEDS_REVIEW: '#F97316', REJECTED: '#EF4444', FAILED: '#EF4444',
    DRAFT: '#6B7280', UNKNOWN: '#6B7280'
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

const TABS = [
  { id: 'overview', label: 'OVERVIEW', icon: Sliders },
  { id: 'positioning', label: 'POSITIONING', icon: BookOpen },
  { id: 'copy', label: 'COPY', icon: FileText },
  { id: 'search', label: 'SEARCH', icon: Hash },
  { id: 'categories', label: 'CATEGORIES', icon: Tag },
  { id: 'assets', label: 'ASSETS', icon: Image },
  { id: 'sample', label: 'SAMPLE', icon: Eye },
  { id: 'price', label: 'PRICE', icon: DollarSign },
  { id: 'offers', label: 'OFFERS', icon: Gift },
  { id: 'affiliates', label: 'AFFILIATES', icon: Users },
  { id: 'experiments', label: 'EXPERIMENTS', icon: FlaskConical },
  { id: 'performance', label: 'PERFORMANCE', icon: BarChart3 },
  { id: 'compliance', label: 'COMPLIANCE', icon: ShieldCheck },
  { id: 'versions', label: 'VERSIONS', icon: History },
  { id: 'marketplace-state', label: 'MARKETPLACE STATE', icon: Globe },
  { id: 'audit', label: 'AUDIT', icon: ClipboardCheck },
] as const;

type TabId = typeof TABS[number]['id'];

export default function ListingDetailCommandCentre({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const { listingId } = use(params);
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const listing = {
    id: listingId,
    marketplaceName: 'UNVERIFIED MARKETPLACE',
    listingVersion: '0',
    status: 'UNKNOWN',
    productName: 'No Product Data',
    productSku: 'NO-SKU',
    externalUrl: '',
    listingQualityScore: 0,
    discoverabilityScore: 0,
    conversionRatePct: 0,
    netRevenueGbp: 0,
    complianceStatus: 'UNKNOWN',
    performanceState: 'UNKNOWN',
    isDrifted: false,
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/merchandising" className="hover:text-[#A2A6AD]">MERCHANDISING ENGINE</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/merchandising/listings" className="hover:text-[#A2A6AD]">LISTINGS FACTORY</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">{listing.marketplaceName}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Globe className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">{listing.marketplaceName} LISTING</h1>
                  <span className="font-data text-[9px] text-[#D6A84B]">v{listing.listingVersion}</span>
                  <StatusPill status={listing.status} />
                </div>
                <div className="font-data text-[10px] text-[#626770]">{listing.productName} ({listing.productSku})</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 font-data text-xs">
            <button className="flex items-center gap-1.5 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-[10px] font-bold px-4 py-2 rounded-lg transition-colors opacity-50 cursor-not-allowed">
              <RefreshCw className="w-3.5 h-3.5" /> VERIFY LIVE STATE
            </button>
          </div>
        </div>

        {/* Key Instrumentation */}
        <div className="grid grid-cols-6 gap-3">
          {[
            { label: 'QUALITY SCORE', value: '-', color: '#626770' },
            { label: 'DISCOVERABILITY', value: '-', color: '#626770' },
            { label: 'CONVERSION RATE', value: '-', color: '#626770' },
            { label: 'NET MARGIN', value: '-', color: '#626770' },
            { label: 'NET REVENUE', value: '-', color: '#626770' },
            { label: 'COMPLIANCE', value: 'UNKNOWN', color: '#626770' },
          ].map(s => (
            <div key={s.label} className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl p-3 text-center space-y-1">
              <div className="font-data text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="font-data text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* 16 Tabs Bar */}
        <div className="flex items-center gap-1 overflow-x-auto bg-[#0E1014] border border-white/8 rounded-xl p-1 industrial-panel">
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
            <div className="col-span-6 industrial-panel bg-[#0E1014] border border-white/8 rounded-xl p-4 space-y-3">
              <div className="font-display text-xs tracking-wider text-[#626770]">CANONICAL VS CHANNEL SEPARATION</div>
              <EmptyStatePanel title="NO CANONICAL PRODUCT" message="Cannot verify canonical product without database connection." action="CONNECT DATABASE" />
            </div>
            <div className="col-span-6 industrial-panel bg-[#0E1014] border border-white/8 rounded-xl p-4 space-y-3">
              <div className="font-display text-xs tracking-wider text-[#626770]">HEALTH & TELEMETRY SUMMARY</div>
              <EmptyStatePanel title="NO TELEMETRY" message="No channel integration available." action="CONNECT CHANNEL" />
            </div>
          </div>
        )}

        {activeTab === 'positioning' && (
          <div className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
            <div className="font-display text-xs tracking-wider text-[#626770]">APPROVED CHANNEL POSITIONING FRAMEWORK</div>
            <EmptyStatePanel title="NO POSITIONING DATA" message="Requires a verified strategy record." action="CREATE STRATEGY" />
          </div>
        )}

        {activeTab === 'copy' && (
          <div className="space-y-3 font-data text-xs">
            <EmptyStatePanel title="NO COPY VARIANTS" message="Copy generation requires an active merchandising pipeline." action="CONFIGURE PIPELINE" />
          </div>
        )}

        {activeTab === 'search' && (
          <div className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden font-data text-xs">
            <div className="px-4 py-3 border-b border-white/8 font-display text-xs tracking-wider text-[#626770]">APPROVED SEARCH INTENTS & KEYWORDS</div>
            <EmptyStatePanel title="NO SEARCH INTENT DATA" message="Requires a verified keyword taxonomy record." action="CONNECT SEO TOOLS" />
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="space-y-3 font-data text-xs">
            <div className="font-display text-xs tracking-wider text-[#626770]">GALLERY STORY SEQUENCE</div>
            <EmptyStatePanel title="NO GALLERY ASSETS" message="Asset sequence cannot be verified." action="CONNECT ASSET LIBRARY" />
          </div>
        )}

        {activeTab === 'price' && (
          <div className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
            <div className="font-display text-xs tracking-wider text-[#626770]">MARKETPLACE PRICING & NET CONTRIBUTION</div>
            <EmptyStatePanel title="NO PRICING DATA" message="Cannot verify real-time marketplace pricing or fees." action="CONNECT COMMERCE API" />
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
            <div className="font-display text-xs tracking-wider text-[#626770]">COMPLIANCE STATUS</div>
            <EmptyStatePanel title="NO COMPLIANCE SIGNALS" message="Brand vocabulary checks require a connected truth layer." action="CONFIGURE COMPLIANCE" />
          </div>
        )}

        {/* Fallback panel for remaining tabs */}
        {!['overview', 'positioning', 'copy', 'search', 'assets', 'price', 'compliance'].includes(activeTab) && (
          <div className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl p-8 text-center font-data text-xs space-y-2">
            <div className="font-display text-sm text-[#D6A84B]">{activeTab.toUpperCase().replace('-', ' ')} PANEL</div>
            <EmptyStatePanel title="NO TRUTHFUL DATA" message="Drawdown OS cannot prove the existence of this information without a verified connection." action="MANAGE CONNECTORS" />
          </div>
        )}

      </div>
    </div>
  );
}
