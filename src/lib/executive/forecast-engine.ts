import { ForecastPeriod, ForecastDriver } from './types';

export function generateForecast(currentMonthlyContribution: number, growthDrivers: ForecastDriver[], periodDays: 7 | 30 | 90 | 365): ForecastPeriod {
  const periodMultiplier = periodDays / 30;
  const baseContribution = currentMonthlyContribution * periodMultiplier;
  
  const driversImpact = growthDrivers.reduce((acc, driver) => {
    return acc + (driver.type === 'POSITIVE' ? driver.deltaGbp : -driver.deltaGbp);
  }, 0);

  const forecastContribution = baseContribution + driversImpact;
  
  return {
    periodDays,
    label: `${periodDays}-Day Forecast`,
    grossRevenueGbp: forecastContribution * 2, // Simplified ratio
    netRevenueGbp: forecastContribution * 1.8,
    contributionGbp: forecastContribution,
    ordersCount: Math.round(forecastContribution / 20),
    avgOrderValueGbp: 40,
    refundCount: Math.round((forecastContribution / 20) * 0.05),
    bestCaseGbp: forecastContribution * 1.15,
    worstCaseGbp: forecastContribution * 0.75,
    confidence: growthDrivers.length > 3 ? 'HIGH' : 'MODERATE',
    drivers: growthDrivers
  };
}

export function calculateForecastAccuracy(predicted: number, actual: number): number {
  if (actual === 0) return 0;
  const error = Math.abs(predicted - actual) / actual;
  return Math.max(0, 100 - (error * 100));
}

export function summariseForecastNarrative(periods: ForecastPeriod[]): string {
  if (periods.length === 0) return 'No forecast periods available.';
  const latest = periods[periods.length - 1];
  return `The portfolio is projected to reach £${latest.contributionGbp.toLocaleString()} in contribution over the next ${latest.periodDays} days, supported by ${latest.drivers.length} key growth drivers. Confidence remains ${latest.confidence.toLowerCase()}.`;
}
