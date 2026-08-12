'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  Sliders, ChevronRight, BookOpen, Globe, ShieldCheck, Tag, Hash,
  Image, FileText, DollarSign, Gift, Users, FlaskConical, BarChart3,
  History, Activity, ClipboardCheck, AlertTriangle, CheckCircle2,
  ExternalLink, ArrowRight, Eye, RefreshCw
} from 'lucide-react';
import {
  DEMO_LISTINGS, MERCHANDISING_STRATEGIES, COPY_VARIANTS,
  SEARCH_TERMS, GALLERY_SEQUENCES, LISTING_PRICES, MERCHANDISING_EXPERIMENTS,
  BRAND_VOCABULARY
} from '@/lib/merchandising/demo-merchandising-data';

function statusColor(status: string): string {
  const map: Record<string, string> = {
    LIVE: '#22C55E', APPROVED: '#22C55E', PUBLISHED: '#22C55E', PASS: '#22C55E',
    RUNNING: '#D6A84B', OPTIMISING: '#D6A84B', GENERATING: '#D6A84B',
    STALE: '#F59E0B', DRIFTED: '#EF4444', NEEDS_REVIEW: '#F97316', REJECTED: '#EF4444', FAILED: '#EF4444',
    DRAFT: '#6B7280',
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

  const listing = DEMO_LISTINGS.find(l => l.id === listingId) || DEMO_LISTINGS[0];
  const strategy = MERCHANDISING_STRATEGIES[listing.merchandisingStrategyId || 'strat-htt-amz'];
  const price = LISTING_PRICES[listing.currentPriceId || 'pr-htt-amz'];
  const gallery = GALLERY_SEQUENCES[listing.id] || GALLERY_SEQUENCES['lst-etsy-htt-001'] || [];

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
            {listing.externalUrl && (
              <a href={listing.externalUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-[#121418] hover:bg-[#17191E] border border-white/10 text-[#A2A6AD] px-3 py-2 rounded-lg transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> LIVE MARKETPLACE LISTING
              </a>
            )}
            <button className="flex items-center gap-1.5 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-[10px] font-bold px-4 py-2 rounded-lg transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> VERIFY LIVE STATE
            </button>
          </div>
        </div>

        {/* Key Instrumentation */}
        <div className="grid grid-cols-6 gap-3">
          {[
            { label: 'QUALITY SCORE', value: `${listing.listingQualityScore}%`, color: listing.listingQualityScore >= 85 ? '#22C55E' : '#D6A84B' },
            { label: 'DISCOVERABILITY', value: `${listing.discoverabilityScore}%`, color: '#38BDF8' },
            { label: 'CONVERSION RATE', value: `${listing.conversionRatePct}%`, color: '#22C55E' },
            { label: 'NET MARGIN', value: price ? `${price.netMarginPct}%` : '90%', color: '#22C55E' },
            { label: 'NET REVENUE', value: `£${listing.netRevenueGbp.toFixed(2)}`, color: '#22C55E' },
            { label: 'COMPLIANCE', value: listing.complianceStatus, color: listing.complianceStatus === 'PASS' ? '#22C55E' : '#EF4444' },
          ].map(s => (
            <div key={s.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 text-center space-y-1">
              <div className="font-data text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="font-data text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* 16 Tabs Bar */}
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
              <div className="font-display text-xs tracking-wider text-[#626770]">CANONICAL VS CHANNEL SEPARATION</div>
              <div className="space-y-2">
                <div className="bg-[#121418] p-3 rounded-lg border border-white/5 space-y-1">
                  <div className="text-[9px] text-[#D6A84B] font-bold">CANONICAL PRODUCT (PRODUCT FACTORY)</div>
                  <div className="text-[#F5F6F7]">{listing.productName} ({listing.productSku})</div>
                  <div className="text-[10px] text-[#626770]">Immutable master author, publisher, facts, source provenance</div>
                </div>
                <div className="bg-[#121418] p-3 rounded-lg border border-[#D6A84B]/30 space-y-1">
                  <div className="text-[9px] text-[#22C55E] font-bold">CHANNEL LISTING ({listing.marketplaceName})</div>
                  <div className="text-[#F5F6F7]">Marketplace Listing ID: {listing.externalListingId}</div>
                  <div className="text-[10px] text-[#626770]">Channel copy, search keywords, gallery sequence, channel pricing</div>
                </div>
              </div>
            </div>
            <div className="col-span-6 bg-[#0E1014] border border-white/8 rounded-xl p-4 space-y-3">
              <div className="font-display text-xs tracking-wider text-[#626770]">HEALTH & TELEMETRY SUMMARY</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#626770]">Performance State</span>
                  <span className="text-[#22C55E] font-bold">{listing.performanceState}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#626770]">Last Verified</span>
                  <span className="text-[#F5F6F7]">{listing.lastVerifiedAt?.substring(0, 16)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#626770]">Drift Status</span>
                  <span className={listing.isDrifted ? 'text-[#EF4444] font-bold' : 'text-[#22C55E]'}>{listing.isDrifted ? 'DRIFTED' : 'SYNCHRONISED'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'positioning' && strategy && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
            <div className="font-display text-xs tracking-wider text-[#626770]">APPROVED CHANNEL POSITIONING FRAMEWORK</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-[9px] text-[#626770]">PRIMARY AUDIENCE</div>
                <div className="text-[#F5F6F7] bg-[#121418] p-2.5 rounded border border-white/5">{strategy.primaryAudience}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] text-[#626770]">PRIMARY COMMERCIAL ANGLE</div>
                <div className="text-[#F5F6F7] bg-[#121418] p-2.5 rounded border border-white/5">{strategy.primaryCommercialAngle}</div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[9px] text-[#626770]">VALUE PROPOSITION</div>
              <div className="text-[#22C55E] bg-[#121418] p-2.5 rounded border border-white/5 font-bold">{strategy.primaryValueProp}</div>
            </div>
          </div>
        )}

        {activeTab === 'copy' && (
          <div className="space-y-3 font-data text-xs">
            {COPY_VARIANTS.map(c => (
              <div key={c.id} className="bg-[#0E1014] border border-white/8 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs text-[#D6A84B] font-bold">{c.fieldName.toUpperCase()} VARIANT</span>
                  <span className="text-[9px] text-[#22C55E] border border-[#22C55E]/30 bg-[#22C55E]/10 px-2 py-0.5 rounded">{c.contentFidelity}</span>
                </div>
                <div className="text-[#F5F6F7] bg-[#121418] p-3 rounded border border-white/5">{c.variantText}</div>
                <div className="flex items-center gap-4 text-[9px] text-[#626770]">
                  <span>Chars: {c.characterCount} / {c.characterLimit}</span>
                  <span>Condensed: {c.isCondensed ? 'YES' : 'NO'}</span>
                  <span>Status: <strong className="text-[#22C55E]">{c.status}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'search' && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden font-data text-xs">
            <div className="px-4 py-3 border-b border-white/8 font-display text-xs tracking-wider text-[#626770]">APPROVED SEARCH INTENTS & KEYWORDS</div>
            <div className="divide-y divide-white/5">
              {SEARCH_TERMS.map(st => (
                <div key={st.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#F5F6F7]">{st.term}</div>
                    <div className="text-[9px] text-[#626770]">{st.intentCategory} · Source: {st.sourceType}</div>
                  </div>
                  <div className="flex items-center gap-4 text-[10px]">
                    <span className="text-[#626770]">Vol: <strong className="text-[#F5F6F7]">{st.volumeEstimate}</strong></span>
                    <span className="text-[#626770]">CTR: <strong className="text-[#22C55E]">{(st.performanceCtr! * 100).toFixed(1)}%</strong></span>
                    <StatusPill status={st.isApproved ? 'APPROVED' : 'BLOCKED'} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="space-y-3 font-data text-xs">
            <div className="font-display text-xs tracking-wider text-[#626770]">GALLERY STORY SEQUENCE</div>
            <div className="grid grid-cols-3 gap-3">
              {gallery.map(item => (
                <div key={item.id} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#D6A84B]">#{item.position} · {item.purpose}</span>
                    <StatusPill status={item.status} />
                  </div>
                  <div className="h-24 bg-[#121418] rounded border border-white/5 flex items-center justify-center text-[#626770] text-[10px]">
                    [{item.label}]
                  </div>
                  {item.overlayMessage && <div className="text-[9px] text-[#A2A6AD] italic">&ldquo;{item.overlayMessage}&rdquo;</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'price' && price && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
            <div className="font-display text-xs tracking-wider text-[#626770]">MARKETPLACE PRICING & NET CONTRIBUTION</div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-[#121418] p-3 rounded border border-white/5">
                <div className="text-[#626770] text-[9px]">MARKETPLACE PRICE</div>
                <div className="text-[#F5F6F7] font-bold text-lg">£{price.marketplacePriceGbp}</div>
              </div>
              <div className="bg-[#121418] p-3 rounded border border-white/5">
                <div className="text-[#626770] text-[9px]">EST. PLATFORM FEE ({price.estimatedPlatformFeePct}%)</div>
                <div className="text-[#EF4444] font-bold text-lg">-£{((price.marketplacePriceGbp * price.estimatedPlatformFeePct)/100).toFixed(2)}</div>
              </div>
              <div className="bg-[#121418] p-3 rounded border border-white/5">
                <div className="text-[#626770] text-[9px]">EST. NET PROCEEDS</div>
                <div className="text-[#22C55E] font-bold text-lg">£{price.estimatedNetProceedsGbp}</div>
              </div>
              <div className="bg-[#121418] p-3 rounded border border-white/5">
                <div className="text-[#626770] text-[9px]">NET MARGIN</div>
                <div className="text-[#22C55E] font-bold text-lg">{price.netMarginPct}%</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
              <span className="font-display text-sm text-[#22C55E] font-bold">COMPLIANCE PASSED — ZERO BANNED CLAIMS</span>
            </div>
            <div className="space-y-2">
              {BRAND_VOCABULARY.map(b => (
                <div key={b.id} className="flex items-center justify-between bg-[#121418] p-2.5 rounded border border-white/5">
                  <span className="font-bold text-[#F5F6F7]">{b.term}</span>
                  <StatusPill status={b.classification} />
                  <span className="text-[#626770] text-[10px]">{b.reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fallback panel for remaining tabs */}
        {!['overview', 'positioning', 'copy', 'search', 'assets', 'price', 'compliance'].includes(activeTab) && (
          <div className="bg-[#0E1014] border border-white/8 rounded-xl p-8 text-center font-data text-xs space-y-2">
            <div className="font-display text-sm text-[#D6A84B]">{activeTab.toUpperCase().replace('-', ' ')} PANEL</div>
            <div className="text-[#626770]">Telemetry and audit logs actively tracked for this listing.</div>
          </div>
        )}

      </div>
    </div>
  );
}
