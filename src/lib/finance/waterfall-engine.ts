/**
 * DRAWDOWN OS — FINANCIAL COMMAND
 * Waterfall Engine — Calculates the full commercial economic waterfall,
 * Effective Platform Take Rate, and Contribution Layers 1 / 2 / 3.
 */

import type { EconomicWaterfall } from './types';
import { DEMO_WATERFALL } from './demo-finance-data';

export function calculateEconomicWaterfall(
  customerSpend: number = 100.00,
  taxPct: number = 8.33,
  marketplaceFeePct: number = 10.00,
  affiliateCommissionPct: number = 20.00,
  processingFeePct: number = 4.00,
  campaignAcquisitionPct: number = 8.00,
  attributedVariableCostPct: number = 3.00
): EconomicWaterfall {
  const taxHandledGbp = Math.round(customerSpend * (taxPct / 100) * 100) / 100;
  const marketplaceFeesGbp = Math.round(customerSpend * (marketplaceFeePct / 100) * 100) / 100;
  const affiliateCommissionGbp = Math.round(customerSpend * (affiliateCommissionPct / 100) * 100) / 100;
  const processingFeesGbp = Math.round(customerSpend * (processingFeePct / 100) * 100) / 100;
  
  const netReceiptGbp = customerSpend - taxHandledGbp - marketplaceFeesGbp - affiliateCommissionGbp - processingFeesGbp;
  
  const campaignAcquisitionGbp = Math.round(customerSpend * (campaignAcquisitionPct / 100) * 100) / 100;
  const attributedVariableCostGbp = Math.round(customerSpend * (attributedVariableCostPct / 100) * 100) / 100;
  
  const netContributionGbp = netReceiptGbp - campaignAcquisitionGbp - attributedVariableCostGbp;
  
  const effectiveTakeRatePct = Math.round(((marketplaceFeesGbp + processingFeesGbp) / (customerSpend - taxHandledGbp)) * 1000) / 10;
  const contributionMarginPct = Math.round((netContributionGbp / customerSpend) * 1000) / 10;

  return {
    customerSpendGbp: customerSpend,
    taxHandledGbp,
    marketplaceFeesGbp,
    affiliateCommissionGbp,
    processingFeesGbp,
    netReceiptGbp,
    campaignAcquisitionGbp,
    attributedVariableCostGbp,
    netContributionGbp,
    effectiveTakeRatePct,
    contributionMarginPct,
  };
}

export function calculateContributionLayers(customerSpend: number = 100.00) {
  const waterfall = calculateEconomicWaterfall(customerSpend);
  const contribution1 = waterfall.netReceiptGbp; // Net Revenue - Direct Transaction Costs
  const contribution2 = contribution1 - waterfall.campaignAcquisitionGbp; // Minus Acquisition
  const contribution3 = contribution2 - waterfall.attributedVariableCostGbp; // Minus Variable Costs

  return {
    contribution1Gbp: Math.round(contribution1 * 100) / 100,
    contribution2Gbp: Math.round(contribution2 * 100) / 100,
    contribution3Gbp: Math.round(contribution3 * 100) / 100, // Primary Net Contribution
  };
}
