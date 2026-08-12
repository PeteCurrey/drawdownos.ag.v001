/**
 * DRAWDOWN OS — PRODUCT FACTORY
 * Recommendation Engine — "NEXT FACTORY JOB" ranking and
 * "MAXIMISE PUBLICATION" simulation planner.
 */

import type {
  NextFactoryJobRecommendation, FactoryJob, IPYieldMetrics,
  ProductOpportunity, ProductBOM, SurfaceUnlockSimulation, FactoryJobType,
} from './types';

// ─── NEXT FACTORY JOB RANKER ─────────────────────────────────────────────────

interface RecommendationInput {
  opportunities: Pick<ProductOpportunity, 'id' | 'proposedSku' | 'title' | 'backlogStatus' | 'rsaUnlockPts' | 'editorialEffort' | 'confidence' | 'opportunityType'>[];
  pendingFormatJobs: Array<{ productSku: string; productName: string; formatType: string; rsaUnlockPts: number; effort: 'LOW' | 'MEDIUM' | 'HIGH'; confidence: 'LOW' | 'MEDIUM' | 'HIGH' }>;
  pendingAssetJobs: Array<{ productSku: string; label: string; rsaUnlockPts: number }>;
  pendingLocalisationJobs: Array<{ productSku: string; productName: string; language: string; rsaUnlockPts: number; effort: 'LOW' | 'MEDIUM' | 'HIGH' }>;
  currentIpYield: number;
}

const EFFORT_WEIGHT: Record<string, number> = { LOW: 1.5, MEDIUM: 1.0, HIGH: 0.6 };
const CONFIDENCE_WEIGHT: Record<string, number> = { HIGH: 1.2, MEDIUM: 1.0, LOW: 0.7 };

function scoreRecommendation(rsaUnlock: number, effort: string, confidence: string): number {
  return rsaUnlock * EFFORT_WEIGHT[effort] * CONFIDENCE_WEIGHT[confidence];
}

export function rankNextFactoryJobs(input: RecommendationInput): NextFactoryJobRecommendation[] {
  const candidates: NextFactoryJobRecommendation[] = [];

  // Approved product opportunities not yet in factory
  for (const opp of input.opportunities) {
    if (opp.backlogStatus !== 'APPROVED') continue;
    candidates.push({
      label: opp.title,
      jobType: 'GENERATE_FORMAT',
      productSku: opp.proposedSku,
      surfaceUnlockPts: opp.rsaUnlockPts,
      effort: opp.editorialEffort as 'LOW' | 'MEDIUM' | 'HIGH',
      confidence: opp.confidence as 'LOW' | 'MEDIUM' | 'HIGH',
      description: `Approve and manufacture: ${opp.title}`,
    });
  }

  // Pending format manufacturing jobs
  for (const job of input.pendingFormatJobs) {
    candidates.push({
      label: `${job.formatType.replace('_', ' ')} — ${job.productName}`,
      jobType: 'GENERATE_FORMAT',
      productSku: job.productSku,
      formatType: job.formatType as NextFactoryJobRecommendation['formatType'],
      surfaceUnlockPts: job.rsaUnlockPts,
      effort: job.effort,
      confidence: job.confidence,
      description: `Generate ${job.formatType} for ${job.productName} — unlocks additional marketplace destinations.`,
    });
  }

  // Pending asset jobs
  for (const job of input.pendingAssetJobs) {
    candidates.push({
      label: `${job.label} — Asset`,
      jobType: 'GENERATE_ASSET',
      productSku: job.productSku,
      surfaceUnlockPts: job.rsaUnlockPts,
      effort: 'LOW',
      confidence: 'HIGH',
      description: `Generate ${job.label}. Resolves blocking requirement for marketplace package.`,
    });
  }

  // Localisation jobs
  for (const job of input.pendingLocalisationJobs) {
    candidates.push({
      label: `${job.language.toUpperCase()} Edition — ${job.productName}`,
      jobType: 'LOCALISE',
      productSku: job.productSku,
      surfaceUnlockPts: job.rsaUnlockPts,
      effort: job.effort,
      confidence: 'MEDIUM',
      description: `${job.language} localisation opens regional marketplace channels.`,
    });
  }

  // Sort by composite score
  return candidates.sort((a, b) =>
    scoreRecommendation(b.surfaceUnlockPts, b.effort, b.confidence) -
    scoreRecommendation(a.surfaceUnlockPts, a.effort, a.confidence)
  ).slice(0, 8); // Top 8 recommendations
}

// ─── MAXIMISE PUBLICATION PLANNER ────────────────────────────────────────────

export interface MaximisePublicationPlan {
  publicationId: string;
  publicationTitle: string;
  simulatedJobs: MaximiseJobStep[];
  totalSurfaceUnlock: number;
  totalWeightedRsaGain: number;
  humanGatesRequired: number;
  estimatedTotalEffort: 'LOW' | 'MEDIUM' | 'HIGH';
  blockedJobs: Array<{ label: string; reason: string }>;
  note: string;
}

export interface MaximiseJobStep {
  step: number;
  label: string;
  jobType: FactoryJobType;
  productSku?: string;
  formatType?: string;
  surfaceUnlockPts: number;
  effort: 'LOW' | 'MEDIUM' | 'HIGH';
  requiresHumanApproval: boolean;
  humanApprovalReason?: string;
  status: 'READY' | 'BLOCKED' | 'REQUIRES_HUMAN';
  dependencies?: string[];
}

export function simulateMaximisePublication(
  publicationId: string,
  publicationTitle: string,
  approvedProducts: Array<{ sku: string; name: string; missingFormats: string[]; missingAssets: string[] }>,
  opportunities: Pick<ProductOpportunity, 'title' | 'proposedSku' | 'opportunityType' | 'backlogStatus' | 'rsaUnlockPts' | 'editorialEffort'>[],
  localisationOpportunities: Array<{ language: string; rsaUnlockPts: number }>
): MaximisePublicationPlan {

  const jobs: MaximiseJobStep[] = [];
  let step = 1;
  let totalRsa = 0;
  let humanGates = 0;

  // Step 1: Reflowable EPUB3 for complete manual (highest RSA unlock)
  jobs.push({
    step: step++, label: 'Create Reflowable EPUB3 — How to Trade',
    jobType: 'GENERATE_FORMAT', productSku: 'DD-HTT-001', formatType: 'REFLOWABLE_EPUB3',
    surfaceUnlockPts: 6.2, effort: 'MEDIUM',
    requiresHumanApproval: true, humanApprovalReason: 'Visual QA required — complex PDF conversion needs quality review before commercial publication',
    status: 'REQUIRES_HUMAN',
  });
  totalRsa += 6.2; humanGates++;

  // Step 2: Premium sample for manual
  jobs.push({
    step: step++, label: 'Generate Premium Sample PDF — How to Trade',
    jobType: 'BUILD_SAMPLE', productSku: 'DD-HTT-001',
    surfaceUnlockPts: 0.8, effort: 'LOW',
    requiresHumanApproval: false, status: 'READY',
  });
  totalRsa += 0.8;

  // Step 3: 90-Day Programme workbook
  jobs.push({
    step: step++, label: '90-Day Trader Programme — Workbook PDF',
    jobType: 'GENERATE_FORMAT', productSku: 'DD-HTT-90D-001', formatType: 'WORKBOOK_PDF',
    surfaceUnlockPts: 4.1, effort: 'HIGH',
    requiresHumanApproval: true, humanApprovalReason: 'EXPAND-type product — editorial expansion of weekly objectives required before manufacturing proceeds',
    status: 'REQUIRES_HUMAN',
    dependencies: ['Editorial approval of expanded programme content'],
  });
  totalRsa += 4.1; humanGates++;

  // Step 4: Missing Etsy gallery asset
  jobs.push({
    step: step++, label: 'Generate Etsy Gallery 3 — How to Trade',
    jobType: 'GENERATE_ASSET', productSku: 'DD-HTT-001',
    surfaceUnlockPts: 1.2, effort: 'LOW',
    requiresHumanApproval: false, status: 'READY',
  });
  totalRsa += 1.2;

  // Step 5: German edition
  jobs.push({
    step: step++, label: 'German Edition — How to Trade',
    jobType: 'LOCALISE', productSku: 'DD-HTT-001',
    surfaceUnlockPts: 3.8, effort: 'HIGH',
    requiresHumanApproval: true, humanApprovalReason: 'Translation requires human QA — legal and regulatory language must be reviewed before German publication',
    status: 'REQUIRES_HUMAN',
    dependencies: ['Translation assignment', 'German compliance review'],
  });
  totalRsa += 3.8; humanGates++;

  // Step 6: Workbook metadata for Hotmart
  jobs.push({
    step: step++, label: 'Hotmart Category Mapping — Workbook',
    jobType: 'GENERATE_METADATA', productSku: 'DD-HTT-WB-001',
    surfaceUnlockPts: 0.6, effort: 'LOW',
    requiresHumanApproval: false, status: 'READY',
  });
  totalRsa += 0.6;

  const highEffortCount = jobs.filter(j => j.effort === 'HIGH').length;
  const estimatedEffort: 'LOW' | 'MEDIUM' | 'HIGH' = highEffortCount >= 2 ? 'HIGH' : 'MEDIUM';

  return {
    publicationId,
    publicationTitle,
    simulatedJobs: jobs,
    totalSurfaceUnlock: Math.round(totalRsa * 10) / 10,
    totalWeightedRsaGain: Math.round(totalRsa * 10) / 10,
    humanGatesRequired: humanGates,
    estimatedTotalEffort: estimatedEffort,
    blockedJobs: [],
    note: 'This is a simulation. No manufacturing has been initiated. Human approval is required before any consequential action executes.',
  };
}

// ─── IP YIELD SCORE ───────────────────────────────────────────────────────────

/**
 * Calculate IP Yield score — how effectively source IP has been commercially utilised.
 * This is NOT simply "number of products created."
 * It rewards diverse formats, live surfaces and revenue-generating coverage.
 */
export function calculateIPYieldScore(metrics: {
  approvedProducts: number;
  approvedFormats: number;
  languages: number;
  liveCommercialSurfaces: number;
  revenueGeneratingSurfaces: number;
  totalPossibleSurfaces: number;
  derivativeContributionPct: number;
}): number {
  const {
    approvedProducts, approvedFormats, languages,
    liveCommercialSurfaces, revenueGeneratingSurfaces,
    totalPossibleSurfaces, derivativeContributionPct,
  } = metrics;

  // Surface exploitation ratio (most important — 40%)
  const surfaceRatio = totalPossibleSurfaces > 0
    ? (liveCommercialSurfaces / totalPossibleSurfaces) * 40
    : 0;

  // Revenue surface ratio (25%)
  const revenueRatio = liveCommercialSurfaces > 0
    ? (revenueGeneratingSurfaces / liveCommercialSurfaces) * 25
    : 0;

  // Format diversity (15%)
  const formatScore = Math.min(approvedFormats / 5, 1) * 15;

  // Product diversity (10%) — diminishing returns beyond 6 (no SKU proliferation reward)
  const productScore = Math.min(approvedProducts / 6, 1) * 10;

  // Language reach (10%) — diminishing returns beyond 4
  const languageScore = Math.min(languages / 4, 1) * 10;

  const raw = surfaceRatio + revenueRatio + formatScore + productScore + languageScore;
  return Math.min(100, Math.round(raw));
}
