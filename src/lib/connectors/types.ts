// DRAWDOWN OS — MARKETPLACE CONNECTOR FACTORY SDK
// CORE TYPE DEFINITIONS & SCHEMAS

export type ConnectorCategory =
  | 'DIRECT_API'
  | 'OAUTH_API'
  | 'API_KEY'
  | 'WEBHOOK_ONLY'
  | 'READ_ONLY_API'
  | 'REPORT_IMPORT'
  | 'AGGREGATOR'
  | 'MANUAL_PORTAL'
  | 'HYBRID'
  | 'CUSTOM'
  | 'RESEARCH_REQUIRED';

export type CapabilityStatus =
  | 'SUPPORTED'
  | 'UNSUPPORTED'
  | 'PARTIAL'
  | 'UNKNOWN'
  | 'RESEARCH_REQUIRED';

export type ActionCertLevel =
  | 'UNCERTIFIED'
  | 'RESEARCHED'
  | 'CONFIGURED'
  | 'CONNECTED'
  | 'READ_CERTIFIED'
  | 'WRITE_CERTIFIED'
  | 'AUTOPILOT_CERTIFIED'
  | 'DEGRADED'
  | 'SUSPENDED';

export type TokenHealthStatus =
  | 'CONNECTED'
  | 'TOKEN_HEALTHY'
  | 'TOKEN_EXPIRING'
  | 'TOKEN_EXPIRED'
  | 'REAUTHORISATION_REQUIRED'
  | 'INVALID'
  | 'UNKNOWN';

export type TransformRule =
  | 'DIRECT'
  | 'TRUNCATE'
  | 'STRIP_HTML'
  | 'CONVERT_MARKDOWN'
  | 'HTML_SANITIZE'
  | 'SLUGIFY'
  | 'UPPERCASE'
  | 'LOWERCASE'
  | 'CURRENCY_CONVERT'
  | 'DATE_FORMAT'
  | 'ENUM_MAP'
  | 'CATEGORY_LOOKUP'
  | 'TEMPLATE';

export type CanonicalResource =
  | 'Product'
  | 'Listing'
  | 'File'
  | 'Variant'
  | 'Price'
  | 'Customer'
  | 'Order'
  | 'OrderItem'
  | 'Transaction'
  | 'Refund'
  | 'Fee'
  | 'Payout'
  | 'Affiliate'
  | 'Commission'
  | 'Coupon'
  | 'Campaign'
  | 'Webhook'
  | 'RoyaltyReport';

export type ConnectorErrorCategory =
  | 'AUTHENTICATION_FAILED'
  | 'AUTHORIZATION_FAILED'
  | 'RATE_LIMITED'
  | 'VALIDATION_FAILED'
  | 'RESOURCE_NOT_FOUND'
  | 'RESOURCE_CONFLICT'
  | 'DUPLICATE_RESOURCE'
  | 'POLICY_REJECTED'
  | 'FILE_REJECTED'
  | 'NETWORK_FAILURE'
  | 'MARKETPLACE_OUTAGE'
  | 'TEMPORARY_FAILURE'
  | 'PERMANENT_FAILURE'
  | 'CAPABILITY_NOT_SUPPORTED'
  | 'UNKNOWN_FAILURE';

// ========================================================
// CAPABILITY MATRIX SCHEMAS (§5)
// ========================================================

export interface CapabilityEvidence {
  capability: string;
  status: CapabilityStatus;
  source: string;
  documentationUrl?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  confidenceScore: number; // 0-100
  notes?: string;
}

export interface ConnectorCapabilities {
  // Product Management
  canCreateProduct: CapabilityStatus;
  canReadProduct: CapabilityStatus;
  canUpdateProduct: CapabilityStatus;
  canDeleteProduct: CapabilityStatus;
  canArchiveProduct: CapabilityStatus;
  canPauseProduct: CapabilityStatus;

  // Listings
  canCreateListing: CapabilityStatus;
  canReadListing: CapabilityStatus;
  canUpdateListing: CapabilityStatus;
  canPauseListing: CapabilityStatus;
  canDeleteListing: CapabilityStatus;
  canVerifyListing: CapabilityStatus;

  // Files
  canUploadFiles: CapabilityStatus;
  canReplaceFiles: CapabilityStatus;
  supportsPDF: CapabilityStatus;
  supportsEPUB: CapabilityStatus;
  supportsAudio: CapabilityStatus;
  supportsZIP: CapabilityStatus;

  // Pricing
  canSetPrice: CapabilityStatus;
  canUpdatePrice: CapabilityStatus;
  supportsTerritorialPricing: CapabilityStatus;
  supportsMultipleCurrencies: CapabilityStatus;
  supportsSalesPricing: CapabilityStatus;

  // Orders & Revenue
  canReadOrders: CapabilityStatus;
  canReadTransactions: CapabilityStatus;
  canReadFees: CapabilityStatus;
  canReadRefunds: CapabilityStatus;
  canReadPayouts: CapabilityStatus;
  canReadRoyalties: CapabilityStatus;

  // Customers & Affiliates
  canReadCustomer: CapabilityStatus;
  customerDataRestricted: CapabilityStatus;
  hasAffiliateProgram: CapabilityStatus;
  canReadAffiliates: CapabilityStatus;

  // Webhooks & Automation
  supportsWebhooks: CapabilityStatus;
  supportsIdempotency: CapabilityStatus;
  supportsSafeRetry: CapabilityStatus;
  supportsRollback: CapabilityStatus;
  supportsSandbox: CapabilityStatus;
}

// ========================================================
// MANIFEST & VERSIONING SCHEMAS (§3, §4)
// ========================================================

export interface ConnectorVersionInfo {
  connectorVersion: string; // e.g. "1.2.0"
  apiVersion: string;        // e.g. "v3.1"
  manifestVersion: string;   // e.g. "1.0.0"
  certificationVersion: string; // e.g. "2026.1"
  lastVerifiedAt: string;
  lastSuccessfulTestAt?: string;
  lastSuccessfulWriteAt?: string;
  changeLog?: string[];
}

export interface FieldMapping {
  drawdownField: string;
  targetField: string;
  transformRule: TransformRule;
  isRequired: boolean;
  sampleValue?: string;
  transformConfig?: Record<string, any>;
  notes?: string;
}

export interface ConnectorActionCertification {
  actionType: string; // e.g. 'READ_LISTINGS', 'CREATE_LISTING', 'UPDATE_PRICE'
  certLevel: ActionCertLevel;
  autopilotEligible: boolean;
  certifiedAt?: string;
  certifiedBy?: string;
  expiresAt?: string;
  notes?: string;
}

export interface RateLimitConfig {
  requestsPerSecond: number;
  requestsPerMinute: number;
  burstLimit: number;
  remainingRequests?: number;
  resetAt?: string;
}

export interface ConnectorManifest {
  id: string;
  name: string;
  category: ConnectorCategory;
  versionInfo: ConnectorVersionInfo;
  officialWebsite: string;
  officialDocsUrl: string;
  authType: 'OAUTH_2' | 'API_KEY' | 'BEARER_TOKEN' | 'WEBHOOK_ONLY' | 'MANUAL';
  capabilities: ConnectorCapabilities;
  capabilityEvidence: Record<string, CapabilityEvidence>;
  resources: CanonicalResource[];
  fieldMappings: FieldMapping[];
  actionCertifications: Record<string, ConnectorActionCertification>;
  rateLimits: RateLimitConfig;
  manualPortalUrl?: string;
  notes?: string;
}

// ========================================================
// ACTION EXECUTION & TELEMETRY CONTRACTS (§18, §19, §51)
// ========================================================

export interface ConnectorActionResult<T = any> {
  success: boolean;
  status: 'SUCCESS' | 'PARTIAL' | 'FAILED' | 'CAPABILITY_NOT_SUPPORTED';
  connectorId: string;
  operation: string;
  externalId?: string;
  internalEntityId?: string;
  requestId: string;
  durationMs: number;
  attempt: number;
  rateLimitRemaining?: number;
  warnings?: string[];
  result?: T;
  error?: {
    category: ConnectorErrorCategory;
    code: string;
    message: string;
    operatorActionRequired?: string;
    rawError?: any;
  };
  verificationRequired: boolean;
  timestamp: string;
}

export interface ConnectorTelemetryMetrics {
  connectorId: string;
  name: string;
  healthScore: number; // 0 - 100
  healthStatus: 'HEALTHY' | 'DEGRADED' | 'UNSTABLE' | 'DOWN' | 'AUTH_FAILURE' | 'RECERTIFICATION_REQUIRED';
  apiLatencyMs: number;
  successRatePct: number;
  lastSyncAt: string;
  lastSaleAt: string;
  webhookHealthPct: number;
  rateLimitUsedPct: number;
  circuitBreakerState: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  autopilotState: 'CERTIFIED' | 'PARTIAL' | 'BLOCKED';
}
