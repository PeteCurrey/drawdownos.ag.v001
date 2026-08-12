import { ParsedObjective, StrategyElement, ObjectiveConstraint } from './types';

export function parseObjective(naturalLanguage: string): ParsedObjective {
  const lower = naturalLanguage.toLowerCase();
  
  let targetMetric = 'revenue';
  if (lower.includes('contribution') || lower.includes('profit')) targetMetric = 'contribution';
  if (lower.includes('conversion')) targetMetric = 'conversion';
  if (lower.includes('average order value') || lower.includes('aov')) targetMetric = 'aov';
  
  let targetValue: number | undefined;
  const matchMoney = naturalLanguage.match(/£([\d,]+)/);
  const matchPct = naturalLanguage.match(/(\d+)%/);
  if (matchMoney) {
    targetValue = parseInt(matchMoney[1].replace(/,/g, ''), 10);
  } else if (matchPct) {
    targetValue = parseInt(matchPct[1], 10);
  }

  let timeHorizonDays = 90;
  const matchDays = lower.match(/(\d+) days/);
  const matchMonths = lower.match(/(\d+) months?/);
  if (matchDays) timeHorizonDays = parseInt(matchDays[1], 10);
  else if (matchMonths) timeHorizonDays = parseInt(matchMonths[1], 10) * 30;
  else if (lower.includes('monthly')) timeHorizonDays = 30;

  const constraints: ObjectiveConstraint[] = [];
  if (lower.includes('without increasing refund')) {
    constraints.push({ metric: 'refundRate', operator: 'MUST_STAY_ABOVE', value: 0, unit: '%', isViolated: false });
  }
  if (lower.includes('without spending more than')) {
    const limitMatch = lower.match(/without spending more than £([\d,]+)/i);
    if (limitMatch) {
      constraints.push({ metric: 'spend', operator: 'MUST_NOT_EXCEED', value: parseInt(limitMatch[1].replace(/,/g, ''), 10), unit: 'GBP', isViolated: false });
    }
  }

  let riskTolerance: 'LOW' | 'BALANCED' | 'AGGRESSIVE' = 'BALANCED';
  if (lower.includes('safe') || lower.includes('without')) riskTolerance = 'LOW';
  if (lower.includes('aggressive') || lower.includes('maximise')) riskTolerance = 'AGGRESSIVE';

  return {
    goal: naturalLanguage,
    targetMetric,
    targetValue,
    targetCurrency: 'GBP',
    scope: 'Portfolio',
    timeHorizonDays,
    constraints,
    riskTolerance,
    availableLevers: ['PRICING', 'MARKETING', 'INVENTORY']
  };
}

export function generateStrategy(parsed: ParsedObjective, productName: string): StrategyElement[] {
  const elements: StrategyElement[] = [];

  for (let i = 1; i <= 6; i++) {
    elements.push({
      id: `strat-${i}-${Date.now()}`,
      title: `Tactic ${i} for ${productName}`,
      hypothesis: `Implementing this tactic will improve ${parsed.targetMetric}`,
      expectedImpactGbp: (parsed.targetValue || 1000) * (0.1 * i),
      confidence: 'MODERATE',
      costGbp: 100 * i,
      effortHours: 5 * i,
      risk: parsed.riskTolerance === 'AGGRESSIVE' ? 'HIGH' : 'LOW',
      ownerModule: 'GROWTH_COMMAND',
      autonomyStatus: i % 2 === 0 ? 'SEMI_AUTO' : 'MANUAL',
      startDate: new Date().toISOString(),
      evaluationDate: new Date(Date.now() + 86400000 * 30).toISOString(),
      successMetric: parsed.targetMetric,
      status: 'NOT_STARTED'
    });
  }

  return elements;
}
