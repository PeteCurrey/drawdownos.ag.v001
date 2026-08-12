'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Server, 
  Layers, 
  ShieldCheck, 
  Sliders, 
  Key, 
  FileCode, 
  Radio, 
  Activity, 
  Play, 
  RefreshCw, 
  ExternalLink, 
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FileText
} from 'lucide-react';
import { CONNECTOR_MANIFESTS_REGISTRY, CONNECTOR_TELEMETRY_DATA } from '@/lib/connectors/registry';
import { MockMarketplaceConnector, FullContractTestReport } from '@/lib/connectors/mock-connector';

type ConnectorTab = 
  | 'overview' 
  | 'capabilities' 
  | 'account' 
  | 'auth' 
  | 'actions' 
  | 'webhooks' 
  | 'ratelimits' 
  | 'testing' 
  | 'certification' 
  | 'documentation';

export default function ConnectorDetailPage() {
  const params = useParams();
  const connectorId = (params?.connectorId as string) || 'ch-whop';
  
  const manifest = CONNECTOR_MANIFESTS_REGISTRY[connectorId] || CONNECTOR_MANIFESTS_REGISTRY['ch-whop'];
  const telemetry = CONNECTOR_TELEMETRY_DATA.find(t => t.connectorId === connectorId) || CONNECTOR_TELEMETRY_DATA[0];

  const [activeTab, setActiveTab] = useState<ConnectorTab>('overview');
  const [runningTest, setRunningTest] = useState(false);
  const [testReport, setTestReport] = useState<FullContractTestReport | null>(null);

  const handleRunContractSuite = async () => {
    setRunningTest(true);
    const runner = new MockMarketplaceConnector(manifest.id);
    const report = await runner.runFullContractTestSuite();
    setTestReport(report);
    setRunningTest(false);
  };

  const tabs: { id: ConnectorTab; label: string; icon: React.ElementType }[] = [
    { id: 'overview',       label: 'OVERVIEW',       icon: Server },
    { id: 'capabilities',   label: 'CAPABILITIES',   icon: ShieldCheck },
    { id: 'account',        label: 'ACCOUNT & ENV',  icon: Layers },
    { id: 'auth',           label: 'AUTH & SCOPES',  icon: Key },
    { id: 'actions',        label: 'ACTIONS TESTBED',icon: Play },
    { id: 'webhooks',       label: 'WEBHOOKS',       icon: Radio },
    { id: 'ratelimits',     label: 'RATE LIMITS',    icon: Activity },
    { id: 'testing',        label: 'CONTRACT SUITE', icon: RefreshCw },
    { id: 'certification',  label: 'CERTIFICATION',  icon: ShieldCheck },
    { id: 'documentation',  label: 'MANIFEST JSON',  icon: FileCode },
  ];

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Banner Context Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#17191E] via-[#121418] to-[#0D0E11] border border-white/10 shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <Link href="/integrations" className="text-[#626770] hover:text-[#F5F6F7] transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="font-display text-2xl text-[#F5F6F7] font-bold tracking-wider">{manifest.name}</h1>
              <span className="text-[10px] font-data px-2 py-0.5 rounded bg-[#D6A84B]/15 text-[#D6A84B] border border-[#D6A84B]/30">
                {manifest.id}
              </span>
              <span className="text-[10px] font-data px-2 py-0.5 rounded bg-white/5 text-[#A2A6AD]">
                {manifest.category}
              </span>
            </div>
            <p className="text-xs text-[#A2A6AD] font-data mt-1.5 flex items-center gap-2">
              Official Docs: <a href={manifest.officialDocsUrl} target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline flex items-center gap-1">{manifest.officialDocsUrl} <ExternalLink className="w-3 h-3" /></a>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/integrations/connectors/${manifest.id}/mapping`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md transition-colors"
            >
              <Sliders className="w-4 h-4 stroke-[3]" /> FIELD MAPPING STUDIO
            </Link>
          </div>
        </div>

        {/* Quick Connector Stat Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5 pt-4 border-t border-white/10 font-data">
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">HEALTH SCORE</div>
            <div className="text-xl font-bold text-[#22C55E] mt-0.5">{telemetry.healthScore}%</div>
            <div className="text-[9px] text-[#22C55E]">{telemetry.healthStatus}</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">API LATENCY</div>
            <div className="text-xl font-bold text-[#38BDF8] mt-0.5">{telemetry.apiLatencyMs}ms</div>
            <div className="text-[9px] text-[#626770]">Response time</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">SDK VERSION</div>
            <div className="text-xl font-bold text-[#F5F6F7] mt-0.5">{manifest.versionInfo.connectorVersion}</div>
            <div className="text-[9px] text-[#626770]">API {manifest.versionInfo.apiVersion}</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">AUTOPILOT STATE</div>
            <div className="text-xl font-bold text-[#22C55E] mt-0.5">{telemetry.autopilotState}</div>
            <div className="text-[9px] text-[#22C55E]">Action-level verified</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">CIRCUIT BREAKER</div>
            <div className="text-xl font-bold text-[#22C55E] mt-0.5">{telemetry.circuitBreakerState}</div>
            <div className="text-[9px] text-[#22C55E]">0 errors / 24h</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-1 bg-[#121418] p-1 rounded-xl border border-white/10 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-display whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30 shadow-md'
                  : 'text-[#A2A6AD] hover:text-[#F5F6F7] hover:bg-white/5'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? 'text-[#D6A84B]' : 'text-[#626770]'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 space-y-4">
            <div className="industrial-panel p-5 space-y-4">
              <h3 className="font-display text-xs text-[#626770] tracking-wider uppercase">CONNECTOR SUMMARY</h3>
              <div className="space-y-3 font-data text-xs text-[#A2A6AD]">
                <div className="flex justify-between p-3 bg-[#0D0E11] rounded-lg">
                  <span>Connector ID:</span>
                  <span className="text-[#F5F6F7] font-bold">{manifest.id}</span>
                </div>
                <div className="flex justify-between p-3 bg-[#0D0E11] rounded-lg">
                  <span>Authentication Method:</span>
                  <span className="text-[#D6A84B] font-bold">{manifest.authType}</span>
                </div>
                <div className="flex justify-between p-3 bg-[#0D0E11] rounded-lg">
                  <span>Category Classification:</span>
                  <span className="text-[#F5F6F7]">{manifest.category}</span>
                </div>
                <div className="flex justify-between p-3 bg-[#0D0E11] rounded-lg">
                  <span>Rate Limit Ceiling:</span>
                  <span className="text-[#22C55E] font-bold">{manifest.rateLimits.requestsPerSecond} req/s ({manifest.rateLimits.requestsPerMinute} req/min)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="industrial-panel p-5 space-y-4">
              <h3 className="font-display text-xs text-[#626770] tracking-wider uppercase">FIELD MAPPING SUMMARY</h3>
              <p className="text-xs text-[#A2A6AD] font-data">
                {manifest.fieldMappings.length} canonical field mappings configured for {manifest.name}.
              </p>
              <Link
                href={`/integrations/connectors/${manifest.id}/mapping`}
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#D6A84B]/10 hover:bg-[#D6A84B]/20 text-[#D6A84B] font-display text-xs font-bold border border-[#D6A84B]/30 transition-colors"
              >
                OPEN VISUAL FIELD MAPPING STUDIO →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CAPABILITIES */}
      {activeTab === 'capabilities' && (
        <div className="industrial-panel p-5 space-y-4">
          <h3 className="font-display text-xs text-[#626770] tracking-wider uppercase">VERIFIED CAPABILITY MATRIX & EVIDENCE (§5, §6)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-data text-xs">
            {Object.entries(manifest.capabilities).map(([capKey, capStatus]) => (
              <div key={capKey} className="p-3 bg-[#0D0E11] rounded-lg border border-white/5 flex items-center justify-between">
                <span className="text-[#F5F6F7] font-bold">{capKey}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-display border ${
                  capStatus === 'SUPPORTED' ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30' : 'bg-white/5 text-[#626770]'
                }`}>
                  {capStatus}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: TESTING & CONTRACT SUITE (§42, §65, §66) */}
      {activeTab === 'testing' && (
        <div className="industrial-panel p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider uppercase">CONTRACT TEST SUITE HARNESS</h3>
            <button
              onClick={handleRunContractSuite}
              disabled={runningTest}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${runningTest ? 'animate-spin' : ''}`} />
              RUN CONTRACT TEST SUITE
            </button>
          </div>

          {testReport && (
            <div className="space-y-4 font-data text-xs">
              <div className="p-4 bg-[#0D0E11] rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-[#F5F6F7]">{testReport.passedCount} / {testReport.totalTests} Contract Tests Passed</span>
                  <div className="text-[10px] text-[#A2A6AD] mt-0.5">Execution Timestamp: {testReport.timestamp}</div>
                </div>
                <span className={`px-3 py-1 rounded font-display text-xs font-bold border ${
                  testReport.autopilotCertificationStatus === 'CERTIFIED' ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30' : 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30'
                }`}>
                  AUTOPILOT: {testReport.autopilotCertificationStatus}
                </span>
              </div>

              <div className="space-y-2">
                {testReport.testResults.map((tr, idx) => (
                  <div key={idx} className="p-3 bg-[#0D0E11] rounded-lg border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                      <span className="font-bold text-[#F5F6F7]">{tr.testName}</span>
                      <span className="text-[10px] text-[#626770]">({tr.category})</span>
                    </div>
                    <span className="text-[10px] text-[#22C55E]">{tr.message} ({tr.durationMs}ms)</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 12: DOCUMENTATION & MANIFEST JSON (§3, §67) */}
      {activeTab === 'documentation' && (
        <div className="industrial-panel p-5 space-y-4">
          <h3 className="font-display text-xs text-[#626770] tracking-wider uppercase">CANONICAL MANIFEST JSON CONTRACT (§3)</h3>
          <pre className="p-4 bg-[#0D0E11] rounded-xl border border-white/10 text-xs font-data text-[#D6A84B] overflow-x-auto">
            {JSON.stringify(manifest, null, 2)}
          </pre>
        </div>
      )}

    </div>
  );
}
