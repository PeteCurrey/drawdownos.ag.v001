/**
 * DRAWDOWN OS — EXECUTIVE INTELLIGENCE & CONTROL LAYER
 * Demo Data — Clearly tagged DEMO. Do not mix with real commercial data.
 * Products: DD-HTT-001 (How to Trade), DD-TQE-001 (The Quiet Edge)
 */

import type {
  ExecutiveSignal, ExecutiveInsight, ExecutivePriority, ExecutiveObjective,
  ExecutiveScenario, PortfolioProduct, PortfolioMarketplace, ExecutiveOpportunity,
  ExecutiveRisk, ExecutiveDecision, ForecastPeriod, ExecutiveAlert, ExecutiveApproval,
  InterventionRule, ExecutiveGuardrail, ExecutivePreferences, DailyBriefStats,
  PortfolioHealthStatus, DEFAULT_PRIORITY_WEIGHTS,
} from './types';
import { DEFAULT_PRIORITY_WEIGHTS as W } from './types';

// ─── PORTFOLIO HEALTH ─────────────────────────────────────────────────────────

export const DEMO_PORTFOLIO_HEALTH: PortfolioHealthStatus = {
  status: 'AMBER',
  reason: 'Refund threshold crossed on Gumroad DE. All other dimensions on plan.',
  netContributionMtdGbp: 6_650,
  forecastGbp: 21_300,
  targetGbp: 20_000,
  targetAttainmentPct: 106.5,
  autopilotActionsToday: 14,
  pendingApprovals: 3,
  overallScore: 78,
  diversificationScore: 62,
  efficiencyScore: 84,
  resilienceScore: 71,
};

// ─── DAILY BRIEF STATS ────────────────────────────────────────────────────────

export const DEMO_DAILY_BRIEF: DailyBriefStats = {
  date: '2026-08-12',
  netRevenueGbp: 9_840,
  netContributionGbp: 6_650,
  ordersCount: 327,
  refundsCount: 11,
  avgOrderValueGbp: 30.09,
  activeMarketplaces: 7,
  productCount: 14,
  automationsActive: 23,
  exceptionsCount: 2,
  vsYesterdayPct: +3.2,
  vs7DayBaselinePct: +8.6,
  vs30DayBaselinePct: +14.1,
};

// ─── EXECUTIVE SIGNALS ────────────────────────────────────────────────────────

export const DEMO_SIGNALS: ExecutiveSignal[] = [
  {
    id: 'sig-001', type: 'CONVERSION_CHANGE', source: 'MERCHANDISING_ENGINE',
    severity: 'IMPORTANT', entityType: 'MARKETPLACE', entityId: 'mkt-etsy-us',
    entityName: 'Etsy US', metricName: 'Conversion Rate', currentValue: 4.31,
    previousValue: 3.66, deltaAbsolute: 0.65, deltaPct: 17.8,
    detectedAt: '2026-08-12T06:00:00Z', isDemo: true,
  },
  {
    id: 'sig-002', type: 'REFUND_THRESHOLD_CROSSED', source: 'FINANCIAL_COMMAND',
    severity: 'CRITICAL', entityType: 'MARKETPLACE', entityId: 'mkt-gumroad-de',
    entityName: 'Gumroad DE', metricName: 'Refund Rate', currentValue: 8.2,
    previousValue: 5.1, deltaAbsolute: 3.1, deltaPct: 60.8, threshold: 7.0,
    detectedAt: '2026-08-12T08:14:00Z', isDemo: true,
  },
  {
    id: 'sig-003', type: 'MARKETPLACE_DISCOVERED', source: 'MARKETPLACE_RADAR',
    severity: 'WATCH', entityType: 'MARKETPLACE', entityId: 'mkt-payhip-new',
    entityName: 'Payhip', metricName: 'Fit Score', currentValue: 91,
    detectedAt: '2026-08-12T04:00:00Z', isDemo: true,
  },
  {
    id: 'sig-004', type: 'OPPORTUNITY_DETECTED', source: 'REVENUE_ENGINE',
    severity: 'WATCH', entityType: 'PRODUCT', entityId: 'DD-HTT-001',
    entityName: 'How to Trade', metricName: 'Price Elasticity Signal',
    currentValue: 34, previousValue: 29, deltaPct: 17.2,
    detectedAt: '2026-08-11T22:00:00Z', isDemo: true,
  },
  {
    id: 'sig-005', type: 'OPPORTUNITY_DETECTED', source: 'LOCALISATION_ENGINE',
    severity: 'WATCH', entityType: 'PRODUCT', entityId: 'DD-HTT-001-DE',
    entityName: 'How to Trade (German)', metricName: 'Localisation ROI Signal',
    currentValue: 82, detectedAt: '2026-08-12T03:00:00Z', isDemo: true,
  },
  {
    id: 'sig-006', type: 'CONCENTRATION_RISK', source: 'FINANCIAL_COMMAND',
    severity: 'IMPORTANT', entityType: 'MARKETPLACE', entityId: 'mkt-etsy-us',
    entityName: 'Etsy US', metricName: 'Portfolio Revenue Share',
    currentValue: 41, threshold: 35,
    detectedAt: '2026-08-12T00:00:00Z', isDemo: true,
  },
];

// ─── EXECUTIVE INSIGHTS ───────────────────────────────────────────────────────

export const DEMO_INSIGHTS: ExecutiveInsight[] = [
  {
    id: 'ins-001', signalIds: ['sig-001'], category: 'PERFORMANCE', status: 'RECOMMENDED',
    title: 'Etsy US conversion rate surged +17.8% — highest incremental margin channel',
    narrative: 'Etsy US conversion rate increased from 3.66% to 4.31% over the last 7 days, likely associated with recent merchandising improvements to How to Trade. This marketplace now produces the highest incremental contribution margin in the portfolio.',
    whyItMatters: 'Each 1% conversion improvement on Etsy US is associated with approximately £420 additional monthly net contribution. A sustained +0.65% improvement suggests a durable step-change, not noise.',
    financialExposureGbp: 1_080,
    affectedEntityNames: ['Etsy US', 'How to Trade'],
    likelyCause: 'Recent A/B copy improvement to product description and updated cover thumbnail.',
    createdAt: '2026-08-12T06:05:00Z', updatedAt: '2026-08-12T06:05:00Z', isDemo: true,
  },
  {
    id: 'ins-002', signalIds: ['sig-002'], category: 'RISK', status: 'APPROVAL_REQUIRED',
    title: 'Gumroad DE refund rate 8.2% — intervention threshold breached (7.0% limit)',
    narrative: 'Refund rate on Gumroad DE has risen from 5.1% to 8.2%, crossing the configured 7.0% intervention threshold. Portfolio average is 3.1%. The anomaly is localised to the German-language edition sold on Gumroad. Reviews and support tickets suggest expectation mismatches around beginner suitability.',
    whyItMatters: 'Sustained refunds above 8% risk marketplace payment account health. Financial exposure: approximately £380/month in returned revenue, plus reputational signal to marketplace algorithm.',
    financialExposureGbp: 4_500,
    affectedEntityNames: ['Gumroad DE', 'How to Trade (German)'],
    likelyCause: 'German-localised landing copy may be over-promising beginner outcomes.',
    createdAt: '2026-08-12T08:16:00Z', updatedAt: '2026-08-12T08:16:00Z', isDemo: true,
  },
  {
    id: 'ins-003', signalIds: ['sig-003'], category: 'OPPORTUNITY', status: 'RECOMMENDED',
    title: 'Payhip detected — 91% product-market fit for How to Trade',
    narrative: 'Marketplace Radar identified Payhip as a commercially attractive digital distribution channel. Fit score 91% based on product category match, fee structure (5% vs 25% Gumroad standard), audience profile, and direct integration feasibility.',
    whyItMatters: 'Payhip charges 5% (vs Gumroad at up to 25%), has an established UK/Europe digital product audience, and supports instant setup. Estimated time to first revenue: 47 minutes. First-year revenue opportunity: £3,200–£4,800.',
    financialExposureGbp: 4_000,
    affectedEntityNames: ['Payhip', 'How to Trade'],
    likelyCause: 'Routine Marketplace Radar scan identified during nightly intelligence cycle.',
    createdAt: '2026-08-12T04:05:00Z', updatedAt: '2026-08-12T04:05:00Z', isDemo: true,
  },
  {
    id: 'ins-004', signalIds: ['sig-006'], category: 'RISK', status: 'WATCHING',
    title: 'Etsy US now represents 41% of portfolio revenue — concentration risk HIGH',
    narrative: 'Following Etsy US growth, portfolio revenue concentration has increased to 41% from a single marketplace. This exceeds the configured 35% concentration risk threshold.',
    whyItMatters: 'Single-marketplace dependency creates structural fragility. A policy change, algorithm shift, or account issue on Etsy could materially impact 41% of portfolio revenue with no short-term recovery mechanism.',
    financialExposureGbp: 12_000,
    affectedEntityNames: ['Etsy US'],
    likelyCause: 'Etsy US outperformed while other channels remained stable.',
    createdAt: '2026-08-12T00:05:00Z', updatedAt: '2026-08-12T00:05:00Z', isDemo: true,
  },
];

// ─── FIVE THINGS THAT MATTER TODAY (ExecutivePriority[]) ─────────────────────

export const DEMO_FIVE_THINGS: ExecutivePriority[] = [
  {
    id: 'pri-001', rank: 1, insightId: 'ins-001', category: 'PERFORMANCE',
    title: 'Etsy US conversion +17.8% — capitalise now',
    subtitle: 'How to Trade / Etsy US',
    priorityScore: 91,
    scoreComponents: { impact: 88, confidence: 82, urgency: 85, strategicFit: 95, leverage: 90, effort: 20, riskPenalty: 10 },
    whyItMatters: 'This marketplace now produces the highest incremental contribution margin for How to Trade. Sustained conversion improvement suggests durable change, not noise.',
    recommendedAction: 'Increase promotional exposure on Etsy US and test a 12% price increase over 14 days. Estimated incremental contribution: £740–£1,080 over 30 days.',
    impact30DayLowGbp: 740, impact30DayHighGbp: 1_080,
    confidence: 'HIGH', confidencePct: 82, effortHours: 1.5, reversible: true, approvalRequired: false, autonomyEligible: true,
    actions: [
      { type: 'APPROVE_ACTION', label: 'APPROVE ACTION', variant: 'primary' },
      { type: 'MODEL_SCENARIO', label: 'MODEL SCENARIO', href: '/executive/scenarios', variant: 'secondary' },
      { type: 'DELEGATE_AUTOPILOT', label: 'DELEGATE TO AUTOPILOT', variant: 'secondary' },
      { type: 'INVESTIGATE', label: 'INVESTIGATE', href: '/executive/intelligence', variant: 'ghost' },
      { type: 'SNOOZE', label: 'SNOOZE', variant: 'ghost' },
    ],
    evidence: {
      dataSource: 'Merchandising Engine + Financial Command',
      dataPeriod: 'Last 7 days (5 Aug – 12 Aug 2026)',
      baselineDescription: '30-day average conversion rate: 3.66%',
      keyMetrics: [
        { label: 'Conversion Rate', value: '4.31%', trend: 'UP' },
        { label: 'vs 30-day Baseline', value: '+17.8%', trend: 'UP' },
        { label: 'Net Contribution Margin', value: '52%', trend: 'UP' },
        { label: 'Orders (7d)', value: '84', trend: 'UP' },
      ],
      assumptions: ['Conversion improvement is associated with merchandising changes made 6 August', 'Price elasticity assumption based on comparable products on Etsy'],
      confidenceReason: '7-day window has sufficient sample size (84 orders). Pattern consistent across 6 of 7 days.',
      relatedEvents: ['Merchandising update: cover thumbnail refresh (6 Aug)', 'Description copy A/B test concluded (8 Aug)'],
      isCausal: false,
    },
    whyRankedHere: 'Highest combined Impact × Leverage × Confidence score. Low effort, reversible, immediately actionable. Outranks refund issue due to positive asymmetry (upside opportunity vs ongoing cost).',
    isDemo: true,
  },
  {
    id: 'pri-002', rank: 2, insightId: 'ins-002', category: 'RISK',
    title: 'Gumroad DE refund rate 8.2% — intervention threshold breached',
    subtitle: 'How to Trade (German) / Gumroad DE',
    priorityScore: 87,
    scoreComponents: { impact: 72, confidence: 88, urgency: 95, strategicFit: 60, leverage: 70, effort: 30, riskPenalty: 65 },
    whyItMatters: 'Refund rate 8.2% vs portfolio average 3.1%. German-localised landing copy appears to be over-promising beginner outcomes. Risk to payment account health if sustained.',
    recommendedAction: 'Pause promotional traffic to Gumroad DE. Review and revise German localisation copy — specifically beginner-suitability language. Do not reinstate traffic until refund rate returns below 6%.',
    impact30DayLowGbp: -1_200, impact30DayHighGbp: -4_500,
    confidence: 'HIGH', confidencePct: 88, effortHours: 4, reversible: true, approvalRequired: true, autonomyEligible: false,
    actions: [
      { type: 'APPROVE_ACTION', label: 'PAUSE TRAFFIC — APPROVE', variant: 'danger' },
      { type: 'INVESTIGATE', label: 'REVIEW COPY', href: '/localisation', variant: 'secondary' },
      { type: 'MODEL_SCENARIO', label: 'MODEL SCENARIO', variant: 'secondary' },
      { type: 'SNOOZE', label: 'SNOOZE 48H', variant: 'ghost' },
    ],
    evidence: {
      dataSource: 'Financial Command + Localisation Engine',
      dataPeriod: 'Last 14 days (29 Jul – 12 Aug 2026)',
      baselineDescription: 'Portfolio average refund rate: 3.1%. Gumroad DE 30-day prior: 5.1%.',
      keyMetrics: [
        { label: 'Refund Rate', value: '8.2%', trend: 'UP' },
        { label: 'Portfolio Average', value: '3.1%', trend: 'FLAT' },
        { label: 'Intervention Threshold', value: '7.0%', trend: 'FLAT' },
        { label: 'Revenue at Risk', value: '£380/mo', trend: 'DOWN' },
      ],
      assumptions: ['Refund cause attributed to copy mismatch based on support ticket analysis', 'Financial exposure estimate based on current sales rate'],
      confidenceReason: 'Strong signal — consistent across 14-day window with multiple corroborating data points.',
      relatedEvents: ['German localisation published (1 Aug)', 'Support ticket volume increase (from 8 Aug)'],
      isCausal: false,
    },
    whyRankedHere: 'Highest urgency score (95/100). Risk of marketplace account health penalty makes this time-critical. Ranked above new marketplace opportunity due to protect-before-grow principle.',
    isDemo: true,
  },
  {
    id: 'pri-003', rank: 3, insightId: 'ins-003', category: 'OPPORTUNITY',
    title: 'Payhip: 91% fit score — 47-minute setup, 5% fees vs 25%',
    subtitle: 'New Marketplace / How to Trade',
    priorityScore: 79,
    scoreComponents: { impact: 75, confidence: 70, urgency: 55, strategicFit: 91, leverage: 85, effort: 15, riskPenalty: 20 },
    whyItMatters: 'Payhip charges 5% vs Gumroad\'s 25%, with a strong UK/Europe audience and direct checkout. Adding this marketplace improves portfolio diversification and reduces Etsy concentration risk.',
    recommendedAction: 'Launch How to Trade on Payhip with standard pricing. Estimated setup: 47 minutes. Monitor for 30 days before committing additional SKUs.',
    impact30DayLowGbp: 210, impact30DayHighGbp: 580,
    confidence: 'MODERATE', confidencePct: 70, effortHours: 0.8, reversible: true, approvalRequired: false, autonomyEligible: true,
    actions: [
      { type: 'APPROVE_ACTION', label: 'LAUNCH ON PAYHIP', variant: 'primary' },
      { type: 'INVESTIGATE', label: 'REVIEW MARKETPLACE', href: '/integrations', variant: 'secondary' },
      { type: 'MODEL_SCENARIO', label: 'MODEL SCENARIO', variant: 'secondary' },
      { type: 'SNOOZE', label: 'SNOOZE', variant: 'ghost' },
    ],
    evidence: {
      dataSource: 'Marketplace Radar',
      dataPeriod: 'Nightly scan — 12 Aug 2026',
      baselineDescription: 'Comparable digital product marketplaces generating £200–£600/mo in first 90 days.',
      keyMetrics: [
        { label: 'Fit Score', value: '91/100', trend: 'FLAT' },
        { label: 'Fee Rate', value: '5% (vs 25% Gumroad)', trend: 'FLAT' },
        { label: 'Setup Effort', value: '47 min', trend: 'FLAT' },
        { label: 'Audience (UK/EU)', value: 'High', trend: 'FLAT' },
      ],
      assumptions: ['Revenue estimate based on comparable products in same category', 'Integration is manual listing — no connector required'],
      confidenceReason: 'Moderate: marketplace has been validated externally but no Drawdown historical data exists yet.',
      relatedEvents: ['Marketplace Radar nightly scan (12 Aug)'],
      isCausal: false,
    },
    whyRankedHere: 'Highest strategic fit score (91/100). Very low effort, reversible, directly addresses concentration risk. Moderate confidence prevents ranking higher.',
    isDemo: true,
  },
  {
    id: 'pri-004', rank: 4, insightId: 'ins-004', category: 'OPPORTUNITY',
    title: 'Price elasticity model suggests HTT can absorb £5 increase on Etsy',
    subtitle: 'How to Trade / Pricing Optimisation',
    priorityScore: 73,
    scoreComponents: { impact: 78, confidence: 65, urgency: 45, strategicFit: 80, leverage: 75, effort: 20, riskPenalty: 25 },
    whyItMatters: 'Competitor analysis and conversion rate stability suggest How to Trade (£29) may be priced below optimal on Etsy US. A £5 increase to £34 would add approximately £480–£720/month net contribution assuming <5% conversion decline.',
    recommendedAction: 'Run a controlled 14-day price test on Etsy US at £34 (from £29). Set automatic revert if conversion drops >8%. Monitor for 21 days.',
    impact30DayLowGbp: 480, impact30DayHighGbp: 720,
    confidence: 'MODERATE', confidencePct: 65, effortHours: 0.5, reversible: true, approvalRequired: false, autonomyEligible: true,
    actions: [
      { type: 'APPROVE_ACTION', label: 'START PRICE TEST', variant: 'primary' },
      { type: 'MODEL_SCENARIO', label: 'MODEL FIRST', href: '/executive/scenarios', variant: 'secondary' },
      { type: 'DELEGATE_AUTOPILOT', label: 'DELEGATE TO AUTOPILOT', variant: 'secondary' },
      { type: 'SNOOZE', label: 'SNOOZE', variant: 'ghost' },
    ],
    evidence: {
      dataSource: 'Revenue Engine + Merchandising Engine',
      dataPeriod: '30-day analysis to 12 Aug 2026',
      baselineDescription: 'Current price: £29 Etsy US. Median competing product: £31–£36.',
      keyMetrics: [
        { label: 'Current Price', value: '£29.00', trend: 'FLAT' },
        { label: 'Competitor Median', value: '£33.50', trend: 'FLAT' },
        { label: 'Estimated Elasticity', value: '<5% conv. drop', trend: 'FLAT' },
        { label: 'Potential Uplift', value: '+£600/mo', trend: 'UP' },
      ],
      assumptions: ['Elasticity estimate is inferred — requires experiment to confirm', 'Conversion baseline is stable over last 30 days'],
      confidenceReason: 'Moderate confidence: elasticity estimate is model-derived, not directly measured. Experiment required to confirm.',
      relatedEvents: ['Competitor price analysis (11 Aug)'],
      isCausal: false,
    },
    whyRankedHere: 'Strong impact and strategic fit scores. Lower urgency and moderate confidence prevent higher ranking. Experiment is low risk and reversible — recommended before Gumroad DE remediation consumes attention.',
    isDemo: true,
  },
  {
    id: 'pri-005', rank: 5, insightId: 'ins-005', category: 'STRATEGIC',
    title: 'German localisation ROI threshold now met — invest or revert',
    subtitle: 'Localisation / How to Trade (German)',
    priorityScore: 68,
    scoreComponents: { impact: 82, confidence: 70, urgency: 40, strategicFit: 85, leverage: 90, effort: 55, riskPenalty: 30 },
    whyItMatters: 'German edition has reached the data threshold required to make a go/no-go localisation investment decision. Current German-market performance is above minimum ROI threshold (despite refund issue — which is a copy problem, not a product problem).',
    recommendedAction: 'Commission full German localisation of How to Trade (estimated £800). Address refund copy issue first. Full German RSA unlock: +3.8 RSA points across 4 additional DACH marketplaces.',
    impact30DayLowGbp: 620, impact30DayHighGbp: 1_400,
    confidence: 'MODERATE', confidencePct: 70, effortHours: 40, reversible: false, approvalRequired: true, autonomyEligible: false,
    actions: [
      { type: 'APPROVE_ACTION', label: 'COMMISSION LOCALISATION', variant: 'primary' },
      { type: 'MODEL_SCENARIO', label: 'MODEL SCENARIO', variant: 'secondary' },
      { type: 'INVESTIGATE', label: 'VIEW LOCALISATION PLAN', href: '/localisation', variant: 'secondary' },
      { type: 'SNOOZE', label: 'SNOOZE 14 DAYS', variant: 'ghost' },
    ],
    evidence: {
      dataSource: 'Localisation Engine + Financial Command',
      dataPeriod: '45-day localisation performance review',
      baselineDescription: 'German edition launched 1 Aug. Minimum 45-day window required for meaningful signal.',
      keyMetrics: [
        { label: 'German Sales', value: '£890 (45d)', trend: 'UP' },
        { label: 'DACH Expansion Potential', value: '+3.8 RSA pts', trend: 'FLAT' },
        { label: 'Dev Cost', value: '£800 est.', trend: 'FLAT' },
        { label: 'Payback Period', value: '~4.5 months', trend: 'FLAT' },
      ],
      assumptions: ['Cost estimate is for professional translator engagement', 'DACH RSA unlocks assume standard marketplace on-boarding timeline'],
      confidenceReason: 'Moderate: German sales data is present but 45-day window is early. Refund issue adds noise to signal quality.',
      relatedEvents: ['German edition published (1 Aug)', 'Gumroad DE refund anomaly (8 Aug)'],
      isCausal: false,
    },
    whyRankedHere: 'High strategic leverage (90/100) and impact, but non-reversible investment and high effort reduce score. Conditional on resolving Gumroad DE refund issue first.',
    isDemo: true,
  },
];

// ─── ACTIVE OBJECTIVE ─────────────────────────────────────────────────────────

export const DEMO_OBJECTIVES: ExecutiveObjective[] = [
  {
    id: 'obj-001',
    naturalLanguage: 'Maximise net contribution from How to Trade over the next 90 days without increasing refund rate.',
    parsed: {
      goal: 'Maximise net contribution',
      targetMetric: 'Net Contribution (GBP)',
      targetValue: 15_000,
      targetCurrency: 'GBP',
      scope: 'Product: How to Trade (DD-HTT-001)',
      timeHorizonDays: 90,
      constraints: [
        { metric: 'Refund Rate', operator: 'MUST_NOT_EXCEED', value: 5.0, unit: '%', isViolated: false },
      ],
      budgetGbp: undefined,
      riskTolerance: 'BALANCED',
      availableLevers: ['pricing', 'marketplace_expansion', 'merchandising', 'bundles', 'localisation', 'affiliate_distribution', 'conversion_optimisation'],
    },
    status: 'ON_TRACK',
    baselineValue: 4_200,
    currentValue: 6_650,
    targetValue: 15_000,
    expectedValue: 13_800,
    progressPct: 44.3,
    daysRemaining: 51,
    successProbabilityPct: 74,
    whyProbability: 'Current trajectory projects £13,800 by day 90 (92% of target). Etsy US conversion uplift provides upside; Gumroad DE refund issue reduces confidence. Price test and Payhip launch, if approved, would close the gap.',
    strategyElements: [
      { id: 'se-001', title: 'Increase profitable marketplace penetration', hypothesis: 'Expanding listings on high-margin channels increases net contribution without new acquisition spend', expectedImpactGbp: 2_400, confidence: 'MODERATE', costGbp: 0, effortHours: 6, risk: 'LOW', ownerModule: 'Distribution Engine', autonomyStatus: 'SEMI_AUTO', startDate: '2026-08-13', evaluationDate: '2026-09-12', successMetric: 'Marketplace count +3, contribution +£800/mo', status: 'IN_PROGRESS' },
      { id: 'se-002', title: 'Test price elasticity on Etsy US (+£5)', hypothesis: 'Price increase at current conversion rates yields net positive contribution', expectedImpactGbp: 600, confidence: 'MODERATE', costGbp: 0, effortHours: 0.5, risk: 'LOW', ownerModule: 'Merchandising Engine', autonomyStatus: 'SEMI_AUTO', startDate: '2026-08-13', evaluationDate: '2026-08-27', successMetric: 'Conversion decline <5%, contribution +£480/mo', status: 'NOT_STARTED' },
      { id: 'se-003', title: 'Launch Payhip distribution channel', hypothesis: 'Low-fee marketplace (5%) improves net margin on incremental sales', expectedImpactGbp: 400, confidence: 'LOW', costGbp: 0, effortHours: 0.8, risk: 'LOW', ownerModule: 'Distribution Engine', autonomyStatus: 'MANUAL', startDate: '2026-08-14', evaluationDate: '2026-09-14', successMetric: 'First sale within 30 days, £200+ contribution by day 60', status: 'NOT_STARTED' },
      { id: 'se-004', title: 'Resolve Gumroad DE refund issue', hypothesis: 'Fixing localisation copy will reduce refunds and protect existing revenue', expectedImpactGbp: 380, confidence: 'HIGH', costGbp: 200, effortHours: 4, risk: 'LOW', ownerModule: 'Localisation Engine', autonomyStatus: 'MANUAL', startDate: '2026-08-13', evaluationDate: '2026-08-27', successMetric: 'Refund rate below 5% within 21 days', status: 'NOT_STARTED' },
      { id: 'se-005', title: 'Improve bundle attachment on Etsy US', hypothesis: 'Adding a companion workbook bundle increases AOV by 40%', expectedImpactGbp: 850, confidence: 'MODERATE', costGbp: 0, effortHours: 3, risk: 'LOW', ownerModule: 'Merchandising Engine', autonomyStatus: 'SEMI_AUTO', startDate: '2026-08-16', evaluationDate: '2026-09-16', successMetric: 'Bundle attach rate >15%, AOV +£8', status: 'NOT_STARTED' },
    ],
    experimentsRunning: 1,
    actionsCompleted: 8,
    actionsQueued: 4,
    createdAt: '2026-08-01T09:00:00Z',
    reviewDate: '2026-11-01T09:00:00Z',
    isDemo: true,
  },
];

// ─── SCENARIOS ────────────────────────────────────────────────────────────────

export const DEMO_SCENARIOS: ExecutiveScenario[] = [
  {
    id: 'scn-001',
    name: 'Etsy US price increase +15%',
    description: 'What happens if we raise How to Trade price from £29 to £33.35 on Etsy US?',
    assumptions: [
      { variable: 'Price (GBP)', baseline: 29, scenarioValue: 33.35, unit: '£', confidence: 'HIGH' },
      { variable: 'Conversion Rate (% change)', baseline: 0, scenarioValue: -4, unit: '%', confidence: 'MODERATE' },
      { variable: 'Monthly Orders', baseline: 310, scenarioValue: 298, unit: 'orders', confidence: 'MODERATE' },
    ],
    baseCase: {
      label: 'BASE', grossRevenueGbp: 9_840, netRevenueGbp: 4_720, contributionGbp: 3_140,
      ordersCount: 298, avgOrderValueGbp: 33.05, refundRatePct: 3.2, contributionMarginPct: 47.1,
      probability: 55, narrative: 'Modest conversion decline offset by higher price. Net contribution improves.',
    },
    bullCase: {
      label: 'BULL', grossRevenueGbp: 10_850, netRevenueGbp: 5_208, contributionGbp: 3_860,
      ordersCount: 310, avgOrderValueGbp: 35.00, refundRatePct: 2.9, contributionMarginPct: 50.2,
      probability: 25, narrative: 'Price inelastic — no conversion decline. Full revenue uplift captured.',
    },
    bearCase: {
      label: 'BEAR', grossRevenueGbp: 8_200, netRevenueGbp: 3_936, contributionGbp: 2_420,
      ordersCount: 246, avgOrderValueGbp: 33.35, refundRatePct: 4.1, contributionMarginPct: 40.8,
      probability: 20, narrative: 'Conversion falls >15%. Higher-than-expected price sensitivity. Net contribution declines.',
    },
    recommendedCase: {
      label: 'RECOMMENDED', grossRevenueGbp: 9_840, netRevenueGbp: 4_720, contributionGbp: 3_140,
      ordersCount: 298, avgOrderValueGbp: 33.05, refundRatePct: 3.2, contributionMarginPct: 47.1,
      probability: 55, narrative: 'Run as a 14-day controlled test with automatic revert if conversion falls >8%.',
    },
    monteCarloLowGbp: 2_420, monteCarloMedianGbp: 3_200, monteCarloHighGbp: 3_860,
    monteCarloProbabilityAboveTargetPct: 68,
    monteCarloConfidence: 'MODERATE',
    recommendation: 'Proceed with controlled 14-day price test. Auto-revert guardrail at -8% conversion.',
    whatWouldChangeMind: ['Conversion falls >8% in first 7 days', 'Competitor drops price materially', 'Refund rate increases following price change', 'Sample size insufficient (< 50 orders) after 14 days'],
    createdAt: '2026-08-12T10:00:00Z',
    isDemo: true,
  },
];

// ─── PORTFOLIO PRODUCTS ───────────────────────────────────────────────────────

export const DEMO_PORTFOLIO_PRODUCTS: PortfolioProduct[] = [
  {
    id: 'DD-HTT-001', sku: 'DD-HTT-001', title: 'How to Trade',
    classification: 'STAR', grossRevenueGbp: 8_420, netRevenueGbp: 6_314, contributionGbp: 4_280,
    contributionMarginPct: 50.8, growthPct: 14.1, refundRatePct: 3.6,
    conversionRatePct: 4.1, marketplaceCount: 7, localisationCount: 2,
    derivativeCount: 3, portfolioSharePct: 78.4, strategicValue: 92, operationalBurden: 35, isDemo: true,
  },
  {
    id: 'DD-TQE-001', sku: 'DD-TQE-001', title: 'The Quiet Edge',
    classification: 'INCUBATE', grossRevenueGbp: 1_220, netRevenueGbp: 915, contributionGbp: 590,
    contributionMarginPct: 48.4, growthPct: 31.2, refundRatePct: 1.8,
    conversionRatePct: 2.9, marketplaceCount: 3, localisationCount: 0,
    derivativeCount: 0, portfolioSharePct: 11.4, strategicValue: 68, operationalBurden: 18, isDemo: true,
  },
  {
    id: 'DD-HTT-WKB', sku: 'DD-HTT-WKB', title: 'How to Trade — Workbook',
    classification: 'SCALE', grossRevenueGbp: 1_090, netRevenueGbp: 818, contributionGbp: 570,
    contributionMarginPct: 52.3, growthPct: 8.0, refundRatePct: 0.9,
    conversionRatePct: 3.4, marketplaceCount: 4, localisationCount: 0,
    derivativeCount: 0, portfolioSharePct: 10.2, strategicValue: 74, operationalBurden: 12, isDemo: true,
  },
];

// ─── PORTFOLIO MARKETPLACES ───────────────────────────────────────────────────

export const DEMO_PORTFOLIO_MARKETPLACES: PortfolioMarketplace[] = [
  { id: 'mkt-etsy-us', name: 'Etsy US', classification: 'SCALE', grossRevenueGbp: 4_420, netRevenueGbp: 3_314, contributionGbp: 2_240, contributionMarginPct: 50.7, feePct: 12, refundRatePct: 2.9, conversionRatePct: 4.31, productCount: 3, localisationCount: 1, automationCapability: 70, audienceFit: 88, geographicReach: 'US/UK', policyRisk: 'LOW', dependencyRisk: 'HIGH', portfolioSharePct: 41.2, isDemo: true },
  { id: 'mkt-gumroad', name: 'Gumroad US', classification: 'OPTIMISE', grossRevenueGbp: 2_100, netRevenueGbp: 1_575, contributionGbp: 945, contributionMarginPct: 45.0, feePct: 10, refundRatePct: 3.1, conversionRatePct: 3.2, productCount: 4, localisationCount: 1, automationCapability: 60, audienceFit: 82, geographicReach: 'US/Global', policyRisk: 'LOW', dependencyRisk: 'MEDIUM', portfolioSharePct: 19.6, isDemo: true },
  { id: 'mkt-gumroad-de', name: 'Gumroad DE', classification: 'WATCH', grossRevenueGbp: 890, netRevenueGbp: 668, contributionGbp: 310, contributionMarginPct: 34.8, feePct: 10, refundRatePct: 8.2, conversionRatePct: 2.1, productCount: 1, localisationCount: 1, automationCapability: 60, audienceFit: 72, geographicReach: 'DE/AT/CH', policyRisk: 'LOW', dependencyRisk: 'LOW', portfolioSharePct: 8.3, isDemo: true },
  { id: 'mkt-amazon-kdp', name: 'Amazon KDP', classification: 'HOLD', grossRevenueGbp: 1_380, netRevenueGbp: 896, contributionGbp: 480, contributionMarginPct: 34.8, feePct: 35, refundRatePct: 1.8, conversionRatePct: 2.8, productCount: 2, localisationCount: 0, automationCapability: 50, audienceFit: 75, geographicReach: 'US/UK/EU', policyRisk: 'MEDIUM', dependencyRisk: 'MEDIUM', portfolioSharePct: 12.9, isDemo: true },
  { id: 'mkt-payhip', name: 'Payhip (NEW)', classification: 'TEST', grossRevenueGbp: 0, netRevenueGbp: 0, contributionGbp: 0, contributionMarginPct: 0, feePct: 5, refundRatePct: 0, conversionRatePct: 0, productCount: 0, localisationCount: 0, automationCapability: 40, audienceFit: 91, geographicReach: 'UK/EU', policyRisk: 'LOW', dependencyRisk: 'LOW', portfolioSharePct: 0, isDemo: true },
];

// ─── OPPORTUNITIES ────────────────────────────────────────────────────────────

export const DEMO_OPPORTUNITIES: ExecutiveOpportunity[] = [
  { id: 'opp-001', category: 'NEW_MARKETPLACE', title: 'Launch How to Trade on Payhip', description: '5% fee marketplace with 91% product-market fit. Instant digital delivery, UK/EU audience.', estimatedAnnualValueGbp: 3_800, expected30DayGbp: 240, expected90DayGbp: 870, implementationCostGbp: 0, effortHours: 0.8, timeToFirstRevenueDays: 3, successProbabilityPct: 72, opportunityScore: 88, scalability: 'MEDIUM', automationPotential: 'PARTIAL', reversibility: 'EASY', downside: 'Minimal — low effort, free to list, low fee structure.', confidence: 'MODERATE', relatedProductSkus: ['DD-HTT-001'], relatedMarketplaceIds: ['mkt-payhip'], isDemo: true },
  { id: 'opp-002', category: 'PRICE_OPTIMISATION', title: 'Etsy US price increase £29 → £34', description: 'Price elasticity model and competitor benchmarking suggest room to increase price with minimal conversion impact.', estimatedAnnualValueGbp: 7_200, expected30DayGbp: 600, expected90DayGbp: 1_800, implementationCostGbp: 0, effortHours: 0.5, timeToFirstRevenueDays: 1, successProbabilityPct: 65, opportunityScore: 82, scalability: 'LOW', automationPotential: 'FULL', reversibility: 'EASY', downside: 'Conversion decline >8% if price elasticity is higher than modelled.', confidence: 'MODERATE', relatedProductSkus: ['DD-HTT-001'], relatedMarketplaceIds: ['mkt-etsy-us'], isDemo: true },
  { id: 'opp-003', category: 'BUNDLE', title: 'HTT + Workbook bundle on Etsy US', description: 'Create a bundle combining How to Trade + Workbook at 20% discount. Expected AOV uplift: +£8.', estimatedAnnualValueGbp: 5_800, expected30DayGbp: 420, expected90DayGbp: 1_400, implementationCostGbp: 0, effortHours: 2, timeToFirstRevenueDays: 5, successProbabilityPct: 70, opportunityScore: 77, scalability: 'HIGH', automationPotential: 'PARTIAL', reversibility: 'EASY', downside: 'Bundle cannibalisation of full-price individual sales possible.', confidence: 'MODERATE', relatedProductSkus: ['DD-HTT-001', 'DD-HTT-WKB'], relatedMarketplaceIds: ['mkt-etsy-us'], isDemo: true },
  { id: 'opp-004', category: 'LOCALISATION', title: 'Full German localisation — DACH expansion', description: '4 additional DACH marketplaces unlockable. 45-day pilot data exceeds minimum ROI threshold.', estimatedAnnualValueGbp: 8_400, expected30DayGbp: 420, expected90DayGbp: 2_100, implementationCostGbp: 800, effortHours: 40, timeToFirstRevenueDays: 45, successProbabilityPct: 62, opportunityScore: 71, scalability: 'HIGH', automationPotential: 'NONE', reversibility: 'MODERATE', downside: '£800 upfront investment. 4.5-month payback. Conditional on fixing Gumroad DE refund issue first.', confidence: 'MODERATE', relatedProductSkus: ['DD-HTT-001-DE'], relatedMarketplaceIds: ['mkt-gumroad-de'], isDemo: true },
];

// ─── RISKS ────────────────────────────────────────────────────────────────────

export const DEMO_RISKS: ExecutiveRisk[] = [
  { id: 'rsk-001', category: 'CONCENTRATION', title: 'Etsy US marketplace concentration — 41% of revenue', description: 'Single marketplace dependence creates structural fragility.', likelihood: 30, impact: 85, velocity: 'SLOW', exposureGbp: 12_000, mitigation: 'Accelerate Payhip, Shopify direct, and Amazon KDP growth. Target max 30% per channel.', owner: 'Executive / Distribution Engine', status: 'ACTIVE', triggerCondition: 'Etsy revenue share >35%', reviewDate: '2026-09-12', isDemo: true },
  { id: 'rsk-002', category: 'REFUND', title: 'Gumroad DE refund rate 8.2% — payment account risk', description: 'Sustained high refunds risk payment processor health rating.', likelihood: 75, impact: 70, velocity: 'FAST', exposureGbp: 4_500, mitigation: 'Pause promotional traffic. Revise German copy. Monitor for 21 days.', owner: 'Localisation Engine + Executive', status: 'ESCALATED', triggerCondition: 'Refund rate >7%', reviewDate: '2026-08-26', isDemo: true },
  { id: 'rsk-003', category: 'PRODUCT', title: 'Portfolio product concentration — 78% HTT', description: 'How to Trade represents 78.4% of portfolio revenue. Single-product dependency.', likelihood: 25, impact: 80, velocity: 'SLOW', exposureGbp: 18_000, mitigation: 'Invest in The Quiet Edge expansion. Create derivative products from HTT. Accelerate product pipeline.', owner: 'Product Factory', status: 'ACTIVE', triggerCondition: 'Single product >70% portfolio revenue', reviewDate: '2026-10-01', isDemo: true },
];

// ─── DECISIONS ────────────────────────────────────────────────────────────────

export const DEMO_DECISIONS: ExecutiveDecision[] = [
  { id: 'dec-001', title: 'Approved German localisation pilot on Gumroad', description: 'Approved €149 BRL pricing for German-language How to Trade pilot, targeting DACH audience.', rationale: 'Sufficient German-language search demand and no prior competition detected.', expectedResultDescription: 'Positive ROI within 90 days, refund rate <5%.', expectedImpactGbp: 420, actualImpactGbp: 310, decidedAt: '2026-08-01T09:00:00Z', decidedBy: 'CEO', reviewDate: '2026-08-26T09:00:00Z', outcome: 'NEGATIVE', outcomeNarrative: 'Revenue is positive but refund rate exceeded threshold (8.2% vs <5% target). Copy issue identified.', forecastAccuracyPct: 74, isDemo: true },
  { id: 'dec-002', title: 'Activated Autopilot for distribution queue', description: 'Delegated distribution optimisation tasks to Autopilot (Operator mode) within ±5% pricing guardrail.', rationale: 'Reduce manual overhead on routine listing management.', expectedResultDescription: 'Save 4–6 hours/week of manual work. Improve listing consistency.', expectedImpactGbp: 800, decidedAt: '2026-07-20T14:00:00Z', decidedBy: 'CEO', reviewDate: '2026-08-20T09:00:00Z', outcome: 'POSITIVE', outcomeNarrative: 'Autopilot completed 23 distribution tasks in 3 weeks. Listing quality score +12 points. No guardrail violations.', forecastAccuracyPct: 88, isDemo: true },
];

// ─── FORECAST ─────────────────────────────────────────────────────────────────

export const DEMO_FORECASTS: ForecastPeriod[] = [
  {
    periodDays: 7, label: '7-Day Forecast', grossRevenueGbp: 2_400, netRevenueGbp: 1_920, contributionGbp: 1_140,
    ordersCount: 78, avgOrderValueGbp: 30.77, refundCount: 3, bestCaseGbp: 1_380, worstCaseGbp: 820,
    confidence: 'HIGH',
    drivers: [
      { description: 'Etsy US momentum (continued)', deltaGbp: 480, confidence: 'HIGH', type: 'POSITIVE' },
      { description: 'Weekend organic traffic uplift', deltaGbp: 190, confidence: 'MODERATE', type: 'POSITIVE' },
      { description: 'Gumroad DE traffic paused (risk mitigation)', deltaGbp: -120, confidence: 'HIGH', type: 'NEGATIVE' },
    ],
  },
  {
    periodDays: 30, label: '30-Day Forecast', grossRevenueGbp: 10_200, netRevenueGbp: 8_160, contributionGbp: 4_820,
    ordersCount: 335, avgOrderValueGbp: 30.45, refundCount: 12, bestCaseGbp: 5_900, worstCaseGbp: 3_400,
    confidence: 'MODERATE',
    drivers: [
      { description: 'Etsy US conversion maintained at +17.8%', deltaGbp: 1_080, confidence: 'MODERATE', type: 'POSITIVE' },
      { description: 'Price test (+£5 Etsy US)', deltaGbp: 600, confidence: 'MODERATE', type: 'POSITIVE' },
      { description: 'Payhip launch (first 30 days)', deltaGbp: 240, confidence: 'LOW', type: 'POSITIVE' },
      { description: 'Gumroad DE refund remediation cost', deltaGbp: -200, confidence: 'HIGH', type: 'NEGATIVE' },
      { description: 'Amazon KDP conversion weakness', deltaGbp: -480, confidence: 'MODERATE', type: 'NEGATIVE' },
    ],
  },
  {
    periodDays: 90, label: '90-Day Forecast', grossRevenueGbp: 31_500, netRevenueGbp: 25_200, contributionGbp: 14_800,
    ordersCount: 1_040, avgOrderValueGbp: 30.29, refundCount: 38, bestCaseGbp: 18_200, worstCaseGbp: 11_400,
    confidence: 'MODERATE',
    drivers: [
      { description: 'Etsy US growth trajectory', deltaGbp: 2_400, confidence: 'MODERATE', type: 'POSITIVE' },
      { description: 'New marketplace expansion (Payhip + 2 others)', deltaGbp: 870, confidence: 'LOW', type: 'POSITIVE' },
      { description: 'Price optimisation (if approved)', deltaGbp: 1_800, confidence: 'MODERATE', type: 'POSITIVE' },
      { description: 'Bundle attachment on Etsy US', deltaGbp: 1_400, confidence: 'MODERATE', type: 'POSITIVE' },
      { description: 'Gumroad DE refund impact (ongoing)', deltaGbp: -650, confidence: 'HIGH', type: 'NEGATIVE' },
      { description: 'Amazon KDP conversion weakness', deltaGbp: -480, confidence: 'MODERATE', type: 'NEGATIVE' },
    ],
  },
];

// ─── APPROVALS QUEUE ──────────────────────────────────────────────────────────

export const DEMO_APPROVALS: ExecutiveApproval[] = [
  { id: 'apr-001', requestedAction: 'Pause all promotional traffic to Gumroad DE for 21 days', requestingModule: 'Anomaly Engine', reason: 'Refund rate 8.2% exceeds 7% threshold', financialImpactGbp: -380, confidencePct: 88, downside: 'Loss of ~£380 in expected monthly revenue from German channel', reversible: true, deadline: '2026-08-14T00:00:00Z', linkedObjectiveId: 'obj-001', status: 'PENDING', createdAt: '2026-08-12T08:20:00Z', isDemo: true },
  { id: 'apr-002', requestedAction: 'Commission German localisation (full edition) — £800 spend', requestingModule: 'Localisation Engine', reason: 'ROI threshold crossed after 45-day pilot', financialImpactGbp: -800, confidencePct: 70, downside: '£800 non-refundable investment. Payback period 4.5 months.', reversible: false, linkedObjectiveId: 'obj-001', status: 'PENDING', createdAt: '2026-08-12T07:00:00Z', isDemo: true },
  { id: 'apr-003', requestedAction: 'Run 14-day price test: How to Trade Etsy US £29 → £34', requestingModule: 'Merchandising Engine', reason: 'Elasticity model and competitor analysis support test', financialImpactGbp: 600, confidencePct: 65, downside: 'Potential conversion drop. Auto-revert guardrail set at -8%.', reversible: true, linkedObjectiveId: 'obj-001', status: 'PENDING', createdAt: '2026-08-12T09:00:00Z', isDemo: true },
];

// ─── INTERVENTION RULES ───────────────────────────────────────────────────────

export const DEMO_INTERVENTION_RULES: InterventionRule[] = [
  { id: 'rule-001', name: 'Refund Rate Critical', description: 'Trigger when refund rate exceeds threshold', metric: 'refund_rate_pct', operator: 'GREATER_THAN', threshold: 7.0, unit: '%', level: 3, isActive: true, isDemo: true },
  { id: 'rule-002', name: 'Revenue Drop Major', description: 'Trigger when revenue drops >25% vs 30-day baseline', metric: 'revenue_vs_baseline_pct', operator: 'LESS_THAN', threshold: -25, unit: '%', level: 3, isActive: true, isDemo: true },
  { id: 'rule-003', name: 'Conversion Drop', description: 'Trigger when conversion falls >20% vs baseline', metric: 'conversion_vs_baseline_pct', operator: 'LESS_THAN', threshold: -20, unit: '%', level: 2, isActive: true, isDemo: true },
  { id: 'rule-004', name: 'Marketplace Concentration', description: 'Alert when single marketplace exceeds 35% of portfolio revenue', metric: 'marketplace_portfolio_share_pct', operator: 'GREATER_THAN', threshold: 35, unit: '%', level: 2, isActive: true, isDemo: true },
  { id: 'rule-005', name: 'Contribution Margin Floor', description: 'Alert when surface contribution falls below 25%', metric: 'contribution_margin_pct', operator: 'LESS_THAN', threshold: 25, unit: '%', level: 2, isActive: true, isDemo: true },
  { id: 'rule-006', name: 'Automation Failure', description: 'Emergency stop after 3 consecutive automation failures', metric: 'consecutive_automation_failures', operator: 'GREATER_THAN', threshold: 3, unit: 'count', level: 5, isActive: true, isDemo: true },
];

// ─── GUARDRAILS ───────────────────────────────────────────────────────────────

export const DEMO_GUARDRAILS: ExecutiveGuardrail[] = [
  { id: 'gr-001', name: 'Maximum Price Movement', description: 'Autonomous price changes capped at ±10%', type: 'FINANCIAL_LIMIT', value: 10, unit: '% of current price', isActive: true },
  { id: 'gr-002', name: 'Maximum Promotional Discount', description: 'Promotional discounts cannot exceed 15%', type: 'FINANCIAL_LIMIT', value: 15, unit: '%', isActive: true },
  { id: 'gr-003', name: 'Maximum Experiment Budget', description: 'Single experiment spend cap without approval', type: 'FINANCIAL_LIMIT', value: 250, unit: 'GBP', isActive: true },
  { id: 'gr-004', name: 'Maximum Daily Marketing Spend', description: 'Autonomous daily spend ceiling', type: 'FINANCIAL_LIMIT', value: 50, unit: 'GBP/day', isActive: true },
  { id: 'gr-005', name: 'Product Removal', description: 'OS cannot remove a product without explicit CEO approval', type: 'APPROVAL_REQUIRED', isActive: true },
  { id: 'gr-006', name: 'Legal Terms Acceptance', description: 'OS cannot accept legal terms, contracts, or KYC documents autonomously', type: 'PERMANENTLY_PROHIBITED', isActive: true },
  { id: 'gr-007', name: 'Tax Configuration', description: 'OS cannot modify tax configuration or banking details', type: 'PERMANENTLY_PROHIBITED', isActive: true },
  { id: 'gr-008', name: 'Source Document Modification', description: 'OS cannot alter core source documents or master IP assets', type: 'PERMANENTLY_PROHIBITED', isActive: true },
];

// ─── EXECUTIVE PREFERENCES ────────────────────────────────────────────────────

export const DEMO_PREFERENCES: ExecutivePreferences = {
  revenueTargetGbp: 120_000,
  contributionTargetGbp: 55_000,
  refundCeilingPct: 5.0,
  growthTargetPct: 25,
  riskTolerance: 'BALANCED',
  timeHorizon: 'MEDIUM',
  autonomyMode: 'OPERATOR',
  priorityWeights: W,
  dailyBriefEnabled: true,
  weeklyReviewEnabled: true,
  monthlyReportEnabled: true,
};

// ─── ANALYST QUERY EXAMPLES ───────────────────────────────────────────────────

export const DEMO_ANALYST_QUERIES = [
  { id: 'q1', question: 'Why did profit fall this week?', category: 'FINANCIAL' },
  { id: 'q2', question: 'Which product should I build next?', category: 'PRODUCT' },
  { id: 'q3', question: 'Where should I distribute How to Trade next?', category: 'DISTRIBUTION' },
  { id: 'q4', question: 'Which marketplace is wasting the most effort?', category: 'MARKETPLACE' },
  { id: 'q5', question: 'Where can we generate another £5,000 next month?', category: 'GROWTH' },
  { id: 'q6', question: 'What is our biggest commercial risk?', category: 'RISK' },
  { id: 'q7', question: 'Should we raise prices?', category: 'PRICING' },
  { id: 'q8', question: 'Which localisation should we build next?', category: 'LOCALISATION' },
  { id: 'q9', question: 'What happened while I was away?', category: 'BRIEFING' },
  { id: 'q10', question: 'What would you do if this were your business?', category: 'STRATEGIC' },
];
