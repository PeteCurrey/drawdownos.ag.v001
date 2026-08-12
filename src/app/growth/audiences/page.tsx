'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, ChevronRight, Users, Download, DollarSign, TrendingUp } from 'lucide-react';

export default function OwnedAudiencePage() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/growth" className="hover:text-[#A2A6AD]">GROWTH COMMAND</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">OWNED AUDIENCE ENGINE</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Layers className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">OWNED AUDIENCE ENGINE & LEAD MAGNETS</h1>
            </div>
          </div>
          <Link href="/growth" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO CONTROL ROOM
          </Link>
        </div>

        {/* Lead Magnets List */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
          <div className="font-display text-xs tracking-wider text-[#626770] border-b border-white/8 pb-2">
            FREE PRODUCT / LEAD MAGNET CONVERSION TELEMETRY
          </div>
          <div className="space-y-3">
            <div className="bg-[#121418] border border-white/5 rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-3 industrial-panel">
              <Layers className="w-8 h-8 text-[#D6A84B]" />
              <div className="font-display text-sm font-bold text-[#F5F6F7]">NO REAL AUDIENCE DATA AVAILABLE</div>
              <div className="text-[10px] text-[#626770] max-w-md">
                Cannot display audience telemetry. Requires active connection to CRM, ESP (e.g., Klaviyo, Mailchimp), or opt-in analytics to trace lead magnet conversions.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
