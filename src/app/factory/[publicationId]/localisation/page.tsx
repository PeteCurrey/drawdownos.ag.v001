'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  Languages, ChevronRight, BookOpen, AlertTriangle, CheckCircle2,
  Plus, ShieldCheck, Globe, UserCheck
} from 'lucide-react';
import { LOCALISED_EDITIONS, TRANSLATION_MEMORY, HOW_TO_TRADE } from '@/lib/factory/demo-factory-data';

function stateBadge(state: string) {
  const m: Record<string, string> = {
    SOURCE: 'text-[#626770] border-white/10 bg-transparent',
    TRANSLATED_DRAFT: 'text-[#D6A84B] border-[#D6A84B]/30 bg-[#D6A84B]/10',
    REVIEW: 'text-[#F97316] border-[#F97316]/30 bg-[#F97316]/10',
    APPROVED: 'text-[#22C55E] border-[#22C55E]/30 bg-[#22C55E]/10',
    PUBLISHED: 'text-[#22C55E] border-[#22C55E]/30 bg-[#22C55E]/10',
  };
  return m[state] ?? 'text-[#626770] border-white/10 bg-transparent';
}

export default function LocalisationStudio({
  params,
}: {
  params: Promise<{ publicationId: string }>;
}) {
  const { publicationId } = use(params);
  const pub = HOW_TO_TRADE;

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
              <span className="text-[#D6A84B]">LOCALISATION</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Languages className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">LOCALISATION & TRANSLATION MEMORY STUDIO</h1>
            </div>
          </div>
          <Link href={`/factory/${publicationId}`} className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO COMMAND CENTRE
          </Link>
        </div>

        {/* Header Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'LOCALISED EDITIONS', value: LOCALISED_EDITIONS.length, color: '#D6A84B' },
            { label: 'TRANSLATION MEMORY', value: `${TRANSLATION_MEMORY.length} terms`, color: '#38BDF8' },
            { label: 'POTENTIAL RSA UNLOCK', value: '+9.9 pts total', color: '#22C55E' },
            { label: 'HUMAN QA MANDATE', value: 'ACTIVE', color: '#F97316' },
          ].map(s => (
            <div key={s.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-1">
              <div className="font-data text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="font-data text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Language Editions Grid */}
        <div className="space-y-3">
          <div className="font-display text-xs tracking-wider text-[#626770]">TARGET LANGUAGE EDITIONS</div>
          <div className="grid grid-cols-3 gap-4">
            {LOCALISED_EDITIONS.map(ed => (
              <div key={ed.id} className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-lg font-bold text-[#F5F6F7]">{ed.language.toUpperCase()}</span>
                    <span className="font-data text-xs text-[#626770]">({ed.locale})</span>
                  </div>
                  <span className={`font-data text-[9px] px-2 py-0.5 rounded border ${stateBadge(ed.state)}`}>
                    {ed.state}
                  </span>
                </div>

                <div className="font-data text-[10px] text-[#626770]">
                  PARENT SKU: <span className="text-[#D6A84B]">{ed.parentProductSku}</span>
                </div>

                {/* State Progression Tracker */}
                <div className="space-y-1">
                  <div className="font-data text-[8px] text-[#626770] tracking-wider">PROGRESSION PIPELINE</div>
                  <div className="grid grid-cols-5 gap-1">
                    {['SOURCE', 'DRAFT', 'REVIEW', 'APPROVED', 'PUB'].map((st, i) => (
                      <div key={st} className="text-center">
                        <div className={`h-1 rounded-full ${i <= 1 ? 'bg-[#D6A84B]' : 'bg-[#1C1F24]'}`} />
                        <span className="font-data text-[7px] text-[#626770]">{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5 font-data text-[10px]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#626770]">Translator:</span>
                    <span className="text-[#F5F6F7] font-bold">{ed.translator || 'Unassigned'}</span>
                  </div>
                  {ed.translationNotes && (
                    <div className="text-[#A2A6AD] italic bg-[#121418] p-2 rounded text-[9px]">
                      &ldquo;{ed.translationNotes}&rdquo;
                    </div>
                  )}
                </div>

                <button className="w-full font-display text-[10px] font-bold py-2 bg-[#D6A84B]/10 hover:bg-[#D6A84B]/20 text-[#D6A84B] border border-[#D6A84B]/30 rounded-lg transition-colors">
                  ASSIGN / MANAGE TRANSLATOR
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Translation Memory Table */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
            <span className="font-display text-xs tracking-wider text-[#626770]">APPROVED TRANSLATION MEMORY (BRAND & REGULATORY TERMS)</span>
            <button className="flex items-center gap-1.5 font-display text-[10px] text-[#D6A84B] bg-[#D6A84B]/10 px-3 py-1.5 rounded-lg border border-[#D6A84B]/30 hover:bg-[#D6A84B]/20 transition-colors">
              <Plus className="w-3 h-3" /> ADD TERM
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {TRANSLATION_MEMORY.map(tm => (
              <div key={tm.id} className="px-4 py-3 flex items-center justify-between font-data text-xs">
                <div className="w-48 font-bold text-[#F5F6F7]">{tm.sourcePhrase}</div>
                <div className="w-16 text-[#D6A84B]">{tm.language.toUpperCase()}</div>
                <div className="flex-1 font-bold text-[#22C55E]">{tm.approvedTranslation}</div>
                <div className="w-48 text-[#626770] text-[10px]">{tm.context}</div>
                <div className="w-32 text-right text-[9px] text-[#A2A6AD]">Appr: {tm.approvedBy}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Localisation Rules Panel */}
        <div className="bg-[#0E1014] border border-[#F97316]/30 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#F97316]" />
            <span className="font-display text-xs tracking-wider text-[#F97316]">LOCALISATION COMPLIANCE MANDATES</span>
          </div>
          <div className="grid grid-cols-2 gap-3 font-data text-[10px] text-[#A2A6AD]">
            <div className="flex items-start gap-2 bg-[#121418] p-2.5 rounded-lg border border-white/5">
              <AlertTriangle className="w-3.5 h-3.5 text-[#F97316] shrink-0 mt-0.5" />
              <span>Do not automatically localise legal or regulatory disclaimers without local jurisdiction review.</span>
            </div>
            <div className="flex items-start gap-2 bg-[#121418] p-2.5 rounded-lg border border-white/5">
              <AlertTriangle className="w-3.5 h-3.5 text-[#F97316] shrink-0 mt-0.5" />
              <span>Brand terminology (e.g. Drawdown OS) must remain locked as defined in Translation Memory.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
