'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  Edit3, ChevronRight, CheckCircle2, XCircle, AlertTriangle,
  RotateCcw, ShieldCheck, Languages, BookOpen, Flag, MessageSquare
} from 'lucide-react';
import { DEMO_TRANSLATION_UNITS, LOCALISED_EDITIONS, TRANSLATION_MEMORY, DRAWDOWN_TERM_BASE } from '@/lib/localisation/demo-localisation-data';

export default function SegmentReviewStudio({
  params,
}: {
  params: Promise<{ editionId: string }>;
}) {
  const { editionId } = use(params);
  const edition = LOCALISED_EDITIONS.find(e => e.id === editionId) || LOCALISED_EDITIONS[1];

  const [currentIndex, setCurrentIndex] = useState(2); // Start at tu-003 (disclaimer flag)
  const currentUnit = DEMO_TRANSLATION_UNITS[currentIndex] || DEMO_TRANSLATION_UNITS[0];
  const [targetText, setTargetText] = useState(currentUnit.translatedText || '');

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/localisation" className="hover:text-[#A2A6AD]">GLOBAL LOCALISATION ENGINE</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/localisation/${edition.id}`} className="hover:text-[#A2A6AD]">{edition.localeName}</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">SEGMENT REVIEW STUDIO</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Edit3 className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">SEGMENT REVIEW STUDIO — {edition.localeName}</h1>
            </div>
          </div>
          <Link href={`/localisation/${edition.id}`} className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO EDITION
          </Link>
        </div>

        {/* Segment Navigator */}
        <div className="flex items-center justify-between bg-[#0E1014] border border-white/8 rounded-xl p-3 font-data text-xs">
          <div className="flex items-center gap-4">
            <span className="text-[#626770]">UNIT: <strong className="text-[#D6A84B]">{currentUnit.id}</strong> ({currentIndex + 1} of {DEMO_TRANSLATION_UNITS.length})</span>
            <span className="text-[#626770]">TYPE: <strong className="text-[#F5F6F7]">{currentUnit.unitType}</strong></span>
            {currentUnit.isComplianceSensitive && (
              <span className="text-[#F97316] font-bold bg-[#F97316]/10 px-2 py-0.5 rounded border border-[#F97316]/30 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> COMPLIANCE-SENSITIVE (LEVEL {currentUnit.complianceSensitivity}/5)
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="bg-[#121418] hover:bg-[#17191E] text-[#A2A6AD] disabled:opacity-30 px-3 py-1 rounded border border-white/10 text-[10px]"
            >
              PREVIOUS
            </button>
            <button
              onClick={() => setCurrentIndex(Math.min(DEMO_TRANSLATION_UNITS.length - 1, currentIndex + 1))}
              disabled={currentIndex === DEMO_TRANSLATION_UNITS.length - 1}
              className="bg-[#121418] hover:bg-[#17191E] text-[#A2A6AD] disabled:opacity-30 px-3 py-1 rounded border border-white/10 text-[10px]"
            >
              NEXT
            </button>
          </div>
        </div>

        {/* Side-by-side Editor (§52) */}
        <div className="grid grid-cols-12 gap-6 font-data text-xs">

          {/* Left: Source Text & Context */}
          <div className="col-span-6 space-y-4">
            <div className="bg-[#0E1014] border border-white/8 rounded-xl p-4 space-y-3">
              <div className="font-display text-xs tracking-wider text-[#626770]">CANONICAL ENGLISH SOURCE</div>
              <div className="bg-[#121418] p-4 rounded-lg border border-white/5 text-[#F5F6F7] text-sm leading-relaxed">
                {currentUnit.sourceText}
              </div>
              <div className="text-[10px] text-[#626770]">CONTEXT: {currentUnit.sourceContext || 'General curriculum content'}</div>
            </div>

            {/* Translation Memory & Term Base Matches */}
            <div className="bg-[#0E1014] border border-white/8 rounded-xl p-4 space-y-3">
              <div className="font-display text-xs tracking-wider text-[#38BDF8]">TRANSLATION MEMORY & TERM BASE MATCHES</div>
              <div className="space-y-2">
                {TRANSLATION_MEMORY.slice(0, 2).map(tm => (
                  <div key={tm.id} className="bg-[#121418] p-2.5 rounded border border-white/5 flex items-center justify-between text-[10px]">
                    <span className="text-[#626770]">{tm.sourcePhrase} → <strong className="text-[#22C55E]">{tm.approvedTranslation}</strong></span>
                    <span className="text-[#D6A84B] font-bold">100% TM MATCH</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Target Translation & Actions */}
          <div className="col-span-6 space-y-4">
            <div className="bg-[#0E1014] border border-white/8 rounded-xl p-4 space-y-3">
              <div className="font-display text-xs tracking-wider text-[#22C55E]">GERMAN TARGET TRANSLATION</div>
              <textarea
                rows={5}
                value={targetText}
                onChange={e => setTargetText(e.target.value)}
                className="w-full bg-[#121418] border border-white/10 rounded-lg p-3 text-[#F5F6F7] text-sm leading-relaxed focus:outline-none focus:border-[#22C55E]"
              />

              {currentUnit.reviewerNotes && (
                <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 p-3 rounded-lg text-[10px] text-[#EF4444] space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> COMPLIANCE REVIEWER FLAG:
                  </div>
                  <div>{currentUnit.reviewerNotes}</div>
                </div>
              )}

              {/* Segment Review Action Buttons (§52) */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/8">
                <button className="flex items-center gap-1.5 bg-[#22C55E] hover:bg-[#1fb354] text-[#0A0B0D] font-display text-[10px] font-bold px-4 py-2 rounded-lg transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5" /> APPROVE
                </button>
                <button className="flex items-center gap-1.5 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/30 text-[#EF4444] font-display text-[10px] font-bold px-4 py-2 rounded-lg transition-colors">
                  <XCircle className="w-3.5 h-3.5" /> REJECT
                </button>
                <button className="flex items-center gap-1.5 bg-[#F97316]/10 hover:bg-[#F97316]/20 border border-[#F97316]/30 text-[#F97316] font-display text-[10px] px-3 py-2 rounded-lg transition-colors">
                  <Flag className="w-3.5 h-3.5" /> FLAG
                </button>
                <button className="flex items-center gap-1.5 bg-[#121418] hover:bg-[#17191E] border border-white/10 text-[#A2A6AD] font-display text-[10px] px-3 py-2 rounded-lg transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" /> COMMENT
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
