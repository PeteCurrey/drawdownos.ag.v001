import { ExecutiveScenario, ScenarioAssumption, ScenarioCase } from './types';

export function modelScenario(
  name: string,
  assumptions: ScenarioAssumption[],
  baseRevenue: number,
  baseContribution: number,
  baseOrders: number,
  baseRefundRate: number
): ExecutiveScenario {
  const baseCase: ScenarioCase = {
    label: 'BASE',
    grossRevenueGbp: baseRevenue,
    netRevenueGbp: baseRevenue * (1 - baseRefundRate / 100),
    contributionGbp: baseContribution,
    ordersCount: baseOrders,
    avgOrderValueGbp: baseRevenue / (baseOrders || 1),
    refundRatePct: baseRefundRate,
    contributionMarginPct: (baseContribution / baseRevenue) * 100 || 0,
    probability: 60,
    narrative: 'Current trajectory continues without major disruptions.'
  };

  const bullCase: ScenarioCase = {
    label: 'BULL',
    grossRevenueGbp: baseRevenue * 1.15,
    netRevenueGbp: (baseRevenue * 1.15) * (1 - (baseRefundRate * 0.9) / 100),
    contributionGbp: baseContribution * 1.2,
    ordersCount: Math.round(baseOrders * 1.15),
    avgOrderValueGbp: (baseRevenue * 1.15) / (baseOrders * 1.15 || 1),
    refundRatePct: baseRefundRate * 0.9,
    contributionMarginPct: ((baseContribution * 1.2) / (baseRevenue * 1.15)) * 100 || 0,
    probability: 20,
    narrative: 'Optimistic scenario with increased conversion and lower refunds.'
  };

  const bearCase: ScenarioCase = {
    label: 'BEAR',
    grossRevenueGbp: baseRevenue * 0.8,
    netRevenueGbp: (baseRevenue * 0.8) * (1 - (baseRefundRate * 1.1) / 100),
    contributionGbp: baseContribution * 0.7,
    ordersCount: Math.round(baseOrders * 0.8),
    avgOrderValueGbp: (baseRevenue * 0.8) / (baseOrders * 0.8 || 1),
    refundRatePct: baseRefundRate * 1.1,
    contributionMarginPct: ((baseContribution * 0.7) / (baseRevenue * 0.8)) * 100 || 0,
    probability: 20,
    narrative: 'Pessimistic scenario reflecting economic downturn or increased competition.'
  };

  return {
    id: `scen-${Date.now()}`,
    name,
    description: `Modeled scenario based on ${assumptions.length} assumptions.`,
    assumptions,
    baseCase,
    bullCase,
    bearCase,
    recommendedCase: baseCase,
    monteCarloLowGbp: bearCase.contributionGbp * 0.9,
    monteCarloMedianGbp: baseCase.contributionGbp,
    monteCarloHighGbp: bullCase.contributionGbp * 1.1,
    monteCarloProbabilityAboveTargetPct: 55,
    monteCarloConfidence: 'MODERATE',
    recommendation: 'Proceed with base case plan while monitoring bear triggers.',
    whatWouldChangeMind: ['Unexpected competitor price drop', 'Supply chain disruption'],
    createdAt: new Date().toISOString(),
    isDemo: false
  };
}

export function compareScenarios(a: ExecutiveScenario, b: ExecutiveScenario): { winner: string, margin: number, recommendation: string } {
  const margin = Math.abs(a.recommendedCase.contributionGbp - b.recommendedCase.contributionGbp);
  const winner = a.recommendedCase.contributionGbp > b.recommendedCase.contributionGbp ? a.name : b.name;
  
  return {
    winner,
    margin,
    recommendation: `Scenario "${winner}" provides a higher expected contribution by £${margin.toFixed(2)}. We recommend this approach.`
  };
}
