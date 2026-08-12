-- ============================================================================
-- DRAWDOWN OS — AUTONOMOUS LISTING & MERCHANDISING ENGINE
-- Migration: 20260812_merchandising_engine_init.sql
-- Purpose: Complete schema for canonical product vs channel listing separation,
-- positioning, copy variants, search intents, pricing, experiments, drift,
-- listing quality, and merchandising autopilot policy.
-- ============================================================================

-- 1. MARKETPLACE LISTING STATES ENUM
DO $$ BEGIN
    CREATE TYPE marketplace_listing_state AS ENUM (
        'DRAFT', 'GENERATING', 'NEEDS_REVIEW', 'COMPLIANCE_REVIEW', 'APPROVED',
        'QUEUED', 'PUBLISHING', 'LIVE', 'LIVE_UNVERIFIED', 'STALE', 'DRIFTED',
        'OPTIMISING', 'PAUSED', 'REJECTED', 'FAILED', 'REMOVED', 'ARCHIVED'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. MARKETPLACE MERCHANDISING PROFILES
CREATE TABLE IF NOT EXISTS marketplace_merchandising_profiles (
    id TEXT PRIMARY KEY,
    marketplace_id TEXT NOT NULL UNIQUE,
    marketplace_name TEXT NOT NULL,
    primary_buyer_behaviours TEXT[] DEFAULT '{}',
    title_limit INT DEFAULT 200,
    subtitle_limit INT DEFAULT 200,
    short_description_limit INT DEFAULT 500,
    long_description_limit INT DEFAULT 5000,
    html_supported BOOLEAN DEFAULT false,
    bullets_supported BOOLEAN DEFAULT true,
    max_bullets INT DEFAULT 5,
    tags_supported BOOLEAN DEFAULT false,
    max_tags INT DEFAULT 13,
    max_gallery_images INT DEFAULT 10,
    requires_risk_warning BOOLEAN DEFAULT false,
    requires_disclaimer BOOLEAN DEFAULT true,
    sample_types_supported TEXT[] DEFAULT '{}',
    pricing_rules JSONB DEFAULT '{}',
    automation_eligible BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. MERCHANDISING STRATEGIES
CREATE TABLE IF NOT EXISTS merchandising_strategies (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    product_sku TEXT NOT NULL,
    marketplace_id TEXT NOT NULL,
    primary_audience TEXT NOT NULL,
    secondary_audience TEXT,
    primary_customer_job TEXT NOT NULL,
    primary_commercial_angle TEXT NOT NULL,
    secondary_commercial_angle TEXT,
    primary_value_prop TEXT NOT NULL,
    supporting_value_props TEXT[] DEFAULT '{}',
    differentiators TEXT[] DEFAULT '{}',
    primary_cta TEXT NOT NULL,
    tone TEXT NOT NULL DEFAULT 'Professional, clear, evidence-focused',
    prohibited_claims TEXT[] DEFAULT '{}',
    risk_disclosures TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. MARKETPLACE POSITIONING
CREATE TABLE IF NOT EXISTS marketplace_positioning (
    id TEXT PRIMARY KEY,
    merchandising_strategy_id TEXT REFERENCES merchandising_strategies(id) ON DELETE CASCADE,
    product_sku TEXT NOT NULL,
    marketplace_id TEXT NOT NULL,
    headline TEXT NOT NULL,
    subheadline TEXT,
    key_benefits TEXT[] DEFAULT '{}',
    who_it_is_for TEXT[] DEFAULT '{}',
    who_it_is_not_for TEXT[] DEFAULT '{}',
    price_positioning TEXT NOT NULL,
    sample_strategy TEXT NOT NULL,
    bundle_recommendation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CANONICAL MARKETPLACE LISTINGS
CREATE TABLE IF NOT EXISTS marketplace_listings (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    product_sku TEXT NOT NULL,
    product_variant_id TEXT,
    marketplace_id TEXT NOT NULL,
    marketplace_account_id TEXT,
    territory_id TEXT DEFAULT 'GLOBAL',
    language_id TEXT DEFAULT 'en',
    distribution_route_id TEXT,
    external_listing_id TEXT,
    external_url TEXT,
    listing_version INT DEFAULT 1,
    status marketplace_listing_state DEFAULT 'DRAFT',
    approval_status TEXT DEFAULT 'PENDING',
    compliance_status TEXT DEFAULT 'PENDING',
    publication_status TEXT DEFAULT 'NOT_PUBLISHED',
    merchandising_strategy_id TEXT REFERENCES merchandising_strategies(id),
    active_experiment_id TEXT,
    current_price_id TEXT,
    current_asset_set_id TEXT,
    discoverability_score INT DEFAULT 0,
    listing_quality_score INT DEFAULT 0,
    last_synced_at TIMESTAMPTZ,
    last_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. MARKETPLACE LISTING VERSIONS (IMMUTABLE AUDIT TRAIL)
CREATE TABLE IF NOT EXISTS marketplace_listing_versions (
    id TEXT PRIMARY KEY,
    listing_id TEXT REFERENCES marketplace_listings(id) ON DELETE CASCADE,
    version INT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    short_description TEXT,
    long_description TEXT,
    bullets TEXT[] DEFAULT '{}',
    keywords TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    categories TEXT[] DEFAULT '{}',
    price_gbp NUMERIC(10,2),
    price_usd NUMERIC(10,2),
    price_eur NUMERIC(10,2),
    assets JSONB DEFAULT '[]',
    sample_strategy TEXT,
    cta_text TEXT,
    disclosures TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    reason_for_change TEXT NOT NULL,
    source_strategy_id TEXT,
    created_by TEXT NOT NULL,
    approved_by TEXT,
    published_at TIMESTAMPTZ,
    superseded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. LISTING COPY VARIANTS
CREATE TABLE IF NOT EXISTS listing_copy_variants (
    id TEXT PRIMARY KEY,
    listing_id TEXT REFERENCES marketplace_listings(id) ON DELETE CASCADE,
    field_name TEXT NOT NULL, -- title, subtitle, short_desc, long_desc, bullets
    variant_text TEXT NOT NULL,
    character_count INT NOT NULL,
    character_limit INT,
    is_condensed BOOLEAN DEFAULT false,
    content_fidelity TEXT DEFAULT 'SOURCE_DERIVED',
    source_chunk_ids TEXT[] DEFAULT '{}',
    approved_claim_ids TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'GENERATED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SEARCH TERMS & INTENTS
CREATE TABLE IF NOT EXISTS search_terms (
    id TEXT PRIMARY KEY,
    term TEXT NOT NULL,
    marketplace_id TEXT NOT NULL,
    territory_id TEXT DEFAULT 'GLOBAL',
    language_id TEXT DEFAULT 'en',
    product_sku TEXT NOT NULL,
    intent_category TEXT NOT NULL, -- INFORMATIONAL, COMMERCIAL, TRANSACTIONAL, NAVIGATIONAL
    source_type TEXT NOT NULL, -- OBSERVED, RESEARCHED, SUGGESTED
    volume_estimate INT,
    competition_level TEXT, -- LOW, MEDIUM, HIGH
    performance_ctr NUMERIC(5,4),
    is_approved BOOLEAN DEFAULT true,
    is_blocked BOOLEAN DEFAULT false,
    confidence TEXT DEFAULT 'HIGH',
    last_checked_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SEARCH TERM PERFORMANCE
CREATE TABLE IF NOT EXISTS search_term_performance (
    id TEXT PRIMARY KEY,
    search_term_id TEXT REFERENCES search_terms(id) ON DELETE CASCADE,
    listing_id TEXT REFERENCES marketplace_listings(id) ON DELETE CASCADE,
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    conversions INT DEFAULT 0,
    revenue_gbp NUMERIC(12,2) DEFAULT 0.00,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. MARKETPLACE CATEGORIES & MAPPINGS
CREATE TABLE IF NOT EXISTS marketplace_categories (
    id TEXT PRIMARY KEY,
    marketplace_id TEXT NOT NULL,
    category_id_external TEXT NOT NULL,
    category_path TEXT NOT NULL,
    parent_category_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS category_mappings (
    id TEXT PRIMARY KEY,
    product_sku TEXT NOT NULL,
    marketplace_id TEXT NOT NULL,
    primary_category_id TEXT REFERENCES marketplace_categories(id),
    secondary_category_id TEXT REFERENCES marketplace_categories(id),
    mapped_by TEXT NOT NULL,
    confidence TEXT DEFAULT 'HIGH',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. GALLERY SEQUENCES & LISTING ASSETS
CREATE TABLE IF NOT EXISTS gallery_sequences (
    id TEXT PRIMARY KEY,
    listing_id TEXT REFERENCES marketplace_listings(id) ON DELETE CASCADE,
    position INT NOT NULL,
    purpose TEXT NOT NULL, -- COVER, WHAT_IS_INCLUDED, INSIDE_PAGES, PROGRAMME, WORKSHEETS, RISK_WARNING, FORMAT, AUDIENCE
    asset_id TEXT NOT NULL,
    asset_url TEXT NOT NULL,
    overlay_message TEXT,
    cta_text TEXT,
    status TEXT DEFAULT 'READY',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. COMMERCIAL OFFERS
CREATE TABLE IF NOT EXISTS commercial_offers (
    id TEXT PRIMARY KEY,
    product_sku TEXT NOT NULL,
    marketplace_id TEXT NOT NULL,
    offer_name TEXT NOT NULL,
    offer_type TEXT NOT NULL, -- STANDARD, BUNDLE, PROMOTIONAL, AFFILIATE
    price_gbp NUMERIC(10,2) NOT NULL,
    compare_at_price_gbp NUMERIC(10,2),
    discount_pct NUMERIC(5,2) DEFAULT 0.00,
    included_products TEXT[] DEFAULT '{}',
    bonus_assets TEXT[] DEFAULT '{}',
    start_at TIMESTAMPTZ,
    end_at TIMESTAMPTZ,
    status TEXT DEFAULT 'DRAFT',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. LISTING PRICES & FLOORS
CREATE TABLE IF NOT EXISTS listing_prices (
    id TEXT PRIMARY KEY,
    listing_id TEXT REFERENCES marketplace_listings(id) ON DELETE CASCADE,
    product_sku TEXT NOT NULL,
    marketplace_id TEXT NOT NULL,
    base_price_gbp NUMERIC(10,2) NOT NULL,
    marketplace_price_gbp NUMERIC(10,2) NOT NULL,
    min_price_floor_gbp NUMERIC(10,2) NOT NULL,
    autopilot_floor_gbp NUMERIC(10,2) NOT NULL,
    estimated_platform_fee_pct NUMERIC(5,2) DEFAULT 0.00,
    estimated_net_proceeds_gbp NUMERIC(10,2) NOT NULL,
    net_margin_pct NUMERIC(5,2) NOT NULL,
    price_parity_status TEXT DEFAULT 'OK',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. MERCHANDISING EXPERIMENTS
CREATE TABLE IF NOT EXISTS merchandising_experiments (
    id TEXT PRIMARY KEY,
    listing_id TEXT REFERENCES marketplace_listings(id) ON DELETE CASCADE,
    product_sku TEXT NOT NULL,
    marketplace_id TEXT NOT NULL,
    experiment_name TEXT NOT NULL,
    hypothesis TEXT NOT NULL,
    test_type TEXT NOT NULL, -- A_B, SEQUENTIAL, BEFORE_AFTER, MARKETPLACE_NATIVE
    variable_tested TEXT NOT NULL, -- TITLE, SUBTITLE, COVER, GALLERY_ORDER, DESCRIPTION, PRICE, SAMPLE, OFFER
    control_variant JSONB NOT NULL,
    test_variant JSONB NOT NULL,
    success_metric TEXT DEFAULT 'NET_REVENUE',
    guardrail_metrics TEXT[] DEFAULT ARRAY['REFUND_RATE', 'MARGIN', 'COMPLIANCE'],
    start_at TIMESTAMPTZ,
    end_at TIMESTAMPTZ,
    min_duration_days INT DEFAULT 14,
    status TEXT DEFAULT 'DRAFT', -- DRAFT, RUNNING, COMPLETED, INCONCLUSIVE, CANCELLED
    confidence_level TEXT DEFAULT 'INSUFFICIENT_DATA',
    winner_variant TEXT,
    decision_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. LISTING PERFORMANCE & SNAPSHOTS
CREATE TABLE IF NOT EXISTS listing_performance (
    id TEXT PRIMARY KEY,
    listing_id TEXT REFERENCES marketplace_listings(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    impressions INT DEFAULT 0,
    views INT DEFAULT 0,
    clicks INT DEFAULT 0,
    orders INT DEFAULT 0,
    units_sold INT DEFAULT 0,
    gross_revenue_gbp NUMERIC(12,2) DEFAULT 0.00,
    platform_fees_gbp NUMERIC(12,2) DEFAULT 0.00,
    affiliate_costs_gbp NUMERIC(12,2) DEFAULT 0.00,
    net_revenue_gbp NUMERIC(12,2) DEFAULT 0.00,
    refund_count INT DEFAULT 0,
    refund_amount_gbp NUMERIC(12,2) DEFAULT 0.00,
    refund_rate_pct NUMERIC(5,2) DEFAULT 0.00,
    conversion_rate_pct NUMERIC(5,2) DEFAULT 0.00,
    ctr_pct NUMERIC(5,2) DEFAULT 0.00,
    performance_state TEXT DEFAULT 'HEALTHY',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. LISTING DRIFT EVENTS
CREATE TABLE IF NOT EXISTS listing_drift_events (
    id TEXT PRIMARY KEY,
    listing_id TEXT REFERENCES marketplace_listings(id) ON DELETE CASCADE,
    product_sku TEXT NOT NULL,
    marketplace_id TEXT NOT NULL,
    field_drifted TEXT NOT NULL,
    expected_value TEXT NOT NULL,
    live_value TEXT NOT NULL,
    severity TEXT NOT NULL, -- INFO, LOW, MEDIUM, HIGH, CRITICAL
    detected_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    resolution_action TEXT
);

-- 17. MERCHANDISING RECOMMENDATIONS
CREATE TABLE IF NOT EXISTS merchandising_recommendations (
    id TEXT PRIMARY KEY,
    listing_id TEXT REFERENCES marketplace_listings(id) ON DELETE CASCADE,
    product_sku TEXT NOT NULL,
    marketplace_id TEXT NOT NULL,
    title TEXT NOT NULL,
    action_type TEXT NOT NULL,
    diagnosis TEXT NOT NULL,
    proposed_action TEXT NOT NULL,
    estimated_impact_pts NUMERIC(5,2) DEFAULT 0.0,
    effort_level TEXT DEFAULT 'LOW',
    confidence TEXT DEFAULT 'HIGH',
    requires_human_approval BOOLEAN DEFAULT true,
    status TEXT DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. BRAND VOCABULARY & RULES
CREATE TABLE IF NOT EXISTS brand_vocabulary (
    id TEXT PRIMARY KEY,
    term TEXT NOT NULL,
    classification TEXT NOT NULL, -- APPROVED, PREFERRED, AVOID, PROHIBITED
    reason TEXT NOT NULL,
    suggested_alternative TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. MERCHANDISING AUTOPILOT POLICIES
CREATE TABLE IF NOT EXISTS merchandising_policies (
    id TEXT PRIMARY KEY,
    policy_name TEXT NOT NULL,
    auto_repair_drift BOOLEAN DEFAULT true,
    auto_deploy_approved_winner BOOLEAN DEFAULT false,
    auto_update_keywords BOOLEAN DEFAULT true,
    auto_update_approved_assets BOOLEAN DEFAULT false,
    auto_sync_price BOOLEAN DEFAULT true,
    auto_end_promotions BOOLEAN DEFAULT true,
    max_concurrent_experiments INT DEFAULT 3,
    max_price_variance_pct NUMERIC(5,2) DEFAULT 10.00,
    min_traffic_for_experiment INT DEFAULT 500,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR FAST QUERYING
CREATE INDEX IF NOT EXISTS idx_listings_product_sku ON marketplace_listings(product_sku);
CREATE INDEX IF NOT EXISTS idx_listings_marketplace ON marketplace_listings(marketplace_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON marketplace_listings(status);
CREATE INDEX IF NOT EXISTS idx_versions_listing ON marketplace_listing_versions(listing_id);
CREATE INDEX IF NOT EXISTS idx_search_terms_product ON search_terms(product_sku);
CREATE INDEX IF NOT EXISTS idx_experiments_listing ON merchandising_experiments(listing_id);
CREATE INDEX IF NOT EXISTS idx_drift_listing ON listing_drift_events(listing_id);
