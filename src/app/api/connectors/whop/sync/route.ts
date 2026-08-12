import { NextResponse } from 'next/server';
import { runWhopSync } from '@/lib/connectors/whop/sync';

export async function POST() {
  const result = await runWhopSync();
  return NextResponse.json(result, {
    status: result.finalState === 'FAILED' ? 400 : 200,
  });
}
