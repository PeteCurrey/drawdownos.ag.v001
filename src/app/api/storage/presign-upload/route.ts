import { NextRequest, NextResponse } from 'next/server';
import { getSignedUploadUrl, isStorageConfigured } from '@/lib/storage/r2-adapter';

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/epub+zip',
  'application/octet-stream',
];

export async function POST(request: NextRequest) {
  if (!isStorageConfigured()) {
    return NextResponse.json({ error: 'Storage not configured.' }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const { key, contentType } = body as { key?: string; contentType?: string };

  if (!key || !contentType) {
    return NextResponse.json({ error: 'key and contentType are required.' }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.includes(contentType)) {
    return NextResponse.json({ error: `Content type ${contentType} is not permitted.` }, { status: 400 });
  }

  // Sanitise key
  const safeKey = key.replace(/[^a-zA-Z0-9/_.-]/g, '_');

  try {
    const url = await getSignedUploadUrl(safeKey, contentType, 900);
    return NextResponse.json({ url, key: safeKey, expiresInSeconds: 900 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to generate upload URL.' }, { status: 500 });
  }
}
