'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { DEMO_DAILY_BRIEF, DEMO_DECISIONS } from '@/lib/executive/demo-executive-data';

export default function BriefingsPage() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');

  const formatCurrency = (val: number) => `£${val.toLocaleString()}`;

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        
        {/* Tab Navigation */}
        <div className="flex gap-1 border-b border-white/10 pb-4">
          <button 
            onClick={() => setActiveTab('weekly')}
            className={`px-4 py-2 text-sm font-display rounded-t transition-colors ${
              activeTab === 'weekly' ? 'text-[#D6A84B] border-b-2 border-[#D6A84B] bg-white/5' : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            WEEKLY REVIEW
          </button>
          <button 
            onClick={() => setActiveTab('monthly')}
            className={`px-4 py-2 text-sm font-display rounded-t transition-colors ${
              activeTab === 'monthly' ? 'text-[#D6A84B] border-b-2 border-[#D6A84B] bg-white/5' : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            MONTHLY BOARD REPORT
          </button>
        </div>

        {activeTab === 'weekly' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <header>
              <h1 className="text-2xl font-display text-white">WEEKLY EXECUTIVE REVIEW</h1>
              <p className="text-white/50 font-data text-sm">W32 2026 (5–12 August)</p>
            </header>

            <div className="industrial-panel p-6 overflow-x-auto">
              <h2 className="text-sm font-display text-white/50 mb-4">PORTFOLIO SCORECARD</h2>
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-xs font-display text-white/40 border-b border-white/10">
                    <th className="pb-3 pr-4 font-normal">METRIC</th>
                    <th className="pb-3 px-4 font-normal">THIS WEEK</th>
                    <th className="pb-3 px-4 font-normal">LAST WEEK</th>
                    <th className="pb-3 pl-4 font-normal">VS TARGET</th>
                  </tr>
                </thead>
                <tbody className="font-data">
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 text-white/70 font-sans">Net Revenue</td>
                    <td className="py-3 px-4 text-white">£7,240</td>
                    <td className="py-3 px-4 text-white/50">£6,100</td>
                    <td className="py-3 pl-4 text-[#22C55E]">+18.6%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 text-white/70 font-sans">Net Contribution</td>
                    <td className="py-3 px-4 text-white">£4,890</td>
                    <td className="py-3 px-4 text-white/50">£4,200</td>
                    <td className="py-3 pl-4 text-[#22C55E]">+16.4%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 text-white/70 font-sans">Orders</td>
                    <td className="py-3 px-4 text-white">241</td>
                    <td className="py-3 px-4 text-white/50">210</td>
                    <td className="py-3 pl-4 text-[#22C55E]">+14.7%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 text-white/70 font-sans">AOV</td>
                    <td className="py-3 px-4 text-white">£30.04</td>
                    <td className="py-3 px-4 text-white/50">£29.04</td>
                    <td className="py-3 pl-4 text-[#22C55E]">+3.4%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 text-white/70 font-sans">Refund Rate</td>
                    <td className="py-3 px-4 text-[#EF4444]">3.2%</td>
                    <td className="py-3 px-4 text-white/50">1.8%</td>
                    <td className="py-3 pl-4 text-[#EF4444]">-1.4%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="industrial-panel p-6 space-y-4">
                <h2 className="text-sm font-display text-white/50">WHAT WE SAID WOULD HAPPEN</h2>
                <div className="bg-white/5 p-4 rounded text-sm text-white/70 italic border-l-2 border-white/20">
                  "{DEMO_DECISIONS[0].rationale}"
                </div>
              </div>
              <div className="industrial-panel p-6 space-y-4">
                <h2 className="text-sm font-display text-white/50">WHAT HAPPENED</h2>
                <div className="bg-white/5 p-4 rounded text-sm text-white/70 border-l-2 border-[#D6A84B]">
                  Action executed on W31. Resulting in +17.8% conversion uplift on Etsy US, exceeding the expected model outcome by 4.2%.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="industrial-panel p-6 space-y-4 border border-[#22C55E]/20">
                <h2 className="text-sm font-display text-[#22C55E]">BIGGEST WINNERS</h2>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-[#22C55E] mt-0.5">↑</span>
                    <div>
                      <div className="text-white font-medium">Etsy US Conversion</div>
                      <div className="text-white/50 mt-1">+17.8% conversion (est. +£1,080)</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#22C55E] mt-0.5">↑</span>
                    <div>
                      <div className="text-white font-medium">Autopilot Efficiency</div>
                      <div className="text-white/50 mt-1">23 manual tasks automated</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="industrial-panel p-6 space-y-4 border border-[#EF4444]/20">
                <h2 className="text-sm font-display text-[#EF4444]">BIGGEST LOSERS</h2>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-[#EF4444] mt-0.5">↓</span>
                    <div>
                      <div className="text-white font-medium">Gumroad DE</div>
                      <div className="text-white/50 mt-1">Refund rate spike to 8.2% (above 3% threshold)</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <h2 className="text-sm font-display text-white/50">ACTION GRID</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { title: 'START', desc: 'Payhip launch & Commission German localisation', color: 'text-[#38BDF8]' },
                  { title: 'STOP', desc: 'Promotional spend on Gumroad DE while refunds high', color: 'text-[#EF4444]' },
                  { title: 'SCALE', desc: 'Etsy US listings + bundle strategy', color: 'text-[#22C55E]' },
                  { title: 'FIX', desc: 'German localisation copy (refund cause)', color: 'text-[#D6A84B]' },
                  { title: 'WATCH', desc: 'Etsy concentration risk (41%)', color: 'text-white/50' }
                ].map((item, i) => (
                  <div key={i} className="industrial-panel p-4 space-y-2">
                    <div className={`text-xs font-display ${item.color}`}>{item.title}</div>
                    <div className="text-xs text-white/80 leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'monthly' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <header className="flex justify-between items-end pb-4 border-b border-white/10">
              <div>
                <h1 className="text-2xl font-display text-white">BOARD-STYLE MONTHLY REPORT</h1>
                <p className="text-white/50 font-data text-sm">August 2026 (Month-to-Date)</p>
              </div>
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-display rounded transition-colors">
                DOWNLOAD PDF
              </button>
            </header>

            <div className="industrial-panel p-8 space-y-6">
              <h2 className="text-sm font-display text-[#D6A84B]">CEO SUMMARY</h2>
              <div className="prose prose-invert prose-sm max-w-none text-white/80 leading-relaxed">
                <p>
                  How to Trade continues to perform strongly on Etsy US, where a +17.8% conversion uplift has driven the highest contribution margin of any channel this month. The Gumroad DE refund situation requires immediate attention — early evidence points to copy misalignment rather than product quality.
                </p>
                <p>
                  The Payhip opportunity represents the fastest available path to portfolio diversification. The German localisation investment decision is now data-ready.
                </p>
                <p>
                  <strong>Overall:</strong> the portfolio is above target but with meaningful single-channel concentration risk that should be addressed before scaling spend.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="industrial-panel p-6">
                <h2 className="text-sm font-display text-white/50 mb-4">KEY FINANCIALS</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-white/50">Gross Revenue</span>
                    <span className="text-white font-data">£10,800</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-white/50">Net Revenue</span>
                    <span className="text-white font-data">£9,840</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-[#22C55E]">Net Contribution</span>
                    <span className="text-[#22C55E] font-data">£6,650</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-white/50">Contribution Margin</span>
                    <span className="text-white font-data">50.8%</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-white/50">Marketplace Fees</span>
                    <span className="text-white font-data">£1,960</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-[#EF4444]">Refunds</span>
                    <span className="text-[#EF4444] font-data">£330</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-white/50">AOV</span>
                    <span className="text-white font-data">£30.09</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-white/50">Orders</span>
                    <span className="text-white font-data">327</span>
                  </div>
                </div>
              </div>

              <div className="industrial-panel p-6 space-y-6">
                <div>
                  <h2 className="text-sm font-display text-white/50 mb-3">TOP MARKETPLACES</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white">Etsy US</span>
                      <span className="text-white/70 font-data">41% share</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden"><div className="bg-[#D6A84B] h-full" style={{width: '41%'}} /></div>
                    
                    <div className="flex justify-between items-center text-sm pt-2">
                      <span className="text-white">Gumroad</span>
                      <span className="text-white/70 font-data">28% share</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden"><div className="bg-[#38BDF8] h-full" style={{width: '28%'}} /></div>
                    
                    <div className="flex justify-between items-center text-sm pt-2">
                      <span className="text-white">Amazon KDP</span>
                      <span className="text-white/70 font-data">15% share</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden"><div className="bg-white/30 h-full" style={{width: '15%'}} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ExecutiveShell>
  );
}
