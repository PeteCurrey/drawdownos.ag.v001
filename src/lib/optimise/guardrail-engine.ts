/**
 * DRAWDOWN OS — AUTONOMOUS EXPERIMENTATION & OPTIMISATION ENGINE
 * Guardrail Engine — Evaluates hard and soft stop conditions for experiments.
 */

import type { GuardrailDefinition, GuardrailStatus, ExperimentMeasurement } from './types';

export interface GuardrailEvaluationResult {
  hasBreach: boolean;
  hasHardStopBreach: boolean;
  statuses: GuardrailStatus[];
  breachedDefinitions: GuardrailDefinition[];
  summary: string;
}

export function evaluateGuardrails(
  guardrails: GuardrailDefinition[],
  measurement: ExperimentMeasurement,
  baselineMeasurement?: ExperimentMeasurement
): GuardrailEvaluationResult {
  const statuses: GuardrailStatus[] = [];
  const breachedDefinitions: GuardrailDefinition[] = [];
  let hasHardStopBreach = false;

  for (const g of guardrails) {
    let currentValue = 0;

    if (g.metric === 'refund_rate_pct') {
      currentValue = measurement.refundRatePct;
    } else if (g.metric === 'conversion_drop_pct' && baselineMeasurement) {
      const baseConv = baselineMeasurement.conversionRatePct;
      currentValue = baseConv > 0
        ? ((baseConv - measurement.conversionRatePct) / baseConv) * 100
        : 0;
    } else if (g.metric === 'contribution_drop_gbp' && baselineMeasurement) {
      currentValue = Math.max(0, baselineMeasurement.contributionGbp - measurement.contributionGbp);
    } else {
      currentValue = (measurement as any)[g.metric] || 0;
    }

    let isBreached = false;
    if (g.operator === 'GREATER_THAN') isBreached = currentValue > g.threshold;
    else if (g.operator === 'LESS_THAN') isBreached = currentValue < g.threshold;
    else if (g.operator === 'EQUALS') isBreached = currentValue === g.threshold;

    if (isBreached) {
      breachedDefinitions.push(g);
      if (g.class === 'HARD_STOP') hasHardStopBreach = true;
    }

    statuses.push({
      definitionId: g.id,
      name: g.name,
      metric: g.metric,
      threshold: g.threshold,
      currentValue,
      unit: g.unit,
      class: g.class,
      isBreached,
      breachedAt: isBreached ? new Date().toISOString() : undefined,
    });
  }

  const hasBreach = breachedDefinitions.length > 0;
  const summary = hasHardStopBreach
    ? `HARD STOP BREACH: ${breachedDefinitions.map(b => `${b.name} (${b.metric} limit: ${b.threshold}${b.unit})`).join(', ')}`
    : hasBreach
    ? `WARNING BREACH: ${breachedDefinitions.map(b => b.name).join(', ')}`
    : 'All guardrails healthy.';

  return {
    hasBreach,
    hasHardStopBreach,
    statuses,
    breachedDefinitions,
    summary,
  };
}
