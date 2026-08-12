'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { DEMO_FORECASTS } from '@/lib/executive/demo-executive-data';

export default function ForecastPage() {
  const pathname = usePathname();
  const forecast = DEMO_FORECASTS[1]; // Using 30 days as default

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6">
        <div>
          <h1 className="text-[#F5F6F7] font-display text-lg font-bold">EXECUTIVE FORECAST</h1>
          <p className="text-[#A2A6AD] text-sm">Revenue and contribution projections with driver attribution.</p>
        </div>

        <div className="flex border-b border-white/10 font-display text-xs">
          <button className="px-4 py-3 text-[#626770] hover:text-[#A2A6AD]">7 DAYS</button>
          <button className="px-4 py-3 text-[#D6A84B] border-b-2 border-[#D6A84B]">30 DAYS</button>
          <button className="px-4 py-3 text-[#626770] hover:text-[#A2A6AD]">90 DAYS</button>
          <button className="px-4 py-3 text-[#626770] hover:text-[#A2A6AD] flex items-center gap-1">
            12 MONTHS <span className="text-[9px] bg-[#EF4444]/20 text-[#EF4444] px-1 rounded">LOW CONF</span>
          </button>
        </div>

        <div className="industrial-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#F5F6F7] font-display text-sm">30-DAY FORECAST</h2>
            <span className="text-[10px] font-data px-2 py-0.5 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
              MODERATE CONFIDENCE
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="p-3 bg-[#1C1F24] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] uppercase block mb-1">Gross Rev</span>
              <span className="text-[#F5F6F7] font-data font-bold">£{forecast.grossRevenueGbp.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-[#1C1F24] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] uppercase block mb-1">Net Rev</span>
              <span className="text-[#38BDF8] font-data font-bold">£{forecast.netRevenueGbp.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-[#1C1F24] rounded border border-[#D6A84B]/30 bg-[#D6A84B]/5">
              <span className="text-[#D6A84B] text-[10px] uppercase block mb-1">Contribution</span>
              <span className="text-[#D6A84B] font-data font-bold text-lg">£{forecast.contributionGbp.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-[#1C1F24] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] uppercase block mb-1">Orders</span>
              <span className="text-[#F5F6F7] font-data font-bold">{forecast.ordersCount}</span>
            </div>
            <div className="p-3 bg-[#1C1F24] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] uppercase block mb-1">AOV</span>
              <span className="text-[#F5F6F7] font-data font-bold">£{forecast.avgOrderValueGbp}</span>
            </div>
            <div className="p-3 bg-[#1C1F24] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] uppercase block mb-1">Refunds</span>
              <span className="text-[#EF4444] font-data font-bold">{((forecast.refundCount / forecast.ordersCount) * 100).toFixed(1)}%</span>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-[#A2A6AD] text-xs font-bold mb-4">CONTRIBUTION RANGE (Monte Carlo)</h3>
            <div className="relative h-2 bg-[#1C1F24] rounded-full mt-8 mb-6 mx-4">
              <div className="absolute top-1/2 left-[20%] right-[20%] h-1 bg-gradient-to-r from-[#EF4444] via-[#D6A84B] to-[#22C55E] transform -translate-y-1/2 opacity-50 rounded" />
              
              <div className="absolute top-1/2 left-[20%] transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#EF4444] shadow-[0_0_8px_#EF4444]" />
                <span className="absolute top-4 text-[#EF4444] font-data text-xs whitespace-nowrap">Worst: £{forecast.worstCaseGbp.toLocaleString()}</span>
              </div>
              
              <div className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full border-2 border-[#D6A84B] bg-[#0A0B0D] shadow-[0_0_12px_#D6A84B] z-10" />
                <span className="absolute bottom-5 text-[#D6A84B] font-data text-sm font-bold whitespace-nowrap">Expected: £{forecast.contributionGbp.toLocaleString()}</span>
              </div>

              <div className="absolute top-1/2 left-[80%] transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E]" />
                <span className="absolute top-4 text-[#22C55E] font-data text-xs whitespace-nowrap">Best: £{forecast.bestCaseGbp.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#A2A6AD] text-xs font-bold mb-2">FORECAST DRIVERS</h3>
              <p className="text-[10px] text-[#626770] italic mb-4">Never show a forecast without underlying drivers.</p>
              
              <div className="space-y-2">
                {forecast.drivers.map((driver, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-[#1C1F24] rounded border border-white/5">
                    <span className="text-[#F5F6F7] text-sm">{driver.description}</span>
                    <div className="flex items-center gap-3">
                      <span className={`font-data font-bold ${driver.deltaGbp > 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                        {driver.deltaGbp > 0 ? '+' : ''}£{driver.deltaGbp.toLocaleString()}
                      </span>
                      <span className="text-[9px] font-data px-1.5 py-0.5 bg-white/5 text-[#A2A6AD] rounded">
                        {driver.confidence}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center p-3 border-t border-white/10 mt-2">
                  <span className="text-[#A2A6AD] text-sm font-bold">Total Net Driver Impact</span>
                  <span className="text-[#22C55E] font-data font-bold">+£1,020</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[#A2A6AD] text-xs font-bold mb-4">FORECAST ASSUMPTIONS</h3>
              <ul className="list-disc pl-5 text-sm text-[#F5F6F7] space-y-2 mb-6">
                <li>Current trajectory maintained</li>
                <li>No major marketplace policy changes</li>
                <li>Price test conducted (£+600 contribution)</li>
                <li>Gumroad DE traffic paused (−£200)</li>
              </ul>

              <div className="bg-[#38BDF8]/5 border border-[#38BDF8]/20 p-4 rounded text-sm text-[#A2A6AD]">
                <h4 className="text-[#38BDF8] font-display text-xs mb-2">FORECASTING CONFIDENCE</h4>
                <p className="mb-2">
                  <strong className="text-[#F5F6F7]">MODERATE</strong> — Based on 45 days of trading data across 7 marketplaces. Monte Carlo range: £3,400–£5,900. Median: £4,820.
                </p>
                <p className="text-[10px] text-[#626770] italic">
                  All forecasts are estimates. Actual results may vary. Forecast accuracy improves with more data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExecutiveShell>
  );
}
