/**
 * DRAWDOWN OS — PUBLICATION & PRODUCT FACTORY
 * Core type definitions for the IP manufacturing engine
 */

// ─── SOURCE ASSET TYPES ─────────────────────────────────────────────────────

export type SourceQualityState =
  | 'UPLOADED' | 'PROCESSING' | 'PARSED' | 'STRUCTURED'
  | 'REVIEW_REQUIRED' | 'APPROVED_SOURCE' | 'PARSE_WARNING' | 'FAILED';

export type ContentFidelity =
  | 'SOURCE_DERIVED' | 'AI_GENERATED' | 'EDITORIALLY_CREATED' | 'MARKETING_CONTENT';

export type ContentElementType =
  | 'TITLE' | 'SUBTITLE' | 'PARAGRAPH' | 'HEADING' | 'SUBHEADING'
  | 'TABLE' | 'FIGURE' | 'IMAGE' | 'DIAGRAM' | 'CALLOUT'
  | 'WARNING' | 'INSIGHT' | 'FRAMEWORK' | 'CHECKLIST' | 'WORKSHEET'
  | 'EXERCISE' | 'GLOSSARY_TERM' | 'REFERENCE' | 'DISCLAIMER'
  | 'COPYRIGHT' | 'BIOGRAPHY' | 'CTA' | 'PROGRAMME' | 'OTHER';

export interface SourcePublication {
  id: string;
  canonicalId: string;             // DD-HTT-001
  title: string;
  subtitle?: string;
  author: string;
  publisher: string;
  edition: string;
  language: string;
  copyrightYear: number;
  qualityState: SourceQualityState;
  pageCount: number;
  chapterCount: number;
  wordCountEstimate: number;
  checksumSha256?: string;
  r2Key?: string;
  parseWarnings: string[];
  ingestedAt: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface ContentElement {
  id: string;
  sourceAssetId: string;
  publicationId: string;
  elementType: ContentElementType;
  chapterNum?: number;
  chapterTitle?: string;
  sectionTitle?: string;
  heading?: string;
  pageStart?: number;
  pageEnd?: number;
  contentFidelity: ContentFidelity;
  textPreview: string;
  contentHash?: string;
  wordCount?: number;
  reuseEligibility: boolean;
  standalonePotential: number;      // 0–100
  commercialPotential: number;      // 0–100
  editorialWorkRequired: boolean;
  complianceSensitivity: number;    // 0–100
}

// ─── IP GRAPH TYPES ─────────────────────────────────────────────────────────

export type IPNodeType =
  | 'PUBLICATION' | 'CHAPTER' | 'SECTION' | 'FIGURE' | 'TABLE'
  | 'WORKSHEET' | 'CHECKLIST' | 'REFERENCE' | 'GLOSSARY'
  | 'FRAMEWORK' | 'PRODUCT' | 'DERIVATIVE' | 'FORMAT'
  | 'EDITION' | 'BUNDLE' | 'LANGUAGE' | 'MARKETPLACE_PACKAGE';

export type IPEdgeType =
  | 'CONTAINS' | 'DERIVED_FROM' | 'PART_OF' | 'REFERENCES'
  | 'USED_IN' | 'TRANSLATED_FROM' | 'BUNDLED_WITH' | 'VERSION_OF';

export type IPAssetClass =
  | 'CORE_EDUCATION' | 'REFERENCE' | 'FRAMEWORK' | 'PROCESS'
  | 'WORKSHEET' | 'CHECKLIST' | 'TEMPLATE' | 'TOOLKIT'
  | 'VISUAL_EXPLANATION' | 'GLOSSARY' | 'PROGRAMME' | 'ASSESSMENT';

export interface IPGraphNode {
  id: string;
  publicationId: string;
  nodeType: IPNodeType;
  label: string;
  sourceChunkId?: string;
  ipClass?: IPAssetClass;
  standalonePotential: number;      // 0–100
  commercialPotential: number;      // 0–100
  rsaUnlockPts?: number;
  depth: number;                    // hierarchy level
  children?: IPGraphNode[];
}

export interface IPGraphEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  relationshipType: IPEdgeType;
  weight: number;
}

export interface IPGraph {
  publicationId: string;
  nodes: IPGraphNode[];
  edges: IPGraphEdge[];
  totalNodes: number;
  totalEdges: number;
  generatedAt: string;
}

// ─── PRODUCT OPPORTUNITY TYPES ───────────────────────────────────────────────

export type ProductOpportunityType =
  | 'EXTRACTABLE' | 'REPACKAGE' | 'EXPAND' | 'NEW_PRODUCT'
  | 'BUNDLE' | 'FORMAT' | 'LANGUAGE' | 'PROGRAMME';

export type OpportunityBacklogStatus =
  | 'NEW' | 'REVIEWING' | 'BACKLOG' | 'APPROVED'
  | 'REJECTED' | 'DEFERRED' | 'IN_FACTORY';

export type CustomerJob =
  | 'LEARN' | 'REFERENCE' | 'PLAN' | 'TRACK'
  | 'PRACTISE' | 'ASSESS' | 'IMPLEMENT' | 'REVIEW';

export interface ProductOpportunity {
  id: string;
  familyId: string;
  publicationId: string;
  proposedSku: string;
  title: string;
  subtitle?: string;
  opportunityType: ProductOpportunityType;
  backlogStatus: OpportunityBacklogStatus;
  customerJob: CustomerJob;
  targetAudience: string;
  learningLevel: string;
  sourceCoveragePct: number;        // 0–100 — How much source covers this product
  distinctivenessScore: number;     // 0–100 — Commercial distinctiveness
  rsaUnlockPts: number;             // Additional RSA points if manufactured
  editorialEffort: 'LOW' | 'MEDIUM' | 'HIGH';
  designEffort: 'LOW' | 'MEDIUM' | 'HIGH';
  complianceRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  whyStandalone: string;
  rejectionReason?: string;
  proposedFormats: string[];
  potentialMarketplaces: string[];
  sourceElements: string[];         // IDs of relevant content elements
  cannibalisation: CannibalasationProfile;
  createdAt: string;
}

export interface CannibalasationProfile {
  contentOverlap: number;           // 0–100
  audienceOverlap: number;
  priceOverlap: number;
  channelOverlap: number;
  relationship: 'COMPLEMENTARY' | 'BUNDLE_CANDIDATE' | 'UPSELL' | 'DOWNSELL' | 'SUBSTITUTE' | 'HIGH_OVERLAP';
}

// ─── PRODUCT SPECIFICATION ───────────────────────────────────────────────────

export type ProductReleaseStatus =
  | 'IDEA' | 'OPPORTUNITY' | 'APPROVED_FOR_DEVELOPMENT' | 'IN_FACTORY'
  | 'QA' | 'READY' | 'APPROVED_FOR_SALE' | 'LIVE' | 'PAUSED' | 'RETIRED' | 'ARCHIVED';

export interface ProductSpecification {
  id: string;
  opportunityId: string;
  familyId: string;
  publicationId: string;
  productSku: string;               // DD-HTT-WB-001
  canonicalName: string;
  subtitle?: string;
  productType: string;
  customerJob: CustomerJob;
  targetAudience: string;
  learningLevel: string;
  language: string;
  territories: string[];
  complianceClass: string;
  releaseStatus: ProductReleaseStatus;
  sourceElements: string[];
  editorialRequirements?: string;
  formatRequirements: FormatType[];
  assetRequirements: AssetType[];
  marketplaceTargets: string[];
  priceStrategy: string;
  sourceCoveragePct: number;
  productVersion: string;
  contentApprovedAt?: string;
  commercialApprovedAt?: string;
  approvedBy?: string;
  createdAt: string;
}

// ─── DIGITAL PRODUCT BOM ─────────────────────────────────────────────────────

export type FormatType =
  | 'PREMIUM_PDF' | 'COMPRESSED_PDF' | 'PRINTABLE_PDF' | 'SAMPLE_PDF'
  | 'WORKBOOK_PDF' | 'REFLOWABLE_EPUB3' | 'FIXED_LAYOUT_EPUB'
  | 'KINDLE_PACKAGE' | 'PRINT_INTERIOR' | 'PRINT_COVER'
  | 'AUDIO_SOURCE' | 'COURSE_SOURCE' | 'MARKDOWN_SOURCE' | 'HTML_SOURCE';

export type FormatStatus =
  | 'NOT_REQUIRED' | 'REQUIRED' | 'QUEUED' | 'GENERATING'
  | 'VALIDATING' | 'NEEDS_QA' | 'APPROVED' | 'FAILED' | 'SUPERSEDED';

export type AssetType =
  | 'COVER' | 'THUMBNAIL' | 'HERO' | 'PAGE_PREVIEW' | 'MOCKUP'
  | 'GALLERY_IMAGE' | 'SOCIAL_IMAGE' | 'BANNER' | 'AFFILIATE_CREATIVE'
  | 'SAMPLE_IMAGE' | 'FAMILY_GRAPHIC';

export interface BOMFormatItem {
  formatType: FormatType;
  status: FormatStatus;
  blocking: boolean;
  r2Key?: string;
  fileSizeBytes?: number;
  pageCount?: number;
  validatedAt?: string;
  qaStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface BOMAssetItem {
  assetType: AssetType;
  label: string;
  status: 'REQUIRED' | 'OPTIONAL' | 'READY' | 'MISSING' | 'NA';
  blocking: boolean;
  marketplaceTargets: string[];
  r2Key?: string;
}

export interface BOMMetadataItem {
  field: string;
  status: 'COMPLETE' | 'MISSING' | 'DRAFT';
  source: 'CANONICAL' | 'CHANNEL_OVERRIDE';
  blocking: boolean;
}

export interface MarketplacePackageSummary {
  marketplaceId: string;
  marketplaceName: string;
  status: 'INCOMPLETE' | 'READY' | 'APPROVED' | 'PUBLISHED' | 'STALE';
  missingItems: string[];
}

export interface ProductBOM {
  productSku: string;
  productName: string;
  readinessScorePct: number;
  contentPct: number;
  formatPct: number;
  assetsPct: number;
  metadataPct: number;
  compliancePct: number;
  marketRequirementsPct: number;
  blockingItems: string[];
  formats: BOMFormatItem[];
  assets: BOMAssetItem[];
  metadata: BOMMetadataItem[];
  marketplacePackages: MarketplacePackageSummary[];
  updatedAt: string;
}

// ─── FACTORY JOB TYPES ───────────────────────────────────────────────────────

export type FactoryJobType =
  | 'PARSE_SOURCE' | 'GENERATE_CONTENT_MAP' | 'ANALYSE_IP' | 'PROPOSE_PRODUCTS'
  | 'GENERATE_FORMAT' | 'VALIDATE_FORMAT' | 'GENERATE_ASSET' | 'GENERATE_METADATA'
  | 'BUILD_SAMPLE' | 'BUILD_MARKETPLACE_PACKAGE' | 'LOCALISE'
  | 'CHECK_COMPLIANCE' | 'RUN_QA' | 'CALCULATE_READINESS';

export type FactoryJobStatus =
  | 'QUEUED' | 'RUNNING' | 'WAITING_HUMAN' | 'COMPLETE' | 'FAILED' | 'CANCELLED';

export interface FactoryJob {
  id: string;
  jobType: FactoryJobType;
  status: FactoryJobStatus;
  publicationId?: string;
  productSku?: string;
  entityType?: string;
  entityId?: string;
  priority: number;
  progressPct: number;
  progressStage?: string;
  errorMessage?: string;
  surfaceUnlockPts?: number;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

// ─── MARKETPLACE PACKAGE ─────────────────────────────────────────────────────

export type PackageStatus = 'INCOMPLETE' | 'READY' | 'APPROVED' | 'PUBLISHED' | 'STALE';

export interface MarketplacePackage {
  id: string;
  productSku: string;
  productName: string;
  marketplaceId: string;
  marketplaceName: string;
  packageStatus: PackageStatus;
  formatR2Key?: string;
  coverR2Key?: string;
  title?: string;
  description?: string;
  keywords: string[];
  categories: string[];
  price?: number;
  currency: string;
  identifier?: string;
  sampleR2Key?: string;
  disclaimerIncluded: boolean;
  packageVersion: string;
  approvedAt?: string;
  publishedAt?: string;
  staleSince?: string;
  previousVersion?: Partial<MarketplacePackage>;
  createdAt: string;
  updatedAt: string;
}

// ─── QA TYPES ────────────────────────────────────────────────────────────────

export type QAType =
  | 'SOURCE_QA' | 'EPUB_QA' | 'VISUAL_QA' | 'PRODUCT_QA'
  | 'TRANSLATION_QA' | 'COMPLIANCE_QA' | 'MARKETPLACE_PACKAGE_QA';

export type QAStatus = 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'ANNOTATED' | 'REGENERATE';

export interface QAReview {
  id: string;
  entityType: string;
  entityId: string;
  entityLabel: string;
  qaType: QAType;
  status: QAStatus;
  reviewer?: string;
  reviewerNotes?: string;
  reviewedAt?: string;
  createdAt: string;
}

// ─── IP YIELD METRICS ────────────────────────────────────────────────────────

export interface IPYieldMetrics {
  publicationId: string;
  publicationTitle: string;
  masterPublications: number;
  approvedProducts: number;
  approvedFormats: number;
  languages: number;
  liveCommercialSurfaces: number;
  additionalUnlockableSurfaces: number;
  revenueGeneratingSurfaces: number;
  marketplacePackages: number;
  derivativeContributionPct: number;   // % of family revenue from derivatives
  ipYieldScore: number;                // Composite 0–100 score
  nextUnlock: NextFactoryJobRecommendation;
}

export interface NextFactoryJobRecommendation {
  label: string;
  jobType: FactoryJobType;
  productSku?: string;
  formatType?: FormatType;
  surfaceUnlockPts: number;
  effort: 'LOW' | 'MEDIUM' | 'HIGH';
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
}

// ─── PRODUCT FAMILY ──────────────────────────────────────────────────────────

export interface ProductFamily {
  id: string;
  parentPublicationId: string;
  canonicalId: string;
  familyName: string;
  description: string;
  products: ProductFamilyMember[];
  totalRevenue?: number;
  currency: string;
}

export interface ProductFamilyMember {
  productSku: string;
  name: string;
  releaseStatus: ProductReleaseStatus;
  customerJob: CustomerJob;
  opportunityType: ProductOpportunityType;
  liveMarketplaces: number;
  approvedFormats: number;
  priceGBP?: number;
  rsaContribution: number;
}

// ─── PRODUCT LADDER ──────────────────────────────────────────────────────────

export type LadderTier = 'FREE' | 'ENTRY' | 'CORE' | 'FLAGSHIP' | 'BUNDLE';

export interface ProductLadderItem {
  tier: LadderTier;
  productSku: string;
  name: string;
  priceGBP?: number;
  releaseStatus: ProductReleaseStatus;
}

// ─── LOCALISATION ────────────────────────────────────────────────────────────

export type TranslationState = 'SOURCE' | 'TRANSLATED_DRAFT' | 'REVIEW' | 'APPROVED' | 'PUBLISHED';

export interface LocalisedEdition {
  id: string;
  parentProductSku: string;
  language: string;
  locale: string;
  state: TranslationState;
  translator?: string;
  translationNotes?: string;
  r2Key?: string;
  approvedAt?: string;
  createdAt: string;
}

export interface TranslationMemoryEntry {
  id: string;
  sourcePhrase: string;
  language: string;
  approvedTranslation: string;
  context: string;
  approvedBy: string;
}

// ─── RIGHTS & THIRD-PARTY ────────────────────────────────────────────────────

export type RightsState =
  | 'OWNED' | 'LICENSED' | 'FAIR_USE_REVIEW'
  | 'ATTRIBUTION_REQUIRED' | 'RESTRICTED' | 'UNKNOWN';

export interface RightsRecord {
  id: string;
  productSku: string;
  copyrightOwner: string;
  territories: string[];
  languageRights: string[];
  formatRights: string[];
  distributionRestrictions?: string;
  licensedMaterialNotes?: string;
  rightsState: RightsState;
}

// ─── SURFACE UNLOCK SIMULATION ───────────────────────────────────────────────

export interface SurfaceUnlockSimulation {
  jobLabel: string;
  jobType: FactoryJobType;
  currentSurfaces: number;
  newSurfaces: number;
  surfacesGained: number;
  weightedRsaGain: number;
  newEligibleMarketplaces: string[];
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
}
