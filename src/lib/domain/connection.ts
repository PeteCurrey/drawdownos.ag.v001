/**
 * DRAWDOWN OS — CONNECTION STATE SEMANTICS
 * 
 * Defines rigorous, evidence-backed lifecycle states for marketplace connections.
 */

export type ConnectionLifecycleState =
  | 'NOT_CONFIGURED'
  | 'CONFIGURED_UNVERIFIED'
  | 'CONNECTING'
  | 'CONNECTED'
  | 'DEGRADED'
  | 'AUTH_ERROR'
  | 'PERMISSION_ERROR'
  | 'API_ERROR'
  | 'STALE'
  | 'DISCONNECTED';

export interface ConnectorHealthMetrics {
  connectorId: string;
  marketplaceId: string;
  status: ConnectionLifecycleState;
  isConfigured: boolean;
  isConnected: boolean;
  latencyMs?: number;
  lastSuccessfulSync?: string;
  lastAttemptedSync?: string;
  lastErrorCategory?: string;
  lastErrorMessage?: string;
  successRate24h?: number; // 0–100 or undefined if no telemetry
  totalRequests24h?: number;
  successfulRequests24h?: number;
  circuitBreakerState: 'CLOSED' | 'OPEN' | 'HALF_OPEN' | 'UNMONITORED';
  webhookHealth: 'HEALTHY' | 'DEGRADED' | 'FAILED' | 'NO_WEBHOOKS';
  lastSaleTimestamp?: string;
}

export function getInitialConnectorHealth(connectorId: string, isKeyPresent: boolean): ConnectorHealthMetrics {
  return {
    connectorId,
    marketplaceId: connectorId,
    status: isKeyPresent ? 'CONFIGURED_UNVERIFIED' : 'NOT_CONFIGURED',
    isConfigured: isKeyPresent,
    isConnected: false,
    circuitBreakerState: 'UNMONITORED',
    webhookHealth: 'NO_WEBHOOKS',
  };
}
