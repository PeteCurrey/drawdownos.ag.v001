import { NextResponse } from 'next/server';
import { getWhopStatus } from '@/lib/integrations/status';

export async function GET() {
  const state = await getWhopStatus();
  return NextResponse.json(state);
}
