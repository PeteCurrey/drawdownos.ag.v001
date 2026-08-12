/**
 * DRAWDOWN OS — LIVE WHOP CONNECTOR CLIENT (SERVER-ONLY)
 * 
 * Production reader for Whop API v5. Strictly server-side execution.
 * Never exposes WHOP_API_KEY or WHOP_WEBHOOK_SECRET to client bundles.
 */

import { ConnectionLifecycleState } from '@/lib/domain/connection';

export interface WhopHealthResult {
  connector: 'whop';
  configured: boolean;
  connected: boolean;
  status: ConnectionLifecycleState;
  accountId?: string;
  accountName?: string;
  companyIdMatch?: boolean;
  latencyMs: number;
  checkedAt: string;
  message?: string;
}

export interface WhopProduct {
  id: string;
  companyId: string;
  title: string;
  headline?: string;
  route?: string;
  visibility?: string;
  memberCount?: number;
  createdAt?: string;
  updatedAt?: string;
  raw: Record<string, unknown>;
}

export interface WhopPayment {
  id: string;
  companyId: string;
  productId?: string;
  planId?: string;
  status: 'COMPLETED' | 'PENDING' | 'REFUNDED' | 'FAILED' | 'UNKNOWN';
  grossAmount: number;
  currency: string;
  netAmount?: number;
  feeAmount?: number;
  taxAmount?: number;
  billingReason?: string;
  refunded: boolean;
  customerReference?: string;
  createdAtTimestamp: string;
}

function getWhopApiKey(): string | undefined {
  return process.env.WHOP_API_KEY;
}

function getWhopCompanyId(): string | undefined {
  return process.env.WHOP_COMPANY_ID;
}

/**
 * 11. WHOP CONNECTION HEALTH CHECK
 * Read-only lookup to verify API key validity against Whop API v5
 */
export async function checkWhopHealth(): Promise<WhopHealthResult> {
  const apiKey = getWhopApiKey();
  const configuredCompanyId = getWhopCompanyId();
  const startTime = Date.now();
  const checkedAt = new Date().toISOString();

  if (!apiKey) {
    return {
      connector: 'whop',
      configured: false,
      connected: false,
      status: 'NOT_CONFIGURED',
      latencyMs: 0,
      checkedAt,
      message: 'WHOP_API_KEY environment variable is not configured.',
    };
  }

  try {
    // Call Whop API v5 authenticated endpoint
    const response = await fetch('https://api.whop.com/v5/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    const latencyMs = Date.now() - startTime;

    if (response.status === 401 || response.status === 403) {
      return {
        connector: 'whop',
        configured: true,
        connected: false,
        status: response.status === 401 ? 'AUTH_ERROR' : 'PERMISSION_ERROR',
        latencyMs,
        checkedAt,
        message: 'Whop rejected the configured API credential. Check WHOP_API_KEY.',
      };
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      return {
        connector: 'whop',
        configured: true,
        connected: false,
        status: 'API_ERROR',
        latencyMs,
        checkedAt,
        message: `Whop API returned HTTP ${response.status}: ${errorText || response.statusText}`,
      };
    }

    const data = await response.json();
    const accountId = data.id || data.company_id || data.user_id || configuredCompanyId;
    const accountName = data.name || data.title || data.username || 'Whop Company Account';

    const companyIdMatch = configuredCompanyId
      ? (accountId === configuredCompanyId || Boolean(data.company_id && data.company_id === configuredCompanyId))
      : true;

    if (configuredCompanyId && !companyIdMatch) {
      return {
        connector: 'whop',
        configured: true,
        connected: false,
        status: 'PERMISSION_ERROR',
        accountId,
        accountName,
        companyIdMatch: false,
        latencyMs,
        checkedAt,
        message: `Configured WHOP_COMPANY_ID (${configuredCompanyId}) does not match authenticated Whop account (${accountId}).`,
      };
    }

    return {
      connector: 'whop',
      configured: true,
      connected: true,
      status: 'CONNECTED',
      accountId,
      accountName,
      companyIdMatch: true,
      latencyMs,
      checkedAt,
      message: 'Whop API key authenticated successfully.',
    };
  } catch (err: unknown) {
    const latencyMs = Date.now() - startTime;
    const errMessage = err instanceof Error ? err.message : 'Network failure reaching Whop API.';
    return {
      connector: 'whop',
      configured: true,
      connected: false,
      status: 'API_ERROR',
      latencyMs,
      checkedAt,
      message: `Failed to connect to Whop API: ${errMessage}`,
    };
  }
}

/**
 * 13. WHOP PRODUCTS: READ LIVE DATA (READ-ONLY)
 */
export async function getWhopProducts(): Promise<{ success: boolean; products: WhopProduct[]; error?: string }> {
  const apiKey = getWhopApiKey();
  if (!apiKey) {
    return { success: false, products: [], error: 'WHOP_API_KEY is not configured.' };
  }

  try {
    const response = await fetch('https://api.whop.com/v5/company/products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return { success: false, products: [], error: `Whop API returned HTTP ${response.status}` };
    }

    const json = await response.json();
    const rawList = Array.isArray(json) ? json : (json.data || json.products || []);

    const products: WhopProduct[] = rawList.map((item: Record<string, unknown>) => ({
      id: String(item.id || ''),
      companyId: String(item.company_id || getWhopCompanyId() || ''),
      title: String(item.title || item.name || 'Untitled Whop Product'),
      headline: item.headline ? String(item.headline) : undefined,
      route: item.route ? String(item.route) : undefined,
      visibility: item.visibility ? String(item.visibility) : 'UNKNOWN',
      memberCount: typeof item.member_count === 'number' ? item.member_count : 0,
      createdAt: item.created_at ? String(item.created_at) : new Date().toISOString(),
      updatedAt: item.updated_at ? String(item.updated_at) : new Date().toISOString(),
      raw: item,
    }));

    return { success: true, products };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error reading Whop products';
    return { success: false, products: [], error: msg };
  }
}

/**
 * 14. WHOP PAYMENTS: READ REAL REVENUE (READ-ONLY)
 */
export async function getWhopPayments(): Promise<{ success: boolean; payments: WhopPayment[]; error?: string }> {
  const apiKey = getWhopApiKey();
  if (!apiKey) {
    return { success: false, payments: [], error: 'WHOP_API_KEY is not configured.' };
  }

  try {
    const response = await fetch('https://api.whop.com/v5/company/payments', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return { success: false, payments: [], error: `Whop Payments API returned HTTP ${response.status}` };
    }

    const json = await response.json();
    const rawList = Array.isArray(json) ? json : (json.data || json.payments || []);

    const payments: WhopPayment[] = rawList.map((item: Record<string, unknown>) => {
      const rawStatus = String(item.status || '').toUpperCase();
      let status: WhopPayment['status'] = 'UNKNOWN';
      if (rawStatus === 'COMPLETED' || rawStatus === 'PAID' || rawStatus === 'SUCCESS') status = 'COMPLETED';
      else if (rawStatus === 'PENDING') status = 'PENDING';
      else if (rawStatus === 'REFUNDED') status = 'REFUNDED';
      else if (rawStatus === 'FAILED') status = 'FAILED';

      const rawCurrency = String(item.currency || 'USD').toUpperCase();
      const grossAmount = typeof item.final_amount === 'number' ? item.final_amount : (typeof item.amount === 'number' ? item.amount : 0);

      return {
        id: String(item.id || ''),
        companyId: String(item.company_id || getWhopCompanyId() || ''),
        productId: item.product_id ? String(item.product_id) : undefined,
        planId: item.plan_id ? String(item.plan_id) : undefined,
        status,
        grossAmount,
        currency: rawCurrency,
        netAmount: typeof item.subtotal === 'number' ? item.subtotal : undefined,
        feeAmount: typeof item.whop_fee === 'number' ? item.whop_fee : undefined,
        taxAmount: typeof item.tax_fee === 'number' ? item.tax_fee : undefined,
        billingReason: item.billing_reason ? String(item.billing_reason) : undefined,
        refunded: Boolean(item.refunded || status === 'REFUNDED'),
        customerReference: item.user_id ? String(item.user_id) : undefined,
        createdAtTimestamp: item.created_at ? new Date(Number(item.created_at) * 1000 || item.created_at as string).toISOString() : new Date().toISOString(),
      };
    });

    return { success: true, payments };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error reading Whop payments';
    return { success: false, payments: [], error: msg };
  }
}
