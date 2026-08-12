'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  CheckCircle2, 
  Filter, 
  Layers, 
  ShieldCheck, 
  Check, 
  X, 
  AlertTriangle, 
  ArrowLeft,
  DollarSign
} from 'lucide-react';
import ApprovalCard from '@/components/autopilot/ApprovalCard';
import { DEMO_APPROVAL_ITEMS, AutopilotApprovalItem, RiskClass } from '@/lib/autopilot-data';

export default function ApprovalsPage() {
  const [items, setItems] = useState<AutopilotApprovalItem[]>(DEMO_APPROVAL_ITEMS);
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('PENDING');

  const pendingItems = items.filter(i => i.status === 'PENDING');
  const totalUplift = pendingItems.reduce((sum, i) => sum + i.estimatedMonthlyUpliftUsd, 0);
  const totalUnlock = pendingItems.reduce((sum, i) => sum + i.expectedSurfaceUnlock, 0);

  const filteredItems = items.filter(i => {
    const matchesStatus = statusFilter === 'ALL' || i.status === statusFilter;
    const matchesRisk = riskFilter === 'ALL' || i.riskClass === riskFilter;
    return matchesStatus && matchesRisk;
  });

  const handleApprove = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'APPROVED' as const } : item));
  };

  const handleReject = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'REJECTED' as const } : item));
  };

  const handleDefer = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'DEFERRED' as const } : item));
  };

  const handleBulkApproveClassB = () => {
    if (confirm('BULK APPROVE: Approve all pending Class B actions? Legal & Class C actions will remain in queue.')) {
      setItems(prev => prev.map(item => (item.status === 'PENDING' && item.riskClass === 'CLASS_B') ? { ...item, status: 'APPROVED' as const } : item));
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/autopilot" className="text-[#626770] hover:text-[#F5F6F7] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">HUMAN APPROVAL QUEUE</h1>
            <span className="text-[10px] font-data text-[#FF6A18] px-2 py-0.5 rounded bg-[#FF6A18]/10 border border-[#FF6A18]/30">
              {pendingItems.length} PENDING GATES
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Autopilot prepares everything automatically and pauses at human gates. Review dry runs, impact, copy and compliance before execution.
          </p>
        </div>

        {/* Quick Summary Strip */}
        <div className="flex items-center gap-4 text-xs font-data">
          <div className="text-right">
            <div className="text-[9px] font-display text-[#626770]">TOTAL MONTHLY UPLIFT</div>
            <div className="font-bold text-[#22C55E] text-base">+${totalUplift.toLocaleString()}/mo</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-right">
            <div className="text-[9px] font-display text-[#626770]">TOTAL SURFACE UNLOCK</div>
            <div className="font-bold text-[#D6A84B] text-base">+{totalUnlock.toFixed(1)} pts RSA</div>
          </div>
          {pendingItems.some(i => i.riskClass === 'CLASS_B') && (
            <button
              onClick={handleBulkApproveClassB}
              className="px-3 py-2 rounded-lg bg-[#22C55E]/10 hover:bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30 font-display text-xs font-bold transition-colors"
            >
              BULK APPROVE SAFE CLASS B
            </button>
          )}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#121418] rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#626770]" />
          <span className="text-[10px] font-display text-[#626770] tracking-wider">STATUS:</span>
          {(['PENDING', 'APPROVED', 'REJECTED', 'DEFERRED', 'ALL'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-lg text-xs font-display transition-all border ${
                statusFilter === s
                  ? 'bg-[#D6A84B] text-[#0A0B0D] border-[#D6A84B] font-bold shadow-md'
                  : 'text-[#A2A6AD] border-white/10 hover:border-white/20'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-display text-[#626770] tracking-wider">RISK CLASS:</span>
          {(['ALL', 'CLASS_B', 'CLASS_C'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRiskFilter(r)}
              className={`px-2.5 py-1 rounded text-[10px] font-display transition-all border ${
                riskFilter === r
                  ? 'bg-[#1C1F24] text-[#D6A84B] border-[#D6A84B]/40'
                  : 'text-[#A2A6AD] border-white/10 hover:border-white/20'
              }`}
            >
              {r.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Approval List */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="industrial-panel p-12 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#22C55E] mx-auto" />
            <h3 className="font-display text-base font-bold text-[#F5F6F7]">No Pending Approvals</h3>
            <p className="text-xs text-[#A2A6AD] font-data max-w-md mx-auto">
              All human gates have been cleared or reviewed. Autopilot is monitoring connected channels for new opportunities.
            </p>
          </div>
        ) : (
          filteredItems.map(item => (
            <ApprovalCard
              key={item.id}
              item={item}
              onApprove={handleApprove}
              onReject={handleReject}
              onDefer={handleDefer}
            />
          ))
        )}
      </div>

    </div>
  );
}
