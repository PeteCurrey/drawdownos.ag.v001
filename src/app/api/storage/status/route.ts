import { NextResponse } from 'next/server';
import { getStorageStatus } from '@/lib/storage/r2-adapter';

export async function GET() {
  const status = await getStorageStatus();
  return NextResponse.json(status);
}
