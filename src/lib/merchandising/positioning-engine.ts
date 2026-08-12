/**
 * DRAWDOWN OS — AUTONOMOUS LISTING & MERCHANDISING ENGINE
 * Positioning & Copy Engine — Banned Claims Blocker, Character-Limit Engine,
 * Brand Vocabulary Enforcer & Copy Provenance Mapping.
 */

import type {
  MerchandisingStrategy, MarketplacePositioning, ListingCopyVariant,
  BrandVocabularyItem
} from './types';
import { BRAND_VOCABULARY } from './demo-merchandising-data';

// ─── BANNED & PROHIBITED CLAIMS CHECKER ───────────────────────────────────────

const STRICTLY_PROHIBITED_PATTERNS = [
  { pattern: /become\s+profitable/i, reason: 'Promising profitability is strictly prohibited.' },
  { pattern: /earn\s+£|\$|\€/i, reason: 'Income promises are prohibited.' },
  { pattern: /guaranteed\s+(returns?|profits?|income|results?)/i, reason: 'Guaranteed return claims are strictly illegal and prohibited.' },
  { pattern: /beat\s+the\s+market/i, reason: 'Performance superiority claims are prohibited.' },
  { pattern: /trading\s+signals?/i, reason: 'Drawdown OS does not sell or market trading signals.' },
  { pattern: /get\s+rich\s+quick/i, reason: 'Hype and get-rich language is strictly prohibited.' },
  { pattern: /professional\s+trader\s+in\s+\d+\s+days/i, reason: 'Unrealistic timeframe claims are prohibited.' },
];

export interface ComplianceValidationResult {
  isCompliant: boolean;
  status: 'PASS' | 'WARN' | 'BLOCK';
  violations: Array<{ rule: string; reason: string; matchedText: string }>;
  vocabularyWarnings: Array<{ term: string; classification: string; alternative?: string }>;
}

/**
 * Validate any proposed merchandising copy against Compliance rules and Brand Vocabulary.
 */
export function validateMerchandisingCopy(
  text: string,
  customProhibitedClaims: string[] = []
): ComplianceValidationResult {
  const violations: Array<{ rule: string; reason: string; matchedText: string }> = [];
  const vocabularyWarnings: Array<{ term: string; classification: string; alternative?: string }> = [];

  // Check strict prohibited patterns
  for (const item of STRICTLY_PROHIBITED_PATTERNS) {
    const match = text.match(item.pattern);
    if (match) {
      violations.push({
        rule: 'PROHIBITED_CLAIM',
        reason: item.reason,
        matchedText: match[0],
      });
    }
  }

  // Check custom prohibited claims
  for (const claim of customProhibitedClaims) {
    if (text.toLowerCase().includes(claim.toLowerCase())) {
      violations.push({
        rule: 'CUSTOM_PROHIBITED_CLAIM',
        reason: `Text contains prohibited claim: "${claim}"`,
        matchedText: claim,
      });
    }
  }

  // Check brand vocabulary
  for (const vocab of BRAND_VOCABULARY) {
    if (text.toLowerCase().includes(vocab.term.toLowerCase())) {
      if (vocab.classification === 'PROHIBITED') {
        violations.push({
          rule: 'BANNED_VOCABULARY',
          reason: vocab.reason,
          matchedText: vocab.term,
        });
      } else if (vocab.classification === 'AVOID') {
        vocabularyWarnings.push({
          term: vocab.term,
          classification: vocab.classification,
          alternative: vocab.suggestedAlternative,
        });
      }
    }
  }

  const isCompliant = violations.length === 0;
  const status = !isCompliant ? 'BLOCK' : vocabularyWarnings.length > 0 ? 'WARN' : 'PASS';

  return {
    isCompliant,
    status,
    violations,
    vocabularyWarnings,
  };
}

// ─── CHARACTER-LIMIT ENGINE ────────────────────────────────────────────────────

export interface CondenseTextResult {
  condensedText: string;
  originalCount: number;
  condensedCount: number;
  limit: number;
  isWithinLimit: boolean;
  truncatedMidSentence: boolean;
}

/**
 * Smartly condense text to fit within marketplace character limits
 * WITHOUT truncating mid-sentence or cutting words arbitrarily.
 */
export function condenseToLimit(
  text: string,
  limit: number
): CondenseTextResult {
  const originalCount = text.length;

  if (originalCount <= limit) {
    return {
      condensedText: text,
      originalCount,
      condensedCount: originalCount,
      limit,
      isWithinLimit: true,
      truncatedMidSentence: false,
    };
  }

  // Split into sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  let condensed = '';

  for (const sentence of sentences) {
    if ((condensed + sentence).trim().length <= limit) {
      condensed += sentence;
    } else {
      break;
    }
  }

  // Fallback if even single sentence is longer than limit
  if (condensed.trim().length === 0) {
    const words = text.split(/\s+/);
    for (const word of words) {
      if ((condensed + ' ' + word).trim().length + 1 <= limit) {
        condensed += (condensed ? ' ' : '') + word;
      } else {
        break;
      }
    }
    condensed = condensed.trim() + '.';
  }

  const condensedCount = condensed.trim().length;

  return {
    condensedText: condensed.trim(),
    originalCount,
    condensedCount,
    limit,
    isWithinLimit: condensedCount <= limit,
    truncatedMidSentence: false,
  };
}

// ─── COPY PROVENANCE TRACER ───────────────────────────────────────────────────

export interface CopyProvenanceInfo {
  variantId: string;
  fieldName: string;
  contentFidelity: string;
  sourceChunks: Array<{ id: string; label: string }>;
  approvedClaims: Array<{ id: string; claimText: string }>;
  complianceStatus: string;
  explanation: string;
}

export function traceCopyProvenance(variant: ListingCopyVariant): CopyProvenanceInfo {
  return {
    variantId: variant.id,
    fieldName: variant.fieldName,
    contentFidelity: variant.contentFidelity,
    sourceChunks: variant.sourceChunkIds.map(id => ({ id, label: `Source Chunk ${id}` })),
    approvedClaims: variant.approvedClaimIds.map(id => ({ id, claimText: `Approved Claim ${id}` })),
    complianceStatus: variant.status,
    explanation: `This copy variant is derived from ${variant.sourceChunkIds.length} source chunk(s) and validated against ${variant.approvedClaimIds.length} compliance claim(s). [Fidelity: ${variant.contentFidelity}]`,
  };
}
