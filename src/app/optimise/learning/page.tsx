'use client';

import React, { useState } from 'react';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
import { DEMO_LEARNINGS } from '@/lib/optimise/demo-optimise-data';
// import { Learning } from '@/lib/optimise/types';

export default function LearningLibraryPage() {
  const [activeTab, setActiveTab] = useState('ALL');
  
  const tabs = [
    'ALL', 
    'PRICING', 
    'POSITIONING', 
    'CREATIVE', 
    'MARKETPLACE',
    'LOCALISATION',
    'BUNDLES'
  ];

  // Using DEMO_LEARNINGS if available or fallback
  const learnings = DEMO_LEARNINGS || [
    {
      id: 'lrn-001',
      title: 'Beginner trading PDFs show low price elasticity',
      scope: 'CATEGORY',
      confidence: 'STRONG',
      implication: 'We can safely increase baseline prices for entry-level information products without sacrificing total customer acquisition volume.',
      evidence: '3 experiments, 312 customers',
      relevance: 'HIGH (validated 12 Aug 2026)',
    },
    {
      id: 'lrn-002',
      title: 'Guarantees on Etsy reduce trust',
      scope: 'MARKETPLACE',
      confidence: 'MODERATE',
      implication: 'Avoid visual guarantee badges on Etsy; let the platform\'s native buyer protection do the heavy lifting.',
      evidence: '1 experiment, 1,450 customers',
      relevance: 'HIGH (validated 10 Aug 2026)',
    }
  ];

  return (
    <OptimiseShell title="LEARNING LIBRARY" subtitle="Institutional commercial memory.">
      
      {/* Filter Tabs */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
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
        <div className="flex space-x-2">
          <span className="text-white/40 text-xs font-display self-center mr-2">CONFIDENCE:</span>
          {['STRONG', 'MODERATE', 'EARLY'].map(conf => (
            <button key={conf} className="px-2 py-1 rounded text-[10px] font-display border border-white/10 text-white/60 hover:bg-white/5">
              {conf}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {learnings.map(learning => (
          <div key={learning.id} className="bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/8 rounded-xl p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <span className="inline-block px-2 py-1 bg-white/5 border border-white/10 text-white/80 rounded text-[10px] font-display">
                  {learning.scope}
                </span>
                <span className={`inline-block px-2 py-1 border rounded text-[10px] font-display ${
                  learning.confidence === 'STRONG' ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]' : 'bg-[#D6A84B]/10 border-[#D6A84B]/30 text-[#D6A84B]'
                }`}>
                  {learning.confidence}
                </span>
              </div>
              <div className="text-[#38BDF8] text-[10px] font-display px-2 py-1 border border-[#38BDF8]/20 bg-[#38BDF8]/10 rounded">
                RELEVANCE: {learning.currentRelevance}
              </div>
            </div>
            
            <h3 className="text-lg text-white font-medium mb-2">{learning.title}</h3>
            
            <div className="bg-[#0A0B0D] p-4 rounded-lg border border-white/5 mt-auto mb-4">
              <div className="text-white/40 text-xs font-display mb-1">IMPLICATION FOR FUTURE DECISIONS</div>
              <div className="text-white text-sm leading-relaxed">{learning.implication}</div>
            </div>
            
            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <div className="text-white/50 text-xs font-data">
                Based on {learning.evidenceCount} experiment{learning.evidenceCount !== 1 ? 's' : ''}
              </div>
              <a href="#" className="text-[#D6A84B] font-display text-xs hover:underline flex items-center">
                VIEW EXPERIMENTS <span className="ml-1">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </OptimiseShell>
  );
}
