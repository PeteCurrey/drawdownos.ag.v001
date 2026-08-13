// DRAWDOWN OS — REVENUE SURFACE AUTOPILOT
// COMMERCIAL EXECUTION ENGINE DATA & TYPES SYSTEM
// Converts Revenue Surface Area intelligence into safe, auditable commercial execution.

import { SURFACE_CHANNELS, SURFACE_AREA_METRICS, PUBLICATION_SURFACE_PROFILES } from './surface-area-data';

// ========================================================
// 1. CORE TYPES & ENUMS
// ========================================================

export type AutopilotMode = 'OFF' | 'ADVISORY' | 'ASSISTED' | 'AUTOPILOT';

export type AutopilotStatus = 
  | 'OFF'
  | 'ADVISORY'
  | 'ASSISTED'
  | 'ACTIVE'
  | 'PAUSED'
  | 'DEGRADED'
  | 'EMERGENCY_STOP';

export type RiskClass = 'CLASS_A' | 'CLASS_B' | 'CLASS_C' | 'CLASS_D';

export type AutopilotActionStatus = 
  | 'PROPOSED'
  | 'ANALYSING'
  | 'READY'
  | 'APPROVAL_REQUIRED'
  | 'APPROVED'
  | 'QUEUED'
  | 'RUNNING'
  | 'VERIFYING'
  | 'COMPLETE'
  | 'PARTIAL'
  | 'BLOCKED'
  | 'FAILED'
  | 'CANCELLED'
  | 'ROLLED_BACK';

export type ConnectorCertStatus = 'UNCERTIFIED' | 'TESTING' | 'CERTIFIED' | 'SUSPENDED';

// ========================================================
// 2. POLICY ENGINE & COMMERCIAL GUARDRAILS
// ========================================================

export interface AutopilotPolicyConfig {
  mode: AutopilotMode;
  status: AutopilotStatus;
  
  // 10 Specific Autopilot Policy Toggles
  autoCreateListings: boolean;            // ON/OFF
  autoUpdateListings: boolean;            // ON/OFF
  autoSyncPrices: boolean;                // ON/OFF
  autoActivateAggregators: boolean;       // ON/OFF
  autoRetryFailedJobs: boolean;           // ON/OFF
  autoSyncAssets: boolean;                // ON/OFF
  autoUpdateAffiliateAssets: boolean;     // ON/OFF
  autoExecuteCampaigns: boolean;          // ON/OFF
  autoPauseOnBlocking: boolean;           // ON/OFF
  autoDerivativeCreation: 'DRAFT_ONLY' | 'OFF';
  autoTranslation: 'DRAFT_ONLY' | 'OFF';
  
  // Guardrails
  minProductPriceGbp: number;             // e.g. 9.99
  maxAutonomousDiscountPct: number;       // e.g. 20%
  maxAutonomousPriceChangePct: number;    // e.g. 10%
  minNetMarginPct: number;                // e.g. 60%
  maxMarketplaceFeePct: number;           // e.g. 35%
  maxAffiliateCommissionPct: number;      // e.g. 40%
  allowedCurrencies: string[];            // ['GBP', 'USD', 'EUR']
  allowedTerritories: string[];           // ['GB', 'US', 'CA', 'AU', 'DE', 'FR', 'ES']
  allowedMarketplaces: string[];          // Allowed marketplace IDs
  allowedAggregators: string[];           // Allowed aggregator IDs
}

export const DEFAULT_AUTOPILOT_POLICY: AutopilotPolicyConfig = {
  mode: 'ADVISORY',
  status: 'ADVISORY',
  autoCreateListings: false,
  autoUpdateListings: true,
  autoSyncPrices: false,
  autoActivateAggregators: true,
  autoRetryFailedJobs: true,
  autoSyncAssets: true,
  autoUpdateAffiliateAssets: true,
  autoExecuteCampaigns: false,
  autoPauseOnBlocking: true,
  autoDerivativeCreation: 'DRAFT_ONLY',
  autoTranslation: 'DRAFT_ONLY',
  
  minProductPriceGbp: 9.99,
  maxAutonomousDiscountPct: 20.00,
  maxAutonomousPriceChangePct: 10.00,
  minNetMarginPct: 60.00,
  maxMarketplaceFeePct: 35.00,
  maxAffiliateCommissionPct: 40.00,
  allowedCurrencies: ['GBP', 'USD', 'EUR', 'AUD', 'CAD'],
  allowedTerritories: ['GB', 'US', 'CA', 'AU', 'DE', 'FR', 'ES', 'NL', 'NZ'],
  allowedMarketplaces: ['ch-whop'],
  allowedAggregators: ['ch-publishdrive', 'ch-draft2digital'],
};

// ========================================================
// 3. CLASS D — PROHIBITED AUTONOMOUS ACTIONS (§4)
// ========================================================

export const PROHIBITED_CLASS_D_ACTIONS = [
  'Accept marketplace terms and conditions',
  'Sign contracts or legal agreements',
  'Provide legal declarations or indemnities',
  'Complete KYC or upload identity documents',
  'Provide beneficial-owner declarations',
  'Submit tax declarations or tax forms (W-8BEN / W-9)',
  'Change banking details or payout accounts',
  'Open financial or credit accounts',
  'Accept financing or merchant cash advances',
  'Provide false or inferred legal information',
  'Agree to exclusive distribution waivers',
  'Waive intellectual property rights',
  'Resolve legal disputes or IP claims',
  'Override compliance blocks manually',
  'Fabricate marketplace information',
  'Delete accounting or ledger records',
  'Permanently delete publications or editions',
  'Issue material refunds without human approval',
  'Create investment returns or income promises',
  'Bypass marketplace security restrictions or CAPTCHAs',
];

// ========================================================
// 4. CONNECTOR CERTIFICATION MATRIX (§53)
// ========================================================

export interface ConnectorCertification {
  marketplaceId: string;
  name: string;
  status: ConnectorCertStatus;
  capabilityVerified: boolean;
  credentialsTested: boolean;
  sandboxTested: boolean;
  idempotencyTested: boolean;
  errorHandlingTested: boolean;
  rateLimitsVerified: boolean;
  rollbackSupported: boolean;
  lastTestedAt: string;
  notes: string;
}

export const CONNECTOR_CERTIFICATIONS: ConnectorCertification[] = [
  {
    marketplaceId: 'ch-publishdrive',
    name: 'PublishDrive Aggregator API',
    status: 'CERTIFIED',
    capabilityVerified: true,
    credentialsTested: true,
    sandboxTested: true,
    idempotencyTested: true,
    errorHandlingTested: true,
    rateLimitsVerified: true,
    rollbackSupported: true,
    lastTestedAt: '2026-08-10 14:00',
    notes: 'Fully certified for automated destination toggles and metadata updates.',
  },
  {
    marketplaceId: 'ch-amazon-kdp',
    name: 'Amazon KDP Content API',
    status: 'CERTIFIED',
    capabilityVerified: true,
    credentialsTested: true,
    sandboxTested: true,
    idempotencyTested: true,
    errorHandlingTested: true,
    rateLimitsVerified: true,
    rollbackSupported: true,
    lastTestedAt: '2026-08-11 09:30',
    notes: 'KDP Select API integration verified. Price updates limited to 10% daily drift.',
  },
  {
    marketplaceId: 'ch-whop',
    name: 'Whop Direct API',
    status: 'CERTIFIED',
    capabilityVerified: true,
    credentialsTested: true,
    sandboxTested: true,
    idempotencyTested: true,
    errorHandlingTested: true,
    rateLimitsVerified: true,
    rollbackSupported: true,
    lastTestedAt: '2026-08-12 11:15',
    notes: 'Native webhooks + REST API certified. 100% automated lifecycle support.',
  },
  {
    marketplaceId: 'ch-etsy',
    name: 'Etsy v3 API',
    status: 'CERTIFIED',
    capabilityVerified: true,
    credentialsTested: true,
    sandboxTested: true,
    idempotencyTested: true,
    errorHandlingTested: true,
    rateLimitsVerified: true,
    rollbackSupported: false,
    lastTestedAt: '2026-08-09 16:45',
    notes: 'Rollback not supported natively by Etsy API (requires manual draft state restore).',
  },
  {
    marketplaceId: 'ch-hotmart',
    name: 'Hotmart Developers API',
    status: 'TESTING',
    capabilityVerified: true,
    credentialsTested: true,
    sandboxTested: true,
    idempotencyTested: false,
    errorHandlingTested: true,
    rateLimitsVerified: false,
    rollbackSupported: true,
    lastTestedAt: '2026-08-12 15:20',
    notes: 'Sandbox testing in progress for LATAM tax handling.',
  },
  {
    marketplaceId: 'ch-clickbank',
    name: 'ClickBank Marketplace API',
    status: 'SUSPENDED',
    capabilityVerified: true,
    credentialsTested: false,
    sandboxTested: false,
    idempotencyTested: false,
    errorHandlingTested: false,
    rateLimitsVerified: false,
    rollbackSupported: false,
    lastTestedAt: '2026-08-01 10:00',
    notes: 'Suspended pending compliance rule resolution on income claim disclaimer.',
  },
];

// ========================================================
// 5. ACTION PLAN & EXECUTABLE ACTION ENTITIES (§11)
// ========================================================

export interface DryRunFieldDiff {
  fieldName: string;
  existingValue: string;
  proposedValue: string;
  policyCheck: 'PASS' | 'WARN' | 'FAIL';
  note?: string;
}

export interface DryRunResult {
  passed: boolean;
  channelName: string;
  diffs: DryRunFieldDiff[];
  complianceResult: 'PASSED' | 'REVIEW_REQUIRED' | 'BLOCKING_ISSUE';
  policyResult: 'PASS' | 'BLOCK';
  policyBlockReason?: string;
  distributionCollision: boolean;
  estimatedApiLatencyMs: number;
}

export interface AutopilotAction {
  id: string;
  planId?: string;
  publicationId: string;
  canonicalId: string;
  publicationTitle: string;
  marketplaceId?: string;
  marketplaceName: string;
  actionType: 
    | 'ACTIVATE_CHANNEL'
    | 'SYNC_PRICE'
    | 'UPDATE_METADATA'
    | 'GENERATE_EPUB'
    | 'CLEAR_COMPLIANCE'
    | 'ENABLE_AFFILIATE'
    | 'RETRY_SYNC'
    | 'PAUSE_LISTING'
    | 'CREATE_SUBMISSION_PACK';
  entityType: 'PUBLICATION' | 'LISTING' | 'FORMAT' | 'PRICING' | 'AFFILIATE' | 'AGGREGATOR';
  entityId: string;
  riskClass: RiskClass;
  automationEligibility: boolean;
  requiredPermissions: string[];
  dependencies: string[]; // Action IDs that must complete first
  expectedSurfaceUnlock: number; // e.g. +3.1 pts
  estimatedMonthlyUpliftUsd: number; // e.g. $14,000
  opportunityScore: number;
  confidenceScore: number; // 0 - 100
  status: AutopilotActionStatus;
  executionMode: AutopilotMode;
  description: string;
  whyExplanation: string; // "Why did Autopilot do/propose this?"
  
  // Technical Diffs & Execution States
  dryRunResult?: DryRunResult;
  policyCheckPassed: boolean;
  policyBlockReason?: string;
  compliancePassed: boolean;
  errorMessage?: string;
  retryCount: number;
  maxRetries: number;
  
  // Timestamps
  createdAt: string;
  scheduledAt?: string;
  executedAt?: string;
  verifiedAt?: string;
  rolledBackAt?: string;
}

export interface AutopilotPlan {
  id: string;
  publicationId?: string;
  canonicalId?: string;
  objectiveType: 'TARGET_RSA' | 'EASY_WINS' | 'ENGLISH_GLOBAL' | 'REDUCE_DORMANT';
  objectiveLabel: string; // e.g. "GET ME TO 60% RSA"
  createdBy: string;
  mode: AutopilotMode;
  status: 'PROPOSED' | 'APPROVED' | 'RUNNING' | 'COMPLETED' | 'PAUSED' | 'CANCELLED';
  currentRsa: number;
  targetRsa: number;
  projectedRsa: number;
  estimatedActions: number;
  estimatedEffortDays: number;
  actions: AutopilotAction[];
  createdAt: string;
  approvedAt?: string;
  completedAt?: string;
}

// ========================================================
// 6. HUMAN APPROVAL ITEM ENTITY (§14)
// ========================================================

export interface AutopilotApprovalItem {
  id: string;
  actionId: string;
  publicationCanonicalId: string;
  publicationTitle: string;
  marketplaceId: string;
  marketplaceName: string;
  riskClass: RiskClass;
  actionSummary: string;
  whyAutopilotWantsThis: string;
  expectedSurfaceUnlock: number;
  estimatedMonthlyUpliftUsd: number;
  confidenceScore: number;
  dryRunSummary: DryRunResult;
  files: string[];
  copySnippet: string;
  priceDetails: { currency: string; existing: number; proposed: number };
  complianceResult: 'PASSED' | 'REVIEW_REQUIRED' | 'BLOCKING_ISSUE';
  dependencies: string[]; // Dependency statuses
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DEFERRED';
  decisionBy?: string;
  decisionAt?: string;
  decisionNotes?: string;
  createdAt: string;
}

// ========================================================
// 7. CIRCUIT BREAKER & SYSTEM INCIDENTS (§19)
// ========================================================

export interface CircuitBreakerStatus {
  id: string;
  marketplaceId: string;
  marketplaceName: string;
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  failureCount: number;
  failureThreshold: number;
  lastFailureAt?: string;
  openedAt?: string;
  resetTimeoutSec: number;
  reason: string;
}

// ========================================================
// 8. ACTIVITY FEED & METRICS (§10, §36, §51)
// ========================================================

export interface AutopilotActivityEvent {
  id: string;
  timestamp: string;
  actionId?: string;
  marketplaceName: string;
  eventType: 'EXECUTION' | 'VERIFICATION' | 'APPROVAL_REQ' | 'POLICY_BLOCK' | 'CIRCUIT_OPEN' | 'RETRY' | 'RSA_UNLOCK';
  riskClass: RiskClass;
  message: string;
  surfaceUnlocked?: number;
  isDemo: boolean;
}

export interface AutopilotDailySummary {
  date: string;
  actionsCompletedToday: number;
  listingsVerified: number;
  listingsUpdated: number;
  destinationsActivated: number;
  pricesSynchronised: number;
  failedJobsRepaired: number;
  rsaPointsCapturedToday: number;
  trackedRevenueAffectedUsd: number;
  approvalsRequiredCount: number;
  policyBlocksCount: number;
  largestOpportunityName: string;
  largestOpportunityValueUsd: number;
  hoursSavedEstimate: number;
}

// ========================================================
// 9. SEED DEMO DATA
// ========================================================

export const DEMO_CIRCUIT_BREAKERS: CircuitBreakerStatus[] = [
  {
    id: 'cb-1',
    marketplaceId: 'ch-etsy',
    marketplaceName: 'Etsy Digital Downloads',
    state: 'CLOSED',
    failureCount: 0,
    failureThreshold: 5,
    resetTimeoutSec: 600,
    reason: 'Connector operating normally. 0 errors in last 24h.',
  },
  {
    id: 'cb-2',
    marketplaceId: 'ch-clickbank',
    marketplaceName: 'ClickBank Marketplace',
    state: 'OPEN',
    failureCount: 5,
    failureThreshold: 5,
    lastFailureAt: '2026-08-12 18:30',
    openedAt: '2026-08-12 18:30',
    resetTimeoutSec: 600,
    reason: '5 consecutive API compliance validation rejections. Autopilot write operations paused.',
  },
];

export const DEMO_AUTOPILOT_ACTIONS: AutopilotAction[] = [
  {
    id: 'act-001',
    planId: 'plan-001',
    publicationId: 'pub-001-dd-htt-001',
    canonicalId: 'DD-HTT-001',
    publicationTitle: 'HOW TO TRADE',
    marketplaceId: 'ch-publishdrive',
    marketplaceName: 'PublishDrive Aggregator',
    actionType: 'ACTIVATE_CHANNEL',
    entityType: 'AGGREGATOR',
    entityId: 'pd-6-destinations',
    riskClass: 'CLASS_A',
    automationEligibility: true,
    requiredPermissions: ['distribution.write'],
    dependencies: [],
    expectedSurfaceUnlock: 3.1,
    estimatedMonthlyUpliftUsd: 9200,
    opportunityScore: 83,
    confidenceScore: 98,
    status: 'COMPLETE',
    executionMode: 'AUTOPILOT',
    description: 'Enable 6 pre-approved PublishDrive destinations (Kobo, Apple Books, Baker & Taylor, etc.)',
    whyExplanation: 'Destination approved, EPUB master validated, aggregator connected, zero compliance blockers, Class A safe automation.',
    policyCheckPassed: true,
    compliancePassed: true,
    retryCount: 0,
    maxRetries: 3,
    createdAt: '2026-08-12 18:00',
    executedAt: '2026-08-12 18:58',
    verifiedAt: '2026-08-12 18:59',
  },
  {
    id: 'act-002',
    planId: 'plan-001',
    publicationId: 'pub-001-dd-htt-001',
    canonicalId: 'DD-HTT-001',
    publicationTitle: 'HOW TO TRADE',
    marketplaceId: 'ch-amazon-kdp',
    marketplaceName: 'Amazon KDP UK',
    actionType: 'UPDATE_METADATA',
    entityType: 'LISTING',
    entityId: 'kdp-dd-htt-001',
    riskClass: 'CLASS_A',
    automationEligibility: true,
    requiredPermissions: ['catalog.write'],
    dependencies: [],
    expectedSurfaceUnlock: 0.8,
    estimatedMonthlyUpliftUsd: 1800,
    opportunityScore: 88,
    confidenceScore: 96,
    status: 'COMPLETE',
    executionMode: 'AUTOPILOT',
    description: 'Synchronise approved V1.2 subtitle and BISAC category codes',
    whyExplanation: 'Listing metadata drift detected. Field mappings exact, approved copy source, Class A pre-authorised update.',
    policyCheckPassed: true,
    compliancePassed: true,
    retryCount: 0,
    maxRetries: 3,
    createdAt: '2026-08-12 18:30',
    executedAt: '2026-08-12 19:02',
    verifiedAt: '2026-08-12 19:03',
  },
  {
    id: 'act-003',
    planId: 'plan-001',
    publicationId: 'pub-001-dd-htt-001',
    canonicalId: 'DD-HTT-001',
    publicationTitle: 'HOW TO TRADE',
    marketplaceId: 'ch-etsy',
    marketplaceName: 'Etsy Digital Shop',
    actionType: 'CREATE_SUBMISSION_PACK',
    entityType: 'LISTING',
    entityId: 'etsy-workbook-v1',
    riskClass: 'CLASS_B',
    automationEligibility: true,
    requiredPermissions: ['catalog.write'],
    dependencies: [],
    expectedSurfaceUnlock: 2.4,
    estimatedMonthlyUpliftUsd: 3100,
    opportunityScore: 78,
    confidenceScore: 92,
    status: 'APPROVAL_REQUIRED',
    executionMode: 'ASSISTED',
    description: 'Publish Etsy Workbook digital package variant for HOW TO TRADE',
    whyExplanation: 'Class B action requires Pete approval under ASSISTED mode policy settings.',
    dryRunResult: {
      passed: true,
      channelName: 'Etsy Digital Shop',
      diffs: [
        { fieldName: 'Title', existingValue: '(New Listing)', proposedValue: 'HOW TO TRADE — Institutional Risk & Price Action Workbook', policyCheck: 'PASS' },
        { fieldName: 'Price', existingValue: '£0.00', proposedValue: '£29.99', policyCheck: 'PASS', note: 'Within allowed price range (£9.99 - £99.00)' },
        { fieldName: 'Files Attached', existingValue: '0', proposedValue: '2 files (Workbook PDF + Risk Calculator Sheet)', policyCheck: 'PASS' },
      ],
      complianceResult: 'PASSED',
      policyResult: 'PASS',
      distributionCollision: false,
      estimatedApiLatencyMs: 420,
    },
    policyCheckPassed: true,
    compliancePassed: true,
    retryCount: 0,
    maxRetries: 3,
    createdAt: '2026-08-12 18:50',
  },
  {
    id: 'act-004',
    planId: 'plan-001',
    publicationId: 'pub-001-dd-htt-001',
    canonicalId: 'DD-HTT-001',
    publicationTitle: 'HOW TO TRADE',
    marketplaceId: 'ch-hotmart',
    marketplaceName: 'Hotmart LATAM',
    actionType: 'ACTIVATE_CHANNEL',
    entityType: 'LISTING',
    entityId: 'hotmart-latam-es',
    riskClass: 'CLASS_C',
    automationEligibility: false,
    requiredPermissions: ['distribution.write', 'compliance.approve'],
    dependencies: ['act-007-spanish-epub'], // Requires Spanish EPUB translation QA approval
    expectedSurfaceUnlock: 4.6,
    estimatedMonthlyUpliftUsd: 12000,
    opportunityScore: 92,
    confidenceScore: 88,
    status: 'APPROVAL_REQUIRED',
    executionMode: 'ADVISORY',
    description: 'Launch Spanish edition of HOW TO TRADE on Hotmart (Spain & LATAM)',
    whyExplanation: 'Class C Action (first publication to new regional distributor). Requires human approval + translation QA clearance.',
    dryRunResult: {
      passed: true,
      channelName: 'Hotmart LATAM',
      diffs: [
        { fieldName: 'Language', existingValue: 'en', proposedValue: 'es', policyCheck: 'PASS' },
        { fieldName: 'Suggested Retail Price', existingValue: '$0.00', proposedValue: '$49.00 USD', policyCheck: 'PASS' },
        { fieldName: 'Affiliate Commission', existingValue: '0%', proposedValue: '30%', policyCheck: 'PASS', note: 'Within 40% max affiliate policy threshold' },
      ],
      complianceResult: 'PASSED',
      policyResult: 'PASS',
      distributionCollision: false,
      estimatedApiLatencyMs: 650,
    },
    policyCheckPassed: true,
    compliancePassed: true,
    retryCount: 0,
    maxRetries: 3,
    createdAt: '2026-08-12 18:45',
  },
  {
    id: 'act-005',
    planId: 'plan-001',
    publicationId: 'pub-001-dd-htt-001',
    canonicalId: 'DD-HTT-001',
    publicationTitle: 'HOW TO TRADE',
    marketplaceId: 'ch-clickbank',
    marketplaceName: 'ClickBank Marketplace',
    actionType: 'CLEAR_COMPLIANCE',
    entityType: 'PRICING',
    entityId: 'cb-income-disclaimer',
    riskClass: 'CLASS_C',
    automationEligibility: false,
    requiredPermissions: ['compliance.approve'],
    dependencies: [],
    expectedSurfaceUnlock: 5.2,
    estimatedMonthlyUpliftUsd: 14000,
    opportunityScore: 95,
    confidenceScore: 85,
    status: 'BLOCKED',
    executionMode: 'ADVISORY',
    description: 'Resolve income claim disclaimer rule for ClickBank affiliate onboarding',
    whyExplanation: 'Policy block: Unresolved INCOME_CLAIM compliance warning in ClickBank promo copy. Requires manual copy edit.',
    policyCheckPassed: false,
    policyBlockReason: 'POLICY BLOCK: Promotional copy contains unverified earnings claim ("Achieve 84% win rate"). Must be edited or waived by Compliance Officer.',
    compliancePassed: false,
    retryCount: 0,
    maxRetries: 0,
    createdAt: '2026-08-12 18:40',
  },
];

export const DEMO_AUTOPILOT_PLANS: AutopilotPlan[] = [
  {
    id: 'plan-001',
    publicationId: 'pub-001-dd-htt-001',
    canonicalId: 'DD-HTT-001',
    objectiveType: 'TARGET_RSA',
    objectiveLabel: 'GET HOW TO TRADE TO 60% REVENUE SURFACE',
    createdBy: 'Pete Currey',
    mode: 'ASSISTED',
    status: 'RUNNING',
    currentRsa: 38.0,
    targetRsa: 60.0,
    projectedRsa: 60.7,
    estimatedActions: 5,
    estimatedEffortDays: 8,
    actions: DEMO_AUTOPILOT_ACTIONS,
    createdAt: '2026-08-12 17:30',
    approvedAt: '2026-08-12 17:45',
  },
];

export const DEMO_APPROVAL_ITEMS: AutopilotApprovalItem[] = [
  {
    id: 'appr-101',
    actionId: 'act-003',
    publicationCanonicalId: 'DD-HTT-001',
    publicationTitle: 'HOW TO TRADE',
    marketplaceId: 'ch-etsy',
    marketplaceName: 'Etsy Digital Shop',
    riskClass: 'CLASS_B',
    actionSummary: 'Publish Etsy Workbook digital package variant (£29.99)',
    whyAutopilotWantsThis: 'Etsy retail buyers show 4.2× higher conversion for PDF + Workbook bundles vs standalone PDF.',
    expectedSurfaceUnlock: 2.4,
    estimatedMonthlyUpliftUsd: 3100,
    confidenceScore: 92,
    dryRunSummary: {
      passed: true,
      channelName: 'Etsy Digital Shop',
      diffs: [
        { fieldName: 'Title', existingValue: '(New Listing)', proposedValue: 'HOW TO TRADE — Institutional Risk & Price Action Workbook', policyCheck: 'PASS' },
        { fieldName: 'Price', existingValue: '£0.00', proposedValue: '£29.99', policyCheck: 'PASS' },
        { fieldName: 'Delivery Mode', existingValue: 'Manual Email', proposedValue: 'Instant Digital Download (R2 Secured URL)', policyCheck: 'PASS' },
      ],
      complianceResult: 'PASSED',
      policyResult: 'PASS',
      distributionCollision: false,
      estimatedApiLatencyMs: 420,
    },
    files: ['DD-HTT-001-WORKBOOK-V1.pdf', 'DD-HTT-POSITION-CALCULATOR.xlsx'],
    copySnippet: 'Institutional risk playbook workbook containing 45 exercises, position sizing tables, and drawdown recovery models.',
    priceDetails: { currency: 'GBP', existing: 0.00, proposed: 29.99 },
    complianceResult: 'PASSED',
    dependencies: ['Format QA Approved ✓', 'Master PDF Provenance Verified ✓'],
    status: 'PENDING',
    createdAt: '2026-08-12 18:50',
  },
  {
    id: 'appr-102',
    actionId: 'act-004',
    publicationCanonicalId: 'DD-HTT-001',
    publicationTitle: 'HOW TO TRADE',
    marketplaceId: 'ch-hotmart',
    marketplaceName: 'Hotmart LATAM',
    riskClass: 'CLASS_C',
    actionSummary: 'Launch Spanish edition on Hotmart ($49.00 USD, 30% affiliate comm.)',
    whyAutopilotWantsThis: 'Spanish LATAM trading education market estimated at $12k-$25k/mo. Hotmart is dominant regional distributor.',
    expectedSurfaceUnlock: 4.6,
    estimatedMonthlyUpliftUsd: 12000,
    confidenceScore: 88,
    dryRunSummary: {
      passed: true,
      channelName: 'Hotmart LATAM',
      diffs: [
        { fieldName: 'Language', existingValue: 'en', proposedValue: 'es', policyCheck: 'PASS' },
        { fieldName: 'Price', existingValue: '$0.00', proposedValue: '$49.00 USD', policyCheck: 'PASS' },
        { fieldName: 'Affiliate Comm.', existingValue: '0%', proposedValue: '30%', policyCheck: 'PASS' },
      ],
      complianceResult: 'PASSED',
      policyResult: 'PASS',
      distributionCollision: false,
      estimatedApiLatencyMs: 650,
    },
    files: ['DD-HTT-001-ES-V1.2.epub', 'COVER-SPANISH-HIGHRES.jpg'],
    copySnippet: 'Cómo Operar: El manual definitivo de gestión de riesgo institucional, acción del precio y control de drawdown.',
    priceDetails: { currency: 'USD', existing: 0.00, proposed: 49.00 },
    complianceResult: 'PASSED',
    dependencies: ['Spanish Translation QA Approved ✓', 'Regional Price Verified ✓'],
    status: 'PENDING',
    createdAt: '2026-08-12 18:45',
  },
];

export const DEMO_AUTOPILOT_ACTIVITIES: AutopilotActivityEvent[] = [
  { id: 'ev-1', timestamp: '19:04', marketplaceName: 'All Channels', eventType: 'VERIFICATION', riskClass: 'CLASS_A', message: 'Verified 42 live listings across 12 connected channels. 0 drift detected.', isDemo: true },
  { id: 'ev-2', timestamp: '19:02', marketplaceName: 'Amazon KDP UK', eventType: 'EXECUTION', riskClass: 'CLASS_A', message: 'Google Books & KDP metadata synced automatically (V1.2 subtitle & categories).', isDemo: true },
  { id: 'ev-3', timestamp: '18:58', marketplaceName: 'PublishDrive Aggregator', eventType: 'EXECUTION', riskClass: 'CLASS_A', message: 'Enabled 6 PublishDrive library destinations.', surfaceUnlocked: 3.1, isDemo: true },
  { id: 'ev-4', timestamp: '18:56', marketplaceName: 'Kobo Store', eventType: 'POLICY_BLOCK', riskClass: 'CLASS_B', message: 'Autonomous price change blocked: proposed £6.99 is below minimum policy price (£9.99).', isDemo: true },
  { id: 'ev-5', timestamp: '18:51', marketplaceName: 'Etsy Digital Shop', eventType: 'APPROVAL_REQ', riskClass: 'CLASS_B', message: 'Etsy listing prepared — awaiting human approval from Pete.', isDemo: true },
  { id: 'ev-6', timestamp: '18:47', marketplaceName: 'Format Engine', eventType: 'EXECUTION', riskClass: 'CLASS_A', message: 'New reflowable EPUB derivative generated from DD-HTT-001 V1.2 source.', isDemo: true },
  { id: 'ev-7', timestamp: '18:42', marketplaceName: 'Amazon KDP UK', eventType: 'VERIFICATION', riskClass: 'CLASS_A', message: 'Amazon listing health check passed. Cover art checksum matched.', isDemo: true },
  { id: 'ev-8', timestamp: '18:30', marketplaceName: 'ClickBank Marketplace', eventType: 'CIRCUIT_OPEN', riskClass: 'CLASS_C', message: 'Circuit breaker OPENED for ClickBank API (5 consecutive compliance rejections). Writes paused.', isDemo: true },
];

export const DEMO_DAILY_SUMMARY: AutopilotDailySummary = {
  date: '2026-08-12',
  actionsCompletedToday: 17,
  listingsVerified: 42,
  listingsUpdated: 4,
  destinationsActivated: 3,
  pricesSynchronised: 1,
  failedJobsRepaired: 2,
  rsaPointsCapturedToday: 3.9,
  trackedRevenueAffectedUsd: 11000,
  approvalsRequiredCount: 2,
  policyBlocksCount: 1,
  largestOpportunityName: 'ClickBank Finance Affiliate Network',
  largestOpportunityValueUsd: 14000,
  hoursSavedEstimate: 6.5,
};
