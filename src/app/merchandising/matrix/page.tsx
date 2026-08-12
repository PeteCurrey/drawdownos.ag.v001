'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sliders, ChevronRight, Globe, CheckCircle2, AlertTriangle, ExternalLink
} from 'lucide-react';

export default function MerchandisingMatrix() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/merchandising" className="hover:text-[#A2A6AD]">MERCHANDISING ENGINE</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">COMMERCIAL POSITIONING MAP</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Globe className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">SIDE-BY-SIDE CHANNEL POSITIONING MATRIX</h1>
            </div>
          </div>
          <Link href="/merchandising" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO COMMAND CENTRE
          </Link>
        </div>

        {/* Side-by-side positioning grid */}
        <div className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl overflow-x-auto p-4 space-y-4">
          <div className="font-display text-xs tracking-wider text-[#626770] pb-2 border-b border-white/8">
            TEST PRODUCT: HOW TO TRADE (DD-HTT-001) — CHANNEL POSITIONING COMPARISON
          </div>

          <div className="p-16 flex flex-col items-center justify-center text-center space-y-4">
            <AlertTriangle className="w-10 h-10 text-[#D6A84B]" />
            <div className="font-display text-sm tracking-wider text-[#F5F6F7]">POSITIONING DATA UNAVAILABLE</div>
            <div className="font-data text-xs text-[#626770] max-w-lg">
              Drawdown OS cannot prove the positioning or matrix data. A verified strategy dataset or active channel configuration is required to populate this view.
            </div>
            <div className="font-display text-[10px] text-[#D6A84B] px-4 py-2 border border-[#D6A84B]/30 bg-[#D6A84B]/10 rounded-lg">
              LINK STRATEGY DATABASE
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
