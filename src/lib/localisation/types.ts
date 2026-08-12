/**
 * DRAWDOWN OS — GLOBAL LOCALISATION ENGINE
 * SDK Type Definitions & Data Interface
 */

export type LocalEditionState =
  | 'OPPORTUNITY'
  | 'APPROVED_FOR_LOCALISATION'
  | 'PREPARING'
  | 'TRANSLATING'
  | 'TRANSLATED_DRAFT'
  | 'LOCALISING'
  | 'EDITORIAL_REVIEW'
  | 'COMPLIANCE_REVIEW'
  | 'VISUAL_QA'
  | 'FORMAT_QA'
  | 'READY'
  | 'APPROVED_FOR_SALE'
  | 'PUBLISHING'
  | 'LIVE'
  | 'PAUSED'
  | 'STALE'
  | 'SUPERSEDED'
  | 'RETIRED';

export type TranslationUnitStatus =
  | 'UNTRANSLATED'
  | 'AI_DRAFT'
  | 'HUMAN_TRANSLATED'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'FLAGGED'
  | 'NEEDS_REVISION'
  | 'LOCKED';

export type TermClassification = 'LOCKED' | 'TRANSLATE' | 'LOCALISE' | 'REVIEW';
export type TranslationMethod = 'HUMAN' | 'AI_ASSISTED' | 'AI_DRAFT' | 'PROFESSIONAL_TRANSLATOR' | 'HYBRID' | 'IMPORT';
export type PricingStrategy = 'FX_REFERENCE' | 'LOCAL_MARKET_PRICE' | 'PRICE_PARITY' | 'PREMIUM' | 'ENTRY' | 'CUSTOM';

export interface Territory {
  id: string; // e.g. 'DE', 'US', 'ES', 'BR'
  name: string;
  defaultCurrencyCode: string;
  primaryLanguages: string[];
  dateFormat: string;
  numberFormat: string;
  disclaimerRequirements?: string[];
  regulatoryContext?: string;
}

export interface Locale {
  id: string; // e.g. 'de-DE', 'en-US', 'es-ES', 'pt-BR'
  languageCode: string;
  territoryCode: string;
  localeName: string;
  textDirection: 'ltr' | 'rtl';
  isActive: boolean;
}

export interface LocalisedEdition {
  id: string;
  publicationId: string;
  productId: string;
  productSku: string;
  productName: string;
  sourceEditionId: string; // e.g. 'DD-HTT-001-EN-GB-v1.2'
  sourceVersion: string;
  languageCode: string;
  territoryCode: string;
  localeCode: string;
  localeName: string;
  editionVersion: string;
  titleLocalised: string;
  subtitleLocalised?: string;
  translationMethod: TranslationMethod;
  state: LocalEditionState;
  editorialStatus: string;
  complianceStatus: 'PASS' | 'WARN' | 'BLOCK' | 'PENDING';
  qaStatus: string;
  commercialStatus: string;
  translatorName?: string;
  reviewerName?: string;
  completionPct: number;
  totalUnits: number;
  translatedUnits: number;
  approvedUnits: number;
  blockingIssuesCount: number;
  approvedAt?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TranslationUnit {
  id: string;
  editionId: string;
  sourceElementId: string;
  unitType: 'HEADING' | 'PARAGRAPH' | 'BULLET' | 'TABLE' | 'CALLOUT' | 'DISCLAIMER' | 'CTA' | 'WORKSHEET';
  sourceText: string;
  sourceVersion: string;
  sourceContext?: string;
  translatedText?: string;
  translationMethod: TranslationMethod;
  status: TranslationUnitStatus;
  complianceSensitivity: number; // 1-5
  isComplianceSensitive: boolean;
  reviewerNotes?: string;
  translationMemoryMatchId?: string;
  tmConfidencePct?: number;
}

export interface TranslationMemoryEntry {
  id: string;
  sourcePhrase: string;
  approvedTranslation: string;
  sourceLanguage: string;
  targetLanguage: string;
  localeCode: string;
  domain: string;
  context?: string;
  approvedBy: string;
  timesUsed: number;
  lastUsedAt: string;
}

export interface TermBaseEntry {
  id: string;
  termEn: string;
  category: 'BRAND' | 'REGULATORY' | 'TECHNICAL' | 'FINANCIAL';
  classification: TermClassification;
  definition: string;
  contextNotes?: string;
  translations: Record<string, { preferred: string; alternatives?: string[]; prohibited?: string[]; keepInEnglish?: boolean }>;
}

export interface LocalisationOpportunity {
  id: string;
  productSku: string;
  productName: string;
  languageCode: string;
  territoryCode: string;
  localeCode: string;
  localeName: string;
  priorityScore: number; // 0 - 100
  rsaUnlockPts: number;
  unlockedMarketplaces: string[];
  estimatedEffort: 'LOW' | 'MEDIUM' | 'HIGH';
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  existingSalesSignal?: string;
  status: 'OPPORTUNITY' | 'APPROVED' | 'IN_PROGRESS' | 'REJECTED';
}

export interface LocalComplianceRule {
  id: string;
  territoryCode: string;
  ruleName: string;
  mandatoryDisclaimerText: string;
  prohibitedTerms: string[];
  requiresLocalLegalReview: boolean;
}

export interface LocalPriceRecord {
  id: string;
  editionId: string;
  currencyCode: string;
  basePriceLocal: number;
  proposedPriceLocal: number;
  fxReferenceGbp: number;
  platformFeePct: number;
  estimatedNetLocal: number;
  pricingStrategy: PricingStrategy;
}

export interface ExpansionPlan {
  publicationId: string;
  publicationTitle: string;
  recommendedLocales: Array<{
    step: number;
    localeCode: string;
    localeName: string;
    rsaUnlockPts: number;
    unlockedMarketplaces: string[];
    effort: 'LOW' | 'MEDIUM' | 'HIGH';
    priorityScore: number;
    existingSalesSignal?: string;
  }>;
  totalUnlockPts: number;
  note: string;
}
