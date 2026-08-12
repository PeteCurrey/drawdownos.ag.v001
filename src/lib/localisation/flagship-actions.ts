/**
 * DRAWDOWN OS — GLOBAL LOCALISATION ENGINE
 * Flagship Actions:
 *  - GO GLOBAL (Publication Expansion Roadmap)
 *  - WHAT LANGUAGE NEXT? (Ranked International Opportunities)
 *  - EXPAND WINNERS / LOCALISE BEST SELLER
 *  - LOCALISATION RSA Calculator
 */

import type { ExpansionPlan, LocalisationOpportunity } from './types';
import { rankNextLanguageOpportunities, generateGoGlobalPlan } from './opportunity-engine';
import { LOCALISED_EDITIONS } from './demo-localisation-data';

// ─── LOCALISATION RSA CALCULATOR ──────────────────────────────────────────────

export interface LocalisationRSAResult {
  rawGlobalRsaPct: number;
  localisedRsaPct: number;
  additionalUnlockableLocalRsaPts: number;
  capturedLanguages: number;
  targetedLanguages: number;
  languageGapSummary: Array<{ language: string; rsaUnlockPts: number; status: string }>;
}

export function calculateLocalisationRSA(
  rawRsaPct: number = 64.0
): LocalisationRSAResult {
  const liveEditions = LOCALISED_EDITIONS.filter(e => e.state === 'LIVE').length;
  const totalTargeted = 5; // German, Spanish, Portuguese, French, US English

  const localisedRsaPct = Math.round(rawRsaPct * 0.72 * 10) / 10;
  const unlockablePts = 12.2;

  return {
    rawGlobalRsaPct: rawRsaPct,
    localisedRsaPct,
    additionalUnlockableLocalRsaPts: unlockablePts,
    capturedLanguages: liveEditions,
    targetedLanguages: totalTargeted,
    languageGapSummary: [
      { language: 'German (DACH)', rsaUnlockPts: 4.2, status: 'TRANSLATED_DRAFT / REVIEW' },
      { language: 'Spanish (Spain)', rsaUnlockPts: 3.0, status: 'COMPLIANCE_REVIEW' },
      { language: 'Portuguese (Brazil)', rsaUnlockPts: 2.8, status: 'PREPARING' },
      { language: 'French (France)', rsaUnlockPts: 2.2, status: 'OPPORTUNITY' },
    ],
  };
}

// ─── EXPAND WINNERS / LOCALISE BEST SELLER ─────────────────────────────────────

export function runExpandWinners(): {
  bestSellerSku: string;
  bestSellerName: string;
  plan: ExpansionPlan;
} {
  const plan = generateGoGlobalPlan('pub-dd-htt-001', 'How to Trade (Complete Manual)');
  return {
    bestSellerSku: 'DD-HTT-001',
    bestSellerName: 'How to Trade (Complete Manual)',
    plan,
  };
}
