'use client';

import React from 'react';
import { DollarSign, RefreshCw, AlertCircle, Server } from 'lucide-react';
import Link from 'next/link';

export default function RevenuePage() {
  const orderLedger: any[] = [];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">REVENUE & RECONCILIATION ENGINE</h1>
            <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              TRUTH LAYER ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Gross sales, channel fees, affiliate commissions, net receipts, FX rates, and bank reconciliation
          </p>
        </div>

        <button 
          disabled 
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1C1F24] border border-white/10 text-[#626770] font-display text-xs font-bold cursor-not-allowed"
        >
          <RefreshCw className="w-4 h-4" /> RECONCILE BANK STATEMENTS
        </button>
      </div>

      {/* Financial Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'GROSS REVENUE (MTD)', val: '—' },
          { label: 'CHANNEL FEES & COMMISSIONS', val: '—' },
          { label: 'AFFILIATE PAYOUTS', val: '—' },
          { label: 'NET SETTLED CONTRIBUTION', val: '—' },
        ].map((item, idx) => (
          <div key={idx} className="industrial-panel p-4 flex flex-col justify-between">
            <span className="text-[10px] font-display text-[#626770]">{item.label}</span>
            <span className="text-lg font-data font-bold text-[#A2A6AD] mt-2">{item.val}</span>
          </div>
        ))}
      </div>

      {/* Empty State Banner */}
      <div className="industrial-panel p-8 flex flex-col items-center justify-center text-center gap-4">
        <AlertCircle className="w-8 h-8 text-[#D6A84B]/60" />
        <div className="font-display text-sm text-[#A2A6AD]">AWAITING MARKETPLACE REVENUE SYNCHRONISATION</div>
        <p className="text-xs font-data text-[#626770] max-w-md">
          Revenue calculations strictly reflect real payments ingested from authenticated marketplace connectors.
          Connect your Whop marketplace account to sync live payments.
        </p>
        <Link href="/integrations" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D6A84B] text-[#0A0B0D] font-display text-xs font-bold hover:bg-[#e2b558] transition-colors">
          <Server className="w-3.5 h-3.5" /> CONNECT WHOP MARKETPLACE
        </Link>
      </div>

      {/* Order Ledger */}
      <div className="industrial-panel p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#D6A84B]" />
            <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider">CANONICAL TRANSACTION LEDGER</h3>
          </div>
          <span className="text-xs font-data text-[#626770]">0 Verified Records</span>
        </div>

        <div className="text-center py-8 text-[#626770] font-data text-xs">
          No transactions recorded in canonical database.
        </div>
      </div>
    </div>
  );
}
