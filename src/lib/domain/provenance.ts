/**
 * DRAWDOWN OS — CANONICAL DATA PROVENANCE
 * 
 * Explains and tracks the authoritative origin of operational values.
 */

export type DataProvenanceSource =
  | 'MARKETPLACE_API'
  | 'MARKETPLACE_WEBHOOK'
  | 'DATABASE'
  | 'USER_CONFIG'
  | 'DERIVED'
  | 'MANUAL_IMPORT';

export interface DataProvenance {
  sourceType: DataProvenanceSource;
  sourceId?: string;
  fetchedAt?: string;
  calculatedAt?: string;
  staleAfter?: string;
  isStale?: boolean;
}

export function createProvenance(
  sourceType: DataProvenanceSource,
  sourceId?: string
): DataProvenance {
  const now = new Date().toISOString();
  return {
    sourceType,
    sourceId,
    fetchedAt: now,
    calculatedAt: now,
    isStale: false,
  };
}
