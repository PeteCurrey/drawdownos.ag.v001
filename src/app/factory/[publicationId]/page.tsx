'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  BookOpen, Map, GitBranch, Package, Cpu, ShieldCheck, ClipboardCheck,
  ChevronRight, AlertTriangle, CheckCircle2, Clock, Globe, Layers,
  TrendingUp, ArrowRight, FileText, Hash, Image, Archive, Languages,
  Zap, Factory, BarChart3, Eye, FlaskConical, History,
} from 'lucide-react';
import {
  HOW_TO_TRADE, CONTENT_ELEMENTS, IP_GRAPH, HOW_TO_TRADE_FAMILY,
  PRODUCT_OPPORTUNITIES, PRODUCT_BOMS, FACTORY_JOBS, QA_REVIEWS,
  LOCALISED_EDITIONS, IP_YIELD, NEXT_FACTORY_JOBS, SURFACE_UNLOCK_SIMS,
} from '@/lib/factory/demo-factory-data';

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function statusColor(status: string) {
  const m: Record<string, string> = {
    APPROVED_SOURCE: '#22C55E', LIVE: '#22C55E', APPROVED: '#22C55E', COMPLETE: '#22C55E', PUBLISHED: '#22C55E',
    RUNNING: '#D6A84B', IN_FACTORY: '#D6A84B', GENERATING: '#D6A84B', APPROVED_FOR_SALE: '#38BDF8',
    WAITING_HUMAN: '#F97316', NEEDS_QA: '#F97316',
    FAILED: '#EF4444', REJECTED: '#EF4444',
    QUEUED: '#6B7280', NOT_REQUIRED: '#6B7280',
    OPPORTUNITY: '#818CF8', REVIEWING: '#818CF8',
    STALE: '#F59E0B',
  };
  return m[status] ?? '#6B7280';
}

function fidelityBadge(fidelity: string) {
  const m: Record<string, string> = {
    SOURCE_DERIVED: 'text-[#22C55E] border-[#22C55E]/30 bg-[#22C55E]/10',
    AI_GENERATED: 'text-[#F97316] border-[#F97316]/30 bg-[#F97316]/10',
    EDITORIALLY_CREATED: 'text-[#818CF8] border-[#818CF8]/30 bg-[#818CF8]/10',
    MARKETING_CONTENT: 'text-[#D6A84B] border-[#D6A84B]/30 bg-[#D6A84B]/10',
  };
  return m[fidelity] ?? 'text-[#6B7280] border-white/10 bg-transparent';
}

function StatusPill({ status }: { status: string }) {
  return (
    <span className="font-data text-[9px] px-2 py-0.5 rounded border" style={{ color: statusColor(status), borderColor: `${statusColor(status)}30`, backgroundColor: `${statusColor(status)}10` }}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

// ─── TABS ────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'source', label: 'SOURCE', icon: BookOpen },
  { id: 'content-map', label: 'CONTENT MAP', icon: Map },
  { id: 'ip-graph', label: 'IP GRAPH', icon: GitBranch },
  { id: 'family', label: 'PRODUCT FAMILY', icon: Package },
  { id: 'opportunities', label: 'OPPORTUNITIES', icon: FlaskConical },
  { id: 'formats', label: 'FORMATS', icon: Layers },
  { id: 'assets', label: 'ASSETS', icon: Image },
  { id: 'metadata', label: 'METADATA', icon: Hash },
  { id: 'market-req', label: 'MARKET REQ.', icon: Globe },
  { id: 'compliance', label: 'COMPLIANCE', icon: ShieldCheck },
  { id: 'qa', label: 'QA', icon: ClipboardCheck },
  { id: 'versions', label: 'VERSIONS', icon: History },
  { id: 'localisation', label: 'LOCALISATION', icon: Languages },
  { id: 'factory-jobs', label: 'FACTORY JOBS', icon: Cpu },
] as const;
type TabId = typeof TABS[number]['id'];

// ─── TAB PANELS ──────────────────────────────────────────────────────────────

function SourceTab() {
  const pub = HOW_TO_TRADE;
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-5 space-y-4">
        <div className="bg-[#121418] border border-white/8 rounded-xl p-4 space-y-3">
          <div className="font-display text-xs tracking-wider text-[#626770]">SOURCE ASSET</div>
          <div className="flex items-start gap-3">
            <div className="w-16 h-20 rounded bg-gradient-to-b from-[#D6A84B]/20 to-[#D6A84B]/5 border border-[#D6A84B]/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-[#D6A84B]" />
            </div>
            <div className="space-y-1.5">
              <div className="font-display text-base font-bold text-[#F5F6F7]">{pub.title}</div>
              <div className="font-data text-[10px] text-[#A2A6AD]">{pub.subtitle}</div>
              <div className="flex items-center gap-2">
                <span className="font-data text-[9px] text-[#D6A84B]">{pub.canonicalId}</span>
                <StatusPill status={pub.qualityState} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-data">
            {[
              ['Author', pub.author], ['Publisher', pub.publisher], ['Edition', pub.edition],
              ['Language', pub.language.toUpperCase()], ['Copyright', pub.copyrightYear.toString()],
              ['Approved', pub.approvedAt?.substring(0, 10) ?? '—'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-2">
                <span className="text-[#626770]">{k}</span>
                <span className="text-[#A2A6AD] truncate">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#121418] border border-white/8 rounded-xl p-4 space-y-2">
          <div className="font-display text-xs tracking-wider text-[#626770]">DOCUMENT METRICS</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'CHAPTERS', value: pub.chapterCount },
              { label: 'PAGES', value: pub.pageCount },
              { label: 'WORDS (est.)', value: (pub.wordCountEstimate / 1000).toFixed(0) + 'k' },
            ].map(s => (
              <div key={s.label} className="bg-[#0A0B0D] rounded-lg p-3 text-center">
                <div className="font-data text-xl font-bold text-[#F5F6F7]">{s.value}</div>
                <div className="font-data text-[8px] text-[#626770] tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#121418] border border-white/8 rounded-xl p-4 space-y-2">
          <div className="font-display text-xs tracking-wider text-[#626770]">STORAGE & INTEGRITY</div>
          <div className="space-y-1.5 font-data text-[10px]">
            <div className="flex justify-between">
              <span className="text-[#626770]">R2 Key</span>
              <span className="text-[#A2A6AD] font-mono text-[9px]">{pub.r2Key}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#626770]">Checksum SHA-256</span>
              <span className="text-[#A2A6AD] font-mono text-[9px]">{pub.checksumSha256?.substring(0, 16)}…</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#626770]">Parse Warnings</span>
              <span className={pub.parseWarnings.length === 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}>{pub.parseWarnings.length === 0 ? 'NONE' : pub.parseWarnings.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-7 bg-[#121418] border border-white/8 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/8">
          <span className="font-display text-xs tracking-wider text-[#626770]">SOURCE INGESTION PIPELINE</span>
        </div>
        <div className="p-4 space-y-2">
          {[
            { step: 'Upload master PDF', done: true },
            { step: 'Generate SHA-256 checksum', done: true },
            { step: 'Store immutable original in R2', done: true },
            { step: 'Create source asset record', done: true },
            { step: 'Detect document type — PDF (Visually designed)', done: true },
            { step: 'Extract structured text', done: true },
            { step: 'Detect page structure & visual hierarchy', done: true },
            { step: 'Identify 19 chapters', done: true },
            { step: 'Identify sections, headings, tables', done: true },
            { step: 'Identify worksheets & checklists', done: true },
            { step: 'Identify glossary & reference sections', done: true },
            { step: 'Generate content map (19 elements)', done: true },
            { step: 'Create searchable index', done: true },
            { step: 'Run quality checks', done: true },
            { step: 'Human approval — source confirmed', done: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
              <span className="font-data text-[10px] text-[#A2A6AD]">{item.step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContentMapTab() {
  const [expanded, setExpanded] = useState<string | null>('ce-009');
  return (
    <div className="bg-[#121418] border border-white/8 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
        <span className="font-display text-xs tracking-wider text-[#626770]">CONTENT ELEMENT MAP — DD-HTT-001</span>
        <div className="flex items-center gap-4 font-data text-[10px]">
          <span className="text-[#22C55E]">19 chapters</span>
          <span className="text-[#A2A6AD]">SOURCE DERIVED: all</span>
        </div>
      </div>
      <div className="divide-y divide-white/5">
        {CONTENT_ELEMENTS.map(el => (
          <div key={el.id}>
            <button
              onClick={() => setExpanded(expanded === el.id ? null : el.id)}
              className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/2 transition-colors text-left"
            >
              <span className="font-data text-[9px] text-[#626770] w-16 shrink-0">p.{el.pageStart}{el.pageEnd && el.pageEnd !== el.pageStart ? `–${el.pageEnd}` : ''}</span>
              <span className="font-data text-[9px] text-[#D6A84B] w-8 shrink-0">Ch.{el.chapterNum}</span>
              <div className="flex-1 min-w-0">
                <div className="font-display text-[11px] text-[#F5F6F7]">{el.chapterTitle}</div>
                {el.sectionTitle && el.sectionTitle !== el.chapterTitle && (
                  <div className="font-data text-[9px] text-[#626770]">› {el.sectionTitle}</div>
                )}
              </div>
              <span className="font-data text-[9px] text-[#A2A6AD] px-2 py-0.5 rounded border border-white/10">{el.elementType}</span>
              <span className={`font-data text-[8px] px-1.5 py-0.5 rounded border ${fidelityBadge(el.contentFidelity)}`}>{el.contentFidelity}</span>
              <div className="flex items-center gap-2 text-[9px] font-data shrink-0">
                <span className="text-[#626770]">SA:{el.standalonePotential}</span>
                <span className="text-[#626770]">COM:{el.commercialPotential}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 text-[#626770] transition-transform ${expanded === el.id ? 'rotate-90' : ''}`} />
            </button>
            {expanded === el.id && (
              <div className="px-4 pb-3 pl-28 space-y-2 bg-[#0A0B0D]/50">
                <div className="font-data text-[10px] text-[#A2A6AD] italic">{el.textPreview}</div>
                <div className="flex items-center gap-4 font-data text-[9px]">
                  <span className="text-[#626770]">Words: {el.wordCount}</span>
                  <span className="text-[#626770]">Standalone: {el.standalonePotential}/100</span>
                  <span className="text-[#626770]">Commercial: {el.commercialPotential}/100</span>
                  <span className={el.editorialWorkRequired ? 'text-[#F97316]' : 'text-[#22C55E]'}>
                    Editorial work: {el.editorialWorkRequired ? 'REQUIRED' : 'NOT REQUIRED'}
                  </span>
                  <span className="text-[#626770]">Compliance sensitivity: {el.complianceSensitivity}</span>
                  <span className="text-[#626770]">Reuse eligible: {el.reuseEligibility ? 'YES' : 'NO'}</span>
                </div>
                <div className="font-data text-[9px] text-[#D6A84B]">PROVENANCE: {el.publicationId} › ch.{el.chapterNum} › {el.sectionTitle} › p.{el.pageStart} [{el.contentFidelity}]</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function IPGraphTab() {
  const root = IP_GRAPH.nodes[0];
  if (!root) return null;
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4 space-y-3">
        <div className="bg-[#121418] border border-white/8 rounded-xl p-4 space-y-2">
          <div className="font-display text-xs tracking-wider text-[#626770]">IP GRAPH SUMMARY</div>
          {[
            { label: 'Total Nodes', value: IP_GRAPH.totalNodes },
            { label: 'Total Edges', value: IP_GRAPH.totalEdges },
            { label: 'Generated', value: IP_GRAPH.generatedAt.substring(0, 10) },
          ].map(item => (
            <div key={item.label} className="flex justify-between font-data text-[10px]">
              <span className="text-[#626770]">{item.label}</span>
              <span className="text-[#A2A6AD]">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="bg-[#121418] border border-white/8 rounded-xl p-4 space-y-2">
          <div className="font-display text-xs tracking-wider text-[#626770]">PROVENANCE ANSWER</div>
          <div className="font-data text-[10px] text-[#A2A6AD] italic">
            &ldquo;Where did Risk Management Workbook come from?&rdquo;
          </div>
          <div className="space-y-1 font-data text-[9px]">
            <div className="text-[#22C55E]">SOURCE: DD-HTT-001</div>
            <div className="text-[#A2A6AD]">→ Chapter 9 — Risk Management (p.53–60)</div>
            <div className="text-[#A2A6AD]">→ Chapter 10 — Position Sizing (p.61–66)</div>
            <div className="text-[#A2A6AD]">→ Position Sizing Table (SOURCE_DERIVED)</div>
            <div className="text-[#D6A84B]">Content fidelity: SOURCE_DERIVED</div>
            <div className="text-[#D6A84B]">Source coverage: 87%</div>
            <div className="text-[#F97316]">Editorial gap: 13% — workbook structure</div>
          </div>
        </div>
      </div>
      <div className="col-span-8 bg-[#121418] border border-white/8 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/8">
          <span className="font-display text-xs tracking-wider text-[#626770]">IP GRAPH TREE — {root.label}</span>
        </div>
        <div className="p-4 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D6A84B] shadow-[0_0_8px_#D6A84B]" />
            <span className="font-display text-sm text-[#D6A84B] font-bold">{root.label}</span>
            <span className="font-data text-[9px] text-[#626770]">PUBLICATION</span>
          </div>
          {root.children?.map(child => (
            <div key={child.id} className="ml-6 space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-px h-3 bg-[#2A2D33]" />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: child.nodeType === 'DERIVATIVE' ? '#818CF8' : child.nodeType === 'BUNDLE' ? '#22C55E' : '#38BDF8' }} />
                <span className="font-display text-[11px] text-[#F5F6F7]">{child.label}</span>
                <span className="font-data text-[9px] text-[#626770]">{child.nodeType}</span>
                {child.ipClass && <span className="font-data text-[8px] text-[#D6A84B] px-1.5 py-0.5 rounded border border-[#D6A84B]/20 bg-[#D6A84B]/5">{child.ipClass}</span>}
                <span className="font-data text-[9px] text-[#626770]">SA:{child.standalonePotential} COM:{child.commercialPotential}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductFamilyTab() {
  return (
    <div className="space-y-3">
      {HOW_TO_TRADE_FAMILY.products.map(p => (
        <div key={p.productSku} className="bg-[#121418] border border-white/8 rounded-xl p-4">
          <div className="flex items-start gap-4">
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: statusColor(p.releaseStatus), boxShadow: `0 0 6px ${statusColor(p.releaseStatus)}` }} />
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm text-[#F5F6F7]">{p.name}</span>
                    <span className="font-data text-[9px] text-[#D6A84B]">{p.productSku}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 font-data text-[9px] text-[#626770]">
                    <span>Job: {p.customerJob}</span>
                    <span>Type: {p.opportunityType}</span>
                    <span>{p.liveMarketplaces} live markets</span>
                    <span>{p.approvedFormats} formats</span>
                    {p.rsaContribution > 0 && <span className="text-[#22C55E]">RSA +{p.rsaContribution} pts</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusPill status={p.releaseStatus} />
                  {p.priceGBP && <span className="font-data text-sm font-bold text-[#F5F6F7]">£{p.priceGBP}</span>}
                </div>
              </div>
              {PRODUCT_BOMS[p.productSku] && (
                <div className="flex items-center gap-3">
                  <span className="font-data text-[9px] text-[#626770]">Readiness:</span>
                  <div className="flex-1 max-w-48 h-1 bg-[#0A0B0D] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${PRODUCT_BOMS[p.productSku].readinessScorePct}%`, backgroundColor: PRODUCT_BOMS[p.productSku].readinessScorePct >= 90 ? '#22C55E' : '#D6A84B' }} />
                  </div>
                  <span className="font-data text-[9px] font-bold text-[#A2A6AD]">{PRODUCT_BOMS[p.productSku].readinessScorePct}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OpportunitiesTab() {
  return (
    <div className="space-y-3">
      {PRODUCT_OPPORTUNITIES.map(opp => (
        <div key={opp.id} className={`bg-[#121418] border rounded-xl p-4 ${opp.backlogStatus === 'REJECTED' ? 'border-[#EF4444]/20 opacity-60' : 'border-white/8'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm text-[#F5F6F7]">{opp.title}</span>
                <span className="font-data text-[9px] text-[#D6A84B]">{opp.proposedSku}</span>
                <StatusPill status={opp.backlogStatus} />
                <span className="font-data text-[9px] px-2 py-0.5 rounded border border-white/10 text-[#A2A6AD]">{opp.opportunityType}</span>
              </div>
              {opp.rejectionReason ? (
                <div className="font-data text-[9px] text-[#EF4444] italic">REJECTED: {opp.rejectionReason}</div>
              ) : (
                <>
                  <div className="font-data text-[9px] text-[#626770]">{opp.whyStandalone}</div>
                  <div className="flex items-center gap-4 font-data text-[9px]">
                    <span className="text-[#A2A6AD]">Source coverage: <span style={{ color: opp.sourceCoveragePct >= 85 ? '#22C55E' : '#D6A84B' }}>{opp.sourceCoveragePct}%</span></span>
                    <span className="text-[#A2A6AD]">Distinctiveness: <span className="text-[#F5F6F7]">{opp.distinctivenessScore}/100</span></span>
                    <span className="text-[#22C55E] font-bold">RSA +{opp.rsaUnlockPts} pts</span>
                    <span className="text-[#626770]">Cannibalisation: {opp.cannibalisation.relationship}</span>
                    <span className="text-[#626770]">Confidence: {opp.confidence}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FormatsTab() {
  const allFormats = Object.values(PRODUCT_BOMS).flatMap(bom =>
    bom.formats.map(f => ({ ...f, productName: bom.productName, productSku: bom.productSku }))
  );
  return (
    <div className="bg-[#121418] border border-white/8 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/8">
        <span className="font-display text-xs tracking-wider text-[#626770]">FORMAT MANUFACTURING STATUS</span>
      </div>
      <div className="divide-y divide-white/5">
        {allFormats.map((fmt, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3">
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: statusColor(fmt.status), boxShadow: fmt.status === 'GENERATING' ? `0 0 8px ${statusColor(fmt.status)}` : 'none' }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-display text-[11px] text-[#F5F6F7]">{fmt.formatType.replace(/_/g, ' ')}</span>
                <span className="font-data text-[9px] text-[#D6A84B]">{fmt.productSku}</span>
              </div>
              <div className="font-data text-[9px] text-[#626770]">{fmt.productName}</div>
            </div>
            {fmt.pageCount && <span className="font-data text-[9px] text-[#626770]">{fmt.pageCount}pp</span>}
            {fmt.fileSizeBytes && <span className="font-data text-[9px] text-[#626770]">{(fmt.fileSizeBytes / 1000000).toFixed(1)}MB</span>}
            <StatusPill status={fmt.status} />
            {fmt.blocking && <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444] shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketReqTab() {
  const mainBOM = PRODUCT_BOMS['DD-HTT-001'];
  if (!mainBOM) return null;
  return (
    <div className="space-y-3">
      <div className="bg-[#D6A84B]/5 border border-[#D6A84B]/20 rounded-xl p-3">
        <div className="font-data text-[10px] text-[#D6A84B]">
          Product Factory queries Marketplace Connector Factory via <code className="font-mono bg-[#D6A84B]/10 px-1 rounded">getMarketplaceRequirements()</code> · <code className="font-mono bg-[#D6A84B]/10 px-1 rounded">getSupportedFormats()</code> · <code className="font-mono bg-[#D6A84B]/10 px-1 rounded">getRequiredAssets()</code>. Requirements are not hard-coded here.
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {mainBOM.marketplacePackages.map(pkg => (
          <div key={pkg.marketplaceId} className="bg-[#121418] border border-white/8 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm text-[#F5F6F7]">{pkg.marketplaceName}</span>
              <StatusPill status={pkg.status} />
            </div>
            {pkg.missingItems.length > 0 ? (
              <div className="space-y-1">
                {pkg.missingItems.map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-[#F97316]" />
                    <span className="font-data text-[9px] text-[#A2A6AD]">{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                <span className="font-data text-[9px] text-[#22C55E]">All requirements met</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplianceTab() {
  return (
    <div className="space-y-3">
      <div className="bg-[#22C55E]/5 border border-[#22C55E]/20 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
          <span className="font-display text-sm text-[#22C55E]">COMPLIANCE CLEARED — DD-HTT-001</span>
        </div>
        <div className="font-data text-[10px] text-[#A2A6AD]">All Drawdown publishing principles verified. No blocking compliance issues.</div>
      </div>
      <div className="bg-[#121418] border border-white/8 rounded-xl p-4 space-y-3">
        <div className="font-display text-xs tracking-wider text-[#626770]">DRAWDOWN PRODUCT PRINCIPLES</div>
        <div className="space-y-2">
          {[
            { rule: 'NO SIGNALS', status: 'PASS', notes: 'No signals or alerts content present' },
            { rule: 'NO GUARANTEED RETURNS', status: 'PASS', notes: 'No guaranteed return claims identified' },
            { rule: 'NO INCOME PROMISES', status: 'PASS', notes: 'No income or lifestyle promises present' },
            { rule: 'NO FABRICATED STATISTICS', status: 'PASS', notes: 'All statistics source-verified' },
            { rule: 'NO FAKE URGENCY', status: 'PASS', notes: 'No artificial scarcity or urgency language' },
            { rule: 'RISK STATED PLAINLY', status: 'PASS', notes: 'Risk disclaimer present and prominent' },
            { rule: 'COMMERCIAL RELATIONSHIPS DISCLOSED', status: 'PASS', notes: 'Publisher/author identified' },
            { rule: 'CONTENT FIDELITY CLEAR', status: 'PASS', notes: 'All content marked SOURCE_DERIVED — no AI content in this edition' },
          ].map(rule => (
            <div key={rule.rule} className="flex items-center gap-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
              <div className="flex-1">
                <span className="font-display text-[10px] text-[#F5F6F7]">{rule.rule}</span>
                <span className="font-data text-[9px] text-[#626770] ml-2">{rule.notes}</span>
              </div>
              <span className="font-data text-[9px] text-[#22C55E] font-bold">{rule.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QATab() {
  return (
    <div className="space-y-3">
      {QA_REVIEWS.map(qa => (
        <div key={qa.id} className="bg-[#121418] border border-white/8 rounded-xl p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm text-[#F5F6F7]">{qa.entityLabel}</span>
                <StatusPill status={qa.status} />
              </div>
              <div className="font-data text-[9px] text-[#626770]">{qa.qaType.replace(/_/g, ' ')}</div>
              {qa.reviewerNotes && <div className="font-data text-[10px] text-[#A2A6AD] italic">{qa.reviewerNotes}</div>}
            </div>
            {qa.status === 'PENDING' && (
              <Link href="/factory/qa" className="flex items-center gap-1.5 bg-[#D6A84B]/10 hover:bg-[#D6A84B]/20 border border-[#D6A84B]/30 text-[#D6A84B] font-display text-[10px] px-3 py-1.5 rounded-lg transition-colors">
                REVIEW <ChevronRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function VersionsTab() {
  return (
    <div className="bg-[#121418] border border-white/8 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/8">
        <span className="font-display text-xs tracking-wider text-[#626770]">VERSION HISTORY — SEPARATE SOURCE / PRODUCT / FORMAT / LISTING VERSIONS</span>
      </div>
      <div className="divide-y divide-white/5">
        {[
          { entity: 'DD-HTT-001', type: 'SOURCE', version: 'v1', date: '2024-03-15', status: 'APPROVED', note: 'Initial master ingestion' },
          { entity: 'DD-HTT-001', type: 'PRODUCT', version: 'v1', date: '2024-04-01', status: 'LIVE', note: 'First commercial edition' },
          { entity: 'DD-HTT-001 — Premium PDF', type: 'FORMAT', version: 'v1', date: '2024-04-10', status: 'APPROVED', note: 'Visual QA passed' },
          { entity: 'DD-HTT-001 — Etsy', type: 'LISTING', version: 'v1', date: '2024-04-15', status: 'PUBLISHED', note: 'First listing' },
          { entity: 'DD-HTT-001 — Etsy', type: 'LISTING', version: 'v2', date: '2024-05-20', status: 'STALE', note: 'Gallery asset update pending' },
          { entity: 'DD-HTT-WB-001', type: 'PRODUCT', version: 'v1', date: '2024-05-01', status: 'APPROVED_FOR_SALE', note: 'Workbook approved' },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3">
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: statusColor(row.status) }} />
            <div className="flex-1 min-w-0">
              <div className="font-display text-[11px] text-[#F5F6F7]">{row.entity}</div>
              <div className="font-data text-[9px] text-[#626770]">{row.note}</div>
            </div>
            <span className="font-data text-[9px] text-[#A2A6AD] px-2 py-0.5 rounded border border-white/10">{row.type}</span>
            <span className="font-data text-[9px] text-[#D6A84B] font-bold">{row.version}</span>
            <StatusPill status={row.status} />
            <span className="font-data text-[9px] text-[#626770]">{row.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LocalisationTab() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {LOCALISED_EDITIONS.map(ed => (
          <div key={ed.id} className="bg-[#121418] border border-white/8 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm text-[#F5F6F7]">{ed.language.toUpperCase()} ({ed.locale})</span>
              <StatusPill status={ed.state} />
            </div>
            <div className="font-data text-[9px] text-[#626770]">{ed.parentProductSku}</div>
            <div className="space-y-1 font-data text-[9px] text-[#A2A6AD]">
              <div>State: <span className="text-[#F5F6F7]">{ed.state}</span></div>
              {ed.translator && <div>Translator: {ed.translator}</div>}
              {ed.translationNotes && <div className="italic">{ed.translationNotes}</div>}
            </div>
            <button className="w-full text-center font-display text-[9px] text-[#D6A84B] hover:text-[#e2b558] transition-colors py-1.5 border border-[#D6A84B]/20 rounded-lg">
              ASSIGN TRANSLATOR
            </button>
          </div>
        ))}
      </div>
      <Link href="/factory/pub-dd-htt-001/localisation" className="flex items-center justify-between px-4 py-3 bg-[#121418] hover:bg-[#17191E] border border-white/8 rounded-xl transition-colors">
        <span className="font-display text-xs text-[#A2A6AD]">OPEN LOCALISATION STUDIO</span>
        <ChevronRight className="w-4 h-4 text-[#626770]" />
      </Link>
    </div>
  );
}

function FactoryJobsTab() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'RUNNING', value: FACTORY_JOBS.filter(j => j.status === 'RUNNING').length, color: '#D6A84B' },
          { label: 'QUEUED', value: FACTORY_JOBS.filter(j => j.status === 'QUEUED').length, color: '#6B7280' },
          { label: 'AWAITING HUMAN', value: FACTORY_JOBS.filter(j => j.status === 'WAITING_HUMAN').length, color: '#F97316' },
          { label: 'COMPLETE', value: FACTORY_JOBS.filter(j => j.status === 'COMPLETE').length, color: '#22C55E' },
        ].map(s => (
          <div key={s.label} className="bg-[#121418] border border-white/8 rounded-xl p-3 text-center">
            <div className="font-data text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="font-data text-[9px] text-[#626770] tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-[#121418] border border-white/8 rounded-xl overflow-hidden">
        <div className="divide-y divide-white/5">
          {FACTORY_JOBS.map(job => (
            <div key={job.id} className="flex items-center gap-4 px-4 py-3">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: statusColor(job.status), boxShadow: job.status === 'RUNNING' ? `0 0 8px ${statusColor(job.status)}` : 'none' }} />
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-display text-[11px] text-[#F5F6F7]">{job.jobType.replace(/_/g, ' ')}</span>
                  {job.productSku && <span className="font-data text-[9px] text-[#D6A84B]">{job.productSku}</span>}
                  {job.surfaceUnlockPts && <span className="font-data text-[9px] text-[#22C55E]">+{job.surfaceUnlockPts} pts unlock</span>}
                </div>
                {job.progressStage && <div className="font-data text-[9px] text-[#626770]">{job.progressStage}</div>}
                {job.status === 'RUNNING' && (
                  <div className="h-0.5 bg-[#0A0B0D] rounded-full overflow-hidden w-32">
                    <div className="h-full bg-[#D6A84B] rounded-full" style={{ width: `${job.progressPct}%` }} />
                  </div>
                )}
              </div>
              <StatusPill status={job.status} />
              <span className="font-data text-[9px] text-[#626770]">{job.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function PublicationCommandCentre({
  params,
}: {
  params: Promise<{ publicationId: string }>;
}) {
  const { publicationId } = use(params);
  const [activeTab, setActiveTab] = useState<TabId>('source');
  const pub = HOW_TO_TRADE; // In production: fetch by publicationId

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* ── BREADCRUMB + HEADER ── */}
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/factory" className="hover:text-[#A2A6AD] transition-colors">PRODUCT FACTORY</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">{pub.canonicalId}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">{pub.title.toUpperCase()}</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-data text-[10px] text-[#626770]">{pub.canonicalId}</span>
                  <StatusPill status={pub.qualityState} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/factory/${publicationId}/content-map`} className="flex items-center gap-2 bg-[#121418] hover:bg-[#17191E] border border-white/10 text-[#A2A6AD] font-display text-[10px] px-3 py-2 rounded-lg transition-colors">
              <Map className="w-3.5 h-3.5" /> CONTENT MAP
            </Link>
            <Link href={`/factory/${publicationId}/ip-graph`} className="flex items-center gap-2 bg-[#121418] hover:bg-[#17191E] border border-white/10 text-[#A2A6AD] font-display text-[10px] px-3 py-2 rounded-lg transition-colors">
              <GitBranch className="w-3.5 h-3.5" /> IP GRAPH
            </Link>
            <Link href="/factory/qa" className="flex items-center gap-2 bg-[#F97316]/10 hover:bg-[#F97316]/20 border border-[#F97316]/30 text-[#F97316] font-display text-[10px] px-3 py-2 rounded-lg transition-colors">
              <ClipboardCheck className="w-3.5 h-3.5" /> QA QUEUE ({QA_REVIEWS.filter(q => q.status === 'PENDING').length})
            </Link>
          </div>
        </div>

        {/* ── INSTRUMENTATION ROW ── */}
        <div className="grid grid-cols-7 gap-3">
          {[
            { label: 'IP YIELD', value: `${IP_YIELD.ipYieldScore}`, color: '#D6A84B' },
            { label: 'CONTENT ELEMENTS', value: CONTENT_ELEMENTS.length },
            { label: 'APPROVED PRODUCTS', value: HOW_TO_TRADE_FAMILY.products.filter(p => !['IDEA','OPPORTUNITY'].includes(p.releaseStatus)).length },
            { label: 'FORMATS APPROVED', value: '4' },
            { label: 'LIVE SURFACES', value: IP_YIELD.liveCommercialSurfaces },
            { label: 'UNLOCKABLE', value: IP_YIELD.additionalUnlockableSurfaces },
            { label: 'QA PENDING', value: QA_REVIEWS.filter(q => q.status === 'PENDING').length, color: '#F97316' },
          ].map(item => (
            <div key={item.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 text-center">
              <div className="font-data text-2xl font-bold" style={{ color: (item as { color?: string }).color ?? '#F5F6F7' }}>{item.value}</div>
              <div className="font-data text-[9px] text-[#626770] tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>

        {/* ── TAB BAR ── */}
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

        {/* ── TAB PANELS ── */}
        {activeTab === 'source' && <SourceTab />}
        {activeTab === 'content-map' && <ContentMapTab />}
        {activeTab === 'ip-graph' && <IPGraphTab />}
        {activeTab === 'family' && <ProductFamilyTab />}
        {activeTab === 'opportunities' && <OpportunitiesTab />}
        {activeTab === 'formats' && <FormatsTab />}
        {activeTab === 'assets' && (
          <div className="bg-[#121418] border border-white/8 rounded-xl p-6 text-center">
            <Image className="w-8 h-8 text-[#626770] mx-auto mb-2" />
            <div className="font-display text-sm text-[#A2A6AD]">Asset management coming from Asset Factory pipeline.</div>
            <div className="font-data text-[10px] text-[#626770] mt-1">Cover, thumbnail, gallery, social and mockup asset tracking.</div>
          </div>
        )}
        {activeTab === 'metadata' && (
          <div className="bg-[#121418] border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8">
              <span className="font-display text-xs tracking-wider text-[#626770]">CANONICAL METADATA — DD-HTT-001</span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4 font-data text-[10px]">
              {[
                ['Title', pub.title], ['Subtitle', pub.subtitle ?? '—'],
                ['Author', pub.author], ['Publisher', pub.publisher],
                ['Edition', pub.edition], ['Language', pub.language.toUpperCase()],
                ['Copyright', pub.copyrightYear.toString()], ['Canonical ID', pub.canonicalId],
                ['Word Count (est.)', pub.wordCountEstimate.toLocaleString()], ['Page Count', pub.pageCount.toString()],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#626770]">{k}</span>
                  <span className="text-[#A2A6AD]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'market-req' && <MarketReqTab />}
        {activeTab === 'compliance' && <ComplianceTab />}
        {activeTab === 'qa' && <QATab />}
        {activeTab === 'versions' && <VersionsTab />}
        {activeTab === 'localisation' && <LocalisationTab />}
        {activeTab === 'factory-jobs' && <FactoryJobsTab />}
      </div>
    </div>
  );
}
