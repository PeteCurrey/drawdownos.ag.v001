import { NextResponse } from 'next/server';
import { getWhopPayments } from '@/lib/connectors/whop/client';

export async function GET() {
  const result = await getWhopPayments();
  return NextResponse.json(result);
}
