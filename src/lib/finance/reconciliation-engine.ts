/**
 * DRAWDOWN OS — FINANCIAL COMMAND
 * Reconciliation Engine — 3-Sided Auto-Matching Workspace,
 * Variance Engine & Match Confidence Calculator.
 */

import type { FinancialPayout, BankTransaction } from './types';
import { DEMO_PAYOUTS, DEMO_BANK_TRANSACTIONS } from './demo-finance-data';

export interface MatchResult {
  payoutId: string;
  bankTransactionId?: string;
  matchConfidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNMATCHED';
  varianceGbp: number;
  varianceExplanation?: string;
  isAutoMatched: boolean;
}

export function reconcilePayoutWithBank(
  payout: FinancialPayout,
  bankTx?: BankTransaction
): MatchResult {
  if (!bankTx) {
    return {
      payoutId: payout.id,
      matchConfidence: 'UNMATCHED',
      varianceGbp: payout.netExpectedGbp,
      varianceExplanation: 'No bank transaction matched for this payout period yet.',
      isAutoMatched: false,
    };
  }

  const variance = Math.round((bankTx.amountGbp - payout.netExpectedGbp) * 100) / 100;

  if (Math.abs(variance) === 0) {
    return {
      payoutId: payout.id,
      bankTransactionId: bankTx.id,
      matchConfidence: 'HIGH',
      varianceGbp: 0.00,
      varianceExplanation: 'Exact 1:1 match between Expected Payout and Bank Received Cash.',
      isAutoMatched: true,
    };
  }

  if (Math.abs(variance) <= 5.00) {
    return {
      payoutId: payout.id,
      bankTransactionId: bankTx.id,
      matchConfidence: 'MEDIUM',
      varianceGbp: variance,
      varianceExplanation: `Minor variance of £${Math.abs(variance).toFixed(2)} likely due to international wire transfer / FX fee deduction.`,
      isAutoMatched: true,
    };
  }

  return {
    payoutId: payout.id,
    bankTransactionId: bankTx.id,
    matchConfidence: 'LOW',
    varianceGbp: variance,
    varianceExplanation: `Material variance of £${Math.abs(variance).toFixed(2)} detected. Requires manual review.`,
    isAutoMatched: false,
  };
}
