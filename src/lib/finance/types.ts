/**
 * DRAWDOWN OS — FINANCIAL COMMAND
 * SDK Type Definitions & Data Interfaces
 */

export type FinancialTransactionType =
  | 'SALE'
  | 'REFUND'
  | 'PARTIAL_REFUND'
  | 'CHARGEBACK'
  | 'MARKETPLACE_FEE'
  | 'PROCESSING_FEE'
  | 'DISTRIBUTION_FEE'
  | 'AFFILIATE_COMMISSION'
  | 'TAX_COLLECTED'
  | 'TAX_WITHHELD'
  | 'PROMOTION_COST'
  | 'AD_SPEND'
  | 'ROYALTY'
  | 'PAYOUT'
  | 'FX_ADJUSTMENT'
  | 'MANUAL_ADJUSTMENT';

export type PayoutState =
  | 'EXPECTED'
  | 'SCHEDULED'
  | 'PROCESSING'
  | 'PAID'
  | 'PARTIAL'
  | 'OVERDUE'
  | 'RECONCILED'
  | 'DISPUTED'
  | 'UNKNOWN';

export type CommercialAccountCode =
  | 'CUSTOMER_SALES'
  | 'REFUNDS'
  | 'MARKETPLACE_FEES'
  | 'PAYMENT_FEES'
  | 'AFFILIATE_COMMISSIONS'
  | 'ROYALTIES_RECEIVABLE'
  | 'MARKETPLACE_RECEIVABLE'
  | 'CASH_RECEIVED'
  | 'ADVERTISING'
  | 'LOCALISATION_COST'
  | 'PRODUCT_PRODUCTION_COST'
  | 'DISTRIBUTION_COST'
  | 'FX_GAIN_LOSS'
  | 'TAX_COLLECTED_BY_PLATFORM'
  | 'TAX_WITHHELD';

export interface EconomicWaterfall {
  customerSpendGbp: number;
  taxHandledGbp: number;
  marketplaceFeesGbp: number;
  affiliateCommissionGbp: number;
  processingFeesGbp: number;
  netReceiptGbp: number; // Net Marketplace Proceeds
  campaignAcquisitionGbp: number;
  attributedVariableCostGbp: number;
  netContributionGbp: number;
  effectiveTakeRatePct: number;
  contributionMarginPct: number;
}

export interface FinancialTransaction {
  id: string;
  transactionType: FinancialTransactionType;
  orderId?: string;
  productSku: string;
  marketplaceId: string;
  marketplaceName: string;
  affiliateId?: string;
  campaignId?: string;
  territoryCode: string;
  originalAmount: number;
  originalCurrency: string;
  reportingAmountGbp: number;
  fxRate: number;
  transactionAt: string;
  status: string;
  externalReference?: string;
}

export interface LedgerEntry {
  id: string;
  journalGroupId: string;
  eventType: string;
  accountCode: CommercialAccountCode;
  debitAmount: number;
  creditAmount: number;
  reportingAmountGbp: number;
  description: string;
  postedAt: string;
}

export interface FinancialPayout {
  id: string;
  marketplaceName: string;
  periodLabel: string;
  payoutCurrency: string;
  grossSalesLocal: number;
  feesLocal: number;
  refundsLocal: number;
  taxLocal: number;
  netExpectedGbp: number;
  netPaidGbp: number;
  varianceGbp: number;
  expectedPayoutAt: string;
  paymentAt?: string;
  state: PayoutState;
  bankReceiptReference?: string;
}

export interface BankTransaction {
  id: string;
  bankAccountName: string;
  transactionDate: string;
  description: string;
  amountGbp: number;
  currency: string;
  matchedPayoutId?: string;
  matchStatus: 'UNMATCHED' | 'AUTO_MATCHED' | 'MANUAL_MATCHED';
}

export interface TaxRecord {
  id: string;
  territoryCode: string;
  marketplaceName: string;
  merchantOfRecord: 'MARKETPLACE_FACILITATOR' | 'SELLER_OF_RECORD';
  taxCollectedGbp: number;
  taxWithheldGbp: number;
  taxStatus: 'PLATFORM_HANDLED' | 'DRAWDOWN_REVIEW';
  periodLabel: string;
}

export interface EconomicRSAMetrics {
  rawRsaPct: number; // Layer 1: Where can we sell?
  capturedRsaPct: number; // Layer 2: Where are we live?
  growthActivatedRsaPct: number; // Layer 3: Where are we generating demand?
  economicallyProductiveRsaPct: number; // Layer 4: Where is activity generating positive contribution?
}

export interface FollowTheMoneyLineage {
  orderId: string;
  customerPaymentGbp: number;
  taxDeductedGbp: number;
  marketplaceFeeDeductedGbp: number;
  affiliateCommissionDeductedGbp: number;
  netMarketplacePayoutGbp: number;
  acquisitionCostGbp: number;
  netContributionGbp: number;
  bankCashReceivedGbp?: number;
  lineageSteps: string[];
}
