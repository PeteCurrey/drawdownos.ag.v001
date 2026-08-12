/**
 * DRAWDOWN OS — AUTONOMOUS LISTING & MERCHANDISING ENGINE
 * Flagship Actions:
 *  - TUNE THE MACHINE (Portfolio Merchandising Analysis & Plan)
 *  - MAXIMISE MERCHANDISING ("Make How To Trade Work Harder")
 *  - EFFECTIVE REVENUE SURFACE Calculator
 */

import type { PortfolioTuningPlan, MerchandisingRecommendation } from './types';
import { DEMO_LISTINGS, RECOMMENDATIONS, DRIFT_EVENTS } from './demo-merchandising-data';

// ─── TUNE THE MACHINE (PORTFOLIO SWEEP) ───────────────────────────────────────

export function runTuneTheMachine(): PortfolioTuningPlan {
  const totalListings = DEMO_LISTINGS.length;
  const driftedCount = DRIFT_EVENTS.length;
  const staleCount = DEMO_LISTINGS.filter(l => l.status === 'STALE').length;
  const activeExps = DEMO_LISTINGS.filter(l => l.activeExperimentId).length;

  return {
    totalListingsScanned: totalListings,
    driftFixesReady: driftedCount,
    staleListingsFound: staleCount,
    experimentsProposed: 2,
    estimatedNetRevenueGainGbp: 1840.00,
    humanApprovalsRequired: 2,
    automaticActionsEligible: 3,
    recommendations: RECOMMENDATIONS,
  };
}

// ─── MAXIMISE MERCHANDISING ("MAKE HOW TO TRADE WORK HARDER") ─────────────────

export interface MaximiseMerchandisingPlan {
  productSku: string;
  productName: string;
  currentLiveListings: number;
  averageDiscoverabilityScore: number;
  rankedActions: Array<{
    step: number;
    channel: string;
    action: string;
    reason: string;
    impactPts: number;
    effort: 'LOW' | 'MEDIUM' | 'HIGH';
    requiresHumanApproval: boolean;
  }>;
  totalUnlockPts: number;
  note: string;
}

export function simulateMaximiseMerchandising(
  productSku: string = 'DD-HTT-001'
): MaximiseMerchandisingPlan {
  return {
    productSku,
    productName: 'How to Trade (Complete Manual)',
    currentLiveListings: 5,
    averageDiscoverabilityScore: 77,
    rankedActions: [
      {
        step: 1,
        channel: 'Etsy Digital',
        action: 'Deploy V1.1 Gallery Image 4 showing printable 90-day worksheets preview',
        reason: 'Etsy views are high but conversion lags due to uncommunicated worksheet assets.',
        impactPts: 4.5,
        effort: 'LOW',
        requiresHumanApproval: false,
      },
      {
        step: 2,
        channel: 'Amazon KDP',
        action: 'Test Subtitle Risk Emphasis (A/B Experiment)',
        reason: 'Testing institutional risk positioning vs generic strategy positioning.',
        impactPts: 3.8,
        effort: 'LOW',
        requiresHumanApproval: true,
      },
      {
        step: 3,
        channel: 'Direct Drawdown Store',
        action: 'Deploy Manual + Workbook Bundle Option (£34.99)',
        reason: 'A/B test proved +22.4% higher net revenue per visitor.',
        impactPts: 6.2,
        effort: 'MEDIUM',
        requiresHumanApproval: true,
      },
      {
        step: 4,
        channel: 'Hotmart',
        action: 'Lock zero-signal approved affiliate creative pack',
        reason: 'Enables compliant affiliate distribution in LatAm/EU education channels.',
        impactPts: 5.0,
        effort: 'MEDIUM',
        requiresHumanApproval: true,
      },
      {
        step: 5,
        channel: 'Whop Commerce',
        action: 'Add digital-utility interactive workbook access link',
        reason: 'Improves product utility section for digital-first buyers.',
        impactPts: 2.8,
        effort: 'LOW',
        requiresHumanApproval: false,
      },
    ],
    totalUnlockPts: 22.3,
    note: 'This is a commercial tuning simulation. No listing changes will be executed without authorization.',
  };
}

// ─── EFFECTIVE REVENUE SURFACE CALCULATOR ─────────────────────────────────────

export interface EffectiveSurfaceResult {
  rawRsaPct: number;
  effectivelyMerchandisedRsaPct: number;
  merchandisingReadinessGapPct: number;
  weaklyMerchandisedSurfaces: Array<{ marketplaceId: string; reason: string }>;
}

export function calculateEffectiveRevenueSurface(
  rawRsaPct: number = 64.0
): EffectiveSurfaceResult {
  const factor = 0.8125; // 81.25% average discoverability & quality factor
  const effectivePct = Math.round(rawRsaPct * factor * 10) / 10;
  const gapPct = Math.round((rawRsaPct - effectivePct) * 10) / 10;

  return {
    rawRsaPct,
    effectivelyMerchandisedRsaPct: effectivePct,
    merchandisingReadinessGapPct: gapPct,
    weaklyMerchandisedSurfaces: [
      { marketplaceId: 'ch-etsy', reason: 'Stale gallery sequence & listing drift detected' },
      { marketplaceId: 'ch-hotmart', reason: 'Missing approved affiliate creative pack' },
    ],
  };
}
