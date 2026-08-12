'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sliders, ChevronRight, Globe, CheckCircle2, AlertTriangle, ExternalLink
} from 'lucide-react';
import { DEMO_LISTINGS, MERCHANDISING_STRATEGIES, LISTING_PRICES } from '@/lib/merchandising/demo-merchandising-data';

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
        <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-x-auto p-4 space-y-4">
          <div className="font-display text-xs tracking-wider text-[#626770] pb-2 border-b border-white/8">
            TEST PRODUCT: HOW TO TRADE (DD-HTT-001) — CHANNEL POSITIONING COMPARISON
          </div>

          <div className="grid grid-cols-5 gap-4 min-w-[1200px] font-data text-xs">
            {DEMO_LISTINGS.map(lst => {
              const strat = MERCHANDISING_STRATEGIES[lst.merchandisingStrategyId || 'strat-htt-amz'];
              const price = LISTING_PRICES[lst.currentPriceId || 'pr-htt-amz'];
              return (
                <div key={lst.id} className="bg-[#121418] border border-white/8 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="border-b border-white/5 pb-2">
                      <div className="font-display text-sm font-bold text-[#F5F6F7]">{lst.marketplaceName}</div>
                      <div className="text-[9px] text-[#D6A84B]">{lst.externalListingId}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[8px] text-[#626770] tracking-wider">PRIMARY AUDIENCE</div>
                      <div className="text-[10px] text-[#A2A6AD] bg-[#0A0B0D] p-2 rounded border border-white/5">{strat?.primaryAudience || 'Self-directed trader'}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[8px] text-[#626770] tracking-wider">VALUE PROPOSITION</div>
                      <div className="text-[10px] text-[#22C55E] bg-[#0A0B0D] p-2 rounded border border-white/5 font-bold">{strat?.primaryValueProp || 'Structured education'}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[8px] text-[#626770] tracking-wider">PRIMARY CTA</div>
                      <div className="text-[10px] text-[#F5F6F7] italic">&ldquo;{strat?.primaryCta || 'Order now'}&rdquo;</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[8px] text-[#626770] tracking-wider">PRICE & MARGIN</div>
                      <div className="text-xs font-bold text-[#F5F6F7]">£{price?.marketplacePriceGbp || '19.99'} <span className="text-[#22C55E] text-[10px]">({price?.netMarginPct || 70}% margin)</span></div>
                    </div>
                  </div>

                  <Link href={`/merchandising/listings/${lst.id}`} className="block text-center font-display text-[9px] text-[#D6A84B] hover:text-[#e2b558] border border-[#D6A84B]/20 rounded py-1.5 transition-colors">
                    MANAGE CHANNEL
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
