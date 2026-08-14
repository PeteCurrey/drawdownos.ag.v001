'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Loader2, CheckCircle2, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface IntegrationState {
  provider: string;
  configured: boolean;
  status: 'NOT_CONFIGURED' | 'CONFIGURED' | 'CONNECTED' | 'ERROR';
  lastVerifiedAt: string | null;
  error: string | null;
  metadata?: Record<string, unknown>;
}

const INTEGRATIONS = [
  { id: 'whop', name: 'Whop', description: 'Direct API marketplace integration', endpoint: '/api/integrations/whop/status', docsUrl: 'https://dev.whop.com', portalUrl: 'https://whop.com/dashboard', requiredKey: 'WHOP_API_KEY' },
  { id: 'digistore24', name: 'Digistore24', description: 'Direct API marketplace integration', endpoint: '/api/integrations/digistore24/status', docsUrl: 'https://www.digistore24.com', portalUrl: 'https://www.digistore24.com/vendor', requiredKey: 'DIGISTORE24_API_KEY' },
];

function StatusBadge({ status }: { status: IntegrationState['status'] }) {
  const map = {
    NOT_CONFIGURED: { label: 'Not configured', color: 'text-[#626770]', bg: 'bg-white/5 border-white/10' },
    CONFIGURED: { label: 'Configured', color: 'text-[#D6A84B]', bg: 'bg-[#D6A84B]/10 border-[#D6A84B]/30' },
    CONNECTED: { label: 'Connected', color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10 border-[#22C55E]/30' },
    ERROR: { label: 'Error', color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/10 border-[#EF4444]/30' },
  };
  const s = map[status];
  return (
    <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border ${s.color} ${s.bg} uppercase`}>
      {s.label}
    </span>
  );
}

export default function IntegrationsSettingsPage() {
  const [states, setStates] = useState<Record<string, IntegrationState | null>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  async function checkIntegration(id: string, endpoint: string) {
    setLoading(prev => ({ ...prev, [id]: true }));
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setStates(prev => ({ ...prev, [id]: data }));
    } catch {
      setStates(prev => ({ ...prev, [id]: { provider: id, configured: false, status: 'ERROR', lastVerifiedAt: null, error: 'Failed to reach status endpoint.' } }));
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }));
    }
  }

  useEffect(() => {
    INTEGRATIONS.forEach(i => checkIntegration(i.id, i.endpoint));
  }, []);

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <Link href="/settings" className="text-[#626770] hover:text-[#A2A6AD] transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-wider text-[#F5F6F7] uppercase">INTEGRATIONS</h1>
          <p className="text-sm text-[#A2A6AD] mt-0.5">API marketplace connections.</p>
        </div>
      </div>

      <div className="space-y-4">
        {INTEGRATIONS.map((integration) => {
          const state = states[integration.id];
          const isLoading = loading[integration.id];

          return (
            <div key={integration.id} className="industrial-panel p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-sm font-bold tracking-wider text-[#F5F6F7] uppercase">{integration.name}</h2>
                  <p className="text-xs text-[#626770] mt-0.5">{integration.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 text-[#626770] animate-spin" />
                  ) : state ? (
                    <StatusBadge status={state.status} />
                  ) : null}
                </div>
              </div>

              {state && !state.configured && (
                <div className="text-xs text-[#626770] bg-[#0D0E11] p-3 rounded font-mono">
                  Required: {integration.requiredKey}
                </div>
              )}

              {state && state.error && (
                <div className="text-xs text-[#EF4444] bg-[#EF4444]/5 border border-[#EF4444]/20 p-3 rounded">
                  {state.error}
                </div>
              )}

              {state && state.lastVerifiedAt && (
                <div className="text-xs text-[#626770]">
                  Last verified: {new Date(state.lastVerifiedAt).toLocaleString('en-GB')}
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => checkIntegration(integration.id, integration.endpoint)}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/10 hover:border-white/20 text-xs text-[#A2A6AD] hover:text-[#F5F6F7] transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                  TEST CONNECTION
                </button>
                <a
                  href={integration.portalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded border border-white/10 hover:border-white/20 text-xs text-[#626770] hover:text-[#A2A6AD] transition-all"
                >
                  OPEN PORTAL ↗
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-lg border border-[#D6A84B]/20 bg-[#D6A84B]/5">
        <p className="text-xs text-[#A2A6AD] leading-relaxed">
          <span className="text-[#D6A84B] font-bold">CONNECTED</span> is only shown after a real successful API call.
          Credentials are stored in server environment variables and are never sent to the browser.
        </p>
      </div>
    </div>
  );
}
