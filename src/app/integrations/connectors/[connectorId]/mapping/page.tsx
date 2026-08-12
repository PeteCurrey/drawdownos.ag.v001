'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Sliders, 
  ArrowLeft, 
  Check, 
  Play, 
  ArrowRight, 
  FileCode, 
  AlertTriangle, 
  CheckCircle2,
  Plus,
  Trash2
} from 'lucide-react';
import { CONNECTOR_MANIFESTS_REGISTRY } from '@/lib/connectors/registry';
import { FieldMapping, TransformRule } from '@/lib/connectors/types';
import { runLiveMappingTest, LiveMappingTestResult } from '@/lib/connectors/field-mapper';

export default function VisualMappingStudioPage() {
  const params = useParams();
  const connectorId = (params?.connectorId as string) || 'ch-whop';
  const manifest = CONNECTOR_MANIFESTS_REGISTRY[connectorId] || CONNECTOR_MANIFESTS_REGISTRY['ch-whop'];

  const [mappings, setMappings] = useState<FieldMapping[]>(manifest.fieldMappings.length > 0 ? manifest.fieldMappings : [
    { drawdownField: 'canonical.title', targetField: 'name', transformRule: 'DIRECT', isRequired: true, sampleValue: 'HOW TO TRADE' },
    { drawdownField: 'canonical.long_description', targetField: 'description', transformRule: 'STRIP_HTML', isRequired: true, sampleValue: '<p>Institutional risk playbook</p>' },
    { drawdownField: 'territorial_price.USD', targetField: 'initial_price', transformRule: 'CURRENCY_CONVERT', isRequired: true, sampleValue: '99.00' },
  ]);

  const [testResult, setTestResult] = useState<LiveMappingTestResult | null>(null);

  const samplePublicationInput = {
    'canonical.title': 'HOW TO TRADE — Institutional Risk & Price Action Playbook',
    'canonical.long_description': '<p>The definitive guide to institutional drawdown management and price action matrix mechanics.</p>',
    'territorial_price.USD': 99.00,
    'territorial_price.GBP': 79.00,
    'bisac_codes': ['BUS036000', 'BUS027000'],
  };

  const handleRunTest = () => {
    const res = runLiveMappingTest(connectorId, mappings, samplePublicationInput);
    setTestResult(res);
  };

  const handleTransformChange = (index: number, rule: TransformRule) => {
    const updated = [...mappings];
    updated[index].transformRule = rule;
    setMappings(updated);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href={`/integrations/connectors/${connectorId}`} className="text-[#626770] hover:text-[#F5F6F7] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">VISUAL FIELD MAPPING & TRANSFORMER STUDIO</h1>
            <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              {manifest.name}
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Map canonical Drawdown domain fields to marketplace API targets and test real-time transformations (§8, §9, §10).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunTest}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md transition-colors"
          >
            <Play className="w-4 h-4 fill-current" /> RUN LIVE MAPPING TEST
          </button>
        </div>
      </div>

      {/* ── VISUAL FIELD MAPPING TABLE (§10) ───────────── */}
      <div className="industrial-panel p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="font-display text-xs text-[#F5F6F7] tracking-wider uppercase">
            CANONICAL FIELD TRANSFORMATION MATRIX ({mappings.length} FIELDS)
          </h2>
        </div>

        <div className="space-y-3 font-data text-xs">
          {mappings.map((map, idx) => (
            <div key={idx} className="p-4 bg-[#0D0E11] rounded-xl border border-white/5 flex flex-wrap items-center justify-between gap-4 hover:border-white/10 transition-all">
              
              {/* Drawdown Source Field */}
              <div className="w-full sm:w-1/3">
                <span className="text-[9px] font-display text-[#626770] block">DRAWDOWN FIELD</span>
                <span className="font-bold text-[#D6A84B]">{map.drawdownField}</span>
                {map.isRequired && <span className="ml-2 text-[9px] font-display px-1.5 py-0.2 rounded bg-[#EF4444]/10 text-[#EF4444]">REQUIRED</span>}
              </div>

              {/* Transformation Selector */}
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-[#626770] hidden sm:block" />
                <select
                  value={map.transformRule}
                  onChange={(e) => handleTransformChange(idx, e.target.value as TransformRule)}
                  className="bg-[#17191E] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]"
                >
                  <option value="DIRECT">DIRECT PASS</option>
                  <option value="TRUNCATE">TRUNCATE (140 CHARS)</option>
                  <option value="STRIP_HTML">STRIP HTML</option>
                  <option value="SLUGIFY">SLUGIFY</option>
                  <option value="CURRENCY_CONVERT">CURRENCY CONVERT</option>
                  <option value="UPPERCASE">UPPERCASE</option>
                  <option value="LOWERCASE">LOWERCASE</option>
                </select>
                <ArrowRight className="w-4 h-4 text-[#626770] hidden sm:block" />
              </div>

              {/* Target Marketplace Field */}
              <div className="w-full sm:w-1/3 text-right">
                <span className="text-[9px] font-display text-[#626770] block">TARGET FIELD ({manifest.name})</span>
                <span className="font-bold text-[#22C55E]">{map.targetField}</span>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ── LIVE TRANSFORMER TEST PREVIEW (§10) ─────────── */}
      {testResult && (
        <div className="industrial-panel p-5 space-y-4 border-l-4 border-l-[#22C55E]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider uppercase">
              LIVE TRANSFORMER TEST RESULT
            </h3>
            <span className="text-xs font-data font-bold text-[#22C55E]">
              Readiness Score: {testResult.readinessReport.overallReadinessScore}%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-data text-xs">
            <div>
              <span className="text-[9px] font-display text-[#626770] block mb-1">INPUT CANONICAL PAYLOAD</span>
              <pre className="p-3 bg-[#0D0E11] rounded-lg border border-white/10 text-[#A2A6AD] overflow-x-auto">
                {JSON.stringify(testResult.inputPayload, null, 2)}
              </pre>
            </div>

            <div>
              <span className="text-[9px] font-display text-[#22C55E] block mb-1">TRANSFORMED MARKETPLACE OUTPUT PAYLOAD</span>
              <pre className="p-3 bg-[#0D0E11] rounded-lg border border-[#22C55E]/30 text-[#22C55E] overflow-x-auto">
                {JSON.stringify(testResult.outputPayload, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
