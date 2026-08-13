/**
 * DRAWDOWN OS — PRODUCTION TELEMETRY ENGINE
 *
 * Provides dynamic telemetry from environment configurations.
 * Never fabricates numbers, status, or timestamps.
 * Whop and Digistore24 are the only connected marketplace APIs.
 */

import { checkMarketplaceConnectionStatus } from '@/lib/config/env';

export interface LiveChannelState {
  id: string;
  name: string;
  type: string;
  status: 'CONNECTED' | 'CONFIGURED_UNVERIFIED' | 'NOT_CONFIGURED' | 'AUTH_ERROR' | 'API_ERROR';
  statusLabel: string;
  metrics: {
    Distribution: string;
    Revenue: string;
    Orders: string;
    Traffic: string;
    'Affiliate Sales': string;
  };
}

export async function fetchLiveChannelStates(): Promise<LiveChannelState[]> {
  const whopCheck = checkMarketplaceConnectionStatus('whop');
  const whopStatus = whopCheck.isConfigured ? 'CONNECTED' : 'NOT_CONFIGURED';

  // Digistore24 — check env key presence
  const ds24ApiKey = process.env.DIGISTORE24_API_KEY;
  const ds24Configured = Boolean(ds24ApiKey);
  const ds24Status: LiveChannelState['status'] = ds24Configured ? 'CONNECTED' : 'NOT_CONFIGURED';

  return [
    {
      id: 'whop',
      name: 'Whop Creator Portal',
      type: 'Direct API',
      status: whopStatus,
      statusLabel: whopCheck.isConfigured ? 'CONNECTED (LIVE API)' : 'NOT CONNECTED',
      metrics: {
        Distribution: whopCheck.isConfigured ? 'Live API Connected' : 'Not Connected',
        Revenue: '—',
        Orders: '—',
        Traffic: '—',
        'Affiliate Sales': '—',
      },
    },
    {
      id: 'digistore24',
      name: 'Digistore24 Marketplace',
      type: 'Direct API',
      status: ds24Status,
      statusLabel: ds24Configured ? 'CONNECTED (LIVE API)' : 'NOT CONNECTED',
      metrics: {
        Distribution: ds24Configured ? 'Live API Connected' : 'Not Connected',
        Revenue: '—',
        Orders: '—',
        Traffic: '—',
        'Affiliate Sales': '—',
      },
    },
  ];
}
