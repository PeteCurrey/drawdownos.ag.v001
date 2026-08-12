'use client';

import React, { useState } from 'react';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
// import { OptimisationOpportunity } from '@/lib/optimise/types';

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState('ALL');
  
  const tabs = [
    'ALL', 
    'PRICE NEVER TESTED', 
    'HIGH TRAFFIC LOW CONVERSION', 
    'LOW BUNDLE ATTACH', 
    'TERRITORY SIGNALS'
  ];

  const opportunities: any[] = [];

  return (
    <OptimiseShell title="OPPORTUNITY MINER" subtitle="Auto-generated experiment candidates from live OS data.">
      
      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 border-b border-white/10">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-display whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? 'bg-white/10 text-white border border-white/20' 
                : 'bg-transparent text-white/50 border border-transparent hover:text-white/80'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {opportunities.length === 0 && (
          <div className="industrial-panel bg-[#0A0B0D] border border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center">
            <div className="text-[#D6A84B] font-display text-sm tracking-widest mb-4">NO OPPORTUNITIES GENERATED</div>
            <p className="text-white/60 text-sm font-data max-w-lg">
              The Opportunity Miner requires live commerce data to identify structural testing gaps. Connect a data source to automatically generate experiment candidates.
            </p>
          </div>
        )}
        {opportunities.map(opp => (
          <div key={opp.id} className="bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/8 rounded-xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#D6A84B]/10 border border-[#D6A84B]/30 flex items-center justify-center text-[#D6A84B] font-data text-xl font-bold">
                  {opp.priorityScore}
                </div>
                <div>
                  <h3 className="text-xl text-white font-medium mb-1">{opp.title || 'Optimisation Candidate'}</h3>
                  <div className="flex space-x-2">
                    <span className="text-[10px] font-display px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10">
                      EFFORT: {opp.effort}
                    </span>
                    <span className="text-[10px] font-display px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10">
                      RISK: {opp.risk}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#38BDF8] font-data text-lg">{opp.expectedValue}</div>
                <div className="text-white/60 text-sm">Expected Value</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#0A0B0D] p-4 rounded-lg border border-white/5">
                <div className="text-white/40 text-xs font-display mb-2">KNOWLEDGE GAP ("What don't we know?")</div>
                <div className="text-white text-sm">{opp.knowledgeGap}</div>
              </div>
              <div className="bg-[#0A0B0D] p-4 rounded-lg border border-white/5">
                <div className="text-white/40 text-xs font-display mb-2">PROPOSED HYPOTHESIS</div>
                <div className="text-white text-sm">{opp.hypothesis}</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <div className="text-sm">
                <span className="text-white/40 font-display text-xs mr-2">LEARNING SCOPE:</span>
                <span className="text-[#D6A84B] font-display text-xs">{opp.learningValueScope}</span>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-transparent text-white/60 font-display text-xs rounded hover:text-white transition-colors border border-white/10">
                  DISMISS
                </button>
                <button className="px-4 py-2 bg-white/5 text-white font-display text-xs rounded hover:bg-white/10 transition-colors border border-white/10">
                  MODEL IN SCENARIO ENGINE
                </button>
                <button className="px-4 py-2 bg-[#D6A84B] text-black font-display text-xs rounded hover:bg-[#D6A84B]/90 transition-colors">
                  CREATE EXPERIMENT
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </OptimiseShell>
  );
}
