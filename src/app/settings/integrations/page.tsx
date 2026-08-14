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
    NOT_CONFIGURED: { label: 'Not configured', color: 'text-[#6B7280]', bg: 'bg-gray-100 border-gray-200' },
    CONFIGURED:    { label: 'Configured',     color: 'text-[#1E3A5F]', bg: 'bg-[#1E3A5F]/10 border-[#1E3A5F]/20' },
    CONNECTED:     { label: 'Connected',      color: 'text-[#166534]', bg: 'bg-green-50 border-green-200' },
    ERROR:         { label: 'Error',          color: 'text-[#B91C1C]', bg: 'bg-red-50 border-red-200' },
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
    <div className="space-y-6 pb-16">
      <div className="flex items-center gap-3 border-b border-black/8 pb-4">
        <Link href="/settings" className="text-[#6B7280] hover:text-[#3D4452] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-xl text-[#0D0F12] font-bold tracking-wider">INTEGRATION SETTINGS</h1>
          <p className="text-xs text-[#6B7280] font-mono mt-0.5">Live API connection status for Whop and Digistore24</p>
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
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-[#0D0F12]">{integration.name}</h2>
                    {state && <StatusBadge status={state.status} />}
                    {isLoading && <Loader2 className="w-3.5 h-3.5 text-[#6B7280] animate-spin" />}
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1">{integration.description}</p>
                </div>
                <button
                  onClick={() => checkIntegration(integration.id, integration.endpoint)}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-black/10 text-xs font-mono text-[#3D4452] hover:bg-[#F4F5F7] disabled:opacity-50 transition-colors"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                  TEST CONNECTION
                </button>
              </div>

              {state && (
                <div className="space-y-2 font-mono text-xs">
                  {state.error && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-[#B91C1C]">
                      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      {state.error}
                    </div>
                  )}
                  {state.status === 'CONNECTED' && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-[#166534]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      Live API connection verified.
                    </div>
                  )}
                  {state.metadata && Object.keys(state.metadata).length > 0 && (
                    <div className="p-3 bg-[#F4F5F7] rounded-lg space-y-1 text-[11px]">
                      {Object.entries(state.metadata).map(([k, v]) => (
                        <div key={k} className="flex gap-2">
                          <span className="text-[#6B7280] min-w-32">{k}:</span>
                          <span className="text-[#0D0F12]">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-3 pt-2 border-t border-black/6 text-xs font-mono">
                <div className="p-2 bg-[#F4F5F7] rounded flex-1">
                  <span className="text-[#6B7280]">Required env var: </span>
                  <code className="text-[#1E3A5F] font-bold">{integration.requiredKey}</code>
                  <span className="text-[#9CA3AF]"> in .env.local</span>
                </div>
                <a href={integration.portalUrl} target="_blank" rel="noreferrer" className="text-[#1E3A5F] hover:underline">DASHBOARD ↗</a>
                <a href={integration.docsUrl} target="_blank" rel="noreferrer" className="text-[#6B7280] hover:text-[#3D4452]">DOCS ↗</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
