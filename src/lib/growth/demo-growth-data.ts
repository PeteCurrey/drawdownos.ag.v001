/**
 * DRAWDOWN OS — GROWTH COMMAND
 * Demo Data — Test Product: HOW TO TRADE (DD-HTT-001)
 */

import type {
  GrowthChannel, GrowthCampaign, AffiliateProspect, LeadMagnet,
  SEOOpportunity, EffectiveSurfaceMetrics
} from './types';

// ─── GROWTH CHANNELS ─────────────────────────────────────────────────────────

export const GROWTH_CHANNELS: GrowthChannel[] = [
  { id: 'gc-001', type: 'OWNED_WEB', name: 'Drawdown Direct Store', status: 'ACTIVE', owner: 'Pete Currey', territory: 'GLOBAL', language: 'EN', costModel: 'ORGANIC', attributionModel: 'LAST_TOUCH', trackingStatus: 'HEALTHY' },
  { id: 'gc-002', type: 'MARKETPLACE_ORGANIC', name: 'Amazon KDP Search', status: 'ACTIVE', owner: 'Marketplace Engine', territory: 'US/UK', language: 'EN', costModel: 'ORGANIC', attributionModel: 'MARKETPLACE_REPORTED', trackingStatus: 'HEALTHY' },
  { id: 'gc-003', type: 'AFFILIATE', name: 'Hotmart LatAm Affiliate Network', status: 'ACTIVE', owner: 'Affiliate Team', territory: 'BR/ES', language: 'PT/ES', costModel: 'REVENUE_SHARE', attributionModel: 'AFFILIATE_DIRECT', trackingStatus: 'HEALTHY' },
  { id: 'gc-004', type: 'SEO', name: 'Drawdown Educational Articles', status: 'ACTIVE', owner: 'Content Team', territory: 'GLOBAL', language: 'EN', costModel: 'ORGANIC', attributionModel: 'FIRST_TOUCH', trackingStatus: 'HEALTHY' },
  { id: 'gc-005', type: 'EMAIL', name: 'Risk Management Nurture Sequence', status: 'ACTIVE', owner: 'Growth Engine', territory: 'GLOBAL', language: 'EN', costModel: 'ORGANIC', attributionModel: 'LAST_TOUCH', trackingStatus: 'HEALTHY' },
  { id: 'gc-006', type: 'LOCALISATION_LAUNCH', name: 'German DACH Launch Push', status: 'PAUSED', owner: 'Localization Team', territory: 'DE/AT/CH', language: 'DE', costModel: 'CPA', attributionModel: 'LAST_TOUCH', trackingStatus: 'WARNING' },
];

// ─── GROWTH CAMPAIGNS ─────────────────────────────────────────────────────────

export const GROWTH_CAMPAIGNS: GrowthCampaign[] = [
  {
    id: 'cmp-001',
    name: 'How to Trade — Hotmart LatAm Affiliate Push',
    campaignType: 'AFFILIATE_PUSH',
    objective: 'NET_REVENUE',
    status: 'RUNNING',
    startAt: '2024-07-01T00:00:00Z',
    products: ['DD-HTT-001', 'DD-HTT-001-PT-BR'],
    marketplaces: ['Hotmart Brazil', 'Hotmart Spain'],
    territories: ['BR', 'ES', 'MX'],
    languages: ['pt', 'es'],
    channels: ['gc-003'],
    budgetGbp: 450.00,
    actualCostGbp: 380.00,
    grossRevenueGbp: 4250.00,
    netRevenueGbp: 3612.50,
    netContributionGbp: 2480.00,
    contributionRoas: 6.53, // £2480 contribution / £380 cost
    newCustomersCount: 142,
    repeatCustomersCount: 18,
    ordersCount: 160,
    refundCount: 3,
    attributionMethod: 'AFFILIATE_DIRECT',
    attributionConfidence: 'HIGH',
    stopLossMaxSpendGbp: 1000.00,
    stopLossMaxCpaGbp: 15.00,
    readinessScore: 100,
    createdBy: 'Pete Currey',
    approvedBy: 'Compliance Lead',
  },
  {
    id: 'cmp-002',
    name: 'Pre-Trade Risk Checklist Lead Magnet Funnel',
    campaignType: 'LEAD_MAGNET',
    objective: 'FREE_TO_PAID_CONVERSION',
    status: 'RUNNING',
    startAt: '2024-06-15T00:00:00Z',
    products: ['DD-HTT-001'],
    marketplaces: ['Direct Store'],
    territories: ['GB', 'US', 'CA', 'AU'],
    languages: ['en'],
    channels: ['gc-001', 'gc-[#004]', 'gc-[#005]'],
    budgetGbp: 120.00,
    actualCostGbp: 95.00,
    grossRevenueGbp: 2890.00,
    netRevenueGbp: 2745.50,
    netContributionGbp: 2210.00,
    contributionRoas: 23.26,
    newCustomersCount: 88,
    repeatCustomersCount: 24,
    ordersCount: 112,
    refundCount: 1,
    attributionMethod: 'UTM',
    attributionConfidence: 'HIGH',
    stopLossMaxSpendGbp: 500.00,
    readinessScore: 95,
    createdBy: 'Pete Currey',
  },
  {
    id: 'cmp-003',
    name: 'German DACH Launch & Publisher Outreach',
    campaignType: 'LOCALISATION_LAUNCH',
    objective: 'LOCAL_EDITION_LAUNCH',
    status: 'READY',
    products: ['DD-HTT-001-DE-DE'],
    marketplaces: ['Tolino DACH', 'Kobo DACH', 'Amazon.de Kindle'],
    territories: ['DE', 'AT', 'CH'],
    languages: ['de'],
    channels: ['gc-006'],
    budgetGbp: 600.00,
    actualCostGbp: 0.00,
    grossRevenueGbp: 0.00,
    netRevenueGbp: 0.00,
    netContributionGbp: 0.00,
    contributionRoas: 0.00,
    newCustomersCount: 0,
    repeatCustomersCount: 0,
    ordersCount: 0,
    refundCount: 0,
    attributionMethod: 'AFFILIATE_DIRECT',
    attributionConfidence: 'MEDIUM',
    stopLossMaxSpendGbp: 600.00,
    readinessScore: 88, // Pending final BaFin compliance signoff
    createdBy: 'Localization Lead',
  },
];

// ─── AFFILIATES ───────────────────────────────────────────────────────────────

export const DEMO_AFFILIATES: AffiliateProspect[] = [
  { id: 'aff-001', name: 'RiskFirst Trading Education', businessName: 'RiskFirst Media', websiteUrl: 'https://riskfirsttrading.com', territory: 'US/UK', language: 'en', audienceType: 'RISK_FOCUSED', opportunityScore: 94, pipelineStage: 'ACTIVE', activeTier: 'ELITE', totalClicks: 1420, totalOrders: 118, netContributionGbp: 2150.00, contributionPer100ClicksGbp: 151.40, refundRatePct: 1.2, complianceStrikes: 0 },
  { id: 'aff-002', name: 'Mercados y Risco LatAm', businessName: 'LatAm Finance Group', websiteUrl: 'https://mercadosyrisco.br', territory: 'BR/LATAM', language: 'pt', audienceType: 'BEGINNER_TRADER', opportunityScore: 88, pipelineStage: 'ACTIVE', activeTier: 'GROWING', totalClicks: 890, totalOrders: 64, netContributionGbp: 1120.00, contributionPer100ClicksGbp: 125.84, refundRatePct: 2.1, complianceStrikes: 0 },
  { id: 'aff-003', name: 'DACH Trading Journal Blog', businessName: 'Weber Financial DE', websiteUrl: 'https://dachtrading.de', territory: 'DE', language: 'de', audienceType: 'WORKBOOK_BUYER', opportunityScore: 82, pipelineStage: 'APPLIED', activeTier: 'NEW', totalClicks: 0, totalOrders: 0, netContributionGbp: 0.00, contributionPer100ClicksGbp: 0.00, refundRatePct: 0.0, complianceStrikes: 0 },
];

// ─── LEAD MAGNETS ─────────────────────────────────────────────────────────────

export const DEMO_LEAD_MAGNETS: LeadMagnet[] = [
  { id: 'lm-001', title: 'Pre-Trade 10-Point Risk & Position Sizing Checklist', sourcePublicationId: 'pub-dd-htt-001', formatType: 'PDF_CHECKLIST', downloadsCount: 2450, emailJoinsCount: 1890, paidConversionsCount: 214, downstreamNetRevenueGbp: 5840.00 },
  { id: 'lm-002', title: 'Drawdown OS Position Sizing Cheat Sheet', sourcePublicationId: 'pub-dd-htt-001', formatType: 'PDF_WORKSHEET', downloadsCount: 1120, emailJoinsCount: 840, paidConversionsCount: 92, downstreamNetRevenueGbp: 2310.00 },
];

// ─── SEO OPPORTUNITIES ───────────────────────────────────────────────────────

export const DEMO_SEO_OPPORTUNITIES: SEOOpportunity[] = [
  { id: 'seo-001', topicTitle: 'How to Calculate Position Size with Fixed Fractional Risk', searchIntent: 'Informational / Commercial', targetProductSku: 'DD-HTT-001', opportunityScore: 91, sourceChapter: 'Chapter 9: Position Sizing Mathematics', organicSessions: 4200, organicNetRevenueGbp: 1850.00 },
  { id: 'seo-[#002]', topicTitle: 'What is Drawdown in Trading and How to Manage It', searchIntent: 'Informational', targetProductSku: 'DD-HTT-001', opportunityScore: 84, sourceChapter: 'Chapter 1: Defining Portfolio Drawdown', organicSessions: 3100, organicNetRevenueGbp: 920.00 },
];

// ─── EFFECTIVE COMMERCIAL SURFACE TELEMETRY ─────────────────────────────────

export const DEMO_EFFECTIVE_SURFACE: EffectiveSurfaceMetrics = {
  rawRsaPct: 68.0,
  merchandisedRsaPct: 59.0,
  growthActivatedRsaPct: 44.0,
  revenueGeneratingRsaPct: 31.0,
};
