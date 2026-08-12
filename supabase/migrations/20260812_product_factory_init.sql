-- ============================================================
-- DRAWDOWN OS — PUBLICATION & PRODUCT FACTORY
-- Migration: 20260812_product_factory_init.sql
-- ============================================================

-- ENUMS --------------------------------------------------------

CREATE TYPE source_quality_state AS ENUM (
  'UPLOADED', 'PROCESSING', 'PARSED', 'STRUCTURED',
  'REVIEW_REQUIRED', 'APPROVED_SOURCE', 'PARSE_WARNING', 'FAILED'
);

CREATE TYPE content_element_type AS ENUM (
  'TITLE', 'SUBTITLE', 'PARAGRAPH', 'HEADING', 'SUBHEADING',
  'TABLE', 'FIGURE', 'IMAGE', 'DIAGRAM', 'CALLOUT',
  'WARNING', 'INSIGHT', 'FRAMEWORK', 'CHECKLIST', 'WORKSHEET',
  'EXERCISE', 'GLOSSARY_TERM', 'REFERENCE', 'DISCLAIMER',
  'COPYRIGHT', 'BIOGRAPHY', 'CTA', 'OTHER'
);

CREATE TYPE ip_node_type AS ENUM (
  'PUBLICATION', 'CHAPTER', 'SECTION', 'FIGURE', 'TABLE',
  'WORKSHEET', 'CHECKLIST', 'REFERENCE', 'GLOSSARY',
  'FRAMEWORK', 'PRODUCT', 'DERIVATIVE', 'FORMAT',
  'EDITION', 'BUNDLE', 'LANGUAGE', 'MARKETPLACE_PACKAGE'
);

CREATE TYPE ip_edge_type AS ENUM (
  'CONTAINS', 'DERIVED_FROM', 'PART_OF', 'REFERENCES',
  'USED_IN', 'TRANSLATED_FROM', 'BUNDLED_WITH', 'VERSION_OF'
);

CREATE TYPE ip_asset_class AS ENUM (
  'CORE_EDUCATION', 'REFERENCE', 'FRAMEWORK', 'PROCESS',
  'WORKSHEET', 'CHECKLIST', 'TEMPLATE', 'TOOLKIT',
  'VISUAL_EXPLANATION', 'GLOSSARY', 'PROGRAMME', 'ASSESSMENT'
);

CREATE TYPE product_opportunity_type AS ENUM (
  'EXTRACTABLE', 'REPACKAGE', 'EXPAND', 'NEW_PRODUCT', 'BUNDLE', 'FORMAT', 'LANGUAGE'
);

CREATE TYPE product_release_status AS ENUM (
  'IDEA', 'OPPORTUNITY', 'APPROVED_FOR_DEVELOPMENT', 'IN_FACTORY',
  'QA', 'READY', 'APPROVED_FOR_SALE', 'LIVE', 'PAUSED', 'RETIRED', 'ARCHIVED'
);

CREATE TYPE opportunity_backlog_status AS ENUM (
  'NEW', 'REVIEWING', 'BACKLOG', 'APPROVED', 'REJECTED', 'DEFERRED', 'IN_FACTORY'
);

CREATE TYPE format_type AS ENUM (
  'PREMIUM_PDF', 'COMPRESSED_PDF', 'PRINTABLE_PDF', 'SAMPLE_PDF',
  'WORKBOOK_PDF', 'REFLOWABLE_EPUB3', 'FIXED_LAYOUT_EPUB',
  'KINDLE_PACKAGE', 'PRINT_INTERIOR', 'PRINT_COVER',
  'AUDIO_SOURCE', 'COURSE_SOURCE', 'MARKDOWN_SOURCE', 'HTML_SOURCE'
);

CREATE TYPE format_status AS ENUM (
  'NOT_REQUIRED', 'REQUIRED', 'QUEUED', 'GENERATING',
  'VALIDATING', 'NEEDS_QA', 'APPROVED', 'FAILED', 'SUPERSEDED'
);

CREATE TYPE asset_type AS ENUM (
  'COVER', 'THUMBNAIL', 'HERO', 'PAGE_PREVIEW', 'MOCKUP',
  'GALLERY_IMAGE', 'SOCIAL_IMAGE', 'BANNER', 'AFFILIATE_CREATIVE',
  'SAMPLE_IMAGE', 'FAMILY_GRAPHIC'
);

CREATE TYPE content_fidelity AS ENUM (
  'SOURCE_DERIVED', 'AI_GENERATED', 'EDITORIALLY_CREATED', 'MARKETING_CONTENT'
);

CREATE TYPE package_status AS ENUM (
  'INCOMPLETE', 'READY', 'APPROVED', 'PUBLISHED', 'STALE'
);

CREATE TYPE qa_type AS ENUM (
  'SOURCE_QA', 'EPUB_QA', 'VISUAL_QA', 'PRODUCT_QA',
  'TRANSLATION_QA', 'COMPLIANCE_QA', 'MARKETPLACE_PACKAGE_QA'
);

CREATE TYPE qa_status AS ENUM (
  'PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'ANNOTATED', 'REGENERATE'
);

CREATE TYPE rights_state AS ENUM (
  'OWNED', 'LICENSED', 'FAIR_USE_REVIEW', 'ATTRIBUTION_REQUIRED',
  'RESTRICTED', 'UNKNOWN'
);

CREATE TYPE translation_state AS ENUM (
  'SOURCE', 'TRANSLATED_DRAFT', 'REVIEW', 'APPROVED', 'PUBLISHED'
);

CREATE TYPE factory_job_type AS ENUM (
  'PARSE_SOURCE', 'GENERATE_CONTENT_MAP', 'ANALYSE_IP', 'PROPOSE_PRODUCTS',
  'GENERATE_FORMAT', 'VALIDATE_FORMAT', 'GENERATE_ASSET', 'GENERATE_METADATA',
  'BUILD_SAMPLE', 'BUILD_MARKETPLACE_PACKAGE', 'LOCALISE',
  'CHECK_COMPLIANCE', 'RUN_QA', 'CALCULATE_READINESS'
);

CREATE TYPE factory_job_status AS ENUM (
  'QUEUED', 'RUNNING', 'WAITING_HUMAN', 'COMPLETE', 'FAILED', 'CANCELLED'
);

CREATE TYPE customer_job AS ENUM (
  'LEARN', 'REFERENCE', 'PLAN', 'TRACK', 'PRACTISE', 'ASSESS', 'IMPLEMENT', 'REVIEW'
);

-- CORE TABLES --------------------------------------------------

-- Master source publications
CREATE TABLE IF NOT EXISTS source_publications (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_id          TEXT UNIQUE NOT NULL,           -- e.g. DD-HTT-001
  title                 TEXT NOT NULL,
  subtitle              TEXT,
  author                TEXT,
  publisher             TEXT,
  edition               TEXT,
  language              TEXT DEFAULT 'en',
  copyright_year        INT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Immutable source asset versions (never overwritten)
CREATE TABLE IF NOT EXISTS source_assets (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publication_id        UUID REFERENCES source_publications(id),
  version               TEXT NOT NULL DEFAULT 'v1',
  quality_state         source_quality_state DEFAULT 'UPLOADED',
  page_count            INT,
  chapter_count         INT,
  word_count_estimate   INT,
  checksum_sha256       TEXT,
  r2_key                TEXT,          -- Authoritative storage reference
  file_size_bytes       BIGINT,
  mime_type             TEXT DEFAULT 'application/pdf',
  parse_warnings        JSONB DEFAULT '[]',
  ingested_at           TIMESTAMPTZ DEFAULT NOW(),
  approved_at           TIMESTAMPTZ,
  approved_by           TEXT,
  is_current            BOOLEAN DEFAULT TRUE,
  UNIQUE(publication_id, version)
);

-- Individual content elements (chapters, sections, tables, etc.)
CREATE TABLE IF NOT EXISTS content_elements (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_asset_id       UUID REFERENCES source_assets(id),
  publication_id        UUID REFERENCES source_publications(id),
  element_type          content_element_type NOT NULL,
  chapter_num           INT,
  chapter_title         TEXT,
  section_title         TEXT,
  heading               TEXT,
  page_start            INT,
  page_end              INT,
  content_fidelity      content_fidelity DEFAULT 'SOURCE_DERIVED',
  text_preview          TEXT,          -- First 500 chars for UI display
  full_text_r2_key      TEXT,          -- Full text stored in R2
  content_hash          TEXT,          -- SHA-256 for duplicate detection
  word_count            INT,
  reuse_eligibility     BOOLEAN DEFAULT TRUE,
  standalone_potential  SMALLINT CHECK (standalone_potential BETWEEN 0 AND 100),
  commercial_potential  SMALLINT CHECK (commercial_potential BETWEEN 0 AND 100),
  editorial_work_required BOOLEAN DEFAULT FALSE,
  compliance_sensitivity SMALLINT CHECK (compliance_sensitivity BETWEEN 0 AND 100),
  metadata              JSONB DEFAULT '{}',
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- IP Graph nodes
CREATE TABLE IF NOT EXISTS ip_graph_nodes (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publication_id        UUID REFERENCES source_publications(id),
  node_type             ip_node_type NOT NULL,
  label                 TEXT NOT NULL,
  source_chunk_id       UUID REFERENCES content_elements(id),
  ip_class              ip_asset_class,
  standalone_potential  SMALLINT CHECK (standalone_potential BETWEEN 0 AND 100),
  commercial_potential  SMALLINT CHECK (commercial_potential BETWEEN 0 AND 100),
  metadata              JSONB DEFAULT '{}',
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- IP Graph edges (relationships between nodes)
CREATE TABLE IF NOT EXISTS ip_graph_edges (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_node_id        UUID REFERENCES ip_graph_nodes(id),
  target_node_id        UUID REFERENCES ip_graph_nodes(id),
  relationship_type     ip_edge_type NOT NULL,
  weight                NUMERIC(5,2) DEFAULT 1.0,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Product families (e.g. "HOW TO TRADE FAMILY")
CREATE TABLE IF NOT EXISTS product_families (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_publication_id UUID REFERENCES source_publications(id),
  canonical_id          TEXT UNIQUE NOT NULL,     -- e.g. HTT-FAMILY
  family_name           TEXT NOT NULL,
  description           TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Product opportunities (ideas → approved products)
CREATE TABLE IF NOT EXISTS product_opportunities (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id             UUID REFERENCES product_families(id),
  publication_id        UUID REFERENCES source_publications(id),
  proposed_sku          TEXT,
  title                 TEXT NOT NULL,
  subtitle              TEXT,
  opportunity_type      product_opportunity_type NOT NULL,
  backlog_status        opportunity_backlog_status DEFAULT 'NEW',
  customer_job          customer_job,
  target_audience       TEXT,
  learning_level        TEXT,
  source_coverage_pct   SMALLINT CHECK (source_coverage_pct BETWEEN 0 AND 100),
  distinctiveness_score SMALLINT CHECK (distinctiveness_score BETWEEN 0 AND 100),
  rsa_unlock_pts        NUMERIC(5,2),
  editorial_effort      TEXT,          -- 'LOW' | 'MEDIUM' | 'HIGH'
  design_effort         TEXT,
  compliance_risk       TEXT,
  confidence            TEXT,          -- 'LOW' | 'MEDIUM' | 'HIGH'
  why_standalone        TEXT,
  rejection_reason      TEXT,
  review_after_date     DATE,
  proposed_formats      TEXT[],
  potential_marketplaces TEXT[],
  source_element_ids    UUID[],        -- References to content_elements
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Approved product specifications (manufacturing BOM source)
CREATE TABLE IF NOT EXISTS product_specifications (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id        UUID REFERENCES product_opportunities(id),
  family_id             UUID REFERENCES product_families(id),
  publication_id        UUID REFERENCES source_publications(id),
  product_sku           TEXT UNIQUE NOT NULL,     -- e.g. DD-HTT-WB-001
  canonical_name        TEXT NOT NULL,
  subtitle              TEXT,
  product_type          TEXT,
  customer_job          customer_job,
  target_audience       TEXT,
  learning_level        TEXT,
  language              TEXT DEFAULT 'en',
  territories           TEXT[] DEFAULT ARRAY['GLOBAL'],
  compliance_class      TEXT DEFAULT 'EDUCATION',
  release_status        product_release_status DEFAULT 'APPROVED_FOR_DEVELOPMENT',
  source_elements       UUID[],
  editorial_requirements TEXT,
  format_requirements   TEXT[],
  asset_requirements    TEXT[],
  marketplace_targets   TEXT[],
  price_strategy        TEXT,
  source_coverage_pct   SMALLINT,
  product_version       TEXT DEFAULT 'v1',
  content_approved_at   TIMESTAMPTZ,
  commercial_approved_at TIMESTAMPTZ,
  approved_by           TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Product source element mappings (exact provenance)
CREATE TABLE IF NOT EXISTS product_source_mappings (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_sku           TEXT NOT NULL,
  content_element_id    UUID REFERENCES content_elements(id),
  source_asset_version  TEXT,
  source_page           INT,
  source_section        TEXT,
  source_heading        TEXT,
  extraction_method     TEXT,
  content_fidelity      content_fidelity NOT NULL,
  review_status         TEXT DEFAULT 'PENDING',
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Digital Product Bills of Materials
CREATE TABLE IF NOT EXISTS product_boms (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_sku           TEXT UNIQUE NOT NULL,
  required_formats      JSONB DEFAULT '[]',        -- [{type, status, blocking}]
  required_assets       JSONB DEFAULT '[]',        -- [{type, status, marketplace}]
  required_metadata     JSONB DEFAULT '[]',        -- [{field, status, source}]
  marketplace_packages  JSONB DEFAULT '[]',        -- [{marketplace_id, status}]
  readiness_score_pct   SMALLINT CHECK (readiness_score_pct BETWEEN 0 AND 100),
  content_pct           SMALLINT,
  format_pct            SMALLINT,
  assets_pct            SMALLINT,
  metadata_pct          SMALLINT,
  compliance_pct        SMALLINT,
  market_requirements_pct SMALLINT,
  blocking_items        JSONB DEFAULT '[]',
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Format manufacturing jobs
CREATE TABLE IF NOT EXISTS factory_formats (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_sku           TEXT NOT NULL,
  format_type           format_type NOT NULL,
  format_version        TEXT DEFAULT 'v1',
  status                format_status DEFAULT 'REQUIRED',
  r2_key                TEXT,
  file_size_bytes       BIGINT,
  page_count            INT,
  checksum_sha256       TEXT,
  validation_results    JSONB DEFAULT '{}',
  qa_notes              TEXT,
  approved_at           TIMESTAMPTZ,
  approved_by           TEXT,
  superseded_by         UUID,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_sku, format_type, format_version)
);

-- Product assets (covers, thumbnails, gallery images)
CREATE TABLE IF NOT EXISTS product_assets (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_sku           TEXT,
  publication_id        UUID REFERENCES source_publications(id),
  asset_type            asset_type NOT NULL,
  label                 TEXT,
  is_canonical          BOOLEAN DEFAULT FALSE,     -- Master source asset
  parent_asset_id       UUID,                      -- Derived from canonical
  width_px              INT,
  height_px             INT,
  aspect_ratio          TEXT,
  r2_key                TEXT,
  file_size_bytes       BIGINT,
  mime_type             TEXT,
  checksum_sha256       TEXT,
  marketplace_targets   TEXT[],
  approved_at           TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Marketplace packages (product × marketplace)
CREATE TABLE IF NOT EXISTS marketplace_packages (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_sku           TEXT NOT NULL,
  marketplace_id        TEXT NOT NULL,
  package_status        package_status DEFAULT 'INCOMPLETE',
  format_r2_key         TEXT,
  cover_r2_key          TEXT,
  title_override        TEXT,
  description           TEXT,
  keywords              TEXT[],
  categories            TEXT[],
  price                 NUMERIC(10,4),
  currency              TEXT DEFAULT 'GBP',
  identifier            TEXT,          -- ISBN or marketplace-specific SKU
  sample_r2_key         TEXT,
  disclaimer_included   BOOLEAN DEFAULT FALSE,
  package_version       TEXT DEFAULT 'v1',
  approved_at           TIMESTAMPTZ,
  approved_by           TEXT,
  published_at          TIMESTAMPTZ,
  stale_since           TIMESTAMPTZ,
  previous_version      JSONB,         -- Snapshot for diff display
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_sku, marketplace_id, package_version)
);

-- Factory QA reviews
CREATE TABLE IF NOT EXISTS factory_qa_reviews (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type           TEXT NOT NULL,     -- 'format' | 'asset' | 'package' | 'translation'
  entity_id             UUID NOT NULL,
  qa_type               qa_type NOT NULL,
  status                qa_status DEFAULT 'PENDING',
  reviewer              TEXT,
  reviewer_notes        TEXT,
  annotations           JSONB DEFAULT '[]',
  reviewed_at           TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Background factory jobs
CREATE TABLE IF NOT EXISTS factory_jobs (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_type              factory_job_type NOT NULL,
  status                factory_job_status DEFAULT 'QUEUED',
  publication_id        UUID REFERENCES source_publications(id),
  product_sku           TEXT,
  entity_type           TEXT,
  entity_id             UUID,
  priority              SMALLINT DEFAULT 50,
  progress_pct          SMALLINT DEFAULT 0,
  progress_stage        TEXT,
  payload               JSONB DEFAULT '{}',
  result                JSONB,
  error_message         TEXT,
  started_at            TIMESTAMPTZ,
  completed_at          TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Localised / translated editions
CREATE TABLE IF NOT EXISTS localised_editions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_product_sku    TEXT NOT NULL,
  language              TEXT NOT NULL,
  locale                TEXT,
  state                 translation_state DEFAULT 'SOURCE',
  translator            TEXT,
  translation_notes     TEXT,
  r2_key                TEXT,
  approved_at           TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(parent_product_sku, language)
);

-- Translation memory (controlled terminology)
CREATE TABLE IF NOT EXISTS translation_memory (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_phrase         TEXT NOT NULL,
  language              TEXT NOT NULL,
  approved_translation  TEXT NOT NULL,
  context               TEXT,
  approved_by           TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(source_phrase, language)
);

-- Rights records per product/edition
CREATE TABLE IF NOT EXISTS rights_records (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_sku           TEXT NOT NULL,
  copyright_owner       TEXT,
  territories           TEXT[],
  language_rights       TEXT[],
  format_rights         TEXT[],
  distribution_restrictions TEXT,
  licensed_material_notes TEXT,
  rights_state          rights_state DEFAULT 'OWNED',
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Third-party material tracking
CREATE TABLE IF NOT EXISTS third_party_assets (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_element_id    UUID REFERENCES content_elements(id),
  asset_description     TEXT,
  rights_state          rights_state NOT NULL,
  attribution_text      TEXT,
  license_url           TEXT,
  restriction_notes     TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Bundle definitions
CREATE TABLE IF NOT EXISTS bundle_components (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_sku            TEXT NOT NULL,
  component_sku         TEXT NOT NULL,
  component_version     TEXT DEFAULT 'v1',
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(bundle_sku, component_sku)
);

-- ISBN pool management
CREATE TABLE IF NOT EXISTS isbn_pool (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  isbn_13               TEXT UNIQUE NOT NULL,
  status                TEXT DEFAULT 'AVAILABLE',   -- AVAILABLE | RESERVED | ASSIGNED | RETIRED
  product_sku           TEXT,
  format_type           TEXT,
  language              TEXT,
  edition               TEXT,
  assigned_at           TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES -------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_source_assets_publication ON source_assets(publication_id);
CREATE INDEX IF NOT EXISTS idx_content_elements_publication ON content_elements(publication_id);
CREATE INDEX IF NOT EXISTS idx_content_elements_source_asset ON content_elements(source_asset_id);
CREATE INDEX IF NOT EXISTS idx_content_elements_type ON content_elements(element_type);
CREATE INDEX IF NOT EXISTS idx_ip_graph_nodes_publication ON ip_graph_nodes(publication_id);
CREATE INDEX IF NOT EXISTS idx_ip_graph_edges_source ON ip_graph_edges(source_node_id);
CREATE INDEX IF NOT EXISTS idx_ip_graph_edges_target ON ip_graph_edges(target_node_id);
CREATE INDEX IF NOT EXISTS idx_product_opportunities_family ON product_opportunities(family_id);
CREATE INDEX IF NOT EXISTS idx_product_opportunities_status ON product_opportunities(backlog_status);
CREATE INDEX IF NOT EXISTS idx_product_specifications_sku ON product_specifications(product_sku);
CREATE INDEX IF NOT EXISTS idx_product_specifications_family ON product_specifications(family_id);
CREATE INDEX IF NOT EXISTS idx_factory_formats_sku ON factory_formats(product_sku);
CREATE INDEX IF NOT EXISTS idx_marketplace_packages_sku ON marketplace_packages(product_sku);
CREATE INDEX IF NOT EXISTS idx_marketplace_packages_marketplace ON marketplace_packages(marketplace_id);
CREATE INDEX IF NOT EXISTS idx_factory_jobs_status ON factory_jobs(status);
CREATE INDEX IF NOT EXISTS idx_factory_jobs_publication ON factory_jobs(publication_id);
CREATE INDEX IF NOT EXISTS idx_factory_qa_entity ON factory_qa_reviews(entity_type, entity_id);

-- ROW-LEVEL SECURITY -------------------------------------------

ALTER TABLE source_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE source_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_elements ENABLE ROW LEVEL SECURITY;
ALTER TABLE ip_graph_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ip_graph_edges ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_families ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_source_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_boms ENABLE ROW LEVEL SECURITY;
ALTER TABLE factory_formats ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE factory_qa_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE factory_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE localised_editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE rights_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE third_party_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE bundle_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE isbn_pool ENABLE ROW LEVEL SECURITY;
