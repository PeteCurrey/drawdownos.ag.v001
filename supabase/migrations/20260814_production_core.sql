-- DRAWDOWN OS — PRODUCTION CORE SCHEMA
-- Migration: 20260814_production_core.sql
-- Creates core tables IF NOT EXISTS. Does not drop existing tables.
-- All tables use UUID primary keys and timestamptz timestamps.

-- Enable uuid extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PUBLICATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS publications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  author TEXT NOT NULL DEFAULT '',
  slug TEXT UNIQUE,
  description TEXT,
  short_description TEXT,
  language TEXT NOT NULL DEFAULT 'en',
  edition TEXT,
  isbn TEXT,
  publication_date DATE,
  copyright TEXT,
  default_currency TEXT NOT NULL DEFAULT 'GBP',
  default_price NUMERIC(10,2),
  status TEXT NOT NULL DEFAULT 'DRAFT'
    CHECK (status IN ('DRAFT','READY','LIVE','ARCHIVED','BLOCKED')),
  cover_file_id UUID,
  master_file_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- PUBLICATION FILES (R2 asset records)
-- ============================================
CREATE TABLE IF NOT EXISTS publication_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  publication_id UUID NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
  file_role TEXT NOT NULL
    CHECK (file_role IN ('MASTER_PDF','COVER','THUMBNAIL','PREVIEW','EPUB','KPF','OTHER')),
  filename TEXT NOT NULL,
  r2_object_key TEXT NOT NULL UNIQUE,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT,
  checksum TEXT,
  version TEXT NOT NULL DEFAULT 'v1.0',
  is_current BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add FK from publications to files after files table created
ALTER TABLE publications
  ADD COLUMN IF NOT EXISTS cover_file_id UUID REFERENCES publication_files(id) ON DELETE SET NULL;
ALTER TABLE publications
  ADD COLUMN IF NOT EXISTS master_file_id UUID REFERENCES publication_files(id) ON DELETE SET NULL;

-- ============================================
-- MARKETPLACES (registry of distribution opportunities)
-- ============================================
CREATE TABLE IF NOT EXISTS marketplaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  website_url TEXT,
  portal_url TEXT,
  registration_url TEXT,
  region TEXT,
  countries TEXT[],
  priority INT NOT NULL DEFAULT 3 CHECK (priority BETWEEN 1 AND 4),
  distribution_method TEXT NOT NULL DEFAULT 'MANUAL'
    CHECK (distribution_method IN ('API','MANUAL','AGGREGATOR','HYBRID')),
  api_available BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- MARKETPLACE ACCOUNTS (our registration/connection state)
-- ============================================
CREATE TABLE IF NOT EXISTS marketplace_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  marketplace_id UUID NOT NULL REFERENCES marketplaces(id) ON DELETE CASCADE,
  registered BOOLEAN NOT NULL DEFAULT FALSE,
  registered_at TIMESTAMPTZ,
  management_method TEXT NOT NULL DEFAULT 'MANUAL'
    CHECK (management_method IN ('API','MANUAL')),
  connection_status TEXT NOT NULL DEFAULT 'NOT_REGISTERED'
    CHECK (connection_status IN ('NOT_REGISTERED','REGISTERED','NEEDS_CONFIGURATION','NEEDS_VERIFICATION','CONNECTED','MANUAL','ERROR')),
  external_account_id TEXT,
  last_verified_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- PUBLICATION LISTINGS (product listed on a marketplace)
-- ============================================
CREATE TABLE IF NOT EXISTS publication_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  publication_id UUID NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
  marketplace_id UUID NOT NULL REFERENCES marketplaces(id) ON DELETE CASCADE,
  marketplace_account_id UUID REFERENCES marketplace_accounts(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'NOT_STARTED'
    CHECK (status IN ('NOT_STARTED','PREPARING','READY_TO_LIST','LISTED','PAUSED','DELISTED','ERROR')),
  external_product_id TEXT,
  listing_url TEXT,
  currency TEXT NOT NULL DEFAULT 'GBP',
  price NUMERIC(10,2),
  management_method TEXT NOT NULL DEFAULT 'MANUAL'
    CHECK (management_method IN ('API','MANUAL')),
  published_at TIMESTAMPTZ,
  last_synced_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- SALES TRANSACTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS sales_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  publication_id UUID REFERENCES publications(id) ON DELETE SET NULL,
  marketplace_id UUID REFERENCES marketplaces(id) ON DELETE SET NULL,
  listing_id UUID REFERENCES publication_listings(id) ON DELETE SET NULL,
  order_id TEXT,
  gross_amount NUMERIC(10,2) NOT NULL,
  fees NUMERIC(10,2) NOT NULL DEFAULT 0,
  net_amount NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'GBP',
  status TEXT NOT NULL DEFAULT 'COMPLETED'
    CHECK (status IN ('PENDING','COMPLETED','REFUNDED','DISPUTED','CANCELLED')),
  transacted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  source TEXT NOT NULL DEFAULT 'MANUAL'
    CHECK (source IN ('API_IMPORT','MANUAL','WEBHOOK')),
  raw_payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- ACTIVITY LOG
-- ============================================
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT,
  entity_id UUID,
  action TEXT NOT NULL,
  description TEXT NOT NULL,
  actor TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- UPDATED_AT TRIGGERS
-- ============================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_publications_updated_at') THEN
    CREATE TRIGGER set_publications_updated_at
      BEFORE UPDATE ON publications
      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_marketplaces_updated_at') THEN
    CREATE TRIGGER set_marketplaces_updated_at
      BEFORE UPDATE ON marketplaces
      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_marketplace_accounts_updated_at') THEN
    CREATE TRIGGER set_marketplace_accounts_updated_at
      BEFORE UPDATE ON marketplace_accounts
      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_publication_listings_updated_at') THEN
    CREATE TRIGGER set_publication_listings_updated_at
      BEFORE UPDATE ON publication_listings
      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END;
$$;
