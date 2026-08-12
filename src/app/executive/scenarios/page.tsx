'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { DEMO_SCENARIOS } from '@/lib/executive/demo-executive-data';

export default function ScenariosPage() {
  const pathname = usePathname();
  const scenario = DEMO_SCENARIOS[0];

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6">
        <div>
          <h1 className="text-[#F5F6F7] font-display text-lg font-bold">STRATEGIC SCENARIO MODELLER — What If Analysis</h1>
          <p className="text-[#A2A6AD] text-sm">Model decisions before implementation. Compare cases. Save scenarios.</p>
        </div>

        <div className="industrial-panel p-6">
          <h2 className="text-[#D6A84B] font-display text-sm mb-4">SAVED SCENARIOS</h2>
          <div className="industrial-panel-elevated p-4">
            <h3 className="text-[#F5F6F7] font-bold text-base">{scenario.name}</h3>
            <p className="text-[#A2A6AD] text-sm mb-4">{scenario.description}</p>
            <p className="text-xs text-[#626770] mb-4">Created: {new Date(scenario.createdAt).toLocaleDateString()}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-[#1C1F24] rounded border border-white/5">
                <span className="text-[#A2A6AD] text-[10px] uppercase block mb-1">Base</span>
                <span className="text-[#F5F6F7] font-data">£3,140</span>
              </div>
              <div className="p-3 bg-[#1C1F24] rounded border border-[#22C55E]/30">
                <span className="text-[#22C55E] text-[10px] uppercase block mb-1">Bull</span>
                <span className="text-[#F5F6F7] font-data">£3,860</span>
              </div>
              <div className="p-3 bg-[#1C1F24] rounded border border-[#EF4444]/30">
                <span className="text-[#EF4444] text-[10px] uppercase block mb-1">Bear</span>
                <span className="text-[#F5F6F7] font-data">£2,420</span>
              </div>
            </div>

            <div className="text-sm text-[#A2A6AD] mb-2">
              Monte Carlo range: <span className="font-data text-white">£2,420–£3,860</span> (median <span className="font-data text-white">£3,200</span>)
            </div>
            <div className="text-xs mb-4">
              Confidence: <span className="text-[#38BDF8] font-bold">MODERATE</span>
            </div>
            <button className="px-4 py-2 bg-[#D6A84B] text-[#0A0B0D] font-display text-xs font-bold rounded">
              OPEN SCENARIO →
            </button>
          </div>
        </div>

        <div className="industrial-panel p-6">
          <h2 className="text-[#F5F6F7] font-display text-sm mb-4">SCENARIO DETAIL</h2>
          
          <div className="mb-6">
            <h3 className="text-[#A2A6AD] text-xs font-bold mb-2">ASSUMPTIONS</h3>
            <table className="w-full text-left text-sm">
              <thead className="text-[#626770] font-data text-xs border-b border-white/10">
                <tr>
                  <th className="py-2">Variable</th>
                  <th className="py-2">Baseline</th>
                  <th className="py-2">Scenario Value</th>
                  <th className="py-2">Unit</th>
                  <th className="py-2">Confidence</th>
                </tr>
              </thead>
              <tbody className="text-[#F5F6F7]">
                <tr className="border-b border-white/5">
                  <td className="py-2">Price Increase</td>
                  <td className="py-2 font-data">0</td>
                  <td className="py-2 font-data">+5</td>
                  <td className="py-2">£</td>
                  <td className="py-2 text-[#38BDF8]">HIGH</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-6 overflow-x-auto">
            <h3 className="text-[#A2A6AD] text-xs font-bold mb-2">CASE COMPARISON</h3>
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-[#626770] font-data text-xs border-b border-white/10">
                <tr>
                  <th className="py-2">Metric</th>
                  <th className="py-2 px-2">BASE</th>
                  <th className="py-2 px-2">BULL</th>
                  <th className="py-2 px-2">BEAR</th>
                  <th className="py-2 px-2 text-[#D6A84B]">RECOMMENDED</th>
                </tr>
              </thead>
              <tbody className="text-[#F5F6F7] font-data">
                <tr className="border-b border-white/5">
                  <td className="py-2 text-[#A2A6AD] font-sans">Gross Revenue</td>
                  <td className="py-2 px-2">£4,000</td>
                  <td className="py-2 px-2">£4,800</td>
                  <td className="py-2 px-2">£3,100</td>
                  <td className="py-2 px-2 border-x border-t border-[#D6A84B]/50 bg-[#D6A84B]/5">£4,100</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-[#A2A6AD] font-sans">Net Revenue</td>
                  <td className="py-2 px-2">£3,500</td>
                  <td className="py-2 px-2">£4,200</td>
                  <td className="py-2 px-2">£2,700</td>
                  <td className="py-2 px-2 border-x border-[#D6A84B]/50 bg-[#D6A84B]/5">£3,600</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-[#A2A6AD] font-sans">Contribution</td>
                  <td className="py-2 px-2">£3,140</td>
                  <td className="py-2 px-2">£3,860</td>
                  <td className="py-2 px-2">£2,420</td>
                  <td className="py-2 px-2 border-x border-[#D6A84B]/50 bg-[#D6A84B]/5 font-bold text-[#D6A84B]">£3,200</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-[#A2A6AD] font-sans">Orders</td>
                  <td className="py-2 px-2">100</td>
                  <td className="py-2 px-2">115</td>
                  <td className="py-2 px-2">80</td>
                  <td className="py-2 px-2 border-x border-[#D6A84B]/50 bg-[#D6A84B]/5">102</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-[#A2A6AD] font-sans">AOV</td>
                  <td className="py-2 px-2">£40</td>
                  <td className="py-2 px-2">£41.7</td>
                  <td className="py-2 px-2">£38.7</td>
                  <td className="py-2 px-2 border-x border-[#D6A84B]/50 bg-[#D6A84B]/5">£40.1</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-[#A2A6AD] font-sans">Refund Rate</td>
                  <td className="py-2 px-2">4.5%</td>
                  <td className="py-2 px-2">3.8%</td>
                  <td className="py-2 px-2">6.0%</td>
                  <td className="py-2 px-2 border-x border-[#D6A84B]/50 bg-[#D6A84B]/5">4.2%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-[#A2A6AD] font-sans">Margin%</td>
                  <td className="py-2 px-2">78.5%</td>
                  <td className="py-2 px-2">80.4%</td>
                  <td className="py-2 px-2">78.0%</td>
                  <td className="py-2 px-2 border-x border-[#D6A84B]/50 bg-[#D6A84B]/5">78.0%</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#A2A6AD] font-sans">Probability%</td>
                  <td className="py-2 px-2">50%</td>
                  <td className="py-2 px-2">20%</td>
                  <td className="py-2 px-2">30%</td>
                  <td className="py-2 px-2 border-x border-b border-[#D6A84B]/50 bg-[#D6A84B]/5">68%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-6">
            <h3 className="text-[#A2A6AD] text-xs font-bold mb-2">MONTE CARLO SIMULATION</h3>
            <div className="bg-[#1C1F24] p-4 rounded border border-white/5 text-sm space-y-2">
              <p className="text-[#F5F6F7]">Range: <span className="font-data text-[#EF4444]">£2,420</span> (worst) — <span className="font-data text-[#D6A84B]">£3,200</span> (median) — <span className="font-data text-[#22C55E]">£3,860</span> (best)</p>
              <p className="text-[#38BDF8]">Probability above £3,000: <span className="font-data">68%</span></p>
              <p className="text-[#A2A6AD]">Confidence: <span className="text-[#F5F6F7]">MODERATE</span> — 45-day window sufficient but price elasticity unconfirmed</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[#A2A6AD] text-xs font-bold mb-2">WHAT WOULD CHANGE THIS RECOMMENDATION?</h3>
            <ul className="list-disc pl-5 text-sm text-[#A2A6AD] space-y-1">
              <li>Conversion rate drops below 2.5% during first 3 days of test</li>
              <li>Refund rate spikes above 6% on new price point</li>
              <li>Competitor aggressively discounts below our new baseline</li>
            </ul>
          </div>

          <div className="bg-[#D6A84B]/10 border border-[#D6A84B]/30 p-4 rounded mb-6">
            <h3 className="text-[#D6A84B] font-display text-xs mb-1">RECOMMENDATION</h3>
            <p className="text-[#F5F6F7] text-sm">Proceed with controlled 14-day price test. Auto-revert at -8% conversion.</p>
          </div>
        </div>

        <div>
          <h2 className="text-[#A2A6AD] font-display text-xs mb-3">EXAMPLE SCENARIOS</h2>
          <div className="flex flex-wrap gap-2">
            {['What if Etsy disappears tomorrow?', 'What if refunds rise to 7%?', 'What if we bundle three PDFs?', 'What if we add 20 marketplaces?', 'What if affiliate revenue doubles?', 'What if Amazon conversion +20%?'].map(prompt => (
              <button key={prompt} className="px-3 py-1.5 bg-[#17191E] hover:bg-[#1C1F24] border border-white/10 rounded-full text-xs text-[#A2A6AD] transition-colors">
                {prompt}
              </button>
            ))}
          </div>
        </div>

      </div>
    </ExecutiveShell>
  );
}
