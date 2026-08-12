/**
 * DRAWDOWN OS — FINANCIAL COMMAND
 * Demo Data — Test Product: HOW TO TRADE (DD-HTT-001)
 */

import type {
  EconomicWaterfall, FinancialTransaction, LedgerEntry, FinancialPayout,
  BankTransaction, TaxRecord, EconomicRSAMetrics
} from './types';

// ─── ECONOMIC WATERFALL DEMO (£100 CUSTOMER SPEND) ─────────────────────────

export const DEMO_WATERFALL: EconomicWaterfall = {
  customerSpendGbp: 100.00,
  taxHandledGbp: 8.33,
  marketplaceFeesGbp: 10.00,
  affiliateCommissionGbp: 20.00,
  processingFeesGbp: 4.00,
  netReceiptGbp: 57.67, // Net Marketplace Proceeds
  campaignAcquisitionGbp: 8.00,
  attributedVariableCostGbp: 3.00,
  netContributionGbp: 46.67,
  effectiveTakeRatePct: 14.0, // (10 + 4) / 100
  contributionMarginPct: 46.67,
};

// ─── FINANCIAL TRANSACTIONS ──────────────────────────────────────────────────

export const DEMO_TRANSACTIONS: FinancialTransaction[] = [
  { id: 'tx-001', transactionType: 'SALE', orderId: 'DD-2048', productSku: 'DD-HTT-001', marketplaceId: 'mkt-amazon-us', marketplaceName: 'Amazon KDP US', territoryCode: 'US', originalAmount: 24.99, originalCurrency: 'USD', reportingAmountGbp: 19.80, fxRate: 0.7923, transactionAt: '2024-08-12T14:20:00Z', status: 'SETTLED', externalReference: 'AMZ-ORD-99182' },
  { id: 'tx-002', transactionType: 'MARKETPLACE_FEE', orderId: 'DD-2048', productSku: 'DD-HTT-001', marketplaceId: 'mkt-amazon-us', marketplaceName: 'Amazon KDP US', territoryCode: 'US', originalAmount: -3.75, originalCurrency: 'USD', reportingAmountGbp: -2.97, fxRate: 0.7923, transactionAt: '2024-08-12T14:20:00Z', status: 'SETTLED', externalReference: 'AMZ-FEE-99182' },
  { id: 'tx-003', transactionType: 'SALE', orderId: 'DD-2049', productSku: 'DD-HTT-001-PT-BR', marketplaceId: 'mkt-hotmart-br', marketplaceName: 'Hotmart Brazil', affiliateId: 'aff-002', territoryCode: 'BR', originalAmount: 149.00, originalCurrency: 'BRL', reportingAmountGbp: 21.30, fxRate: 0.1430, transactionAt: '2024-08-12T15:10:00Z', status: 'SETTLED', externalReference: 'HTM-ORD-88102' },
  { id: 'tx-004', transactionType: 'AFFILIATE_COMMISSION', orderId: 'DD-2049', productSku: 'DD-HTT-001-PT-BR', marketplaceId: 'mkt-hotmart-br', marketplaceName: 'Hotmart Brazil', affiliateId: 'aff-002', territoryCode: 'BR', originalAmount: -44.70, originalCurrency: 'BRL', reportingAmountGbp: -6.39, fxRate: 0.1430, transactionAt: '2024-08-12T15:10:00Z', status: 'SETTLED', externalReference: 'HTM-AFF-88102' },
  { id: 'tx-005', transactionType: 'REFUND', orderId: 'DD-2012', productSku: 'DD-HTT-001', marketplaceId: 'mkt-etsy-us', marketplaceName: 'Etsy Digital Store', territoryCode: 'US', originalAmount: -24.99, originalCurrency: 'GBP', reportingAmountGbp: -24.99, fxRate: 1.0000, transactionAt: '2024-08-11T09:15:00Z', status: 'SETTLED', externalReference: 'ETSY-REF-10029' },
];

// ─── FINANCIAL PAYOUTS & RECEIVABLES ─────────────────────────────────────────

export const DEMO_PAYOUTS: FinancialPayout[] = [
  { id: 'pay-001', marketplaceName: 'Amazon KDP US', periodLabel: 'July 2024 Settlement', payoutCurrency: 'USD', grossSalesLocal: 4250.00, feesLocal: 637.50, refundsLocal: 50.00, taxLocal: 0.00, netExpectedGbp: 2822.00, netPaidGbp: 2822.00, varianceGbp: 0.00, expectedPayoutAt: '2024-08-10T00:00:00Z', paymentAt: '2024-08-10T11:00:00Z', state: 'RECONCILED', bankReceiptReference: 'BANK-REC-9921' },
  { id: 'pay-002', marketplaceName: 'Hotmart Brazil', periodLabel: 'July 2024 Settlement', payoutCurrency: 'BRL', grossSalesLocal: 18500.00, feesLocal: 1850.00, refundsLocal: 450.00, taxLocal: 0.00, netExpectedGbp: 2310.00, netPaidGbp: 2307.00, varianceGbp: -3.00, expectedPayoutAt: '2024-08-12T00:00:00Z', paymentAt: '2024-08-12T09:30:00Z', state: 'PAID', bankReceiptReference: 'BANK-REC-9944' }, // £3 FX/transfer fee variance
  { id: 'pay-003', marketplaceName: 'Etsy Digital Store', periodLabel: 'Current Unsettled Balance', payoutCurrency: 'GBP', grossSalesLocal: 1420.00, feesLocal: 142.00, refundsLocal: 25.00, taxLocal: 0.00, netExpectedGbp: 1253.00, netPaidGbp: 0.00, varianceGbp: 0.00, expectedPayoutAt: '2024-08-20T00:00:00Z', state: 'EXPECTED' },
  { id: 'pay-004', marketplaceName: 'Tolino DACH', periodLabel: 'Q2 2024 Royalty Statement', payoutCurrency: 'EUR', grossSalesLocal: 890.00, feesLocal: 133.50, refundsLocal: 0.00, taxLocal: 0.00, netExpectedGbp: 642.00, netPaidGbp: 0.00, varianceGbp: 0.00, expectedPayoutAt: '2024-08-30T00:00:00Z', state: 'EXPECTED' },
];

// ─── BANK TRANSACTIONS ───────────────────────────────────────────────────────

export const DEMO_BANK_TRANSACTIONS: BankTransaction[] = [
  { id: 'bt-001', bankAccountName: 'Drawdown Primary GBP (Barclays)', transactionDate: '2024-08-10T11:00:00Z', description: 'AMAZON MEDIA EU S.A.R.L.', amountGbp: 2822.00, currency: 'GBP', matchedPayoutId: 'pay-001', matchStatus: 'AUTO_MATCHED' },
  { id: 'bt-002', bankAccountName: 'Drawdown Primary GBP (Barclays)', transactionDate: '2024-08-12T09:30:00Z', description: 'HOTMART TECH HOLDINGS', amountGbp: 2307.00, currency: 'GBP', matchedPayoutId: 'pay-002', matchStatus: 'AUTO_MATCHED' },
];

// ─── TAX RECORDS ─────────────────────────────────────────────────────────────

export const DEMO_TAX_RECORDS: TaxRecord[] = [
  { id: 'tax-001', territoryCode: 'US', marketplaceName: 'Amazon KDP US', merchantOfRecord: 'MARKETPLACE_FACILITATOR', taxCollectedGbp: 342.10, taxWithheldGbp: 0.00, taxStatus: 'PLATFORM_HANDLED', periodLabel: 'July 2024' },
  { id: 'tax-002', territoryCode: 'GB', marketplaceName: 'Etsy Digital Store', merchantOfRecord: 'MARKETPLACE_FACILITATOR', taxCollectedGbp: 236.00, taxWithheldGbp: 0.00, taxStatus: 'PLATFORM_HANDLED', periodLabel: 'July 2024' },
];

// ─── 4-LAYER ECONOMIC RSA TELEMETRY ──────────────────────────────────────────

export const DEMO_ECONOMIC_RSA: EconomicRSAMetrics = {
  rawRsaPct: 68.0,                       // Layer 1: Where can we sell?
  capturedRsaPct: 59.0,                  // Layer 2: Where are we live?
  growthActivatedRsaPct: 44.0,           // Layer 3: Where are we generating demand?
  economicallyProductiveRsaPct: 31.0,    // Layer 4: Positive Net Contribution surfaces
};
