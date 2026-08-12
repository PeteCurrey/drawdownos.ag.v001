/**
 * DRAWDOWN OS — AUTONOMOUS EXPERIMENTATION & OPTIMISATION ENGINE
 * Hypothesis & Natural Language Experiment Parser
 * Converts plain English requests into formal hypothesis objects and experiment designs.
 */

import type { ExperimentHypothesis, ExperimentType, ExperimentSubtype } from './types';

export interface ParsedExperimentDesign {
  type: ExperimentType;
  subtype: ExperimentSubtype;
  name: string;
  hypothesis: ExperimentHypothesis;
  suggestedControl: string;
  suggestedVariant: string;
  targetMarketplace: string;
  minimumDurationDays: number;
  requiredSampleSize: number;
  estimatedUpsideGbpMonthly: number;
  downsideRiskGbp: number;
  autonomyRecommended: 'MANUAL' | 'DESIGN' | 'LAUNCH' | 'OPTIMISE';
}

export function parseNaturalLanguageExperiment(input: string): ParsedExperimentDesign {
  const text = input.toLowerCase();

  let type: ExperimentType = 'PRICING';
  let subtype: ExperimentSubtype = 'PRICE_INCREASE';
  let targetMarketplace = 'Etsy US';
  let estimatedUpsideGbpMonthly = 450;

  if (text.includes('thumb') || text.includes('cover') || text.includes('image') || text.includes('graphic')) {
    type = 'CREATIVE';
    subtype = text.includes('thumb') ? 'THUMBNAIL' : 'COVER';
    estimatedUpsideGbpMonthly = 320;
  } else if (text.includes('bundle') || text.includes('upsell') || text.includes('cross-sell')) {
    type = 'MERCHANDISING';
    subtype = 'BUNDLE';
    estimatedUpsideGbpMonthly = 600;
  } else if (text.includes('title') || text.includes('description') || text.includes('copy')) {
    type = 'PRODUCT_POSITIONING';
    subtype = text.includes('title') ? 'TITLE' : 'DESCRIPTION';
    estimatedUpsideGbpMonthly = 280;
  } else if (text.includes('payhip') || text.includes('amazon') || text.includes('gumroad') || text.includes('etsy')) {
    if (text.includes('payhip')) targetMarketplace = 'Payhip UK';
    else if (text.includes('gumroad')) targetMarketplace = 'Gumroad UK';
    else if (text.includes('amazon')) targetMarketplace = 'Amazon KDP';
  }

  // Extract price numbers if present
  const prices = input.match(/£?(\d+)/g);
  let controlPrice = '29.00';
  let variantPrice = '34.00';

  if (prices && prices.length >= 2) {
    controlPrice = prices[0].replace('£', '');
    variantPrice = prices[1].replace('£', '');
  } else if (prices && prices.length === 1) {
    variantPrice = prices[0].replace('£', '');
  }

  const name = `Test: ${input}`;
  const statement = `Testing "${input}" on ${targetMarketplace} to measure contribution impact and conversion response.`;

  const hypothesis: ExperimentHypothesis = {
    id: `hyp-${Date.now()}`,
    experimentId: '',
    statement,
    primaryMetric: type === 'PRICING' ? 'NET_CONTRIBUTION' : 'CONVERSION_RATE',
    primaryDirection: 'INCREASE',
    affectedEntity: `${targetMarketplace} / How to Trade`,
    baseline: `Current state on ${targetMarketplace}`,
    proposedChange: input,
    target: `Net contribution uplift +10%, conversion decline <= 5%`,
    secondaryMetrics: ['CONVERSION_RATE', 'UNITS_SOLD', 'AOV'],
    guardrailMetrics: [
      { id: 'g-h1', name: 'Refund Threshold', metric: 'refund_rate_pct', operator: 'GREATER_THAN', threshold: 5.0, unit: '%', class: 'HARD_STOP', description: 'Stop if refunds exceed 5%', revertOnBreach: true }
    ],
    minimumDetectableEffect: 5,
    expectedImpactLowGbp: Math.round(estimatedUpsideGbpMonthly * 0.5),
    expectedImpactHighGbp: Math.round(estimatedUpsideGbpMonthly * 1.5),
    confidence: 'MODERATE',
    supportingEvidence: ['Natural-language request parsed by OS Hypothesis Engine'],
    authorType: 'AI',
    authorName: 'Natural Language Experiment Parser',
    isDemo: false,
    createdAt: new Date().toISOString(),
  };

  return {
    type,
    subtype,
    name,
    hypothesis,
    suggestedControl: `Current control (e.g. £${controlPrice})`,
    suggestedVariant: `Proposed variant (e.g. £${variantPrice})`,
    targetMarketplace,
    minimumDurationDays: 14,
    requiredSampleSize: 250,
    estimatedUpsideGbpMonthly,
    downsideRiskGbp: 80,
    autonomyRecommended: type === 'PRICING' ? 'LAUNCH' : 'DESIGN',
  };
}
