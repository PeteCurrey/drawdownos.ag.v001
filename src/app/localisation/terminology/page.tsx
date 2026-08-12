'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen, ChevronRight, Search, Plus, Languages, ShieldCheck,
  CheckCircle2, AlertTriangle, Lock
} from 'lucide-react';
import { DRAWDOWN_TERM_BASE, TRANSLATION_MEMORY } from '@/lib/localisation/demo-localisation-data';

export default function TerminologyStudio() {
  const [activeTab, setActiveTab] = useState<string>('ALL TERMS');

  const tabs = ['ALL TERMS', 'APPROVED', 'NEEDS REVIEW', 'LOCKED', 'CONFLICTS'];

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/localisation" className="hover:text-[#A2A6AD]">GLOBAL LOCALISATION ENGINE</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">DRAWDOWN TERM BASE & TM</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">DRAWDOWN TERM BASE & TRANSLATION MEMORY STUDIO</h1>
            </div>
          </div>
          <Link href="/localisation" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO COMMAND CENTRE
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 font-data text-xs">
          {[
            { label: 'TERM BASE ENTRIES', value: DRAWDOWN_TERM_BASE.length, color: '#D6A84B' },
            { label: 'TRANSLATION MEMORY', value: TRANSLATION_MEMORY.length, color: '#22C55E' },
            { label: 'LOCKED BRAND TERMS', value: DRAWDOWN_TERM_BASE.filter(t => t.classification === 'LOCKED').length, color: '#818CF8' },
            { label: 'TERMINOLOGY CONFLICTS', value: '0', color: '#22C55E' },
          ].map(s => (
            <div key={s.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-1">
              <div className="text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center justify-between gap-4 bg-[#0E1014] border border-white/8 rounded-xl p-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-3 py-1.5 rounded-lg font-display text-[10px] tracking-wider transition-all whitespace-nowrap ${activeTab === t ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30' : 'text-[#626770] hover:text-[#A2A6AD]'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" /> ADD NEW TERM
          </button>
        </div>

        {/* Term Base Grid */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden font-data text-xs space-y-3 p-4">
          <div className="font-display text-xs tracking-wider text-[#626770] pb-2 border-b border-white/5">
            DRAWDOWN TERM BASE & REGIONAL TRANSLATIONS
          </div>
          <div className="divide-y divide-white/5">
            {DRAWDOWN_TERM_BASE.map(tb => (
              <div key={tb.id} className="py-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-bold text-[#F5F6F7]">{tb.termEn}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded border border-white/10 text-[#818CF8]">{tb.category}</span>
                    {tb.classification === 'LOCKED' && (
                      <span className="text-[9px] text-[#D6A84B] font-bold bg-[#D6A84B]/10 px-2 py-0.5 rounded border border-[#D6A84B]/30 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> BRAND LOCKED
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#626770]">{tb.id}</span>
                </div>
                <div className="text-[10px] text-[#626770] italic">{tb.definition}</div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[10px] pt-1">
                  <div className="bg-[#121418] p-2 rounded border border-white/5">
                    <span className="text-[#626770]">de-DE: </span>
                    <strong className="text-[#22C55E]">{tb.translations['de-DE']?.preferred}</strong>
                  </div>
                  <div className="bg-[#121418] p-2 rounded border border-white/5">
                    <span className="text-[#626770]">es-ES: </span>
                    <strong className="text-[#22C55E]">{tb.translations['es-ES']?.preferred}</strong>
                  </div>
                  <div className="bg-[#121418] p-2 rounded border border-white/5">
                    <span className="text-[#626770]">pt-BR: </span>
                    <strong className="text-[#22C55E]">{tb.translations['pt-BR']?.preferred}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
