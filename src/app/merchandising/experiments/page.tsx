'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FlaskConical, ChevronRight, CheckCircle2, AlertTriangle, Play,
  Plus, BarChart3, TrendingUp, ShieldCheck, HelpCircle
} from 'lucide-react';

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
            { label: 'ACTIVE TESTS', value: '-', color: '#626770' },
            { label: 'COMPLETED TESTS', value: '-', color: '#626770' },
            { label: 'PRIMARY GOAL METRIC', value: 'NET REVENUE CONTRIBUTION', color: '#22C55E' },
            { label: 'GUARDRAIL METRICS', value: 'REFUNDS, COMPLIANCE, MARGIN', color: '#818CF8' },
          ].map(s => (
            <div key={s.label} className="industrial-panel bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-1">
              <div className="text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="text-base font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Experiment Cards */}
        <div className="space-y-4">
          <div className="font-display text-xs tracking-wider text-[#626770]">ACTIVE & COMPLETED EXPERIMENTS</div>
          <div className="industrial-panel p-16 flex flex-col items-center justify-center text-center space-y-4 border border-white/8 rounded-xl bg-[#0E1014]">
            <AlertTriangle className="w-10 h-10 text-[#D6A84B]" />
            <div className="font-display text-sm tracking-wider text-[#F5F6F7]">NO EXPERIMENTS VERIFIED</div>
            <div className="font-data text-xs text-[#626770] max-w-lg">
              Drawdown OS cannot prove the existence of any active or historical experiments.
              A verified connection to an experimentation platform or analytics database is required.
            </div>
            <div className="font-display text-[10px] text-[#D6A84B] px-4 py-2 border border-[#D6A84B]/30 bg-[#D6A84B]/10 rounded-lg">
              CONNECT EXPERIMENTATION PLATFORM
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
