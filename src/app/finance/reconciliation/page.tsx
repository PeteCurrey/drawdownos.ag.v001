'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, AlertTriangle, ShieldCheck, DollarSign } from 'lucide-react';
import { DEMO_PAYOUTS, DEMO_BANK_TRANSACTIONS } from '@/lib/finance/demo-finance-data';
import { reconcilePayoutWithBank } from '@/lib/finance/reconciliation-engine';

export default function ReconciliationWorkbenchPage() {
  const reconItems = DEMO_PAYOUTS.map(p => {
    const bankTx = DEMO_BANK_TRANSACTIONS.find(bt => bt.matchedPayoutId === p.id);
    const result = reconcilePayoutWithBank(p, bankTx);
    return { payout: p, bankTx, result };
  });

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/finance" className="hover:text-[#A2A6AD]">FINANCIAL COMMAND</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#22C55E]">RECONCILIATION WORKBENCH</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#22C55E]/30 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">3-SIDED RECONCILIATION WORKBENCH</h1>
            </div>
          </div>
          <Link href="/finance" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO FINANCIAL COMMAND
          </Link>
        </div>

        {/* 3-Sided Auto-Matching Table (§33) */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
          <div className="font-display text-xs tracking-wider text-[#626770] border-b border-white/8 pb-2">
            EXPECTED PAYOUT vs MARKETPLACE STATEMENT vs BANK CASH RECEIVED
          </div>
          <div className="space-y-3">
            {reconItems.map(({ payout, bankTx, result }) => (
              <div key={payout.id} className="bg-[#121418] border border-white/5 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-display text-sm font-bold text-[#F5F6F7]">{payout.marketplaceName} ({payout.periodLabel})</div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${result.matchConfidence === 'HIGH' ? 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30' : result.matchConfidence === 'MEDIUM' ? 'text-[#D6A84B] bg-[#D6A84B]/10 border-[#D6A84B]/30' : 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/30'}`}>
                    CONFIDENCE: {result.matchConfidence}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 font-mono text-[10px]">
                  <div className="bg-[#0E1014] p-3 rounded border border-white/5">
                    <div className="text-[#626770]">1. EXPECTED RECEIVABLE</div>
                    <div className="text-[#D6A84B] font-bold text-sm">£{payout.netExpectedGbp.toLocaleString()}</div>
                  </div>
                  <div className="bg-[#0E1014] p-3 rounded border border-white/5">
                    <div className="text-[#626770]">2. MARKETPLACE REPORTED</div>
                    <div className="text-[#38BDF8] font-bold text-sm">£{payout.netExpectedGbp.toLocaleString()}</div>
                  </div>
                  <div className="bg-[#0E1014] p-3 rounded border border-white/5">
                    <div className="text-[#626770]">3. BANK RECEIVED CASH</div>
                    <div className="text-[#22C55E] font-bold text-sm">£{bankTx ? bankTx.amountGbp.toLocaleString() : '0.00'}</div>
                  </div>
                </div>

                <div className="text-[10px] text-[#626770] italic">
                  Variance: <strong className={result.varianceGbp === 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}>£{result.varianceGbp}</strong> — {result.varianceExplanation}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
