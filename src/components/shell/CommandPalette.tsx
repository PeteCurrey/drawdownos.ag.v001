'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, BookOpen, Sliders, DollarSign, Users, Megaphone, FileCheck, CheckCircle2, X } from 'lucide-react';
import { DEMO_PUBLICATIONS_CATALOG, DEMO_MARKETPLACE_CANDIDATES } from '@/lib/demo-data';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery('');
          // logic handled by header state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPublications = DEMO_PUBLICATIONS_CATALOG.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.canonicalId.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCandidates = DEMO_MARKETPLACE_CANDIDATES.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.country.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (url: string) => {
    router.push(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div 
        className="w-full max-w-2xl bg-[#121418] border border-white/15 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-white/10 bg-[#17191E]">
          <Search className="w-4 h-4 text-[#D6A84B] mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search titles, SKUs, ISBNs, channels, orders, compliance..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#F5F6F7] placeholder-[#626770] focus:outline-none font-data"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded text-[#626770] hover:text-[#F5F6F7] hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          
          {/* Publications Section */}
          <div>
            <div className="px-3 py-1 text-[10px] font-display text-[#626770] tracking-wider uppercase">
              Publications & SKUs
            </div>
            {filteredPublications.map(pub => (
              <button
                key={pub.id}
                onClick={() => handleSelect(`/catalog/${pub.canonicalId}`)}
                className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#1C1F24] group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-[#1C1F24] border border-white/10 flex items-center justify-center text-[#D6A84B]">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#F5F6F7] group-hover:text-[#D6A84B] flex items-center gap-2">
                      <span>{pub.title}</span>
                      <span className="font-data text-[10px] text-[#D6A84B] px-1.5 py-0.2 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/20">
                        {pub.canonicalId}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#A2A6AD] font-data">
                      {pub.category} • {pub.formatCount} Formats • {pub.liveMarketplaces} Channels
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-data text-[#626770] group-hover:text-[#F5F6F7]">Open Detail →</span>
              </button>
            ))}
          </div>

          {/* Marketplace Candidates Section */}
          <div>
            <div className="px-3 py-1 text-[10px] font-display text-[#626770] tracking-wider uppercase">
              Marketplaces & Discovery
            </div>
            {filteredCandidates.map(m => (
              <button
                key={m.id}
                onClick={() => handleSelect('/intelligence')}
                className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#1C1F24] group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-[#1C1F24] border border-white/10 flex items-center justify-center text-[#38BDF8]">
                    <Sliders className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#F5F6F7] group-hover:text-[#38BDF8]">
                      {m.name} ({m.country})
                    </div>
                    <div className="text-[10px] text-[#A2A6AD] font-data">
                      Est. Value: {m.monthlyEstValue} • Score: {m.opportunityScore}/100
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-data text-[#D6A84B]">Radar Opportunity</span>
              </button>
            ))}
          </div>

          {/* Direct Navigation Shortcuts */}
          <div>
            <div className="px-3 py-1 text-[10px] font-display text-[#626770] tracking-wider uppercase">
              System Shortcuts
            </div>
            <div className="grid grid-cols-2 gap-1 p-1">
              <button 
                onClick={() => handleSelect('/revenue')}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#17191E] hover:bg-[#1C1F24] text-xs text-[#A2A6AD] hover:text-[#F5F6F7]"
              >
                <DollarSign className="w-3.5 h-3.5 text-[#22C55E]" /> Revenue Engine
              </button>
              <button 
                onClick={() => handleSelect('/compliance')}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#17191E] hover:bg-[#1C1F24] text-xs text-[#A2A6AD] hover:text-[#F5F6F7]"
              >
                <FileCheck className="w-3.5 h-3.5 text-[#FF6A18]" /> Compliance Rules
              </button>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-white/10 bg-[#0D0E11] flex items-center justify-between text-[10px] font-data text-[#626770]">
          <span>Navigate with ↑ ↓ • Press ESC to exit</span>
          <span>DRAWDOWN OS SEARCH ENGINE</span>
        </div>

      </div>
    </div>
  );
}
