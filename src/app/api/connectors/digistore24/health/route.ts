import { NextResponse } from 'next/server';

/**
 * DRAWDOWN OS — DIGISTORE24 API HEALTH CHECK
 * Calls the live Digistore24 API and reports real connection status.
 * No mock data. No fabricated status.
 */
export async function GET() {
  const apiKey = process.env.DIGISTORE24_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      connected: false,
      status: 'NOT_CONFIGURED',
      message: 'DIGISTORE24_API_KEY is not set in environment variables.',
      latencyMs: null,
    }, { status: 200 });
  }

  const start = Date.now();
  try {
    const res = await fetch('https://www.digistore24.com/api/call/listProducts/', {
      method: 'GET',
      headers: {
        'X-DS-API-KEY': apiKey,
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });
    const latencyMs = Date.now() - start;

    if (!res.ok) {
      return NextResponse.json({
        connected: false,
        status: 'API_ERROR',
        message: `Digistore24 API returned HTTP ${res.status}`,
        latencyMs,
      }, { status: 200 });
    }

    const data = await res.json();

    if (data.result === 'error') {
      return NextResponse.json({
        connected: false,
        status: 'AUTH_ERROR',
        message: data.message || 'Digistore24 API authentication failed.',
        latencyMs,
      }, { status: 200 });
    }

    return NextResponse.json({
      connected: true,
      status: 'CONNECTED',
      message: 'Digistore24 API reachable and authenticated.',
      latencyMs,
      apiVersion: data.api_version ?? null,
    }, { status: 200 });
  } catch (err) {
    const latencyMs = Date.now() - start;
    return NextResponse.json({
      connected: false,
      status: 'NETWORK_ERROR',
      message: err instanceof Error ? err.message : 'Unknown error contacting Digistore24 API.',
      latencyMs,
    }, { status: 200 });
  }
}
