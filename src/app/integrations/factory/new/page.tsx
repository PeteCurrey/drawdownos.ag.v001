'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  ArrowLeft, 
  Check, 
  Sliders, 
  ShieldCheck, 
  Key, 
  FileCode, 
  Radio, 
  Activity, 
  CheckCircle2, 
  ChevronRight,
  Layers,
  Server
} from 'lucide-react';

const STEPS = [
  '1. Platform Info',
  '2. Category',
  '3. Documentation',
  '4. Auth Framework',
  '5. Resources',
  '6. Capabilities',
  '7. Field Mappings',
  '8. Actions',
  '9. Webhooks',
  '10. Rate Limits',
  '11. Errors',
  '12. Contract Tests',
  '13. Certification',
  '14. Deploy Scaffold',
];

export default function NewConnectorWizardPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [platformName, setPlatformName] = useState('');
  const [category, setCategory] = useState('DIRECT_API');
  const [authType, setAuthType] = useState('OAUTH_2');
  const [isScaffoldGenerated, setIsScaffoldGenerated] = useState(false);

  const handleNext = () => {
    if (currentStep < 14) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsScaffoldGenerated(true);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/integrations" className="text-[#626770] hover:text-[#F5F6F7] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">14-STEP CONNECTOR SCAFFOLD BUILDER WIZARD (§37)</h1>
            <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              STEP {currentStep} OF 14
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Build machine-readable manifests, standard capability sets, and generated TypeScript SDK scaffolds (§37, §39).
          </p>
        </div>
      </div>

      {/* Steps Indicator Bar */}
      <div className="flex items-center gap-1 overflow-x-auto p-2 bg-[#121418] rounded-xl border border-white/10 font-data text-[10px]">
        {STEPS.map((st, idx) => {
          const stepNum = idx + 1;
          const isActive = currentStep === stepNum;
          const isDone = currentStep > stepNum;
          return (
            <button
              key={st}
              onClick={() => setCurrentStep(stepNum)}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all border ${
                isActive ? 'bg-[#D6A84B] text-[#0A0B0D] border-[#D6A84B] font-bold shadow-md' :
                isDone ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30' : 'text-[#626770] border-white/5'
              }`}
            >
              {st}
            </button>
          );
        })}
      </div>

      {/* Step Form Content */}
      <div className="industrial-panel p-6 space-y-6">
        
        {currentStep === 1 && (
          <div className="space-y-4 font-data text-xs max-w-xl">
            <h2 className="font-display text-sm font-bold text-[#F5F6F7]">STEP 1: PLATFORM IDENTIFICATION</h2>
            <div className="space-y-2">
              <label className="text-[10px] font-display text-[#626770]">MARKETPLACE PLATFORM NAME</label>
              <input
                type="text"
                placeholder="e.g. Gumroad / Lemon Squeezy / Teachable"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full bg-[#0D0E11] border border-white/10 rounded-lg p-3 text-xs text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 font-data text-xs">
            <h2 className="font-display text-sm font-bold text-[#F5F6F7]">STEP 2: CLASSIFY CONNECTOR CATEGORY (§2)</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(['DIRECT_API', 'OAUTH_API', 'API_KEY', 'AGGREGATOR', 'HYBRID', 'MANUAL_PORTAL', 'REPORT_IMPORT'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`p-3 rounded-lg border text-left font-display text-xs transition-all ${
                    category === c ? 'bg-[#1C1F24] border-[#D6A84B] text-[#D6A84B]' : 'bg-[#0D0E11] border-white/5 text-[#A2A6AD]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep > 2 && currentStep < 14 && (
          <div className="space-y-4 font-data text-xs">
            <h2 className="font-display text-sm font-bold text-[#F5F6F7]">{STEPS[currentStep - 1]}</h2>
            <p className="text-[#A2A6AD]">Configuring schema, field mappings, capabilities and contract tests for {platformName || 'New Connector'}.</p>
          </div>
        )}

        {currentStep === 14 && (
          <div className="space-y-4 font-data text-xs">
            <h2 className="font-display text-sm font-bold text-[#F5F6F7]">STEP 14: GENERATE TYPED CODE SCAFFOLD (§39)</h2>
            {isScaffoldGenerated ? (
              <div className="p-4 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl space-y-2 text-[#22C55E]">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                  Scaffold Generated at `/src/lib/connectors/${platformName.toLowerCase().replace(/ /g, '-') || 'new-connector'}/`
                </div>
                <pre className="p-3 bg-[#0D0E11] rounded text-xs text-[#D6A84B] overflow-x-auto">
                  manifest.ts · adapter.ts · auth.ts · mappings.ts · errors.ts · contract-tests.ts
                </pre>
              </div>
            ) : (
              <p className="text-[#A2A6AD]">Click below to generate typed TypeScript SDK scaffold files.</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-lg bg-[#1C1F24] text-[#A2A6AD] hover:text-[#F5F6F7] font-display text-xs font-bold disabled:opacity-50"
          >
            PREVIOUS STEP
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md"
          >
            {currentStep === 14 ? (isScaffoldGenerated ? 'COMPLETE' : 'GENERATE CODE SCAFFOLD') : 'NEXT STEP →'}
          </button>
        </div>

      </div>

    </div>
  );
}
