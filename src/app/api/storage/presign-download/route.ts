import { NextRequest, NextResponse } from 'next/server';
import { getSignedDownloadUrl, isStorageConfigured } from '@/lib/storage/r2-adapter';

export async function GET(request: NextRequest) {
  if (!isStorageConfigured()) {
    return NextResponse.json({ error: 'Storage not configured.' }, { status: 503 });
  }

  const key = request.nextUrl.searchParams.get('key');
  if (!key) {
    return NextResponse.json({ error: 'key parameter is required.' }, { status: 400 });
  }

  try {
    const url = await getSignedDownloadUrl(key, 3600);
    return NextResponse.json({ url, expiresInSeconds: 3600 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to generate download URL.' }, { status: 500 });
  }
}
