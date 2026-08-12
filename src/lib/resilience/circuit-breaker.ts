// CIRCUIT BREAKER & RATE-LIMIT RESILIENCE MODULE
// Protects background queues and integration workers against cascading API failures, rate limits, and outages.

export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface CircuitBreakerOptions {
  failureThreshold?: number; // Failures before opening circuit
  resetTimeoutMs?: number;   // Time to wait before testing recovery
  timeoutMs?: number;        // Request timeout
}

export class CircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failureCount: number = 0;
  private lastStateChange: number = Date.now();
  private failureThreshold: number;
  private resetTimeoutMs: number;
  private timeoutMs: number;

  constructor(options: CircuitBreakerOptions = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeoutMs = options.resetTimeoutMs || 30000; // 30s
    this.timeoutMs = options.timeoutMs || 10000; // 10s
  }

  async execute<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastStateChange > this.resetTimeoutMs) {
        this.state = 'HALF_OPEN';
        this.lastStateChange = Date.now();
      } else {
        console.warn('[CIRCUIT BREAKER] Circuit OPEN. Returning fallback response.');
        return fallback;
      }
    }

    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Marketplace API Request Timeout')), this.timeoutMs)
      );

      const result = await Promise.race([fn(), timeoutPromise]);
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      console.error('[CIRCUIT BREAKER] Call failed:', error);
      return fallback;
    }
  }

  private onSuccess() {
    this.failureCount = 0;
    if (this.state === 'HALF_OPEN') {
      this.state = 'CLOSED';
      this.lastStateChange = Date.now();
    }
  }

  private onFailure() {
    this.failureCount += 1;
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.lastStateChange = Date.now();
      console.error(`[CIRCUIT BREAKER] Failure threshold reached (${this.failureCount}). Circuit is now OPEN.`);
    }
  }

  getState(): CircuitState {
    return this.state;
  }
}
