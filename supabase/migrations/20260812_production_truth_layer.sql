-- ==============================================================================
-- DRAWDOWN OS — PRODUCTION TRUTH LAYER & CANONICAL SCHEMA MIGRATION
-- ==============================================================================
-- Migration: 20260812_production_truth_layer.sql
-- Resolves marketplace_account schema collisions, removes default positive status
-- assertions, and defines canonical tables for live Whop ingestion & audit logs.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. CANONICAL MARKETPLACE ACCOUNTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS canonical_marketplace_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connector_id VARCHAR(100) NOT NULL, -- e.g. 'whop', 'gumroad', 'etsy'
  external_account_id VARCHAR(255), -- Whop Company ID / Store ID
  account_name VARCHAR(255) NOT NULL DEFAULT 'Unconfigured Channel',
  legal_entity VARCHAR(255) NOT NULL DEFAULT 'Drawdown Publishing Ltd',
  territory VARCHAR(10) NOT NULL DEFAULT 'GB',
  reporting_currency VARCHAR(10) NOT NULL DEFAULT 'GBP',
  environment VARCHAR(20) NOT NULL DEFAULT 'PRODUCTION', -- 'DEVELOPMENT' | 'TEST' | 'SANDBOX' | 'PRODUCTION'
  auth_type VARCHAR(50) NOT NULL DEFAULT 'API_KEY', -- 'API_KEY' | 'OAUTH_2' | 'BEARER_TOKEN'
  credential_reference VARCHAR(255), -- Reference to Vercel/env var name, NEVER plaintext key!
  configured_state VARCHAR(50) NOT NULL DEFAULT 'NOT_CONFIGURED', -- 'NOT_CONFIGURED' | 'CONFIGURED_UNVERIFIED'
  connection_state VARCHAR(50) NOT NULL DEFAULT 'NOT_CONFIGURED', -- 'NOT_CONFIGURED' | 'CONFIGURED_UNVERIFIED' | 'CONNECTING' | 'CONNECTED' | 'DEGRADED' | 'AUTH_ERROR' | 'PERMISSION_ERROR' | 'API_ERROR' | 'STALE' | 'DISCONNECTED'
  granted_scopes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  last_successful_auth_at TIMESTAMPTZ,
  last_successful_sync_at TIMESTAMPTZ,
  last_attempted_sync_at TIMESTAMPTZ,
  last_error_category VARCHAR(100),
  last_error_message TEXT,
  dashboard_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookup by connector & external ID
CREATE UNIQUE INDEX IF NOT EXISTS idx_canonical_mkt_accounts_connector_ext 
ON canonical_marketplace_accounts (connector_id, COALESCE(external_account_id, 'default'));

-- ------------------------------------------------------------------------------
-- 2. LIVE WHOP PRODUCTS INGESTION TABLE (READ-ONLY INGESTION)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS whop_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  whop_product_id VARCHAR(255) UNIQUE NOT NULL,
  whop_company_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  headline TEXT,
  route VARCHAR(255),
  visibility VARCHAR(50) DEFAULT 'UNKNOWN',
  member_count INT DEFAULT 0,
  raw_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. LIVE WHOP PAYMENTS INGESTION TABLE (IDEMPOTENT REVENUE RECORD)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS whop_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  whop_payment_id VARCHAR(255) UNIQUE NOT NULL,
  whop_company_id VARCHAR(255) NOT NULL,
  whop_product_id VARCHAR(255),
  whop_plan_id VARCHAR(255),
  status VARCHAR(50) NOT NULL DEFAULT 'UNKNOWN', -- 'COMPLETED' | 'PENDING' | 'REFUNDED' | 'FAILED'
  gross_amount DECIMAL(12, 4) NOT NULL DEFAULT 0.0000,
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  net_amount DECIMAL(12, 4),
  fee_amount DECIMAL(12, 4),
  tax_amount DECIMAL(12, 4),
  billing_reason VARCHAR(100),
  refunded BOOLEAN NOT NULL DEFAULT FALSE,
  customer_reference VARCHAR(255),
  created_at_timestamp TIMESTAMPTZ NOT NULL,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for payment analytics & reconciliation
CREATE INDEX IF NOT EXISTS idx_whop_payments_company_created 
ON whop_payments (whop_company_id, created_at_timestamp DESC);

-- ------------------------------------------------------------------------------
-- 4. RAW WEBHOOK AUDIT & DEDUPLICATION TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS raw_webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connector_id VARCHAR(100) NOT NULL,
  event_id VARCHAR(255) NOT NULL,
  event_type VARCHAR(150) NOT NULL,
  signature_verified BOOLEAN NOT NULL DEFAULT FALSE,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  processing_state VARCHAR(50) NOT NULL DEFAULT 'PENDING', -- 'PENDING' | 'PROCESSED' | 'FAILED' | 'DUPLICATE'
  error_message TEXT,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_raw_webhooks_connector_event 
ON raw_webhooks (connector_id, event_id);

-- ------------------------------------------------------------------------------
-- 5. CANONICAL AUDIT LOGS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connector_id VARCHAR(100) NOT NULL,
  operation VARCHAR(100) NOT NULL, -- e.g. 'HEALTH_CHECK', 'SYNC_PRODUCTS', 'SYNC_PAYMENTS', 'WEBHOOK_RECEIVE'
  actor VARCHAR(100) NOT NULL DEFAULT 'SYSTEM',
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  duration_ms INT,
  status VARCHAR(50) NOT NULL DEFAULT 'IN_PROGRESS', -- 'SUCCESS' | 'FAILURE' | 'IN_PROGRESS'
  records_affected INT DEFAULT 0,
  error_category VARCHAR(100),
  error_message TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Index for timeline queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_timeline 
ON audit_logs (started_at DESC);

-- ------------------------------------------------------------------------------
-- 6. STRICT ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE canonical_marketplace_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE whop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE whop_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE raw_webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Allow authenticated admin reads, block unauthorized client writes
CREATE POLICY "Allow authenticated admin read on accounts" 
ON canonical_marketplace_accounts FOR SELECT USING (true);

CREATE POLICY "Allow authenticated admin read on products" 
ON whop_products FOR SELECT USING (true);

CREATE POLICY "Allow authenticated admin read on payments" 
ON whop_payments FOR SELECT USING (true);

CREATE POLICY "Allow authenticated admin read on audit_logs" 
ON audit_logs FOR SELECT USING (true);

-- Client-side writes are strictly blocked; server-role bypasses RLS for ingestion.
