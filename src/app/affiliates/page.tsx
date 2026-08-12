'use client';

import React from 'react';
import { Users, DollarSign, Link as LinkIcon, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function AffiliatesPage() {
  const affiliates = [
    { id: 'AFF-001', name: 'Alpha Traders Network', email: 'partners@alphatraders.com', code: 'ALPHA30', rate: '30%', sales: 42, earnings: '£4,158.00', status: 'APPROVED' },
    { id: 'AFF-002', name: 'Prop Challenge Hub', email: 'affiliates@prophub.io', code: 'PROPHUB', rate: '35%', sales: 28, earnings: '£3,122.00', status: 'APPROVED' },
  ];

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">AFFILIATE MANAGEMENT ENGINE</h1>
            <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              INDEPENDENT LEDGER
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Custom commission rates, product-specific links, UTM attribution, and payout ledgers
          </p>
        </div>
      </div>

      <div className="industrial-panel p-5 space-y-4">
        <h3 className="font-display text-xs text-[#626770] tracking-wider uppercase">
          APPROVED AFFILIATE PARTNERS
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-data text-xs">
            <thead className="bg-[#17191E] border-b border-white/10 font-display text-[10px] text-[#626770]">
              <tr>
                <th className="p-3">CODE</th>
                <th className="p-3">PARTNER NAME</th>
                <th className="p-3">COMMISSION RATE</th>
                <th className="p-3">TOTAL SALES</th>
                <th className="p-3">LIFETIME COMMISSIONS</th>
                <th className="p-3 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {affiliates.map(aff => (
                <tr key={aff.id} className="hover:bg-[#17191E] transition-colors">
                  <td className="p-3 font-bold text-[#D6A84B]">{aff.code}</td>
                  <td className="p-3 font-bold text-[#F5F6F7]">{aff.name}</td>
                  <td className="p-3 text-[#22C55E]">{aff.rate}</td>
                  <td className="p-3 text-[#F5F6F7]">{aff.sales} units</td>
                  <td className="p-3 text-[#D6A84B] font-bold">{aff.earnings}</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-display bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">
                      {aff.status}
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
