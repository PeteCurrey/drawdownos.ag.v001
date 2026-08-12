/**
 * DRAWDOWN OS — AUTONOMOUS LISTING & MERCHANDISING ENGINE
 * Pricing & Drift Engines — Financial Net Contribution Calculator,
 * Price Parity Monitor and Marketplace Drift Detector.
 */

import type { ListingPrice, ListingDriftEvent, MarketplaceListing } from './types';

// ─── PRICING CALCULATOR ───────────────────────────────────────────────────────

export interface PriceEconomicsResult {
  basePriceGbp: number;
  marketplacePriceGbp: number;
  minPriceFloorGbp: number;
  autopilotFloorGbp: number;
  estimatedPlatformFeeGbp: number;
  estimatedNetProceedsGbp: number;
  netMarginPct: number;
  isBelowAutopilotFloor: boolean;
  isBelowMinFloor: boolean;
  netContributionScore: number;
}

export function calculatePriceEconomics(
  marketplacePriceGbp: number,
  basePriceGbp: number,
  platformFeePct: number,
  minFloorGbp: number,
  autopilotFloorGbp: number
): PriceEconomicsResult {
  const estimatedPlatformFeeGbp = Math.round((marketplacePriceGbp * (platformFeePct / 100)) * 100) / 100;
  const estimatedNetProceedsGbp = Math.round((marketplacePriceGbp - estimatedPlatformFeeGbp) * 100) / 100;
  const netMarginPct = marketplacePriceGbp > 0 ? Math.round((estimatedNetProceedsGbp / marketplacePriceGbp) * 1000) / 10 : 0;

  const isBelowAutopilotFloor = marketplacePriceGbp < autopilotFloorGbp;
  const isBelowMinFloor = marketplacePriceGbp < minFloorGbp;

  // Net contribution score rewards net proceeds rather than sheer volume
  const netContributionScore = Math.round(estimatedNetProceedsGbp * (netMarginPct / 100) * 4);

  return {
    basePriceGbp,
    marketplacePriceGbp,
    minPriceFloorGbp: minFloorGbp,
    autopilotFloorGbp,
    estimatedPlatformFeeGbp,
    estimatedNetProceedsGbp,
    netMarginPct,
    isBelowAutopilotFloor,
    isBelowMinFloor,
    netContributionScore,
  };
}

export function checkPriceParity(prices: ListingPrice[]): PriceParityResult {
  if (prices.length <= 1) return { parityIntact: true, discrepancies: [] };

  const directPrice = prices.find(p => p.marketplaceId === 'ch-direct')?.marketplacePriceGbp;
  const discrepancies: Array<{ marketplaceId: string; priceGbp: number; directPriceGbp?: number; variancePct: number }> = [];

  for (const p of prices) {
    if (directPrice && p.marketplacePriceGbp !== directPrice) {
      const variancePct = Math.round((Math.abs(p.marketplacePriceGbp - directPrice) / directPrice) * 100);
      discrepancies.push({
        marketplaceId: p.marketplaceId,
        priceGbp: p.marketplacePriceGbp,
        directPriceGbp: directPrice,
        variancePct,
      });
    }
  }

  return {
    parityIntact: discrepancies.length === 0,
    discrepancies,
  };
}

export interface PriceParityResult {
  parityIntact: boolean;
  discrepancies: Array<{ marketplaceId: string; priceGbp: number; directPriceGbp?: number; variancePct: number }>;
}

// ─── DRIFT ENGINE ─────────────────────────────────────────────────────────────

export function detectListingDriftEvents(
  expectedListing: MarketplaceListing,
  liveData: { title?: string; priceGbp?: number; galleryCount?: number; fileVersion?: string }
): ListingDriftEvent[] {
  const events: ListingDriftEvent[] = [];
  const now = new Date().toISOString();

  // Title drift
  if (liveData.title && expectedListing.productName && liveData.title !== expectedListing.productName) {
    events.push({
      id: `drf-${Date.now()}-1`,
      listingId: expectedListing.id,
      productSku: expectedListing.productSku,
      marketplaceId: expectedListing.marketplaceId,
      fieldDrifted: 'title',
      expectedValue: expectedListing.productName,
      liveValue: liveData.title,
      severity: 'MEDIUM',
      detectedAt: now,
    });
  }

  // Price drift
  if (liveData.priceGbp !== undefined && expectedListing.netRevenueGbp && liveData.priceGbp < 10) {
    events.push({
      id: `drf-${Date.now()}-2`,
      listingId: expectedListing.id,
      productSku: expectedListing.productSku,
      marketplaceId: expectedListing.marketplaceId,
      fieldDrifted: 'price',
      expectedValue: '£19.99+',
      liveValue: `£${liveData.priceGbp}`,
      severity: 'HIGH',
      detectedAt: now,
    });
  }

  // File version drift (critical)
  if (liveData.fileVersion && liveData.fileVersion === 'v1.0') {
    events.push({
      id: `drf-${Date.now()}-3`,
      listingId: expectedListing.id,
      productSku: expectedListing.productSku,
      marketplaceId: expectedListing.marketplaceId,
      fieldDrifted: 'file_version',
      expectedValue: 'v1.1 (Approved Release)',
      liveValue: 'v1.0 (Obsolete File)',
      severity: 'CRITICAL',
      detectedAt: now,
    });
  }

  return events;
}
