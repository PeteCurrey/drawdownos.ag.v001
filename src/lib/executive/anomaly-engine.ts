import { ExecutiveSignal, InterventionRule, InterventionLevel } from './types';

export interface AnomalyResult {
  signalId: string;
  ruleId: string;
  level: InterventionLevel;
  severity: string;
  financialExposureGbp: number;
  likelyCause: string;
  recommendedResponse: string;
  expectedConsequenceIfIgnored: string;
  isDemo: boolean;
}

export function detectAnomalies(signals: ExecutiveSignal[], rules: InterventionRule[]): AnomalyResult[] {
  const anomalies: AnomalyResult[] = [];

  for (const signal of signals) {
    for (const rule of rules) {
      if (!rule.isActive) continue;

      let triggered = false;
      if (rule.operator === 'GREATER_THAN' && signal.currentValue > rule.threshold) triggered = true;
      if (rule.operator === 'LESS_THAN' && signal.currentValue < rule.threshold) triggered = true;
      if (rule.operator === 'EQUALS' && signal.currentValue === rule.threshold) triggered = true;

      if (triggered) {
        anomalies.push({
          signalId: signal.id,
          ruleId: rule.id,
          level: rule.level,
          severity: rule.level >= 4 ? 'CRITICAL' : rule.level >= 2 ? 'HIGH' : 'LOW',
          financialExposureGbp: signal.deltaAbsolute || 0,
          likelyCause: `Triggered by rule ${rule.name}`,
          recommendedResponse: `Apply intervention level ${getInterventionLevelLabel(rule.level)}`,
          expectedConsequenceIfIgnored: 'Further divergence from baseline.',
          isDemo: signal.isDemo || rule.isDemo
        });
      }
    }
  }

  return anomalies;
}

export function getAnomalySeverityColor(level: InterventionLevel): string {
  switch (level) {
    case 5: return 'text-red-600';
    case 4: return 'text-orange-600';
    case 3: return 'text-amber-500';
    case 2: return 'text-yellow-500';
    case 1: return 'text-blue-500';
    case 0:
    default: return 'text-gray-500';
  }
}

export function getInterventionLevelLabel(level: InterventionLevel): string {
  switch (level) {
    case 5: return 'EMERGENCY_STOP';
    case 4: return 'AUTONOMOUS';
    case 3: return 'REQUEST_APPROVAL';
    case 2: return 'RECOMMEND';
    case 1: return 'WATCH';
    case 0:
    default: return 'OBSERVE';
  }
}
