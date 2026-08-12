'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FlaskConical, ChevronRight, CheckCircle2, AlertTriangle, Play,
  Plus, BarChart3, TrendingUp, ShieldCheck, HelpCircle
} from 'lucide-react';
import { MERCHANDISING_EXPERIMENTS } from '@/lib/merchandising/demo-merchandising-data';

function statusColor(status: string): string {
  const map: Record<string, string> = {
    RUNNING: '#D6A84B', COMPLETED: '#22C55E', DRAFT: '#6B7280', CANCELLED: '#EF4444', INCONCLUSIVE: '#F97316'
  };
  return map[status] ?? '#6B7280';
}

export default function ExperimentStudio() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/merchandising" className="hover:text-[#A2A6AD]">MERCHANDISING ENGINE</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">EXPERIMENT STUDIO</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#818CF8]/30 flex items-center justify-center">
                <FlaskConical className="w-4 h-4 text-[#818CF8]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">MERCHANDISING EXPERIMENT STUDIO</h1>
            </div>
          </div>
          <Link href="/merchandising" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO COMMAND CENTRE
          </Link>
        </div>

        {/* Header Stats */}
        <div className="grid grid-cols-4 gap-3 font-data text-xs">
          {[
            { label: 'ACTIVE TESTS', value: MERCHANDISING_EXPERIMENTS.filter(e => e.status === 'RUNNING').length, color: '#D6A84B' },
            { label: 'COMPLETED TESTS', value: MERCHANDISING_EXPERIMENTS.filter(e => e.status === 'COMPLETED').length, color: '#22C55E' },
            { label: 'PRIMARY GOAL METRIC', value: 'NET REVENUE CONTRIBUTION', color: '#22C55E' },
            { label: 'GUARDRAIL METRICS', value: 'REFUNDS, COMPLIANCE, MARGIN', color: '#818CF8' },
          ].map(s => (
            <div key={s.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-1">
              <div className="text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="text-base font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Experiment Cards */}
        <div className="space-y-4">
          <div className="font-display text-xs tracking-wider text-[#626770]">ACTIVE & COMPLETED EXPERIMENTS</div>
          {MERCHANDISING_EXPERIMENTS.map(exp => (
            <div key={exp.id} className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-3 font-data text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-base font-bold text-[#F5F6F7]">{exp.experimentName}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded border" style={{ color: statusColor(exp.status), borderColor: `${statusColor(exp.status)}30`, backgroundColor: `${statusColor(exp.status)}10` }}>
                      {exp.status}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded border border-white/10 text-[#818CF8]">{exp.testType}</span>
                  </div>
                  <div className="text-[10px] text-[#626770] mt-0.5">Marketplace: {exp.marketplaceName} · Product: {exp.productName} ({exp.productSku})</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-[#626770]">CONFIDENCE</div>
                  <div className="text-xs font-bold text-[#22C55E]">{exp.confidenceLevel}</div>
                </div>
              </div>

              <div className="bg-[#121418] p-3 rounded-lg border border-white/5 space-y-1">
                <div className="text-[9px] text-[#D6A84B] font-bold">HYPOTHESIS</div>
                <div className="text-[#A2A6AD] italic">&ldquo;{exp.hypothesis}&rdquo;</div>
              </div>

              {/* Control vs Variant */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#121418] p-3 rounded-lg border border-white/5 space-y-1">
                  <div className="text-[9px] text-[#626770] font-bold">CONTROL VARIANT</div>
                  <div className="text-[#F5F6F7]">{exp.controlVariant.label}</div>
                  <div className="text-[10px] text-[#626770]">{exp.controlVariant.details}</div>
                </div>
                <div className={`p-3 rounded-lg border space-y-1 ${exp.winnerVariant === 'VARIANT' ? 'bg-[#22C55E]/5 border-[#22C55E]/30' : 'bg-[#121418] border-white/5'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-[#D6A84B] font-bold">TEST VARIANT</span>
                    {exp.winnerVariant === 'VARIANT' && <span className="text-[9px] text-[#22C55E] font-bold">WINNER</span>}
                  </div>
                  <div className="text-[#F5F6F7]">{exp.testVariant.label}</div>
                  <div className="text-[10px] text-[#626770]">{exp.testVariant.details}</div>
                </div>
              </div>

              {exp.decisionReason && (
                <div className="bg-[#22C55E]/5 border border-[#22C55E]/20 p-3 rounded-lg text-[10px] text-[#22C55E] flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs">DECISION REASONING:</strong>
                    {exp.decisionReason}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
