/**
 * DRAWDOWN OS — AUTONOMOUS EXPERIMENTATION & OPTIMISATION ENGINE
 * Statistical & Bayesian Evaluation Engine
 * Evaluates control vs variant measurements probability-first.
 */

import type { BayesianResult, PracticalSignificanceCheck, ExperimentMeasurement } from './types';

// ─── ERF POLYFILL (not available on Math in standard JS/TS) ──────────────────
function erf(x: number): number {
  // Abramowitz & Stegun approximation (error < 1.5e-7)
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const result = 1 - poly * Math.exp(-x * x);
  return x >= 0 ? result : -result;
}

export function evaluateBayesianResult(
  control: ExperimentMeasurement,
  variant: ExperimentMeasurement,
  mdePct: number = 5
): BayesianResult {
  const cVis = control.visitors || control.orders * 25 || 100;
  const vVis = variant.visitors || variant.orders * 25 || 100;
  const totalSample = cVis + vVis;

  // Data sufficiency check
  let dataSufficiency: BayesianResult['dataSufficiency'] = 'INSUFFICIENT';
  if (totalSample >= 400) dataSufficiency = 'STRONG';
  else if (totalSample >= 250) dataSufficiency = 'ADEQUATE';
  else if (totalSample >= 100) dataSufficiency = 'MARGINAL';

  if (totalSample < 80) {
    return {
      probabilityVariantBetterPct: 50,
      probabilityUpliftExceedsMde: 20,
      expectedUpliftLowPct: 0,
      expectedUpliftHighPct: 0,
      expectedUpliftMedianPct: 0,
      expectedDownsideGbp: 0,
      expectedUpsideGbpMonthly: 0,
      recommendation: 'TOO_EARLY',
      recommendationReason: `Insufficient sample (${totalSample} visitors / ${control.orders + variant.orders} orders). Minimum 100 required.`,
      dataSufficiency: 'INSUFFICIENT',
      estimatedDaysToDecision: Math.ceil((100 - totalSample) / 5),
    };
  }

  // Primary metric comparison (contribution per visitor or net contribution)
  const cContribPerVis = control.contributionGbp / cVis;
  const vContribPerVis = variant.contributionGbp / vVis;

  const upliftPct = cContribPerVis > 0
    ? ((vContribPerVis - cContribPerVis) / cContribPerVis) * 100
    : 0;

  // Inferred Bayesian win probability based on Z-score approximation
  const pC = control.conversionRatePct / 100;
  const pV = variant.conversionRatePct / 100;
  const se = Math.sqrt((pC * (1 - pC)) / cVis + (pV * (1 - pV)) / vVis) || 0.01;
  const zScore = (pV - pC) / se;
  
  // Normal cumulative distribution approximation
  const probWinPct = Math.min(99, Math.max(1, Math.round(50 + 50 * erf(zScore / Math.SQRT2))));
  const probExceedsMdePct = Math.min(99, Math.max(1, Math.round(50 + 50 * erf((zScore - (mdePct / 100)) / Math.SQRT2))));

  const marginOfError = Math.round((1.96 * se * 100) * 10) / 10;
  const expectedUpliftMedianPct = Math.round(upliftPct * 10) / 10;
  const expectedUpliftLowPct = Math.round((upliftPct - marginOfError) * 10) / 10;
  const expectedUpliftHighPct = Math.round((upliftPct + marginOfError) * 10) / 10;

  const monthlyUpside = Math.max(0, Math.round(variant.contributionGbp * (expectedUpliftMedianPct / 100) * 4));
  const monthlyDownside = Math.max(0, Math.round(Math.abs(Math.min(0, expectedUpliftLowPct / 100)) * variant.contributionGbp * 4));

  let recommendation: BayesianResult['recommendation'] = 'INCONCLUSIVE';
  let recommendationReason = 'Sample is sufficient but signal is inside random variance range.';

  if (probWinPct >= 90 && expectedUpliftMedianPct > 0) {
    recommendation = 'ROLL_OUT';
    recommendationReason = `Variant demonstrated ${probWinPct}% probability of outperforming control with +${expectedUpliftMedianPct}% net contribution uplift.`;
  } else if (probWinPct <= 15 || expectedUpliftMedianPct < -5) {
    recommendation = 'ROLL_BACK';
    recommendationReason = `Variant is underperforming control (${expectedUpliftMedianPct}% uplift). Rollback recommended.`;
  }

  return {
    probabilityVariantBetterPct: probWinPct,
    probabilityUpliftExceedsMde: probExceedsMdePct,
    expectedUpliftLowPct,
    expectedUpliftHighPct,
    expectedUpliftMedianPct,
    expectedDownsideGbp: monthlyDownside,
    expectedUpsideGbpMonthly: monthlyUpside,
    recommendation,
    recommendationReason,
    dataSufficiency,
  };
}

export function checkPracticalSignificance(
  upliftPct: number,
  monthlyContributionGbp: number,
  complexity: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW'
): PracticalSignificanceCheck {
  const annualisedImpactGbp = Math.round(monthlyContributionGbp * (upliftPct / 100) * 12);
  const minThresholdGbp = complexity === 'HIGH' ? 1_200 : complexity === 'MEDIUM' ? 500 : 100;

  const rolloutRecommended = annualisedImpactGbp >= minThresholdGbp;
  const reason = rolloutRecommended
    ? `Annualised impact (£${annualisedImpactGbp.toLocaleString()}) exceeds minimum threshold (£${minThresholdGbp}) for ${complexity} complexity.`
    : `Annualised impact (£${annualisedImpactGbp.toLocaleString()}) is below minimum threshold (£${minThresholdGbp}). Operational complexity exceeds value created.`;

  return {
    upliftPct,
    annualisedImpactGbp,
    implementationComplexity: complexity,
    rolloutRecommended,
    reason,
  };
}
