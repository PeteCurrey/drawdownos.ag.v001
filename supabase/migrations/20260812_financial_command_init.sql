-- ============================================================================
-- DRAWDOWN OS — FINANCIAL COMMAND
-- Migration: 20260812_financial_command_init.sql
-- Purpose: Relational schema for financial transactions, double-entry inspired ledger,
-- commercial account codes, payouts, receivables, bank reconciliation, tax data,
-- and monthly commercial snapshots.
-- ============================================================================

-- 1. TRANSACTION TYPE ENUM
DO $$ BEGIN
    CREATE TYPE financial_transaction_type AS ENUM (
        'SALE', 'REFUND', 'PARTIAL_REFUND', 'CHARGEBACK', 'MARKETPLACE_FEE',
        'PROCESSING_FEE', 'DISTRIBUTION_FEE', 'AFFILIATE_COMMISSION',
        'TAX_COLLECTED', 'TAX_WITHHELD', 'PROMOTION_COST', 'AD_SPEND',
        'ROYALTY', 'PAYOUT', 'FX_ADJUSTMENT', 'MANUAL_ADJUSTMENT'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. PAYOUT STATE ENUM
DO $$ BEGIN
    CREATE TYPE payout_state AS ENUM (
        'EXPECTED', 'SCHEDULED', 'PROCESSING', 'PAID', 'PARTIAL',
        'OVERDUE', 'RECONCILED', 'DISPUTED', 'UNKNOWN'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. FINANCIAL TRANSACTIONS
CREATE TABLE IF NOT EXISTS financial_transactions (
    id TEXT PRIMARY KEY,
    transaction_type financial_transaction_type NOT NULL,
    order_id TEXT,
    product_sku TEXT NOT NULL,
    marketplace_id TEXT NOT NULL,
    affiliate_id TEXT,
    campaign_id TEXT,
    territory_code TEXT DEFAULT 'GB',
    original_amount NUMERIC(12,2) NOT NULL,
    original_currency TEXT NOT NULL,
    reporting_amount NUMERIC(12,2) NOT NULL,
    reporting_currency TEXT DEFAULT 'GBP',
    fx_rate NUMERIC(10,4) DEFAULT 1.0000,
    fx_source TEXT DEFAULT 'DAILY_REFERENCE',
    transaction_at TIMESTAMPTZ DEFAULT NOW(),
    settlement_at TIMESTAMPTZ,
    status TEXT DEFAULT 'SETTLED',
    external_reference TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. FINANCIAL LEDGER ENTRIES (Double-Entry Inspired)
CREATE TABLE IF NOT EXISTS financial_ledger_entries (
    id TEXT PRIMARY KEY,
    journal_group_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    account_code TEXT NOT NULL, -- e.g. CUSTOMER_SALES, MARKETPLACE_FEES, CASH_RECEIVED
    entity_type TEXT,
    entity_id TEXT,
    debit_amount NUMERIC(12,2) DEFAULT 0.00,
    credit_amount NUMERIC(12,2) DEFAULT 0.00,
    currency TEXT DEFAULT 'GBP',
    reporting_amount NUMERIC(12,2) NOT NULL,
    description TEXT NOT NULL,
    external_reference TEXT,
    posted_at TIMESTAMPTZ DEFAULT NOW(),
    is_immutable BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. FINANCIAL PAYOUTS
CREATE TABLE IF NOT EXISTS financial_payouts (
    id TEXT PRIMARY KEY,
    marketplace_name TEXT NOT NULL,
    period_label TEXT NOT NULL,
    payout_currency TEXT NOT NULL,
    gross_sales_local NUMERIC(12,2) NOT NULL,
    fees_local NUMERIC(12,2) NOT NULL,
    refunds_local NUMERIC(12,2) NOT NULL,
    tax_local NUMERIC(12,2) DEFAULT 0.00,
    net_expected_gbp NUMERIC(12,2) NOT NULL,
    net_paid_gbp NUMERIC(12,2) DEFAULT 0.00,
    variance_gbp NUMERIC(12,2) DEFAULT 0.00,
    expected_payout_at TIMESTAMPTZ NOT NULL,
    payment_at TIMESTAMPTZ,
    state payout_state DEFAULT 'EXPECTED',
    bank_receipt_reference TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BANK TRANSACTIONS & RECONCILIATIONS
CREATE TABLE IF NOT EXISTS bank_transactions (
    id TEXT PRIMARY KEY,
    bank_account_name TEXT DEFAULT 'Drawdown Primary GBP',
    transaction_date TIMESTAMPTZ NOT NULL,
    description TEXT NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    currency TEXT DEFAULT 'GBP',
    matched_payout_id TEXT REFERENCES financial_payouts(id),
    match_status TEXT DEFAULT 'UNMATCHED', -- UNMATCHED, AUTO_MATCHED, MANUAL_MATCHED
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TAX RECORDS & DOCUMENTS
CREATE TABLE IF NOT EXISTS tax_records (
    id TEXT PRIMARY KEY,
    territory_code TEXT NOT NULL,
    marketplace_name TEXT NOT NULL,
    merchant_of_record TEXT NOT NULL, -- MARKETPLACE_FACILITATOR, SELLER_OF_RECORD
    tax_collected_gbp NUMERIC(12,2) DEFAULT 0.00,
    tax_withheld_gbp NUMERIC(12,2) DEFAULT 0.00,
    tax_status TEXT DEFAULT 'PLATFORM_HANDLED',
    period_label TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_fin_tx_sku ON financial_transactions(product_sku);
CREATE INDEX IF NOT EXISTS idx_fin_tx_mkt ON financial_transactions(marketplace_id);
CREATE INDEX IF NOT EXISTS idx_ledger_acct ON financial_ledger_entries(account_code);
CREATE INDEX IF NOT EXISTS idx_payouts_state ON financial_payouts(state);
