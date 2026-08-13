'use client';

import React, { useState } from 'react';
import OptimiseShell from '@/components/optimise/OptimiseShell';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function AnalystPage() {
  const [query, setQuery] = useState('');

  const chips = [
    "What products are live on Whop?",
    "Show Whop API connector health status",
    "List all recorded payment ledger entries"
  ];

  return (
    <OptimiseShell header="AI EXPERIMENT ANALYST" description="Query commercial evidence & learning history.">
      <div className="flex flex-col h-[calc(100vh-200px)] min-h-[600px] space-y-4">
        
        {/* Chat History Area */}
        <div className="flex-1 bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-6 overflow-y-auto flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-10 h-10 text-[#D6A84B]/60 mb-3" />
          <h3 className="font-display text-sm font-bold text-[#F5F6F7] mb-2">ANALYST READY FOR QUERIES</h3>
          <p className="font-data text-xs text-[#626770] max-w-md">
            The AI Analyst answers questions strictly using real connector data and canonical records.
            Ask a question below to analyze your live Whop marketplace data.
          </p>
        </div>

        {/* Input Area */}
        <div className="shrink-0 bg-gradient-to-b from-[#17191E] to-[#121418] border border-white/10 rounded-xl p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {chips.map((chip, idx) => (
              <button 
                key={idx} 
                onClick={() => setQuery(chip)}
                className="bg-[#1C1F24] hover:bg-[#2A2E35] border border-white/10 rounded-full px-3 py-1.5 font-data text-xs text-[#A2A6AD] hover:text-[#F5F6F7] transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
          <div className="relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about live connector data..." 
              className="w-full bg-[#0A0B0D] border border-white/10 rounded-lg py-3 px-4 font-data text-sm text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]/50 transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] p-1.5 rounded-md transition-colors">
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </OptimiseShell>
  );
}
