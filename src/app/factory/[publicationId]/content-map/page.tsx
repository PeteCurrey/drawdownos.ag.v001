'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  Map, BookOpen, ChevronRight, Filter, Search, ShieldCheck,
  AlertTriangle, CheckCircle2, FileText, ArrowRight, CornerDownRight
} from 'lucide-react';
import { CONTENT_ELEMENTS, HOW_TO_TRADE } from '@/lib/factory/demo-factory-data';

function fidelityBadge(fidelity: string) {
  const m: Record<string, string> = {
    SOURCE_DERIVED: 'text-[#22C55E] border-[#22C55E]/30 bg-[#22C55E]/10',
    AI_GENERATED: 'text-[#F97316] border-[#F97316]/30 bg-[#F97316]/10',
    EDITORIALLY_CREATED: 'text-[#818CF8] border-[#818CF8]/30 bg-[#818CF8]/10',
    MARKETING_CONTENT: 'text-[#D6A84B] border-[#D6A84B]/30 bg-[#D6A84B]/10',
  };
  return m[fidelity] ?? 'text-[#6B7280] border-white/10 bg-transparent';
}

export default function ContentMapExplorer({
  params,
}: {
  params: Promise<{ publicationId: string }>;
}) {
  const { publicationId } = use(params);
  const pub = HOW_TO_TRADE;
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>('ce-009');
  const [searchQuery, setSearchQuery] = useState('');

  const types = ['ALL', 'HEADING', 'WORKSHEET', 'CHECKLIST', 'TABLE', 'GLOSSARY_TERM', 'FRAMEWORK', 'FIGURE'];

  const filteredElements = CONTENT_ELEMENTS.filter(el => {
    const matchesType = selectedType === 'ALL' || el.elementType === selectedType;
    const matchesSearch = searchQuery === '' || 
      (el.chapterTitle ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (el.sectionTitle && el.sectionTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (el.textPreview && el.textPreview.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/factory" className="hover:text-[#A2A6AD] transition-colors">PRODUCT FACTORY</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/factory/${publicationId}`} className="hover:text-[#A2A6AD] transition-colors">{pub.canonicalId}</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">CONTENT MAP</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Map className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">CONTENT ELEMENT MAP</h1>
            </div>
          </div>
          <Link href={`/factory/${publicationId}`} className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO COMMAND CENTRE
          </Link>
        </div>

        {/* Summary Bar */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'TOTAL ELEMENTS', value: CONTENT_ELEMENTS.length, color: '#D6A84B' },
            { label: 'CHAPTERS COVERED', value: pub.chapterCount, color: '#38BDF8' },
            { label: 'PAGES INGESTED', value: pub.pageCount, color: '#818CF8' },
            { label: 'FIDELITY GUARANTEE', value: '100% SOURCE DERIVED', color: '#22C55E' },
          ].map(item => (
            <div key={item.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-1">
              <div className="font-data text-[9px] text-[#626770] tracking-wider">{item.label}</div>
              <div className="font-data text-lg font-bold" style={{ color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Filter and Search Bar */}
        <div className="flex items-center justify-between gap-4 bg-[#0E1014] border border-white/8 rounded-xl p-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1 rounded-lg font-display text-[10px] tracking-wider transition-all whitespace-nowrap ${selectedType === t ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30' : 'text-[#626770] hover:text-[#A2A6AD]'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#626770] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search elements..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#121418] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 font-data text-xs text-[#F5F6F7] placeholder-[#626770] focus:outline-none focus:border-[#D6A84B]/50"
            />
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between font-display text-[10px] text-[#626770] tracking-wider">
            <div className="w-16">PAGES</div>
            <div className="w-12">CH.</div>
            <div className="flex-1">TITLE / SECTION</div>
            <div className="w-24">TYPE</div>
            <div className="w-28">FIDELITY</div>
            <div className="w-24 text-center">STANDALONE</div>
            <div className="w-24 text-center">COMMERCIAL</div>
            <div className="w-20 text-center">EDITORIAL</div>
            <div className="w-8"></div>
          </div>

          <div className="divide-y divide-white/5">
            {filteredElements.map(el => (
              <div key={el.id} className="hover:bg-white/2 transition-colors">
                <div
                  onClick={() => setExpandedId(expandedId === el.id ? null : el.id)}
                  className="px-4 py-3 flex items-center justify-between cursor-pointer gap-2"
                >
                  <span className="font-data text-[10px] text-[#626770] w-16">p.{el.pageStart}{el.pageEnd && el.pageEnd !== el.pageStart ? `–${el.pageEnd}` : ''}</span>
                  <span className="font-data text-[10px] text-[#D6A84B] w-12 font-bold">Ch.{el.chapterNum}</span>
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="font-display text-xs text-[#F5F6F7]">{el.chapterTitle}</div>
                    {el.sectionTitle && el.sectionTitle !== el.chapterTitle && (
                      <div className="font-data text-[9px] text-[#626770]">› {el.sectionTitle}</div>
                    )}
                  </div>
                  <span className="font-data text-[9px] text-[#A2A6AD] px-2 py-0.5 rounded border border-white/10 w-24 text-center shrink-0">{el.elementType}</span>
                  <div className="w-28 shrink-0">
                    <span className={`font-data text-[8px] px-1.5 py-0.5 rounded border ${fidelityBadge(el.contentFidelity)}`}>{el.contentFidelity}</span>
                  </div>
                  
                  {/* Standalone Bar */}
                  <div className="w-24 shrink-0 flex items-center gap-1.5 px-2">
                    <div className="flex-1 h-1.5 bg-[#1C1F24] rounded-full overflow-hidden">
                      <div className="h-full bg-[#818CF8]" style={{ width: `${el.standalonePotential}%` }} />
                    </div>
                    <span className="font-data text-[9px] text-[#A2A6AD] font-bold w-6">{el.standalonePotential}</span>
                  </div>

                  {/* Commercial Bar */}
                  <div className="w-24 shrink-0 flex items-center gap-1.5 px-2">
                    <div className="flex-1 h-1.5 bg-[#1C1F24] rounded-full overflow-hidden">
                      <div className="h-full bg-[#22C55E]" style={{ width: `${el.commercialPotential}%` }} />
                    </div>
                    <span className="font-data text-[9px] text-[#22C55E] font-bold w-6">{el.commercialPotential}</span>
                  </div>

                  <span className={`font-data text-[9px] font-bold w-20 text-center shrink-0 ${el.editorialWorkRequired ? 'text-[#F97316]' : 'text-[#22C55E]'}`}>
                    {el.editorialWorkRequired ? 'REQUIRED' : 'NONE'}
                  </span>

                  <ChevronRight className={`w-4 h-4 text-[#626770] shrink-0 transition-transform ${expandedId === el.id ? 'rotate-90' : ''}`} />
                </div>

                {/* Expanded Details */}
                {expandedId === el.id && (
                  <div className="px-6 py-4 bg-[#0A0B0D]/80 border-t border-b border-white/5 space-y-3">
                    <div className="space-y-1">
                      <div className="font-display text-[9px] text-[#626770] tracking-widest uppercase">Content Preview</div>
                      <p className="font-data text-xs text-[#A2A6AD] leading-relaxed italic bg-[#121418] p-3 rounded-lg border border-white/5">
                        &ldquo;{el.textPreview}&rdquo;
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-4 pt-2 font-data text-[10px]">
                      <div>
                        <div className="text-[#626770]">PROVENANCE PATH</div>
                        <div className="text-[#D6A84B] font-bold mt-0.5">{pub.canonicalId} › Ch.{el.chapterNum} › p.{el.pageStart}</div>
                      </div>
                      <div>
                        <div className="text-[#626770]">WORD COUNT</div>
                        <div className="text-[#F5F6F7] mt-0.5">{el.wordCount} words</div>
                      </div>
                      <div>
                        <div className="text-[#626770]">REUSE ELIGIBILITY</div>
                        <div className="text-[#22C55E] font-bold mt-0.5">{el.reuseEligibility ? 'ELSI / REUSE APPROVED' : 'RESTRICTED'}</div>
                      </div>
                      <div>
                        <div className="text-[#626770]">COMPLIANCE SENSITIVITY</div>
                        <div className="text-[#F97316] font-bold mt-0.5">Level {el.complianceSensitivity}/5</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl p-4 space-y-2">
          <div className="font-display text-xs tracking-wider text-[#626770]">FIDELITY CLASSIFICATION LEGEND</div>
          <div className="grid grid-cols-4 gap-4 font-data text-[10px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
              <span className="text-[#F5F6F7] font-bold">SOURCE_DERIVED</span>
              <span className="text-[#626770]">— 100% direct extraction</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
              <span className="text-[#F5F6F7] font-bold">AI_GENERATED</span>
              <span className="text-[#626770]">— Must not be labelled source-derived</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#818CF8]" />
              <span className="text-[#F5F6F7] font-bold">EDITORIALLY_CREATED</span>
              <span className="text-[#626770]">— Human authored addition</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D6A84B]" />
              <span className="text-[#F5F6F7] font-bold">MARKETING_CONTENT</span>
              <span className="text-[#626770]">— Promotional copy</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
