-- DRAWDOWN OS — REVENUE SURFACE AUTOPILOT SCHEMA & POLICIES
-- MIGRATION: 20260812_autopilot_init.sql

-- =======
-- ENUMS
-- =======
CREATE TYPE autopilot_mode AS ENUM ('OFF', 'ADVISORY', 'ASSISTED', 'AUTOPILOT');
CREATE TYPE autopilot_status AS ENUM ('OFF', 'ADVISORY', 'ASSISTED', 'ACTIVE', 'PAUSED', 'DEGRADED', 'EMERGENCY_STOP');
CREATE TYPE action_risk_class AS ENUM ('CLASS_A', 'CLASS_B', 'CLASS_C', 'CLASS_D');
CREATE TYPE autopilot_action_status AS ENUM (
  'PROPOSED', 'ANALYSING', 'READY', 'APPROVAL_REQUIRED', 'APPROVED', 
  'QUEUED', 'RUNNING', 'VERIFYING', 'COMPLETE', 'PARTIAL', 
  'BLOCKED', 'FAILED', 'CANCELLED', 'ROLLED_BACK'
);
CREATE TYPE connector_cert_status AS ENUM ('UNCERTIFIED', 'TESTING', 'CERTIFIED', 'SUSPENDED');

-- ===================================
-- 1. AUTOPILOT POLICIES & GUARDRAILS
-- ===================================
CREATE TABLE IF NOT EXISTS autopilot_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  mode autopilot_mode NOT NULL DEFAULT 'ADVISORY',
  status autopilot_status NOT NULL DEFAULT 'ADVISORY',
  auto_create_listings BOOLEAN NOT NULL DEFAULT FALSE,
  auto_update_listings BOOLEAN NOT NULL DEFAULT TRUE,
  auto_sync_prices BOOLEAN NOT NULL DEFAULT FALSE,
  auto_activate_aggregators BOOLEAN NOT NULL DEFAULT FALSE,
  auto_retry_failed_jobs BOOLEAN NOT NULL DEFAULT TRUE,
  auto_sync_assets BOOLEAN NOT NULL DEFAULT TRUE,
  auto_update_affiliate_assets BOOLEAN NOT NULL DEFAULT TRUE,
  auto_execute_campaigns BOOLEAN NOT NULL DEFAULT FALSE,
  auto_pause_on_blocking BOOLEAN NOT NULL DEFAULT TRUE,
  auto_derivative_creation VARCHAR(20) NOT NULL DEFAULT 'DRAFT_ONLY', -- 'OFF' | 'DRAFT_ONLY'
  auto_translation VARCHAR(20) NOT NULL DEFAULT 'DRAFT_ONLY',        -- 'OFF' | 'DRAFT_ONLY'
  
  -- Guardrails
  min_product_price_gbp NUMERIC(10,2) NOT NULL DEFAULT 9.99,
  max_autonomous_discount_pct NUMERIC(5,2) NOT NULL DEFAULT 20.00,
  max_autonomous_price_change_pct NUMERIC(5,2) NOT NULL DEFAULT 10.00,
  min_net_margin_pct NUMERIC(5,2) NOT NULL DEFAULT 60.00,
  max_marketplace_fee_pct NUMERIC(5,2) NOT NULL DEFAULT 35.00,
  max_affiliate_commission_pct NUMERIC(5,2) NOT NULL DEFAULT 40.00,
  allowed_currencies TEXT[] NOT NULL DEFAULT ARRAY['GBP', 'USD', 'EUR'],
  allowed_territories TEXT[] NOT NULL DEFAULT ARRAY['GB', 'US', 'CA', 'AU', 'DE', 'FR', 'ES'],
  
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES profiles(id)
);

-- ===================================
-- 2. CONNECTOR CERTIFICATIONS
-- ===================================
CREATE TABLE IF NOT EXISTS autopilot_connector_certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  marketplace_id VARCHAR(100) NOT NULL UNIQUE,
  marketplace_name VARCHAR(255) NOT NULL,
  status connector_cert_status NOT NULL DEFAULT 'UNCERTIFIED',
  capability_verified BOOLEAN NOT NULL DEFAULT FALSE,
  credentials_tested BOOLEAN NOT NULL DEFAULT FALSE,
  sandbox_tested BOOLEAN NOT NULL DEFAULT FALSE,
  idempotency_tested BOOLEAN NOT NULL DEFAULT FALSE,
  error_handling_tested BOOLEAN NOT NULL DEFAULT FALSE,
  rate_limits_verified BOOLEAN NOT NULL DEFAULT FALSE,
  rollback_supported BOOLEAN NOT NULL DEFAULT FALSE,
  human_approved_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===================================
-- 3. OBJECTIVES & ACTION PLANS
-- ===================================
CREATE TABLE IF NOT EXISTS autopilot_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  publication_id UUID REFERENCES publications(id) ON DELETE CASCADE,
  objective_type VARCHAR(100) NOT NULL, -- e.g. 'TARGET_RSA', 'EASY_WINS', 'ENGLISH_GLOBAL'
  objective_label VARCHAR(255) NOT NULL,
  created_by UUID REFERENCES profiles(id),
  mode autopilot_mode NOT NULL DEFAULT 'ADVISORY',
  status VARCHAR(50) NOT NULL DEFAULT 'PROPOSED', -- PROPOSED | IN_PROGRESS | COMPLETED | CANCELLED
  current_rsa NUMERIC(5,2) NOT NULL,
  target_rsa NUMERIC(5,2) NOT NULL,
  projected_rsa NUMERIC(5,2) NOT NULL,
  estimated_actions INT NOT NULL DEFAULT 0,
  estimated_effort_days INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- ===================================
-- 4. AUTOPILOT ACTIONS
-- ===================================
CREATE TABLE IF NOT EXISTS autopilot_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id UUID REFERENCES autopilot_plans(id) ON DELETE SET NULL,
  publication_id UUID REFERENCES publications(id) ON DELETE CASCADE,
  marketplace_id VARCHAR(100),
  action_type VARCHAR(100) NOT NULL, -- e.g. 'ACTIVATE_CHANNEL', 'SYNC_PRICE', 'GENERATE_EPUB', 'CLEAR_COMPLIANCE'
  entity_type VARCHAR(50) NOT NULL,   -- 'PUBLICATION' | 'LISTING' | 'FORMAT' | 'PRICING' | 'AFFILIATE'
  entity_id VARCHAR(100) NOT NULL,
  risk_class action_risk_class NOT NULL,
  automation_eligibility BOOLEAN NOT NULL DEFAULT FALSE,
  required_permissions TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  expected_surface_unlock NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  estimated_monthly_uplift_usd NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  opportunity_score INT NOT NULL DEFAULT 0,
  confidence_score INT NOT NULL DEFAULT 0,
  status autopilot_action_status NOT NULL DEFAULT 'PROPOSED',
  execution_mode autopilot_mode NOT NULL DEFAULT 'ADVISORY',
  
  -- Stored Json Payloads
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  dry_run_result JSONB,
  policy_result JSONB,
  compliance_result JSONB,
  execution_result JSONB,
  error_message TEXT,
  retry_count INT NOT NULL DEFAULT 0,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  scheduled_at TIMESTAMPTZ,
  executed_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  rolled_back_at TIMESTAMPTZ
);

-- Action Dependencies Graph
CREATE TABLE IF NOT EXISTS autopilot_action_dependencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action_id UUID NOT NULL REFERENCES autopilot_actions(id) ON DELETE CASCADE,
  depends_on_action_id UUID NOT NULL REFERENCES autopilot_actions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(action_id, depends_on_action_id)
);

-- ===================================
-- 5. HUMAN APPROVAL QUEUE
-- ===================================
CREATE TABLE IF NOT EXISTS autopilot_approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action_id UUID NOT NULL REFERENCES autopilot_actions(id) ON DELETE CASCADE,
  risk_class action_risk_class NOT NULL,
  reason_required TEXT NOT NULL,
  summary TEXT NOT NULL,
  expected_surface_unlock NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  estimated_monthly_uplift_usd NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  dry_run_summary JSONB NOT NULL DEFAULT '{}'::jsonb,
  status VARCHAR(50) NOT NULL DEFAULT 'PENDING', -- PENDING | APPROVED | REJECTED | DEFERRED
  decision_by UUID REFERENCES profiles(id),
  decision_at TIMESTAMPTZ,
  decision_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===================================
-- 6. CIRCUIT BREAKERS & INCIDENTS
-- ===================================
CREATE TABLE IF NOT EXISTS autopilot_circuit_breakers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  marketplace_id VARCHAR(100) NOT NULL UNIQUE,
  state VARCHAR(20) NOT NULL DEFAULT 'CLOSED', -- CLOSED | OPEN | HALF_OPEN
  failure_count INT NOT NULL DEFAULT 0,
  failure_threshold INT NOT NULL DEFAULT 5,
  last_failure_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  reset_timeout_sec INT NOT NULL DEFAULT 600, -- 10 minutes
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===================================
-- RLS POLICIES
-- ===================================
ALTER TABLE autopilot_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE autopilot_connector_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE autopilot_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE autopilot_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE autopilot_action_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE autopilot_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE autopilot_circuit_breakers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated read/write autopilot_policies" ON autopilot_policies FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write autopilot_connector_certifications" ON autopilot_connector_certifications FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write autopilot_plans" ON autopilot_plans FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write autopilot_actions" ON autopilot_actions FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write autopilot_action_dependencies" ON autopilot_action_dependencies FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write autopilot_approvals" ON autopilot_approvals FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write autopilot_circuit_breakers" ON autopilot_circuit_breakers FOR ALL USING (true);
