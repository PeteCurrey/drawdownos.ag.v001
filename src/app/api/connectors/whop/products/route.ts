import { NextResponse } from 'next/server';
import { getWhopProducts } from '@/lib/connectors/whop/client';

export async function GET() {
  const result = await getWhopProducts();
  return NextResponse.json(result, {
    status: result.success ? 200 : 400,
  });
}
