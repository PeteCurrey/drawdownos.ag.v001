'use client';

import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import {
  DEMO_DAILY_BRIEF,
  DEMO_OPPORTUNITIES,
  DEMO_RISKS,
  DEMO_APPROVALS,
  DEMO_FORECASTS
} from '@/lib/executive/demo-executive-data';

export default function TodayPage() {
  const pathname = usePathname();

  const formatCurrency = (val: number) => `£${val.toLocaleString()}`;
  const formatPct = (val: number) => `${val > 0 ? '+' : ''}${val}%`;
  
  const forecast = DEMO_FORECASTS.find(f => f.periodDays === 30) || DEMO_FORECASTS[0];

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* DAILY EXECUTIVE BRIEF header */}
        <header className="space-y-2 border-b border-white/10 pb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-display text-white">DAILY EXECUTIVE BRIEF</h1>
            <div className="text-right">
              <div className="text-white/70 font-data">Wednesday 12 August 2026 — 08:30</div>
              <div className="text-[#D6A84B] text-xs font-display mt-1">AUTO-GENERATED | REVIEW BEFORE 09:00</div>
            </div>
          </div>
        </header>

        {/* PORTFOLIO STATUS BAR */}
        <div className="industrial-panel p-6">
          <h2 className="text-sm font-display text-white/50 mb-4">PORTFOLIO STATUS</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-white/50">Net Revenue</div>
              <div className="font-data text-xl text-white">{formatCurrency(DEMO_DAILY_BRIEF.netRevenueGbp)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-white/50">Net Contribution</div>
              <div className="font-data text-xl text-white">{formatCurrency(DEMO_DAILY_BRIEF.netContributionGbp)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-white/50">Orders</div>
              <div className="font-data text-xl text-white">{DEMO_DAILY_BRIEF.ordersCount}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-white/50">Refunds</div>
              <div className="font-data text-xl text-[#EF4444]">{DEMO_DAILY_BRIEF.refundsCount}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-white/50">AOV</div>
              <div className="font-data text-xl text-white">{formatCurrency(DEMO_DAILY_BRIEF.avgOrderValueGbp)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-white/50">Marketplaces</div>
              <div className="font-data text-xl text-white">{DEMO_DAILY_BRIEF.activeMarketplaces} Active</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-white/50">Products</div>
              <div className="font-data text-xl text-white">{DEMO_DAILY_BRIEF.productCount}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-white/50">Automations</div>
              <div className="font-data text-xl text-[#22C55E]">{DEMO_DAILY_BRIEF.automationsActive} Active</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* WHAT CHANGED */}
          <div className="industrial-panel p-6 lg:col-span-2 space-y-6">
            <h2 className="text-sm font-display text-white/50">WHAT CHANGED</h2>
            <div className="grid grid-cols-3 gap-6">
              {[
                { title: 'vs Yesterday', data: DEMO_DAILY_BRIEF.vsYesterdayPct },
                { title: 'vs 7-Day Baseline', data: DEMO_DAILY_BRIEF.vs7DayBaselinePct },
                { title: 'vs 30-Day Baseline', data: DEMO_DAILY_BRIEF.vs30DayBaselinePct }
              ].map((col, i) => (
                <div key={i} className="space-y-3">
                  <h3 className="text-xs font-display text-white/70">{col.title}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-data">
                      <span className="text-white/50">Overall Delta</span>
                      <span className={col.data > 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}>{formatPct(col.data)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 30-DAY FORECAST */}
          <div className="industrial-panel p-6 space-y-4">
            <h2 className="text-sm font-display text-white/50">30-DAY FORECAST</h2>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-white/50 mb-1">Expected Contribution</div>
                <div className="font-data text-3xl text-white">{formatCurrency(forecast?.contributionGbp || 4820)}</div>
              </div>
              <div className="flex gap-4 text-sm font-data">
                <div>
                  <span className="text-white/50">Best: </span>
                  <span className="text-[#22C55E]">{formatCurrency(forecast?.bestCaseGbp || 5900)}</span>
                </div>
                <div>
                  <span className="text-white/50">Worst: </span>
                  <span className="text-[#EF4444]">{formatCurrency(forecast?.worstCaseGbp || 3400)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-white/10 pt-4">
                <span className="text-white/50">Confidence</span>
                <span className="px-2 py-0.5 rounded bg-[#D6A84B]/20 text-[#D6A84B] text-xs font-display">{forecast?.confidence || 'MODERATE'}</span>
              </div>
              <div className="text-sm">
                <span className="text-white/50">Top driver: </span>
                <span className="text-white">{forecast?.drivers[0]?.description || 'Etsy US conversion +£1,080'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FIVE THINGS THAT MATTER */}
          <div className="industrial-panel p-6 space-y-4">
            <h2 className="text-sm font-display text-white/50">FIVE THINGS THAT MATTER</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="text-white/30 font-data">01</div>
                  <div>
                    <div className="text-sm text-white">Gumroad DE Refund Spike</div>
                    <div className="text-xs text-[#EF4444] font-data mt-1">Impact: £150-£400</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-2 py-0.5 rounded bg-[#EF4444]/20 text-[#EF4444] text-[10px] font-display">HIGH CONF</span>
                  <a href="/executive" className="text-xs text-[#D6A84B] hover:text-white transition-colors">VIEW →</a>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="text-white/30 font-data">02</div>
                  <div>
                    <div className="text-sm text-white">Etsy US Conversion Uplift</div>
                    <div className="text-xs text-[#22C55E] font-data mt-1">Impact: £800-£1,200</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-2 py-0.5 rounded bg-[#22C55E]/20 text-[#22C55E] text-[10px] font-display">MODERATE CONF</span>
                  <a href="/executive" className="text-xs text-[#D6A84B] hover:text-white transition-colors">VIEW →</a>
                </div>
              </div>
            </div>
            
            {/* OPPORTUNITIES & RISKS */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 mt-4">
              <div className="space-y-3">
                <h3 className="text-xs font-display text-white/50">OPPORTUNITIES</h3>
                {DEMO_OPPORTUNITIES.slice(0, 2).map((opp, i) => (
                  <div key={i} className="text-sm">
                    <div className="text-white truncate">{opp.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[#22C55E] font-data text-xs">{formatCurrency(opp.expected30DayGbp)}</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/70 text-[10px]">{opp.opportunityScore}/100</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-l border-white/10 pl-4">
                <h3 className="text-xs font-display text-white/50">ESCALATED RISKS</h3>
                {DEMO_RISKS.filter(r => r.status === 'ESCALATED').slice(0, 2).map((risk, i) => (
                  <div key={i} className="text-sm">
                    <div className="text-white truncate">{risk.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[#EF4444] font-data text-xs">{formatCurrency(risk.exposureGbp)}</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#EF4444]/20 text-[#EF4444] text-[10px]">{risk.velocity} VELOCITY</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* RECOMMENDED CEO ACTIONS */}
            <div className="industrial-panel p-6 space-y-4 border border-[#D6A84B]/30">
              <h2 className="text-sm font-display text-[#D6A84B]">RECOMMENDED CEO ACTIONS</h2>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="text-[#D6A84B]/50 font-data">01</span>
                  <span><strong className="text-white">Approve:</strong> Pause Gumroad DE traffic (refund risk)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white/30 font-data">02</span>
                  <span className="text-white/80"><strong>Consider:</strong> Etsy US price test</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white/30 font-data">03</span>
                  <span className="text-white/80"><strong>Review:</strong> Payhip launch</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white/30 font-data">04</span>
                  <span className="text-white/80"><strong>Watch:</strong> Etsy concentration risk</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white/30 font-data">05</span>
                  <span className="text-white/80"><strong>Decide:</strong> German localisation commission</span>
                </li>
              </ol>
            </div>

            {/* AUTOPILOT & DECISIONS */}
            <div className="industrial-panel p-6 space-y-6">
              <div>
                <h2 className="text-sm font-display text-white/50 mb-3">AUTOPILOT ACTIVITY</h2>
                <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
                  <li>14 distribution tasks</li>
                  <li>3 listing quality checks</li>
                  <li>1 pricing guardrail check</li>
                  <li>0 violations</li>
                </ul>
              </div>
              <div className="border-t border-white/10 pt-4">
                <h2 className="text-sm font-display text-[#38BDF8] mb-3">DECISIONS REQUIRED</h2>
                <div className="space-y-3">
                  {DEMO_APPROVALS.slice(0, 2).map((req, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#38BDF8]/5 rounded border border-[#38BDF8]/20">
                      <div>
                        <div className="text-sm text-white">{req.requestedAction}</div>
                        <div className="text-xs text-white/50 mt-1">{req.requestingModule} • {formatCurrency(req.financialImpactGbp)}</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white/5 hover:bg-[#EF4444]/20 text-[#EF4444] rounded text-xs transition-colors">REJECT</button>
                        <button className="px-3 py-1 bg-[#38BDF8]/20 hover:bg-[#38BDF8]/30 text-[#38BDF8] rounded text-xs transition-colors">APPROVE</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center py-8 border-t border-white/10">
          <p className="text-xs font-display tracking-[0.1em] text-white/30">SIGNAL, NOT NOISE. THE OS SURFACES WHAT MATTERS.</p>
        </footer>
      </div>
    </ExecutiveShell>
  );
}
