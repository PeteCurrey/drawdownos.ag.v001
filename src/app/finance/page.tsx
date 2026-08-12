'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  DollarSign, TrendingUp, ShieldCheck, ChevronRight, ArrowRight,
  AlertTriangle, CheckCircle2, Clock, Sparkles, Layers, Sliders,
  RefreshCw, Eye, ArrowUpRight, BarChart3, PieChart
} from 'lucide-react';
import {
  DEMO_WATERFALL, DEMO_PAYOUTS, DEMO_TRANSACTIONS, DEMO_ECONOMIC_RSA
} from '@/lib/finance/demo-finance-data';
import { calculateEconomicWaterfall, calculateContributionLayers } from '@/lib/finance/waterfall-engine';
import { followTheMoney, getMostProfitableSurfaces, getLossMakingSurfaces } from '@/lib/finance/flagship-actions';

export default function FinancialCommandControlRoom() {
  const [showMoneyDrawer, setShowMoneyDrawer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('DD-2048');

  const waterfall = calculateEconomicWaterfall(100.00);
  const layers = calculateContributionLayers(100.00);
  const moneyLineage = followTheMoney(selectedOrder);
  const topSurfaces = getMostProfitableSurfaces();
  const lossSurfaces = getLossMakingSurfaces();

  const totalGrossCustomerSpend = 14250.00;
  const totalNetRevenue = 9840.00;
  const totalNetContribution = 6650.00;
  const totalReceivables = DEMO_PAYOUTS.filter(p => p.state === 'EXPECTED').reduce((sum, p) => sum + p.netExpectedGbp, 0);

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* ── HEADER ── */}
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#22C55E]/30 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-[#22C55E]" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-wider text-[#F5F6F7]">FINANCIAL COMMAND CONTROL ROOM</h1>
              <span className="font-data text-[10px] px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">REVENUE IS NOT PROFIT</span>
            </div>
            <p className="font-data text-xs text-[#626770] tracking-wide">TREASURY · RECONCILIATION · CONTRIBUTION MARGINS · ECONOMIC RSA</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMoneyDrawer(!showMoneyDrawer)}
              className="flex items-center gap-2 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-[11px] font-bold px-4 py-2 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              FOLLOW THE MONEY
            </button>
            <Link
              href="/finance/payouts"
              className="flex items-center gap-2 bg-[#121418] hover:bg-[#17191E] border border-white/10 text-[#A2A6AD] font-display text-[11px] px-4 py-2 rounded-lg transition-colors"
            >
              PAYOUTS & RECEIVABLES
            </Link>
          </div>
        </div>

        {/* ── TOP HERO INSTRUMENTATION ── */}
        <div className="grid grid-cols-8 gap-3 font-data text-xs">
          {[
            { label: 'GROSS CUSTOMER SPEND', value: `£${totalGrossCustomerSpend.toLocaleString()}`, color: '#F5F6F7' },
            { label: 'NET REVENUE', value: `£${totalNetRevenue.toLocaleString()}`, color: '#38BDF8' },
            { label: 'NET CONTRIBUTION', value: `£${totalNetContribution.toLocaleString()}`, color: '#22C55E' },
            { label: 'OUTSTANDING PAYOUTS', value: `£${totalReceivables.toLocaleString()}`, color: '#D6A84B' },
            { label: 'RAW RSA', value: `${DEMO_ECONOMIC_RSA.rawRsaPct}%`, color: '#626770' },
            { label: 'CAPTURED RSA', value: `${DEMO_ECONOMIC_RSA.capturedRsaPct}%`, color: '#818CF8' },
            { label: 'GROWTH ACTIVATED', value: `${DEMO_ECONOMIC_RSA.growthActivatedRsaPct}%`, color: '#D6A84B' },
            { label: 'ECONOMIC PRODUCTIVE', value: `${DEMO_ECONOMIC_RSA.economicallyProductiveRsaPct}%`, color: '#22C55E' },
          ].map(item => (
            <div key={item.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-1 text-center">
              <div className="text-lg font-bold" style={{ color: item.color }}>{item.value}</div>
              <div className="text-[9px] text-[#626770] tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>

        {/* ── COMMERCIAL ECONOMIC WATERFALL (§8) ── */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <span className="font-display text-xs tracking-wider text-[#A2A6AD]">COMMERCIAL ECONOMIC WATERFALL (HOW £100 OF CUSTOMER SPEND MOVES)</span>
            <span className="text-[10px] text-[#22C55E] font-bold">NET CONTRIBUTION MARGIN: 46.7%</span>
          </div>

          <div className="grid grid-cols-9 gap-2 text-center text-[10px]">
            <div className="bg-[#121418] border border-white/5 p-3 rounded-lg space-y-1">
              <div className="text-[#626770]">CUSTOMER SPEND</div>
              <div className="font-bold text-[#F5F6F7] text-sm">£100.00</div>
              <div className="text-[8px] text-[#626770]">100% Gross</div>
            </div>
            <div className="bg-[#121418] border border-white/5 p-3 rounded-lg space-y-1">
              <div className="text-[#626770]">TAX / FACILITATOR</div>
              <div className="font-bold text-[#EF4444] text-sm">-£8.33</div>
              <div className="text-[8px] text-[#626770]">VAT / Sales Tax</div>
            </div>
            <div className="bg-[#121418] border border-white/5 p-3 rounded-lg space-y-1">
              <div className="text-[#626770]">MARKETPLACE FEE</div>
              <div className="font-bold text-[#EF4444] text-sm">-£10.00</div>
              <div className="text-[8px] text-[#626770]">Platform Commission</div>
            </div>
            <div className="bg-[#121418] border border-white/5 p-3 rounded-lg space-y-1">
              <div className="text-[#626770]">AFFILIATE COST</div>
              <div className="font-bold text-[#F97316] text-sm">-£20.00</div>
              <div className="text-[8px] text-[#626770]">Partner Rev Share</div>
            </div>
            <div className="bg-[#121418] border border-white/5 p-3 rounded-lg space-y-1">
              <div className="text-[#626770]">PROCESSING / OTHER</div>
              <div className="font-bold text-[#EF4444] text-sm">-£4.00</div>
              <div className="text-[8px] text-[#626770]">Merchant Gateway</div>
            </div>
            <div className="bg-[#121418] border border-[#38BDF8]/30 p-3 rounded-lg space-y-1">
              <div className="text-[#38BDF8] font-bold">NET RECEIPT</div>
              <div className="font-bold text-[#38BDF8] text-sm">£57.67</div>
              <div className="text-[8px] text-[#38BDF8]">Net Marketplace Proceeds</div>
            </div>
            <div className="bg-[#121418] border border-white/5 p-3 rounded-lg space-y-1">
              <div className="text-[#626770]">CAMPAIGN ACQ.</div>
              <div className="font-bold text-[#F97316] text-sm">-£8.00</div>
              <div className="text-[8px] text-[#626770]">Attributed Spend</div>
            </div>
            <div className="bg-[#121418] border border-white/5 p-3 rounded-lg space-y-1">
              <div className="text-[#626770]">VARIABLE COST</div>
              <div className="font-bold text-[#EF4444] text-sm">-£3.00</div>
              <div className="text-[8px] text-[#626770]">Localisation/Format</div>
            </div>
            <div className="bg-[#121418] border border-[#22C55E]/40 p-3 rounded-lg space-y-1">
              <div className="text-[#22C55E] font-bold">NET CONTRIBUTION</div>
              <div className="font-bold text-[#22C55E] text-sm">£46.67</div>
              <div className="text-[8px] text-[#22C55E]">Real Commercial Value</div>
            </div>
          </div>
        </div>

        {/* ── PROFITABLE SURFACES & LOSS-MAKING RECOMMENDATIONS ── */}
        <div className="grid grid-cols-12 gap-6 font-data text-xs">
          
          {/* Left: Top Profitable Surfaces */}
          <div className="col-span-7 bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <span className="font-display text-xs tracking-wider text-[#22C55E]">WHERE ARE WE ACTUALLY MAKING MONEY?</span>
              <span className="text-[10px] text-[#626770]">Ranked by Net Contribution</span>
            </div>
            <div className="space-y-3">
              {topSurfaces.map(surf => (
                <div key={surf.rank} className="bg-[#121418] border border-white/5 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#D6A84B] text-sm w-6">#{surf.rank}</span>
                    <div>
                      <div className="font-display text-sm font-bold text-[#F5F6F7]">{surf.entityName}</div>
                      <div className="text-[10px] text-[#626770]">{surf.entityType}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-[10px]">
                    <div>
                      <span className="text-[#626770]">Gross: </span>
                      <strong className="text-[#F5F6F7]">£{surf.grossSalesGbp.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-[#626770]">Net Contribution: </span>
                      <strong className="text-[#22C55E]">£{surf.netContributionGbp.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-[#626770]">Margin: </span>
                      <strong className="text-[#38BDF8]">{surf.contributionMarginPct}%</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Subsystem Links & Loss-Making Channels */}
          <div className="col-span-5 space-y-3">
            <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-3">
              <div className="font-display text-xs tracking-wider text-[#626770]">FINANCIAL WORKSPACES</div>
              <div className="space-y-2">
                {[
                  { title: 'PAYOUTS & RECEIVABLES', href: '/finance/payouts', desc: 'Marketplace Settlement Calendar & Aging Buckets', icon: DollarSign, color: '#D6A84B' },
                  { title: 'RECONCILIATION WORKBENCH', href: '/finance/reconciliation', desc: '3-Sided Auto-Matching: Expected vs Bank Received', icon: CheckCircle2, color: '#22C55E' },
                  { title: 'TAX DATA CENTRE', href: '/finance/tax-data', desc: 'Merchant of Record, Tax Withheld & VAT Summaries', icon: ShieldCheck, color: '#38BDF8' },
                  { title: 'MASTER IP ECONOMICS', href: '/finance/ip', desc: 'IP Return Multiple & Derivative Payback', icon: Layers, color: '#818CF8' },
                ].map(sub => (
                  <Link key={sub.title} href={sub.href} className="flex items-center justify-between bg-[#121418] hover:bg-white/5 p-3 rounded-lg border border-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <sub.icon className="w-4 h-4" style={{ color: sub.color }} />
                      <div>
                        <div className="font-display text-xs font-bold text-[#F5F6F7]">{sub.title}</div>
                        <div className="text-[9px] text-[#626770]">{sub.desc}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#626770]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── FOLLOW THE MONEY DRAWER (§163) ── */}
        {showMoneyDrawer && (
          <div className="bg-[#0E1014] border border-[#D6A84B]/40 rounded-xl p-5 space-y-4 font-data text-xs">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D6A84B]" />
                <span className="font-display text-sm font-bold text-[#D6A84B]">FLAGSHIP ACTION: FOLLOW THE MONEY (ORDER {selectedOrder})</span>
              </div>
              <button onClick={() => setShowMoneyDrawer(false)} className="text-[#626770] hover:text-[#F5F6F7]">CLOSE</button>
            </div>

            <div className="space-y-2">
              {moneyLineage.lineageSteps.map((step, idx) => (
                <div key={idx} className="bg-[#121418] border border-white/5 p-3 rounded-lg flex items-center gap-3">
                  <span className="w-6 font-bold text-[#D6A84B] text-center">#{idx + 1}</span>
                  <span className="text-[#F5F6F7] text-xs">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
