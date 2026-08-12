'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ExecutiveShell from '@/components/executive/ExecutiveShell';


export default function BriefingsPage() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');

  const formatCurrency = (val: number) => `£${val.toLocaleString()}`;

  return (
    <ExecutiveShell currentPath={pathname}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        
        {/* Tab Navigation */}
        <div className="flex gap-1 border-b border-white/10 pb-4">
          <button 
            onClick={() => setActiveTab('weekly')}
            className={`px-4 py-2 text-sm font-display rounded-t transition-colors ${
              activeTab === 'weekly' ? 'text-[#D6A84B] border-b-2 border-[#D6A84B] bg-white/5' : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            WEEKLY REVIEW
          </button>
          <button 
            onClick={() => setActiveTab('monthly')}
            className={`px-4 py-2 text-sm font-display rounded-t transition-colors ${
              activeTab === 'monthly' ? 'text-[#D6A84B] border-b-2 border-[#D6A84B] bg-white/5' : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            MONTHLY BOARD REPORT
          </button>
        </div>

        {activeTab === 'weekly' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <header>
              <h1 className="text-2xl font-display text-white">WEEKLY EXECUTIVE REVIEW</h1>
              <p className="text-white/50 font-data text-sm">W32 2026 (5–12 August)</p>
            </header>

            <div className="industrial-panel p-6 text-center border-dashed border-2 border-white/10">
              <h3 className="text-[#D6A84B] font-display text-sm font-bold mb-2">NO DATA CONNECTED</h3>
              <p className="text-[#A2A6AD] text-sm">This module requires an active database connection or platform integration to display real data. Fake data is prohibited.</p>
            </div>
          </div>
        )}
      </div>
    </ExecutiveShell>
  );
}
