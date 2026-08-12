/**
 * DRAWDOWN OS — PRODUCT FACTORY
 * Demo data for DD-HTT-001 — How to Trade
 * All content is from the real publication structure; metrics are realistic dev-mode estimates.
 */

import type {
  SourcePublication, ContentElement, IPGraph, IPGraphNode,
  ProductFamily, ProductOpportunity, ProductSpecification,
  ProductBOM, FactoryJob, QAReview, MarketplacePackage,
  IPYieldMetrics, NextFactoryJobRecommendation, ProductLadderItem,
  LocalisedEdition, TranslationMemoryEntry, SurfaceUnlockSimulation,
} from './types';

// ─── SOURCE PUBLICATION ──────────────────────────────────────────────────────

export const HOW_TO_TRADE: SourcePublication = {
  id: 'pub-dd-htt-001',
  canonicalId: 'DD-HTT-001',
  title: 'How to Trade',
  subtitle: 'A Complete Beginner\'s Guide to Understanding Financial Markets',
  author: 'Pete Currey',
  publisher: 'Drawdown Publishing',
  edition: 'First Edition',
  language: 'en',
  copyrightYear: 2024,
  qualityState: 'APPROVED_SOURCE',
  pageCount: 95,
  chapterCount: 19,
  wordCountEstimate: 48000,
  checksumSha256: 'a3f7b2e91c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9',
  r2Key: 'publications/DD-HTT-001/source/v1/how-to-trade-v1.pdf',
  parseWarnings: [],
  ingestedAt: '2024-03-15T09:00:00Z',
  approvedAt: '2024-03-15T11:30:00Z',
  approvedBy: 'Pete Currey',
};

// ─── CONTENT ELEMENTS (19 chapters + key sections) ───────────────────────────

export const CONTENT_ELEMENTS: ContentElement[] = [
  { id: 'ce-001', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'HEADING', chapterNum: 1, chapterTitle: 'What is Trading?', sectionTitle: 'Introduction', pageStart: 1, pageEnd: 5, contentFidelity: 'SOURCE_DERIVED', textPreview: 'An introduction to financial markets, what trading means and who actually participates in global markets...', wordCount: 1800, reuseEligibility: true, standalonePotential: 45, commercialPotential: 40, editorialWorkRequired: false, complianceSensitivity: 20 },
  { id: 'ce-002', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'HEADING', chapterNum: 2, chapterTitle: 'Market Fundamentals', sectionTitle: 'Supply, Demand & Price', pageStart: 6, pageEnd: 12, contentFidelity: 'SOURCE_DERIVED', textPreview: 'How supply and demand determines asset prices, the role of buyers and sellers in price discovery...', wordCount: 2200, reuseEligibility: true, standalonePotential: 50, commercialPotential: 55, editorialWorkRequired: false, complianceSensitivity: 15 },
  { id: 'ce-003', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'HEADING', chapterNum: 3, chapterTitle: 'Charts & Candlesticks', sectionTitle: 'Reading Price Action', pageStart: 13, pageEnd: 20, contentFidelity: 'SOURCE_DERIVED', textPreview: 'Understanding price charts, candlestick anatomy, time frames and what price action reveals about market sentiment...', wordCount: 2800, reuseEligibility: true, standalonePotential: 70, commercialPotential: 75, editorialWorkRequired: false, complianceSensitivity: 10 },
  { id: 'ce-004', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'HEADING', chapterNum: 4, chapterTitle: 'Market Structure', sectionTitle: 'Trends, Ranges & Key Levels', pageStart: 21, pageEnd: 28, contentFidelity: 'SOURCE_DERIVED', textPreview: 'How markets move in trends and ranges, identifying key support and resistance levels, market structure shifts...', wordCount: 2600, reuseEligibility: true, standalonePotential: 65, commercialPotential: 70, editorialWorkRequired: false, complianceSensitivity: 10 },
  { id: 'ce-005', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'HEADING', chapterNum: 5, chapterTitle: 'Technical Indicators', sectionTitle: 'Tools for Market Analysis', pageStart: 29, pageEnd: 36, contentFidelity: 'SOURCE_DERIVED', textPreview: 'How technical indicators work, what they measure, common indicators and how to use them without over-complicating analysis...', wordCount: 2900, reuseEligibility: true, standalonePotential: 60, commercialPotential: 65, editorialWorkRequired: false, complianceSensitivity: 15 },
  { id: 'ce-006', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'HEADING', chapterNum: 6, chapterTitle: 'Timeframes', sectionTitle: 'Multi-Timeframe Trading', pageStart: 37, pageEnd: 41, contentFidelity: 'SOURCE_DERIVED', textPreview: 'How different timeframes reveal different market information, which timeframes suit different trading styles...', wordCount: 1600, reuseEligibility: true, standalonePotential: 40, commercialPotential: 35, editorialWorkRequired: false, complianceSensitivity: 10 },
  { id: 'ce-007', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'HEADING', chapterNum: 7, chapterTitle: 'Market-Moving Events', sectionTitle: 'Fundamental Catalysts', pageStart: 42, pageEnd: 46, contentFidelity: 'SOURCE_DERIVED', textPreview: 'Economic data releases, central bank decisions, geopolitical events and how they move financial markets...', wordCount: 1800, reuseEligibility: true, standalonePotential: 45, commercialPotential: 40, editorialWorkRequired: false, complianceSensitivity: 20 },
  { id: 'ce-008', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'HEADING', chapterNum: 8, chapterTitle: 'Orders & Execution', sectionTitle: 'How to Enter & Exit Trades', pageStart: 47, pageEnd: 52, contentFidelity: 'SOURCE_DERIVED', textPreview: 'Market orders, limit orders, stop orders, how orders are filled, slippage and execution quality...', wordCount: 1900, reuseEligibility: true, standalonePotential: 55, commercialPotential: 50, editorialWorkRequired: false, complianceSensitivity: 15 },
  { id: 'ce-009', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'HEADING', chapterNum: 9, chapterTitle: 'Risk Management', sectionTitle: 'Protecting Your Capital', pageStart: 53, pageEnd: 60, contentFidelity: 'SOURCE_DERIVED', textPreview: 'The central role of risk management in trading survival, stop losses, risk per trade, drawdown management...', wordCount: 3100, reuseEligibility: true, standalonePotential: 90, commercialPotential: 92, editorialWorkRequired: false, complianceSensitivity: 30 },
  { id: 'ce-010', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'HEADING', chapterNum: 10, chapterTitle: 'Position Sizing', sectionTitle: 'Calculating Your Trade Size', pageStart: 61, pageEnd: 66, contentFidelity: 'SOURCE_DERIVED', textPreview: 'How to calculate position size based on account balance and risk tolerance, position sizing formulas and reference tables...', wordCount: 2400, reuseEligibility: true, standalonePotential: 88, commercialPotential: 90, editorialWorkRequired: false, complianceSensitivity: 25 },
  { id: 'ce-011', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'TABLE', chapterNum: 10, chapterTitle: 'Position Sizing', sectionTitle: 'Position Sizing Reference Table', pageStart: 63, pageEnd: 65, contentFidelity: 'SOURCE_DERIVED', textPreview: 'Position sizing lookup table: account balance × risk % → position size in lots/units across multiple instruments...', wordCount: 200, reuseEligibility: true, standalonePotential: 95, commercialPotential: 88, editorialWorkRequired: false, complianceSensitivity: 20 },
  { id: 'ce-012', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'HEADING', chapterNum: 11, chapterTitle: 'Strategy', sectionTitle: 'Building a Trading Strategy', pageStart: 67, pageEnd: 72, contentFidelity: 'SOURCE_DERIVED', textPreview: 'What makes a trading strategy, entry rules, exit rules, filters, strategy testing and the difference between strategy and tactic...', wordCount: 2700, reuseEligibility: true, standalonePotential: 75, commercialPotential: 80, editorialWorkRequired: false, complianceSensitivity: 20 },
  { id: 'ce-013', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'WORKSHEET', chapterNum: 12, chapterTitle: 'Trading Plan', sectionTitle: 'Trading Plan Worksheet', pageStart: 73, pageEnd: 76, contentFidelity: 'SOURCE_DERIVED', textPreview: 'Structured trading plan template covering market, timeframe, setup criteria, risk rules, session rules and self-assessment...', wordCount: 800, reuseEligibility: true, standalonePotential: 95, commercialPotential: 95, editorialWorkRequired: false, complianceSensitivity: 20 },
  { id: 'ce-014', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'HEADING', chapterNum: 13, chapterTitle: 'Trading Psychology', sectionTitle: 'The Mental Game', pageStart: 77, pageEnd: 81, contentFidelity: 'SOURCE_DERIVED', textPreview: 'The psychological challenges of trading, emotional discipline, fear and greed, consistency and decision-making under uncertainty...', wordCount: 2200, reuseEligibility: true, standalonePotential: 70, commercialPotential: 72, editorialWorkRequired: false, complianceSensitivity: 15 },
  { id: 'ce-015', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'WORKSHEET', chapterNum: 14, chapterTitle: 'Trading Journal', sectionTitle: 'Daily Journal Template', pageStart: 82, pageEnd: 84, contentFidelity: 'SOURCE_DERIVED', textPreview: 'Daily trading journal template: date, market, setup, plan, risk, entry, exit, result, process review, notes...', wordCount: 600, reuseEligibility: true, standalonePotential: 92, commercialPotential: 90, editorialWorkRequired: false, complianceSensitivity: 10 },
  { id: 'ce-016', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'HEADING', chapterNum: 15, chapterTitle: 'Demo to Live', sectionTitle: 'The Transition Protocol', pageStart: 85, pageEnd: 88, contentFidelity: 'SOURCE_DERIVED', textPreview: 'How to use a demo account effectively, benchmarks before going live, the psychological shift from paper to real capital...', wordCount: 1600, reuseEligibility: true, standalonePotential: 60, commercialPotential: 55, editorialWorkRequired: false, complianceSensitivity: 25 },
  { id: 'ce-017', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'PROGRAMME', chapterNum: 16, chapterTitle: '90-Day Development Programme', sectionTitle: 'Structured Learning Path', pageStart: 89, pageEnd: 92, contentFidelity: 'SOURCE_DERIVED', textPreview: '13-week structured trading education programme: weekly objectives, reading assignments, practice exercises, review checkpoints...', wordCount: 2800, reuseEligibility: true, standalonePotential: 97, commercialPotential: 96, editorialWorkRequired: true, complianceSensitivity: 20 },
  { id: 'ce-018', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'CHECKLIST', chapterNum: 17, chapterTitle: 'Pre-Trade Checklist', sectionTitle: 'Trade Preparation Protocol', pageStart: 93, pageEnd: 93, contentFidelity: 'SOURCE_DERIVED', textPreview: 'Step-by-step pre-trade checklist covering market conditions, setup confirmation, risk assessment, plan alignment...', wordCount: 400, reuseEligibility: true, standalonePotential: 94, commercialPotential: 88, editorialWorkRequired: false, complianceSensitivity: 15 },
  { id: 'ce-019', sourceAssetId: 'sa-001', publicationId: 'pub-dd-htt-001', elementType: 'GLOSSARY_TERM', chapterNum: 18, chapterTitle: 'Glossary & Visual Reference', sectionTitle: 'Trading Terminology', pageStart: 94, pageEnd: 95, contentFidelity: 'SOURCE_DERIVED', textPreview: 'Comprehensive trading glossary: 120+ terms covering markets, instruments, order types, analysis methods and industry terminology...', wordCount: 3200, reuseEligibility: true, standalonePotential: 80, commercialPotential: 75, editorialWorkRequired: false, complianceSensitivity: 10 },
];

// ─── IP GRAPH ─────────────────────────────────────────────────────────────────

export const IP_GRAPH: IPGraph = {
  publicationId: 'pub-dd-htt-001',
  totalNodes: 34,
  totalEdges: 42,
  generatedAt: '2024-03-15T12:00:00Z',
  edges: [
    { id: 'e-001', sourceNodeId: 'n-pub', targetNodeId: 'n-ch9', relationshipType: 'CONTAINS', weight: 1 },
    { id: 'e-002', sourceNodeId: 'n-pub', targetNodeId: 'n-ch10', relationshipType: 'CONTAINS', weight: 1 },
    { id: 'e-003', sourceNodeId: 'n-pub', targetNodeId: 'n-ch17', relationshipType: 'CONTAINS', weight: 1 },
    { id: 'e-004', sourceNodeId: 'n-ch9', targetNodeId: 'n-risk-wb', relationshipType: 'USED_IN', weight: 0.9 },
    { id: 'e-005', sourceNodeId: 'n-ch10', targetNodeId: 'n-pos-ref', relationshipType: 'USED_IN', weight: 0.95 },
    { id: 'e-006', sourceNodeId: 'n-ch13', targetNodeId: 'n-plan-wb', relationshipType: 'USED_IN', weight: 0.85 },
    { id: 'e-007', sourceNodeId: 'n-ch15', targetNodeId: 'n-journal', relationshipType: 'USED_IN', weight: 0.9 },
    { id: 'e-008', sourceNodeId: 'n-ch17', targetNodeId: 'n-90d', relationshipType: 'DERIVED_FROM', weight: 0.92 },
    { id: 'e-009', sourceNodeId: 'n-checklist', targetNodeId: 'n-ptc', relationshipType: 'USED_IN', weight: 0.95 },
    { id: 'e-010', sourceNodeId: 'n-pub', targetNodeId: 'n-bundle', relationshipType: 'BUNDLED_WITH', weight: 0.7 },
  ],
  nodes: [
    { id: 'n-pub', publicationId: 'pub-dd-htt-001', nodeType: 'PUBLICATION', label: 'How to Trade', depth: 0, standalonePotential: 100, commercialPotential: 100, children: [
      { id: 'n-ch9', publicationId: 'pub-dd-htt-001', nodeType: 'CHAPTER', label: 'Ch.9 — Risk Management', depth: 1, ipClass: 'CORE_EDUCATION', standalonePotential: 90, commercialPotential: 92 },
      { id: 'n-ch10', publicationId: 'pub-dd-htt-001', nodeType: 'CHAPTER', label: 'Ch.10 — Position Sizing', depth: 1, ipClass: 'REFERENCE', standalonePotential: 88, commercialPotential: 90 },
      { id: 'n-ch13', publicationId: 'pub-dd-htt-001', nodeType: 'CHAPTER', label: 'Ch.12 — Trading Plan', depth: 1, ipClass: 'WORKSHEET', standalonePotential: 95, commercialPotential: 95 },
      { id: 'n-ch15', publicationId: 'pub-dd-htt-001', nodeType: 'CHAPTER', label: 'Ch.14 — Trading Journal', depth: 1, ipClass: 'TEMPLATE', standalonePotential: 92, commercialPotential: 90 },
      { id: 'n-ch17', publicationId: 'pub-dd-htt-001', nodeType: 'CHAPTER', label: 'Ch.16 — 90-Day Programme', depth: 1, ipClass: 'PROGRAMME', standalonePotential: 97, commercialPotential: 96 },
      { id: 'n-checklist', publicationId: 'pub-dd-htt-001', nodeType: 'CHECKLIST', label: 'Pre-Trade Checklist', depth: 1, ipClass: 'CHECKLIST', standalonePotential: 94, commercialPotential: 88 },
      { id: 'n-glossary', publicationId: 'pub-dd-htt-001', nodeType: 'GLOSSARY', label: 'Trading Glossary (120+ terms)', depth: 1, ipClass: 'REFERENCE', standalonePotential: 80, commercialPotential: 75 },
      { id: 'n-risk-wb', publicationId: 'pub-dd-htt-001', nodeType: 'DERIVATIVE', label: 'Risk Mgmt Workbook', depth: 2, standalonePotential: 88, commercialPotential: 85 },
      { id: 'n-pos-ref', publicationId: 'pub-dd-htt-001', nodeType: 'DERIVATIVE', label: 'Position Sizing Reference', depth: 2, standalonePotential: 85, commercialPotential: 82 },
      { id: 'n-plan-wb', publicationId: 'pub-dd-htt-001', nodeType: 'DERIVATIVE', label: 'Trading Plan Workbook', depth: 2, standalonePotential: 92, commercialPotential: 90 },
      { id: 'n-journal', publicationId: 'pub-dd-htt-001', nodeType: 'DERIVATIVE', label: 'Trading Journal', depth: 2, standalonePotential: 90, commercialPotential: 88 },
      { id: 'n-90d', publicationId: 'pub-dd-htt-001', nodeType: 'DERIVATIVE', label: '90-Day Trader Programme', depth: 2, standalonePotential: 95, commercialPotential: 93 },
      { id: 'n-ptc', publicationId: 'pub-dd-htt-001', nodeType: 'DERIVATIVE', label: 'Pre-Trade Checklist Pack', depth: 2, standalonePotential: 88, commercialPotential: 82 },
      { id: 'n-bundle', publicationId: 'pub-dd-htt-001', nodeType: 'BUNDLE', label: 'Beginner Trading Library Bundle', depth: 2, standalonePotential: 95, commercialPotential: 95 },
    ]},
  ],
};

// ─── PRODUCT FAMILY ───────────────────────────────────────────────────────────

export const HOW_TO_TRADE_FAMILY: ProductFamily = {
  id: 'fam-htt-001',
  parentPublicationId: 'pub-dd-htt-001',
  canonicalId: 'HTT-FAMILY',
  familyName: 'How to Trade',
  description: 'Complete beginner trading education family derived from DD-HTT-001',
  currency: 'GBP',
  products: [
    { productSku: 'DD-HTT-001', name: 'How to Trade — Complete Manual', releaseStatus: 'LIVE', customerJob: 'LEARN', opportunityType: 'EXTRACTABLE', liveMarketplaces: 8, approvedFormats: 3, priceGBP: 19.99, rsaContribution: 22.4 },
    { productSku: 'DD-HTT-WB-001', name: 'How to Trade — Workbook', releaseStatus: 'APPROVED_FOR_SALE', customerJob: 'PRACTISE', opportunityType: 'EXTRACTABLE', liveMarketplaces: 5, approvedFormats: 2, priceGBP: 12.99, rsaContribution: 8.1 },
    { productSku: 'DD-HTT-90D-001', name: 'The First 90 Days Programme', releaseStatus: 'IN_FACTORY', customerJob: 'IMPLEMENT', opportunityType: 'EXPAND', liveMarketplaces: 0, approvedFormats: 1, priceGBP: 24.99, rsaContribution: 0 },
    { productSku: 'DD-PLAN-WB-001', name: 'Trading Plan Workbook', releaseStatus: 'READY', customerJob: 'PLAN', opportunityType: 'EXTRACTABLE', liveMarketplaces: 3, approvedFormats: 2, priceGBP: 9.99, rsaContribution: 4.2 },
    { productSku: 'DD-JRN-001', name: 'Trading Journal', releaseStatus: 'APPROVED_FOR_SALE', customerJob: 'TRACK', opportunityType: 'EXTRACTABLE', liveMarketplaces: 4, approvedFormats: 2, priceGBP: 8.99, rsaContribution: 3.8 },
    { productSku: 'DD-PTC-001', name: 'Pre-Trade Checklist Pack', releaseStatus: 'OPPORTUNITY', customerJob: 'REFERENCE', opportunityType: 'EXTRACTABLE', liveMarketplaces: 0, approvedFormats: 0, rsaContribution: 0 },
  ],
};

// ─── PRODUCT OPPORTUNITIES ────────────────────────────────────────────────────

export const PRODUCT_OPPORTUNITIES: ProductOpportunity[] = [
  {
    id: 'opp-001', familyId: 'fam-htt-001', publicationId: 'pub-dd-htt-001',
    proposedSku: 'DD-HTT-WB-001', title: 'How to Trade — Workbook',
    subtitle: 'Practice & Reflection Companion',
    opportunityType: 'EXTRACTABLE', backlogStatus: 'APPROVED', customerJob: 'PRACTISE',
    targetAudience: 'Beginner traders working through the main manual',
    learningLevel: 'Beginner', sourceCoveragePct: 87, distinctivenessScore: 82,
    rsaUnlockPts: 6.2, editorialEffort: 'MEDIUM', designEffort: 'MEDIUM',
    complianceRisk: 'LOW', confidence: 'HIGH',
    whyStandalone: 'Contains exercises, trackers and structured practice material that functions independently as a working companion',
    proposedFormats: ['WORKBOOK_PDF', 'PRINTABLE_PDF'], potentialMarketplaces: ['ch-etsy', 'ch-whop', 'ch-payhip', 'ch-gumroad', 'ch-lemonsqueezy'],
    sourceElements: ['ce-009', 'ce-013', 'ce-015', 'ce-017', 'ce-018'],
    cannibalisation: { contentOverlap: 60, audienceOverlap: 80, priceOverlap: 30, channelOverlap: 70, relationship: 'COMPLEMENTARY' },
    createdAt: '2024-03-20T10:00:00Z',
  },
  {
    id: 'opp-002', familyId: 'fam-htt-001', publicationId: 'pub-dd-htt-001',
    proposedSku: 'DD-HTT-90D-001', title: 'The First 90 Days — Trader Development Programme',
    subtitle: 'A Structured 13-Week Learning Path',
    opportunityType: 'EXPAND', backlogStatus: 'APPROVED', customerJob: 'IMPLEMENT',
    targetAudience: 'Beginners committed to structured development over 90 days',
    learningLevel: 'Beginner–Intermediate', sourceCoveragePct: 72, distinctivenessScore: 90,
    rsaUnlockPts: 4.1, editorialEffort: 'HIGH', designEffort: 'MEDIUM',
    complianceRisk: 'MEDIUM', confidence: 'MEDIUM',
    whyStandalone: 'Source chapter (Ch.16) provides 90-day framework skeleton. Product requires editorial expansion of weekly objectives, exercises and review templates.',
    rejectionReason: undefined, proposedFormats: ['WORKBOOK_PDF', 'PRINTABLE_PDF', 'COURSE_SOURCE'],
    potentialMarketplaces: ['ch-whop', 'ch-gumroad', 'ch-payhip', 'ch-hotmart'],
    sourceElements: ['ce-017', 'ce-013', 'ce-015'],
    cannibalisation: { contentOverlap: 40, audienceOverlap: 65, priceOverlap: 10, channelOverlap: 55, relationship: 'UPSELL' },
    createdAt: '2024-03-20T10:00:00Z',
  },
  {
    id: 'opp-003', familyId: 'fam-htt-001', publicationId: 'pub-dd-htt-001',
    proposedSku: 'DD-PLAN-WB-001', title: 'Trading Plan Workbook',
    subtitle: 'Build Your Personal Trading Framework',
    opportunityType: 'EXTRACTABLE', backlogStatus: 'APPROVED', customerJob: 'PLAN',
    targetAudience: 'Traders who need to structure their approach and rules',
    learningLevel: 'Beginner–Intermediate', sourceCoveragePct: 94, distinctivenessScore: 78,
    rsaUnlockPts: 3.8, editorialEffort: 'LOW', designEffort: 'LOW',
    complianceRisk: 'LOW', confidence: 'HIGH',
    whyStandalone: 'Ch.12 contains a complete trading plan template. With light workbook formatting this functions as an independent planning tool.',
    proposedFormats: ['WORKBOOK_PDF', 'PRINTABLE_PDF'],
    potentialMarketplaces: ['ch-etsy', 'ch-whop', 'ch-payhip', 'ch-gumroad'],
    sourceElements: ['ce-013', 'ce-012'],
    cannibalisation: { contentOverlap: 25, audienceOverlap: 70, priceOverlap: 40, channelOverlap: 75, relationship: 'COMPLEMENTARY' },
    createdAt: '2024-03-21T10:00:00Z',
  },
  {
    id: 'opp-004', familyId: 'fam-htt-001', publicationId: 'pub-dd-htt-001',
    proposedSku: 'DD-JRN-001', title: 'Trading Journal',
    subtitle: 'Daily Process & Performance Tracker',
    opportunityType: 'EXTRACTABLE', backlogStatus: 'APPROVED', customerJob: 'TRACK',
    targetAudience: 'Active traders building process discipline',
    learningLevel: 'All levels', sourceCoveragePct: 90, distinctivenessScore: 76,
    rsaUnlockPts: 3.2, editorialEffort: 'LOW', designEffort: 'LOW',
    complianceRisk: 'LOW', confidence: 'HIGH',
    whyStandalone: 'Ch.14 journal template is immediately usable as a standalone daily journal product with minimal reformatting.',
    proposedFormats: ['WORKBOOK_PDF', 'PRINTABLE_PDF'],
    potentialMarketplaces: ['ch-etsy', 'ch-whop', 'ch-payhip', 'ch-gumroad'],
    sourceElements: ['ce-015'],
    cannibalisation: { contentOverlap: 15, audienceOverlap: 65, priceOverlap: 45, channelOverlap: 75, relationship: 'COMPLEMENTARY' },
    createdAt: '2024-03-21T10:00:00Z',
  },
  {
    id: 'opp-005', familyId: 'fam-htt-001', publicationId: 'pub-dd-htt-001',
    proposedSku: 'DD-PTC-001', title: 'Pre-Trade Checklist Pack',
    subtitle: 'Trade Preparation & Risk Protocol',
    opportunityType: 'EXTRACTABLE', backlogStatus: 'REVIEWING', customerJob: 'REFERENCE',
    targetAudience: 'Active traders wanting a desk reference',
    learningLevel: 'All levels', sourceCoveragePct: 96, distinctivenessScore: 65,
    rsaUnlockPts: 2.1, editorialEffort: 'LOW', designEffort: 'LOW',
    complianceRisk: 'LOW', confidence: 'MEDIUM',
    whyStandalone: 'Single-page checklist from Ch.17 can stand alone as a printable desk reference but may have limited commercial appeal at standalone price point.',
    proposedFormats: ['PRINTABLE_PDF', 'COMPRESSED_PDF'],
    potentialMarketplaces: ['ch-etsy', 'ch-gumroad'],
    sourceElements: ['ce-018'],
    cannibalisation: { contentOverlap: 20, audienceOverlap: 80, priceOverlap: 60, channelOverlap: 80, relationship: 'DOWNSELL' },
    createdAt: '2024-04-01T10:00:00Z',
  },
  {
    id: 'opp-006', familyId: 'fam-htt-001', publicationId: 'pub-dd-htt-001',
    proposedSku: 'DD-SIG-001', title: 'Daily Trading Signals Pack',
    opportunityType: 'NEW_PRODUCT', backlogStatus: 'REJECTED', customerJob: 'IMPLEMENT',
    targetAudience: 'N/A', learningLevel: 'N/A', sourceCoveragePct: 0, distinctivenessScore: 0,
    rsaUnlockPts: 0, editorialEffort: 'HIGH', designEffort: 'LOW',
    complianceRisk: 'HIGH', confidence: 'LOW',
    whyStandalone: 'N/A',
    rejectionReason: 'Contrary to Drawdown publishing principles. Drawdown does not sell signals. Do not suggest again.',
    proposedFormats: [], potentialMarketplaces: [],
    sourceElements: [],
    cannibalisation: { contentOverlap: 0, audienceOverlap: 0, priceOverlap: 0, channelOverlap: 0, relationship: 'SUBSTITUTE' },
    createdAt: '2024-04-05T10:00:00Z',
  },
];

// ─── PRODUCT BOMs ─────────────────────────────────────────────────────────────

export const PRODUCT_BOMS: Record<string, ProductBOM> = {
  'DD-HTT-001': {
    productSku: 'DD-HTT-001', productName: 'How to Trade — Complete Manual',
    readinessScorePct: 96, contentPct: 100, formatPct: 100, assetsPct: 92,
    metadataPct: 100, compliancePct: 100, marketRequirementsPct: 88,
    blockingItems: ['Etsy gallery asset 3 missing'],
    formats: [
      { formatType: 'PREMIUM_PDF', status: 'APPROVED', blocking: true, pageCount: 95, fileSizeBytes: 4200000, validatedAt: '2024-04-10T09:00:00Z', qaStatus: 'APPROVED' },
      { formatType: 'COMPRESSED_PDF', status: 'APPROVED', blocking: false, pageCount: 95, fileSizeBytes: 1800000, validatedAt: '2024-04-10T09:30:00Z', qaStatus: 'APPROVED' },
      { formatType: 'SAMPLE_PDF', status: 'APPROVED', blocking: false, pageCount: 12, fileSizeBytes: 620000, validatedAt: '2024-04-10T10:00:00Z', qaStatus: 'APPROVED' },
      { formatType: 'REFLOWABLE_EPUB3', status: 'REQUIRED', blocking: false },
      { formatType: 'KINDLE_PACKAGE', status: 'NOT_REQUIRED', blocking: false },
    ],
    assets: [
      { assetType: 'COVER', label: 'Master Cover', status: 'READY', blocking: true, marketplaceTargets: [] },
      { assetType: 'THUMBNAIL', label: 'Cover Thumbnail', status: 'READY', blocking: false, marketplaceTargets: ['ch-whop', 'ch-etsy'] },
      { assetType: 'GALLERY_IMAGE', label: 'Etsy Gallery 1', status: 'READY', blocking: false, marketplaceTargets: ['ch-etsy'] },
      { assetType: 'GALLERY_IMAGE', label: 'Etsy Gallery 2', status: 'READY', blocking: false, marketplaceTargets: ['ch-etsy'] },
      { assetType: 'GALLERY_IMAGE', label: 'Etsy Gallery 3', status: 'MISSING', blocking: true, marketplaceTargets: ['ch-etsy'] },
    ],
    metadata: [
      { field: 'title', status: 'COMPLETE', source: 'CANONICAL', blocking: true },
      { field: 'description_long', status: 'COMPLETE', source: 'CANONICAL', blocking: true },
      { field: 'keywords', status: 'COMPLETE', source: 'CANONICAL', blocking: false },
      { field: 'categories', status: 'COMPLETE', source: 'CANONICAL', blocking: false },
      { field: 'disclaimer', status: 'COMPLETE', source: 'CANONICAL', blocking: true },
    ],
    marketplacePackages: [
      { marketplaceId: 'ch-whop', marketplaceName: 'Whop', status: 'PUBLISHED', missingItems: [] },
      { marketplaceId: 'ch-etsy', marketplaceName: 'Etsy', status: 'STALE', missingItems: ['Gallery 3', 'EPUB format'] },
      { marketplaceId: 'ch-gumroad', marketplaceName: 'Gumroad', status: 'PUBLISHED', missingItems: [] },
      { marketplaceId: 'ch-payhip', marketplaceName: 'Payhip', status: 'PUBLISHED', missingItems: [] },
    ],
    updatedAt: '2024-06-01T09:00:00Z',
  },
  'DD-HTT-WB-001': {
    productSku: 'DD-HTT-WB-001', productName: 'How to Trade — Workbook',
    readinessScorePct: 84, contentPct: 100, formatPct: 80, assetsPct: 75,
    metadataPct: 100, compliancePct: 100, marketRequirementsPct: 72,
    blockingItems: ['Hotmart category mapping required', 'Printable PDF needs QA approval'],
    formats: [
      { formatType: 'WORKBOOK_PDF', status: 'APPROVED', blocking: true, pageCount: 38, fileSizeBytes: 2100000, validatedAt: '2024-05-01T09:00:00Z', qaStatus: 'APPROVED' },
      { formatType: 'PRINTABLE_PDF', status: 'NEEDS_QA', blocking: true, pageCount: 38, fileSizeBytes: 1200000, qaStatus: 'PENDING' },
      { formatType: 'SAMPLE_PDF', status: 'QUEUED', blocking: false },
    ],
    assets: [
      { assetType: 'COVER', label: 'Workbook Cover', status: 'READY', blocking: true, marketplaceTargets: [] },
      { assetType: 'THUMBNAIL', label: 'Cover Thumbnail', status: 'READY', blocking: false, marketplaceTargets: [] },
      { assetType: 'GALLERY_IMAGE', label: 'Interior Preview', status: 'MISSING', blocking: false, marketplaceTargets: ['ch-etsy'] },
    ],
    metadata: [
      { field: 'title', status: 'COMPLETE', source: 'CANONICAL', blocking: true },
      { field: 'description_long', status: 'COMPLETE', source: 'CANONICAL', blocking: true },
      { field: 'categories_hotmart', status: 'MISSING', source: 'CHANNEL_OVERRIDE', blocking: true },
    ],
    marketplacePackages: [
      { marketplaceId: 'ch-whop', marketplaceName: 'Whop', status: 'APPROVED', missingItems: [] },
      { marketplaceId: 'ch-etsy', marketplaceName: 'Etsy', status: 'INCOMPLETE', missingItems: ['Interior preview image'] },
      { marketplaceId: 'ch-hotmart', marketplaceName: 'Hotmart', status: 'INCOMPLETE', missingItems: ['Category mapping', 'Printable PDF approval'] },
    ],
    updatedAt: '2024-06-01T09:00:00Z',
  },
};

// ─── FACTORY JOBS ─────────────────────────────────────────────────────────────

export const FACTORY_JOBS: FactoryJob[] = [
  { id: 'fj-001', jobType: 'PARSE_SOURCE', status: 'COMPLETE', publicationId: 'pub-dd-htt-001', priority: 100, progressPct: 100, progressStage: 'Parsed 19 chapters, 95 pages', startedAt: '2024-03-15T09:00:00Z', completedAt: '2024-03-15T09:04:32Z', createdAt: '2024-03-15T09:00:00Z' },
  { id: 'fj-002', jobType: 'GENERATE_CONTENT_MAP', status: 'COMPLETE', publicationId: 'pub-dd-htt-001', priority: 90, progressPct: 100, progressStage: 'Content map generated — 19 elements identified', startedAt: '2024-03-15T09:04:32Z', completedAt: '2024-03-15T09:06:10Z', createdAt: '2024-03-15T09:04:32Z' },
  { id: 'fj-003', jobType: 'ANALYSE_IP', status: 'COMPLETE', publicationId: 'pub-dd-htt-001', priority: 80, progressPct: 100, progressStage: 'IP graph built — 34 nodes, 42 edges', startedAt: '2024-03-15T09:06:10Z', completedAt: '2024-03-15T09:09:45Z', createdAt: '2024-03-15T09:06:10Z' },
  { id: 'fj-004', jobType: 'GENERATE_FORMAT', status: 'COMPLETE', publicationId: 'pub-dd-htt-001', productSku: 'DD-HTT-001', priority: 70, progressPct: 100, progressStage: 'Premium PDF approved', startedAt: '2024-04-08T10:00:00Z', completedAt: '2024-04-10T09:00:00Z', createdAt: '2024-04-08T10:00:00Z' },
  { id: 'fj-005', jobType: 'GENERATE_FORMAT', status: 'RUNNING', publicationId: 'pub-dd-htt-001', productSku: 'DD-HTT-001', priority: 60, progressPct: 34, progressStage: 'Converting PDF to reflowable EPUB3 — validating structure', surfaceUnlockPts: 6.2, startedAt: '2024-06-01T08:00:00Z', createdAt: '2024-06-01T08:00:00Z' },
  { id: 'fj-006', jobType: 'BUILD_SAMPLE', status: 'QUEUED', publicationId: 'pub-dd-htt-001', productSku: 'DD-HTT-WB-001', priority: 50, progressPct: 0, progressStage: 'Waiting for Printable PDF approval', createdAt: '2024-06-01T09:00:00Z' },
  { id: 'fj-007', jobType: 'RUN_QA', status: 'WAITING_HUMAN', publicationId: 'pub-dd-htt-001', productSku: 'DD-HTT-WB-001', priority: 75, progressPct: 80, progressStage: 'Printable PDF — awaiting visual QA approval', createdAt: '2024-06-01T09:00:00Z' },
  { id: 'fj-008', jobType: 'LOCALISE', status: 'QUEUED', publicationId: 'pub-dd-htt-001', productSku: 'DD-HTT-001', priority: 40, progressPct: 0, progressStage: 'German edition — awaiting translation assignment', surfaceUnlockPts: 3.8, createdAt: '2024-06-02T09:00:00Z' },
];

// ─── QA REVIEWS ──────────────────────────────────────────────────────────────

export const QA_REVIEWS: QAReview[] = [
  { id: 'qa-001', entityType: 'format', entityId: 'fmt-001', entityLabel: 'How to Trade — Printable PDF (v1)', qaType: 'VISUAL_QA', status: 'PENDING', createdAt: '2024-06-01T09:00:00Z' },
  { id: 'qa-002', entityType: 'format', entityId: 'fmt-002', entityLabel: 'Workbook — EPUB3 Draft (v1)', qaType: 'EPUB_QA', status: 'IN_REVIEW', reviewer: 'Pete Currey', reviewerNotes: 'Chapter nav links need checking on Kobo', createdAt: '2024-06-01T08:00:00Z' },
  { id: 'qa-003', entityType: 'package', entityId: 'pkg-001', entityLabel: 'How to Trade — Etsy Package v2', qaType: 'MARKETPLACE_PACKAGE_QA', status: 'PENDING', createdAt: '2024-06-01T10:00:00Z' },
  { id: 'qa-004', entityType: 'translation', entityId: 'loc-001', entityLabel: 'How to Trade — German Draft', qaType: 'TRANSLATION_QA', status: 'PENDING', createdAt: '2024-06-02T09:00:00Z' },
];

// ─── IP YIELD METRICS ─────────────────────────────────────────────────────────

export const IP_YIELD: IPYieldMetrics = {
  publicationId: 'pub-dd-htt-001',
  publicationTitle: 'How to Trade',
  masterPublications: 1,
  approvedProducts: 6,
  approvedFormats: 4,
  languages: 1,
  liveCommercialSurfaces: 26,
  additionalUnlockableSurfaces: 14,
  revenueGeneratingSurfaces: 18,
  marketplacePackages: 41,
  derivativeContributionPct: 38,
  ipYieldScore: 68,
  nextUnlock: {
    label: 'Reflowable EPUB3 — How to Trade',
    jobType: 'GENERATE_FORMAT',
    productSku: 'DD-HTT-001',
    formatType: 'REFLOWABLE_EPUB3',
    surfaceUnlockPts: 6.2,
    effort: 'MEDIUM',
    confidence: 'HIGH',
    description: 'Creates EPUB3 format, unlocking Amazon Kindle, Apple Books, Kobo, Google Play Books and library distribution routes.',
  },
};

// ─── RECOMMENDATIONS (NEXT FACTORY JOB) ──────────────────────────────────────

export const NEXT_FACTORY_JOBS: NextFactoryJobRecommendation[] = [
  { label: 'Reflowable EPUB3 — How to Trade', jobType: 'GENERATE_FORMAT', productSku: 'DD-HTT-001', formatType: 'REFLOWABLE_EPUB3', surfaceUnlockPts: 6.2, effort: 'MEDIUM', confidence: 'HIGH', description: 'Unlocks Amazon Kindle, Apple Books, Kobo, Google Play Books and library distribution routes.' },
  { label: '90-Day Trader Programme — Workbook PDF', jobType: 'GENERATE_FORMAT', productSku: 'DD-HTT-90D-001', formatType: 'WORKBOOK_PDF', surfaceUnlockPts: 4.1, effort: 'MEDIUM', confidence: 'MEDIUM', description: 'Programme workbook requires editorial expansion of weekly objectives before manufacturing.' },
  { label: 'German Edition — How to Trade', jobType: 'LOCALISE', productSku: 'DD-HTT-001', surfaceUnlockPts: 3.8, effort: 'HIGH', confidence: 'MEDIUM', description: 'German-language edition opens StreetLib DE, Amazon DE, Thalia, Weltbild and regional distributor routes.' },
  { label: 'Etsy Gallery 3 Asset — Complete Manual', jobType: 'GENERATE_ASSET', productSku: 'DD-HTT-001', surfaceUnlockPts: 1.2, effort: 'LOW', confidence: 'HIGH', description: 'Resolves blocking item on Etsy marketplace package. Required for package to reach APPROVED status.' },
];

// ─── PRODUCT LADDER ───────────────────────────────────────────────────────────

export const PRODUCT_LADDER: ProductLadderItem[] = [
  { tier: 'FREE', productSku: 'DD-SAMPLE-001', name: 'How to Trade — Sample (Ch.1–2)', releaseStatus: 'LIVE' },
  { tier: 'ENTRY', productSku: 'DD-PTC-001', name: 'Pre-Trade Checklist Pack', releaseStatus: 'OPPORTUNITY', priceGBP: 3.99 },
  { tier: 'CORE', productSku: 'DD-HTT-WB-001', name: 'How to Trade — Workbook', releaseStatus: 'APPROVED_FOR_SALE', priceGBP: 12.99 },
  { tier: 'FLAGSHIP', productSku: 'DD-HTT-001', name: 'How to Trade — Complete Manual', releaseStatus: 'LIVE', priceGBP: 19.99 },
  { tier: 'BUNDLE', productSku: 'DD-BUNDLE-001', name: 'Beginner Trading Library', releaseStatus: 'IDEA', priceGBP: 39.99 },
];

// ─── LOCALISED EDITIONS ───────────────────────────────────────────────────────

export const LOCALISED_EDITIONS: LocalisedEdition[] = [
  { id: 'loc-001', parentProductSku: 'DD-HTT-001', language: 'de', locale: 'de-DE', state: 'SOURCE', createdAt: '2024-06-02T09:00:00Z' },
  { id: 'loc-002', parentProductSku: 'DD-HTT-001', language: 'es', locale: 'es-ES', state: 'SOURCE', createdAt: '2024-06-02T09:00:00Z' },
  { id: 'loc-003', parentProductSku: 'DD-HTT-001', language: 'pt', locale: 'pt-BR', state: 'SOURCE', createdAt: '2024-06-02T09:00:00Z' },
];

// ─── TRANSLATION MEMORY ENTRIES ───────────────────────────────────────────────

export const TRANSLATION_MEMORY: TranslationMemoryEntry[] = [
  { id: 'tm-001', sourcePhrase: 'Risk Warning', language: 'de', approvedTranslation: 'Risikohinweis', context: 'Standard disclaimer header', approvedBy: 'Compliance' },
  { id: 'tm-002', sourcePhrase: 'Trading involves substantial risk of loss', language: 'de', approvedTranslation: 'Der Handel birgt ein erhebliches Verlustrisiko', context: 'Standard risk disclaimer', approvedBy: 'Compliance' },
  { id: 'tm-003', sourcePhrase: 'Position Sizing', language: 'de', approvedTranslation: 'Positionsgrößenbestimmung', context: 'Technical trading term', approvedBy: 'Pete Currey' },
  { id: 'tm-004', sourcePhrase: 'Drawdown OS', language: 'de', approvedTranslation: 'Drawdown OS', context: 'Brand name — do not translate', approvedBy: 'Pete Currey' },
];

// ─── SURFACE UNLOCK SIMULATIONS ──────────────────────────────────────────────

export const SURFACE_UNLOCK_SIMS: Record<string, SurfaceUnlockSimulation> = {
  'REFLOWABLE_EPUB3': {
    jobLabel: 'Create Reflowable EPUB3 — How to Trade',
    jobType: 'GENERATE_FORMAT',
    currentSurfaces: 26,
    newSurfaces: 40,
    surfacesGained: 14,
    weightedRsaGain: 6.2,
    newEligibleMarketplaces: ['Amazon Kindle', 'Apple Books', 'Kobo Writing Life', 'Google Play Books', 'OverDrive Library', 'PublishDrive EPUB Network'],
    confidence: 'HIGH',
  },
  'GERMAN_EDITION': {
    jobLabel: 'German Edition — How to Trade',
    jobType: 'LOCALISE',
    currentSurfaces: 26,
    newSurfaces: 34,
    surfacesGained: 8,
    weightedRsaGain: 3.8,
    newEligibleMarketplaces: ['Amazon DE', 'Thalia', 'Weltbild', 'StreetLib DE', 'Hugendubel', 'Bücher.de'],
    confidence: 'MEDIUM',
  },
};
