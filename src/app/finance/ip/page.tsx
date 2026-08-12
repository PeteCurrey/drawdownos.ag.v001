'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, ChevronRight, DollarSign, TrendingUp, Sparkles, BookOpen } from 'lucide-react';

export default function MasterIPEconomicsPage() {
  const masterIpData = {
    ipCode: 'pub-dd-htt-001',
    ipTitle: 'How to Trade (Master Source Asset)',
    developmentCostGbp: 1200.00, // Writing, editorial, initial design
    originalProductContributionGbp: 3840.00,
    derivativeContributionGbp: 1850.00, // Workbook, Journal, Checklist
    translationContributionGbp: 960.00,  // US English, German, Spanish, Portuguese
    bundleContributionGbp: 1420.00,
    totalIpContributionGbp: 8070.00,
    ipReturnMultiple: 6.72, // £8070 / £1200
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/finance" className="hover:text-[#A2A6AD]">FINANCIAL COMMAND</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#818CF8]">MASTER IP ECONOMICS</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#818CF8]/30 flex items-center justify-center">
                <Layers className="w-4 h-4 text-[#818CF8]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">MASTER IP ECONOMICS & RETURN MULTIPLE STUDIO</h1>
            </div>
          </div>
          <Link href="/finance" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO FINANCIAL COMMAND
          </Link>
        </div>

        {/* IP Economics Breakdown (§21) */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <div>
              <div className="font-display text-sm font-bold text-[#F5F6F7]">{masterIpData.ipTitle}</div>
              <div className="text-[10px] text-[#626770]">IP Code: {masterIpData.ipCode} · Direct Development Cost: £{masterIpData.developmentCostGbp}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-[#22C55E]">IP RETURN MULTIPLE: {masterIpData.ipReturnMultiple}x</div>
              <div className="text-[10px] text-[#626770]">Total Contribution: £{masterIpData.totalIpContributionGbp.toLocaleString()}</div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3 font-mono text-[10px]">
            <div className="bg-[#121418] p-3 rounded border border-white/5 space-y-1">
              <div className="text-[#626770]">ORIGINAL PRODUCT</div>
              <div className="text-[#F5F6F7] font-bold text-sm">£{masterIpData.originalProductContributionGbp.toLocaleString()}</div>
            </div>
            <div className="bg-[#121418] p-3 rounded border border-white/5 space-y-1">
              <div className="text-[#626770]">DERIVATIVES (BOM)</div>
              <div className="text-[#38BDF8] font-bold text-sm">£{masterIpData.derivativeContributionGbp.toLocaleString()}</div>
            </div>
            <div className="bg-[#121418] p-3 rounded border border-white/5 space-y-1">
              <div className="text-[#626770]">LOCALISATION</div>
              <div className="text-[#D6A84B] font-bold text-sm">£{masterIpData.translationContributionGbp.toLocaleString()}</div>
            </div>
            <div className="bg-[#121418] p-3 rounded border border-white/5 space-y-1">
              <div className="text-[#626770]">BUNDLES</div>
              <div className="text-[#818CF8] font-bold text-sm">£{masterIpData.bundleContributionGbp.toLocaleString()}</div>
            </div>
            <div className="bg-[#121418] p-3 rounded border border-[#22C55E]/30 space-y-1">
              <div className="text-[#22C55E] font-bold">TOTAL IP CONTRIBUTION</div>
              <div className="text-[#22C55E] font-bold text-sm">£{masterIpData.totalIpContributionGbp.toLocaleString()}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
