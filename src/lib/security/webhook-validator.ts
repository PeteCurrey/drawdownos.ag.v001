// WEBHOOK SIGNATURE VALIDATION & REPLAY PREVENTION MODULE
// Validates HMAC-SHA256 signatures, checks timestamp tolerance windows (5 mins), and prevents replay attacks.

import crypto from 'crypto';

export interface WebhookValidationResult {
  isValid: boolean;
  errorCode?: 'INVALID_SIGNATURE' | 'EXPIRED_TIMESTAMP' | 'REPLAY_ATTACK_DETECTED' | 'MISSING_HEADERS';
  message: string;
}

const PROCESSED_NONCES = new Map<string, number>();

// Clean up expired nonces every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [nonce, timestamp] of PROCESSED_NONCES.entries()) {
    if (now - timestamp > 600000) { // 10 mins
      PROCESSED_NONCES.delete(nonce);
    }
  }
}, 600000);

export function validateWebhookSignature(
  rawBody: string,
  signatureHeader: string,
  timestampHeader: string,
  nonceHeader: string,
  secretKey: string,
  toleranceSeconds: number = 300 // 5 minutes tolerance
): WebhookValidationResult {
  if (!signatureHeader || !timestampHeader || !secretKey) {
    return {
      isValid: false,
      errorCode: 'MISSING_HEADERS',
      message: 'Missing required webhook security headers or secret configuration'
    };
  }

  // 1. Verify Timestamp Tolerance (Replay Prevention)
  const webhookTime = parseInt(timestampHeader, 10);
  const currentTime = Math.floor(Date.now() / 1000);
  if (isNaN(webhookTime) || Math.abs(currentTime - webhookTime) > toleranceSeconds) {
    return {
      isValid: false,
      errorCode: 'EXPIRED_TIMESTAMP',
      message: `Webhook timestamp outside allowed tolerance window of ${toleranceSeconds}s`
    };
  }

  // 2. Verify Nonce Uniqueness
  if (nonceHeader) {
    if (PROCESSED_NONCES.has(nonceHeader)) {
      return {
        isValid: false,
        errorCode: 'REPLAY_ATTACK_DETECTED',
        message: 'Duplicate webhook nonce detected. Request rejected to prevent replay.'
      };
    }
    PROCESSED_NONCES.set(nonceHeader, Date.now());
  }

  // 3. Compute HMAC-SHA256 Signature over payload + timestamp
  const payloadToSign = `${timestampHeader}.${nonceHeader || ''}.${rawBody}`;
  const computedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(payloadToSign)
    .digest('hex');

  const expectedSignature = signatureHeader.replace(/^sha256=/, '');

  // Timing-safe comparison to prevent timing attacks
  const isValid = crypto.timingSafeEqual(
    Buffer.from(computedSignature, 'hex'),
    Buffer.from(expectedSignature.padStart(64, '0'), 'hex')
  );

  if (!isValid) {
    return {
      isValid: false,
      errorCode: 'INVALID_SIGNATURE',
      message: 'HMAC-SHA256 webhook signature mismatch'
    };
  }

  return {
    isValid: true,
    message: 'Webhook signature and replay checks passed successfully'
  };
}
