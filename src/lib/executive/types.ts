/**
 * DRAWDOWN OS — EXECUTIVE INTELLIGENCE & CONTROL LAYER
 * SDK Type Definitions — Complete Domain Model
 */

// ─── SIGNAL LAYER ────────────────────────────────────────────────────────────

export type SignalSource =
  | 'REVENUE_ENGINE'
  | 'MARKETPLACE_RADAR'
  | 'PRODUCT_FACTORY'
  | 'GROWTH_COMMAND'
  | 'FINANCIAL_COMMAND'
  | 'LOCALISATION_ENGINE'
  | 'AUTOPILOT'
  | 'MERCHANDISING_ENGINE'
  | 'DISTRIBUTION_ENGINE'
  | 'COMPLIANCE_CENTRE'
  | 'CONNECTOR_FACTORY'
  | 'MANUAL';

export type SignalType =
  | 'REVENUE_CHANGE'
  | 'CONVERSION_CHANGE'
  | 'REFUND_THRESHOLD_CROSSED'
  | 'REFUND_ANOMALY'
  | 'MARKETPLACE_DISCOVERED'
  | 'MARKETPLACE_STATUS_CHANGED'
  | 'MARKETPLACE_FEE_CHANGED'
  | 'PRODUCT_PERFORMANCE_CHANGED'
  | 'PRODUCT_CREATED'
  | 'LISTING_REMOVED'
  | 'EXPERIMENT_COMPLETED'
  | 'OBJECTIVE_AT_RISK'
  | 'FORECAST_CHANGED'
  | 'AUTOMATION_FAILED'
  | 'PRICE_CHANGED'
  | 'AFFILIATE_CHANGE'
  | 'PAYOUT_ANOMALY'
  | 'INTEGRATION_FAILURE'
  | 'CONCENTRATION_RISK'
  | 'OPPORTUNITY_DETECTED'
  | 'COMPLIANCE_ALERT';

export type SignalSeverity = 'INFO' | 'WATCH' | 'IMPORTANT' | 'ACTION_REQUIRED' | 'CRITICAL';

export interface ExecutiveSignal {
  id: string;
  type: SignalType;
  source: SignalSource;
  severity: SignalSeverity;
  entityType: 'PRODUCT' | 'MARKETPLACE' | 'TERRITORY' | 'CAMPAIGN' | 'AFFILIATE' | 'SYSTEM';
  entityId?: string;
  entityName: string;
  metricName: string;
  currentValue: number;
  previousValue?: number;
  deltaAbsolute?: number;
  deltaPct?: number;
  threshold?: number;
  detectedAt: string;
  isDemo: boolean;
}

// ─── INSIGHT LAYER ────────────────────────────────────────────────────────────

export type InsightStatus =
  | 'NEW'
  | 'WATCHING'
  | 'RECOMMENDED'
  | 'APPROVAL_REQUIRED'
  | 'ACTIONED'
  | 'RESOLVED'
  | 'DISMISSED'
  | 'SNOOZED'
  | 'ARCHIVED';

export type InsightCategory =
  | 'PERFORMANCE'
  | 'OPPORTUNITY'
  | 'RISK'
  | 'ANOMALY'
  | 'MARKETPLACE'
  | 'PRODUCT'
  | 'PRICING'
  | 'LOCALISATION'
  | 'GROWTH'
  | 'FINANCIAL'
  | 'COMPLIANCE'
  | 'STRATEGIC';

export interface ExecutiveInsight {
  id: string;
  signalIds: string[];
  category: InsightCategory;
  status: InsightStatus;
  title: string;
  narrative: string;          // Plain-English explanation
  whyItMatters: string;
  financialExposureGbp?: number;
  affectedEntityNames: string[];
  likelyCause?: string;
  createdAt: string;
  updatedAt: string;
  isDemo: boolean;
}

// ─── PRIORITY ENGINE ──────────────────────────────────────────────────────────

export type ConfidenceLevel = 'VERIFIED' | 'HIGH' | 'MODERATE' | 'LOW' | 'SPECULATIVE';

export interface PriorityScoreComponents {
  impact: number;           // 0–100
  confidence: number;       // 0–100
  urgency: number;          // 0–100
  strategicFit: number;     // 0–100
  leverage: number;         // 0–100
  effort: number;           // 0–100 (higher = more effort = lower score)
  riskPenalty: number;      // 0–100 (higher = riskier = lower score)
}

export interface PriorityScoreWeights {
  impact: number;
  confidence: number;
  urgency: number;
  strategicFit: number;
  leverage: number;
  effort: number;           // divisor weight
  riskPenalty: number;
}

export const DEFAULT_PRIORITY_WEIGHTS: PriorityScoreWeights = {
  impact: 0.30,
  confidence: 0.20,
  urgency: 0.20,
  strategicFit: 0.15,
  leverage: 0.10,
  effort: 0.15,
  riskPenalty: 0.10,
};

export interface ExecutivePriority {
  id: string;
  rank: number;             // 1–5 for the Five Things
  insightId?: string;
  opportunityId?: string;
  riskId?: string;
  title: string;
  subtitle: string;
  category: InsightCategory;
  priorityScore: number;    // 0–100 normalised
  scoreComponents: PriorityScoreComponents;
  whyItMatters: string;
  recommendedAction: string;
  impact30DayLowGbp: number;
  impact30DayHighGbp: number;
  confidence: ConfidenceLevel;
  confidencePct: number;    // 0–100
  effortHours?: number;
  reversible: boolean;
  approvalRequired: boolean;
  autonomyEligible: boolean;
  actions: PriorityAction[];
  evidence: RecommendationEvidence;
  whyRankedHere: string;
  isDemo: boolean;
}

export type PriorityActionType =
  | 'APPROVE_ACTION'
  | 'MODEL_SCENARIO'
  | 'DELEGATE_AUTOPILOT'
  | 'INVESTIGATE'
  | 'IGNORE'
  | 'SNOOZE';

export interface PriorityAction {
  type: PriorityActionType;
  label: string;
  href?: string;
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
}

export interface RecommendationEvidence {
  dataSource: string;
  dataPeriod: string;
  baselineDescription: string;
  keyMetrics: Array<{ label: string; value: string; trend?: 'UP' | 'DOWN' | 'FLAT' }>;
  assumptions: string[];
  confidenceReason: string;
  relatedEvents: string[];
  isCausal: boolean;         // false = correlation only
}

// ─── OBJECTIVES ───────────────────────────────────────────────────────────────

export type ObjectiveStatus =
  | 'DRAFT'
  | 'ACTIVE'
  | 'AT_RISK'
  | 'ON_TRACK'
  | 'EXCEEDED'
  | 'FAILED'
  | 'PAUSED'
  | 'COMPLETED'
  | 'CANCELLED';

export type RiskTolerance = 'LOW' | 'BALANCED' | 'AGGRESSIVE';

export interface ParsedObjective {
  goal: string;
  targetMetric: string;
  targetValue?: number;
  targetCurrency?: string;
  scope: string;
  timeHorizonDays: number;
  constraints: ObjectiveConstraint[];
  budgetGbp?: number;
  riskTolerance: RiskTolerance;
  availableLevers: string[];
}

export interface ObjectiveConstraint {
  metric: string;
  operator: 'MUST_NOT_EXCEED' | 'MUST_STAY_ABOVE' | 'MUST_EQUAL';
  value: number;
  unit: string;
  isViolated: boolean;
}

export interface StrategyElement {
  id: string;
  title: string;
  hypothesis: string;
  expectedImpactGbp: number;
  confidence: ConfidenceLevel;
  costGbp: number;
  effortHours: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  ownerModule: string;
  autonomyStatus: 'MANUAL' | 'SEMI_AUTO' | 'AUTONOMOUS';
  startDate: string;
  evaluationDate: string;
  successMetric: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'PAUSED';
}

export interface ExecutiveObjective {
  id: string;
  naturalLanguage: string;
  parsed: ParsedObjective;
  status: ObjectiveStatus;
  baselineValue: number;
  currentValue: number;
  targetValue: number;
  expectedValue?: number;
  progressPct: number;
  daysRemaining: number;
  successProbabilityPct: number;
  whyProbability: string;
  strategyElements: StrategyElement[];
  experimentsRunning: number;
  actionsCompleted: number;
  actionsQueued: number;
  createdAt: string;
  reviewDate: string;
  isDemo: boolean;
}

// ─── SCENARIOS ────────────────────────────────────────────────────────────────

export interface ScenarioAssumption {
  variable: string;
  baseline: number;
  scenarioValue: number;
  unit: string;
  confidence: ConfidenceLevel;
}

export interface ScenarioCase {
  label: 'BASE' | 'BULL' | 'BEAR' | 'RECOMMENDED';
  grossRevenueGbp: number;
  netRevenueGbp: number;
  contributionGbp: number;
  ordersCount: number;
  avgOrderValueGbp: number;
  refundRatePct: number;
  contributionMarginPct: number;
  probability: number;       // 0–100
  narrative: string;
}

export interface ExecutiveScenario {
  id: string;
  name: string;
  description: string;
  assumptions: ScenarioAssumption[];
  baseCase: ScenarioCase;
  bullCase: ScenarioCase;
  bearCase: ScenarioCase;
  recommendedCase: ScenarioCase;
  monteCarloLowGbp?: number;
  monteCarloMedianGbp?: number;
  monteCarloHighGbp?: number;
  monteCarloProbabilityAboveTargetPct?: number;
  monteCarloConfidence: ConfidenceLevel;
  recommendation: string;
  whatWouldChangeMind: string[];
  createdAt: string;
  isDemo: boolean;
}

// ─── PORTFOLIO ────────────────────────────────────────────────────────────────

export type ProductClassification =
  | 'STAR'        // High contribution / high growth
  | 'SCALE'       // Promising, under-distributed
  | 'OPTIMISE'    // Revenue exists, economics need work
  | 'INCUBATE'    // Early, limited data
  | 'HARVEST'     // Stable, low investment needed
  | 'FIX'         // Solvable underperformance
  | 'RETIRE';     // No strategic value

export type MarketplaceClassification = 'SCALE' | 'HOLD' | 'TEST' | 'OPTIMISE' | 'WATCH' | 'EXIT';

export interface PortfolioProduct {
  id: string;
  sku: string;
  title: string;
  classification: ProductClassification;
  grossRevenueGbp: number;
  netRevenueGbp: number;
  contributionGbp: number;
  contributionMarginPct: number;
  growthPct: number;         // MoM
  refundRatePct: number;
  conversionRatePct: number;
  marketplaceCount: number;
  localisationCount: number;
  derivativeCount: number;
  portfolioSharePct: number;
  strategicValue: number;    // 0–100
  operationalBurden: number; // 0–100
  isDemo: boolean;
}

export interface PortfolioMarketplace {
  id: string;
  name: string;
  classification: MarketplaceClassification;
  grossRevenueGbp: number;
  netRevenueGbp: number;
  contributionGbp: number;
  contributionMarginPct: number;
  feePct: number;
  refundRatePct: number;
  conversionRatePct: number;
  productCount: number;
  localisationCount: number;
  automationCapability: number; // 0–100
  audienceFit: number;          // 0–100
  geographicReach: string;
  policyRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  dependencyRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  portfolioSharePct: number;
  isDemo: boolean;
}

// ─── OPPORTUNITIES ────────────────────────────────────────────────────────────

export type OpportunityCategory =
  | 'NEW_MARKETPLACE'
  | 'PRICE_OPTIMISATION'
  | 'LOCALISATION'
  | 'BUNDLE'
  | 'UPSELL'
  | 'AFFILIATE'
  | 'LICENSING'
  | 'DERIVATIVE_PRODUCT'
  | 'PREMIUM_VERSION'
  | 'SEO'
  | 'GEOGRAPHIC_EXPANSION'
  | 'CONVERSION_OPTIMISATION'
  | 'DIRECT_TRAFFIC'
  | 'PROMOTIONAL';

export interface ExecutiveOpportunity {
  id: string;
  category: OpportunityCategory;
  title: string;
  description: string;
  estimatedAnnualValueGbp: number;
  expected30DayGbp: number;
  expected90DayGbp: number;
  implementationCostGbp: number;
  effortHours: number;
  timeToFirstRevenueDays: number;
  successProbabilityPct: number;
  opportunityScore: number;   // 0–100
  scalability: 'LOW' | 'MEDIUM' | 'HIGH';
  automationPotential: 'NONE' | 'PARTIAL' | 'FULL';
  reversibility: 'EASY' | 'MODERATE' | 'DIFFICULT';
  downside: string;
  confidence: ConfidenceLevel;
  relatedProductSkus: string[];
  relatedMarketplaceIds: string[];
  isDemo: boolean;
}

// ─── RISKS ────────────────────────────────────────────────────────────────────

export type RiskCategory =
  | 'REVENUE'
  | 'MARKETPLACE'
  | 'PRODUCT'
  | 'CONCENTRATION'
  | 'REGULATORY'
  | 'TAX'
  | 'IP'
  | 'REFUND'
  | 'TECHNICAL'
  | 'INTEGRATION'
  | 'PAYMENT'
  | 'CURRENCY'
  | 'AFFILIATE'
  | 'DATA_QUALITY';

export type RiskStatus = 'ACTIVE' | 'MITIGATED' | 'ACCEPTED' | 'MONITORING' | 'ESCALATED';

export interface ExecutiveRisk {
  id: string;
  category: RiskCategory;
  title: string;
  description: string;
  likelihood: number;       // 0–100
  impact: number;           // 0–100
  velocity: 'SLOW' | 'MEDIUM' | 'FAST' | 'IMMEDIATE';
  exposureGbp: number;
  mitigation: string;
  owner: string;
  status: RiskStatus;
  triggerCondition: string;
  reviewDate: string;
  isDemo: boolean;
}

// ─── DECISIONS ────────────────────────────────────────────────────────────────

export type DecisionOutcome = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'PENDING' | 'INSUFFICIENT_DATA';

export interface ExecutiveDecision {
  id: string;
  title: string;
  description: string;
  rationale: string;
  expectedResultDescription: string;
  expectedImpactGbp: number;
  actualImpactGbp?: number;
  decidedAt: string;
  decidedBy: 'CEO' | 'AUTOPILOT' | 'OS_RECOMMENDATION';
  reviewDate: string;
  reviewedAt?: string;
  outcome?: DecisionOutcome;
  outcomeNarrative?: string;
  forecastAccuracyPct?: number;
  relatedObjectiveId?: string;
  isDemo: boolean;
}

// ─── FORECAST ─────────────────────────────────────────────────────────────────

export interface ForecastDriver {
  description: string;
  deltaGbp: number;
  confidence: ConfidenceLevel;
  type: 'POSITIVE' | 'NEGATIVE';
}

export interface ForecastPeriod {
  periodDays: 7 | 30 | 90 | 365;
  label: string;
  grossRevenueGbp: number;
  netRevenueGbp: number;
  contributionGbp: number;
  ordersCount: number;
  avgOrderValueGbp: number;
  refundCount: number;
  bestCaseGbp: number;
  worstCaseGbp: number;
  confidence: ConfidenceLevel;
  drivers: ForecastDriver[];
}

// ─── ALERTS & APPROVALS ───────────────────────────────────────────────────────

export type AlertSeverity = 'INFO' | 'WATCH' | 'IMPORTANT' | 'ACTION_REQUIRED' | 'CRITICAL';
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'MODIFIED' | 'DELEGATED' | 'EXPIRED';

export interface ExecutiveAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  body: string;
  source: string;
  createdAt: string;
  isRead: boolean;
  linkedInsightId?: string;
  isDemo: boolean;
}

export interface ExecutiveApproval {
  id: string;
  requestedAction: string;
  requestingModule: string;
  reason: string;
  financialImpactGbp: number;
  confidencePct: number;
  downside: string;
  reversible: boolean;
  deadline?: string;
  linkedObjectiveId?: string;
  status: ApprovalStatus;
  createdAt: string;
  isDemo: boolean;
}

// ─── INTERVENTION ─────────────────────────────────────────────────────────────

export type InterventionLevel = 0 | 1 | 2 | 3 | 4 | 5;
// 0=OBSERVE, 1=WATCH, 2=RECOMMEND, 3=REQUEST_APPROVAL, 4=AUTONOMOUS, 5=EMERGENCY_STOP

export interface InterventionRule {
  id: string;
  name: string;
  description: string;
  metric: string;
  operator: 'GREATER_THAN' | 'LESS_THAN' | 'EQUALS';
  threshold: number;
  unit: string;
  level: InterventionLevel;
  isActive: boolean;
  isDemo: boolean;
}

// ─── AUTONOMY ─────────────────────────────────────────────────────────────────

export type AutonomyMode = 'OBSERVER' | 'ADVISER' | 'OPERATOR' | 'AUTOPILOT' | 'CUSTOM';

export interface ExecutiveGuardrail {
  id: string;
  name: string;
  description: string;
  type: 'FINANCIAL_LIMIT' | 'APPROVAL_REQUIRED' | 'PERMANENTLY_PROHIBITED';
  value?: number;
  unit?: string;
  isActive: boolean;
}

// ─── EXECUTIVE SETTINGS ───────────────────────────────────────────────────────

export interface ExecutivePreferences {
  revenueTargetGbp: number;
  contributionTargetGbp: number;
  refundCeilingPct: number;
  growthTargetPct: number;
  riskTolerance: RiskTolerance;
  timeHorizon: 'SHORT' | 'MEDIUM' | 'LONG';
  autonomyMode: AutonomyMode;
  priorityWeights: PriorityScoreWeights;
  dailyBriefEnabled: boolean;
  weeklyReviewEnabled: boolean;
  monthlyReportEnabled: boolean;
}

// ─── DAILY BRIEF ─────────────────────────────────────────────────────────────

export interface DailyBriefStats {
  date: string;
  netRevenueGbp: number;
  netContributionGbp: number;
  ordersCount: number;
  refundsCount: number;
  avgOrderValueGbp: number;
  activeMarketplaces: number;
  productCount: number;
  automationsActive: number;
  exceptionsCount: number;
  vsYesterdayPct: number;
  vs7DayBaselinePct: number;
  vs30DayBaselinePct: number;
}

// ─── PORTFOLIO HEALTH ─────────────────────────────────────────────────────────

export type PortfolioHealth = 'GREEN' | 'AMBER' | 'RED';

export interface PortfolioHealthStatus {
  status: PortfolioHealth;
  reason: string;
  netContributionMtdGbp: number;
  forecastGbp: number;
  targetGbp: number;
  targetAttainmentPct: number;
  autopilotActionsToday: number;
  pendingApprovals: number;
  overallScore?: number;
  diversificationScore?: number;
  efficiencyScore?: number;
  resilienceScore?: number;
}
