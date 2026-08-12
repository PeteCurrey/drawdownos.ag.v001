'use client';

import React, { useState } from 'react';
import { DollarSign, BarChart3, TrendingUp, RefreshCw, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { DEMO_TELEMETRY_METRICS } from '@/lib/demo-data';

export default function RevenuePage() {
  const metrics = DEMO_TELEMETRY_METRICS;

  const orderLedger = [
    { id: 'ORD-8942', channel: 'Whop Direct', title: 'HOW TO TRADE (PDF)', gross: 99.00, fee: 2.97, affiliate: 29.70, net: 66.33, status: 'MATCHED' },
    { id: 'ORD-8941', channel: 'Amazon Kindle UK', title: 'HOW TO TRADE (Kindle)', gross: 49.00, fee: 14.70, affiliate: 0.00, net: 34.30, status: 'MATCHED' },
    { id: 'ORD-8940', channel: 'PublishDrive Kobo', title: 'PRICE ACTION MATRIX', gross: 69.00, fee: 13.80, affiliate: 0.00, net: 55.20, status: 'MATCHED' },
    { id: 'ORD-8939', channel: 'Etsy Digital Shop', title: 'HOW TO TRADE (PDF)', gross: 79.00, fee: 5.135, affiliate: 0.00, net: 73.86, status: 'REVIEW' },
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">REVENUE & RECONCILIATION ENGINE</h1>
            <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              LEDGER ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Gross sales, channel fees, affiliate commissions, net receipts, FX rates, and bank reconciliation
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md">
          <RefreshCw className="w-4 h-4" /> RECONCILE BANK STATEMENTS
        </button>
      </div>

      {/* Financial Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="industrial-panel p-4">
          <span className="text-[9px] font-display text-[#626770] block">GROSS SALES (MTD)</span>
          <div className="font-data text-2xl font-bold text-[#F5F6F7] mt-1">£68,420.00</div>
          <span className="text-[10px] font-data text-[#22C55E] flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +18.4% vs Prior
          </span>
        </div>

        <div className="industrial-panel p-4">
          <span className="text-[9px] font-display text-[#626770] block">MARKETPLACE FEES</span>
          <div className="font-data text-2xl font-bold text-[#EF4444] mt-1">£11,631.40</div>
          <span className="text-[10px] font-data text-[#626770] mt-1 block">17.0% Avg Fee Rate</span>
        </div>

        <div className="industrial-panel p-4">
          <span className="text-[9px] font-display text-[#626770] block">AFFILIATE COMMISSIONS</span>
          <div className="font-data text-2xl font-bold text-[#D6A84B] mt-1">£12,480.00</div>
          <span className="text-[10px] font-data text-[#D6A84B] mt-1 block">42 Active Payouts</span>
        </div>

        <div className="industrial-panel p-4">
          <span className="text-[9px] font-display text-[#626770] block">NET RECEIPTS (BANKED)</span>
          <div className="font-data text-2xl font-bold text-[#22C55E] mt-1">£44,308.60</div>
          <span className="text-[10px] font-data text-[#22C55E] mt-1 block">100% Reconciled</span>
        </div>
      </div>

      {/* Order & Royalty Ledger Table */}
      <div className="industrial-panel p-5 space-y-4">
        <h3 className="font-display text-sm text-[#F5F6F7] tracking-wider border-b border-white/10 pb-3">
          TRANSACTION & ROYALTY RECONCILIATION LEDGER
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-data text-xs">
            <thead className="bg-[#17191E] border-b border-white/10 font-display text-[10px] text-[#626770]">
              <tr>
                <th className="p-3">ORDER ID</th>
                <th className="p-3">CHANNEL</th>
                <th className="p-3">PRODUCT TITLE</th>
                <th className="p-3">GROSS</th>
                <th className="p-3">FEE</th>
                <th className="p-3">AFFILIATE</th>
                <th className="p-3">NET RECEIPT</th>
                <th className="p-3 text-right">RECONCILIATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orderLedger.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#17191E] transition-colors">
                  <td className="p-3 font-bold text-[#D6A84B]">{ord.id}</td>
                  <td className="p-3 text-[#F5F6F7]">{ord.channel}</td>
                  <td className="p-3 text-[#A2A6AD]">{ord.title}</td>
                  <td className="p-3 text-[#F5F6F7]">£{ord.gross.toFixed(2)}</td>
                  <td className="p-3 text-[#EF4444]">-£{ord.fee.toFixed(2)}</td>
                  <td className="p-3 text-[#D6A84B]">-£{ord.affiliate.toFixed(2)}</td>
                  <td className="p-3 font-bold text-[#22C55E]">£{ord.net.toFixed(2)}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-display ${
                      ord.status === 'MATCHED' ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30' : 'bg-[#D6A84B]/10 text-[#D6A84B] border border-[#D6A84B]/30'
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
