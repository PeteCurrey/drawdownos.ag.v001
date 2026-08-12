'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronRight, FileText, Download, Lock } from 'lucide-react';


export default function TaxDataPage() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/finance" className="hover:text-[#A2A6AD]">FINANCIAL COMMAND</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#38BDF8]">TAX DATA CENTRE</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#38BDF8]/30 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">TAX DATA CENTRE & DOCUMENT STORE</h1>
            </div>
          </div>
          <Link href="/finance" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO FINANCIAL COMMAND
          </Link>
        </div>

        {/* Tax Data List */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
          <div className="font-display text-xs tracking-wider text-[#626770] border-b border-white/8 pb-2">
            MERCHANT OF RECORD & TAX WITHHELD TELEMETRY (REPORTING SUPPORT LAYER — NOT TAX ADVICE)
          </div>
          <div className="space-y-3">

            <div className="bg-[#121418] border border-white/5 rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-3 industrial-panel">
              <ShieldCheck className="w-8 h-8 text-[#38BDF8]" />
              <div className="font-display text-sm font-bold text-[#F5F6F7]">NO REAL TAX DATA AVAILABLE</div>
              <div className="text-[10px] text-[#626770] max-w-md">
                Cannot display tax telemetry. Requires connection to real Merchant of Record (MoR) systems or configured tax calculation APIs.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
