// DRAWDOWN OS — REVENUE SURFACE AREA
// COMMERCIAL DISTRIBUTION INTELLIGENCE SYSTEM
// Continuously answers: How much of the commercially viable global market
// for each Drawdown product are we currently exposing ourselves to —
// and what should we do next to increase that exposure?

// ========================================================
// TYPE DEFINITIONS
// ========================================================

export type ChannelType =
  | 'DIRECT'
  | 'AGGREGATOR'
  | 'DOWNSTREAM'
  | 'STOREFRONT'
  | 'AFFILIATE_NETWORK'
  | 'LIBRARY'
  | 'SUBSCRIPTION'
  | 'COURSE'
  | 'REGIONAL'
  | 'OTHER';

export type ChannelStatus =
  | 'LIVE'
  | 'ONBOARDING'
  | 'APPROVED'
  | 'ELIGIBLE'
  | 'BLOCKED'
  | 'NOT_ELIGIBLE'
  | 'UNEXPLORED';

export type FormatType = 'PDF' | 'EPUB' | 'KINDLE' | 'AUDIO' | 'PRINT' | 'COURSE' | 'WORKBOOK';

export type RegionCode =
  | 'GB' | 'US' | 'CA' | 'AU' | 'NZ'
  | 'DE' | 'FR' | 'ES' | 'IT' | 'PL' | 'NL' | 'SE' | 'NO' | 'DK'
  | 'BR' | 'MX' | 'LATAM'
  | 'IN' | 'SEA' | 'ME' | 'AF' | 'GLOBAL';

export interface SurfaceChannel {
  id: string;
  name: string;
  type: ChannelType;
  regions: RegionCode[];
  formatsSupported: FormatType[];
  // Scoring dimensions (0-100)
  audienceScore: number;       // How relevant/large is the audience for trading education?
  revenueScore: number;        // Estimated revenue potential per month if live
  strategicScore: number;      // Brand fit, exclusivity, network effects, data
  competitionScore: number;    // How saturated is this channel already?
  integrationScore: number;    // Ease of connecting (100 = trivial, 0 = months of work)
  complianceScore: number;     // Compatibility with our financial education compliance posture
  // Composite opportunity score (0-100)
  opportunityScore: number;
  estimatedMonthlyRevenue: [number, number]; // [low, high] in USD
  status: ChannelStatus;
  reasonBlocked?: string;
  url: string;
}

export interface PublicationSurfaceProfile {
  publicationId: string;
  canonicalId: string;
  title: string;
  // Which formats are available for this publication
  availableFormats: FormatType[];
  // Which regions have been approved for distribution
  approvedRegions: RegionCode[];
  // Status per channel
  channelStatuses: Record<string, ChannelStatus>;
  // Revenue metrics per live channel
  channelRevenue: Record<string, number>; // USD monthly
  // Compliance gate per channel (true = cleared)
  channelCompliance: Record<string, boolean>;
}

export interface SurfaceAreaMetrics {
  publicationId: string;
  // Total addressable surface (TAM of channels × formats × regions)
  totalChannels: number;
  totalAddressableChannels: number; // Filtered for compliance-eligible
  // Current exposure
  liveChannels: number;
  onboardingChannels: number;
  approvedChannels: number;
  // Unexplored high-value
  highValueUnexplored: number; // Eligible but not started, score ≥ 70
  // Revenue
  liveMonthlyRevenue: number;
  potentialMonthlyRevenue: number; // If all eligible channels were live
  capturedPercent: number; // liveRevenue / potentialRevenue * 100
  // Surface area score (0-100)
  surfaceAreaScore: number;
  // Format coverage
  formatCoverage: Record<FormatType, { live: number; total: number }>;
  // Regional coverage
  regionalCoverage: Record<RegionCode, { live: number; total: number }>;
}

export interface OpportunityAction {
  id: string;
  publicationId: string;
  channelId: string;
  channelName: string;
  type: 'LAUNCH' | 'EXPAND_FORMAT' | 'EXPAND_REGION' | 'AFFILIATE_ACTIVATE' | 'PRICE_OPTIMISE' | 'COMPLIANCE_CLEAR';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  estimatedMonthlyUplift: number;
  estimatedEffortDays: number;
  description: string;
  nextStep: string;
  blockers?: string[];
}

// ========================================================
// CHANNEL REGISTRY (GLOBAL MARKETPLACE DATABASE)
// ========================================================

export const SURFACE_CHANNELS: SurfaceChannel[] = [
  // ─── DIRECT / CREATOR COMMERCE ───────────────────────
  {
    id: 'ch-whop',
    name: 'Whop',
    type: 'DIRECT',
    regions: ['GLOBAL'],
    formatsSupported: ['PDF', 'COURSE', 'WORKBOOK'],
    audienceScore: 90,
    revenueScore: 92,
    strategicScore: 88,
    competitionScore: 65,
    integrationScore: 90,
    complianceScore: 85,
    opportunityScore: 88,
    estimatedMonthlyRevenue: [8000, 22000],
    status: 'LIVE',
    url: 'https://whop.com',
  },
  {
    id: 'ch-gumroad',
    name: 'Gumroad',
    type: 'DIRECT',
    regions: ['GLOBAL'],
    formatsSupported: ['PDF', 'EPUB', 'WORKBOOK'],
    audienceScore: 78,
    revenueScore: 70,
    strategicScore: 72,
    competitionScore: 60,
    integrationScore: 92,
    complianceScore: 82,
    opportunityScore: 76,
    estimatedMonthlyRevenue: [3000, 9000],
    status: 'LIVE',
    url: 'https://gumroad.com',
  },
  {
    id: 'ch-etsy',
    name: 'Etsy Digital Downloads',
    type: 'STOREFRONT',
    regions: ['GLOBAL'],
    formatsSupported: ['PDF', 'WORKBOOK'],
    audienceScore: 62,
    revenueScore: 58,
    strategicScore: 55,
    competitionScore: 72,
    integrationScore: 85,
    complianceScore: 80,
    opportunityScore: 64,
    estimatedMonthlyRevenue: [1500, 6000],
    status: 'LIVE',
    url: 'https://etsy.com',
  },
  {
    id: 'ch-payhip',
    name: 'Payhip',
    type: 'DIRECT',
    regions: ['GLOBAL'],
    formatsSupported: ['PDF', 'EPUB', 'WORKBOOK'],
    audienceScore: 68,
    revenueScore: 62,
    strategicScore: 60,
    competitionScore: 55,
    integrationScore: 95,
    complianceScore: 88,
    opportunityScore: 72,
    estimatedMonthlyRevenue: [2000, 7000],
    status: 'APPROVED',
    url: 'https://payhip.com',
  },
  {
    id: 'ch-hotmart',
    name: 'Hotmart',
    type: 'DIRECT',
    regions: ['BR', 'LATAM', 'ES'],
    formatsSupported: ['PDF', 'COURSE', 'EPUB'],
    audienceScore: 85,
    revenueScore: 82,
    strategicScore: 80,
    competitionScore: 50,
    integrationScore: 78,
    complianceScore: 75,
    opportunityScore: 78,
    estimatedMonthlyRevenue: [5000, 18000],
    status: 'ELIGIBLE',
    url: 'https://hotmart.com',
  },
  {
    id: 'ch-digistore24',
    name: 'Digistore24',
    type: 'DIRECT',
    regions: ['DE', 'GLOBAL'],
    formatsSupported: ['PDF', 'EPUB', 'COURSE'],
    audienceScore: 76,
    revenueScore: 72,
    strategicScore: 70,
    competitionScore: 58,
    integrationScore: 80,
    complianceScore: 72,
    opportunityScore: 73,
    estimatedMonthlyRevenue: [3000, 10000],
    status: 'ELIGIBLE',
    url: 'https://digistore24.com',
  },
  {
    id: 'ch-lemonsqueezy',
    name: 'Lemon Squeezy',
    type: 'DIRECT',
    regions: ['GLOBAL'],
    formatsSupported: ['PDF', 'EPUB', 'WORKBOOK'],
    audienceScore: 72,
    revenueScore: 68,
    strategicScore: 74,
    competitionScore: 52,
    integrationScore: 90,
    complianceScore: 86,
    opportunityScore: 74,
    estimatedMonthlyRevenue: [2500, 8000],
    status: 'ELIGIBLE',
    url: 'https://lemonsqueezy.com',
  },
  {
    id: 'ch-sellfy',
    name: 'Sellfy',
    type: 'DIRECT',
    regions: ['GLOBAL'],
    formatsSupported: ['PDF', 'EPUB', 'PRINT'],
    audienceScore: 62,
    revenueScore: 58,
    strategicScore: 56,
    competitionScore: 50,
    integrationScore: 88,
    complianceScore: 82,
    opportunityScore: 65,
    estimatedMonthlyRevenue: [1200, 5000],
    status: 'UNEXPLORED',
    url: 'https://sellfy.com',
  },
  {
    id: 'ch-stan',
    name: 'Stan Store',
    type: 'DIRECT',
    regions: ['US', 'GLOBAL'],
    formatsSupported: ['PDF', 'COURSE', 'WORKBOOK'],
    audienceScore: 74,
    revenueScore: 70,
    strategicScore: 78,
    competitionScore: 48,
    integrationScore: 92,
    complianceScore: 80,
    opportunityScore: 76,
    estimatedMonthlyRevenue: [3000, 11000],
    status: 'ELIGIBLE',
    url: 'https://stan.store',
  },
  {
    id: 'ch-thrivecart',
    name: 'ThriveCart',
    type: 'DIRECT',
    regions: ['US', 'GB', 'AU', 'CA'],
    formatsSupported: ['PDF', 'COURSE', 'WORKBOOK'],
    audienceScore: 80,
    revenueScore: 78,
    strategicScore: 82,
    competitionScore: 44,
    integrationScore: 72,
    complianceScore: 83,
    opportunityScore: 78,
    estimatedMonthlyRevenue: [4000, 14000],
    status: 'UNEXPLORED',
    url: 'https://thrivecart.com',
  },
  {
    id: 'ch-kajabi',
    name: 'Kajabi',
    type: 'COURSE',
    regions: ['US', 'GB', 'AU', 'CA', 'GLOBAL'],
    formatsSupported: ['COURSE', 'PDF', 'WORKBOOK'],
    audienceScore: 82,
    revenueScore: 80,
    strategicScore: 85,
    competitionScore: 40,
    integrationScore: 70,
    complianceScore: 80,
    opportunityScore: 80,
    estimatedMonthlyRevenue: [5000, 20000],
    status: 'ELIGIBLE',
    url: 'https://kajabi.com',
  },
  {
    id: 'ch-teachable',
    name: 'Teachable',
    type: 'COURSE',
    regions: ['GLOBAL'],
    formatsSupported: ['COURSE', 'PDF'],
    audienceScore: 76,
    revenueScore: 72,
    strategicScore: 74,
    competitionScore: 52,
    integrationScore: 75,
    complianceScore: 78,
    opportunityScore: 73,
    estimatedMonthlyRevenue: [3500, 12000],
    status: 'UNEXPLORED',
    url: 'https://teachable.com',
  },
  // ─── AGGREGATORS ─────────────────────────────────────
  {
    id: 'ch-publishdrive',
    name: 'PublishDrive (Kobo, Apple Books, etc.)',
    type: 'AGGREGATOR',
    regions: ['GLOBAL'],
    formatsSupported: ['EPUB', 'PDF', 'KINDLE'],
    audienceScore: 88,
    revenueScore: 84,
    strategicScore: 86,
    competitionScore: 45,
    integrationScore: 68,
    complianceScore: 90,
    opportunityScore: 83,
    estimatedMonthlyRevenue: [6000, 18000],
    status: 'LIVE',
    url: 'https://publishdrive.com',
  },
  {
    id: 'ch-amazon-kdp',
    name: 'Amazon KDP (Kindle Direct)',
    type: 'AGGREGATOR',
    regions: ['US', 'GB', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'IN'],
    formatsSupported: ['KINDLE', 'EPUB', 'PRINT'],
    audienceScore: 95,
    revenueScore: 90,
    strategicScore: 88,
    competitionScore: 80,
    integrationScore: 72,
    complianceScore: 82,
    opportunityScore: 86,
    estimatedMonthlyRevenue: [8000, 30000],
    status: 'LIVE',
    url: 'https://kdp.amazon.com',
  },
  {
    id: 'ch-draft2digital',
    name: 'Draft2Digital',
    type: 'AGGREGATOR',
    regions: ['GLOBAL'],
    formatsSupported: ['EPUB', 'KINDLE'],
    audienceScore: 82,
    revenueScore: 76,
    strategicScore: 78,
    competitionScore: 42,
    integrationScore: 82,
    complianceScore: 88,
    opportunityScore: 79,
    estimatedMonthlyRevenue: [4000, 14000],
    status: 'ELIGIBLE',
    url: 'https://draft2digital.com',
  },
  {
    id: 'ch-smashwords',
    name: 'Smashwords / Draft2Digital',
    type: 'AGGREGATOR',
    regions: ['GLOBAL'],
    formatsSupported: ['EPUB'],
    audienceScore: 70,
    revenueScore: 62,
    strategicScore: 64,
    competitionScore: 40,
    integrationScore: 80,
    complianceScore: 85,
    opportunityScore: 68,
    estimatedMonthlyRevenue: [1500, 5000],
    status: 'UNEXPLORED',
    url: 'https://smashwords.com',
  },
  // ─── SUBSCRIPTION / LIBRARY ──────────────────────────
  {
    id: 'ch-perlego',
    name: 'Perlego (Academic Library)',
    type: 'LIBRARY',
    regions: ['GB', 'US', 'DE', 'FR'],
    formatsSupported: ['EPUB', 'PDF'],
    audienceScore: 80,
    revenueScore: 72,
    strategicScore: 84,
    competitionScore: 30,
    integrationScore: 60,
    complianceScore: 90,
    opportunityScore: 77,
    estimatedMonthlyRevenue: [3000, 9000],
    status: 'ELIGIBLE',
    url: 'https://perlego.com',
  },
  {
    id: 'ch-scribd',
    name: 'Scribd / Everand',
    type: 'SUBSCRIPTION',
    regions: ['US', 'GB', 'CA', 'AU', 'GLOBAL'],
    formatsSupported: ['EPUB', 'PDF', 'AUDIO'],
    audienceScore: 78,
    revenueScore: 68,
    strategicScore: 72,
    competitionScore: 48,
    integrationScore: 65,
    complianceScore: 84,
    opportunityScore: 72,
    estimatedMonthlyRevenue: [2500, 7500],
    status: 'ELIGIBLE',
    url: 'https://scribd.com',
  },
  {
    id: 'ch-kindle-unlimited',
    name: 'Kindle Unlimited (KDP Select)',
    type: 'SUBSCRIPTION',
    regions: ['US', 'GB', 'DE', 'FR', 'ES', 'IT', 'CA', 'AU', 'IN'],
    formatsSupported: ['KINDLE'],
    audienceScore: 88,
    revenueScore: 70,
    strategicScore: 65,
    competitionScore: 70,
    integrationScore: 78,
    complianceScore: 80,
    opportunityScore: 74,
    estimatedMonthlyRevenue: [2000, 8000],
    status: 'ELIGIBLE',
    url: 'https://kdp.amazon.com',
  },
  // ─── REGIONAL ────────────────────────────────────────
  {
    id: 'ch-tolino',
    name: 'Tolino Network (DE/AT/CH)',
    type: 'REGIONAL',
    regions: ['DE'],
    formatsSupported: ['EPUB'],
    audienceScore: 75,
    revenueScore: 70,
    strategicScore: 76,
    competitionScore: 35,
    integrationScore: 55,
    complianceScore: 78,
    opportunityScore: 70,
    estimatedMonthlyRevenue: [2500, 8000],
    status: 'UNEXPLORED',
    url: 'https://mytolino.com',
  },
  {
    id: 'ch-fnac',
    name: 'Fnac (FR/ES)',
    type: 'REGIONAL',
    regions: ['FR', 'ES'],
    formatsSupported: ['EPUB'],
    audienceScore: 72,
    revenueScore: 66,
    strategicScore: 68,
    competitionScore: 32,
    integrationScore: 48,
    complianceScore: 72,
    opportunityScore: 64,
    estimatedMonthlyRevenue: [1800, 6000],
    status: 'UNEXPLORED',
    url: 'https://www.fnac.com',
  },
  {
    id: 'ch-pothi',
    name: 'Pothi.com (India)',
    type: 'REGIONAL',
    regions: ['IN'],
    formatsSupported: ['PDF', 'EPUB', 'PRINT'],
    audienceScore: 72,
    revenueScore: 60,
    strategicScore: 65,
    competitionScore: 28,
    integrationScore: 62,
    complianceScore: 70,
    opportunityScore: 63,
    estimatedMonthlyRevenue: [1000, 4000],
    status: 'UNEXPLORED',
    url: 'https://pothi.com',
  },
  // ─── AFFILIATE NETWORKS ──────────────────────────────
  {
    id: 'ch-clickbank',
    name: 'ClickBank Marketplace',
    type: 'AFFILIATE_NETWORK',
    regions: ['US', 'GB', 'CA', 'AU', 'GLOBAL'],
    formatsSupported: ['PDF', 'COURSE', 'WORKBOOK'],
    audienceScore: 82,
    revenueScore: 85,
    strategicScore: 78,
    competitionScore: 62,
    integrationScore: 70,
    complianceScore: 68,
    opportunityScore: 78,
    estimatedMonthlyRevenue: [6000, 20000],
    status: 'ELIGIBLE',
    url: 'https://clickbank.com',
  },
  {
    id: 'ch-impact',
    name: 'Impact.com (Affiliate Network)',
    type: 'AFFILIATE_NETWORK',
    regions: ['US', 'GB', 'GLOBAL'],
    formatsSupported: ['PDF', 'COURSE', 'WORKBOOK', 'EPUB'],
    audienceScore: 80,
    revenueScore: 82,
    strategicScore: 85,
    competitionScore: 44,
    integrationScore: 62,
    complianceScore: 80,
    opportunityScore: 80,
    estimatedMonthlyRevenue: [5000, 18000],
    status: 'UNEXPLORED',
    url: 'https://impact.com',
  },
  {
    id: 'ch-shareasale',
    name: 'ShareASale',
    type: 'AFFILIATE_NETWORK',
    regions: ['US', 'GLOBAL'],
    formatsSupported: ['PDF', 'EPUB', 'COURSE'],
    audienceScore: 74,
    revenueScore: 70,
    strategicScore: 72,
    competitionScore: 50,
    integrationScore: 68,
    complianceScore: 78,
    opportunityScore: 71,
    estimatedMonthlyRevenue: [3000, 10000],
    status: 'UNEXPLORED',
    url: 'https://shareasale.com',
  },
];

// ========================================================
// PUBLICATION SURFACE PROFILES
// ========================================================

export const PUBLICATION_SURFACE_PROFILES: PublicationSurfaceProfile[] = [
  {
    publicationId: 'pub-001-dd-htt-001',
    canonicalId: 'DD-HTT-001',
    title: 'HOW TO TRADE',
    availableFormats: ['PDF', 'EPUB', 'KINDLE', 'WORKBOOK'],
    approvedRegions: ['GB', 'US', 'CA', 'AU', 'DE', 'FR', 'ES', 'NL', 'NZ'],
    channelStatuses: {
      'ch-whop': 'LIVE',
      'ch-gumroad': 'LIVE',
      'ch-etsy': 'LIVE',
      'ch-amazon-kdp': 'LIVE',
      'ch-publishdrive': 'LIVE',
      'ch-payhip': 'APPROVED',
      'ch-hotmart': 'ELIGIBLE',
      'ch-digistore24': 'ELIGIBLE',
      'ch-lemonsqueezy': 'ELIGIBLE',
      'ch-stan': 'ELIGIBLE',
      'ch-kajabi': 'ELIGIBLE',
      'ch-perlego': 'ELIGIBLE',
      'ch-scribd': 'ELIGIBLE',
      'ch-clickbank': 'ELIGIBLE',
      'ch-draft2digital': 'ELIGIBLE',
      'ch-kindle-unlimited': 'ELIGIBLE',
      'ch-thrivecart': 'UNEXPLORED',
      'ch-teachable': 'UNEXPLORED',
      'ch-impact': 'UNEXPLORED',
      'ch-shareasale': 'UNEXPLORED',
      'ch-sellfy': 'UNEXPLORED',
      'ch-smashwords': 'UNEXPLORED',
      'ch-tolino': 'UNEXPLORED',
      'ch-fnac': 'UNEXPLORED',
      'ch-pothi': 'UNEXPLORED',
    },
    channelRevenue: {
      'ch-whop': 14200,
      'ch-gumroad': 4800,
      'ch-etsy': 3100,
      'ch-amazon-kdp': 16800,
      'ch-publishdrive': 9200,
    },
    channelCompliance: {
      'ch-whop': true,
      'ch-gumroad': true,
      'ch-etsy': true,
      'ch-amazon-kdp': true,
      'ch-publishdrive': true,
      'ch-payhip': true,
      'ch-hotmart': true,
      'ch-digistore24': false, // Pending DE financial promotions review
      'ch-lemonsqueezy': true,
      'ch-stan': true,
      'ch-kajabi': true,
      'ch-perlego': true,
      'ch-scribd': true,
      'ch-clickbank': false, // Pending income claim review
      'ch-draft2digital': true,
      'ch-kindle-unlimited': true,
    },
  },
  {
    publicationId: 'pub-002-dd-pam-002',
    canonicalId: 'DD-PAM-002',
    title: 'PRICE ACTION MATRIX',
    availableFormats: ['PDF', 'EPUB'],
    approvedRegions: ['GB', 'US', 'AU'],
    channelStatuses: {
      'ch-whop': 'LIVE',
      'ch-gumroad': 'LIVE',
      'ch-amazon-kdp': 'LIVE',
      'ch-publishdrive': 'LIVE',
      'ch-etsy': 'LIVE',
      'ch-payhip': 'LIVE',
      'ch-hotmart': 'ELIGIBLE',
      'ch-stan': 'ELIGIBLE',
      'ch-perlego': 'UNEXPLORED',
      'ch-scribd': 'UNEXPLORED',
      'ch-clickbank': 'UNEXPLORED',
      'ch-impact': 'UNEXPLORED',
    },
    channelRevenue: {
      'ch-whop': 5800,
      'ch-gumroad': 2400,
      'ch-amazon-kdp': 7200,
      'ch-publishdrive': 4100,
      'ch-etsy': 1800,
      'ch-payhip': 2600,
    },
    channelCompliance: {
      'ch-whop': true,
      'ch-gumroad': true,
      'ch-amazon-kdp': true,
      'ch-publishdrive': true,
      'ch-etsy': true,
      'ch-payhip': true,
      'ch-hotmart': true,
      'ch-stan': true,
    },
  },
  {
    publicationId: 'pub-003-dd-rmp-003',
    canonicalId: 'DD-RMP-003',
    title: 'RISK PROTOCOLS & POSITION CALCULATOR',
    availableFormats: ['PDF', 'WORKBOOK'],
    approvedRegions: ['GB'],
    channelStatuses: {
      'ch-whop': 'BLOCKED',
      'ch-gumroad': 'BLOCKED',
      'ch-amazon-kdp': 'BLOCKED',
    },
    channelRevenue: {},
    channelCompliance: {
      'ch-whop': false,
      'ch-gumroad': false,
      'ch-amazon-kdp': false,
    },
  },
];

// ========================================================
// SURFACE AREA METRICS (COMPUTED PER PUBLICATION)
// ========================================================

export const SURFACE_AREA_METRICS: SurfaceAreaMetrics[] = [
  {
    publicationId: 'pub-001-dd-htt-001',
    totalChannels: SURFACE_CHANNELS.length,
    totalAddressableChannels: 22,
    liveChannels: 5,
    onboardingChannels: 0,
    approvedChannels: 1,
    highValueUnexplored: 7,
    liveMonthlyRevenue: 48100,
    potentialMonthlyRevenue: 248000,
    capturedPercent: 19.4,
    surfaceAreaScore: 38,
    formatCoverage: {
      PDF: { live: 5, total: 18 },
      EPUB: { live: 2, total: 12 },
      KINDLE: { live: 2, total: 4 },
      AUDIO: { live: 0, total: 3 },
      PRINT: { live: 0, total: 2 },
      COURSE: { live: 0, total: 6 },
      WORKBOOK: { live: 1, total: 8 },
    },
    regionalCoverage: {
      GB: { live: 4, total: 14 },
      US: { live: 4, total: 16 },
      CA: { live: 2, total: 8 },
      AU: { live: 2, total: 8 },
      NZ: { live: 0, total: 3 },
      DE: { live: 1, total: 7 },
      FR: { live: 1, total: 6 },
      ES: { live: 1, total: 5 },
      IT: { live: 0, total: 4 },
      PL: { live: 0, total: 2 },
      NL: { live: 0, total: 3 },
      SE: { live: 0, total: 2 },
      NO: { live: 0, total: 2 },
      DK: { live: 0, total: 2 },
      BR: { live: 0, total: 4 },
      MX: { live: 0, total: 3 },
      LATAM: { live: 0, total: 5 },
      IN: { live: 0, total: 4 },
      SEA: { live: 0, total: 3 },
      ME: { live: 0, total: 2 },
      AF: { live: 0, total: 1 },
      GLOBAL: { live: 3, total: 8 },
    },
  },
  {
    publicationId: 'pub-002-dd-pam-002',
    totalChannels: SURFACE_CHANNELS.length,
    totalAddressableChannels: 18,
    liveChannels: 6,
    onboardingChannels: 0,
    approvedChannels: 0,
    highValueUnexplored: 4,
    liveMonthlyRevenue: 23900,
    potentialMonthlyRevenue: 148000,
    capturedPercent: 16.1,
    surfaceAreaScore: 29,
    formatCoverage: {
      PDF: { live: 5, total: 14 },
      EPUB: { live: 2, total: 8 },
      KINDLE: { live: 1, total: 4 },
      AUDIO: { live: 0, total: 2 },
      PRINT: { live: 0, total: 1 },
      COURSE: { live: 0, total: 2 },
      WORKBOOK: { live: 0, total: 3 },
    },
    regionalCoverage: {
      GB: { live: 5, total: 10 },
      US: { live: 4, total: 12 },
      CA: { live: 1, total: 6 },
      AU: { live: 2, total: 6 },
      NZ: { live: 0, total: 2 },
      DE: { live: 0, total: 4 },
      FR: { live: 0, total: 3 },
      ES: { live: 0, total: 3 },
      IT: { live: 0, total: 2 },
      PL: { live: 0, total: 1 },
      NL: { live: 0, total: 2 },
      SE: { live: 0, total: 1 },
      NO: { live: 0, total: 1 },
      DK: { live: 0, total: 1 },
      BR: { live: 0, total: 2 },
      MX: { live: 0, total: 2 },
      LATAM: { live: 0, total: 3 },
      IN: { live: 0, total: 2 },
      SEA: { live: 0, total: 1 },
      ME: { live: 0, total: 1 },
      AF: { live: 0, total: 0 },
      GLOBAL: { live: 2, total: 6 },
    },
  },
  {
    publicationId: 'pub-003-dd-rmp-003',
    totalChannels: SURFACE_CHANNELS.length,
    totalAddressableChannels: 0,
    liveChannels: 0,
    onboardingChannels: 0,
    approvedChannels: 0,
    highValueUnexplored: 0,
    liveMonthlyRevenue: 0,
    potentialMonthlyRevenue: 0,
    capturedPercent: 0,
    surfaceAreaScore: 0,
    formatCoverage: {
      PDF: { live: 0, total: 0 },
      EPUB: { live: 0, total: 0 },
      KINDLE: { live: 0, total: 0 },
      AUDIO: { live: 0, total: 0 },
      PRINT: { live: 0, total: 0 },
      COURSE: { live: 0, total: 0 },
      WORKBOOK: { live: 0, total: 0 },
    },
    regionalCoverage: {
      GB: { live: 0, total: 0 }, US: { live: 0, total: 0 }, CA: { live: 0, total: 0 },
      AU: { live: 0, total: 0 }, NZ: { live: 0, total: 0 }, DE: { live: 0, total: 0 },
      FR: { live: 0, total: 0 }, ES: { live: 0, total: 0 }, IT: { live: 0, total: 0 },
      PL: { live: 0, total: 0 }, NL: { live: 0, total: 0 }, SE: { live: 0, total: 0 },
      NO: { live: 0, total: 0 }, DK: { live: 0, total: 0 }, BR: { live: 0, total: 0 },
      MX: { live: 0, total: 0 }, LATAM: { live: 0, total: 0 }, IN: { live: 0, total: 0 },
      SEA: { live: 0, total: 0 }, ME: { live: 0, total: 0 }, AF: { live: 0, total: 0 },
      GLOBAL: { live: 0, total: 0 },
    },
  },
];

// ========================================================
// OPPORTUNITY ACTION QUEUE
// ========================================================

export const OPPORTUNITY_ACTIONS: OpportunityAction[] = [
  {
    id: 'opp-001',
    publicationId: 'pub-001-dd-htt-001',
    channelId: 'ch-clickbank',
    channelName: 'ClickBank Marketplace',
    type: 'COMPLIANCE_CLEAR',
    priority: 'CRITICAL',
    estimatedMonthlyUplift: 14000,
    estimatedEffortDays: 3,
    description: 'ClickBank has 200k+ affiliates in the finance niche. Income claim rule must be reviewed before listing.',
    nextStep: 'Open compliance rule review for ClickBank income claim constraint. Edit copy to remove earnings implications.',
    blockers: ['INCOME_CLAIM rule unresolved for channel'],
  },
  {
    id: 'opp-002',
    publicationId: 'pub-001-dd-htt-001',
    channelId: 'ch-hotmart',
    channelName: 'Hotmart LATAM',
    type: 'LAUNCH',
    priority: 'HIGH',
    estimatedMonthlyUplift: 12000,
    estimatedEffortDays: 5,
    description: 'Spanish-language finance education market. 35M+ potential readers. Hotmart dominates LATAM digital products.',
    nextStep: 'Commission Spanish translation of DD-HTT-001. Upload to Hotmart as a new regional SKU.',
  },
  {
    id: 'opp-003',
    publicationId: 'pub-001-dd-htt-001',
    channelId: 'ch-impact',
    channelName: 'Impact.com Affiliate Network',
    type: 'AFFILIATE_ACTIVATE',
    priority: 'HIGH',
    estimatedMonthlyUplift: 9000,
    estimatedEffortDays: 7,
    description: 'Impact.com connects to premium finance/trading content publishers with validated traffic.',
    nextStep: 'Register Drawdown as advertiser on Impact.com. Set 30% commission structure. Approve affiliate onboarding.',
  },
  {
    id: 'opp-004',
    publicationId: 'pub-001-dd-htt-001',
    channelId: 'ch-kajabi',
    channelName: 'Kajabi Course Platform',
    type: 'EXPAND_FORMAT',
    priority: 'HIGH',
    estimatedMonthlyUplift: 8500,
    estimatedEffortDays: 14,
    description: 'Convert HOW TO TRADE into a structured course with video modules. Kajabi supports premium pricing £299+.',
    nextStep: 'Create course framework. Map each chapter to a video module. Commission video production or screen recordings.',
  },
  {
    id: 'opp-005',
    publicationId: 'pub-001-dd-htt-001',
    channelId: 'ch-thrivecart',
    channelName: 'ThriveCart',
    type: 'LAUNCH',
    priority: 'HIGH',
    estimatedMonthlyUplift: 7000,
    estimatedEffortDays: 4,
    description: 'ThriveCart offers superior checkout conversion and built-in affiliate management. Ideal for high-ticket products.',
    nextStep: 'Create ThriveCart product page for HOW TO TRADE. Set up one-click upsell for PRICE ACTION MATRIX.',
  },
  {
    id: 'opp-006',
    publicationId: 'pub-001-dd-htt-001',
    channelId: 'ch-perlego',
    channelName: 'Perlego Academic Library',
    type: 'LAUNCH',
    priority: 'MEDIUM',
    estimatedMonthlyUplift: 5500,
    estimatedEffortDays: 10,
    description: 'Perlego serves 1M+ students and finance professionals across UK/EU universities. Library-mode revenue.',
    nextStep: 'Submit publisher application to Perlego. Provide EPUB version of DD-HTT-001 for editorial review.',
  },
  {
    id: 'opp-007',
    publicationId: 'pub-001-dd-htt-001',
    channelId: 'ch-tolino',
    channelName: 'Tolino Network (Germany)',
    type: 'EXPAND_REGION',
    priority: 'MEDIUM',
    estimatedMonthlyUplift: 4800,
    estimatedEffortDays: 8,
    description: 'Tolino is Germany\'s dominant ebook platform. 40% market share of German ebook readers. Zero current presence.',
    nextStep: 'Obtain German translation or approve for English listing. Register with Tolino via aggregator (PublishDrive or D2D).',
  },
  {
    id: 'opp-008',
    publicationId: 'pub-001-dd-htt-001',
    channelId: 'ch-scribd',
    channelName: 'Scribd / Everand',
    type: 'LAUNCH',
    priority: 'MEDIUM',
    estimatedMonthlyUplift: 4200,
    estimatedEffortDays: 6,
    description: 'Scribd\'s Everand subscription reaches 1M+ subscribers. Finance education is a top-performing category.',
    nextStep: 'Apply to Scribd Publisher Program. Provide EPUB. Review revenue share model (per-read payments).',
  },
  {
    id: 'opp-009',
    publicationId: 'pub-002-dd-pam-002',
    channelId: 'ch-hotmart',
    channelName: 'Hotmart LATAM',
    type: 'LAUNCH',
    priority: 'HIGH',
    estimatedMonthlyUplift: 6000,
    estimatedEffortDays: 5,
    description: 'Price Action is highly searched in Spanish-speaking retail trading communities.',
    nextStep: 'Use DD-HTT-001 Spanish translation work as template for DD-PAM-002 localisation.',
  },
  {
    id: 'opp-010',
    publicationId: 'pub-002-dd-pam-002',
    channelId: 'ch-clickbank',
    channelName: 'ClickBank Marketplace',
    type: 'COMPLIANCE_CLEAR',
    priority: 'HIGH',
    estimatedMonthlyUplift: 9000,
    estimatedEffortDays: 3,
    description: 'ClickBank finance affiliates are significant volume drivers for trading education.',
    nextStep: 'Clear compliance gate first on DD-HTT-001, then replicate for DD-PAM-002.',
    blockers: ['Compliance gate on DD-HTT-001 ClickBank must clear first'],
  },
];

// ========================================================
// AGGREGATE PORTFOLIO SURFACE METRICS
// ========================================================

export const PORTFOLIO_SURFACE_SUMMARY = {
  totalTitles: 3,
  activeTitles: 2,
  blockedTitles: 1,
  totalChannelsKnown: SURFACE_CHANNELS.length,
  // Across all active publications
  totalLiveChannelPositions: 11, // sum of live channels across pub profiles
  totalEligibleUnexplored: 11, // high-value eligible not yet started
  portfolioMonthlyRevenueLive: 72000,
  portfolioMonthlyRevenuePotential: 396000,
  portfolioCapturedPercent: 18.2,
  topUnexploredUplift: 14000, // single biggest opportunity
  portfolioSurfaceScore: 34, // composite
  // Trend
  surfaceScoreChangeWoW: +2.1,
  newChannelsDiscovered: 3,
  channelsEnteredPipeline: 1,
  channelsMadeLive: 0,
};
