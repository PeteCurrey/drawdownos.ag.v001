'use client';

import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Clock, 
  AlertTriangle, 
  FileText, 
  DollarSign, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Layers,
  ArrowRight,
  Edit3,
  HelpCircle
} from 'lucide-react';
import { AutopilotApprovalItem } from '@/lib/autopilot-data';

interface ApprovalCardProps {
  item: AutopilotApprovalItem;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDefer: (id: string) => void;
}

export default function ApprovalCard({
  item,
  onApprove,
  onReject,
  onDefer,
}: ApprovalCardProps) {
  const [showDryRunDetails, setShowDryRunDetails] = useState(false);
  const [actionState, setActionState] = useState<'PENDING' | 'APPROVED' | 'REJECTED' | 'DEFERRED'>(item.status);

  const handleApprove = () => {
    setActionState('APPROVED');
    onApprove(item.id);
  };

  const handleReject = () => {
    setActionState('REJECTED');
    onReject(item.id);
  };

  const handleDefer = () => {
    setActionState('DEFERRED');
    onDefer(item.id);
  };

  return (
    <div className={`industrial-panel p-5 space-y-4 border-l-4 transition-all ${
      actionState === 'APPROVED' ? 'border-l-[#22C55E] opacity-75' :
      actionState === 'REJECTED' ? 'border-l-[#EF4444] opacity-50' :
      actionState === 'DEFERRED' ? 'border-l-[#38BDF8]' :
      item.riskClass === 'CLASS_C' ? 'border-l-[#FF6A18]' : 'border-l-[#D6A84B]'
    }`}>
      
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-data text-xs font-bold text-[#D6A84B]">{item.publicationCanonicalId}</span>
            <span className="text-xs text-[#A2A6AD] font-data">• {item.publicationTitle}</span>
            <span className={`text-[9px] font-display px-2 py-0.5 rounded border ${
              item.riskClass === 'CLASS_C' ? 'bg-[#FF6A18]/10 text-[#FF6A18] border-[#FF6A18]/30' : 'bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30'
            }`}>
              {item.riskClass.replace('_', ' ')}
            </span>
            <span className="text-[9px] font-display px-2 py-0.5 rounded bg-white/5 text-[#626770]">
              CONFIDENCE: {item.confidenceScore}%
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#F5F6F7] mt-1">{item.actionSummary}</h3>
        </div>

        {/* Impact Badges */}
        <div className="text-right shrink-0">
          <div className="text-base font-data font-bold text-[#22C55E]">
            +${item.estimatedMonthlyUpliftUsd.toLocaleString()}/mo
          </div>
          <div className="text-[10px] font-data text-[#D6A84B]">
            +{item.expectedSurfaceUnlock} pts RSA unlock
          </div>
        </div>
      </div>

      {/* Why Autopilot Wants To Do This (Stored Reasoning) */}
      <div className="p-3 bg-[#0D0E11] rounded-lg border border-white/5 space-y-1 font-data text-xs">
        <div className="flex items-center gap-1.5 text-[10px] font-display text-[#D6A84B]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>WHY AUTOPILOT RECOMMENDS THIS ACTION</span>
        </div>
        <p className="text-[#A2A6AD] leading-relaxed">{item.whyAutopilotWantsThis}</p>
      </div>

      {/* Dependencies Checklist */}
      <div className="flex flex-wrap gap-2 text-[10px] font-data">
        <span className="text-[#626770] font-display self-center">DEPENDENCIES:</span>
        {item.dependencies.map((dep, idx) => (
          <span key={idx} className="px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> {dep}
          </span>
        ))}
      </div>

      {/* Copy Snippet Preview */}
      {item.copySnippet && (
        <div className="p-2.5 bg-[#0D0E11] rounded border border-white/5 font-data text-xs space-y-1">
          <span className="text-[9px] font-display text-[#626770]">MARKETPLACE LISTING COPY PREVIEW</span>
          <p className="text-[#F5F6F7] italic">"{item.copySnippet}"</p>
        </div>
      )}

      {/* Dry Run Inspector Toggle */}
      <div className="pt-2 border-t border-white/5">
        <button
          onClick={() => setShowDryRunDetails(!showDryRunDetails)}
          className="flex items-center gap-1.5 text-xs font-display text-[#38BDF8] hover:underline"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>DRY RUN RESULT INSPECTOR ({item.dryRunSummary.diffs.length} fields)</span>
          {showDryRunDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {showDryRunDetails && (
          <div className="mt-3 p-3 bg-[#0D0E11] rounded-lg border border-white/10 space-y-3 font-data text-xs">
            <div className="flex items-center justify-between text-[10px] font-display text-[#626770]">
              <span>FIELD NAME</span>
              <span>EXISTING VALUE → PROPOSED VALUE</span>
              <span>POLICY CHECK</span>
            </div>

            <div className="divide-y divide-white/5">
              {item.dryRunSummary.diffs.map((diff, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between gap-3 text-xs">
                  <span className="font-bold text-[#F5F6F7] min-w-[120px]">{diff.fieldName}</span>
                  <div className="flex items-center gap-2 text-[#A2A6AD] flex-1">
                    <span className="line-through text-[#626770]">{diff.existingValue}</span>
                    <ArrowRight className="w-3 h-3 text-[#D6A84B]" />
                    <span className="text-[#22C55E] font-bold">{diff.proposedValue}</span>
                  </div>
                  <span className="text-[10px] font-display px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">
                    {diff.policyCheck}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-[#A2A6AD]">
              <span>API Latency: {item.dryRunSummary.estimatedApiLatencyMs}ms</span>
              <span>Distribution Collision: NONE</span>
              <span className="text-[#22C55E] font-bold">DRY RUN PASSED</span>
            </div>
          </div>
        )}
      </div>

      {/* Decision Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
        
        <div className="text-[10px] font-data text-[#626770]">
          Created {item.createdAt} • Awaiting Superadmin Decision
        </div>

        <div className="flex items-center gap-2">
          {actionState === 'PENDING' ? (
            <>
              <button
                onClick={handleDefer}
                className="px-3 py-1.5 rounded-lg bg-[#1C1F24] hover:bg-white/10 text-[#A2A6AD] hover:text-[#F5F6F7] font-display text-xs font-bold transition-colors border border-white/10"
              >
                DEFER
              </button>

              <button
                onClick={handleReject}
                className="px-3 py-1.5 rounded-lg bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-[#EF4444] font-display text-xs font-bold transition-colors border border-[#EF4444]/30"
              >
                REJECT
              </button>

              <button
                onClick={handleApprove}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#22C55E] hover:bg-[#20b054] text-[#0A0B0D] font-display text-xs font-bold shadow-md transition-colors"
              >
                <Check className="w-4 h-4 stroke-[3]" /> APPROVE & EXECUTE
              </button>
            </>
          ) : (
            <span className={`px-3 py-1.5 rounded-lg font-display text-xs font-bold border ${
              actionState === 'APPROVED' ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30' :
              actionState === 'REJECTED' ? 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30' : 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30'
            }`}>
              {actionState === 'APPROVED' ? '✓ APPROVED & QUEUED' : actionState}
            </span>
          )}
        </div>

      </div>

    </div>
  );
}
