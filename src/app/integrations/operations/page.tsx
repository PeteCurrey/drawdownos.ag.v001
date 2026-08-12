'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ArrowLeft, Radio, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';
import { CONNECTOR_TELEMETRY_DATA } from '@/lib/connectors/registry';

export default function ConnectorOperationsPage() {
  const telemetry = CONNECTOR_TELEMETRY_DATA;

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/integrations" className="text-[#626770] hover:text-[#F5F6F7] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">LIVE CONNECTOR TELEMETRY & OPERATIONS (§52)</h1>
            <span className="text-[10px] font-data text-[#22C55E] px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30">
              OPERATIONS ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Real-time connector API latency, error rates, circuit breakers, rate limits, and webhook traffic (§51, §52).
          </p>
        </div>
      </div>

      {/* Live Operations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-data text-xs">
        {telemetry.map(t => (
          <div key={t.connectorId} className="industrial-panel p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#F5F6F7]">{t.name}</span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-display ${
                t.healthStatus === 'HEALTHY' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#EF4444]/10 text-[#EF4444]'
              }`}>
                {t.healthStatus}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-[#0D0E11] rounded">
                <span>API Latency:</span>
                <span className="text-[#38BDF8] font-bold">{t.apiLatencyMs}ms</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0D0E11] rounded">
                <span>Rate Limit Used:</span>
                <span className="text-[#D6A84B] font-bold">{t.rateLimitUsedPct}%</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0D0E11] rounded">
                <span>Circuit Breaker:</span>
                <span className={`font-bold ${t.circuitBreakerState === 'OPEN' ? 'text-[#EF4444]' : 'text-[#22C55E]'}`}>
                  {t.circuitBreakerState}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
