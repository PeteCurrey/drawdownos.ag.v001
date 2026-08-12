-- DRAWDOWN OS — AUTONOMOUS EXPERIMENTATION & OPTIMISATION ENGINE
-- Migration: 20260812_experimentation_engine_init.sql

CREATE TABLE IF NOT EXISTS experiments (
  id                        TEXT PRIMARY KEY,
  name                      TEXT NOT NULL,
  type                      TEXT NOT NULL,
  subtype                   TEXT NOT NULL,
  state                     TEXT NOT NULL DEFAULT 'IDEA',
  health                    TEXT NOT NULL DEFAULT 'HEALTHY',
  autonomy_level            TEXT NOT NULL DEFAULT 'MANUAL',
  product_sku               TEXT NOT NULL,
  product_name              TEXT NOT NULL,
  marketplace_id            TEXT,
  marketplace_name          TEXT,
  territory                 TEXT,
  linked_objective_id       TEXT,
  primary_metric            TEXT NOT NULL DEFAULT 'NET_CONTRIBUTION',
  platform_capability       TEXT DEFAULT 'FULL_SPLIT',
  actual_start              TIMESTAMPTZ,
  actual_end                TIMESTAMPTZ,
  minimum_duration_days     INTEGER DEFAULT 14,
  maximum_duration_days     INTEGER DEFAULT 30,
  required_sample_size      INTEGER DEFAULT 250,
  current_sample            INTEGER DEFAULT 0,
  data_sufficiency          TEXT DEFAULT 'INSUFFICIENT',
  priority_score            NUMERIC DEFAULT 0,
  quality_score             NUMERIC DEFAULT 0,
  approval_status           TEXT DEFAULT 'APPROVED',
  created_by                TEXT DEFAULT 'HUMAN',
  is_demo                   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiment_hypotheses (
  id                          TEXT PRIMARY KEY,
  experiment_id               TEXT NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
  statement                   TEXT NOT NULL,
  primary_metric              TEXT NOT NULL,
  primary_direction          TEXT NOT NULL DEFAULT 'INCREASE',
  affected_entity             TEXT NOT NULL,
  baseline                    TEXT,
  proposed_change             TEXT,
  target                      TEXT,
  secondary_metrics           TEXT[] DEFAULT '{}',
  minimum_detectable_effect   NUMERIC DEFAULT 5,
  expected_impact_low_gbp     NUMERIC DEFAULT 0,
  expected_impact_high_gbp    NUMERIC DEFAULT 0,
  confidence                  TEXT DEFAULT 'MODERATE',
  supporting_evidence         TEXT[] DEFAULT '{}',
  author_type                 TEXT DEFAULT 'HUMAN',
  author_name                 TEXT,
  is_demo                     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiment_variants (
  id                      TEXT PRIMARY KEY,
  experiment_id           TEXT NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
  role                    TEXT NOT NULL CHECK (role IN ('CONTROL','VARIANT_A','VARIANT_B','VARIANT_C')),
  label                   TEXT NOT NULL,
  description             TEXT,
  changes                 JSONB DEFAULT '[]',
  traffic_allocation_pct  NUMERIC DEFAULT 50,
  is_active               BOOLEAN DEFAULT TRUE,
  is_demo                 BOOLEAN NOT NULL DEFAULT FALSE,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiment_measurements (
  id                      TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  experiment_id           TEXT NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
  variant_id              TEXT NOT NULL REFERENCES experiment_variants(id) ON DELETE CASCADE,
  measured_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  visitors                INTEGER DEFAULT 0,
  orders                  INTEGER DEFAULT 0,
  gross_revenue_gbp       NUMERIC DEFAULT 0,
  net_revenue_gbp         NUMERIC DEFAULT 0,
  contribution_gbp        NUMERIC DEFAULT 0,
  refunds                 INTEGER DEFAULT 0,
  refund_rate_pct         NUMERIC DEFAULT 0,
  conversion_rate_pct     NUMERIC DEFAULT 0,
  avg_order_value_gbp     NUMERIC DEFAULT 0,
  is_demo                 BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS experiment_results (
  id                          TEXT PRIMARY KEY,
  experiment_id               TEXT NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
  outcome                     TEXT NOT NULL,
  bayesian_result             JSONB NOT NULL DEFAULT '{}',
  practical_significance      JSONB NOT NULL DEFAULT '{}',
  incremental_contribution_gbp NUMERIC DEFAULT 0,
  annualised_value_gbp        NUMERIC DEFAULT 0,
  implementation_cost_gbp     NUMERIC DEFAULT 0,
  roi                         NUMERIC DEFAULT 0,
  human_hours_spent           NUMERIC DEFAULT 0,
  recommendation              TEXT NOT NULL,
  decision_rationale          TEXT,
  learning_generated          BOOLEAN DEFAULT FALSE,
  evaluated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_demo                     BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS experiment_learnings (
  id                          TEXT PRIMARY KEY,
  type                        TEXT NOT NULL,
  scope                       TEXT NOT NULL,
  title                       TEXT NOT NULL,
  statement                   TEXT NOT NULL,
  implication                 TEXT,
  experiment_ids              TEXT[] DEFAULT '{}',
  product_skus                TEXT[] DEFAULT '{}',
  marketplace_ids             TEXT[] DEFAULT '{}',
  territories                 TEXT[] DEFAULT '{}',
  total_customers_in_evidence INTEGER DEFAULT 0,
  confidence                  TEXT DEFAULT 'MODERATE',
  evidence_count              INTEGER DEFAULT 1,
  is_contradicted             BOOLEAN DEFAULT FALSE,
  current_relevance           TEXT DEFAULT 'HIGH',
  is_demo                     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_validated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiment_opportunities (
  id                          TEXT PRIMARY KEY,
  source                      TEXT NOT NULL,
  experiment_type             TEXT NOT NULL,
  experiment_subtype          TEXT NOT NULL,
  title                       TEXT NOT NULL,
  knowledge_gap               TEXT,
  hypothesis                  TEXT,
  expected_value_low_gbp      NUMERIC DEFAULT 0,
  expected_value_high_gbp     NUMERIC DEFAULT 0,
  learning_value_scope        TEXT DEFAULT 'LOCAL',
  priority_score              NUMERIC DEFAULT 0,
  effort                      TEXT DEFAULT 'LOW',
  risk                        TEXT DEFAULT 'LOW',
  reversibility               TEXT DEFAULT 'EASY',
  related_product_sku         TEXT,
  related_marketplace_id      TEXT,
  territory                   TEXT,
  linked_objective_id         TEXT,
  is_demo                     BOOLEAN NOT NULL DEFAULT FALSE,
  detected_at                 TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiment_rollouts (
  id                      TEXT PRIMARY KEY,
  experiment_id           TEXT NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
  winner_variant_id       TEXT NOT NULL,
  status                  TEXT NOT NULL DEFAULT 'PLANNED',
  phases                  JSONB DEFAULT '[]',
  post_rollout_checks     JSONB DEFAULT '[]',
  is_demo                 BOOLEAN NOT NULL DEFAULT FALSE,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiment_rollbacks (
  id                      TEXT PRIMARY KEY,
  experiment_id           TEXT NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
  variant_id              TEXT NOT NULL,
  field                   TEXT NOT NULL,
  original_value          TEXT,
  changed_value           TEXT,
  changed_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  affected_entity_type    TEXT,
  affected_entity_id      TEXT,
  rollback_method         TEXT DEFAULT 'AUTOMATIC',
  rolled_back_at          TIMESTAMPTZ,
  rolled_back_by          TEXT,
  is_demo                 BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS experiment_conflicts (
  id              TEXT PRIMARY KEY,
  experiment_a_id TEXT NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
  experiment_b_id TEXT NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
  conflict_type   TEXT NOT NULL,
  reason          TEXT,
  severity        TEXT NOT NULL DEFAULT 'MEDIUM',
  resolution      TEXT DEFAULT 'PENDING',
  resolved_at     TIMESTAMPTZ,
  is_demo         BOOLEAN NOT NULL DEFAULT FALSE
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_exp_state ON experiments(state);
CREATE INDEX IF NOT EXISTS idx_exp_type ON experiments(type);
CREATE INDEX IF NOT EXISTS idx_exp_priority ON experiments(priority_score DESC);
CREATE INDEX IF NOT EXISTS idx_exp_learnings_type ON experiment_learnings(type);
CREATE INDEX IF NOT EXISTS idx_exp_opps_score ON experiment_opportunities(priority_score DESC);
