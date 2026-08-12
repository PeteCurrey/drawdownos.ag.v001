/**
 * DRAWDOWN OS — PRODUCT FACTORY
 * IP Graph Engine — Provenance tracing, distinctiveness evaluation,
 * cannibalisation analysis and "Where did this come from?" answering.
 */

import type {
  IPGraph, IPGraphNode, ContentElement, ProductOpportunity,
  CannibalasationProfile, SurfaceUnlockSimulation, FactoryJobType,
} from './types';

// ─── PROVENANCE TRACER ───────────────────────────────────────────────────────

/**
 * Answer: "Where did this content come from?"
 * Returns full provenance chain for a given content element ID.
 */
export function traceProvenance(
  elementId: string,
  elements: ContentElement[]
): ProvenanceRecord | null {
  const element = elements.find(e => e.id === elementId);
  if (!element) return null;

  return {
    elementId: element.id,
    publicationId: element.publicationId,
    sourceAssetId: element.sourceAssetId,
    chapterNum: element.chapterNum,
    chapterTitle: element.chapterTitle,
    sectionTitle: element.sectionTitle,
    heading: element.heading,
    pageStart: element.pageStart,
    pageEnd: element.pageEnd,
    contentFidelity: element.contentFidelity,
    elementType: element.elementType,
    wordCount: element.wordCount,
    isSourceDerived: element.contentFidelity === 'SOURCE_DERIVED',
    isAIGenerated: element.contentFidelity === 'AI_GENERATED',
    isEditorial: element.contentFidelity === 'EDITORIALLY_CREATED',
    isMarketing: element.contentFidelity === 'MARKETING_CONTENT',
    provenanceSummary: buildProvenanceSummary(element),
  };
}

function buildProvenanceSummary(element: ContentElement): string {
  const parts: string[] = [];
  if (element.chapterNum) parts.push(`Chapter ${element.chapterNum}`);
  if (element.chapterTitle) parts.push(`— ${element.chapterTitle}`);
  if (element.sectionTitle) parts.push(`› ${element.sectionTitle}`);
  if (element.pageStart) parts.push(`(p.${element.pageStart}${element.pageEnd && element.pageEnd !== element.pageStart ? `–${element.pageEnd}` : ''})`);
  parts.push(`[${element.contentFidelity}]`);
  return parts.join(' ');
}

export interface ProvenanceRecord {
  elementId: string;
  publicationId: string;
  sourceAssetId: string;
  chapterNum?: number;
  chapterTitle?: string;
  sectionTitle?: string;
  heading?: string;
  pageStart?: number;
  pageEnd?: number;
  contentFidelity: string;
  elementType: string;
  wordCount?: number;
  isSourceDerived: boolean;
  isAIGenerated: boolean;
  isEditorial: boolean;
  isMarketing: boolean;
  provenanceSummary: string;
}

// ─── SOURCE COVERAGE CALCULATOR ──────────────────────────────────────────────

/**
 * Calculate what percentage of a proposed product's specification
 * can be satisfied from approved source material.
 * A derivative must NEVER claim source coverage it doesn't have.
 */
export function calculateSourceCoverage(
  requiredElements: string[],
  availableElements: ContentElement[]
): SourceCoverageResult {
  const sourceIds = new Set(availableElements.map(e => e.id));
  const found = requiredElements.filter(id => sourceIds.has(id));
  const missing = requiredElements.filter(id => !sourceIds.has(id));

  const coverage = requiredElements.length === 0
    ? 0
    : Math.round((found.length / requiredElements.length) * 100);

  const aiGeneratedElements = availableElements.filter(
    e => found.includes(e.id) && e.contentFidelity === 'AI_GENERATED'
  );

  return {
    coveragePct: coverage,
    totalRequired: requiredElements.length,
    foundFromSource: found.length,
    missing: missing,
    aiGeneratedCount: aiGeneratedElements.length,
    editorialGapExists: coverage < 100,
    warning: aiGeneratedElements.length > 0
      ? `${aiGeneratedElements.length} element(s) are AI_GENERATED and must not be labelled SOURCE_DERIVED`
      : undefined,
  };
}

export interface SourceCoverageResult {
  coveragePct: number;
  totalRequired: number;
  foundFromSource: number;
  missing: string[];
  aiGeneratedCount: number;
  editorialGapExists: boolean;
  warning?: string;
}

// ─── DISTINCTIVENESS EVALUATOR ───────────────────────────────────────────────

/**
 * Score how commercially distinct a proposed product is.
 * Prevents meaningless SKU proliferation by warning on low scores.
 */
export function evaluateDistinctiveness(
  opportunity: Pick<ProductOpportunity,
    'customerJob' | 'opportunityType' | 'sourceCoveragePct' | 'proposedFormats' | 'potentialMarketplaces'
  >,
  existingProducts: Array<{ customerJob: string; proposedFormats: string[] }>
): DistinctivenessResult {
  let score = 50; // baseline

  // Unique customer job vs existing products
  const sameJobCount = existingProducts.filter(p => p.customerJob === opportunity.customerJob).length;
  if (sameJobCount === 0) score += 25;
  else if (sameJobCount === 1) score += 10;
  else score -= 10;

  // Format differentiation
  const hasUniqueFormat = opportunity.proposedFormats.some(
    f => !existingProducts.flatMap(p => p.proposedFormats).includes(f)
  );
  if (hasUniqueFormat) score += 10;

  // Source coverage — heavily derived products with same audience = duplication risk
  if (opportunity.sourceCoveragePct > 90 && sameJobCount > 1) score -= 15;

  // Marketplace expansion potential
  if (opportunity.potentialMarketplaces.length >= 5) score += 10;
  else if (opportunity.potentialMarketplaces.length >= 3) score += 5;

  // Type bonuses
  if (opportunity.opportunityType === 'PROGRAMME') score += 15;
  if (opportunity.opportunityType === 'FORMAT') score -= 10;
  if (opportunity.opportunityType === 'BUNDLE') score += 5;

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    level: score >= 70 ? 'HIGH' : score >= 45 ? 'MEDIUM' : 'LOW',
    isLowDistinctiveness: score < 40,
    warning: score < 40
      ? 'LOW-DISTINCTIVENESS PRODUCT: This derivative may be essentially duplicate packaging. Review before approval.'
      : undefined,
    factors: {
      uniqueCustomerJob: sameJobCount === 0,
      hasFormatDifferentiation: hasUniqueFormat,
      marketplaceExpansionStrong: opportunity.potentialMarketplaces.length >= 5,
    },
  };
}

export interface DistinctivenessResult {
  score: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  isLowDistinctiveness: boolean;
  warning?: string;
  factors: {
    uniqueCustomerJob: boolean;
    hasFormatDifferentiation: boolean;
    marketplaceExpansionStrong: boolean;
  };
}

// ─── CANNIBALISATION ANALYSER ─────────────────────────────────────────────────

/**
 * Analyse commercial overlap between a proposed product and existing products.
 * Does NOT block automatically — makes the relationship visible.
 */
export function analyseCannibalisation(
  proposed: Pick<ProductOpportunity, 'customerJob' | 'proposedFormats' | 'potentialMarketplaces' | 'sourceCoveragePct'>,
  existingProduct: Pick<ProductOpportunity, 'customerJob' | 'proposedFormats' | 'potentialMarketplaces' | 'sourceCoveragePct'>
): CannibalasationProfile {
  // Content overlap — derived from same source sections
  const contentOverlap = Math.min(proposed.sourceCoveragePct, existingProduct.sourceCoveragePct);

  // Audience overlap — same customer job = high overlap
  const audienceOverlap = proposed.customerJob === existingProduct.customerJob ? 80 : 35;

  // Price overlap — same formats suggest similar price points
  const formatIntersection = proposed.proposedFormats.filter(
    f => existingProduct.proposedFormats.includes(f)
  ).length;
  const priceOverlap = Math.round((formatIntersection / Math.max(proposed.proposedFormats.length, 1)) * 100);

  // Channel overlap
  const channelIntersection = proposed.potentialMarketplaces.filter(
    m => existingProduct.potentialMarketplaces.includes(m)
  ).length;
  const channelOverlap = Math.round(
    (channelIntersection / Math.max(proposed.potentialMarketplaces.length, 1)) * 100
  );

  // Determine relationship
  const avgOverlap = (contentOverlap + audienceOverlap + priceOverlap + channelOverlap) / 4;
  let relationship: CannibalasationProfile['relationship'];
  if (avgOverlap >= 70) relationship = 'HIGH_OVERLAP';
  else if (audienceOverlap >= 70 && priceOverlap < 30) relationship = 'UPSELL';
  else if (audienceOverlap >= 70 && priceOverlap >= 60) relationship = 'SUBSTITUTE';
  else if (channelOverlap >= 60 && contentOverlap < 40) relationship = 'COMPLEMENTARY';
  else if (priceOverlap < 20 && contentOverlap >= 50) relationship = 'BUNDLE_CANDIDATE';
  else relationship = 'COMPLEMENTARY';

  return { contentOverlap, audienceOverlap, priceOverlap, channelOverlap, relationship };
}

// ─── DUPLICATE CONTENT DETECTOR ──────────────────────────────────────────────

/**
 * Detect if a content element hash already exists in the registry.
 * Prevents duplicate extracted elements in different products.
 */
export function detectDuplicateContent(
  contentHash: string,
  existingHashes: Map<string, string>  // hash → productSku
): DuplicateContentResult {
  const existingSku = existingHashes.get(contentHash);
  return {
    isDuplicate: !!existingSku,
    existingProductSku: existingSku,
    warning: existingSku
      ? `Exact duplicate content detected — already used in ${existingSku}. Ensure reuse is intentional and commercially justified.`
      : undefined,
  };
}

export interface DuplicateContentResult {
  isDuplicate: boolean;
  existingProductSku?: string;
  warning?: string;
}

// ─── STRATEGIC EXCLUSION CHECKER ─────────────────────────────────────────────

const STRATEGIC_EXCLUSIONS: StrategicExclusion[] = [
  { rule: 'NEVER_SELL_SIGNALS', keywords: ['signal', 'signals', 'trading alerts', 'buy alert', 'sell alert'], reason: 'Contrary to Drawdown publishing principles. Drawdown does not sell trading signals.' },
  { rule: 'NO_GUARANTEED_RETURNS', keywords: ['guaranteed return', 'guaranteed profit', 'guaranteed income', 'guaranteed results'], reason: 'No product may promise guaranteed financial returns.' },
  { rule: 'NO_FAKE_URGENCY', keywords: ['limited time only', 'act now', 'expires today', 'only X left'], reason: 'No misleading scarcity or fake urgency products.' },
  { rule: 'NO_INCOME_PROMISES', keywords: ['earn £', 'make money', 'passive income guaranteed', 'financial freedom guaranteed'], reason: 'No income promise products.' },
  { rule: 'NO_MICRO_PDFS', minWordCount: 300, reason: 'Drawdown does not sell meaningless micro-PDFs. Products must provide substantial educational value.' },
];

export interface StrategicExclusion {
  rule: string;
  keywords?: string[];
  minWordCount?: number;
  reason: string;
}

export function checkStrategicExclusions(
  title: string,
  description: string,
  estimatedWordCount?: number
): StrategicExclusionResult[] {
  const violations: StrategicExclusionResult[] = [];
  const lowerText = `${title} ${description}`.toLowerCase();

  for (const exclusion of STRATEGIC_EXCLUSIONS) {
    if (exclusion.keywords) {
      const matched = exclusion.keywords.filter(kw => lowerText.includes(kw.toLowerCase()));
      if (matched.length > 0) {
        violations.push({
          rule: exclusion.rule,
          reason: exclusion.reason,
          matchedKeywords: matched,
          severity: 'BLOCK',
        });
      }
    }
    if (exclusion.minWordCount && estimatedWordCount !== undefined) {
      if (estimatedWordCount < exclusion.minWordCount) {
        violations.push({
          rule: exclusion.rule,
          reason: exclusion.reason,
          severity: 'WARN',
        });
      }
    }
  }

  return violations;
}

export interface StrategicExclusionResult {
  rule: string;
  reason: string;
  matchedKeywords?: string[];
  severity: 'BLOCK' | 'WARN';
}

// ─── GRAPH TRAVERSAL ─────────────────────────────────────────────────────────

/**
 * Find all IP graph nodes affected by a source change.
 * Used for source change impact analysis.
 */
export function findAffectedNodes(
  changedElementId: string,
  graph: IPGraph
): AffectedNodeResult[] {
  const affected: AffectedNodeResult[] = [];

  for (const edge of graph.edges) {
    // Find nodes that reference the changed element
    const targetNode = graph.nodes[0]?.children?.find(n => n.sourceChunkId === changedElementId);
    if (targetNode) {
      affected.push({
        nodeId: targetNode.id,
        nodeLabel: targetNode.label,
        nodeType: targetNode.nodeType,
        relationshipType: edge.relationshipType,
        impactLevel: edge.weight >= 0.8 ? 'HIGH' : edge.weight >= 0.5 ? 'MEDIUM' : 'LOW',
      });
    }
  }

  return affected;
}

export interface AffectedNodeResult {
  nodeId: string;
  nodeLabel: string;
  nodeType: string;
  relationshipType: string;
  impactLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}

// ─── SURFACE UNLOCK ESTIMATOR ─────────────────────────────────────────────────

/**
 * Estimate commercial surface unlock for a proposed factory job.
 * This is an estimate — not a guaranteed revenue forecast.
 */
export function estimateSurfaceUnlock(
  jobType: FactoryJobType,
  productSku: string,
  currentSurfaces: number
): { estimatedGain: number; confidence: 'LOW' | 'MEDIUM' | 'HIGH' } {
  const UNLOCK_ESTIMATES: Record<string, { gain: number; confidence: 'LOW' | 'MEDIUM' | 'HIGH' }> = {
    'GENERATE_FORMAT:REFLOWABLE_EPUB3': { gain: 6.2, confidence: 'HIGH' },
    'GENERATE_FORMAT:KINDLE_PACKAGE': { gain: 3.8, confidence: 'HIGH' },
    'GENERATE_FORMAT:WORKBOOK_PDF': { gain: 2.4, confidence: 'HIGH' },
    'LOCALISE:de': { gain: 3.8, confidence: 'MEDIUM' },
    'LOCALISE:es': { gain: 3.2, confidence: 'MEDIUM' },
    'LOCALISE:pt': { gain: 2.9, confidence: 'MEDIUM' },
    'GENERATE_ASSET:GALLERY_IMAGE': { gain: 1.2, confidence: 'HIGH' },
    'BUILD_MARKETPLACE_PACKAGE': { gain: 1.0, confidence: 'HIGH' },
  };

  const key = jobType;
  const estimate = UNLOCK_ESTIMATES[key] ?? { gain: 0.5, confidence: 'LOW' };

  return {
    estimatedGain: estimate.gain,
    confidence: estimate.confidence,
  };
}
