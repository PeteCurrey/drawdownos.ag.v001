/**
 * DRAWDOWN OS — GROWTH COMMAND
 * SDK Type Definitions & Data Interfaces
 */

export type GrowthChannelType =
  | 'OWNED_WEB'
  | 'MARKETPLACE_ORGANIC'
  | 'SEO'
  | 'EMAIL'
  | 'AFFILIATE'
  | 'REFERRAL'
  | 'PARTNERSHIP'
  | 'SOCIAL_ORGANIC'
  | 'PAID_MEDIA'
  | 'CONTENT_SYNDICATION'
  | 'CREATOR_PARTNERSHIP'
  | 'MARKETPLACE_PROMOTION'
  | 'LOCALISATION_LAUNCH'
  | 'OTHER';

export type CampaignObjective =
  | 'NET_REVENUE'
  | 'NEW_CUSTOMERS'
  | 'REPEAT_PURCHASE'
  | 'PRODUCT_LAUNCH'
  | 'MARKETPLACE_ACTIVATION'
  | 'AFFILIATE_RECRUITMENT'
  | 'EMAIL_LIST_GROWTH'
  | 'FREE_TO_PAID_CONVERSION'
  | 'TERRITORY_EXPANSION'
  | 'LOCAL_EDITION_LAUNCH';

export type CampaignStatus = 'DRAFT' | 'READY' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'STOPPED_OUT';
export type AttributionConfidence = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';
export type SurfaceActivationState = 'NONE' | 'ORGANIC_ONLY' | 'ACTIVATED' | 'CAMPAIGN_RUNNING' | 'HIGH_PERFORMING';
export type AffiliatePipelineStage = 'PROSPECT' | 'CONTACTED' | 'APPLIED' | 'APPROVED' | 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface GrowthChannel {
  id: string;
  type: GrowthChannelType;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | 'INACTIVE';
  owner: string;
  territory: string;
  language: string;
  costModel: 'ORGANIC' | 'CPA' | 'CPC' | 'REVENUE_SHARE';
  attributionModel: string;
  trackingStatus: 'HEALTHY' | 'WARNING' | 'BROKEN';
}

export interface GrowthCampaign {
  id: string;
  name: string;
  campaignType: string;
  objective: CampaignObjective;
  status: CampaignStatus;
  startAt?: string;
  endAt?: string;
  products: string[];
  marketplaces: string[];
  territories: string[];
  languages: string[];
  channels: string[];
  budgetGbp: number;
  actualCostGbp: number;
  grossRevenueGbp: number;
  netRevenueGbp: number;
  netContributionGbp: number;
  contributionRoas: number; // Net Contribution / Spend
  newCustomersCount: number;
  repeatCustomersCount: number;
  ordersCount: number;
  refundCount: number;
  attributionMethod: string;
  attributionConfidence: AttributionConfidence;
  stopLossMaxSpendGbp?: number;
  stopLossMaxCpaGbp?: number;
  readinessScore: number; // 0 - 100
  createdBy: string;
  approvedBy?: string;
}

export interface AffiliateProspect {
  id: string;
  name: string;
  businessName?: string;
  websiteUrl?: string;
  territory: string;
  language: string;
  audienceType: string;
  opportunityScore: number; // 0 - 100
  pipelineStage: AffiliatePipelineStage;
  activeTier: 'ELITE' | 'GROWING' | 'NEW' | 'INACTIVE' | 'COMPLIANCE_REVIEW';
  totalClicks: number;
  totalOrders: number;
  netContributionGbp: number;
  contributionPer100ClicksGbp: number;
  refundRatePct: number;
  complianceStrikes: number;
}

export interface LeadMagnet {
  id: string;
  title: string;
  sourcePublicationId: string;
  formatType: string;
  downloadsCount: number;
  emailJoinsCount: number;
  paidConversionsCount: number;
  downstreamNetRevenueGbp: number;
}

export interface SEOOpportunity {
  id: string;
  topicTitle: string;
  searchIntent: string;
  targetProductSku: string;
  opportunityScore: number;
  sourceChapter: string;
  organicSessions: number;
  organicNetRevenueGbp: number;
}

export interface EffectiveSurfaceMetrics {
  rawRsaPct: number;
  merchandisedRsaPct: number;
  growthActivatedRsaPct: number;
  revenueGeneratingRsaPct: number;
}

export interface GrowthPlan {
  productSku: string;
  productName: string;
  issueSummary: string;
  recommendedActions: Array<{
    step: number;
    actionTitle: string;
    targetChannel: string;
    effort: 'LOW' | 'MEDIUM' | 'HIGH';
    confidence: 'LOW' | 'MEDIUM' | 'HIGH';
    expectedContributionUnlock: string;
  }>;
  overallEffort: 'LOW' | 'MEDIUM' | 'HIGH';
}
