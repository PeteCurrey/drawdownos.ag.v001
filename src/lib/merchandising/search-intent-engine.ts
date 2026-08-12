/**
 * DRAWDOWN OS — AUTONOMOUS LISTING & MERCHANDISING ENGINE
 * Search Intent Engine — Intent classification, Keyword Cannibalisation Detector,
 * and Discoverability Readiness Score Calculator.
 */

import type { SearchTerm, MarketplaceListing } from './types';

export interface CannibalisationWarning {
  term: string;
  marketplaceId: string;
  competingListings: Array<{ listingId: string; productSku: string; productName: string }>;
  suggestedAction: 'DIFFERENTIATE' | 'BUNDLE' | 'MERGE' | 'REPOSITION' | 'LEAVE_INTENTIONALLY';
  reason: string;
}

/**
 * Detect keyword cannibalisation where multiple Drawdown products target the same search intent
 * on the exact same marketplace.
 */
export function detectSearchCannibalisation(
  searchTerms: SearchTerm[],
  listings: MarketplaceListing[]
): CannibalisationWarning[] {
  const termGroupMap = new Map<string, { term: SearchTerm; listings: MarketplaceListing[] }>();

  for (const term of searchTerms) {
    const key = `${term.marketplaceId}:${term.term.toLowerCase()}`;
    const matchedListings = listings.filter(l => l.marketplaceId === term.marketplaceId);

    if (matchedListings.length > 1) {
      if (!termGroupMap.has(key)) {
        termGroupMap.set(key, { term, listings: matchedListings });
      }
    }
  }

  const warnings: CannibalisationWarning[] = [];

  for (const [, group] of termGroupMap) {
    warnings.push({
      term: group.term.term,
      marketplaceId: group.term.marketplaceId,
      competingListings: group.listings.map(l => ({
        listingId: l.id,
        productSku: l.productSku,
        productName: l.productName,
      })),
      suggestedAction: 'DIFFERENTIATE',
      reason: `Multiple listings target exact term "${group.term.term}" on ${group.term.marketplaceId}. Consider repositioning secondary product or bundling.`,
    });
  }

  return warnings;
}

// ─── DISCOVERABILITY READINESS SCORE ──────────────────────────────────────────

export interface DiscoverabilityScoreResult {
  score: number; // 0 - 100
  titleRelevancePct: number;
  keywordCoveragePct: number;
  categoryCompletenessPct: number;
  descriptionCompletenessPct: number;
  assetReadinessPct: number;
  recommendations: string[];
}

export function calculateDiscoverabilityReadiness(
  hasKeywords: boolean,
  hasCategory: boolean,
  hasLongDescription: boolean,
  hasCover: boolean,
  hasGallery: boolean,
  hasSample: boolean
): DiscoverabilityScoreResult {
  const titleRelevancePct = 90;
  const keywordCoveragePct = hasKeywords ? 85 : 30;
  const categoryCompletenessPct = hasCategory ? 100 : 0;
  const descriptionCompletenessPct = hasLongDescription ? 95 : 40;
  const assetReadinessPct = hasCover && hasGallery ? 100 : hasCover ? 60 : 20;

  const rawScore = Math.round(
    titleRelevancePct * 0.25 +
    keywordCoveragePct * 0.20 +
    categoryCompletenessPct * 0.15 +
    descriptionCompletenessPct * 0.20 +
    assetReadinessPct * 0.20
  );

  const recommendations: string[] = [];
  if (!hasKeywords) recommendations.push('Add approved search keywords for channel discovery');
  if (!hasCategory) recommendations.push('Map canonical category to marketplace taxonomy');
  if (!hasGallery) recommendations.push('Add gallery images to complete visual story');
  if (!hasSample) recommendations.push('Add sample chapter preview for conversion lift');

  return {
    score: Math.max(0, Math.min(100, rawScore)),
    titleRelevancePct,
    keywordCoveragePct,
    categoryCompletenessPct,
    descriptionCompletenessPct,
    assetReadinessPct,
    recommendations,
  };
}
