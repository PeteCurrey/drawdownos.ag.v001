'use client';

import React, { useState } from 'react';
import OptimiseShell from '@/components/optimise/OptimiseShell';

export default function OptimisationMapPage() {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

  const coverageData: any[] = [];

  const products: string[] = [];
  const marketplaces: string[] = [];

  return (
    <OptimiseShell header="OPTIMISATION MAP" description="Visual coverage of commercial optimization across the portfolio.">
      <div className="space-y-6">
        
        {/* Coverage Progress Bars */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6">
          <h2 className="font-display text-[#F5F6F7] text-lg font-bold tracking-[0.08em] mb-6">COVERAGE PROGRESS</h2>
          <div className="space-y-4">
            {coverageData.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-[#0A0B0D] border border-white/10 rounded-lg">
                <div className="text-[#D6A84B] font-display text-xs tracking-widest mb-2">NO COVERAGE DATA</div>
                <div className="text-white/50 text-sm font-data max-w-md">Sync your commerce catalogue and testing platform to generate accurate coverage metrics.</div>
              </div>
            )}
            {coverageData.map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <span className="w-32 text-sm font-display text-[#A2A6AD] tracking-[0.08em] uppercase">{item.name}</span>
                <div className="flex-1 bg-[#0A0B0D] h-2.5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="bg-[#D6A84B] h-full transition-all duration-1000 ease-out" 
                    style={{ width: `${item.value}%` }} 
                  />
                </div>
                <span className="w-12 text-right text-sm font-data text-[#F5F6F7]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Coverage Grid */}
        <div className="bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6 overflow-x-auto">
          <h2 className="font-display text-[#F5F6F7] text-lg font-bold tracking-[0.08em] mb-6">INTERACTIVE COVERAGE GRID</h2>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="p-3 border-b border-white/10 font-display text-[#A2A6AD] text-xs tracking-[0.08em]">PRODUCT</th>
                {marketplaces.map(mp => (
                  <th key={mp} className="p-3 border-b border-white/10 font-display text-[#A2A6AD] text-xs tracking-[0.08em]">{mp}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={marketplaces.length > 0 ? marketplaces.length + 1 : 1} className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-[#38BDF8] font-display text-xs tracking-widest mb-2">NO PRODUCTS OR MARKETPLACES</div>
                      <div className="text-white/50 text-sm font-data max-w-md">Connect your storefront to populate the testing matrix.</div>
                    </div>
                  </td>
                </tr>
              )}
              {products.map((product, i) => (
                <tr key={product} className="border-b border-white/5 last:border-0">
                  <td className="p-3 font-display text-sm text-[#F5F6F7] whitespace-nowrap">{product}</td>
                  {marketplaces.map((mp, j) => {
                    const id = `${product}-${mp}`;
                    // Mock statuses based on index for demo
                    const status = (i + j) % 4 === 0 ? 'STRONG EVIDENCE' : 
                                   (i + j) % 4 === 1 ? 'ACTIVE' : 
                                   (i + j) % 4 === 2 ? 'UNDERPERFORMING' : 'UNTESTED';
                    
                    const statusColors = {
                      'STRONG EVIDENCE': 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30',
                      'ACTIVE': 'text-[#D6A84B] bg-[#D6A84B]/10 border-[#D6A84B]/30 animate-pulse',
                      'UNTESTED': 'text-[#A2A6AD] bg-transparent border-white/10',
                      'UNDERPERFORMING': 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/30'
                    };

                    return (
                      <td key={mp} className="p-2">
                        <button 
                          onClick={() => setSelectedCell(selectedCell === id ? null : id)}
                          className={`w-full text-left p-2 rounded border ${statusColors[status as keyof typeof statusColors]} hover:opacity-80 transition-opacity`}
                        >
                          <span className="font-display text-[10px] tracking-wider block">{status}</span>
                        </button>
                        
                        {/* Detail Panel Popup inline for simplicity */}
                        {selectedCell === id && (
                          <div className="absolute z-10 mt-2 p-4 bg-[#0A0B0D] border border-white/20 rounded-lg shadow-xl w-64">
                            <div className="text-xs font-display text-[#D6A84B] mb-2">{product} × {mp}</div>
                            <div className="space-y-1.5 font-data text-sm">
                              <div className="flex justify-between">
                                <span className="text-[#A2A6AD]">Revenue at Risk:</span>
                                <span className="text-[#F5F6F7]">£12,450</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#A2A6AD]">Last Tested:</span>
                                <span className="text-[#F5F6F7]">12 Aug 2026</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#A2A6AD]">Linked Exp:</span>
                                <span className="text-[#38BDF8]">EXP-042</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </OptimiseShell>
  );
}
