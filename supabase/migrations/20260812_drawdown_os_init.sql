-- DRAWDOWN OS DATABASE SCHEMA & RLS POLICIES
-- SYSTEM OF RECORD FOR DRAWDOWN PUBLISHING OPERATIONS
-- MIGRATION: 20260812_drawdown_os_init.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ====================================================
-- ORGANISATIONS, USERS, ROLES & PERMISSIONS
-- ====================================================

CREATE TABLE IF NOT EXISTS organisations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID UNIQUE, -- References supabase auth.users
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'VIEWER', -- SUPERADMIN, PUBLISHER, COMPLIANCE_OFFICER, MARKETING_LEAD, FINANCE_LEAD, VIEWER
    organisation_id UUID REFERENCES organisations(id) ON DELETE CASCADE,
    mfa_enabled BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS roles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    permissions JSONB NOT NULL DEFAULT '[]'::jsonb
);

INSERT INTO roles (id, name, description, permissions) VALUES
('SUPERADMIN', 'Super Admin', 'Full system access across all domain capabilities', '["*"]'::jsonb),
('PUBLISHER', 'Publisher', 'Manage catalog, metadata, format factory, and distribution routes', '["catalog:*", "distribution:*", "format:*"]'::jsonb),
('COMPLIANCE_OFFICER', 'Compliance Officer', 'Audit claims, approve disclosures, and set rule constraints', '["compliance:*", "audit:*"]'::jsonb),
('MARKETING_LEAD', 'Marketing & Affiliate Lead', 'Manage campaigns, affiliates, and copy listings', '["marketing:*", "affiliates:*", "listing:*"]'::jsonb),
('FINANCE_LEAD', 'Finance & Revenue Lead', 'Manage pricing, reconciliations, payouts, and revenue intelligence', '["revenue:*", "pricing:*", "reconciliation:*"]'::jsonb),
('VIEWER', 'Read Only Viewer', 'Read-only telemetry access across operating system', '["*:read"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- ====================================================
-- AUTHORS, PUBLISHERS, LANGUAGES, TERRITORIES
-- ====================================================

CREATE TABLE IF NOT EXISTS publishers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    canonical_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. DRAWDOWN
    imprint_name VARCHAR(255),
    website VARCHAR(255),
    contact_email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    website VARCHAR(255),
    social_handles JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS languages (
    code VARCHAR(10) PRIMARY KEY, -- ISO 639-1 e.g. en, es, pt, de, fr, it
    name VARCHAR(100) NOT NULL,
    native_name VARCHAR(100)
);

INSERT INTO languages (code, name, native_name) VALUES
('en', 'English', 'English'),
('es', 'Spanish', 'Español'),
('pt', 'Portuguese', 'Português'),
('de', 'German', 'Deutsch'),
('fr', 'French', 'Français'),
('it', 'Italian', 'Italiano')
ON CONFLICT (code) DO NOTHING;

CREATE TABLE IF NOT EXISTS territories (
    code VARCHAR(10) PRIMARY KEY, -- ISO 3166-1 alpha-2 or region code e.g. US, UK, ES, WW (Worldwide)
    name VARCHAR(100) NOT NULL,
    region VARCHAR(100)
);

INSERT INTO territories (code, name, region) VALUES
('WW', 'Worldwide', 'Global'),
('US', 'United States', 'North America'),
('UK', 'United Kingdom', 'Europe'),
('EU', 'European Union', 'Europe'),
('CA', 'Canada', 'North America'),
('AU', 'Australia', 'Oceania'),
('JP', 'Japan', 'Asia'),
('BR', 'Brazil', 'South America'),
('MX', 'Mexico', 'North America')
ON CONFLICT (code) DO NOTHING;

-- ====================================================
-- PUBLICATIONS & EDITIONS & VERSIONS
-- ====================================================

CREATE TABLE IF NOT EXISTS publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    canonical_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. DD-HTT-001
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    series_name VARCHAR(255),
    volume_number INT,
    primary_author_id UUID REFERENCES authors(id),
    publisher_id UUID REFERENCES publishers(id),
    status VARCHAR(50) NOT NULL DEFAULT 'DRAFT', -- DRAFT, COMPLIANCE_REVIEW, READY, PUBLISHING, LIVE, ARCHIVED, BLOCKED
    category VARCHAR(100) NOT NULL DEFAULT 'Trading Education',
    bisac_codes JSONB DEFAULT '[]'::jsonb,
    keywords JSONB DEFAULT '[]'::jsonb,
    risk_classification VARCHAR(50) DEFAULT 'HIGH_RISK_FINANCIAL',
    publication_date DATE,
    copyright_notice TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS publication_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    publication_id UUID REFERENCES publications(id) ON DELETE CASCADE,
    version_number VARCHAR(20) NOT NULL, -- e.g. 1.0.0, 1.1.0
    changelog TEXT,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS editions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    publication_id UUID REFERENCES publications(id) ON DELETE CASCADE,
    edition_code VARCHAR(100) UNIQUE NOT NULL, -- e.g. DD-HTT-001-EN-UK
    language_code VARCHAR(10) REFERENCES languages(code),
    target_territory VARCHAR(10) REFERENCES territories(code),
    edition_title VARCHAR(255) NOT NULL,
    edition_number INT DEFAULT 1,
    translator_credits VARCHAR(255),
    translation_status VARCHAR(50) DEFAULT 'ORIGINAL_EN', -- ORIGINAL_EN, HUMAN_TRANSLATED, AI_TRANSLATED, APPROVED
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- ASSETS & STORAGE (CLOUDFLARE R2 REFERENCES)
-- ====================================================

CREATE TABLE IF NOT EXISTS assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    publication_id UUID REFERENCES publications(id) ON DELETE CASCADE,
    asset_type VARCHAR(50) NOT NULL, -- MASTER_PDF, SAMPLE_PDF, EPUB_REFLOWABLE, KINDLE_PACKAGE, COVER_JPG, COVER_PNG, AUDIO_MP3, PRINT_MASTER, SALES_REPORT
    r2_key VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    sha256_checksum VARCHAR(64) NOT NULL,
    virus_scan_status VARCHAR(50) DEFAULT 'CLEAN', -- UNCHECKED, SCANNING, CLEAN, INFECTED
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS asset_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
    version_number INT NOT NULL DEFAULT 1,
    r2_key VARCHAR(500) NOT NULL,
    sha256_checksum VARCHAR(64) NOT NULL,
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- FORMAT FACTORY & PRODUCTS (SKUs & ISBNs)
-- ====================================================

CREATE TABLE IF NOT EXISTS formats (
    id VARCHAR(50) PRIMARY KEY, -- PDF_PREMIUM, EPUB_REFLOWABLE, KINDLE_READY, PRINT_POD, AUDIO_BOOK, WORKSHEET_PACK
    name VARCHAR(100) NOT NULL,
    description TEXT,
    supports_reflow BOOLEAN DEFAULT FALSE
);

INSERT INTO formats (id, name, description, supports_reflow) VALUES
('PDF_PREMIUM', 'Premium PDF (Full Layout)', 'High fidelity designed PDF workbook', false),
('PDF_COMPRESSED', 'Compressed PDF (Web/Mobile)', 'Optimized lightweight PDF', false),
('EPUB_REFLOWABLE', 'Reflowable EPUB 3', 'Standard reflowable ebook format', true),
('KINDLE_READY', 'Kindle KPF/MOBI Package', 'Amazon Kindle formatted package', true),
('PRINT_POD', 'Print-on-Demand Master PDF', '300DPI CMYK PDF with bleed boundaries', false),
('AUDIO_BOOK', 'Audio Product Package', 'MP3 chapter bundle with metadata', false),
('WORKSHEET_PACK', 'Interactive Worksheets Pack', 'Fillable forms and templates', false)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(100) UNIQUE NOT NULL, -- e.g. DD-HTT-001-EN-UK-PDF-V1
    edition_id UUID REFERENCES editions(id) ON DELETE CASCADE,
    format_id VARCHAR(50) REFERENCES formats(id),
    isbn VARCHAR(20),
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    conversion_pipeline_status VARCHAR(50) DEFAULT 'APPROVED', -- AUTO_GENERATED, NEEDS_QA, APPROVED, FAILED
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- MARKETPLACES & CAPABILITIES MATRIX
-- ====================================================

CREATE TABLE IF NOT EXISTS marketplaces (
    id VARCHAR(100) PRIMARY KEY, -- amazon_kdp, kobo_writing_life, whop, gumroad, etsy, ingram_spark, publishdrive, draft2digital
    name VARCHAR(255) NOT NULL,
    official_url VARCHAR(255) NOT NULL,
    country VARCHAR(10) DEFAULT 'US',
    category VARCHAR(100) DEFAULT 'Digital Retailer',
    automation_mode VARCHAR(50) NOT NULL DEFAULT 'FULL_AUTOMATION', -- FULL_AUTOMATION, PARTIAL_AUTOMATION, READ_ONLY, WEBHOOK_ONLY, AGGREGATOR_MANAGED, MANUAL_PORTAL, RESEARCH_REQUIRED, BLOCKED
    account_status VARCHAR(50) DEFAULT 'LIVE', -- DISCOVERED, RESEARCHING, ELIGIBLE, ONBOARDING, CONNECTED, LIVE, REJECTED
    capabilities JSONB NOT NULL DEFAULT '{
        "canCreateProduct": true,
        "canUpdateProduct": true,
        "canDeleteProduct": false,
        "canUploadFiles": true,
        "canUpdatePrice": true,
        "canReadOrders": true,
        "canReadCustomers": true,
        "canReadSales": true,
        "canReadFees": true,
        "canReadRefunds": true,
        "canReadPayouts": true,
        "supportsWebhooks": true,
        "supportsOAuth": true,
        "supportsAPIKey": true,
        "supportsAffiliateProgramme": true,
        "supportsCoupons": true,
        "supportsTerritorialPricing": true,
        "supportsMultipleCurrencies": true,
        "requiresManualReview": false,
        "aggregatorManaged": false
    }'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS marketplace_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    marketplace_id VARCHAR(100) REFERENCES marketplaces(id) ON DELETE CASCADE,
    account_name VARCHAR(255) NOT NULL,
    portal_login_url VARCHAR(255),
    account_owner_id UUID REFERENCES users(id),
    kyc_status VARCHAR(50) DEFAULT 'VERIFIED',
    tax_status VARCHAR(50) DEFAULT 'W8BEN_VERIFIED',
    terms_accepted_date DATE,
    credentials_vault_ref VARCHAR(255), -- References secret key in secure store, NEVER plain text
    last_synced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- ROUTING, DESTINATION COLLISION & CHANNEL LISTINGS
-- ====================================================

CREATE TABLE IF NOT EXISTS distribution_routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    publisher_id UUID REFERENCES publishers(id),
    distributor_name VARCHAR(100) NOT NULL, -- Direct, PublishDrive, Draft2Digital, IngramSpark
    destination_marketplace_id VARCHAR(100) REFERENCES marketplaces(id),
    route_status VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE, PAUSED, CONFLICT_PAUSED
    is_direct BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(publisher_id, destination_marketplace_id)
);

CREATE TABLE IF NOT EXISTS channel_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    marketplace_id VARCHAR(100) REFERENCES marketplaces(id),
    external_product_id VARCHAR(255),
    listing_url VARCHAR(500),
    listing_status VARCHAR(50) DEFAULT 'LIVE', -- DRAFT, SUBMITTED, IN_REVIEW, LIVE, ERROR, DELISTED
    sync_status VARCHAR(50) DEFAULT 'IN_SYNC', -- IN_SYNC, OUT_OF_SYNC, SYNCING, FAILED
    last_synced_at TIMESTAMPTZ DEFAULT NOW(),
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- GLOBAL PRICING & CURRENCIES
-- ====================================================

CREATE TABLE IF NOT EXISTS prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    base_currency VARCHAR(10) NOT NULL DEFAULT 'GBP',
    base_price NUMERIC(12, 2) NOT NULL,
    sale_price NUMERIC(12, 2),
    floor_price NUMERIC(12, 2) NOT NULL,
    wholesale_price NUMERIC(12, 2),
    affiliate_commission_rate NUMERIC(5, 2) DEFAULT 30.00, -- e.g. 30%
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS territorial_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    price_id UUID REFERENCES prices(id) ON DELETE CASCADE,
    territory_code VARCHAR(10) REFERENCES territories(code),
    currency VARCHAR(10) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    vat_inclusive BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- REVENUE, ORDERS & RECONCILIATION
-- ====================================================

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    marketplace_id VARCHAR(100) REFERENCES marketplaces(id),
    external_order_id VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    country VARCHAR(10),
    gross_amount NUMERIC(12, 2) NOT NULL,
    marketplace_fee NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    affiliate_commission NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    tax_withheld NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    net_receipt NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'GBP',
    settlement_currency VARCHAR(10) DEFAULT 'GBP',
    fx_rate NUMERIC(10, 6) DEFAULT 1.000000,
    reconciliation_status VARCHAR(50) DEFAULT 'MATCHED', -- UNMATCHED, PARTIAL, MATCHED, REVIEW, DUPLICATE, ERROR
    order_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    sku VARCHAR(100) NOT NULL,
    unit_price NUMERIC(12, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    subtotal NUMERIC(12, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS reconciliations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    marketplace_id VARCHAR(100) REFERENCES marketplaces(id),
    reported_gross NUMERIC(12, 2) NOT NULL,
    reported_net NUMERIC(12, 2) NOT NULL,
    bank_settlement_amount NUMERIC(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'MATCHED',
    notes TEXT,
    reconciled_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- AFFILIATE ENGINE
-- ====================================================

CREATE TABLE IF NOT EXISTS affiliates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    default_commission_rate NUMERIC(5, 2) DEFAULT 30.00,
    status VARCHAR(50) DEFAULT 'APPROVED', -- PENDING, APPROVED, REJECTED, SUSPENDED
    lifetime_sales NUMERIC(12, 2) DEFAULT 0.00,
    lifetime_commissions NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS affiliate_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    custom_url VARCHAR(500) NOT NULL,
    utm_campaign VARCHAR(100),
    clicks_count INT DEFAULT 0,
    conversions_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- MARKETING CAMPAIGNS
-- ====================================================

CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    marketplace_id VARCHAR(100) REFERENCES marketplaces(id),
    budget NUMERIC(12, 2) DEFAULT 0.00,
    spend NUMERIC(12, 2) DEFAULT 0.00,
    revenue_generated NUMERIC(12, 2) DEFAULT 0.00,
    roas NUMERIC(6, 2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- COMPLIANCE ENGINE & EVIDENCE LIBRARY
-- ====================================================

CREATE TABLE IF NOT EXISTS compliance_rules (
    id VARCHAR(100) PRIMARY KEY, -- INCOME_CLAIM, GUARANTEED_RESULT, PERFORMANCE_CLAIM, RISK_DISCLOSURE, LEVERAGE_WARNING
    rule_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    severity VARCHAR(50) NOT NULL DEFAULT 'BLOCKING', -- INFO, REVIEW, WARNING, BLOCKING
    regex_pattern TEXT,
    description TEXT
);

INSERT INTO compliance_rules (id, rule_name, category, severity, regex_pattern, description) VALUES
('INCOME_CLAIM', 'Income or Wealth Promise Claim', 'Financial Promotion', 'BLOCKING', '(?i)(guaranteed profit|make \$[0-9]+|get rich|100% win rate|double your account)', 'Promises of specific income or guaranteed financial returns are strictly prohibited'),
('PERFORMANCE_CLAIM', 'Unverified Performance Result', 'Performance Audit', 'WARNING', '(?i)(past performance|proven 90% accuracy|zero risk)', 'Historical performance claims require explicit verified audit trail and disclaimer'),
('RISK_DISCLOSURE', 'Mandatory Risk Warning Disclosure', 'Regulatory Compliance', 'BLOCKING', '', 'All trading education products must feature standard risk disclosures'),
('AFFILIATE_DISCLOSURE', 'Affiliate Relationship Disclosure', 'FTC / ASA Rules', 'REVIEW', '', 'Affiliate promotional materials must contain prominent commission disclosures')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    publication_id UUID REFERENCES publications(id) ON DELETE CASCADE,
    claim_text TEXT NOT NULL,
    location_reference VARCHAR(255),
    rule_id VARCHAR(100) REFERENCES compliance_rules(id),
    status VARCHAR(50) DEFAULT 'IN_REVIEW' -- IN_REVIEW, APPROVED, REJECTED, MODIFIED
);

CREATE TABLE IF NOT EXISTS claim_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_id UUID REFERENCES claims(id) ON DELETE CASCADE,
    evidence_type VARCHAR(100) NOT NULL, -- AUDITED_STATEMENT, LEGAL_DISCLAIMER, BACKTEST_REPORT
    source_url VARCHAR(500),
    valid_until DATE,
    verification_state VARCHAR(50) DEFAULT 'SUPPORTED', -- SUPPORTED, PARTIALLY_SUPPORTED, STALE, UNSUPPORTED
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS compliance_findings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    publication_id UUID REFERENCES publications(id) ON DELETE CASCADE,
    rule_id VARCHAR(100) REFERENCES compliance_rules(id),
    snippet TEXT NOT NULL,
    severity VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'OPEN', -- OPEN, RESOLVED, WAIVED
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- MARKETPLACE RADAR (INTELLIGENCE DISCOVERY AGENT)
-- ====================================================

CREATE TABLE IF NOT EXISTS marketplace_candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    official_url VARCHAR(255) NOT NULL,
    country VARCHAR(10) NOT NULL DEFAULT 'US',
    regions_served JSONB DEFAULT '["Worldwide"]'::jsonb,
    languages_supported JSONB DEFAULT '["en"]'::jsonb,
    product_types JSONB DEFAULT '["PDF", "EPUB"]'::jsonb,
    affiliate_system_available BOOLEAN DEFAULT TRUE,
    api_available BOOLEAN DEFAULT TRUE,
    opportunity_score INT NOT NULL DEFAULT 75, -- 0-100 score
    estimated_monthly_value VARCHAR(100) DEFAULT '$5,000 - $15,000',
    integration_effort VARCHAR(50) DEFAULT 'LOW', -- LOW, MEDIUM, HIGH
    compliance_compatibility VARCHAR(50) DEFAULT 'HIGH',
    status VARCHAR(50) DEFAULT 'DISCOVERED', -- DISCOVERED, RESEARCHING, ELIGIBLE, REVIEW_REQUIRED, APPROVED, ONBOARDING, CONNECTED, LIVE, REJECTED, BLOCKED
    notes TEXT,
    discovered_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS marketplace_changes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    marketplace_id VARCHAR(100) REFERENCES marketplaces(id) ON DELETE CASCADE,
    change_type VARCHAR(100) NOT NULL, -- FEE_CHANGE, POLICY_UPDATE, API_DEPRECATION, TERMS_UPDATE
    old_value TEXT,
    new_value TEXT,
    confidence_score NUMERIC(4, 2) DEFAULT 0.95,
    action_required VARCHAR(255),
    detected_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- OPERATIONS QUEUE & AUTOMATION LOGS
-- ====================================================

CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    module VARCHAR(100) NOT NULL, -- CATALOG, COMPLIANCE, REVENUE, DISTRIBUTION, MARKETPLACE
    priority VARCHAR(50) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, URGENT
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, IN_PROGRESS, COMPLETED, CANCELLED
    assigned_to UUID REFERENCES users(id),
    due_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES users(id),
    actor_email VARCHAR(255),
    operation VARCHAR(100) NOT NULL, -- CREATE_PUBLICATION, UPDATE_PRICING, APPROVE_COMPLIANCE, SUBMIT_LISTING
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(255) NOT NULL,
    previous_value JSONB,
    new_value JSONB,
    source_ip VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================

ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users with active roles to view all publications
CREATE POLICY "Authenticated users can select publications"
    ON publications FOR SELECT
    TO authenticated
    USING (true);

-- Allow publisher & superadmin to modify publications
CREATE POLICY "Publishers can insert and update publications"
    ON publications FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.auth_id = auth.uid()
            AND users.role IN ('SUPERADMIN', 'PUBLISHER')
        )
    );

-- Audit log immutable append-only policy
CREATE POLICY "Audit logs are viewable by authenticated users"
    ON audit_events FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Audit logs insertable by active sessions"
    ON audit_events FOR INSERT
    TO authenticated
    WITH CHECK (true);
