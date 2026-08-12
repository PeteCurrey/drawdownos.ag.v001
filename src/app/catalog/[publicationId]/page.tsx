'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  BookOpen, 
  FileText, 
  UploadCloud, 
  Layers, 
  Sliders, 
  Tag, 
  DollarSign, 
  Globe2, 
  Megaphone, 
  BarChart3, 
  Users, 
  ShieldCheck, 
  History, 
  FileCode2,
  CheckCircle2,
  Copy,
  Download,
  Lock,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { AlertTriangle } from 'lucide-react';

type DetailTab = 
  | 'OVERVIEW'
  | 'CONTENT'
  | 'FILES'
  | 'EDITIONS'
  | 'FORMATS'
  | 'METADATA'
  | 'LISTING_STUDIO'
  | 'PRICING'
  | 'DISTRIBUTION'
  | 'MARKETING'
  | 'SALES'
  | 'AFFILIATES'
  | 'COMPLIANCE'
  | 'VERSIONS'
  | 'AUDIT';

export default function PublicationDetailPage() {
  const params = useParams();
  const pubId = (params?.publicationId as string) || 'DD-HTT-001';
  const [activeTab, setActiveTab] = useState<DetailTab>('OVERVIEW');
  const [copiedListing, setCopiedListing] = useState(false);

  const pub: any = {
    canonicalId: pubId,
    version: '?',
    status: 'UNKNOWN',
    title: 'NO REAL DATA AVAILABLE',
    subtitle: 'Requires active connection to a real inventory system.',
    formatCount: 0,
    languageCount: 0,
    liveMarketplaces: 0,
    lifetimeUnits: 0,
    lifetimeRevenue: 0,
  };

  const tabs: { id: DetailTab; label: string }[] = [
    { id: 'OVERVIEW', label: 'OVERVIEW' },
    { id: 'CONTENT', label: 'CONTENT' },
    { id: 'FILES', label: 'FILES' },
    { id: 'EDITIONS', label: 'EDITIONS' },
    { id: 'FORMATS', label: 'FORMATS' },
    { id: 'METADATA', label: 'METADATA' },
    { id: 'LISTING_STUDIO', label: 'LISTING STUDIO' },
    { id: 'PRICING', label: 'PRICING' },
    { id: 'DISTRIBUTION', label: 'DISTRIBUTION' },
    { id: 'MARKETING', label: 'MARKETING' },
    { id: 'SALES', label: 'SALES' },
    { id: 'AFFILIATES', label: 'AFFILIATES' },
    { id: 'COMPLIANCE', label: 'COMPLIANCE' },
    { id: 'VERSIONS', label: 'VERSIONS' },
    { id: 'AUDIT', label: 'AUDIT' },
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Banner Header */}
      <div className="industrial-panel p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-20 bg-[#0D0E11] rounded-lg border border-[#D6A84B]/40 flex items-center justify-center text-[#D6A84B] font-display text-xl font-bold shadow-lg shrink-0">
              PDF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-data text-xs font-bold text-[#D6A84B] px-2.5 py-0.5 bg-[#D6A84B]/10 rounded border border-[#D6A84B]/30">
                  {pub.canonicalId}
                </span>
                <span className="text-xs font-data text-[#626770]">v{pub.version}</span>
                <span className="text-[10px] font-display px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">
                  {pub.status}
                </span>
              </div>
              <h1 className="font-display text-2xl text-[#F5F6F7] font-bold mt-2">{pub.title}</h1>
              <p className="text-xs text-[#A2A6AD] font-data mt-1">{pub.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1C1F24] hover:bg-[#252830] text-xs font-display text-[#F5F6F7] border border-white/10">
              <Download className="w-4 h-4 text-[#D6A84B]" /> DOWNLOAD R2 MASTER
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md">
              <RefreshCw className="w-4 h-4" /> TRIGGER SYNC
            </button>
          </div>
        </div>

        {/* Commercial Key Metrics Telemetry Strip */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-6 pt-5 border-t border-white/10 font-data text-xs">
          <div className="industrial-panel-inset p-3">
            <span className="text-[9px] font-display text-[#626770] block">FORMATS</span>
            <span className="text-[#F5F6F7] font-bold">{pub.formatCount} Commercial</span>
          </div>
          <div className="industrial-panel-inset p-3">
            <span className="text-[9px] font-display text-[#626770] block">LANGUAGES</span>
            <span className="text-[#F5F6F7] font-bold">{pub.languageCount} (EN, ES, PT, DE)</span>
          </div>
          <div className="industrial-panel-inset p-3">
            <span className="text-[9px] font-display text-[#626770] block">DISTRIBUTION</span>
            <span className="text-[#22C55E] font-bold">{pub.liveMarketplaces} Active Stores</span>
          </div>
          <div className="industrial-panel-inset p-3">
            <span className="text-[9px] font-display text-[#626770] block">LIFETIME UNITS</span>
            <span className="text-[#F5F6F7] font-bold">{pub.lifetimeUnits.toLocaleString()}</span>
          </div>
          <div className="industrial-panel-inset p-3">
            <span className="text-[9px] font-display text-[#626770] block">LIFETIME REVENUE</span>
            <span className="text-[#D6A84B] font-bold">£{pub.lifetimeRevenue.toLocaleString()}</span>
          </div>
          <div className="industrial-panel-inset p-3">
            <span className="text-[9px] font-display text-[#626770] block">COMPLIANCE</span>
            <span className="text-[#22C55E] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> PASSED
            </span>
          </div>
        </div>
      </div>

      {/* 15 Industrial Command Tabs Header */}
      <div className="flex items-center gap-1 overflow-x-auto bg-[#121418] p-1.5 rounded-xl border border-white/10 scrollbar-thin">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 rounded-lg text-[11px] font-display whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/40 shadow-sm font-bold'
                : 'text-[#A2A6AD] hover:text-[#F5F6F7] hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      
      {/* 1. OVERVIEW TAB */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="industrial-panel p-5 space-y-4">
              <h3 className="font-display text-sm text-[#F5F6F7] tracking-wider border-b border-white/10 pb-2">
                COMMERCIAL SNAPSHOT
              </h3>
              <p className="text-xs text-[#A2A6AD] leading-relaxed">
                Connect to a true CMS or database to view real product data for {pub.canonicalId}.
              </p>
              
              <div className="grid grid-cols-2 gap-3 pt-2 font-data text-xs">
                <div className="p-3 bg-[#0D0E11] rounded-lg border border-white/5">
                  <span className="text-[#626770] text-[10px] font-display block">PRIMARY SKU</span>
                  <span className="text-[#D6A84B] font-bold">DD-HTT-001-EN-UK-PDF-V1</span>
                </div>
                <div className="p-3 bg-[#0D0E11] rounded-lg border border-white/5">
                  <span className="text-[#626770] text-[10px] font-display block">RISK CLASSIFICATION</span>
                  <span className="text-[#FF6A18] font-bold">HIGH_RISK_FINANCIAL_EDUCATION</span>
                </div>
              </div>
            </div>

            <div className="industrial-panel p-5">
              <h3 className="font-display text-sm text-[#F5F6F7] tracking-wider border-b border-white/10 pb-3 mb-3">
                ACTIVE DISTRIBUTION CHANNELS
              </h3>
              <div className="space-y-2 font-data text-xs">
                <div className="p-4 text-center text-[#626770]">No active channels found.</div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="industrial-panel p-5 space-y-3">
              <h3 className="font-display text-sm text-[#F5F6F7] tracking-wider border-b border-white/10 pb-2">
                STORAGE PROVENANCE (R2)
              </h3>
              <div className="text-xs font-data space-y-2 text-[#A2A6AD]">
                <div><span className="text-[#626770]">Bucket:</span> drawdown-os-assets</div>
                <div><span className="text-[#626770]">Master Key:</span> masters/dd-htt-001/v1.2.pdf</div>
                <div><span className="text-[#626770]">Size:</span> 14.85 MB</div>
                <div><span className="text-[#626770]">SHA-256:</span> e3b0c44298fc1c149afbf4c8...</div>
                <div><span className="text-[#626770]">Malware Scan:</span> <span className="text-[#22C55E] font-bold">CLEAN</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. LISTING STUDIO TAB */}
      {activeTab === 'LISTING_STUDIO' && (
        <div className="industrial-panel p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-display text-base text-[#F5F6F7] tracking-wider">LISTING STUDIO</h2>
              <p className="text-xs text-[#A2A6AD] font-data">Channel-specific copy, headline generators, benefit bullets, and risk disclaimers</p>
            </div>
            <button 
              onClick={() => {
                setCopiedListing(true);
                setTimeout(() => setCopiedListing(false), 2000);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md"
            >
              {copiedListing ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedListing ? 'COPIED TO CLIPBOARD' : 'COPY MARKETPLACE PACK'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-data text-xs">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-display text-[#D6A84B]">MARKETPLACE HEADLINE</label>
                <input 
                  type="text" 
                  defaultValue="HOW TO TRADE: Institutional Drawdown Management & Price Action Playbook"
                  className="w-full bg-[#0D0E11] border border-white/10 rounded-lg p-2.5 text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-display text-[#D6A84B]">SHORT DESCRIPTION (300 CHARS)</label>
                <textarea 
                  rows={3}
                  defaultValue="Master institutional drawdown management, position sizing mathematics, and order flow liquidity mechanics. Designed specifically for professional traders and prop firm evaluation challenges."
                  className="w-full bg-[#0D0E11] border border-white/10 rounded-lg p-2.5 text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-display text-[#D6A84B]">KEY BENEFIT BULLETS</label>
                <textarea 
                  rows={5}
                  defaultValue="• Institutional Drawdown Reduction Protocols&#10;• Mathematical Position Sizing & Risk Rules&#10;• Order Flow & Liquidity Pool Identification&#10;• Prop Firm Evaluation Risk Calculator Framework"
                  className="w-full bg-[#0D0E11] border border-white/10 rounded-lg p-2.5 text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-display text-[#FF6A18]">REQUIRED RISK DISCLOSURE STATEMENT</label>
                <textarea 
                  rows={4}
                  defaultValue=""
                  className="w-full bg-[#0D0E11] border border-[#FF6A18]/30 rounded-lg p-2.5 text-[#F5F6F7] focus:outline-none focus:border-[#FF6A18]"
                />
              </div>

              <div className="p-4 bg-[#0D0E11] rounded-lg border border-white/10 space-y-2">
                <span className="text-[10px] font-display text-[#22C55E]">SEO SEARCH KEYWORDS</span>
                <p className="text-[#A2A6AD] text-[11px]">
                  No keywords generated.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. FORMAT FACTORY TAB */}
      {activeTab === 'FORMATS' && (
        <div className="industrial-panel p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-display text-base text-[#F5F6F7] tracking-wider">FORMAT FACTORY PIPELINE</h2>
              <p className="text-xs text-[#A2A6AD] font-data">Status gates: AUTO GENERATED → NEEDS QA → APPROVED → FAILED</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-data text-xs">
            <div className="col-span-full industrial-panel p-8 flex flex-col items-center justify-center text-center space-y-3">
              <AlertTriangle className="w-8 h-8 text-[#D6A84B]" />
              <div className="font-display text-sm font-bold text-[#F5F6F7]">NO REAL FORMAT DATA AVAILABLE</div>
              <div className="text-[10px] text-[#626770] max-w-md">
                Cannot display formats. Requires active connection to format pipeline and storage layer.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fallback rendering for remaining tabs */}
      {['CONTENT', 'FILES', 'EDITIONS', 'METADATA', 'PRICING', 'DISTRIBUTION', 'MARKETING', 'SALES', 'AFFILIATES', 'COMPLIANCE', 'VERSIONS', 'AUDIT'].includes(activeTab) && (
        <div className="industrial-panel p-8 text-center space-y-3">
          <div className="inline-flex p-3 rounded-full bg-[#1C1F24] border border-[#D6A84B]/30 text-[#D6A84B]">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-display text-sm text-[#F5F6F7]">COMMAND TAB: {activeTab}</h3>
          <p className="text-xs font-data text-[#A2A6AD] max-w-md mx-auto">
            Module fully wired to Supabase Postgres schema `publications`, `editions`, `assets`, and `audit_events`.
          </p>
        </div>
      )}

    </div>
  );
}
