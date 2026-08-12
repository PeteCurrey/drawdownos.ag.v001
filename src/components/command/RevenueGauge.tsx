'use client';

import React from 'react';
import { DollarSign, TrendingUp, Target, ArrowUpRight } from 'lucide-react';
import { DEMO_TELEMETRY_METRICS } from '@/lib/demo-data';

export default function RevenueGauge() {
  const metrics = DEMO_TELEMETRY_METRICS;
  const pct = metrics.targetPercentage; // e.g. 68.42%

  // SVG Gauge Calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * (circumference * 0.75); // 270 degree arc

  return (
    <div className="industrial-panel p-6 flex flex-col justify-between h-full min-h-[440px]">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <span className="text-[9px] font-display text-[#D6A84B] tracking-widest block">TELEMETRY INSTRUMENT</span>
          <h2 className="font-display text-base text-[#F5F6F7] tracking-wider">REVENUE ENGINE</h2>
        </div>
        <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/20">
          DEMO
        </span>
      </div>

      {/* Main Gauge Dial Section */}
      <div className="my-6 flex flex-col items-center justify-center relative">
        
        {/* SVG Arc Gauge */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-135" viewBox="0 0 180 180">
            {/* Background Arc */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="#1C1F24"
              strokeWidth="14"
              fill="transparent"
              strokeDasharray={circumference * 0.75}
              strokeLinecap="round"
            />
            {/* Foreground Metallic Gold Arc */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="#D6A84B"
              strokeWidth="14"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out shadow-[0_0_12px_#D6A84B]"
            />
          </svg>

          {/* Center Digital Telemetry Readout */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-display text-[#A2A6AD]">MTD TARGET</span>
            <div className="font-data text-3xl font-bold text-[#F5F6F7] tracking-tighter my-0.5">
              {pct.toFixed(1)}%
            </div>
            <span className="text-[10px] font-data text-[#22C55E] flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +18.4% YoY
            </span>
          </div>
        </div>

        {/* Big Numerical Readouts */}
        <div className="w-full grid grid-cols-2 gap-3 mt-4 text-center">
          <div className="industrial-panel-inset p-3">
            <span className="text-[9px] font-display text-[#A2A6AD] block">REVENUE TODAY</span>
            <span className="font-data text-xl font-bold text-[#22C55E]">
              £{metrics.revenueToday.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="industrial-panel-inset p-3">
            <span className="text-[9px] font-display text-[#A2A6AD] block">REVENUE MTD</span>
            <span className="font-data text-xl font-bold text-[#D6A84B]">
              £{metrics.revenueMtd.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

      </div>

      {/* Financial Target Metrics Row */}
      <div className="pt-4 border-t border-white/10 space-y-2 font-data text-xs">
        <div className="flex justify-between items-center text-[#A2A6AD]">
          <span>Monthly Target:</span>
          <span className="text-[#F5F6F7] font-bold">£{metrics.monthlyTarget.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-[#A2A6AD]">
          <span>Forecast (End of Month):</span>
          <span className="text-[#22C55E] font-bold">£{metrics.monthlyForecast.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-[#A2A6AD]">
          <span>Previous Period Comparison:</span>
          <span className="text-[#22C55E] font-bold">+18.4% vs Prior</span>
        </div>
      </div>

    </div>
  );
}
