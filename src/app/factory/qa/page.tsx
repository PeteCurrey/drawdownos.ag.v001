'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ClipboardCheck, ChevronRight, CheckCircle2, XCircle, AlertTriangle,
  RotateCcw, Eye, FileText, Cpu, ShieldCheck
} from 'lucide-react';
import { QA_REVIEWS, FACTORY_JOBS } from '@/lib/factory/demo-factory-data';

function qaStatusBadge(status: string) {
  const m: Record<string, string> = {
    APPROVED: 'text-[#22C55E] border-[#22C55E]/30 bg-[#22C55E]/10',
    PENDING: 'text-[#D6A84B] border-[#D6A84B]/30 bg-[#D6A84B]/10',
    IN_REVIEW: 'text-[#F97316] border-[#F97316]/30 bg-[#F97316]/10 animate-pulse',
    REJECTED: 'text-[#EF4444] border-[#EF4444]/30 bg-[#EF4444]/10',
  };
  return m[status] ?? 'text-[#626770] border-white/10 bg-transparent';
}

export default function QAQueue() {
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const types = ['ALL', 'SOURCE_QA', 'EPUB_QA', 'VISUAL_QA', 'PRODUCT_QA', 'TRANSLATION_QA', 'COMPLIANCE_QA'];

  const filteredQA = QA_REVIEWS.filter(q => activeTab === 'ALL' || q.qaType === activeTab);

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/factory" className="hover:text-[#A2A6AD] transition-colors">PRODUCT FACTORY</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">HUMAN QA QUEUE</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#F97316]/30 flex items-center justify-center">
                <ClipboardCheck className="w-4 h-4 text-[#F97316]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">FACTORY HUMAN QA QUEUE</h1>
            </div>
          </div>
          <Link href="/factory" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO FACTORY
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'PENDING REVIEWS', value: QA_REVIEWS.filter(q => q.status === 'PENDING').length, color: '#D6A84B' },
            { label: 'IN REVIEW', value: QA_REVIEWS.filter(q => q.status === 'IN_REVIEW').length, color: '#F97316' },
            { label: 'APPROVED TODAY', value: QA_REVIEWS.filter(q => q.status === 'APPROVED').length, color: '#22C55E' },
            { label: 'HUMAN GATE STATUS', value: 'MANDATORY', color: '#818CF8' },
          ].map(s => (
            <div key={s.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-1">
              <div className="font-data text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="font-data text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1 overflow-x-auto bg-[#0E1014] border border-white/8 rounded-xl p-1">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-1.5 rounded-lg font-display text-[10px] tracking-wider transition-all whitespace-nowrap ${activeTab === t ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30' : 'text-[#626770] hover:text-[#A2A6AD]'}`}
            >
              {t.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {/* Main List */}
        <div className="space-y-3">
          {filteredQA.map(qa => (
            <div key={qa.id} className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-bold text-[#F5F6F7]">{qa.entityLabel}</span>
                    <span className={`font-data text-[9px] px-2 py-0.5 rounded border ${qaStatusBadge(qa.status)}`}>
                      {qa.status}
                    </span>
                    <span className="font-data text-[9px] px-2 py-0.5 rounded border border-white/10 text-[#818CF8]">
                      {qa.qaType.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="font-data text-[10px] text-[#626770]">QA RECORD ID: {qa.id}</div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {qa.status === 'PENDING' && (
                    <button className="flex items-center gap-1.5 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors">
                      START REVIEW
                    </button>
                  )}
                  {qa.status === 'IN_REVIEW' && (
                    <>
                      <button className="flex items-center gap-1 bg-[#22C55E] hover:bg-[#1fb354] text-[#0A0B0D] font-display text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5" /> APPROVE
                      </button>
                      <button className="flex items-center gap-1 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/30 text-[#EF4444] font-display text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors">
                        <XCircle className="w-3.5 h-3.5" /> REJECT
                      </button>
                      <button className="flex items-center gap-1 bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 border border-[#38BDF8]/30 text-[#38BDF8] font-display text-[10px] px-3 py-1.5 rounded-lg transition-colors">
                        <RotateCcw className="w-3.5 h-3.5" /> REGENERATE
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Reviewer Notes */}
              {qa.reviewerNotes && (
                <div className="font-data text-xs text-[#A2A6AD] bg-[#121418] p-3 rounded-lg border border-white/5 space-y-1">
                  <div className="font-display text-[9px] text-[#626770] tracking-wider">REVIEWER NOTES</div>
                  <div>&ldquo;{qa.reviewerNotes}&rdquo;</div>
                </div>
              )}

              {/* Visual QA comparison mock panel */}
              {qa.qaType === 'VISUAL_QA' && (
                <div className="grid grid-cols-2 gap-4 bg-[#121418] p-3 rounded-lg border border-white/5 font-data text-xs">
                  <div className="space-y-1">
                    <div className="text-[9px] text-[#626770]">SOURCE LAYOUT</div>
                    <div className="bg-[#0A0B0D] p-3 rounded border border-white/10 text-[#A2A6AD] text-[10px]">
                      [PDF Visual Source — Page 14 Layout Map]
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] text-[#626770]">GENERATED EPUB3 / PDF</div>
                    <div className="bg-[#0A0B0D] p-3 rounded border border-white/10 text-[#22C55E] text-[10px]">
                      [Reflowable EPUB3 Render Engine Preview]
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Warning Banner */}
        <div className="bg-[#0E1014] border border-[#F97316]/30 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
          <div className="space-y-1 font-data text-[10px]">
            <div className="font-display text-xs font-bold text-[#F97316]">HUMAN REVIEW MANDATE</div>
            <div className="text-[#A2A6AD]">
              Complex document conversions, format generations, and compliance claims MUST pass human QA before commercial release. Drawdown OS never publishes automated conversions blindly.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
