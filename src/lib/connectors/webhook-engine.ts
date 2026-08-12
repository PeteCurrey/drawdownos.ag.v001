// DRAWDOWN OS — WEBHOOK ENGINE & EVENT INSPECTOR (§24, §25, §26, §77)

export interface WebhookEventRecord {
  id: string;
  connectorId: string;
  marketplaceName: string;
  canonicalEvent: 
    | 'PRODUCT_CREATED'
    | 'PRODUCT_UPDATED'
    | 'LISTING_CREATED'
    | 'LISTING_UPDATED'
    | 'ORDER_CREATED'
    | 'PAYMENT_COMPLETED'
    | 'REFUND_CREATED'
    | 'PAYOUT_PAID'
    | 'AFFILIATE_SALE';
  externalEventType: string;
  signatureVerified: boolean;
  rawPayload: Record<string, any>;
  processingStatus: 'PROCESSED' | 'FAILED' | 'IGNORED' | 'REPLAYED';
  durationMs: number;
  errorMessage?: string;
  receivedAt: string;
}

export const DEMO_WEBHOOK_EVENTS: WebhookEventRecord[] = [
  {
    id: 'wh-8942',
    connectorId: 'ch-whop',
    marketplaceName: 'Whop Direct',
    canonicalEvent: 'PAYMENT_COMPLETED',
    externalEventType: 'payment.succeeded',
    signatureVerified: true,
    rawPayload: {
      id: 'pay_9824021',
      action: 'payment.succeeded',
      user: { email: 'trader89@example.com', country: 'UK' },
      line_items: [{ product_id: 'prod_dd_htt_001', amount: 9900, currency: 'usd' }],
    },
    processingStatus: 'PROCESSED',
    durationMs: 42,
    receivedAt: '2026-08-12 18:41:20',
  },
  {
    id: 'wh-8941',
    connectorId: 'ch-etsy',
    marketplaceName: 'Etsy Digital Shop',
    canonicalEvent: 'LISTING_UPDATED',
    externalEventType: 'listing.updated',
    signatureVerified: true,
    rawPayload: {
      listing_id: 894012,
      state: 'active',
      title: 'HOW TO TRADE — Institutional Risk Playbook',
      quantity: 999,
    },
    processingStatus: 'PROCESSED',
    durationMs: 38,
    receivedAt: '2026-08-12 18:38:12',
  },
  {
    id: 'wh-8940',
    connectorId: 'ch-publishdrive',
    marketplaceName: 'PublishDrive Aggregator',
    canonicalEvent: 'PAYOUT_PAID',
    externalEventType: 'payout.settled',
    signatureVerified: true,
    rawPayload: {
      payout_id: 'po_771092',
      amount_usd: 1420.50,
      channels_included: ['kobo', 'apple_books'],
    },
    processingStatus: 'PROCESSED',
    durationMs: 65,
    receivedAt: '2026-08-12 18:22:00',
  },
  {
    id: 'wh-8939',
    connectorId: 'ch-clickbank',
    marketplaceName: 'ClickBank Marketplace',
    canonicalEvent: 'AFFILIATE_SALE',
    externalEventType: 'order.affiliate_sale',
    signatureVerified: false,
    rawPayload: {
      order_id: 'cb_9012',
      receipt: 'R-9012',
    },
    processingStatus: 'FAILED',
    durationMs: 12,
    errorMessage: 'HMAC signature verification failed. Invalid webhook secret.',
    receivedAt: '2026-08-12 18:15:30',
  },
];
