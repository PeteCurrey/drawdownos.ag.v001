-- DRAWDOWN OS — EXECUTIVE INTELLIGENCE & CONTROL LAYER
-- Migration: 20260812_executive_intelligence_init.sql
-- Creates all tables required for the Executive operating brain.

-- ─── SIGNAL LAYER ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS executive_signals (
  id                  TEXT PRIMARY KEY,
  type                TEXT NOT NULL,
  source              TEXT NOT NULL,
  severity            TEXT NOT NULL CHECK (severity IN ('INFO','WATCH','IMPORTANT','ACTION_REQUIRED','CRITICAL')),
  entity_type         TEXT NOT NULL,
  entity_id           TEXT,
  entity_name         TEXT NOT NULL,
  metric_name         TEXT NOT NULL,
  current_value       NUMERIC,
  previous_value      NUMERIC,
  delta_absolute      NUMERIC,
  delta_pct           NUMERIC,
  threshold           NUMERIC,
  detected_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_demo             BOOLEAN NOT NULL DEFAULT FALSE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── INSIGHT LAYER ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS executive_insights (
  id                      TEXT PRIMARY KEY,
  signal_ids              TEXT[] NOT NULL DEFAULT '{}',
  category                TEXT NOT NULL,
  status                  TEXT NOT NULL DEFAULT 'NEW'
                            CHECK (status IN ('NEW','WATCHING','RECOMMENDED','APPROVAL_REQUIRED',
                                              'ACTIONED','RESOLVED','DISMISSED','SNOOZED','ARCHIVED')),
  title                   TEXT NOT NULL,
  narrative               TEXT NOT NULL,
  why_it_matters          TEXT,
  financial_exposure_gbp  NUMERIC DEFAULT 0,
  affected_entity_names   TEXT[] DEFAULT '{}',
  likely_cause            TEXT,
  is_demo                 BOOLEAN NOT NULL DEFAULT FALSE,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── PRIORITY ENGINE ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS executive_priorities (
  id                      TEXT PRIMARY KEY,
  rank                    INTEGER NOT NULL,
  insight_id              TEXT REFERENCES executive_insights(id) ON DELETE SET NULL,
  category                TEXT NOT NULL,
  title                   TEXT NOT NULL,
  subtitle                TEXT,
  priority_score          NUMERIC NOT NULL DEFAULT 0,
  score_components        JSONB NOT NULL DEFAULT '{}',
  why_it_matters          TEXT,
  recommended_action      TEXT,
  impact_30d_low_gbp      NUMERIC DEFAULT 0,
  impact_30d_high_gbp     NUMERIC DEFAULT 0,
  confidence              TEXT NOT NULL DEFAULT 'MODERATE',
  confidence_pct          NUMERIC DEFAULT 50,
  effort_hours            NUMERIC,
  reversible              BOOLEAN DEFAULT TRUE,
  approval_required       BOOLEAN DEFAULT FALSE,
  autonomy_eligible       BOOLEAN DEFAULT FALSE,
  evidence                JSONB DEFAULT '{}',
  why_ranked_here         TEXT,
  is_demo                 BOOLEAN NOT NULL DEFAULT FALSE,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── OBJECTIVES ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS executive_objectives (
  id                          TEXT PRIMARY KEY,
  natural_language            TEXT NOT NULL,
  parsed                      JSONB NOT NULL DEFAULT '{}',
  status                      TEXT NOT NULL DEFAULT 'DRAFT'
                                CHECK (status IN ('DRAFT','ACTIVE','AT_RISK','ON_TRACK','EXCEEDED','FAILED','PAUSED','COMPLETED','CANCELLED')),
  baseline_value              NUMERIC DEFAULT 0,
  current_value               NUMERIC DEFAULT 0,
  target_value                NUMERIC NOT NULL,
  expected_value              NUMERIC,
  progress_pct                NUMERIC DEFAULT 0,
  days_remaining              INTEGER DEFAULT 0,
  success_probability_pct     NUMERIC DEFAULT 50,
  why_probability             TEXT,
  experiments_running         INTEGER DEFAULT 0,
  actions_completed           INTEGER DEFAULT 0,
  actions_queued              INTEGER DEFAULT 0,
  is_demo                     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  review_date                 TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS objective_strategy_elements (
  id                  TEXT PRIMARY KEY,
  objective_id        TEXT NOT NULL REFERENCES executive_objectives(id) ON DELETE CASCADE,
  title               TEXT NOT NULL,
  hypothesis          TEXT,
  expected_impact_gbp NUMERIC DEFAULT 0,
  confidence          TEXT DEFAULT 'MODERATE',
  cost_gbp            NUMERIC DEFAULT 0,
  effort_hours        NUMERIC DEFAULT 0,
  risk                TEXT DEFAULT 'MEDIUM',
  owner_module        TEXT,
  autonomy_status     TEXT DEFAULT 'MANUAL',
  start_date          DATE,
  evaluation_date     DATE,
  success_metric      TEXT,
  status              TEXT DEFAULT 'NOT_STARTED',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── SCENARIOS ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS executive_scenarios (
  id                              TEXT PRIMARY KEY,
  name                            TEXT NOT NULL,
  description                     TEXT,
  assumptions                     JSONB DEFAULT '[]',
  base_case                       JSONB DEFAULT '{}',
  bull_case                       JSONB DEFAULT '{}',
  bear_case                       JSONB DEFAULT '{}',
  recommended_case                JSONB DEFAULT '{}',
  monte_carlo_low_gbp             NUMERIC,
  monte_carlo_median_gbp          NUMERIC,
  monte_carlo_high_gbp            NUMERIC,
  monte_carlo_prob_above_target   NUMERIC,
  monte_carlo_confidence          TEXT DEFAULT 'MODERATE',
  recommendation                  TEXT,
  what_would_change_mind          TEXT[] DEFAULT '{}',
  is_demo                         BOOLEAN NOT NULL DEFAULT FALSE,
  created_at                      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── DECISIONS ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS executive_decisions (
  id                          TEXT PRIMARY KEY,
  title                       TEXT NOT NULL,
  description                 TEXT,
  rationale                   TEXT,
  expected_result_description TEXT,
  expected_impact_gbp         NUMERIC DEFAULT 0,
  actual_impact_gbp           NUMERIC,
  decided_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  decided_by                  TEXT NOT NULL DEFAULT 'CEO',
  review_date                 TIMESTAMPTZ,
  reviewed_at                 TIMESTAMPTZ,
  outcome                     TEXT CHECK (outcome IN ('POSITIVE','NEGATIVE','NEUTRAL','PENDING','INSUFFICIENT_DATA')),
  outcome_narrative           TEXT,
  forecast_accuracy_pct       NUMERIC,
  related_objective_id        TEXT REFERENCES executive_objectives(id) ON DELETE SET NULL,
  is_demo                     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── RISKS ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS executive_risks (
  id              TEXT PRIMARY KEY,
  category        TEXT NOT NULL,
  title           TEXT NOT NULL,
  description     TEXT,
  likelihood      NUMERIC NOT NULL DEFAULT 50 CHECK (likelihood BETWEEN 0 AND 100),
  impact          NUMERIC NOT NULL DEFAULT 50 CHECK (impact BETWEEN 0 AND 100),
  velocity        TEXT NOT NULL DEFAULT 'MEDIUM',
  exposure_gbp    NUMERIC DEFAULT 0,
  mitigation      TEXT,
  owner           TEXT,
  status          TEXT NOT NULL DEFAULT 'ACTIVE'
                    CHECK (status IN ('ACTIVE','MITIGATED','ACCEPTED','MONITORING','ESCALATED')),
  trigger_condition TEXT,
  review_date     TIMESTAMPTZ,
  is_demo         BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── OPPORTUNITIES ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS executive_opportunities (
  id                          TEXT PRIMARY KEY,
  category                    TEXT NOT NULL,
  title                       TEXT NOT NULL,
  description                 TEXT,
  estimated_annual_value_gbp  NUMERIC DEFAULT 0,
  expected_30d_gbp            NUMERIC DEFAULT 0,
  expected_90d_gbp            NUMERIC DEFAULT 0,
  implementation_cost_gbp     NUMERIC DEFAULT 0,
  effort_hours                NUMERIC DEFAULT 0,
  time_to_first_revenue_days  INTEGER DEFAULT 0,
  success_probability_pct     NUMERIC DEFAULT 50,
  opportunity_score           NUMERIC DEFAULT 0,
  scalability                 TEXT DEFAULT 'MEDIUM',
  automation_potential        TEXT DEFAULT 'NONE',
  reversibility               TEXT DEFAULT 'EASY',
  downside                    TEXT,
  confidence                  TEXT DEFAULT 'MODERATE',
  related_product_skus        TEXT[] DEFAULT '{}',
  related_marketplace_ids     TEXT[] DEFAULT '{}',
  is_demo                     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── FORECASTS ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS executive_forecasts (
  id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  period_days         INTEGER NOT NULL CHECK (period_days IN (7,30,90,365)),
  label               TEXT NOT NULL,
  gross_revenue_gbp   NUMERIC DEFAULT 0,
  net_revenue_gbp     NUMERIC DEFAULT 0,
  contribution_gbp    NUMERIC DEFAULT 0,
  orders_count        INTEGER DEFAULT 0,
  avg_order_value_gbp NUMERIC DEFAULT 0,
  refund_count        INTEGER DEFAULT 0,
  best_case_gbp       NUMERIC DEFAULT 0,
  worst_case_gbp      NUMERIC DEFAULT 0,
  confidence          TEXT DEFAULT 'MODERATE',
  drivers             JSONB DEFAULT '[]',
  generated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── ALERTS ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS executive_alerts (
  id                  TEXT PRIMARY KEY,
  severity            TEXT NOT NULL,
  title               TEXT NOT NULL,
  body                TEXT,
  source              TEXT,
  linked_insight_id   TEXT REFERENCES executive_insights(id) ON DELETE SET NULL,
  is_read             BOOLEAN NOT NULL DEFAULT FALSE,
  is_demo             BOOLEAN NOT NULL DEFAULT FALSE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── APPROVALS ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS executive_approvals (
  id                      TEXT PRIMARY KEY,
  requested_action        TEXT NOT NULL,
  requesting_module       TEXT NOT NULL,
  reason                  TEXT,
  financial_impact_gbp    NUMERIC DEFAULT 0,
  confidence_pct          NUMERIC DEFAULT 50,
  downside                TEXT,
  reversible              BOOLEAN DEFAULT TRUE,
  deadline                TIMESTAMPTZ,
  linked_objective_id     TEXT REFERENCES executive_objectives(id) ON DELETE SET NULL,
  status                  TEXT NOT NULL DEFAULT 'PENDING'
                            CHECK (status IN ('PENDING','APPROVED','REJECTED','MODIFIED','DELEGATED','EXPIRED')),
  decided_at              TIMESTAMPTZ,
  decided_by              TEXT,
  decision_note           TEXT,
  is_demo                 BOOLEAN NOT NULL DEFAULT FALSE,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── INTERVENTION RULES ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS intervention_rules (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT,
  metric      TEXT NOT NULL,
  operator    TEXT NOT NULL CHECK (operator IN ('GREATER_THAN','LESS_THAN','EQUALS')),
  threshold   NUMERIC NOT NULL,
  unit        TEXT,
  level       INTEGER NOT NULL CHECK (level BETWEEN 0 AND 5),
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  is_demo     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── EXECUTIVE PREFERENCES ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS executive_preferences (
  id                      TEXT PRIMARY KEY DEFAULT 'singleton',
  revenue_target_gbp      NUMERIC DEFAULT 120000,
  contribution_target_gbp NUMERIC DEFAULT 55000,
  refund_ceiling_pct      NUMERIC DEFAULT 5.0,
  growth_target_pct       NUMERIC DEFAULT 25,
  risk_tolerance          TEXT DEFAULT 'BALANCED',
  time_horizon            TEXT DEFAULT 'MEDIUM',
  autonomy_mode           TEXT DEFAULT 'OPERATOR',
  priority_weights        JSONB DEFAULT '{}',
  daily_brief_enabled     BOOLEAN DEFAULT TRUE,
  weekly_review_enabled   BOOLEAN DEFAULT TRUE,
  monthly_report_enabled  BOOLEAN DEFAULT TRUE,
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── ACTIVITY LOG (IMMUTABLE AUDIT) ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS executive_activity_log (
  id            BIGSERIAL PRIMARY KEY,
  event_type    TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'CEO',
  actor_type    TEXT NOT NULL DEFAULT 'HUMAN' CHECK (actor_type IN ('HUMAN','AI','AUTOPILOT','SYSTEM')),
  entity_type   TEXT,
  entity_id     TEXT,
  description   TEXT NOT NULL,
  before_state  JSONB,
  after_state   JSONB,
  source_data   JSONB,
  is_demo       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── INDEXES ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_exec_signals_type_severity ON executive_signals(type, severity);
CREATE INDEX IF NOT EXISTS idx_exec_signals_entity ON executive_signals(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_exec_insights_status ON executive_insights(status);
CREATE INDEX IF NOT EXISTS idx_exec_insights_category ON executive_insights(category);
CREATE INDEX IF NOT EXISTS idx_exec_priorities_rank ON executive_priorities(rank);
CREATE INDEX IF NOT EXISTS idx_exec_objectives_status ON executive_objectives(status);
CREATE INDEX IF NOT EXISTS idx_exec_risks_status ON executive_risks(status, likelihood, impact);
CREATE INDEX IF NOT EXISTS idx_exec_opportunities_score ON executive_opportunities(opportunity_score DESC);
CREATE INDEX IF NOT EXISTS idx_exec_approvals_status ON executive_approvals(status, created_at);
CREATE INDEX IF NOT EXISTS idx_exec_alerts_severity ON executive_alerts(severity, is_read, created_at);
CREATE INDEX IF NOT EXISTS idx_exec_activity_log_created ON executive_activity_log(created_at DESC);
