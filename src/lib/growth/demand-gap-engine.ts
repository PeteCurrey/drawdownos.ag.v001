/**
 * DRAWDOWN OS — GROWTH COMMAND
 * Demand Gap Engine — Identifies live listings with weak traffic/growth activation,
 * ranks Next Best Growth Actions, and calculates Effective Commercial Surface.
 */

import type { EffectiveSurfaceMetrics, GrowthPlan } from './types';
import { DEMO_EFFECTIVE_SURFACE } from './demo-growth-data';

export interface DemandGapItem {
  id: string;
  productSku: string;
  productName: string;
  marketplaceName: string;
  merchandisingStatus: 'HEALTHY' | 'NEEDS_OPTIMISATION';
  activationStatus: 'LIVE_NO_TRAFFIC' | 'ORGANIC_ONLY' | 'ACTIVATED';
  identifiedGapReason: string;
  recommendedAction: string;
  priorityScore: number;
}

export function identifyDemandGaps(): DemandGapItem[] {
  return [
    {
      id: 'gap-001',
      productSku: 'DD-HTT-001',
      productName: 'How to Trade (Complete Manual)',
      marketplaceName: 'Hotmart Brazil',
      merchandisingStatus: 'HEALTHY',
      activationStatus: 'LIVE_NO_TRAFFIC',
      identifiedGapReason: 'Product is live and well-merchandised on Hotmart Brazil, but lacks active Portuguese affiliate outreach.',
      recommendedAction: 'Recruit 25 LatAm finance educators & generate Portuguese affiliate creative packs.',
      priorityScore: 92,
    },
    {
      id: 'gap-002',
      productSku: 'DD-HTT-001-WORKBOOK',
      productName: 'How to Trade: Risk Workbook',
      marketplaceName: 'Etsy Digital Store',
      merchandisingStatus: 'HEALTHY',
      activationStatus: 'ORGANIC_ONLY',
      identifiedGapReason: 'Etsy listing has strong conversion, but lacks owned-site cross-sell links from the main manual purchase flow.',
      recommendedAction: 'Add automated post-purchase cross-sell email sequence for manual buyers.',
      priorityScore: 85,
    },
    {
      id: 'gap-003',
      productSku: 'DD-HTT-001-DE-DE',
      productName: 'How to Trade (German Edition)',
      marketplaceName: 'Tolino DACH',
      merchandisingStatus: 'HEALTHY',
      activationStatus: 'LIVE_NO_TRAFFIC',
      identifiedGapReason: 'German edition approved and ready for Tolino DACH, but launch campaign has not been executed.',
      recommendedAction: 'Execute German DACH Launch Push upon final compliance signoff.',
      priorityScore: 78,
    },
  ];
}

export function calculateEffectiveCommercialSurface(): EffectiveSurfaceMetrics {
  return DEMO_EFFECTIVE_SURFACE;
}
