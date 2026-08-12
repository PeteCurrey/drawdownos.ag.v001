'use client';

import React from 'react';
import { Megaphone, Calendar, TrendingUp, DollarSign } from 'lucide-react';

export default function MarketingPage() {
  const campaigns = [
    { id: 'CAMP-01', name: 'Global Launch 2026', channel: 'Amazon & Whop', budget: '£5,000.00', spend: '£3,200.00', revenue: '£28,400.00', roas: '8.88x', status: 'ACTIVE' },
    { id: 'CAMP-02', name: 'Spanish Translation Pre-Order', channel: 'Hotmart Candidate', budget: '£1,500.00', spend: '£450.00', revenue: '£3,200.00', roas: '7.11x', status: 'ACTIVE' },
  ];

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">MARKETING COMMAND & CAMPAIGNS</h1>
            <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              CAMPAIGNS ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Product launches, discount bundles, seasonal promotions, creative asset packs, and ROAS tracking
          </p>
        </div>
      </div>

      <div className="industrial-panel p-5 space-y-4">
        <h3 className="font-display text-xs text-[#626770] tracking-wider uppercase">
          ACTIVE CAMPAIGNS
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-data text-xs">
            <thead className="bg-[#17191E] border-b border-white/10 font-display text-[10px] text-[#626770]">
              <tr>
                <th className="p-3">CAMPAIGN</th>
                <th className="p-3">CHANNEL</th>
                <th className="p-3">BUDGET</th>
                <th className="p-3">SPEND</th>
                <th className="p-3">REVENUE</th>
                <th className="p-3">ROAS</th>
                <th className="p-3 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {campaigns.map(c => (
                <tr key={c.id} className="hover:bg-[#17191E] transition-colors">
                  <td className="p-3 font-bold text-[#F5F6F7]">{c.name}</td>
                  <td className="p-3 text-[#A2A6AD]">{c.channel}</td>
                  <td className="p-3 text-[#F5F6F7]">{c.budget}</td>
                  <td className="p-3 text-[#EF4444]">{c.spend}</td>
                  <td className="p-3 text-[#22C55E] font-bold">{c.revenue}</td>
                  <td className="p-3 text-[#D6A84B] font-bold">{c.roas}</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-display bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">
                      {c.status}
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
