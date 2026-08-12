/**
 * DRAWDOWN OS — FINANCIAL COMMAND
 * Flagship Actions:
 *  - FOLLOW THE MONEY (Full Economic Lineage Tracer)
 *  - WHERE ARE WE ACTUALLY MAKING MONEY? (Net Contribution Ranker)
 *  - WHAT SHOULD WE STOP DOING? (Loss-Making / Low-Margin Channel Finder)
 */

import type { FollowTheMoneyLineage } from './types';

export function followTheMoney(orderId: string = 'DD-2048'): FollowTheMoneyLineage {
  return {
    orderId,
    customerPaymentGbp: 24.99,
    taxDeductedGbp: 4.17,
    marketplaceFeeDeductedGbp: 2.50,
    affiliateCommissionDeductedGbp: 5.00,
    netMarketplacePayoutGbp: 13.32,
    acquisitionCostGbp: 2.10,
    netContributionGbp: 11.22,
    bankCashReceivedGbp: 13.32,
    lineageSteps: [
      'Step 1: Customer paid £24.99 on Amazon KDP US (Order DD-2048)',
      'Step 2: Marketplace tax of £4.17 collected/handled by Amazon Facilitator',
      'Step 3: Amazon KDP platform fee of £2.50 (10%) deducted',
      'Step 4: Affiliate commission of £5.00 (20%) credited to RiskFirst Trading',
      'Step 5: Net marketplace proceeds of £13.32 generated',
      'Step 6: Attributed campaign acquisition cost of £2.10 deducted',
      'Step 7: Final Net Contribution of £11.22 (44.9% margin) achieved',
      'Step 8: Cash receipt of £13.32 reconciled with Barclays Primary GBP bank account',
    ],
  };
}

export interface ProfitableSurfaceRank {
  rank: number;
  entityName: string;
  entityType: 'PRODUCT' | 'MARKETPLACE' | 'TERRITORY' | 'AFFILIATE';
  grossSalesGbp: number;
  netContributionGbp: number;
  contributionMarginPct: number;
}

export function getMostProfitableSurfaces(): ProfitableSurfaceRank[] {
  return [
    { rank: 1, entityName: 'How to Trade (Complete Manual)', entityType: 'PRODUCT', grossSalesGbp: 7140.00, netContributionGbp: 3840.00, contributionMarginPct: 53.8 },
    { rank: 2, entityName: 'Amazon KDP US', entityType: 'MARKETPLACE', grossSalesGbp: 4250.00, netContributionGbp: 2210.00, contributionMarginPct: 52.0 },
    { rank: 3, entityName: 'Hotmart Brazil Network', entityType: 'AFFILIATE', grossSalesGbp: 4250.00, netContributionGbp: 2480.00, contributionMarginPct: 58.3 },
    { rank: 4, entityName: 'United States (US)', entityType: 'TERRITORY', grossSalesGbp: 5100.00, netContributionGbp: 2650.00, contributionMarginPct: 52.0 },
  ];
}

export interface LossMakingSurfaceItem {
  id: string;
  entityName: string;
  entityType: 'MARKETPLACE' | 'AFFILIATE' | 'CAMPAIGN';
  identifiedReason: string;
  recommendedAction: string;
  netImpactGbp: number;
}

export function getLossMakingSurfaces(): LossMakingSurfaceItem[] {
  return [
    {
      id: 'loss-001',
      entityName: 'Generic Social Organic Campaign',
      entityType: 'CAMPAIGN',
      identifiedReason: 'Spent £180 in design briefs with 0 attributed sales or lead magnet signups.',
      recommendedAction: 'DEPRIORITISE: Redirect creative resources to Risk Checklist Lead Magnet funnel.',
      netImpactGbp: -180.00,
    },
    {
      id: 'loss-002',
      entityName: 'Low-Quality Affiliate Sub-Network B',
      entityType: 'AFFILIATE',
      identifiedReason: 'High refund rate of 12.4% resulting in negative contribution after unreturned transaction fees.',
      recommendedAction: 'REVIEW / SUSPEND: Issue compliance warning & suspend affiliate payout link.',
      netImpactGbp: -95.00,
    },
  ];
}
