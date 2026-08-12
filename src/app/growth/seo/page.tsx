'use client';

import React from 'react';
import Link from 'next/link';
import { Search, ChevronRight, BookOpen, DollarSign, TrendingUp, Sparkles, ExternalLink } from 'lucide-react';
import { DEMO_SEO_OPPORTUNITIES } from '@/lib/growth/demo-growth-data';

export default function SEOCommandPage() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/growth" className="hover:text-[#A2A6AD]">GROWTH COMMAND</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#38BDF8]">SEO COMMAND</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#38BDF8]/30 flex items-center justify-center">
                <Search className="w-4 h-4 text-[#38BDF8]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">SEO COMMAND — OWNED ORGANIC ACQUISITION</h1>
            </div>
          </div>
          <Link href="/growth" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO CONTROL ROOM
          </Link>
        </div>

        {/* Opportunities List */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
          <div className="font-display text-xs tracking-wider text-[#626770] border-b border-white/8 pb-2">
            SOURCE IP REPURPOSING & ORGANIC NET REVENUE ATTRIBUTION
          </div>
          <div className="space-y-3">
            {DEMO_SEO_OPPORTUNITIES.map(seo => (
              <div key={seo.id} className="bg-[#121418] border border-white/5 rounded-lg p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-bold text-[#F5F6F7]">{seo.topicTitle}</span>
                    <span className="text-[9px] text-[#D6A84B] font-bold">Score: {seo.opportunityScore}/100</span>
                  </div>
                  <div className="text-[10px] text-[#626770]">Source: {seo.sourceChapter} · Intent: {seo.searchIntent}</div>
                </div>

                <div className="flex items-center gap-6 text-[10px]">
                  <div>
                    <span className="text-[#626770]">Sessions: </span>
                    <strong className="text-[#38BDF8]">{seo.organicSessions.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[#626770]">Attributed Net: </span>
                    <strong className="text-[#22C55E]">£{seo.organicNetRevenueGbp.toLocaleString()}</strong>
                  </div>
                  <button className="bg-[#1C1F24] hover:bg-white/10 text-[#38BDF8] font-display text-[9px] font-bold px-3 py-1.5 rounded border border-[#38BDF8]/30">
                    REPURPOSE ARTICLE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
