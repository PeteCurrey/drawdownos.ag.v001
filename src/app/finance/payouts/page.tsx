'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DollarSign, ChevronRight, Filter, Search, Calendar, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { DEMO_PAYOUTS } from '@/lib/finance/demo-finance-data';

function stateColor(state: string): string {
  const map: Record<string, string> = {
    RECONCILED: '#22C55E', PAID: '#22C55E', EXPECTED: '#D6A84B',
    SCHEDULED: '#38BDF8', OVERDUE: '#EF4444', DISPUTED: '#EF4444',
  };
  return map[state] ?? '#6B7280';
}

function StatePill({ state }: { state: string }) {
  return (
    <span
      className="font-data text-[9px] px-2 py-0.5 rounded border"
      style={{ color: stateColor(state), borderColor: `${stateColor(state)}30`, backgroundColor: `${stateColor(state)}10` }}
    >
      {state}
    </span>
  );
}

export default function PayoutsPage() {
  const [selectedState, setSelectedState] = useState('ALL');

  const filteredPayouts = DEMO_PAYOUTS.filter(p => {
    if (selectedState === 'ALL') return true;
    return p.state === selectedState;
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
              <span className="text-[#D6A84B]">PAYOUTS & RECEIVABLES</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">MARKETPLACE PAYOUTS & RECEIVABLES CALENDAR</h1>
            </div>
          </div>
          <Link href="/finance" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO FINANCIAL COMMAND
          </Link>
        </div>

        {/* Header Stats & Aging Buckets */}
        <div className="grid grid-cols-4 gap-3 font-data text-xs">
          {[
            { label: '0–30 DAYS DUE', value: `£${DEMO_PAYOUTS.filter(p => p.state === 'EXPECTED').reduce((s, p) => s + p.netExpectedGbp, 0).toLocaleString()}`, color: '#D6A84B' },
            { label: '31–60 DAYS DUE', value: '£0.00', color: '#22C55E' },
            { label: '61–90 DAYS DUE', value: '£0.00', color: '#22C55E' },
            { label: '90+ DAYS OVERDUE', value: '£0.00', color: '#22C55E' },
          ].map(s => (
            <div key={s.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-1">
              <div className="text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Payouts Table */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden font-data text-xs space-y-3 p-4">
          <div className="font-display text-xs tracking-wider text-[#626770] pb-2 border-b border-white/5">
            EXPECTED & SETTLED MARKETPLACE PAYOUTS
          </div>
          <div className="divide-y divide-white/5">
            {filteredPayouts.map(p => (
              <div key={p.id} className="py-3.5 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-bold text-[#F5F6F7]">{p.marketplaceName}</span>
                    <StatePill state={p.state} />
                  </div>
                  <div className="text-[10px] text-[#626770]">Period: {p.periodLabel} · Currency: {p.payoutCurrency}</div>
                </div>

                <div className="flex items-center gap-6 text-[10px]">
                  <div>
                    <span className="text-[#626770]">Gross Local: </span>
                    <strong className="text-[#F5F6F7]">{p.payoutCurrency} {p.grossSalesLocal.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[#626770]">Net Expected: </span>
                    <strong className="text-[#D6A84B]">£{p.netExpectedGbp.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[#626770]">Net Paid: </span>
                    <strong className="text-[#22C55E]">£{p.netPaidGbp.toLocaleString()}</strong>
                  </div>
                  {p.varianceGbp !== 0 && (
                    <div>
                      <span className="text-[#626770]">Variance: </span>
                      <strong className="text-[#EF4444]">£{p.varianceGbp}</strong>
                    </div>
                  )}
                  <Link href="/finance/reconciliation" className="bg-[#1C1F24] hover:bg-white/10 text-[#D6A84B] font-display text-[9px] font-bold px-3 py-1.5 rounded border border-[#D6A84B]/30">
                    RECONCILE
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
