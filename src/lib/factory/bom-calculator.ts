/**
 * DRAWDOWN OS — PRODUCT FACTORY
 * BOM Calculator — Queries Connector Factory for marketplace requirements
 * and computes Digital Product Bills of Materials & Readiness Scores.
 */

import type {
  ProductBOM, BOMFormatItem, BOMAssetItem, BOMMetadataItem,
  MarketplacePackageSummary, FormatType, AssetType,
} from './types';

// ─── CONNECTOR FACTORY INTERFACE ─────────────────────────────────────────────
// These functions query the Connector Factory manifest registry.
// In production they call getConnectorCapabilities() from src/lib/connectors/registry.ts

export interface MarketplaceFormatRequirements {
  marketplaceId: string;
  marketplaceName: string;
  supportedFormats: FormatType[];
  requiredFormats: FormatType[];
  maxFileSizeMB: number;
  maxTitleChars: number;
  maxDescriptionChars: number;
  requiredAssets: Array<{ type: AssetType; label: string; minWidthPx: number; minHeightPx: number }>;
  requiresISBN: boolean;
  requiresDisclaimer: boolean;
  requiresRiskWarning: boolean;
  automationEligible: boolean;
}

// Static manifest of format requirements per connector
// In production, this is fetched from ConnectorFactory registry
const MARKETPLACE_FORMAT_REQUIREMENTS: Record<string, MarketplaceFormatRequirements> = {
  'ch-etsy': {
    marketplaceId: 'ch-etsy', marketplaceName: 'Etsy',
    supportedFormats: ['PREMIUM_PDF', 'COMPRESSED_PDF', 'WORKBOOK_PDF', 'PRINTABLE_PDF', 'SAMPLE_PDF'],
    requiredFormats: ['COMPRESSED_PDF'],
    maxFileSizeMB: 20, maxTitleChars: 140, maxDescriptionChars: 2000,
    requiredAssets: [
      { type: 'COVER', label: 'Primary Cover', minWidthPx: 2000, minHeightPx: 2000 },
      { type: 'GALLERY_IMAGE', label: 'Gallery 1', minWidthPx: 2000, minHeightPx: 2000 },
      { type: 'GALLERY_IMAGE', label: 'Gallery 2', minWidthPx: 2000, minHeightPx: 2000 },
      { type: 'GALLERY_IMAGE', label: 'Gallery 3', minWidthPx: 2000, minHeightPx: 2000 },
    ],
    requiresISBN: false, requiresDisclaimer: true, requiresRiskWarning: true, automationEligible: false,
  },
  'ch-whop': {
    marketplaceId: 'ch-whop', marketplaceName: 'Whop',
    supportedFormats: ['PREMIUM_PDF', 'COMPRESSED_PDF', 'WORKBOOK_PDF', 'PRINTABLE_PDF', 'SAMPLE_PDF', 'REFLOWABLE_EPUB3'],
    requiredFormats: ['PREMIUM_PDF'],
    maxFileSizeMB: 500, maxTitleChars: 100, maxDescriptionChars: 5000,
    requiredAssets: [
      { type: 'COVER', label: 'Product Cover', minWidthPx: 800, minHeightPx: 800 },
      { type: 'THUMBNAIL', label: 'Thumbnail', minWidthPx: 400, minHeightPx: 400 },
    ],
    requiresISBN: false, requiresDisclaimer: true, requiresRiskWarning: true, automationEligible: true,
  },
  'ch-gumroad': {
    marketplaceId: 'ch-gumroad', marketplaceName: 'Gumroad',
    supportedFormats: ['PREMIUM_PDF', 'COMPRESSED_PDF', 'WORKBOOK_PDF', 'PRINTABLE_PDF'],
    requiredFormats: ['PREMIUM_PDF'],
    maxFileSizeMB: 500, maxTitleChars: 255, maxDescriptionChars: 10000,
    requiredAssets: [
      { type: 'COVER', label: 'Product Cover', minWidthPx: 1200, minHeightPx: 900 },
    ],
    requiresISBN: false, requiresDisclaimer: true, requiresRiskWarning: false, automationEligible: true,
  },
  'ch-amazon-kdp': {
    marketplaceId: 'ch-amazon-kdp', marketplaceName: 'Amazon KDP',
    supportedFormats: ['KINDLE_PACKAGE', 'REFLOWABLE_EPUB3', 'PRINT_INTERIOR', 'PRINT_COVER'],
    requiredFormats: ['REFLOWABLE_EPUB3'],
    maxFileSizeMB: 650, maxTitleChars: 200, maxDescriptionChars: 4000,
    requiredAssets: [
      { type: 'COVER', label: 'Kindle Cover', minWidthPx: 1600, minHeightPx: 2560 },
    ],
    requiresISBN: false, requiresDisclaimer: true, requiresRiskWarning: false, automationEligible: false,
  },
  'ch-apple-books': {
    marketplaceId: 'ch-apple-books', marketplaceName: 'Apple Books',
    supportedFormats: ['REFLOWABLE_EPUB3', 'FIXED_LAYOUT_EPUB'],
    requiredFormats: ['REFLOWABLE_EPUB3'],
    maxFileSizeMB: 2000, maxTitleChars: 200, maxDescriptionChars: 4000,
    requiredAssets: [
      { type: 'COVER', label: 'Book Cover', minWidthPx: 1400, minHeightPx: 1873 },
    ],
    requiresISBN: false, requiresDisclaimer: true, requiresRiskWarning: false, automationEligible: false,
  },
  'ch-hotmart': {
    marketplaceId: 'ch-hotmart', marketplaceName: 'Hotmart',
    supportedFormats: ['PREMIUM_PDF', 'WORKBOOK_PDF', 'COURSE_SOURCE'],
    requiredFormats: ['PREMIUM_PDF'],
    maxFileSizeMB: 200, maxTitleChars: 100, maxDescriptionChars: 2000,
    requiredAssets: [
      { type: 'COVER', label: 'Product Image', minWidthPx: 1280, minHeightPx: 720 },
    ],
    requiresISBN: false, requiresDisclaimer: true, requiresRiskWarning: true, automationEligible: true,
  },
  'ch-payhip': {
    marketplaceId: 'ch-payhip', marketplaceName: 'Payhip',
    supportedFormats: ['PREMIUM_PDF', 'COMPRESSED_PDF', 'WORKBOOK_PDF', 'PRINTABLE_PDF'],
    requiredFormats: ['PREMIUM_PDF'],
    maxFileSizeMB: 500, maxTitleChars: 200, maxDescriptionChars: 5000,
    requiredAssets: [
      { type: 'COVER', label: 'Cover Image', minWidthPx: 800, minHeightPx: 800 },
    ],
    requiresISBN: false, requiresDisclaimer: true, requiresRiskWarning: true, automationEligible: true,
  },
  'ch-lemonsqueezy': {
    marketplaceId: 'ch-lemonsqueezy', marketplaceName: 'Lemon Squeezy',
    supportedFormats: ['PREMIUM_PDF', 'WORKBOOK_PDF', 'PRINTABLE_PDF', 'REFLOWABLE_EPUB3'],
    requiredFormats: ['PREMIUM_PDF'],
    maxFileSizeMB: 500, maxTitleChars: 150, maxDescriptionChars: 5000,
    requiredAssets: [
      { type: 'COVER', label: 'Product Image', minWidthPx: 1000, minHeightPx: 1000 },
    ],
    requiresISBN: false, requiresDisclaimer: true, requiresRiskWarning: true, automationEligible: true,
  },
};

export function getMarketplaceRequirements(marketplaceId: string): MarketplaceFormatRequirements | null {
  return MARKETPLACE_FORMAT_REQUIREMENTS[marketplaceId] ?? null;
}

export function getSupportedFormats(marketplaceId: string): FormatType[] {
  return MARKETPLACE_FORMAT_REQUIREMENTS[marketplaceId]?.supportedFormats ?? [];
}

export function getRequiredFormats(marketplaceId: string): FormatType[] {
  return MARKETPLACE_FORMAT_REQUIREMENTS[marketplaceId]?.requiredFormats ?? [];
}

export function getAutomationEligibility(marketplaceId: string): boolean {
  return MARKETPLACE_FORMAT_REQUIREMENTS[marketplaceId]?.automationEligible ?? false;
}

// ─── BOM CALCULATOR ───────────────────────────────────────────────────────────

interface BOMInput {
  productSku: string;
  productName: string;
  targetMarketplaces: string[];
  currentFormats: Array<{ formatType: FormatType; status: string; pageCount?: number; fileSizeBytes?: number; validatedAt?: string; qaStatus?: string }>;
  currentAssets: Array<{ assetType: AssetType; label: string; status: string; marketplaceTargets: string[] }>;
  currentMetadata: Array<{ field: string; status: string; source: string }>;
  contentCoveragePct: number;
  complianceApproved: boolean;
}

export function calculateProductBOM(input: BOMInput): ProductBOM {
  const {
    productSku, productName, targetMarketplaces,
    currentFormats, currentAssets, currentMetadata,
    contentCoveragePct, complianceApproved,
  } = input;

  // ── Consolidate required formats across all target marketplaces ──
  const requiredFormatSet = new Set<FormatType>();
  for (const mktId of targetMarketplaces) {
    const reqs = getRequiredFormats(mktId);
    reqs.forEach(f => requiredFormatSet.add(f));
  }

  const consolidatedFormats: BOMFormatItem[] = Array.from(requiredFormatSet).map(formatType => {
    const existing = currentFormats.find(f => f.formatType === formatType);
    if (existing) {
      return {
        formatType,
        status: existing.status as BOMFormatItem['status'],
        blocking: existing.status !== 'APPROVED',
        pageCount: existing.pageCount,
        fileSizeBytes: existing.fileSizeBytes,
        validatedAt: existing.validatedAt,
        qaStatus: existing.qaStatus as BOMFormatItem['qaStatus'],
      };
    }
    return { formatType, status: 'REQUIRED', blocking: true };
  });

  // Add non-blocking optional formats that are already approved
  for (const cf of currentFormats) {
    if (!requiredFormatSet.has(cf.formatType)) {
      consolidatedFormats.push({
        formatType: cf.formatType,
        status: cf.status as BOMFormatItem['status'],
        blocking: false,
        pageCount: cf.pageCount,
        fileSizeBytes: cf.fileSizeBytes,
        validatedAt: cf.validatedAt,
        qaStatus: cf.qaStatus as BOMFormatItem['qaStatus'],
      });
    }
  }

  // ── Consolidate required assets ──
  const requiredAssetLabels = new Map<string, { type: AssetType; label: string; targets: string[] }>();
  for (const mktId of targetMarketplaces) {
    const req = getMarketplaceRequirements(mktId);
    if (!req) continue;
    for (const asset of req.requiredAssets) {
      const key = `${asset.type}:${asset.label}`;
      if (!requiredAssetLabels.has(key)) {
        requiredAssetLabels.set(key, { type: asset.type, label: asset.label, targets: [mktId] });
      } else {
        requiredAssetLabels.get(key)!.targets.push(mktId);
      }
    }
  }

  const consolidatedAssets: BOMAssetItem[] = Array.from(requiredAssetLabels.values()).map(req => {
    const existing = currentAssets.find(a => a.assetType === req.type && a.label === req.label);
    return {
      assetType: req.type,
      label: req.label,
      status: existing?.status as BOMAssetItem['status'] ?? 'MISSING',
      blocking: !existing || existing.status === 'MISSING' || existing.status === 'REQUIRED',
      marketplaceTargets: req.targets,
    };
  });

  // ── Marketplace packages ──
  const marketplacePackages: MarketplacePackageSummary[] = targetMarketplaces.map(mktId => {
    const reqs = getMarketplaceRequirements(mktId);
    const missingItems: string[] = [];

    if (reqs) {
      // Check required formats
      for (const fmtType of reqs.requiredFormats) {
        const fmt = consolidatedFormats.find(f => f.formatType === fmtType);
        if (!fmt || fmt.status !== 'APPROVED') missingItems.push(`${fmtType} format`);
      }
      // Check required assets
      for (const asset of reqs.requiredAssets) {
        const key = `${asset.type}:${asset.label}`;
        const a = consolidatedAssets.find(ca => `${ca.assetType}:${ca.label}` === key);
        if (!a || a.status === 'MISSING') missingItems.push(asset.label);
      }
      if (reqs.requiresDisclaimer) {
        const hasMeta = currentMetadata.some(m => m.field === 'disclaimer' && m.status === 'COMPLETE');
        if (!hasMeta) missingItems.push('Disclaimer');
      }
    }

    return {
      marketplaceId: mktId,
      marketplaceName: reqs?.marketplaceName ?? mktId,
      status: missingItems.length === 0 ? 'READY' : 'INCOMPLETE',
      missingItems,
    };
  });

  // ── Score calculation ──
  const approvedFormats = consolidatedFormats.filter(f => f.status === 'APPROVED').length;
  const totalRequiredFormats = consolidatedFormats.filter(f => f.blocking).length;
  const formatPct = totalRequiredFormats === 0 ? 100 : Math.round((approvedFormats / totalRequiredFormats) * 100);

  const readyAssets = consolidatedAssets.filter(a => a.status === 'READY').length;
  const totalRequiredAssets = consolidatedAssets.filter(a => a.blocking).length;
  const assetsPct = totalRequiredAssets === 0 ? 100 : Math.round((readyAssets / totalRequiredAssets) * 100);

  const completeMetadata = currentMetadata.filter(m => m.status === 'COMPLETE').length;
  const metadataPct = currentMetadata.length === 0 ? 100 : Math.round((completeMetadata / currentMetadata.length) * 100);

  const compliancePct = complianceApproved ? 100 : 0;

  const readyPackages = marketplacePackages.filter(p => p.status === 'READY').length;
  const marketRequirementsPct = marketplacePackages.length === 0 ? 100 : Math.round((readyPackages / marketplacePackages.length) * 100);

  const readinessScorePct = Math.round(
    contentCoveragePct * 0.2 +
    formatPct * 0.25 +
    assetsPct * 0.15 +
    metadataPct * 0.15 +
    compliancePct * 0.15 +
    marketRequirementsPct * 0.10
  );

  const blockingItems: string[] = [
    ...consolidatedFormats.filter(f => f.blocking && f.status !== 'APPROVED').map(f => `${f.formatType} format required`),
    ...consolidatedAssets.filter(a => a.blocking && a.status === 'MISSING').map(a => `${a.label} asset missing`),
    ...currentMetadata.filter(m => m.status === 'MISSING').map(m => `${m.field} metadata missing`),
    ...(!complianceApproved ? ['Compliance approval required'] : []),
  ];

  return {
    productSku,
    productName,
    readinessScorePct,
    contentPct: contentCoveragePct,
    formatPct,
    assetsPct,
    metadataPct,
    compliancePct,
    marketRequirementsPct,
    blockingItems,
    formats: consolidatedFormats,
    assets: consolidatedAssets,
    metadata: currentMetadata as BOMMetadataItem[],
    marketplacePackages,
    updatedAt: new Date().toISOString(),
  };
}

// ─── REQUIREMENT CONSOLIDATION ────────────────────────────────────────────────

/**
 * Consolidate asset requirements across all target marketplaces.
 * Identify the largest common denominator to avoid duplicate assets.
 * §27 — Do not create twelve nearly identical assets unnecessarily.
 */
export function consolidateAssetRequirements(
  marketplaceIds: string[]
): ConsolidatedAssetRequirement[] {
  const allRequirements = marketplaceIds
    .map(id => getMarketplaceRequirements(id))
    .filter(Boolean) as MarketplaceFormatRequirements[];

  const assetMap = new Map<AssetType, ConsolidatedAssetRequirement>();

  for (const req of allRequirements) {
    for (const asset of req.requiredAssets) {
      const existing = assetMap.get(asset.type);
      if (!existing) {
        assetMap.set(asset.type, {
          assetType: asset.type,
          canonicalMinWidthPx: asset.minWidthPx,
          canonicalMinHeightPx: asset.minHeightPx,
          requiredBy: [req.marketplaceId],
          channelDerivativesRequired: [],
        });
      } else {
        // Take the maximum dimensions to satisfy all channels with one master
        existing.canonicalMinWidthPx = Math.max(existing.canonicalMinWidthPx, asset.minWidthPx);
        existing.canonicalMinHeightPx = Math.max(existing.canonicalMinHeightPx, asset.minHeightPx);
        existing.requiredBy.push(req.marketplaceId);
      }
    }
  }

  return Array.from(assetMap.values());
}

export interface ConsolidatedAssetRequirement {
  assetType: AssetType;
  canonicalMinWidthPx: number;
  canonicalMinHeightPx: number;
  requiredBy: string[];
  channelDerivativesRequired: Array<{ marketplaceId: string; widthPx: number; heightPx: number }>;
}
