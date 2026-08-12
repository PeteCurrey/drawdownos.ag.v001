/**
 * DRAWDOWN OS — PRODUCTION TELEMETRY ENGINE
 * 
 * Provides dynamic telemetry from environment configurations and database records.
 * Never fabricates numbers, status, or timestamps.
 */

import { env, checkMarketplaceConnectionStatus } from '@/lib/config/env';

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

export interface LiveRevenueMetrics {
  grossToday: number;
  grossMtd: number;
  ordersToday: number;
  ordersMtd: number;
  currencies: Record<string, number>;
  formattedCurrencyList: string[];
  refundsCount: number;
  refundsTotal: number;
  netMtd: number;
  hasData: boolean;
  hasTarget: boolean;
  targetAmountGbp?: number;
  hasHistory: boolean;
}

export async function fetchLiveChannelStates(): Promise<LiveChannelState[]> {
  const whopCheck = checkMarketplaceConnectionStatus('whop');
  const gumroadCheck = checkMarketplaceConnectionStatus('gumroad');
  const etsyCheck = checkMarketplaceConnectionStatus('etsy');
  const payhipCheck = checkMarketplaceConnectionStatus('payhip');

  // Whop is live connector
  const whopStatus = whopCheck.isConfigured ? 'CONFIGURED_UNVERIFIED' : 'NOT_CONFIGURED';

  return [
    {
      id: 'whop',
      name: 'Whop Creator Portal',
      type: 'Direct API',
      status: whopStatus,
      statusLabel: whopCheck.isConfigured ? 'CONFIGURED (Unverified)' : 'NOT CONFIGURED',
      metrics: {
        Distribution: whopCheck.isConfigured ? 'Configured' : 'Unconfigured',
        Revenue: '—',
        Orders: '—',
        Traffic: '—',
        'Affiliate Sales': '—',
      },
    },
    {
      id: 'gumroad',
      name: 'Gumroad Storefront',
      type: 'Direct API',
      status: gumroadCheck.isConfigured ? 'CONFIGURED_UNVERIFIED' : 'NOT_CONFIGURED',
      statusLabel: gumroadCheck.isConfigured ? 'CONFIGURED (Unverified)' : 'NOT CONFIGURED',
      metrics: {
        Distribution: 'Unconfigured',
        Revenue: '—',
        Orders: '—',
        Traffic: '—',
        'Affiliate Sales': '—',
      },
    },
    {
      id: 'etsy',
      name: 'Etsy Digital Shop',
      type: 'Manual Portal',
      status: etsyCheck.isConfigured ? 'CONFIGURED_UNVERIFIED' : 'NOT_CONFIGURED',
      statusLabel: etsyCheck.isConfigured ? 'CONFIGURED (Unverified)' : 'NOT CONFIGURED',
      metrics: {
        Distribution: 'Unconfigured',
        Revenue: '—',
        Orders: '—',
        Traffic: '—',
        'Affiliate Sales': '—',
      },
    },
    {
      id: 'payhip',
      name: 'Payhip Shop',
      type: 'Direct API',
      status: payhipCheck.isConfigured ? 'CONFIGURED_UNVERIFIED' : 'NOT_CONFIGURED',
      statusLabel: payhipCheck.isConfigured ? 'CONFIGURED (Unverified)' : 'NOT CONFIGURED',
      metrics: {
        Distribution: 'Unconfigured',
        Revenue: '—',
        Orders: '—',
        Traffic: '—',
        'Affiliate Sales': '—',
      },
    },
    {
      id: 'amazon',
      name: 'Amazon Kindle Direct',
      type: 'Direct Retailer',
      status: 'NOT_CONFIGURED',
      statusLabel: 'NOT CONFIGURED',
      metrics: {
        Distribution: 'Unconfigured',
        Revenue: '—',
        Orders: '—',
        Traffic: '—',
        'Affiliate Sales': '—',
      },
    },
    {
      id: 'publishdrive',
      name: 'PublishDrive Aggregator',
      type: 'Aggregator Hub',
      status: 'NOT_CONFIGURED',
      statusLabel: 'NOT CONFIGURED',
      metrics: {
        Distribution: 'Unconfigured',
        Revenue: '—',
        Orders: '—',
        Traffic: '—',
        'Affiliate Sales': '—',
      },
    },
  ];
}
