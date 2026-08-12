/**
 * DRAWDOWN OS — AUTONOMOUS EXPERIMENTATION & OPTIMISATION ENGINE
 * SDK Type Definitions — Complete Domain Model
 */

// ─── EXPERIMENT CLASSIFICATION ────────────────────────────────────────────────

export type ExperimentType =
  | 'PRICING'
  | 'PRODUCT_POSITIONING'
  | 'CREATIVE'
  | 'MERCHANDISING'
  | 'DISTRIBUTION'
  | 'LOCALISATION'
  | 'CONVERSION'
  | 'PROMOTION'
  | 'AFFILIATE'
  | 'PRODUCT_DEVELOPMENT'
  | 'SEO_DISCOVERY'
  | 'MARKETPLACE_VALIDATION';

export type ExperimentSubtype =
  // PRICING
  | 'PRICE_INCREASE' | 'PRICE_DECREASE' | 'REGIONAL_PRICE' | 'PSYCHOLOGICAL_PRICE'
  | 'PREMIUM_PRICING' | 'INTRODUCTORY_PRICE' | 'DISCOUNT_REMOVAL' | 'DISCOUNT_DEPTH'
  // PRODUCT_POSITIONING
  | 'TITLE' | 'SUBTITLE' | 'DESCRIPTION' | 'BENEFIT_HIERARCHY'
  | 'AUDIENCE_POSITIONING' | 'DIFFICULTY_POSITIONING' | 'PRODUCT_PROMISE' | 'PRODUCT_CATEGORY'
  // CREATIVE
  | 'COVER' | 'THUMBNAIL' | 'MARKETPLACE_IMAGE' | 'PREVIEW_IMAGE' | 'PROMOTIONAL_GRAPHIC'
  // MERCHANDISING
  | 'BUNDLE' | 'CROSS_SELL' | 'UPSELL' | 'RECOMMENDED_PRODUCTS'
  | 'PRODUCT_ORDER' | 'PREMIUM_EDITION' | 'ENTRY_LEVEL_PRODUCT'
  // DISTRIBUTION
  | 'MARKETPLACE_LAUNCH' | 'LISTING_CATEGORY' | 'MARKETPLACE_POSITIONING'
  | 'TERRITORY' | 'LISTING_TIMING'
  // LOCALISATION
  | 'TRANSLATED_TITLE' | 'TRANSLATED_DESCRIPTION' | 'TRANSLATED_PRODUCT'
  | 'LOCAL_PRICING' | 'LOCAL_POSITIONING'
  // CONVERSION
  | 'CTA' | 'LANDING_PAGE' | 'CHECKOUT_MESSAGING' | 'GUARANTEES'
  | 'FAQ_POSITIONING' | 'SOCIAL_PROOF' | 'PAGE_STRUCTURE'
  // PROMOTION
  | 'DISCOUNT' | 'LIMITED_OFFER' | 'COUPON' | 'AFFILIATE_INCENTIVE' | 'BUNDLE_PROMOTION'
  // AFFILIATE
  | 'COMMISSION' | 'AFFILIATE_CREATIVE' | 'AFFILIATE_OFFER' | 'LANDING_DESTINATION' | 'AFFILIATE_TYPE'
  // PRODUCT_DEVELOPMENT
  | 'LITE_VERSION' | 'PREMIUM_VERSION' | 'WORKBOOK' | 'CHECKLIST' | 'CHEAT_SHEET' | 'DERIVATIVE'
  // SEO_DISCOVERY
  | 'MARKETPLACE_KEYWORDS' | 'TITLE_STRUCTURE' | 'TAGS' | 'CATEGORISATION';

export type ExperimentState =
  | 'IDEA'
  | 'HYPOTHESIS'
  | 'DESIGNING'
  | 'READY'
  | 'APPROVAL_REQUIRED'
  | 'SCHEDULED'
  | 'RUNNING'
  | 'PAUSED'
  | 'STOPPED'
  | 'EVALUATING'
  | 'WINNER'
  | 'LOSER'
  | 'INCONCLUSIVE'
  | 'ROLLED_OUT'
  | 'ROLLED_BACK'
  | 'ARCHIVED';

export type ExperimentAutonomyLevel =
  | 'MANUAL'      // Nothing without CEO approval
  | 'DESIGN'      // AI designs only; human launches
  | 'LAUNCH'      // AI may launch pre-approved low-risk tests
  | 'MANAGE'      // AI may stop/pause/adjust
  | 'OPTIMISE';   // AI may design, launch, evaluate, rollout/rollback

export type ExperimentHealth = 'HEALTHY' | 'WATCH' | 'AT_RISK' | 'STOP_RECOMMENDED' | 'STOPPED';

// ─── LEARNING VALUE SCOPE ─────────────────────────────────────────────────────

export type LearningScope =
  | 'LOCAL'         // Specific product × marketplace × territory
  | 'PRODUCT'       // Applies to this product across marketplaces
  | 'MARKETPLACE'   // Applies to this marketplace across products
  | 'TERRITORY'     // Applies to this territory across products/marketplaces
  | 'CATEGORY'      // Applies to PDF product category
  | 'PORTFOLIO';    // Applies across all products

export type LearningConfidence =
  | 'SPECULATIVE'
  | 'EARLY'
  | 'MODERATE'
  | 'STRONG'
  | 'VERY_STRONG';

export type EvidenceType =
  | 'VERIFIED_DATA'
  | 'INFERRED_DATA'
  | 'MODELLED_DATA'
  | 'ASSUMPTION'
  | 'MANUAL_ENTRY';

// ─── HYPOTHESIS ───────────────────────────────────────────────────────────────

export type MetricDirection = 'INCREASE' | 'DECREASE' | 'MAINTAIN';

export interface ExperimentHypothesis {
  id: string;
  experimentId: string;
  statement: string;                    // Full natural-language hypothesis
  primaryMetric: string;                // e.g. 'net_contribution'
  primaryDirection: MetricDirection;
  affectedEntity: string;               // Product / Marketplace / etc.
  baseline: string;                     // Current state description
  proposedChange: string;               // What changes
  target: string;                       // What success looks like
  secondaryMetrics: string[];
  guardrailMetrics: GuardrailDefinition[];
  minimumDetectableEffect: number;      // % or absolute
  expectedImpactLowGbp: number;
  expectedImpactHighGbp: number;
  confidence: 'LOW' | 'MODERATE' | 'HIGH';
  supportingEvidence: string[];
  originatingModule?: string;
  linkedObjectiveId?: string;
  authorType: 'HUMAN' | 'AI';
  authorName: string;
  isDemo: boolean;
  createdAt: string;
}

// ─── GUARDRAILS ───────────────────────────────────────────────────────────────

export type GuardrailOperator = 'GREATER_THAN' | 'LESS_THAN' | 'EQUALS';
export type GuardrailClass = 'HARD_STOP' | 'SOFT_STOP' | 'WATCH';

export interface GuardrailDefinition {
  id: string;
  name: string;
  metric: string;
  operator: GuardrailOperator;
  threshold: number;
  unit: string;
  class: GuardrailClass;
  description: string;
  revertOnBreach: boolean;
}

export interface GuardrailStatus {
  definitionId: string;
  name: string;
  metric: string;
  threshold: number;
  currentValue: number;
  unit: string;
  class: GuardrailClass;
  isBreached: boolean;
  breachedAt?: string;
}

// ─── VARIANTS ─────────────────────────────────────────────────────────────────

export type VariantRole = 'CONTROL' | 'VARIANT_A' | 'VARIANT_B' | 'VARIANT_C';

export interface ExperimentVariant {
  id: string;
  experimentId: string;
  role: VariantRole;
  label: string;
  description: string;
  changes: VariantChange[];       // What is different from control
  trafficAllocationPct: number;   // 0–100
  isActive: boolean;
  isDemo: boolean;
}

export interface VariantChange {
  field: string;                  // e.g. 'price_gbp', 'title', 'thumbnail_url'
  originalValue: string | number;
  variantValue: string | number;
  changeType: 'PRICE' | 'COPY' | 'CREATIVE' | 'METADATA' | 'CONFIGURATION';
}

// ─── METRICS ──────────────────────────────────────────────────────────────────

export type PrimaryMetric =
  | 'NET_CONTRIBUTION'
  | 'CONTRIBUTION_PER_VISITOR'
  | 'REVENUE_PER_VISITOR'
  | 'CONVERSION_RATE'
  | 'AOV'
  | 'UNITS_SOLD'
  | 'GROSS_REVENUE'
  | 'NET_REVENUE'
  | 'BUNDLE_ATTACH_RATE'
  | 'UPSELL_CONVERSION'
  | 'AFFILIATE_CONVERSION';

export interface ExperimentMeasurement {
  id: string;
  experimentId: string;
  variantId: string;
  measuredAt: string;
  impressions?: number;
  visitors?: number;
  orders: number;
  grossRevenueGbp: number;
  netRevenueGbp: number;
  contributionGbp: number;
  refunds: number;
  refundRatePct: number;
  conversionRatePct: number;
  avgOrderValueGbp: number;
  isDemo: boolean;
}

// ─── STATISTICAL EVALUATION ───────────────────────────────────────────────────

export type DataSufficiency = 'INSUFFICIENT' | 'MARGINAL' | 'ADEQUATE' | 'STRONG';

export interface BayesianResult {
  probabilityVariantBetterPct: number;   // 0–100
  probabilityUpliftExceedsMde: number;   // 0–100 (above minimum detectable effect)
  expectedUpliftLowPct: number;          // credibility interval low
  expectedUpliftHighPct: number;         // credibility interval high
  expectedUpliftMedianPct: number;
  expectedDownsideGbp: number;
  expectedUpsideGbpMonthly: number;
  recommendation: 'ROLL_OUT' | 'ROLL_BACK' | 'CONTINUE' | 'INCONCLUSIVE' | 'TOO_EARLY';
  recommendationReason: string;
  dataSufficiency: DataSufficiency;
  estimatedDaysToDecision?: number;      // if insufficient
}

export interface PracticalSignificanceCheck {
  upliftPct: number;
  annualisedImpactGbp: number;
  implementationComplexity: 'LOW' | 'MEDIUM' | 'HIGH';
  rolloutRecommended: boolean;
  reason: string;
}

// ─── EXPERIMENT RESULT ────────────────────────────────────────────────────────

export type ExperimentOutcome = 'WINNER' | 'LOSER' | 'INCONCLUSIVE' | 'STOPPED_GUARDRAIL' | 'STOPPED_MANUAL';

export interface ExperimentResult {
  id: string;
  experimentId: string;
  outcome: ExperimentOutcome;
  controlMeasurements: ExperimentMeasurement;
  variantMeasurements: ExperimentMeasurement;
  bayesian: BayesianResult;
  practicalSignificance: PracticalSignificanceCheck;
  incrementalContributionGbp: number;
  annualisedValueGbp: number;
  implementationCostGbp: number;
  roi: number;
  experimentCostGbp: number;
  humanHoursSpent: number;
  guardRailBreaches: GuardrailStatus[];
  recommendation: 'ROLL_OUT' | 'ROLL_BACK' | 'RETEST' | 'ABANDON';
  decisionRationale: string;
  learningGenerated: boolean;
  evaluatedAt: string;
  isDemo: boolean;
  // ── Convenience aliases for page display ────────────────────────────────────
  /** Alias for bayesian.probabilityVariantBetterPct / 100 */
  probabilityVariantBeatsControl?: number;
  /** Alias for bayesian.expectedUpliftMedianPct */
  primaryMetricUpliftPercent?: number;
  /** Alias for practicalSignificance.annualisedImpactGbp */
  annualisedValueEstimate?: number;
}

// ─── ROLLOUT ──────────────────────────────────────────────────────────────────

export type RolloutStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETE' | 'REVERTED' | 'PAUSED';

export interface RolloutPhase {
  phase: number;
  description: string;
  marketplaceId?: string;
  territory?: string;
  scope: string;
  status: RolloutStatus;
  scheduledDate?: string;
  completedDate?: string;
  notes: string;
}

export interface ExperimentRollout {
  id: string;
  experimentId: string;
  winnerVariantId: string;
  status: RolloutStatus;
  phases: RolloutPhase[];
  postRolloutMonitoringDays: [7, 30, 90];
  autoRevertThreshold?: number;   // % deterioration triggers auto-revert
  postRolloutChecks: PostRolloutCheck[];
  isDemo: boolean;
  createdAt: string;
}

export interface PostRolloutCheck {
  daysMark: 7 | 30 | 90;
  expectedContributionGbp: number;
  observedContributionGbp?: number;
  variancePct?: number;
  status: 'PENDING' | 'ON_TRACK' | 'UNDERPERFORMING' | 'OVERPERFORMING' | 'MODEL_OVERSTATED';
  checkedAt?: string;
}

// ─── ROLLBACK ─────────────────────────────────────────────────────────────────

export interface RollbackState {
  id: string;
  experimentId: string;
  variantId: string;
  field: string;
  originalValue: string | number;
  changedValue: string | number;
  changedAt: string;
  affectedEntityType: string;
  affectedEntityId: string;
  rollbackMethod: 'AUTOMATIC' | 'MANUAL_TASK' | 'API_CALL';
  rolledBackAt?: string;
  rolledBackBy?: string;
  isDemo: boolean;
}

// ─── LEARNING ─────────────────────────────────────────────────────────────────

export type LearningType =
  | 'PRICING' | 'PRODUCT' | 'POSITIONING' | 'MARKETPLACE'
  | 'TERRITORY' | 'LANGUAGE' | 'BUNDLES' | 'UPSELLS'
  | 'CUSTOMER_SEGMENT' | 'AFFILIATE' | 'PROMOTIONS'
  | 'ACQUISITION' | 'SEO' | 'CREATIVE';

export interface ExperimentLearning {
  id: string;
  type: LearningType;
  scope: LearningScope;
  title: string;
  statement: string;               // The learning, stated clearly
  implication: string;             // What this means for future decisions
  experimentIds: string[];
  productSkus?: string[];
  marketplaceIds?: string[];
  territories?: string[];
  totalCustomersInEvidence: number;
  confidence: LearningConfidence;
  evidenceCount: number;           // Number of experiments supporting this
  isContradicted: boolean;         // If contradictory evidence exists
  contradictionNote?: string;
  createdAt: string;
  lastValidatedAt: string;
  expiryDate?: string;             // When to revalidate
  currentRelevance: 'HIGH' | 'MEDIUM' | 'LOW' | 'STALE';
  isDemo: boolean;
}

// ─── OPPORTUNITIES ────────────────────────────────────────────────────────────

export type OpportunitySource =
  | 'PRICE_NEVER_TESTED'
  | 'HIGH_CONVERSION_PRICING_SIGNAL'
  | 'HIGH_TRAFFIC_LOW_CONVERSION'
  | 'TERRITORY_SIGNAL_NO_PRODUCT'
  | 'LOW_BUNDLE_ATTACH'
  | 'HIGH_REFUND_POSITIONING'
  | 'AOV_BELOW_PORTFOLIO'
  | 'EXECUTIVE_OBJECTIVE'
  | 'MARKETPLACE_RADAR'
  | 'LEARNING_DECAY'
  | 'MANUAL';

export interface ExperimentOpportunity {
  id: string;
  source: OpportunitySource;
  experimentType: ExperimentType;
  experimentSubtype: ExperimentSubtype;
  title: string;
  knowledgeGap: string;           // What we don't know
  hypothesis: string;             // Proposed hypothesis
  expectedValueLowGbp: number;
  expectedValueHighGbp: number;
  /** Display-friendly expected value string e.g. '£1,200 - £3,500' */
  expectedValue?: string;
  learningValueScope: LearningScope;
  priorityScore: number;          // 0–100
  effort: 'LOW' | 'MEDIUM' | 'HIGH';
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  reversibility: 'EASY' | 'MODERATE' | 'DIFFICULT';
  relatedProductSku?: string;
  relatedMarketplaceId?: string;
  territory?: string;
  linkedObjectiveId?: string;
  isDemo: boolean;
  detectedAt: string;
}

// ─── EXPERIMENT (MASTER RECORD) ───────────────────────────────────────────────

export interface Experiment {
  id: string;
  name: string;
  type: ExperimentType;
  subtype: ExperimentSubtype;
  state: ExperimentState;
  health: ExperimentHealth;
  autonomyLevel: ExperimentAutonomyLevel;
  hypothesis: ExperimentHypothesis;
  variants: ExperimentVariant[];
  guardrails: GuardrailDefinition[];
  primaryMetric: PrimaryMetric;
  productSku: string;
  productName: string;
  marketplaceId?: string;
  marketplaceName?: string;
  territory?: string;
  linkedObjectiveId?: string;
  platformCapability: 'FULL_SPLIT' | 'SEQUENTIAL_ONLY' | 'MANUAL_EXECUTION';
  scheduledStart?: string;
  actualStart?: string;
  scheduledEnd?: string;
  actualEnd?: string;
  minimumDurationDays: number;
  maximumDurationDays: number;
  requiredSampleSize: number;
  currentSample: number;
  dataSufficiency: DataSufficiency;
  estimatedDaysToDecision?: number;
  priorityScore: number;
  experimentQualityScore: number;   // 0–100, scored before launch
  result?: ExperimentResult;
  rollout?: ExperimentRollout;
  rollbackState?: RollbackState[];
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedBy?: string;
  aiCommentary?: string;
  createdBy: 'HUMAN' | 'AI';
  createdAt: string;
  isDemo: boolean;
  // ── Convenience aliases & display fields ────────────────────────────────────
  /** Alias for state — used by some page filters */
  status?: ExperimentState;
  /** PascalCase alias for subtype */
  subType?: ExperimentSubtype;
  /** The specific entity being tested (product, marketplace, listing) */
  targetEntityId?: string;
  /** Min sample size / duration requirements */
  sampleRequirements?: { minSampleTarget: number; minDurationDays: number };
  /** Short summary of hypothesis statement for display */
  hypothesisSummary?: string;
  /** When the experiment was last updated */
  updatedAt?: string;
  /** Description of control state for display */
  controlDefinition?: Record<string, unknown>;
  /** Description of variant state for display */
  variantDefinition?: Record<string, unknown>;
  /** Key learning extracted after conclusion */
  learningExtract?: string;
  /** Short display title (defaults to name) */
  title?: string;
  /** Affected entity display label */
  affectedEntity?: string;
  /** Expected impact range for display */
  impactRange?: { low: string; high: string };
  /** Current probability of winning (0–100) */
  probWinPct?: number;
  /** Summary guardrail health status */
  guardrailStatus?: 'HEALTHY' | 'WATCH' | 'BREACHED';
}

// ─── CONFLICT ─────────────────────────────────────────────────────────────────

export type ConflictSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'BLOCKING';

export interface ExperimentConflict {
  id: string;
  experimentAId: string;
  experimentAName: string;
  experimentBId: string;
  experimentBName: string;
  conflictType: string;
  reason: string;
  severity: ConflictSeverity;
  resolution: 'RESCHEDULE' | 'MERGE' | 'EXCLUDE_TRAFFIC' | 'OVERRIDE' | 'PENDING';
  resolvedAt?: string;
  isDemo: boolean;
}

// ─── OPTIMISATION MAP ─────────────────────────────────────────────────────────

export type OptimisationStatus =
  | 'STRONG_EVIDENCE'     // Tested, winner deployed
  | 'ACTIVE'              // Experiment running now
  | 'UNTESTED'            // Never tested
  | 'UNDERPERFORMING'     // Loser or known weak area
  | 'WEAK_EVIDENCE'       // Only early/speculative data
  | 'STALE';              // Learning is old, needs revalidation

export interface OptimisationMapCell {
  productSku: string;
  productName: string;
  marketplaceId: string;
  marketplaceName: string;
  dimension: string;        // e.g. 'PRICING', 'CREATIVE', 'POSITIONING'
  status: OptimisationStatus;
  revenueAtRiskGbp: number;
  lastTestedAt?: string;
  experimentId?: string;
}

export interface OptimisationCoverage {
  dimension: string;
  coveragePct: number;
  revenueTestedGbp: number;
  totalRevenueGbp: number;
  experimentsCompleted: number;
}

// ─── BUDGET ───────────────────────────────────────────────────────────────────

export interface ExperimentBudget {
  id: string;
  period: string;               // e.g. '2026-08'
  linkedObjectiveId?: string;
  totalDownsideBudgetGbp: number;
  usedDownsideGbp: number;
  remainingDownsideGbp: number;
  experimentsCount: number;
  isDemo: boolean;
}

// ─── PLATFORM CAPABILITY ──────────────────────────────────────────────────────

export interface MarketplaceExperimentCapability {
  marketplaceId: string;
  marketplaceName: string;
  priceTest: 'FULL_SPLIT' | 'SEQUENTIAL_ONLY' | 'NOT_SUPPORTED';
  thumbnailTest: boolean;
  descriptionTest: boolean;
  tagsTest: boolean;
  trafficSplit: boolean;
  checkoutTest: 'FULL' | 'LIMITED' | 'NOT_SUPPORTED';
  notes: string;
}

// ─── COMMAND CENTRE STATS ─────────────────────────────────────────────────────

export interface OptimisationCommandStats {
  experimentsRunning: number;
  awaitingApproval: number;
  completedThisMonth: number;
  winners: number;
  losers: number;
  inconclusive: number;
  stoppedByGuardrail: number;
  estimatedIncrementalRevenueGbp: number;
  estimatedIncrementalContributionGbp: number;
  lossesPreventedGbp: number;
  averageExperimentRoi: number;
  averageTimeToDayDecision: number;
  experimentsPerMonth: number;
  revenueUnderExperimentationPct: number;
  learningsInLibrary: number;
  overallLearningConfidence: LearningConfidence;
}

// ─── CALENDAR EVENTS ──────────────────────────────────────────────────────────

export type CalendarEventType =
  | 'EXPERIMENT_START'
  | 'EXPERIMENT_END'
  | 'EVALUATION_PERIOD'
  | 'BLACKOUT'
  | 'PRODUCT_LAUNCH'
  | 'MARKETPLACE_PROMOTION'
  | 'SEASONAL';

export interface ExperimentCalendarEvent {
  id: string;
  type: CalendarEventType;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  experimentId?: string;
  affectsMarketplaceIds?: string[];
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  isDemo: boolean;
}

// ─── EXPERIMENT PRIORITY SCORE INPUTS ─────────────────────────────────────────

export interface ExperimentPriorityInputs {
  financialImpactScore: number;    // 0–100, based on expected value range
  confidence: number;              // 0–100
  learningValue: number;           // 0–100, scope amplified
  strategicRelevance: number;      // 0–100
  sampleAvailability: number;      // 0–100
  effort: number;                  // 0–100 (higher = more effort = lower score)
  downside: number;                // 0–100 (higher = riskier = lower score)
  reversibilityBonus: number;      // 1.0–1.2
}
