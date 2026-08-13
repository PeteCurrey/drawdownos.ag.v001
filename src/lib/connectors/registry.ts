// DRAWDOWN OS — MARKETPLACE CONNECTOR REGISTRY
// Only connectors with live API credentials are shown with real telemetry.
// Whop and Digistore24 are the only active API connections.

import { 
  ConnectorManifest, 
  ConnectorCapabilities, 
  ConnectorTelemetryMetrics 
} from './types';

// Utility for default capability set
function defaultCapabilities(overrides: Partial<ConnectorCapabilities> = {}): ConnectorCapabilities {
  return {
    canCreateProduct: 'RESEARCH_REQUIRED',
    canReadProduct: 'RESEARCH_REQUIRED',
    canUpdateProduct: 'RESEARCH_REQUIRED',
    canDeleteProduct: 'UNSUPPORTED',
    canArchiveProduct: 'UNSUPPORTED',
    canPauseProduct: 'RESEARCH_REQUIRED',
    canCreateListing: 'RESEARCH_REQUIRED',
    canReadListing: 'RESEARCH_REQUIRED',
    canUpdateListing: 'RESEARCH_REQUIRED',
    canPauseListing: 'RESEARCH_REQUIRED',
    canDeleteListing: 'UNSUPPORTED',
    canVerifyListing: 'RESEARCH_REQUIRED',
    canUploadFiles: 'RESEARCH_REQUIRED',
    canReplaceFiles: 'RESEARCH_REQUIRED',
    supportsPDF: 'SUPPORTED',
    supportsEPUB: 'RESEARCH_REQUIRED',
    supportsAudio: 'UNSUPPORTED',
    supportsZIP: 'SUPPORTED',
    canSetPrice: 'RESEARCH_REQUIRED',
    canUpdatePrice: 'RESEARCH_REQUIRED',
    supportsTerritorialPricing: 'RESEARCH_REQUIRED',
    supportsMultipleCurrencies: 'SUPPORTED',
    supportsSalesPricing: 'RESEARCH_REQUIRED',
    canReadOrders: 'RESEARCH_REQUIRED',
    canReadTransactions: 'RESEARCH_REQUIRED',
    canReadFees: 'RESEARCH_REQUIRED',
    canReadRefunds: 'RESEARCH_REQUIRED',
    canReadPayouts: 'RESEARCH_REQUIRED',
    canReadRoyalties: 'RESEARCH_REQUIRED',
    canReadCustomer: 'RESEARCH_REQUIRED',
    customerDataRestricted: 'SUPPORTED',
    hasAffiliateProgram: 'RESEARCH_REQUIRED',
    canReadAffiliates: 'RESEARCH_REQUIRED',
    supportsWebhooks: 'RESEARCH_REQUIRED',
    supportsIdempotency: 'RESEARCH_REQUIRED',
    supportsSafeRetry: 'SUPPORTED',
    supportsRollback: 'PARTIAL',
    supportsSandbox: 'RESEARCH_REQUIRED',
    ...overrides,
  };
}

export const CONNECTOR_MANIFESTS_REGISTRY: Record<string, ConnectorManifest> = {
  'ch-whop': {
    id: 'ch-whop',
    name: 'Whop Direct API',
    category: 'DIRECT_API',
    officialWebsite: 'https://whop.com',
    officialDocsUrl: 'https://dev.whop.com',
    authType: 'API_KEY',
    versionInfo: {
      connectorVersion: '1.2.0',
      apiVersion: 'v5',
      manifestVersion: '1.0.0',
      certificationVersion: '2026.1',
      lastVerifiedAt: '2026-08-13',
    },
    capabilities: defaultCapabilities({
      canCreateProduct: 'SUPPORTED',
      canReadProduct: 'SUPPORTED',
      canUpdateProduct: 'SUPPORTED',
      canCreateListing: 'SUPPORTED',
      canReadListing: 'SUPPORTED',
      canUpdateListing: 'SUPPORTED',
      canUploadFiles: 'SUPPORTED',
      canSetPrice: 'SUPPORTED',
      canUpdatePrice: 'SUPPORTED',
      canReadOrders: 'SUPPORTED',
      canReadTransactions: 'SUPPORTED',
      canReadFees: 'SUPPORTED',
      canReadRefunds: 'SUPPORTED',
      canReadPayouts: 'SUPPORTED',
      canReadCustomer: 'SUPPORTED',
      hasAffiliateProgram: 'SUPPORTED',
      supportsWebhooks: 'SUPPORTED',
      supportsIdempotency: 'SUPPORTED',
      supportsSandbox: 'SUPPORTED',
    }),
    capabilityEvidence: {
      'canReadProduct': {
        capability: 'canReadProduct',
        status: 'SUPPORTED',
        source: 'Official Whop v5 API — live verified 2026-08-13',
        documentationUrl: 'https://dev.whop.com/api-reference/products',
        confidenceScore: 100,
      },
    },
    resources: ['Product', 'Listing', 'File', 'Price', 'Order', 'Transaction', 'Customer', 'Webhook'],
    fieldMappings: [
      { drawdownField: 'canonical.title', targetField: 'name', transformRule: 'DIRECT', isRequired: true, sampleValue: 'HOW TO TRADE' },
      { drawdownField: 'canonical.long_description', targetField: 'description', transformRule: 'STRIP_HTML', isRequired: true },
      { drawdownField: 'territorial_price.USD', targetField: 'initial_price', transformRule: 'CURRENCY_CONVERT', isRequired: true, sampleValue: '99.00' },
    ],
    actionCertifications: {
      'READ_LISTINGS': { actionType: 'READ_LISTINGS', certLevel: 'AUTOPILOT_CERTIFIED', autopilotEligible: true },
      'CREATE_LISTING': { actionType: 'CREATE_LISTING', certLevel: 'AUTOPILOT_CERTIFIED', autopilotEligible: true },
      'UPDATE_PRICE': { actionType: 'UPDATE_PRICE', certLevel: 'AUTOPILOT_CERTIFIED', autopilotEligible: true },
    },
    rateLimits: { requestsPerSecond: 10, requestsPerMinute: 600, burstLimit: 20 },
  },

  'ch-digistore24': {
    id: 'ch-digistore24',
    name: 'Digistore24 Direct API',
    category: 'DIRECT_API',
    officialWebsite: 'https://www.digistore24.com',
    officialDocsUrl: 'https://www.digistore24.com/api/call',
    authType: 'API_KEY',
    versionInfo: {
      connectorVersion: '1.0.0',
      apiVersion: '1.2',
      manifestVersion: '1.0.0',
      certificationVersion: '2026.1',
      lastVerifiedAt: '2026-08-13',
    },
    capabilities: defaultCapabilities({
      canReadProduct: 'SUPPORTED',
      canReadListing: 'SUPPORTED',
      canReadOrders: 'SUPPORTED',
      canReadTransactions: 'SUPPORTED',
      canReadFees: 'SUPPORTED',
      canReadRefunds: 'SUPPORTED',
      canReadPayouts: 'SUPPORTED',
      hasAffiliateProgram: 'SUPPORTED',
      canReadAffiliates: 'SUPPORTED',
      supportsWebhooks: 'SUPPORTED',
      supportsPDF: 'SUPPORTED',
      supportsEPUB: 'PARTIAL',
    }),
    capabilityEvidence: {
      'canReadProduct': {
        capability: 'canReadProduct',
        status: 'SUPPORTED',
        source: 'Digistore24 API v1.2 — live verified 2026-08-13 via listProducts()',
        documentationUrl: 'https://www.digistore24.com/api/call',
        confidenceScore: 100,
      },
    },
    resources: ['Product', 'Order', 'Transaction', 'Refund', 'Affiliate', 'Payout'],
    fieldMappings: [
      { drawdownField: 'canonical.title', targetField: 'name', transformRule: 'DIRECT', isRequired: true, sampleValue: 'How To Trade' },
      { drawdownField: 'territorial_price.GBP', targetField: 'price', transformRule: 'DIRECT', isRequired: true },
    ],
    actionCertifications: {
      'READ_LISTINGS': { actionType: 'READ_LISTINGS', certLevel: 'AUTOPILOT_CERTIFIED', autopilotEligible: true },
      'READ_SALES': { actionType: 'READ_SALES', certLevel: 'READ_CERTIFIED', autopilotEligible: true },
    },
    rateLimits: { requestsPerSecond: 5, requestsPerMinute: 300, burstLimit: 10 },
  },
};

/**
 * CONNECTOR_TELEMETRY_DATA
 * Only Whop and Digistore24 have live API credentials.
 * Telemetry for these two connectors is seeded from the manifest.
 * Actual latency/health values are fetched at runtime by API health routes.
 * No fake numbers for unconnected channels.
 */
export const CONNECTOR_TELEMETRY_DATA: ConnectorTelemetryMetrics[] = [
  {
    connectorId: 'ch-whop',
    name: 'Whop Direct API',
    healthScore: 0,           // Populated at runtime via /api/connectors/whop/health
    healthStatus: 'HEALTHY',  // Confirmed live 2026-08-13
    apiLatencyMs: 0,          // Populated at runtime
    successRatePct: 0,        // Populated at runtime
    lastSyncAt: '—',
    lastSaleAt: '—',
    webhookHealthPct: 0,
    rateLimitUsedPct: 0,
    circuitBreakerState: 'CLOSED',
    autopilotState: 'CERTIFIED',
  },
  {
    connectorId: 'ch-digistore24',
    name: 'Digistore24 Direct API',
    healthScore: 0,           // Populated at runtime via /api/connectors/digistore24/health
    healthStatus: 'HEALTHY',  // Confirmed live 2026-08-13
    apiLatencyMs: 0,          // Populated at runtime
    successRatePct: 0,        // Populated at runtime
    lastSyncAt: '—',
    lastSaleAt: '—',
    webhookHealthPct: 0,
    rateLimitUsedPct: 0,
    circuitBreakerState: 'CLOSED',
    autopilotState: 'CERTIFIED',
  },
];
