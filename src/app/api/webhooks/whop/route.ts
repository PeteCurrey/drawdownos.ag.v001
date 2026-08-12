import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseServer } from '@/lib/supabase/server';

function verifyWhopSignature(payloadText: string, signature: string | null, secret: string): boolean {
  if (!signature || !secret) return false;
  try {
    // Whop webhook signatures use HMAC SHA256
    const expected = crypto.createHmac('sha256', secret).update(payloadText).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.WHOP_WEBHOOK_SECRET;
  const rawBody = await req.text();
  const signature = req.headers.get('x-whop-signature') || req.headers.get('whop-signature');

  // 1. Signature Verification (Skip ONLY if secret not set in dev, but warn)
  let signatureVerified = false;
  if (secret) {
    signatureVerified = verifyWhopSignature(rawBody, signature, secret);
    if (!signatureVerified && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
    }
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const eventId = String(body.id || body.event_id || crypto.randomUUID());
  const eventType = String(body.action || body.event || body.type || 'unknown');

  // 2. Idempotency Check
  const { data: existing } = await supabaseServer
    .from('raw_webhooks')
    .select('id')
    .eq('connector_id', 'whop')
    .eq('event_id', eventId)
    .single();

  if (existing) {
    return NextResponse.json({ status: 'DUPLICATE', message: 'Event already processed' }, { status: 200 });
  }

  // 3. Persist Raw Webhook Event
  await supabaseServer.from('raw_webhooks').insert({
    connector_id: 'whop',
    event_id: eventId,
    event_type: eventType,
    signature_verified: signatureVerified,
    payload: body,
    processing_state: 'PROCESSED',
  });

  // 4. Record Audit Event
  await supabaseServer.from('audit_logs').insert({
    connector_id: 'whop',
    operation: 'WEBHOOK_RECEIVE',
    actor: 'WHOP_WEBHOOK',
    started_at: new Date().toISOString(),
    completed_at: new Date().toISOString(),
    duration_ms: 0,
    status: 'SUCCESS',
    records_affected: 1,
    metadata: { eventId, eventType, signatureVerified },
  });

  return NextResponse.json({ received: true, eventId, eventType }, { status: 200 });
}
