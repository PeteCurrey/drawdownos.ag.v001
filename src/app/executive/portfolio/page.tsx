'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { 
  DEMO_PORTFOLIO_HEALTH, 
  DEMO_PORTFOLIO_PRODUCTS, 
  DEMO_PORTFOLIO_MARKETPLACES 
} from '@/lib/executive/demo-executive-data';

export default function PortfolioPage() {
  const pathname = usePathname();

  const getClassColor = (cls: string) => {
    switch (cls) {
      case 'STAR': return 'bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30';
      case 'SCALE': return 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30';
      case 'INCUBATE': return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
      case 'HOLD': return 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30';
      case 'TEST': return 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30';
      case 'WATCH': return 'bg-[#FF6A18]/10 text-[#FF6A18] border-[#FF6A18]/30';
      case 'EXIT': return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30';
      default: return 'bg-[#1C1F24] text-[#A2A6AD] border-white/10';
    }
  };

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6">
        <div>
          <h1 className="text-[#F5F6F7] font-display text-lg font-bold">PORTFOLIO INTELLIGENCE — Investment View</h1>
          <p className="text-[#A2A6AD] text-sm">The portfolio treated as an asset mix, not a task list.</p>
        </div>

        {/* Portfolio Health Banner */}
        <div className="industrial-panel p-4 flex gap-6 text-sm overflow-x-auto whitespace-nowrap">
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">SCORE</span>
            <span className="text-[#F5F6F7] font-data text-lg">{DEMO_PORTFOLIO_HEALTH.overallScore}/100</span>
          </div>
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">DIVERSIFICATION</span>
            <span className="text-[#38BDF8] font-data text-lg">{DEMO_PORTFOLIO_HEALTH.diversificationScore}/100</span>
          </div>
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">EFFICIENCY</span>
            <span className="text-[#22C55E] font-data text-lg">{DEMO_PORTFOLIO_HEALTH.efficiencyScore}/100</span>
          </div>
          <div>
            <span className="text-[#626770] font-data text-xs block mb-1">RESILIENCE</span>
            <span className="text-[#D6A84B] font-data text-lg">{DEMO_PORTFOLIO_HEALTH.resilienceScore}/100</span>
          </div>
        </div>

        {/* Concentration Risk Panel */}
        <div className="industrial-panel border-l-4 border-l-[#EF4444] p-4 bg-[#EF4444]/5">
          <h2 className="text-[#EF4444] font-display text-xs mb-2 font-bold">CONCENTRATION RISK</h2>
          <ul className="text-sm text-[#F5F6F7] space-y-1 mb-2 list-disc pl-4">
            <li>Etsy US: 41% of net revenue — <span className="text-[#EF4444] font-bold">RISK: HIGH</span></li>
            <li>How to Trade: 78.4% of portfolio revenue — <span className="text-[#EF4444] font-bold">RISK: HIGH</span></li>
            <li>UK+US combined: 72% — <span className="text-[#D6A84B] font-bold">RISK: MEDIUM</span></li>
          </ul>
          <p className="text-sm text-[#A2A6AD]">
            <strong className="text-[#F5F6F7]">Recommendation:</strong> Accelerate Payhip + Amazon KDP to reduce Etsy dependency below 30%.
          </p>
        </div>

        {/* PRODUCT PORTFOLIO */}
        <div className="industrial-panel p-6">
          <h2 className="text-[#F5F6F7] font-display text-sm mb-4">PRODUCT PORTFOLIO</h2>
          <div className="space-y-4 mb-8">
            {DEMO_PORTFOLIO_PRODUCTS.map((prod) => (
              <div key={prod.id} className="industrial-panel-elevated p-4 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-data px-2 py-0.5 rounded border ${getClassColor(prod.classification)}`}>
                      {prod.classification}
                    </span>
                    <span className="text-[#F5F6F7] font-bold text-sm">{prod.title}</span>
                    <span className="text-[#626770] font-data text-xs">{prod.sku}</span>
                  </div>
                  <div className="text-xs text-[#A2A6AD] font-data flex items-center gap-3">
                    <span>Net: £{prod.netRevenueGbp.toLocaleString()}</span>
                    <span>Contribution: £{prod.contributionGbp.toLocaleString()}</span>
                    <span>Margin: {prod.contributionMarginPct.toFixed(1)}%</span>
                    <span className={prod.growthPct > 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}>
                      Growth: {prod.growthPct.toFixed(1)}%
                    </span>
                    <span>Refunds: {prod.refundRatePct.toFixed(1)}%</span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-24 text-[#626770]">Portfolio Share</span>
                    <div className="flex-1 h-2 bg-[#1C1F24] rounded-full overflow-hidden">
                      <div className="h-full bg-[#38BDF8]" style={{ width: `${prod.portfolioSharePct}%` }} />
                    </div>
                    <span className="w-8 text-right font-data">{prod.portfolioSharePct.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-24 text-[#626770]">Strategic Val</span>
                    <div className="flex-1 h-2 bg-[#1C1F24] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D6A84B]" style={{ width: `${prod.strategicValue}%` }} />
                    </div>
                    <span className="w-8 text-right font-data">{prod.strategicValue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-24 text-[#626770]">Ops Burden</span>
                    <div className="flex-1 h-2 bg-[#1C1F24] rounded-full overflow-hidden">
                      <div className="h-full bg-[#EF4444]" style={{ width: `${prod.operationalBurden}%` }} />
                    </div>
                    <span className="w-8 text-right font-data">{prod.operationalBurden}</span>
                  </div>
                </div>
                
                <div className="text-[10px] text-[#A2A6AD] flex flex-col gap-1 items-end min-w-[120px]">
                  <span>{prod.marketplaceCount} marketplaces</span>
                  <span>{prod.localisationCount} localisations</span>
                  <span>{prod.derivativeCount} derivatives</span>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-[#A2A6AD] font-display text-xs mb-4">PRODUCT MATRIX</h3>
          <p className="text-xs text-[#626770] mb-4">X = Growth MoM%, Y = Contribution Margin%. Bubble size = Net Revenue</p>
          
          <div className="relative w-full h-[400px] bg-[#121418] border border-white/10 rounded-lg overflow-hidden text-[10px] font-data text-[#A2A6AD]">
            {/* Grid lines */}
            <div className="absolute left-0 right-0 top-1/2 h-px bg-white/5" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5" />
            
            {/* Quadrant Labels */}
            <div className="absolute top-2 right-2 text-[#D6A84B] opacity-50 font-display">STAR</div>
            <div className="absolute bottom-2 right-2 text-[#38BDF8] opacity-50 font-display">SCALE</div>
            <div className="absolute top-2 left-2 text-[#F97316] opacity-50 font-display">FIX</div>
            <div className="absolute bottom-2 left-2 text-[#EF4444] opacity-50 font-display">RETIRE</div>

            {/* Axis Labels */}
            <div className="absolute bottom-1 right-2">High Growth &rarr;</div>
            <div className="absolute top-2 left-1 rotate-90 origin-top-left">High Margin &rarr;</div>

            {/* Bubbles */}
            {DEMO_PORTFOLIO_PRODUCTS.map(prod => {
              const xPos = Math.max(0, Math.min(100, (prod.growthPct * 100 + 10) * 2)); 
              const yPos = Math.max(0, Math.min(100, 100 - ((prod.contributionMarginPct * 100 - 30) * 2.5)));
              const size = Math.max(20, Math.min(80, prod.netRevenueGbp / 50));
              const color = prod.classification === 'STAR' ? '#D6A84B' : prod.classification === 'SCALE' ? '#38BDF8' : '#A2A6AD';

              return (
                <div 
                  key={prod.id} 
                  className="absolute rounded-full border border-white/20 flex items-center justify-center text-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                  style={{
                    left: `${xPos}%`,
                    top: `${yPos}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: `${color}30`,
                    borderColor: color
                  }}
                  title={`${prod.title}\nGrowth: ${(prod.growthPct*100).toFixed(1)}%\nMargin: ${(prod.contributionMarginPct*100).toFixed(1)}%`}
                >
                  <span className="text-[8px] leading-tight truncate px-1 text-white mix-blend-difference">{prod.title.substring(0, 10)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* MARKETPLACE PORTFOLIO */}
        <div className="industrial-panel p-6">
          <h2 className="text-[#F5F6F7] font-display text-sm mb-4">MARKETPLACE PORTFOLIO</h2>
          <div className="space-y-4">
            {DEMO_PORTFOLIO_MARKETPLACES.map((mp) => (
              <div key={mp.id} className="industrial-panel-elevated p-4 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-data px-2 py-0.5 rounded border ${getClassColor(mp.classification)}`}>
                      {mp.classification}
                    </span>
                    <span className="text-[#F5F6F7] font-bold text-sm">{mp.name}</span>
                  </div>
                  <div className="text-xs text-[#A2A6AD] font-data flex items-center gap-3">
                    <span>Contribution: £{mp.contributionGbp.toLocaleString()}</span>
                    <span>Margin: {mp.contributionMarginPct.toFixed(1)}%</span>
                    <span>Fee: {mp.feePct}%</span>
                    <span>Refunds: {mp.refundRatePct.toFixed(1)}%</span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-24 text-[#626770]">Portfolio Share</span>
                    <div className="flex-1 h-2 bg-[#1C1F24] rounded-full overflow-hidden">
                      <div className="h-full bg-[#38BDF8]" style={{ width: `${mp.portfolioSharePct}%` }} />
                    </div>
                    <span className="w-8 text-right font-data">{mp.portfolioSharePct.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-24 text-[#626770]">Audience Fit</span>
                    <div className="flex-1 h-2 bg-[#1C1F24] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D6A84B]" style={{ width: `${mp.audienceFit}%` }} />
                    </div>
                    <span className="w-8 text-right font-data">{mp.audienceFit}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-24 text-[#626770]">Automation</span>
                    <div className="flex-1 h-2 bg-[#1C1F24] rounded-full overflow-hidden">
                      <div className="h-full bg-[#22C55E]" style={{ width: `${mp.automationCapability}%` }} />
                    </div>
                    <span className="w-8 text-right font-data">{mp.automationCapability}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1 items-end min-w-[140px]">
                  <span className="text-[10px] font-data px-2 py-0.5 bg-[#17191E] border border-white/10 rounded text-[#A2A6AD]">
                    Policy Risk: {mp.policyRisk}
                  </span>
                  <span className="text-[10px] font-data px-2 py-0.5 bg-[#17191E] border border-white/10 rounded text-[#A2A6AD]">
                    Dependency: {mp.dependencyRisk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ExecutiveShell>
  );
}
