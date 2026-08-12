'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  ShieldCheck, 
  Target, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Pause, 
  RefreshCw, 
  ChevronRight,
  BarChart2,
  FileCheck,
  Radio,
  ExternalLink,
  Layers,
  ArrowUpRight,
  TrendingUp,
  AlertOctagon,
  Lock,
  Plus
} from 'lucide-react';
import AutopilotStatusBadge from '@/components/autopilot/AutopilotStatusBadge';
import AutopilotFlowDiagram from '@/components/autopilot/AutopilotFlowDiagram';
import { 
  DEMO_AUTOPILOT_ACTIONS, 
  DEMO_AUTOPILOT_PLANS, 
  DEMO_APPROVAL_ITEMS, 
  DEMO_AUTOPILOT_ACTIVITIES, 
  DEMO_DAILY_SUMMARY,
  DEMO_CIRCUIT_BREAKERS,
  DEFAULT_AUTOPILOT_POLICY,
  AutopilotStatus,
  AutopilotMode,
  AutopilotAction
} from '@/lib/autopilot-data';
import { PORTFOLIO_SURFACE_SUMMARY } from '@/lib/surface-area-data';

export default function AutopilotCommandPage() {
  const [status, setStatus] = useState<AutopilotStatus>('ASSISTED');
  const [mode, setMode] = useState<AutopilotMode>('ASSISTED');
  const [simulatingTarget, setSimulatingTarget] = useState(false);
  const [targetSuccess, setTargetSuccess] = useState(false);

  const plan = DEMO_AUTOPILOT_PLANS[0];
  const summary = DEMO_DAILY_SUMMARY;
  const S = PORTFOLIO_SURFACE_SUMMARY;
  const runningActions = DEMO_AUTOPILOT_ACTIONS.filter(a => a.status === 'RUNNING' || a.status === 'COMPLETE');
  const pendingApprovals = DEMO_APPROVAL_ITEMS.filter(a => a.status === 'PENDING');
  const blockedActions = DEMO_AUTOPILOT_ACTIONS.filter(a => a.status === 'BLOCKED' || a.status === 'FAILED');

  const handleSimulate70Target = () => {
    setSimulatingTarget(true);
    setTimeout(() => {
      setSimulatingTarget(false);
      setTargetSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* ── TOP BANNER CONTEXT HEADER ─────────────────── */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#17191E] via-[#121418] to-[#0D0E11] border border-white/10 shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-display text-2xl text-[#F5F6F7] font-bold tracking-wider">REVENUE SURFACE AUTOPILOT</h1>
              <span className="text-[10px] font-data px-2 py-0.5 rounded bg-[#D6A84B]/15 text-[#D6A84B] border border-[#D6A84B]/30">
                EXECUTION ENGINE
              </span>
              <span className="text-[10px] font-data px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                DISPATCHER ACTIVE
              </span>
            </div>
            <p className="text-xs text-[#A2A6AD] font-data mt-1.5 max-w-3xl leading-relaxed">
              Automated commercial execution layer. Automates repetitive, low-risk, reversible actions — and pauses for human approval at legal, compliance, financial or irreversible gates.
            </p>
          </div>

          {/* Autopilot Global Status Pill */}
          <AutopilotStatusBadge
            initialStatus={status}
            initialMode={mode}
            onStatusChange={(s) => setStatus(s)}
          />
        </div>

        {/* Headline Autopilot Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-5 pt-4 border-t border-white/10 font-data">
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">COMPLETED TODAY</div>
            <div className="text-xl font-bold text-[#22C55E] mt-0.5">{summary.actionsCompletedToday}</div>
            <div className="text-[9px] text-[#626770]">+3.9 RSA pts</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">AWAITING APPROVAL</div>
            <div className="text-xl font-bold text-[#FF6A18] mt-0.5">{pendingApprovals.length}</div>
            <div className="text-[9px] text-[#FF6A18]">Class B/C gates</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">POLICY BLOCKS</div>
            <div className="text-xl font-bold text-[#EF4444] mt-0.5">{summary.policyBlocksCount}</div>
            <div className="text-[9px] text-[#EF4444]">Min margin rule</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">CIRCUIT BREAKERS</div>
            <div className="text-xl font-bold text-[#D6A84B] mt-0.5">1 OPEN</div>
            <div className="text-[9px] text-[#D6A84B]">ClickBank connector</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">REVENUE AFFECTED</div>
            <div className="text-xl font-bold text-[#F5F6F7] mt-0.5">${summary.trackedRevenueAffectedUsd.toLocaleString()}</div>
            <div className="text-[9px] text-[#626770]">Tracked 24h</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">HOURS SAVED</div>
            <div className="text-xl font-bold text-[#38BDF8] mt-0.5">{summary.hoursSavedEstimate}h</div>
            <div className="text-[9px] text-[#626770]">Automated labour</div>
          </div>
        </div>
      </div>

      {/* ── TARGET-DRIVEN AUTOPILOT OBJECTIVE BANNER (§7) ────── */}
      <div className="industrial-panel p-5 space-y-4 border-l-4 border-l-[#D6A84B]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#D6A84B]" />
              <span className="font-display text-xs text-[#626770] uppercase tracking-wider">ACTIVE OBJECTIVE</span>
              <span className="text-[10px] font-data text-[#22C55E] px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30">
                IN PROGRESS
              </span>
            </div>
            <h2 className="font-display text-base font-bold text-[#F5F6F7] mt-1">{plan.objectiveLabel}</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulate70Target}
              disabled={simulatingTarget}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md transition-colors"
            >
              {simulatingTarget ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> SIMULATING PLAN...
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 fill-current" /> GET ME TO 70% RSA
                </>
              )}
            </button>
          </div>
        </div>

        {/* Target Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-data">
            <span className="text-[#A2A6AD]">Current RSA: <strong className="text-[#F5F6F7]">{plan.currentRsa}%</strong></span>
            <span className="text-[#D6A84B]">Projected RSA: <strong>{plan.projectedRsa}%</strong> (+22.7 pts)</span>
            <span className="text-[#22C55E]">Target: <strong>{plan.targetRsa}%</strong></span>
          </div>
          <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#38BDF8] via-[#D6A84B] to-[#22C55E]"
              style={{ width: `${plan.projectedRsa}%`, boxShadow: '0 0 10px rgba(214,168,75,0.4)', transition: 'width 0.8s ease' }}
            />
          </div>
        </div>

        {targetSuccess && (
          <div className="p-3 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 text-xs font-data text-[#22C55E] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span>Target Plan Built! 7 actions generated: 3 autonomous, 2 assisted, 2 human-gated. Projected RSA: 70.2%.</span>
            </div>
            <button onClick={() => setTargetSuccess(false)} className="text-[#626770] hover:text-[#F5F6F7]">✕</button>
          </div>
        )}
      </div>

      {/* ── LIVE AUTOPILOT EXECUTION PIPELINE (§9) ───────── */}
      <AutopilotFlowDiagram />

      {/* ── PRIMARY OPERATIONAL PANELS GRID (§8) ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Approvals & Running Actions (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Awaiting Human Approval Panel */}
          <div className="industrial-panel p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF6A18]" />
                <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider uppercase">
                  AWAITING HUMAN APPROVAL ({pendingApprovals.length})
                </h3>
              </div>
              <Link
                href="/autopilot/approvals"
                className="text-[10px] font-display text-[#D6A84B] hover:underline flex items-center gap-1"
              >
                OPEN APPROVAL QUEUE <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3 font-data text-xs">
              {pendingApprovals.map((appr) => (
                <div key={appr.id} className="p-3.5 bg-[#0D0E11] rounded-xl border border-white/5 space-y-2 hover:border-white/10 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#D6A84B]">{appr.publicationCanonicalId}</span>
                        <span className="text-[10px] text-[#626770]">{appr.marketplaceName}</span>
                        <span className={`text-[9px] font-display px-1.5 py-0.2 rounded border ${
                          appr.riskClass === 'CLASS_C' ? 'bg-[#FF6A18]/10 text-[#FF6A18] border-[#FF6A18]/30' : 'bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30'
                        }`}>
                          {appr.riskClass.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-[#F5F6F7] mt-1">{appr.actionSummary}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#22C55E]">+${appr.estimatedMonthlyUpliftUsd.toLocaleString()}/mo</div>
                      <div className="text-[9px] text-[#D6A84B]">+{appr.expectedSurfaceUnlock} pts RSA</div>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#A2A6AD] leading-relaxed line-clamp-2">{appr.whyAutopilotWantsThis}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px]">
                    <span className="text-[#22C55E] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Dry Run Passed
                    </span>
                    <Link
                      href="/autopilot/approvals"
                      className="px-3 py-1 rounded bg-[#D6A84B] text-[#0A0B0D] font-display font-bold hover:bg-[#e2b558] transition-colors"
                    >
                      REVIEW & APPROVE
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Running & Executed Actions Panel */}
          <div className="industrial-panel p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#22C55E]" />
                <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider uppercase">
                  AUTONOMOUS ACTIONS (TODAY)
                </h3>
              </div>
              <span className="text-[10px] font-data text-[#22C55E]">17 EXECUTED / 100% VERIFIED</span>
            </div>

            <div className="space-y-2.5 font-data text-xs">
              {runningActions.map((act) => (
                <div key={act.id} className="p-3 bg-[#0D0E11] rounded-lg border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#F5F6F7]">{act.actionType}</span>
                        <span className="text-[10px] text-[#626770]">• {act.marketplaceName}</span>
                      </div>
                      <div className="text-[10px] text-[#A2A6AD] mt-0.5">{act.description}</div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[9px] font-display px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">
                      {act.status}
                    </span>
                    <div className="text-[9px] text-[#626770] mt-0.5">+{act.expectedSurfaceUnlock} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Policy Blocks, Circuit Breakers & Activity Ticker (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Policy Blocks & Circuit Breakers Panel */}
          <div className="industrial-panel p-5 space-y-4 border-l-2 border-l-[#EF4444]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider uppercase">
                  POLICY BLOCKS & CIRCUIT BREAKERS
                </h3>
              </div>
              <Link href="/settings/autopilot" className="text-[10px] font-display text-[#D6A84B] hover:underline">
                CONFIG
              </Link>
            </div>

            <div className="space-y-3 font-data text-xs">
              {DEMO_CIRCUIT_BREAKERS.map((cb) => (
                <div key={cb.id} className={`p-3 rounded-lg border space-y-1 ${
                  cb.state === 'OPEN' ? 'bg-[#EF4444]/10 border-[#EF4444]/30' : 'bg-[#0D0E11] border-white/5'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#F5F6F7]">{cb.marketplaceName}</span>
                    <span className={`text-[9px] font-display px-2 py-0.5 rounded ${
                      cb.state === 'OPEN' ? 'bg-[#EF4444] text-white' : 'bg-[#22C55E]/10 text-[#22C55E]'
                    }`}>
                      CIRCUIT {cb.state}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#A2A6AD]">{cb.reason}</p>
                </div>
              ))}

              {blockedActions.map((act) => (
                <div key={act.id} className="p-3 bg-[#0D0E11] rounded-lg border border-[#EF4444]/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#EF4444]">{act.canonicalId} • {act.actionType}</span>
                    <span className="text-[9px] font-display px-1.5 py-0.2 rounded bg-[#EF4444]/10 text-[#EF4444]">
                      {act.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#A2A6AD]">{act.policyBlockReason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Autopilot Activity Feed (§10) */}
          <div className="industrial-panel p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#D6A84B]" />
                <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider uppercase">
                  LIVE AUTOPILOT ACTIVITY FEED
                </h3>
              </div>
              <span className="text-[10px] font-data text-[#626770]">REAL-TIME AUDIT LOG</span>
            </div>

            <div className="space-y-2.5 font-data text-xs max-h-[340px] overflow-y-auto pr-1">
              {DEMO_AUTOPILOT_ACTIVITIES.map((ev) => (
                <div key={ev.id} className="p-2.5 bg-[#0D0E11] rounded-lg border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#D6A84B]">{ev.timestamp} • {ev.marketplaceName}</span>
                    <span className="text-[9px] font-display px-1.5 py-0.2 rounded bg-white/5 text-[#626770]">
                      {ev.riskClass}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A2A6AD] leading-relaxed">{ev.message}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
