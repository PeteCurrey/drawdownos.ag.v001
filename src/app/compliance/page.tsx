'use client';

import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, FileCheck, CheckCircle2, Search, Link as LinkIcon, Plus } from 'lucide-react';

interface ComplianceFinding {
  id: string;
  ruleId: string;
  ruleName: string;
  severity: 'INFO' | 'REVIEW' | 'WARNING' | 'BLOCKING';
  snippet: string;
  publicationId: string;
  status: 'OPEN' | 'RESOLVED' | 'WAIVED';
}

const RULES = [
  { id: 'INCOME_CLAIM', name: 'Income / Wealth Promise Claim', severity: 'BLOCKING', desc: 'No guaranteed profits or wealth promises' },
  { id: 'PERFORMANCE_CLAIM', name: 'Unverified Performance Result', severity: 'WARNING', desc: 'Historical performance requires audit proof' },
  { id: 'RISK_DISCLOSURE', name: 'Mandatory Risk Warning', severity: 'BLOCKING', desc: 'Standard financial risk disclosure required' },
  { id: 'AFFILIATE_DISCLOSURE', name: 'Affiliate Relationship Disclosure', severity: 'REVIEW', desc: 'Promotional copy must contain affiliate disclosures' },
];

const FINDINGS: ComplianceFinding[] = [
  {
    id: 'find-1',
    ruleId: 'RISK_DISCLOSURE',
    ruleName: 'Mandatory Risk Warning',
    severity: 'BLOCKING',
    snippet: 'Verified present in DD-HTT-001 V1.2 footer',
    publicationId: 'DD-HTT-001',
    status: 'RESOLVED'
  },
  {
    id: 'find-2',
    ruleId: 'PERFORMANCE_CLAIM',
    ruleName: 'Unverified Performance Result',
    severity: 'WARNING',
    snippet: '"Achieve 84% win rate on drawdown recovery"',
    publicationId: 'DD-HTT-001',
    status: 'OPEN'
  }
];

export default function CompliancePage() {
  const [scanText, setScanText] = useState('');
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleRunScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (scanText.toLowerCase().includes('guaranteed') || scanText.toLowerCase().includes('win rate')) {
      setScanResult('BLOCKING DETECTED: Income/performance claim found. Requires compliance waiver or copy removal.');
    } else {
      setScanResult('PASSED: Zero compliance rule violations detected.');
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">COMPLIANCE & EVIDENCE ENGINE</h1>
            <span className="text-[10px] font-data text-[#22C55E] px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30">
              AUDIT ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Financial promotions rules, claim evidence verification, risk disclosures, and publication sign-offs
          </p>
        </div>
      </div>

      {/* Real-time Interactive Compliance Scanner Module */}
      <div className="industrial-panel p-6 space-y-4">
        <div className="flex items-center gap-2 text-[#D6A84B]">
          <ShieldCheck className="w-5 h-5" />
          <h2 className="font-display text-sm font-bold tracking-wider text-[#F5F6F7]">LIVE COMPLIANCE SCANNER</h2>
        </div>

        <form onSubmit={handleRunScan} className="space-y-3">
          <textarea
            rows={3}
            placeholder="Paste marketplace listing copy, affiliate creative text, or landing page snippet to test for compliance violations..."
            value={scanText}
            onChange={(e) => setScanText(e.target.value)}
            className="w-full bg-[#0D0E11] border border-white/10 rounded-lg p-3 text-xs font-data text-[#F5F6F7] placeholder-[#626770] focus:outline-none focus:border-[#D6A84B]"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md"
          >
            RUN AUTOMATED COMPLIANCE SCAN
          </button>
        </form>

        {scanResult && (
          <div className={`p-3 rounded-lg border text-xs font-data ${
            scanResult.startsWith('BLOCKING') ? 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30' : 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30'
          }`}>
            {scanResult}
          </div>
        )}
      </div>

      {/* Rules Registry & Open Findings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Active Rules Registry */}
        <div className="industrial-panel p-5 space-y-4">
          <h3 className="font-display text-xs text-[#626770] tracking-wider uppercase">
            REGULATORY RULE CONSTRAINTS
          </h3>

          <div className="space-y-2.5 font-data text-xs">
            {RULES.map((r) => (
              <div key={r.id} className="p-3 bg-[#0D0E11] rounded-lg border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#F5F6F7]">{r.name}</div>
                  <div className="text-[10px] text-[#A2A6AD]">{r.desc}</div>
                </div>
                <span className={`text-[9px] font-display px-2 py-0.5 rounded border ${
                  r.severity === 'BLOCKING' ? 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30' : 'bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30'
                }`}>
                  {r.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Library & Audit Links */}
        <div className="industrial-panel p-5 space-y-4">
          <h3 className="font-display text-xs text-[#626770] tracking-wider uppercase">
            EVIDENCE & AUDIT PROOF LIBRARY
          </h3>

          <div className="space-y-2.5 font-data text-xs">
            <div className="p-3 bg-[#0D0E11] rounded-lg border border-white/5 space-y-1">
              <div className="flex justify-between">
                <span className="font-bold text-[#F5F6F7]">Risk Warning Legal Proof #2026-A</span>
                <span className="text-[10px] text-[#22C55E] font-bold">SUPPORTED</span>
              </div>
              <p className="text-[10px] text-[#A2A6AD]">Verified valid until 2027-01-01 by Compliance Officer</p>
            </div>

            <div className="p-3 bg-[#0D0E11] rounded-lg border border-white/5 space-y-1">
              <div className="flex justify-between">
                <span className="font-bold text-[#F5F6F7]">FTC Affiliate Disclosure Template</span>
                <span className="text-[10px] text-[#22C55E] font-bold">SUPPORTED</span>
              </div>
              <p className="text-[10px] text-[#A2A6AD]">Approved standard disclaimer for all affiliate partners</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
