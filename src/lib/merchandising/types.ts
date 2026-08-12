/**
 * DRAWDOWN OS — AUTONOMOUS LISTING & MERCHANDISING ENGINE
 * Type Definitions & SDK Interface
 */

export type ListingState =
  | 'DRAFT'
  | 'GENERATING'
  | 'NEEDS_REVIEW'
  | 'COMPLIANCE_REVIEW'
  | 'APPROVED'
  | 'QUEUED'
  | 'PUBLISHING'
  | 'LIVE'
  | 'LIVE_UNVERIFIED'
  | 'STALE'
  | 'DRIFTED'
  | 'OPTIMISING'
  | 'PAUSED'
  | 'REJECTED'
  | 'FAILED'
  | 'REMOVED'
  | 'ARCHIVED';

export type PerformanceState =
  | 'NO_DATA'
  | 'NEW'
  | 'LEARNING'
  | 'HEALTHY'
  | 'HIGH_PERFORMING'
  | 'UNDERPERFORMING'
  | 'DECLINING'
  | 'DORMANT'
  | 'REVIEW_REQUIRED';

export type DriftSeverity = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type SearchIntentCategory = 'INFORMATIONAL' | 'COMMERCIAL' | 'TRANSACTIONAL' | 'NAVIGATIONAL' | 'PRODUCT_SPECIFIC' | 'PROBLEM_SPECIFIC';
export type SearchSourceType = 'OBSERVED' | 'RESEARCHED' | 'SUGGESTED';
export type ExperimentType = 'A_B' | 'SEQUENTIAL' | 'BEFORE_AFTER' | 'MARKETPLACE_NATIVE' | 'MANUAL';
export type ExperimentConfidence = 'INSUFFICIENT_DATA' | 'DIRECTIONAL' | 'MODERATE_CONFIDENCE' | 'HIGH_CONFIDENCE';
export type VocabularyClassification = 'APPROVED' | 'PREFERRED' | 'AVOID' | 'PROHIBITED';

export interface MarketplaceMerchandisingProfile {
  id: string;
  marketplaceId: string;
  marketplaceName: string;
  primaryBuyerBehaviours: string[];
  titleLimit: number;
  subtitleLimit?: number;
  shortDescriptionLimit: number;
  longDescriptionLimit: number;
  htmlSupported: boolean;
  bulletsSupported: boolean;
  maxBullets: number;
  tagsSupported: boolean;
  maxTags: number;
  maxGalleryImages: number;
  requiresRiskWarning: boolean;
  requiresDisclaimer: boolean;
  sampleTypesSupported: string[];
  automationEligible: boolean;
}

export interface MerchandisingStrategy {
  id: string;
  productId: string;
  productSku: string;
  marketplaceId: string;
  primaryAudience: string;
  secondaryAudience?: string;
  primaryCustomerJob: string;
  primaryCommercialAngle: string;
  secondaryCommercialAngle?: string;
  primaryValueProp: string;
  supportingValueProps: string[];
  differentiators: string[];
  primaryCta: string;
  tone: string;
  prohibitedClaims: string[];
  riskDisclosures: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MarketplacePositioning {
  id: string;
  merchandisingStrategyId: string;
  productSku: string;
  marketplaceId: string;
  headline: string;
  subheadline?: string;
  keyBenefits: string[];
  whoItIsFor: string[];
  whoItIsNotFor: string[];
  pricePositioning: string;
  sampleStrategy: string;
  bundleRecommendation?: string;
}

export interface MarketplaceListing {
  id: string;
  productId: string;
  productSku: string;
  productName: string;
  productVariantId?: string;
  marketplaceId: string;
  marketplaceName: string;
  marketplaceAccountId?: string;
  territoryId: string;
  languageId: string;
  distributionRouteId?: string;
  externalListingId?: string;
  externalUrl?: string;
  listingVersion: number;
  status: ListingState;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NEEDS_REVISION';
  complianceStatus: 'PASS' | 'WARN' | 'BLOCK' | 'PENDING';
  publicationStatus: 'NOT_PUBLISHED' | 'QUEUED' | 'PUBLISHING' | 'LIVE' | 'FAILED';
  merchandisingStrategyId?: string;
  activeExperimentId?: string;
  currentPriceId?: string;
  currentAssetSetId?: string;
  discoverabilityScore: number;
  listingQualityScore: number;
  performanceState: PerformanceState;
  netRevenueGbp: number;
  conversionRatePct: number;
  refundRatePct: number;
  isDrifted: boolean;
  driftSeverity?: DriftSeverity;
  lastSyncedAt?: string;
  lastVerifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MarketplaceListingVersion {
  id: string;
  listingId: string;
  version: number;
  title: string;
  subtitle?: string;
  shortDescription?: string;
  longDescription?: string;
  bullets: string[];
  keywords: string[];
  tags: string[];
  categories: string[];
  priceGbp: number;
  priceUsd: number;
  priceEur: number;
  assets: Array<{ position: number; purpose: string; url: string; label: string }>;
  sampleStrategy?: string;
  ctaText?: string;
  disclosures: string[];
  metadata: Record<string, unknown>;
  reasonForChange: string;
  sourceStrategyId?: string;
  createdBy: string;
  approvedBy?: string;
  publishedAt?: string;
  supersededAt?: string;
  createdAt: string;
}

export interface ListingCopyVariant {
  id: string;
  listingId: string;
  fieldName: 'title' | 'subtitle' | 'short_desc' | 'long_desc' | 'bullets';
  variantText: string;
  characterCount: number;
  characterLimit: number;
  isCondensed: boolean;
  contentFidelity: 'SOURCE_DERIVED' | 'AI_GENERATED' | 'EDITORIALLY_CREATED' | 'MARKETING_CONTENT';
  sourceChunkIds: string[];
  approvedClaimIds: string[];
  status: 'GENERATED' | 'EDITORIAL_REVIEW' | 'COMPLIANCE_REVIEW' | 'APPROVED' | 'LOCKED' | 'LIVE' | 'SUPERSEDED';
}

export interface SearchTerm {
  id: string;
  term: string;
  marketplaceId: string;
  territoryId: string;
  languageId: string;
  productSku: string;
  intentCategory: SearchIntentCategory;
  sourceType: SearchSourceType;
  volumeEstimate?: number;
  competitionLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  performanceCtr?: number;
  isApproved: boolean;
  isBlocked: boolean;
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  lastCheckedAt: string;
}

export interface GallerySequenceItem {
  id: string;
  listingId: string;
  position: number;
  purpose: 'COVER' | 'WHAT_IS_INCLUDED' | 'INSIDE_PAGES' | 'PROGRAMME' | 'WORKSHEETS' | 'RISK_WARNING' | 'FORMAT' | 'AUDIENCE';
  assetId: string;
  assetUrl: string;
  label: string;
  overlayMessage?: string;
  ctaText?: string;
  status: 'READY' | 'MISSING' | 'STALE';
}

export interface ListingPrice {
  id: string;
  listingId: string;
  productSku: string;
  marketplaceId: string;
  basePriceGbp: number;
  marketplacePriceGbp: number;
  minPriceFloorGbp: number;
  autopilotFloorGbp: number;
  estimatedPlatformFeePct: number;
  estimatedNetProceedsGbp: number;
  netMarginPct: number;
  priceParityStatus: 'OK' | 'DISCREPANCY_WARNING' | 'PARITY_VIOLATION';
}

export interface MerchandisingExperiment {
  id: string;
  listingId: string;
  productSku: string;
  productName: string;
  marketplaceId: string;
  marketplaceName: string;
  experimentName: string;
  hypothesis: string;
  testType: ExperimentType;
  variableTested: 'TITLE' | 'SUBTITLE' | 'COVER' | 'GALLERY_ORDER' | 'DESCRIPTION' | 'PRICE' | 'SAMPLE' | 'OFFER';
  controlVariant: { label: string; details: string };
  testVariant: { label: string; details: string };
  successMetric: 'NET_REVENUE' | 'CONVERSION' | 'GROSS_REVENUE' | 'UNITS' | 'CTR';
  guardrailMetrics: string[];
  startAt: string;
  endAt?: string;
  minDurationDays: number;
  status: 'DRAFT' | 'RUNNING' | 'COMPLETED' | 'INCONCLUSIVE' | 'CANCELLED';
  confidenceLevel: ExperimentConfidence;
  winnerVariant?: 'CONTROL' | 'VARIANT' | 'INCONCLUSIVE';
  decisionReason?: string;
  createdAt: string;
}

export interface ListingDriftEvent {
  id: string;
  listingId: string;
  productSku: string;
  marketplaceId: string;
  fieldDrifted: string;
  expectedValue: string;
  liveValue: string;
  severity: DriftSeverity;
  detectedAt: string;
  resolvedAt?: string;
  resolutionAction?: string;
}

export interface MerchandisingRecommendation {
  id: string;
  listingId: string;
  productSku: string;
  marketplaceId: string;
  title: string;
  actionType: string;
  diagnosis: string;
  proposedAction: string;
  estimatedImpactPts: number;
  effortLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  requiresHumanApproval: boolean;
  status: 'PENDING' | 'EXECUTED' | 'REJECTED';
  createdAt: string;
}

export interface BrandVocabularyItem {
  id: string;
  term: string;
  classification: VocabularyClassification;
  reason: string;
  suggestedAlternative?: string;
}

export interface MerchandisingAutopilotPolicy {
  autoRepairDrift: boolean;
  autoDeployApprovedWinner: boolean;
  autoUpdateKeywords: boolean;
  autoUpdateApprovedAssets: boolean;
  autoSyncPrice: boolean;
  autoEndPromotions: boolean;
  maxConcurrentExperiments: number;
  maxPriceVariancePct: number;
  minTrafficForExperiment: number;
}

export interface MerchandisingQualityScore {
  score: number; // 0 - 100
  discoverabilityScore: number;
  contentCompletenessPct: number;
  assetReadinessPct: number;
  pricingHealthPct: number;
  complianceStatus: 'PASS' | 'WARN' | 'BLOCK';
  blockingIssues: string[];
}

export interface PortfolioTuningPlan {
  totalListingsScanned: number;
  driftFixesReady: number;
  staleListingsFound: number;
  experimentsProposed: number;
  estimatedNetRevenueGainGbp: number;
  humanApprovalsRequired: number;
  automaticActionsEligible: number;
  recommendations: MerchandisingRecommendation[];
}
