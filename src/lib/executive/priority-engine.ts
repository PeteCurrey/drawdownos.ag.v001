/**
 * DRAWDOWN OS — EXECUTIVE INTELLIGENCE & CONTROL LAYER
 * Priority Engine — Executive Priority Score Calculator
 * Formula: (Impact × Wi) × (Confidence × Wc) × (Urgency × Wu) × (Fit × Wf) × (Leverage × Wl)
 *         ÷ (Effort × We) × (1 - RiskPenalty × Wr)  →  normalised 0–100
 */

import type { PriorityScoreComponents, PriorityScoreWeights, ExecutivePriority } from './types';
import { DEFAULT_PRIORITY_WEIGHTS } from './types';

export function calculatePriorityScore(
  components: PriorityScoreComponents,
  weights: PriorityScoreWeights = DEFAULT_PRIORITY_WEIGHTS
): number {
  const { impact, confidence, urgency, strategicFit, leverage, effort, riskPenalty } = components;
  const W = weights;

  // Weighted numerator components (0–100 inputs, weighted)
  const numerator =
    (impact / 100 * W.impact) *
    (confidence / 100 * W.confidence) *
    (urgency / 100 * W.urgency) *
    (strategicFit / 100 * W.strategicFit) *
    (leverage / 100 * W.leverage);

  // Effort divisor: high effort reduces score
  const effortDivisor = Math.max(0.1, (effort / 100) * W.effort + (1 - W.effort));

  // Risk penalty: high risk reduces score
  const riskMultiplier = 1 - (riskPenalty / 100) * W.riskPenalty;

  const raw = (numerator / effortDivisor) * riskMultiplier;

  // Normalise to 0–100 scale (raw max is approximately 1 when all inputs are 100)
  const normalised = Math.min(100, Math.round(raw * 10_000));
  return normalised;
}

export interface PriorityScoreBreakdown {
  score: number;
  impactContribution: number;
  confidenceContribution: number;
  urgencyContribution: number;
  fitContribution: number;
  leverageContribution: number;
  effortPenalty: number;
  riskPenalty: number;
  interpretation: string;
  tier: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export function explainPriorityScore(
  components: PriorityScoreComponents,
  weights: PriorityScoreWeights = DEFAULT_PRIORITY_WEIGHTS
): PriorityScoreBreakdown {
  const score = calculatePriorityScore(components, weights);

  const tier: PriorityScoreBreakdown['tier'] =
    score >= 85 ? 'CRITICAL' :
    score >= 70 ? 'HIGH' :
    score >= 50 ? 'MEDIUM' : 'LOW';

  const interpretation =
    score >= 85
      ? 'Immediate action recommended. High impact, high confidence, high urgency.'
      : score >= 70
      ? 'Strong candidate for near-term action. Evidence supports value.'
      : score >= 50
      ? 'Monitor and evaluate. Moderate potential requiring more data or lower urgency.'
      : 'Low priority at this time. Consider if circumstances change.';

  return {
    score,
    impactContribution: Math.round(components.impact * weights.impact),
    confidenceContribution: Math.round(components.confidence * weights.confidence),
    urgencyContribution: Math.round(components.urgency * weights.urgency),
    fitContribution: Math.round(components.strategicFit * weights.strategicFit),
    leverageContribution: Math.round(components.leverage * weights.leverage),
    effortPenalty: Math.round(components.effort * weights.effort),
    riskPenalty: Math.round(components.riskPenalty * weights.riskPenalty),
    interpretation,
    tier,
  };
}

export function rankPriorities(
  priorities: ExecutivePriority[],
  weights: PriorityScoreWeights = DEFAULT_PRIORITY_WEIGHTS
): ExecutivePriority[] {
  return [...priorities]
    .map(p => ({
      ...p,
      priorityScore: calculatePriorityScore(p.scoreComponents, weights),
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .map((p, i) => ({ ...p, rank: i + 1 }));
}
