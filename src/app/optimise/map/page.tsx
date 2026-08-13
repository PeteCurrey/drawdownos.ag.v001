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
              {/* Products list is empty — populated from real commerce catalogue once synced */}
            </tbody>
          </table>
        </div>

      </div>
    </OptimiseShell>
  );
}
