-- ============================================================================
-- DRAWDOWN OS — GROWTH COMMAND
-- Migration: 20260812_growth_command_init.sql
-- Purpose: Schema for growth channels, campaigns, audiences, affiliate pipeline,
-- tracking links, lead magnets, SEO opportunities, surface activation telemetry,
-- contribution attribution, and autopilot stop-loss policies.
-- ============================================================================

-- 1. CAMPAIGN TYPE & OBJECTIVE ENUMS
DO $$ BEGIN
    CREATE TYPE growth_channel_type AS ENUM (
        'OWNED_WEB', 'MARKETPLACE_ORGANIC', 'SEO', 'EMAIL', 'AFFILIATE',
        'REFERRAL', 'PARTNERSHIP', 'SOCIAL_ORGANIC', 'PAID_MEDIA',
        'CONTENT_SYNDICATION', 'CREATOR_PARTNERSHIP', 'MARKETPLACE_PROMOTION',
        'LOCALISATION_LAUNCH', 'OTHER'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE campaign_objective AS ENUM (
        'NET_REVENUE', 'NEW_CUSTOMERS', 'REPEAT_PURCHASE', 'PRODUCT_LAUNCH',
        'MARKETPLACE_ACTIVATION', 'AFFILIATE_RECRUITMENT', 'EMAIL_LIST_GROWTH',
        'FREE_TO_PAID_CONVERSION', 'TERRITORY_EXPANSION', 'LOCAL_EDITION_LAUNCH'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. GROWTH CHANNELS
CREATE TABLE IF NOT EXISTS growth_channels (
    id TEXT PRIMARY KEY,
    type growth_channel_type NOT NULL,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'ACTIVE',
    owner TEXT DEFAULT 'Growth Engine',
    territory TEXT DEFAULT 'GLOBAL',
    language TEXT DEFAULT 'EN',
    cost_model TEXT DEFAULT 'ORGANIC', -- ORGANIC, CPA, CPC, REVENUE_SHARE
    attribution_model TEXT DEFAULT 'LAST_TOUCH',
    tracking_status TEXT DEFAULT 'HEALTHY',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. GROWTH CAMPAIGNS
CREATE TABLE IF NOT EXISTS growth_campaigns (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    campaign_type TEXT NOT NULL,
    objective campaign_objective NOT NULL,
    status TEXT DEFAULT 'DRAFT', -- DRAFT, READY, RUNNING, PAUSED, COMPLETED, STOPPED_OUT
    start_at TIMESTAMPTZ,
    end_at TIMESTAMPTZ,
    products TEXT[] DEFAULT '{}',
    marketplaces TEXT[] DEFAULT '{}',
    territories TEXT[] DEFAULT '{}',
    languages TEXT[] DEFAULT '{}',
    channels TEXT[] DEFAULT '{}',
    budget_gbp NUMERIC(10,2) DEFAULT 0.00,
    actual_cost_gbp NUMERIC(10,2) DEFAULT 0.00,
    gross_revenue_gbp NUMERIC(10,2) DEFAULT 0.00,
    net_revenue_gbp NUMERIC(10,2) DEFAULT 0.00,
    net_contribution_gbp NUMERIC(10,2) DEFAULT 0.00,
    contribution_roas NUMERIC(5,2) DEFAULT 0.00,
    new_customers_count INT DEFAULT 0,
    repeat_customers_count INT DEFAULT 0,
    orders_count INT DEFAULT 0,
    refund_count INT DEFAULT 0,
    attribution_method TEXT DEFAULT 'AFFILIATE_DIRECT',
    attribution_confidence TEXT DEFAULT 'HIGH',
    stop_loss_max_spend_gbp NUMERIC(10,2),
    stop_loss_max_cpa_gbp NUMERIC(10,2),
    readiness_score INT DEFAULT 100,
    created_by TEXT NOT NULL,
    approved_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. GROWTH AUDIENCES
CREATE TABLE IF NOT EXISTS growth_audiences (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    audience_type TEXT NOT NULL, -- BEGINNER_TRADER, RISK_FOCUSED, WORKBOOK_BUYER, CUSTOMER
    source_origin TEXT NOT NULL, -- DECLARED, BEHAVIOURAL, PURCHASE_HISTORY
    estimated_size INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TRACKING LINKS & UTMS
CREATE TABLE IF NOT EXISTS growth_links (
    id TEXT PRIMARY KEY,
    destination_url TEXT NOT NULL,
    channel_id TEXT REFERENCES growth_channels(id),
    campaign_id TEXT REFERENCES growth_campaigns(id),
    product_sku TEXT NOT NULL,
    utm_source TEXT NOT NULL,
    utm_medium TEXT NOT NULL,
    utm_campaign TEXT NOT NULL,
    utm_content TEXT,
    short_code TEXT NOT NULL UNIQUE,
    clicks_count INT DEFAULT 0,
    conversions_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AFFILIATE RECRUITMENT PIPELINE
CREATE TABLE IF NOT EXISTS affiliate_prospects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    business_name TEXT,
    website_url TEXT,
    territory TEXT DEFAULT 'GLOBAL',
    language TEXT DEFAULT 'EN',
    audience_type TEXT NOT NULL,
    opportunity_score INT DEFAULT 50, -- 0 - 100
    pipeline_stage TEXT DEFAULT 'PROSPECT', -- PROSPECT, CONTACTED, APPLIED, APPROVED, ACTIVE, INACTIVE
    active_tier TEXT DEFAULT 'NEW', -- ELITE, GROWING, NEW, INACTIVE
    total_clicks INT DEFAULT 0,
    total_orders INT DEFAULT 0,
    net_contribution_gbp NUMERIC(10,2) DEFAULT 0.00,
    contribution_per_100_clicks_gbp NUMERIC(10,2) DEFAULT 0.00,
    refund_rate_pct NUMERIC(5,2) DEFAULT 0.00,
    compliance_strikes INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. LEAD MAGNETS
CREATE TABLE IF NOT EXISTS lead_magnets (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    source_publication_id TEXT NOT NULL,
    format_type TEXT DEFAULT 'PDF_CHECKLIST',
    downloads_count INT DEFAULT 0,
    email_joins_count INT DEFAULT 0,
    paid_conversions_count INT DEFAULT 0,
    downstream_net_revenue_gbp NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SEO OPPORTUNITIES
CREATE TABLE IF NOT EXISTS seo_opportunities (
    id TEXT PRIMARY KEY,
    topic_title TEXT NOT NULL,
    search_intent TEXT NOT NULL,
    target_product_sku TEXT NOT NULL,
    opportunity_score INT DEFAULT 50,
    source_chapter TEXT,
    organic_sessions INT DEFAULT 0,
    organic_net_revenue_gbp NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_growth_campaigns_status ON growth_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_growth_campaigns_obj ON growth_campaigns(objective);
CREATE INDEX IF NOT EXISTS idx_affiliate_score ON affiliate_prospects(opportunity_score DESC);
CREATE INDEX IF NOT EXISTS idx_links_code ON growth_links(short_code);
