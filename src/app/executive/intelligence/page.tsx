'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';
import { DEMO_INSIGHTS, DEMO_SIGNALS } from '@/lib/executive/demo-executive-data';

export default function IntelligenceFeedPage() {
  const pathname = usePathname();

  const getItemTime = (item: any) => new Date(item.createdAt || item.detectedAt || 0).getTime();
  const allItems = [...DEMO_INSIGHTS, ...DEMO_SIGNALS].sort((a, b) => getItemTime(b) - getItemTime(a));

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'CRITICAL': return 'bg-[#EF4444] shadow-[0_0_8px_#EF4444]';
      case 'IMPORTANT': return 'bg-[#FF6A18]';
      case 'WATCH': return 'bg-[#D6A84B]';
      case 'INFO': return 'bg-[#38BDF8]';
      default: return 'bg-[#626770]';
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    switch (status) {
      case 'NEW': return <span className="text-[9px] font-data px-1.5 py-0.5 bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 rounded">NEW</span>;
      case 'RECOMMENDED': return <span className="text-[9px] font-data px-1.5 py-0.5 bg-[#D6A84B]/10 text-[#D6A84B] border border-[#D6A84B]/30 rounded">RECOMMENDED</span>;
      case 'ACTIONED': return <span className="text-[9px] font-data px-1.5 py-0.5 bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 rounded">ACTIONED</span>;
      case 'WATCHING': return <span className="text-[9px] font-data px-1.5 py-0.5 bg-white/5 text-[#A2A6AD] border border-white/10 rounded">WATCHING</span>;
      default: return null;
    }
  };

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-[#F5F6F7] font-display text-lg font-bold">INTELLIGENCE FEED</h1>
          <p className="text-[#A2A6AD] text-sm">Signal &rarr; Insight &rarr; Recommendation &rarr; Action &rarr; Result &rarr; Learning</p>
        </div>

        <div className="industrial-panel p-4 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-wrap gap-2 text-xs font-display">
            <button className="px-3 py-1.5 bg-[#1C1F24] text-[#F5F6F7] border border-[#D6A84B]/50 rounded">ALL</button>
            <button className="px-3 py-1.5 bg-[#121418] text-[#A2A6AD] hover:bg-[#1C1F24] border border-white/5 rounded">PERFORMANCE</button>
            <button className="px-3 py-1.5 bg-[#121418] text-[#A2A6AD] hover:bg-[#1C1F24] border border-white/5 rounded">OPPORTUNITY</button>
            <button className="px-3 py-1.5 bg-[#121418] text-[#A2A6AD] hover:bg-[#1C1F24] border border-white/5 rounded">RISK</button>
            <button className="px-3 py-1.5 bg-[#121418] text-[#A2A6AD] hover:bg-[#1C1F24] border border-white/5 rounded">ANOMALY</button>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] font-display items-center">
            <span className="text-[#626770] mr-2">SEVERITY:</span>
            <button className="px-2 py-1 text-[#F5F6F7] bg-white/10 rounded">ALL</button>
            <button className="px-2 py-1 text-[#EF4444] hover:bg-white/5 rounded">CRITICAL</button>
            <button className="px-2 py-1 text-[#FF6A18] hover:bg-white/5 rounded">IMPORTANT</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {allItems.map((item: any) => (
              <div key={item.id} className="industrial-panel p-4 flex gap-4 hover:border-white/20 transition-colors group">
                <div className="pt-1 flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${getSeverityColor(item.severity)}`} />
                  <div className="w-px h-full bg-white/5 my-2 group-last:hidden" />
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="text-[#626770] font-data text-[10px]">{new Date(item.timestamp).toLocaleString()}</span>
                    <span className="text-[9px] font-data px-1.5 py-0.5 bg-[#1C1F24] text-[#A2A6AD] border border-white/10 rounded uppercase">
                      {item.type || item.category}
                    </span>
                    {getStatusBadge(item.status)}
                  </div>
                  <h3 className="text-[#F5F6F7] font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-[#A2A6AD] text-sm line-clamp-2 mb-3">
                    {item.narrative || item.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                    {item.financialExposureGbp ? (
                      <span className="text-[#EF4444] font-data text-xs font-bold">
                        Exposure: £{item.financialExposureGbp.toLocaleString()}
                      </span>
                    ) : item.estimatedValueGbp ? (
                      <span className="text-[#22C55E] font-data text-xs font-bold">
                        Value: £{item.estimatedValueGbp.toLocaleString()}
                      </span>
                    ) : (
                      <span />
                    )}
                    <button className="text-[#D6A84B] font-display text-[10px] font-bold hover:text-[#e2b558] transition-colors">
                      VIEW FULL &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="industrial-panel p-5 sticky top-20">
              <h3 className="text-[#F5F6F7] font-display text-sm mb-4">SIGNAL TO INSIGHT LINEAGE</h3>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="bg-[#1C1F24] border border-white/10 p-3 rounded text-xs text-[#A2A6AD] relative z-10">
                    <strong className="text-[#F5F6F7] block mb-1">sig-001</strong>
                    Etsy conversion down 12% in US
                  </div>
                  <div className="absolute left-6 -bottom-6 w-px h-6 bg-[#38BDF8]/50 z-0" />
                  <div className="absolute left-6 -bottom-3 w-4 h-px bg-[#38BDF8]/50 z-0" />
                </div>
                
                <div className="relative">
                  <div className="bg-[#1C1F24] border border-white/10 p-3 rounded text-xs text-[#A2A6AD] relative z-10">
                    <strong className="text-[#F5F6F7] block mb-1">sig-002</strong>
                    US competitor "TradePro" dropped price to $19
                  </div>
                  <div className="absolute left-6 -bottom-6 w-px h-6 bg-[#38BDF8]/50 z-0" />
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D6A84B] z-20" />
                  <div className="bg-[#D6A84B]/10 border border-[#D6A84B]/30 p-3 rounded text-xs text-[#F5F6F7] relative z-10">
                    <strong className="text-[#D6A84B] block mb-1">ins-001 (Deduplicated Insight)</strong>
                    US conversion drop directly correlated to competitor pricing action. Recommend 14-day counter-price test.
                  </div>
                </div>
              </div>
              
              <p className="text-[10px] text-[#626770] mt-6 italic">
                OS automatically clusters raw signals into actionable insights to prevent alert fatigue.
              </p>
            </div>
          </div>
        </div>

      </div>
    </ExecutiveShell>
  );
}
