/**
 * DRAWDOWN OS — CANONICAL CATALOG & MARKETPLACE DOMAIN TYPES
 */

import { DataProvenance } from './provenance';

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
  publicationDate?: string;
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
  coverUrl?: string;
  provenance?: DataProvenance;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  type: 'SALE' | 'SYNC' | 'PAYMENT' | 'ROYALTY' | 'OPPORTUNITY' | 'COMPLIANCE' | 'SYSTEM';
  channel: string;
  description: string;
  amount?: string;
  rawPayload?: Record<string, unknown>;
  provenance?: DataProvenance;
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
  opportunityScore?: number;
  monthlyEstValue?: string;
  integrationEffort: 'LOW' | 'MEDIUM' | 'HIGH';
  complianceCompatibility: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'DISCOVERED' | 'RESEARCHING' | 'ELIGIBLE' | 'REVIEW_REQUIRED' | 'APPROVED' | 'ONBOARDING' | 'CONNECTED' | 'LIVE' | 'REJECTED';
  docUrl?: string;
  manualPortalUrl?: string;
}

export interface CurrencyAmount {
  amount: number;
  currency: string; // e.g. 'USD', 'GBP', 'EUR'
}

export interface MultiCurrencyTotal {
  totalsByCurrency: Record<string, number>;
  formattedList: string[]; // e.g. ["USD $1,240.00", "GBP £380.00"]
}
