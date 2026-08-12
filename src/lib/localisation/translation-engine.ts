/**
 * DRAWDOWN OS — GLOBAL LOCALISATION ENGINE
 * Translation Engine — Translation Memory Matcher, Term Base Enforcer,
 * and Numeric / Link Consistency Verifiers.
 */

import type { TranslationUnit, TranslationMemoryEntry, TermBaseEntry } from './types';
import { TRANSLATION_MEMORY, DRAWDOWN_TERM_BASE } from './demo-localisation-data';

// ─── TRANSLATION MEMORY MATCHER ───────────────────────────────────────────────

export interface TMMatchResult {
  hasMatch: boolean;
  matchScorePct: number;
  approvedTranslation?: string;
  matchedEntry?: TranslationMemoryEntry;
}

export function matchTranslationMemory(
  sourceText: string,
  localeCode: string
): TMMatchResult {
  const normalized = sourceText.trim().toLowerCase();

  for (const entry of TRANSLATION_MEMORY) {
    if (entry.localeCode === localeCode || entry.targetLanguage === localeCode.split('-')[0]) {
      if (entry.sourcePhrase.trim().toLowerCase() === normalized) {
        return {
          hasMatch: true,
          matchScorePct: 100,
          approvedTranslation: entry.approvedTranslation,
          matchedEntry: entry,
        };
      }
    }
  }

  return { hasMatch: false, matchScorePct: 0 };
}

// ─── TERM BASE ENFORCER ───────────────────────────────────────────────────────

export interface TermBaseCheckResult {
  isCompliant: boolean;
  termViolations: Array<{ term: string; classification: string; reason: string }>;
  termMatches: Array<{ term: string; preferredTranslation: string }>;
}

export function enforceTermBase(
  translatedText: string,
  localeCode: string
): TermBaseCheckResult {
  const violations: Array<{ term: string; classification: string; reason: string }> = [];
  const matches: Array<{ term: string; preferredTranslation: string }> = [];

  for (const term of DRAWDOWN_TERM_BASE) {
    const locInfo = term.translations[localeCode];
    if (locInfo) {
      if (locInfo.prohibited) {
        for (const prob of locInfo.prohibited) {
          if (translatedText.toLowerCase().includes(prob.toLowerCase())) {
            violations.push({
              term: term.termEn,
              classification: term.classification,
              reason: `Translation contains prohibited term "${prob}" for term "${term.termEn}". Preferred: "${locInfo.preferred}".`,
            });
          }
        }
      }
      if (locInfo.keepInEnglish && !translatedText.includes(term.termEn)) {
        violations.push({
          term: term.termEn,
          classification: 'LOCKED',
          reason: `Brand term "${term.termEn}" must remain locked in English for locale ${localeCode}.`,
        });
      }
      if (translatedText.includes(locInfo.preferred)) {
        matches.push({ term: term.termEn, preferredTranslation: locInfo.preferred });
      }
    }
  }

  return {
    isCompliant: violations.length === 0,
    termViolations: violations,
    termMatches: matches,
  };
}

// ─── NUMERIC CONSISTENCY VERIFIER ──────────────────────────────────────────────

export interface NumericConsistencyResult {
  isConsistent: boolean;
  sourceNumbers: number[];
  targetNumbers: number[];
  discrepancies: string[];
}

export function verifyNumericConsistency(
  sourceText: string,
  translatedText: string
): NumericConsistencyResult {
  const extractNumbers = (t: string) => {
    const matches = t.match(/\d+(?:[.,]\d+)?/g);
    return matches ? matches.map(n => parseFloat(n.replace(',', '.'))) : [];
  };

  const sourceNumbers = extractNumbers(sourceText);
  const targetNumbers = extractNumbers(translatedText);

  const discrepancies: string[] = [];

  for (const num of sourceNumbers) {
    if (!targetNumbers.includes(num)) {
      discrepancies.push(`Source number ${num} missing or modified in translated text.`);
    }
  }

  return {
    isConsistent: discrepancies.length === 0,
    sourceNumbers,
    targetNumbers,
    discrepancies,
  };
}
