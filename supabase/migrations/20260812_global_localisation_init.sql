-- ============================================================================
-- DRAWDOWN OS — GLOBAL LOCALISATION ENGINE
-- Migration: 20260812_global_localisation_init.sql
-- Purpose: Complete database schema for territories, locales, canonical source
-- linkage, translation units, translation memory, Drawdown term base,
-- compliance-sensitive content tracking, local prices, costs, and snapshots.
-- ============================================================================

-- 1. LOCAL EDITION STATES ENUM
DO $$ BEGIN
    CREATE TYPE local_edition_state AS ENUM (
        'OPPORTUNITY', 'APPROVED_FOR_LOCALISATION', 'PREPARING', 'TRANSLATING',
        'TRANSLATED_DRAFT', 'LOCALISING', 'EDITORIAL_REVIEW', 'COMPLIANCE_REVIEW',
        'VISUAL_QA', 'FORMAT_QA', 'READY', 'APPROVED_FOR_SALE', 'PUBLISHING',
        'LIVE', 'PAUSED', 'STALE', 'SUPERSEDED', 'RETIRED'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. TRANSLATION UNIT STATUS ENUM
DO $$ BEGIN
    CREATE TYPE translation_unit_status AS ENUM (
        'UNTRANSLATED', 'AI_DRAFT', 'HUMAN_TRANSLATED', 'IN_REVIEW',
        'APPROVED', 'REJECTED', 'FLAGGED', 'NEEDS_REVISION', 'LOCKED'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. TERRITORIES
CREATE TABLE IF NOT EXISTS territories (
    id TEXT PRIMARY KEY, -- e.g. 'DE', 'US', 'ES', 'BR'
    name TEXT NOT NULL,
    default_currency_code TEXT NOT NULL, -- e.g. 'EUR', 'USD', 'BRL'
    primary_languages TEXT[] DEFAULT '{}',
    date_format TEXT DEFAULT 'YYYY-MM-DD',
    number_format TEXT DEFAULT '1.234,56',
    disclaimer_requirements JSONB DEFAULT '{}',
    tax_metadata JSONB DEFAULT '{}',
    regulatory_context TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. LOCALES (Language + Territory)
CREATE TABLE IF NOT EXISTS locales (
    id TEXT PRIMARY KEY, -- e.g. 'de-DE', 'en-US', 'es-ES', 'es-MX', 'pt-BR'
    language_code TEXT NOT NULL, -- 'de'
    territory_code TEXT NOT NULL REFERENCES territories(id), -- 'DE'
    locale_name TEXT NOT NULL, -- 'German (Germany)'
    text_direction TEXT DEFAULT 'ltr', -- 'ltr' or 'rtl'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. LOCALISED EDITIONS (Canonical Source Linkage)
CREATE TABLE IF NOT EXISTS localised_editions (
    id TEXT PRIMARY KEY,
    publication_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    product_sku TEXT NOT NULL,
    source_edition_id TEXT NOT NULL, -- Points to canonical source e.g. 'DD-HTT-001-EN-GB-v1.2'
    source_version TEXT NOT NULL,
    language_code TEXT NOT NULL,
    territory_code TEXT NOT NULL REFERENCES territories(id),
    locale_code TEXT NOT NULL REFERENCES locales(id),
    edition_version TEXT DEFAULT 'v1.0',
    title_localised TEXT NOT NULL,
    subtitle_localised TEXT,
    translation_method TEXT DEFAULT 'HYBRID', -- HUMAN, AI_ASSISTED, AI_DRAFT, HYBRID
    state local_edition_state DEFAULT 'OPPORTUNITY',
    editorial_status TEXT DEFAULT 'PENDING',
    compliance_status TEXT DEFAULT 'PENDING',
    qa_status TEXT DEFAULT 'PENDING',
    commercial_status TEXT DEFAULT 'NOT_STARTED',
    translator_name TEXT,
    reviewer_name TEXT,
    completion_pct INT DEFAULT 0,
    total_units INT DEFAULT 0,
    translated_units INT DEFAULT 0,
    approved_units INT DEFAULT 0,
    blocking_issues_count INT DEFAULT 0,
    approved_at TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TRANSLATION UNITS (Granular Segment Model)
CREATE TABLE IF NOT EXISTS translation_units (
    id TEXT PRIMARY KEY,
    edition_id TEXT REFERENCES localised_editions(id) ON DELETE CASCADE,
    source_element_id TEXT NOT NULL,
    unit_type TEXT NOT NULL, -- HEADING, PARAGRAPH, BULLET, TABLE, CALLOUT, DISCLAIMER, CTA
    source_text TEXT NOT NULL,
    source_version TEXT NOT NULL,
    source_context TEXT,
    translated_text TEXT,
    translation_method TEXT DEFAULT 'AI_DRAFT',
    status translation_unit_status DEFAULT 'UNTRANSLATED',
    compliance_sensitivity INT DEFAULT 1, -- 1-5 scale (5 = regulatory disclaimer)
    is_compliance_sensitive BOOLEAN DEFAULT false,
    reviewer_notes TEXT,
    translation_memory_match_id TEXT,
    tm_confidence_pct INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TRANSLATION MEMORY (TM)
CREATE TABLE IF NOT EXISTS translation_memory (
    id TEXT PRIMARY KEY,
    source_phrase TEXT NOT NULL,
    approved_translation TEXT NOT NULL,
    source_language TEXT DEFAULT 'en',
    target_language TEXT NOT NULL,
    locale_code TEXT NOT NULL,
    domain TEXT DEFAULT 'FINANCIAL_EDUCATION',
    context TEXT,
    status TEXT DEFAULT 'APPROVED',
    approved_by TEXT NOT NULL,
    times_used INT DEFAULT 1,
    last_used_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. DRAWDOWN TERM BASE
CREATE TABLE IF NOT EXISTS term_base (
    id TEXT PRIMARY KEY,
    term_en TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL, -- BRAND, REGULATORY, TECHNICAL, FINANCIAL
    classification TEXT NOT NULL, -- LOCKED, TRANSLATE, LOCALISE, REVIEW
    definition TEXT,
    context_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS term_translations (
    id TEXT PRIMARY KEY,
    term_id TEXT REFERENCES term_base(id) ON DELETE CASCADE,
    language_code TEXT NOT NULL,
    locale_code TEXT NOT NULL,
    preferred_translation TEXT NOT NULL,
    alternative_translations TEXT[] DEFAULT '{}',
    prohibited_translations TEXT[] DEFAULT '{}',
    keep_in_english BOOLEAN DEFAULT false,
    territory_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. LOCALISATION OPPORTUNITIES
CREATE TABLE IF NOT EXISTS localisation_opportunities (
    id TEXT PRIMARY KEY,
    product_sku TEXT NOT NULL,
    product_name TEXT NOT NULL,
    language_code TEXT NOT NULL,
    territory_code TEXT NOT NULL,
    locale_code TEXT NOT NULL,
    priority_score INT NOT NULL, -- 0 - 100
    rsa_unlock_pts NUMERIC(5,2) NOT NULL,
    unlocked_marketplaces TEXT[] DEFAULT '{}',
    estimated_effort TEXT DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH
    confidence TEXT DEFAULT 'HIGH',
    existing_sales_signal TEXT,
    status TEXT DEFAULT 'OPPORTUNITY', -- OPPORTUNITY, APPROVED, IN_PROGRESS, REJECTED
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. LOCAL COMPLIANCE RULES
CREATE TABLE IF NOT EXISTS local_compliance_rules (
    id TEXT PRIMARY KEY,
    territory_code TEXT NOT NULL REFERENCES territories(id),
    rule_name TEXT NOT NULL,
    mandatory_disclaimer_text TEXT NOT NULL,
    prohibited_terms TEXT[] DEFAULT '{}',
    requires_local_legal_review BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. LOCAL PRICE RECORDS
CREATE TABLE IF NOT EXISTS local_price_records (
    id TEXT PRIMARY KEY,
    edition_id TEXT REFERENCES localised_editions(id) ON DELETE CASCADE,
    currency_code TEXT NOT NULL,
    base_price_local NUMERIC(10,2) NOT NULL,
    proposed_price_local NUMERIC(10,2) NOT NULL,
    fx_reference_gbp NUMERIC(10,4) NOT NULL,
    platform_fee_pct NUMERIC(5,2) DEFAULT 0.00,
    estimated_net_local NUMERIC(10,2) NOT NULL,
    pricing_strategy TEXT DEFAULT 'LOCAL_MARKET_PRICE',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. LOCALISATION COSTS & BUDGET
CREATE TABLE IF NOT EXISTS localisation_costs (
    id TEXT PRIMARY KEY,
    edition_id TEXT REFERENCES localised_editions(id) ON DELETE CASCADE,
    cost_type TEXT NOT NULL, -- TRANSLATION, EDITING, COMPLIANCE_REVIEW, DESIGN, FORMATTING
    estimated_cost_gbp NUMERIC(10,2) DEFAULT 0.00,
    actual_cost_gbp NUMERIC(10,2) DEFAULT 0.00,
    vendor TEXT,
    status TEXT DEFAULT 'ESTIMATED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_loc_editions_sku ON localised_editions(product_sku);
CREATE INDEX IF NOT EXISTS idx_loc_editions_locale ON localised_editions(locale_code);
CREATE INDEX IF NOT EXISTS idx_loc_editions_state ON localised_editions(state);
CREATE INDEX IF NOT EXISTS idx_units_edition ON translation_units(edition_id);
CREATE INDEX IF NOT EXISTS idx_tm_locale ON translation_memory(locale_code);
CREATE INDEX IF NOT EXISTS idx_opp_score ON localisation_opportunities(priority_score DESC);
