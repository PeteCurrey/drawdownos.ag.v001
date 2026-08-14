import { NextResponse } from 'next/server';
import { getDigistore24Status } from '@/lib/integrations/status';

export async function GET() {
  const state = await getDigistore24Status();
  return NextResponse.json(state);
}
