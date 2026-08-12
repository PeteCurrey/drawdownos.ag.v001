'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Sliders, 
  Layers, 
  Play, 
  Clock, 
  CheckCircle2, 
  RefreshCw, 
  AlertTriangle,
  FileCheck,
  Globe
} from 'lucide-react';

export default function AutopilotFlowDiagram() {
  const [activeStage, setActiveStage] = useState<string>('EXECUTE');

  const stages = [
    { id: 'RSA', label: 'RSA OPPORTUNITY', icon: Globe, status: 'DONE', desc: 'Commercial surface gap detected' },
    { id: 'POLICY', label: 'POLICY ENGINE', icon: Sliders, status: 'DONE', desc: '10 policy rules & guardrails checked' },
    { id: 'COMPLIANCE', label: 'COMPLIANCE', icon: ShieldCheck, status: 'DONE', desc: 'Regulatory & disclaimer audit passed' },
    { id: 'PLANNER', label: 'ACTION PLANNER', icon: Layers, status: 'DONE', desc: 'Risk classification & dependency graph built' },
    { id: 'SAFE_EXEC', label: 'SAFE ACTION (CLASS A/B)', icon: Zap, status: 'ACTIVE', desc: 'Dry run passed → Executing API write' },
    { id: 'HUMAN_GATE', label: 'HUMAN GATE (CLASS C)', icon: Clock, status: 'WAITING', desc: 'Paused at approval queue for Pete' },
    { id: 'VERIFY', label: 'VERIFY STATE', icon: FileCheck, status: 'PENDING', desc: 'Post-write external state confirmation' },
    { id: 'RSA_RECALC', label: 'RSA RECALCULATE', icon: RefreshCw, status: 'PENDING', desc: 'Surface score & revenue capture updated' },
  ];

  return (
    <div className="industrial-panel p-5 space-y-4">
      
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#D6A84B]" />
          <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider uppercase">
            LIVE AUTOPILOT EXECUTION PIPELINE
          </h3>
        </div>
        <span className="text-[10px] font-data text-[#22C55E] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          ACTIVE STAGE: SAFE ACTION EXECUTION
        </span>
      </div>

      {/* SVG Pipeline Flow Diagram */}
      <div className="relative p-4 bg-[#0D0E11] rounded-xl border border-white/5 overflow-x-auto">
        <div className="min-w-[760px] space-y-6">
          
          {/* Top Row: Detection & Evaluation */}
          <div className="grid grid-cols-4 gap-3">
            {[stages[0], stages[1], stages[2], stages[3]].map((stg) => {
              const Icon = stg.icon;
              return (
                <div
                  key={stg.id}
                  onClick={() => setActiveStage(stg.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    stg.status === 'DONE'
                      ? 'bg-[#22C55E]/5 border-[#22C55E]/30 text-[#F5F6F7]'
                      : 'bg-white/3 border-white/10 text-[#A2A6AD]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-display text-[#626770]">{stg.id}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#F5F6F7]">
                    <Icon className="w-3.5 h-3.5 text-[#D6A84B]" />
                    {stg.label}
                  </div>
                  <div className="text-[9px] font-data text-[#626770] mt-1 truncate">{stg.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Connector Arrows Stream */}
          <div className="flex justify-around items-center text-[#D6A84B] font-data text-xs py-1">
            <span className="animate-pulse">↓</span>
            <span className="animate-pulse">↓</span>
            <span className="animate-pulse">↓</span>
            <span className="animate-pulse">↓</span>
          </div>

          {/* Middle Row: Parallel Branching (Safe Action vs Human Gate) */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Branch 1: Safe Autonomous Action */}
            <div
              onClick={() => setActiveStage('SAFE_EXEC')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                activeStage === 'SAFE_EXEC'
                  ? 'bg-[#22C55E]/10 border-[#22C55E] shadow-[0_0_16px_rgba(34,197,94,0.2)]'
                  : 'bg-[#121418] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-display px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">
                  CLASS A / B — SAFE AUTOMATION
                </span>
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              </div>
              <h4 className="text-xs font-bold text-[#F5F6F7] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#22C55E]" /> EXECUTE API WRITE
              </h4>
              <p className="text-[10px] font-data text-[#A2A6AD] mt-1">
                Dry run verified → Idempotency key attached → API write dispatched to certified connector
              </p>
            </div>

            {/* Branch 2: Human Gate */}
            <div
              onClick={() => setActiveStage('HUMAN_GATE')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                activeStage === 'HUMAN_GATE'
                  ? 'bg-[#FF6A18]/10 border-[#FF6A18] shadow-[0_0_16px_rgba(255,106,24,0.2)]'
                  : 'bg-[#121418] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-display px-2 py-0.5 rounded bg-[#FF6A18]/10 text-[#FF6A18] border border-[#FF6A18]/30">
                  CLASS C — HUMAN APPROVAL GATED
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FF6A18]" />
              </div>
              <h4 className="text-xs font-bold text-[#F5F6F7] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF6A18]" /> PAUSE AT APPROVAL QUEUE
              </h4>
              <p className="text-[10px] font-data text-[#A2A6AD] mt-1">
                Full submission pack generated → Paused for Pete's explicit approval before execution
              </p>
            </div>

          </div>

          {/* Bottom Row: Verification & Feedback Loop */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[stages[6], stages[7]].map((stg) => {
              const Icon = stg.icon;
              return (
                <div
                  key={stg.id}
                  onClick={() => setActiveStage(stg.id)}
                  className="p-3 rounded-lg border bg-[#0D0E11] border-white/10 text-[#A2A6AD] flex items-center justify-between hover:border-white/20 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#38BDF8]" />
                    <div>
                      <div className="text-xs font-bold text-[#F5F6F7]">{stg.label}</div>
                      <div className="text-[9px] font-data text-[#626770]">{stg.desc}</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-display px-2 py-0.5 rounded bg-white/5 text-[#626770]">
                    NEXT
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
}
