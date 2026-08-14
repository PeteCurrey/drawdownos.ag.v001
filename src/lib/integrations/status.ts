/**
 * DRAWDOWN OS — CANONICAL INTEGRATION STATUS SERVICE
 * SERVER-SIDE ONLY. Never import from client components.
 *
 * getIntegrationStatus() is the single source of truth for any
 * connector's status. UI must never determine status from env var
 * presence alone — only CONNECTED after a real successful API call.
 */

export type IntegrationStatus =
  | 'NOT_CONFIGURED'   // Required env vars missing
  | 'CONFIGURED'       // Env vars present but not yet verified this session
  | 'CONNECTED'        // Real API call succeeded
  | 'ERROR';           // Real API call failed

export interface IntegrationState {
  provider: string;
  configured: boolean;
  status: IntegrationStatus;
  lastVerifiedAt: string | null;
  error: string | null;
  metadata?: Record<string, unknown>;
}

export async function getWhopStatus(): Promise<IntegrationState> {
  const apiKey = process.env.WHOP_API_KEY;
  if (!apiKey) {
    return { provider: 'whop', configured: false, status: 'NOT_CONFIGURED', lastVerifiedAt: null, error: 'WHOP_API_KEY is not set.' };
  }

  const startTime = Date.now();
  try {
    const res = await fetch('https://api.whop.com/v5/me', {
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    const latencyMs = Date.now() - startTime;
    const checkedAt = new Date().toISOString();

    if (!res.ok) {
      return { provider: 'whop', configured: true, status: 'ERROR', lastVerifiedAt: checkedAt, error: `Whop API returned HTTP ${res.status}` };
    }

    const json = await res.json();
    return {
      provider: 'whop',
      configured: true,
      status: 'CONNECTED',
      lastVerifiedAt: checkedAt,
      error: null,
      metadata: { latencyMs, accountId: json?.id ?? null, accountName: json?.name ?? null },
    };
  } catch (err) {
    return {
      provider: 'whop',
      configured: true,
      status: 'ERROR',
      lastVerifiedAt: new Date().toISOString(),
      error: err instanceof Error ? err.message : 'Network failure reaching Whop API.',
    };
  }
}

export async function getDigistore24Status(): Promise<IntegrationState> {
  const apiKey = process.env.DIGISTORE24_API_KEY;
  if (!apiKey) {
    return { provider: 'digistore24', configured: false, status: 'NOT_CONFIGURED', lastVerifiedAt: null, error: 'DIGISTORE24_API_KEY is not set.' };
  }

  const startTime = Date.now();
  try {
    const res = await fetch('https://www.digistore24.com/api/call/listProducts/', {
      headers: { 'X-DS-API-KEY': apiKey, Accept: 'application/json' },
      cache: 'no-store',
    });
    const latencyMs = Date.now() - startTime;
    const checkedAt = new Date().toISOString();

    if (!res.ok) {
      return { provider: 'digistore24', configured: true, status: 'ERROR', lastVerifiedAt: checkedAt, error: `Digistore24 API returned HTTP ${res.status}` };
    }

    const json = await res.json();
    if (json?.result === 'error') {
      return { provider: 'digistore24', configured: true, status: 'ERROR', lastVerifiedAt: checkedAt, error: json?.message ?? 'Auth failed.' };
    }

    return {
      provider: 'digistore24',
      configured: true,
      status: 'CONNECTED',
      lastVerifiedAt: checkedAt,
      error: null,
      metadata: { latencyMs },
    };
  } catch (err) {
    return {
      provider: 'digistore24',
      configured: true,
      status: 'ERROR',
      lastVerifiedAt: new Date().toISOString(),
      error: err instanceof Error ? err.message : 'Network failure reaching Digistore24 API.',
    };
  }
}

export async function getIntegrationStatus(provider: string): Promise<IntegrationState> {
  switch (provider.toLowerCase()) {
    case 'whop': return getWhopStatus();
    case 'digistore24': return getDigistore24Status();
    default:
      return { provider, configured: false, status: 'NOT_CONFIGURED', lastVerifiedAt: null, error: `Unknown provider: ${provider}` };
  }
}
