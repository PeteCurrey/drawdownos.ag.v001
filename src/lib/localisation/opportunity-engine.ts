/**
 * DRAWDOWN OS — GLOBAL LOCALISATION ENGINE
 * Opportunity & Priority Engine — Priority Score Calculator,
 * "WHAT LANGUAGE NEXT?", "GO GLOBAL" Planner, and Locale Simulators.
 */

import type { LocalisationOpportunity, ExpansionPlan } from './types';
import { LOCALISATION_OPPORTUNITIES } from './demo-localisation-data';

// ─── PRIORITY SCORE CALCULATOR ───────────────────────────────────────────────

export interface PriorityScoreBreakdown {
  score: number; // 0 - 100
  marketplaceOpportunityScore: number; // max 20
  territoryRelevanceScore: number;    // max 15
  rsaUnlockScore: number;            // max 15
  existingSalesSignalScore: number;  // max 10
  searchDemandSignalScore: number;   // max 10
  productMarketFitScore: number;     // max 10
  affiliateOpportunityScore: number; // max 5
  complexityPenalty: number;         // subtracted for high compliance/review effort
  explanation: string;
}

export function calculateLocalisationPriorityScore(
  opp: Pick<LocalisationOpportunity, 'rsaUnlockPts' | 'unlockedMarketplaces' | 'estimatedEffort' | 'existingSalesSignal' | 'confidence'>
): PriorityScoreBreakdown {
  const mktScore = Math.min(opp.unlockedMarketplaces.length * 4, 20);
  const rsaScore = Math.min(opp.rsaUnlockPts * 3.5, 15);
  const territoryScore = 14;
  const salesSignalScore = opp.existingSalesSignal ? 10 : 3;
  const searchSignalScore = 8;
  const fitScore = 9;
  const affiliateScore = opp.unlockedMarketplaces.some(m => m.toLowerCase().includes('hotmart')) ? 5 : 2;

  let penalty = 0;
  if (opp.estimatedEffort === 'HIGH') penalty = 7;
  else if (opp.estimatedEffort === 'MEDIUM') penalty = 3;

  const raw = mktScore + rsaScore + territoryScore + salesSignalScore + searchSignalScore + fitScore + affiliateScore - penalty;
  const score = Math.max(0, Math.min(100, Math.round(raw)));

  return {
    score,
    marketplaceOpportunityScore: mktScore,
    territoryRelevanceScore: territoryScore,
    rsaUnlockScore: rsaScore,
    existingSalesSignalScore: salesSignalScore,
    searchDemandSignalScore: searchSignalScore,
    productMarketFitScore: fitScore,
    affiliateOpportunityScore: affiliateScore,
    complexityPenalty: penalty,
    explanation: `Priority ${score}/100: Unlocks ${opp.unlockedMarketplaces.length} marketplaces (+${opp.rsaUnlockPts} RSA pts). Effort: ${opp.estimatedEffort}.`,
  };
}

// ─── WHAT LANGUAGE NEXT? RANKER ──────────────────────────────────────────────

export function rankNextLanguageOpportunities(): LocalisationOpportunity[] {
  return LOCALISATION_OPPORTUNITIES.slice().sort((a, b) => b.priorityScore - a.priorityScore);
}

// ─── GO GLOBAL PLANNER ────────────────────────────────────────────────────────

export function generateGoGlobalPlan(
  publicationId: string = 'pub-dd-htt-001',
  publicationTitle: string = 'How to Trade (Complete Manual)'
): ExpansionPlan {
  const sorted = rankNextLanguageOpportunities();
  let totalRsa = 0;

  const recommendedLocales = sorted.map((opp, idx) => {
    totalRsa += opp.rsaUnlockPts;
    return {
      step: idx + 1,
      localeCode: opp.localeCode,
      localeName: opp.localeName,
      rsaUnlockPts: opp.rsaUnlockPts,
      unlockedMarketplaces: opp.unlockedMarketplaces,
      effort: opp.estimatedEffort,
      priorityScore: opp.priorityScore,
      existingSalesSignal: opp.existingSalesSignal,
    };
  });

  return {
    publicationId,
    publicationTitle,
    recommendedLocales,
    totalUnlockPts: Math.round(totalRsa * 10) / 10,
    note: 'This expansion plan is a simulation. No automated translation execution will occur without explicit human approval.',
  };
}

// ─── LOCALE SIMULATORS ────────────────────────────────────────────────────────

export interface LocaleSimulationResult {
  localeCode: string;
  localeName: string;
  rsaUnlockPts: number;
  unlockedMarketplaces: string[];
  totalTranslationUnits: number;
  complianceSensitiveUnitsCount: number;
  estimatedReviewHours: number;
  keyRegulatoryRequirements: string[];
  summary: string;
}

export function simulateLocaleUnlock(localeCode: string): LocaleSimulationResult {
  const SIMS: Record<string, LocaleSimulationResult> = {
    'de-DE': {
      localeCode: 'de-DE',
      localeName: 'German (Germany / DACH)',
      rsaUnlockPts: 4.2,
      unlockedMarketplaces: ['Tolino DACH', 'Kobo DACH', 'Apple Books Germany', 'Google Play DE', 'Amazon.de Kindle'],
      totalTranslationUnits: 142,
      complianceSensitiveUnitsCount: 14,
      estimatedReviewHours: 12,
      keyRegulatoryRequirements: ['BaFin mandatory risk disclaimer overlay', 'Impressum / Legal Notice link requirement'],
      summary: 'German DACH unlocks 5 major European marketplaces (+4.2 RSA pts). High commercial fit for structured trading education.',
    },
    'es-ES': {
      localeCode: 'es-ES',
      localeName: 'Spanish (Spain)',
      rsaUnlockPts: 3.0,
      unlockedMarketplaces: ['Amazon.es Kindle', 'Apple Books Spain', 'Google Play ES', 'Hotmart Spain'],
      totalTranslationUnits: 142,
      complianceSensitiveUnitsCount: 10,
      estimatedReviewHours: 8,
      keyRegulatoryRequirements: ['CNMV risk disclosure statement'],
      summary: 'Spanish Spain unlocks 4 European & affiliate education channels (+3.0 RSA pts).',
    },
    'pt-BR': {
      localeCode: 'pt-BR',
      localeName: 'Portuguese (Brazil)',
      rsaUnlockPts: 2.8,
      unlockedMarketplaces: ['Hotmart Brazil', 'Amazon.com.br Kindle', 'Kobo Brazil'],
      totalTranslationUnits: 142,
      complianceSensitiveUnitsCount: 12,
      estimatedReviewHours: 9,
      keyRegulatoryRequirements: ['CVM financial education risk notice', 'Consumer Defence Code compliance'],
      summary: 'Portuguese Brazil unlocks Hotmart LatAm affiliate networks (+2.8 RSA pts).',
    },
  };

  return SIMS[localeCode] ?? {
    localeCode,
    localeName: localeCode,
    rsaUnlockPts: 1.5,
    unlockedMarketplaces: ['Regional Kindle Store', 'Google Play'],
    totalTranslationUnits: 142,
    complianceSensitiveUnitsCount: 8,
    estimatedReviewHours: 6,
    keyRegulatoryRequirements: ['Standard territory disclaimer'],
    summary: `Localisation simulation for ${localeCode}.`,
  };
}
