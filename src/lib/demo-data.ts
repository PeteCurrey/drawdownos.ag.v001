// DRAWDOWN OS DEMO DATA & SEED CATALOG RECORD
// ALL FINANCIAL DATA GENERATED FOR INITIAL SYSTEM DEMONSTRATION IS VISUALLY IDENTIFIED WITH "DEMO"

export interface Publication {
  id: string;
  canonicalId: string; // e.g. DD-HTT-001
  title: string;
  subtitle: string;
  seriesName?: string;
  volumeNumber?: number;
  primaryAuthor: string;
  publisher: string;
  status: 'DRAFT' | 'COMPLIANCE_REVIEW' | 'READY' | 'PUBLISHING' | 'LIVE' | 'ARCHIVED' | 'BLOCKED';
  category: string;
  bisacCodes: string[];
  keywords: string[];
  riskClassification: string;
  publicationDate: string;
  copyrightNotice: string;
  version: string;
  formatCount: number;
  languageCount: number;
  distributionCount: number;
  liveMarketplaces: number;
  lifetimeUnits: number;
  lifetimeRevenue: number;
  lastUpdate: string;
  complianceState: 'PASSED' | 'REVIEW_REQUIRED' | 'BLOCKING_ISSUE';
  coverUrl: string;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  type: 'SALE' | 'SYNC' | 'PAYMENT' | 'ROYALTY' | 'OPPORTUNITY' | 'COMPLIANCE';
  channel: string;
  description: string;
  amount?: string;
  isDemo: boolean;
}

export interface MarketplaceCandidate {
  id: string;
  name: string;
  officialUrl: string;
  country: string;
  regionsServed: string[];
  languagesSupported: string[];
  productTypes: string[];
  affiliateAvailable: boolean;
  apiAvailable: boolean;
  opportunityScore: number; // 0 - 100
  monthlyEstValue: string;
  integrationEffort: 'LOW' | 'MEDIUM' | 'HIGH';
  complianceCompatibility: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'DISCOVERED' | 'RESEARCHING' | 'ELIGIBLE' | 'REVIEW_REQUIRED' | 'APPROVED' | 'ONBOARDING' | 'CONNECTED' | 'LIVE' | 'REJECTED';
}

export const SEED_PUBLICATION: Publication = {
  id: "pub-001-dd-htt-001",
  canonicalId: "DD-HTT-001",
  title: "HOW TO TRADE",
  subtitle: "The Definitive Institutional Risk, Price Action & Drawdown Management Playbook",
  seriesName: "Drawdown Operating Series",
  volumeNumber: 1,
  primaryAuthor: "Drawdown Research Group",
  publisher: "Drawdown Publishing",
  status: "LIVE",
  category: "Trading Education & Financial Risk",
  bisacCodes: ["BUS036000", "BUS027000", "BUS050000"],
  keywords: ["trading education", "drawdown management", "price action", "institutional risk", "forex futures", "position sizing"],
  riskClassification: "HIGH_RISK_FINANCIAL_EDUCATION",
  publicationDate: "2026-01-15",
  copyrightNotice: "© 2026 Drawdown Publishing Ltd. All rights reserved.",
  version: "1.2.0",
  formatCount: 6,
  languageCount: 4,
  distributionCount: 12,
  liveMarketplaces: 9,
  lifetimeUnits: 4820,
  lifetimeRevenue: 236180,
  lastUpdate: "2026-08-12 16:42:00",
  complianceState: "PASSED",
  coverUrl: "/demo-cover.png"
};

export const DEMO_PUBLICATIONS_CATALOG: Publication[] = [
  SEED_PUBLICATION,
  {
    id: "pub-002-dd-pam-002",
    canonicalId: "DD-PAM-002",
    title: "PRICE ACTION MATRIX",
    subtitle: "Advanced Order Flow Mechanics & Liquidity Pool Mapping",
    primaryAuthor: "Drawdown Research Group",
    publisher: "Drawdown Publishing",
    status: "LIVE",
    category: "Market Structure",
    bisacCodes: ["BUS036000"],
    keywords: ["order flow", "liquidity pools", "market structure"],
    riskClassification: "HIGH_RISK_FINANCIAL_EDUCATION",
    publicationDate: "2026-03-10",
    copyrightNotice: "© 2026 Drawdown Publishing Ltd.",
    version: "1.0.4",
    formatCount: 4,
    languageCount: 2,
    distributionCount: 8,
    liveMarketplaces: 6,
    lifetimeUnits: 1940,
    lifetimeRevenue: 95060,
    lastUpdate: "2026-08-11 11:20:00",
    complianceState: "PASSED",
    coverUrl: "/demo-cover.png"
  },
  {
    id: "pub-003-dd-rmp-003",
    canonicalId: "DD-RMP-003",
    title: "RISK PROTOCOLS & POSITION CALCULATOR",
    subtitle: "Mathematical Position Sizing & Monte Carlo Drawdown Simulation",
    primaryAuthor: "Drawdown Research Group",
    publisher: "Drawdown Publishing",
    status: "COMPLIANCE_REVIEW",
    category: "Financial Risk",
    bisacCodes: ["BUS027000"],
    keywords: ["risk management", "monte carlo", "position sizing"],
    riskClassification: "HIGH_RISK_FINANCIAL_EDUCATION",
    publicationDate: "2026-09-01",
    copyrightNotice: "© 2026 Drawdown Publishing Ltd.",
    version: "0.9.0",
    formatCount: 3,
    languageCount: 1,
    distributionCount: 0,
    liveMarketplaces: 0,
    lifetimeUnits: 0,
    lifetimeRevenue: 0,
    lastUpdate: "2026-08-12 14:10:00",
    complianceState: "REVIEW_REQUIRED",
    coverUrl: "/demo-cover.png"
  }
];

export const DEMO_TELEMETRY_METRICS = {
  isDemo: true,
  revenueToday: 3840.00,
  revenueMtd: 68420.00,
  monthlyTarget: 100000.00,
  targetPercentage: 68.42,
  monthlyForecast: 108500.00,
  prevPeriodComparisonPercent: +18.4,
  liveProductsCount: 14,
  activeChannelsCount: 12,
  queuedPublicationsCount: 3,
  failedSyncsCount: 0,
  pendingApprovalsCount: 2,
  affiliateSalesCount: 42,
  bestSellerSku: "DD-HTT-001-EN-UK-PDF-V1",
  bestMarketName: "Whop Direct",
  globalCoveragePercent: 78.5,
  systemHealthPercent: 99.8
};

export const DEMO_LIVE_ACTIVITIES: ActivityItem[] = [
  { id: "act-1", timestamp: "18:41", type: "SALE", channel: "Amazon Kindle UK", description: "Sale: HOW TO TRADE (Kindle Edition)", amount: "+£49.00", isDemo: true },
  { id: "act-2", timestamp: "18:38", type: "SYNC", channel: "Etsy Storefront", description: "Listing auto-synced successfully (DD-HTT-001-PDF)", isDemo: true },
  { id: "act-3", timestamp: "18:32", type: "PAYMENT", channel: "Whop Direct", description: "Payment settled via Stripe Connect (Cust #8942)", amount: "+$99.00", isDemo: true },
  { id: "act-4", timestamp: "18:22", type: "ROYALTY", channel: "PublishDrive", description: "Monthly royalty statement imported (Kobo & Apple Books)", amount: "+$1,420.50", isDemo: true },
  { id: "act-5", timestamp: "18:11", type: "OPPORTUNITY", channel: "Marketplace Radar", description: "Spanish edition opportunity detected: Hotmart LATAM (Score: 92/100)", isDemo: true },
  { id: "act-6", timestamp: "17:55", type: "COMPLIANCE", channel: "Compliance Engine", description: "Automated scan passed: 0 income claims found in DD-HTT-001-V1.2", isDemo: true }
];

export const DEMO_MARKETPLACE_CANDIDATES: MarketplaceCandidate[] = [
  {
    id: "cand-01",
    name: "Hotmart (Spain & LATAM)",
    officialUrl: "https://hotmart.com",
    country: "ES",
    regionsServed: ["Spain", "Latin America", "Brazil"],
    languagesSupported: ["es", "pt", "en"],
    productTypes: ["PDF", "EPUB", "Audio", "Course"],
    affiliateAvailable: true,
    apiAvailable: true,
    opportunityScore: 92,
    monthlyEstValue: "$12,000 - $25,000",
    integrationEffort: "LOW",
    complianceCompatibility: "HIGH",
    status: "RESEARCHING"
  },
  {
    id: "cand-02",
    name: "Perlego (Academic Library)",
    officialUrl: "https://perlego.com",
    country: "UK",
    regionsServed: ["UK", "EU", "US"],
    languagesSupported: ["en", "de", "fr"],
    productTypes: ["EPUB", "PDF"],
    affiliateAvailable: false,
    apiAvailable: true,
    opportunityScore: 86,
    monthlyEstValue: "$4,500 - $8,000",
    integrationEffort: "MEDIUM",
    complianceCompatibility: "HIGH",
    status: "ELIGIBLE"
  },
  {
    id: "cand-03",
    name: "Payhip",
    officialUrl: "https://payhip.com",
    country: "UK",
    regionsServed: ["Worldwide"],
    languagesSupported: ["en"],
    productTypes: ["PDF", "EPUB", "Software"],
    affiliateAvailable: true,
    apiAvailable: true,
    opportunityScore: 84,
    monthlyEstValue: "$6,000 - $14,000",
    integrationEffort: "LOW",
    complianceCompatibility: "HIGH",
    status: "APPROVED"
  }
];
