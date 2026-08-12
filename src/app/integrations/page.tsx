'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Server, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Plus, 
  ExternalLink, 
  ChevronRight, 
  Zap, 
  Clock, 
  AlertTriangle, 
  RefreshCw,
  FileCode,
  Radio,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { CONNECTOR_MANIFESTS_REGISTRY, CONNECTOR_TELEMETRY_DATA } from '@/lib/connectors/registry';
import { CONNECTOR_CERTIFICATIONS } from '@/lib/autopilot-data';

export default function IntegrationsPage() {
  const telemetry = CONNECTOR_TELEMETRY_DATA;
  const manifests = Object.values(CONNECTOR_MANIFESTS_REGISTRY);

  const healthyCount = telemetry.filter(t => t.healthStatus === 'HEALTHY').length;
  const certifiedCount = telemetry.filter(t => t.autopilotState === 'CERTIFIED').length;
  const avgLatency = Math.round(telemetry.reduce((s, t) => s + t.apiLatencyMs, 0) / telemetry.length);

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Banner Context Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#17191E] via-[#121418] to-[#0D0E11] border border-white/10 shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-display text-2xl text-[#F5F6F7] font-bold tracking-wider">MARKETPLACE CONNECTOR FACTORY</h1>
              <span className="text-[10px] font-data px-2 py-0.5 rounded bg-[#D6A84B]/15 text-[#D6A84B] border border-[#D6A84B]/30">
                SDK v1.0 CERTIFIED
              </span>
              <span className="text-[10px] font-data px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                17 CONNECTORS REGISTERED
              </span>
            </div>
            <p className="text-xs text-[#A2A6AD] font-data mt-1.5 max-w-3xl leading-relaxed">
              Standard integration engine. Reusable connector SDK, machine-readable manifests, field mapping transformations, contract test harness, and action-level Autopilot certification.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/integrations/factory/new"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> BUILD NEW CONNECTOR
            </Link>
          </div>
        </div>

        {/* Industrial Telemetry Counters Bar (§51) */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-5 pt-4 border-t border-white/10 font-data">
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">REGISTERED CONNECTORS</div>
            <div className="text-xl font-bold text-[#F5F6F7] mt-0.5">17</div>
            <div className="text-[9px] text-[#626770]">11 direct, 3 aggregator</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">HEALTHY CONNECTORS</div>
            <div className="text-xl font-bold text-[#22C55E] mt-0.5">{healthyCount} / {telemetry.length}</div>
            <div className="text-[9px] text-[#22C55E]">98.4% uptime avg</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">AUTOPILOT CERTIFIED</div>
            <div className="text-xl font-bold text-[#D6A84B] mt-0.5">{certifiedCount}</div>
            <div className="text-[9px] text-[#D6A84B]">Action-level verified</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">AVG API LATENCY</div>
            <div className="text-xl font-bold text-[#38BDF8] mt-0.5">{avgLatency}ms</div>
            <div className="text-[9px] text-[#38BDF8]">Optimal latency</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">WEBHOOK HEALTH</div>
            <div className="text-xl font-bold text-[#22C55E] mt-0.5">99.2%</div>
            <div className="text-[9px] text-[#626770]">4 events processed today</div>
          </div>
          <div className="p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="text-[9px] font-display text-[#626770]">OPEN CIRCUITS</div>
            <div className="text-xl font-bold text-[#EF4444] mt-0.5">1 OPEN</div>
            <div className="text-[9px] text-[#EF4444]">ClickBank connector</div>
          </div>
        </div>
      </div>

      {/* Quick Access Navigation Toolbar */}
      <div className="flex flex-wrap items-center gap-2 bg-[#121418] p-1.5 rounded-xl border border-white/10">
        {[
          { name: 'CONNECTOR LIBRARY', href: '/integrations/library', icon: Layers },
          { name: 'FIELD MAPPING STUDIO', href: '/integrations/connectors/ch-whop/mapping', icon: Sliders },
          { name: 'WEBHOOK INSPECTOR', href: '/integrations/webhooks', icon: Radio },
          { name: 'TELEMETRY OPERATIONS', href: '/integrations/operations', icon: Activity },
          { name: 'BUILD WIZARD', href: '/integrations/factory/new', icon: Plus },
        ].map(nav => {
          const Icon = nav.icon;
          return (
            <Link
              key={nav.name}
              href={nav.href}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-display text-[#A2A6AD] hover:text-[#D6A84B] hover:bg-white/5 transition-all"
            >
              <Icon className="w-3.5 h-3.5 text-[#626770]" />
              {nav.name}
            </Link>
          );
        })}
      </div>

      {/* ── LIVE CONNECTOR TELEMETRY CARDS (§51) ────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xs text-[#626770] tracking-wider uppercase">
            LIVE CONNECTOR TELEMETRY & HEALTH (§51)
          </h2>
          <Link href="/integrations/library" className="text-[10px] font-display text-[#D6A84B] hover:underline flex items-center gap-1">
            VIEW ALL 17 MANIFESTS <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {telemetry.map(t => (
            <div key={t.connectorId} className="industrial-panel p-5 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#F5F6F7]">{t.name}</h3>
                    <span className="text-[10px] font-data text-[#626770]">{t.connectorId}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-display ${
                    t.healthStatus === 'HEALTHY' ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30' : 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30'
                  }`}>
                    {t.healthStatus}
                  </span>
                </div>

                <div className="space-y-2 font-data text-xs text-[#A2A6AD]">
                  <div className="flex justify-between p-2 bg-[#0D0E11] rounded">
                    <span>API Latency:</span>
                    <span className="text-[#F5F6F7] font-bold">{t.apiLatencyMs}ms</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#0D0E11] rounded">
                    <span>Success Rate:</span>
                    <span className="text-[#22C55E] font-bold">{t.successRatePct}%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#0D0E11] rounded">
                    <span>Circuit Breaker:</span>
                    <span className={`font-bold ${t.circuitBreakerState === 'OPEN' ? 'text-[#EF4444]' : 'text-[#22C55E]'}`}>
                      {t.circuitBreakerState}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className={`text-[9px] font-display px-2 py-0.5 rounded border ${
                  t.autopilotState === 'CERTIFIED' ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30' : 'bg-[#FF6A18]/10 text-[#FF6A18] border-[#FF6A18]/30'
                }`}>
                  AUTOPILOT: {t.autopilotState}
                </span>

                <Link
                  href={`/integrations/connectors/${t.connectorId}`}
                  className="text-xs font-display text-[#38BDF8] hover:underline flex items-center gap-1"
                >
                  INSPECT <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── REGISTERED MANIFESTS SUMMARY TABLE (§3) ─────── */}
      <div className="industrial-panel p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[#D6A84B]" />
            <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider uppercase">
              REGISTERED CONNECTOR MANIFESTS ({manifests.length})
            </h3>
          </div>
          <Link href="/integrations/library" className="text-[10px] font-display text-[#D6A84B] hover:underline">
            FULL MATRIX
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-data text-xs">
            <thead className="bg-[#17191E] border-b border-white/10 font-display text-[10px] text-[#626770]">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">NAME</th>
                <th className="p-3">CATEGORY</th>
                <th className="p-3">AUTH TYPE</th>
                <th className="p-3">VERSION</th>
                <th className="p-3">RATE LIMIT</th>
                <th className="p-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {manifests.map(m => (
                <tr key={m.id} className="hover:bg-[#17191E] transition-colors">
                  <td className="p-3 font-bold text-[#D6A84B]">{m.id}</td>
                  <td className="p-3 font-bold text-[#F5F6F7]">{m.name}</td>
                  <td className="p-3">
                    <span className="text-[9px] font-display px-2 py-0.5 rounded bg-white/5 text-[#A2A6AD]">
                      {m.category}
                    </span>
                  </td>
                  <td className="p-3 text-[#A2A6AD]">{m.authType}</td>
                  <td className="p-3 text-[#626770]">{m.versionInfo.connectorVersion} ({m.versionInfo.apiVersion})</td>
                  <td className="p-3 text-[#626770]">{m.rateLimits.requestsPerSecond} req/s</td>
                  <td className="p-3 text-right space-x-2">
                    <Link
                      href={`/integrations/connectors/${m.id}/mapping`}
                      className="text-[10px] font-display text-[#D6A84B] hover:underline"
                    >
                      MAPPINGS
                    </Link>
                    <Link
                      href={`/integrations/connectors/${m.id}`}
                      className="text-[10px] font-display text-[#38BDF8] hover:underline"
                    >
                      COMMAND
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
