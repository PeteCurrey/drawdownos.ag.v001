// MARKETPLACE CONNECTOR ADAPTER & CAPABILITY MATRIX STANDARD

export type AutomationMode =
  | 'FULL_AUTOMATION'
  | 'PARTIAL_AUTOMATION'
  | 'READ_ONLY'
  | 'WEBHOOK_ONLY'
  | 'AGGREGATOR_MANAGED'
  | 'MANUAL_PORTAL'
  | 'RESEARCH_REQUIRED'
  | 'BLOCKED';

export interface MarketplaceCapabilities {
  canCreateProduct: boolean;
  canUpdateProduct: boolean;
  canDeleteProduct: boolean;
  canUploadFiles: boolean;
  canUpdatePrice: boolean;
  canReadOrders: boolean;
  canReadCustomers: boolean;
  canReadSales: boolean;
  canReadFees: boolean;
  canReadRefunds: boolean;
  canReadPayouts: boolean;
  supportsWebhooks: boolean;
  supportsOAuth: boolean;
  supportsAPIKey: boolean;
  supportsAffiliateProgramme: boolean;
  supportsCoupons: boolean;
  supportsTerritorialPricing: boolean;
  supportsMultipleCurrencies: boolean;
  requiresManualReview: boolean;
  aggregatorManaged: boolean;
}

export interface MarketplaceRecord {
  id: string;
  name: string;
  officialUrl: string;
  country: string;
  category: string;
  automationMode: AutomationMode;
  accountStatus: 'DISCOVERED' | 'RESEARCHING' | 'ELIGIBLE' | 'ONBOARDING' | 'CONNECTED' | 'LIVE' | 'REJECTED';
  capabilities: MarketplaceCapabilities;
  accountOwner?: string;
  listingUrl?: string;
}

export interface SubmissionPack {
  publicationCanonicalId: string;
  title: string;
  subtitle: string;
  primaryAuthor: string;
  publisher: string;
  isbn?: string;
  descriptionShort: string;
  descriptionLong: string;
  benefitBullets: string[];
  keywords: string[];
  categories: string[];
  suggestedPrices: Record<string, number>;
  masterPdfUrl: string;
  epubUrl: string;
  coverJpgUrl: string;
  samplePdfUrl: string;
  riskDisclaimer: string;
  publisherDisclosure: string;
  stepByStepInstructions: string[];
  generatedAt: string;
}

export interface MarketplaceAdapter {
  marketplaceId: string;
  capabilities: MarketplaceCapabilities;
  automationMode: AutomationMode;
  generateSubmissionPack(publicationId: string): Promise<SubmissionPack>;
  validateCapabilities(required: Partial<MarketplaceCapabilities>): boolean;
}

export function validateMarketplaceCapabilities(
  actual: MarketplaceCapabilities,
  required: Partial<MarketplaceCapabilities>
): boolean {
  for (const [key, value] of Object.entries(required)) {
    if (value === true && !actual[key as keyof MarketplaceCapabilities]) {
      return false;
    }
  }
  return true;
}
