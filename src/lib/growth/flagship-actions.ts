/**
 * DRAWDOWN OS — GROWTH COMMAND
 * Flagship Actions:
 *  - GROW PRODUCT (Creates product-specific acquisition plan)
 *  - ACTIVATE SURFACE (Generates channel-specific growth plan)
 *  - GROW THE MACHINE (Portfolio-wide commercial strategy)
 */

import type { GrowthPlan } from './types';

export function growProduct(
  sku: string = 'DD-HTT-001',
  productName: string = 'How to Trade (Complete Manual)'
): GrowthPlan {
  return {
    productSku: sku,
    productName,
    issueSummary: 'Product has high listing quality across 5 marketplaces, but weak affiliate penetration in LatAm and un-activated German DACH edition.',
    recommendedActions: [
      {
        step: 1,
        actionTitle: 'Recruit 25 relevant LatAm affiliate prospects for Hotmart',
        targetChannel: 'Hotmart LatAm Affiliate Network',
        effort: 'MEDIUM',
        confidence: 'HIGH',
        expectedContributionUnlock: '+£1,800/mo net contribution',
      },
      {
        step: 2,
        actionTitle: 'Launch Pre-Trade Risk Checklist Lead Magnet on owned site',
        targetChannel: 'Owned Web / Email Nurture',
        effort: 'LOW',
        confidence: 'HIGH',
        expectedContributionUnlock: '+£1,200/mo net contribution',
      },
      {
        step: 3,
        actionTitle: 'Add post-purchase cross-sell sequence for Risk Workbook',
        targetChannel: 'Email Post-Purchase',
        effort: 'LOW',
        confidence: 'HIGH',
        expectedContributionUnlock: '+£950/mo net contribution',
      },
      {
        step: 4,
        actionTitle: 'Execute German DACH Launch Push upon compliance signoff',
        targetChannel: 'Tolino DACH & Amazon.de',
        effort: 'HIGH',
        confidence: 'MEDIUM',
        expectedContributionUnlock: '+£2,400/mo net contribution',
      },
    ],
    overallEffort: 'MEDIUM',
  };
}

export interface PortfolioGrowthMachineResult {
  easyWins: string[];
  affiliateExpansion: string[];
  seoOpportunities: string[];
  localisationLaunches: string[];
  retentionCrossSell: string[];
  channelsToDeprioritise: string[];
}

export function growTheMachine(): PortfolioGrowthMachineResult {
  return {
    easyWins: [
      'Add Pre-Trade Risk Checklist lead magnet to top 3 educational articles (+£1,200/mo est. contribution)',
      'Activate automated email cross-sell from How to Trade Manual to Risk Workbook (+£950/mo est. contribution)',
    ],
    affiliateExpansion: [
      'Recruit 25 LatAm finance educators for Hotmart Brazil',
      'Deploy updated RiskFirst trading affiliate creative pack with zero-signal compliance disclosures',
    ],
    seoOpportunities: [
      'Publish Chapter 9 Position Sizing Mathematics guide to target high-intent search queries',
      'Optimize Drawdown Definition page for organic buyer intent keywords',
    ],
    localisationLaunches: [
      'Prepare German DACH launch plan for Tolino DACH & Kobo Germany',
      'Submit Spanish CNMV compliance risk warning overlay for Spain Kindle distribution',
    ],
    retentionCrossSell: [
      'Implement 30-day post-purchase workbook nurture journey for new manual buyers',
    ],
    channelsToDeprioritise: [
      'Un-targeted social organic posting without direct product or lead magnet mapping',
    ],
  };
}
