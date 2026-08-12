import { NextResponse } from 'next/server';
import { checkWhopHealth } from '@/lib/connectors/whop/client';

export async function GET() {
  const result = await checkWhopHealth();
  return NextResponse.json(result, {
    status: result.connected ? 200 : (result.configured ? 400 : 503),
  });
}
