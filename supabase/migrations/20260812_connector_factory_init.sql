-- DRAWDOWN OS — MARKETPLACE CONNECTOR FACTORY MIGRATION
-- MIGRATION: 20260812_connector_factory_init.sql

-- =======
-- ENUMS
-- =======
CREATE TYPE connector_category AS ENUM (
  'DIRECT_API', 'OAUTH_API', 'API_KEY', 'WEBHOOK_ONLY', 
  'READ_ONLY_API', 'REPORT_IMPORT', 'AGGREGATOR', 
  'MANUAL_PORTAL', 'HYBRID', 'CUSTOM', 'RESEARCH_REQUIRED'
);

CREATE TYPE capability_status AS ENUM (
  'SUPPORTED', 'UNSUPPORTED', 'PARTIAL', 'UNKNOWN', 'RESEARCH_REQUIRED'
);

CREATE TYPE action_cert_level AS ENUM (
  'UNCERTIFIED', 'RESEARCHED', 'CONFIGURED', 'CONNECTED', 
  'READ_CERTIFIED', 'WRITE_CERTIFIED', 'AUTOPILOT_CERTIFIED', 
  'DEGRADED', 'SUSPENDED'
);

CREATE TYPE token_health_status AS ENUM (
  'CONNECTED', 'TOKEN_HEALTHY', 'TOKEN_EXPIRING', 
  'TOKEN_EXPIRED', 'REAUTHORISATION_REQUIRED', 'INVALID', 'UNKNOWN'
);

-- ===================================
-- 1. CONNECTOR MANIFESTS & VERSIONS
-- ===================================
CREATE TABLE IF NOT EXISTS connector_manifests (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  current_version VARCHAR(20) NOT NULL DEFAULT '1.0.0',
  category connector_category NOT NULL DEFAULT 'DIRECT_API',
  official_website VARCHAR(500),
  official_docs_url VARCHAR(500),
  manifest_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS connector_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connector_id VARCHAR(100) NOT NULL REFERENCES connector_manifests(id) ON DELETE CASCADE,
  connector_version VARCHAR(20) NOT NULL,
  api_version VARCHAR(50) NOT NULL,
  manifest_version VARCHAR(20) NOT NULL,
  certification_version VARCHAR(20) NOT NULL,
  change_log TEXT,
  deprecated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(connector_id, connector_version)
);

-- ===================================
-- 2. CAPABILITIES & EVIDENCE
-- ===================================
CREATE TABLE IF NOT EXISTS connector_capabilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connector_id VARCHAR(100) NOT NULL REFERENCES connector_manifests(id) ON DELETE CASCADE,
  capability_key VARCHAR(100) NOT NULL,
  status capability_status NOT NULL DEFAULT 'RESEARCH_REQUIRED',
  evidence_source VARCHAR(255),
  documentation_url TEXT,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES profiles(id),
  confidence_score INT NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(connector_id, capability_key)
);

-- ===================================
-- 3. MARKETPLACE ACCOUNTS
-- ===================================
CREATE TABLE IF NOT EXISTS marketplace_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connector_id VARCHAR(100) NOT NULL REFERENCES connector_manifests(id) ON DELETE CASCADE,
  account_name VARCHAR(255) NOT NULL,
  legal_entity VARCHAR(255) NOT NULL DEFAULT 'Drawdown Publishing Ltd',
  territory VARCHAR(10) NOT NULL DEFAULT 'GB',
  currency VARCHAR(10) NOT NULL DEFAULT 'GBP',
  environment VARCHAR(20) NOT NULL DEFAULT 'PRODUCTION', -- 'DEVELOPMENT' | 'TEST' | 'SANDBOX' | 'PRODUCTION'
  auth_type VARCHAR(50) NOT NULL DEFAULT 'OAUTH_2',
  token_health token_health_status NOT NULL DEFAULT 'UNKNOWN',
  credentials_encrypted JSONB NOT NULL DEFAULT '{}'::jsonb,
  granted_scopes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  seller_id VARCHAR(255),
  external_account_id VARCHAR(255),
  seller_dashboard_url TEXT,
  last_health_check_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===================================
-- 4. FIELD MAPPINGS & TRANSFORMS
-- ===================================
CREATE TABLE IF NOT EXISTS connector_field_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connector_id VARCHAR(100) NOT NULL REFERENCES connector_manifests(id) ON DELETE CASCADE,
  drawdown_field VARCHAR(255) NOT NULL,
  target_field VARCHAR(255) NOT NULL,
  transform_rule VARCHAR(100) NOT NULL DEFAULT 'DIRECT', -- 'DIRECT' | 'TRUNCATE' | 'STRIP_HTML' | 'SLUGIFY' | 'CURRENCY' | 'ENUM_MAP'
  is_required BOOLEAN NOT NULL DEFAULT FALSE,
  sample_value TEXT,
  validation_regex TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(connector_id, drawdown_field, target_field)
);

-- ===================================
-- 5. ACTION-LEVEL CERTIFICATIONS
-- ===================================
CREATE TABLE IF NOT EXISTS connector_action_certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connector_id VARCHAR(100) NOT NULL REFERENCES connector_manifests(id) ON DELETE CASCADE,
  action_type VARCHAR(100) NOT NULL, -- e.g. 'READ_LISTINGS', 'CREATE_LISTING', 'UPDATE_PRICE'
  cert_level action_cert_level NOT NULL DEFAULT 'UNCERTIFIED',
  autopilot_eligible BOOLEAN NOT NULL DEFAULT FALSE,
  evidence_notes TEXT,
  certified_at TIMESTAMPTZ,
  certified_by UUID REFERENCES profiles(id),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(connector_id, action_type)
);

-- ===================================
-- 6. WEBHOOKS & REPORT TEMPLATES
-- ===================================
CREATE TABLE IF NOT EXISTS connector_webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connector_id VARCHAR(100) NOT NULL REFERENCES connector_manifests(id) ON DELETE CASCADE,
  canonical_event VARCHAR(100) NOT NULL,
  external_event_type VARCHAR(100) NOT NULL,
  signature_verified BOOLEAN NOT NULL DEFAULT FALSE,
  raw_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  processing_status VARCHAR(50) NOT NULL DEFAULT 'RECEIVED', -- 'RECEIVED' | 'PROCESSED' | 'FAILED' | 'IGNORED'
  error_message TEXT,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS connector_report_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connector_id VARCHAR(100) NOT NULL REFERENCES connector_manifests(id) ON DELETE CASCADE,
  report_type VARCHAR(50) NOT NULL, -- 'SALES' | 'ORDERS' | 'ROYALTIES' | 'REFUNDS' | 'PAYOUTS'
  file_format VARCHAR(10) NOT NULL DEFAULT 'CSV',
  delimiter VARCHAR(5) NOT NULL DEFAULT ',',
  header_mapping_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===================================
-- RLS POLICIES
-- ===================================
ALTER TABLE connector_manifests ENABLE ROW LEVEL SECURITY;
ALTER TABLE connector_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE connector_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE connector_field_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE connector_action_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE connector_webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE connector_report_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated read/write connector_manifests" ON connector_manifests FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write connector_versions" ON connector_versions FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write connector_capabilities" ON connector_capabilities FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write marketplace_accounts" ON marketplace_accounts FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write connector_field_mappings" ON connector_field_mappings FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write connector_action_certifications" ON connector_action_certifications FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write connector_webhooks" ON connector_webhooks FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write connector_report_templates" ON connector_report_templates FOR ALL USING (true);
