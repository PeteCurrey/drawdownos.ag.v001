/**
 * DRAWDOWN OS — AUTONOMOUS EXPERIMENTATION & OPTIMISATION ENGINE
 * Experiment Priority Score Calculator
 * Formula:
 *   Score = (FinancialImpact × 0.30)
 *         × (Confidence × 0.20)
 *         × (LearningValue × 0.15)
 *         × (StrategicRelevance × 0.15)
 *         × (SampleAvailability × 0.10)
 *         ÷ (Effort × 0.10)
 *         × (1 - Downside × 0.10)
 *         × ReversibilityBonus (1.0–1.2)
 * → Normalised 0–100
 */

import type { ExperimentPriorityInputs, Experiment } from './types';

export function calculateExperimentPriorityScore(inputs: ExperimentPriorityInputs): number {
  const {
    financialImpactScore,
    confidence,
    learningValue,
    strategicRelevance,
    sampleAvailability,
    effort,
    downside,
    reversibilityBonus,
  } = inputs;

  const wImpact = 0.30;
  const wConf = 0.20;
  const wLearn = 0.15;
  const wStrat = 0.15;
  const wSample = 0.10;
  const wEffort = 0.10;
  const wDownside = 0.10;

  const numerator =
    (financialImpactScore / 100 * wImpact) *
    (confidence / 100 * wConf) *
    (learningValue / 100 * wLearn) *
    (strategicRelevance / 100 * wStrat) *
    (sampleAvailability / 100 * wSample);

  const effortDivisor = Math.max(0.1, (effort / 100) * wEffort + (1 - wEffort));
  const downsideMultiplier = 1 - (downside / 100) * wDownside;

  const raw = (numerator / effortDivisor) * downsideMultiplier * reversibilityBonus;
  return Math.min(100, Math.round(raw * 10_000));
}

export function rankExperiments(experiments: Experiment[]): Experiment[] {
  return [...experiments].sort((a, b) => b.priorityScore - a.priorityScore);
}
