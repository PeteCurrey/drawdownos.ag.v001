// DRAWDOWN OS — FIELD MAPPING ENGINE & READINESS EVALUATOR (§8, §9, §11, §12)

import { FieldMapping, TransformRule } from './types';

// ========================================================
// 1. TRANSFORMATION FUNCTIONS (§9)
// ========================================================

export function executeTransform(
  value: any,
  transformRule: TransformRule,
  config: Record<string, any> = {}
): any {
  if (value === undefined || value === null) return '';

  const strVal = String(value);

  switch (transformRule) {
    case 'TRUNCATE': {
      const max = config.maxLength || 140;
      if (strVal.length <= max) return strVal;
      return strVal.substring(0, max - 3) + '...';
    }

    case 'STRIP_HTML':
      return strVal.replace(/<[^>]*>?/gm, '').trim();

    case 'CONVERT_MARKDOWN':
      return strVal.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');

    case 'HTML_SANITIZE':
      return strVal.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    case 'SLUGIFY':
      return strVal
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');

    case 'UPPERCASE':
      return strVal.toUpperCase();

    case 'LOWERCASE':
      return strVal.toLowerCase();

    case 'CURRENCY_CONVERT': {
      const rate = config.rate || 1.0;
      const num = parseFloat(strVal) || 0;
      return (num * rate).toFixed(2);
    }

    case 'DATE_FORMAT': {
      try {
        const d = new Date(strVal);
        return d.toISOString().split('T')[0]; // YYYY-MM-DD
      } catch {
        return strVal;
      }
    }

    case 'ENUM_MAP': {
      const map = config.enumMap || {};
      return map[strVal] || strVal;
    }

    case 'TEMPLATE': {
      const tmpl = config.template || '{val}';
      return tmpl.replace('{val}', strVal);
    }

    case 'DIRECT':
    default:
      return value;
  }
}

// ========================================================
// 2. READINESS SCORE EVALUATOR (§11, §12)
// ========================================================

export interface ConnectorReadinessReport {
  connectorId: string;
  connectorReadyPct: number;
  accountReadyPct: number;
  publishingReadyPct: number;
  salesImportReadyPct: number;
  overallReadinessScore: number;
  blockingFields: string[];
  missingFields: string[];
  isAutopilotCertified: boolean;
}

export function evaluateConnectorReadiness(
  connectorId: string,
  mappings: FieldMapping[],
  sourcePublication: Record<string, any>
): ConnectorReadinessReport {
  const blockingFields: string[] = [];
  const missingFields: string[] = [];

  let requiredCount = 0;
  let requiredPassed = 0;
  let totalCount = mappings.length;
  let totalPassed = 0;

  mappings.forEach(m => {
    const rawVal = sourcePublication[m.drawdownField];
    const exists = rawVal !== undefined && rawVal !== null && String(rawVal).trim() !== '';

    if (m.isRequired) {
      requiredCount++;
      if (exists) {
        requiredPassed++;
      } else {
        blockingFields.push(`${m.targetField} (from ${m.drawdownField})`);
      }
    }

    if (exists) {
      totalPassed++;
    } else {
      missingFields.push(m.drawdownField);
    }
  });

  const publishingReadyPct = requiredCount > 0 ? Math.round((requiredPassed / requiredCount) * 100) : 100;
  const overallReadinessScore = totalCount > 0 ? Math.round((totalPassed / totalCount) * 100) : 100;

  return {
    connectorId,
    connectorReadyPct: 100,
    accountReadyPct: 92,
    publishingReadyPct,
    salesImportReadyPct: 100,
    overallReadinessScore,
    blockingFields,
    missingFields,
    isAutopilotCertified: publishingReadyPct === 100,
  };
}

// ========================================================
// 3. LIVE TEST TRANSFORMER (§10)
// ========================================================

export interface LiveMappingTestResult {
  inputPayload: Record<string, any>;
  appliedTransforms: Array<{
    drawdownField: string;
    targetField: string;
    transformRule: TransformRule;
    inputVal: any;
    outputVal: any;
  }>;
  outputPayload: Record<string, any>;
  readinessReport: ConnectorReadinessReport;
}

export function runLiveMappingTest(
  connectorId: string,
  mappings: FieldMapping[],
  sampleSourceData: Record<string, any>
): LiveMappingTestResult {
  const appliedTransforms: LiveMappingTestResult['appliedTransforms'] = [];
  const outputPayload: Record<string, any> = {};

  mappings.forEach(m => {
    const inputVal = sampleSourceData[m.drawdownField] ?? m.sampleValue;
    const outputVal = executeTransform(inputVal, m.transformRule, m.transformConfig);

    appliedTransforms.push({
      drawdownField: m.drawdownField,
      targetField: m.targetField,
      transformRule: m.transformRule,
      inputVal,
      outputVal,
    });

    outputPayload[m.targetField] = outputVal;
  });

  const readinessReport = evaluateConnectorReadiness(connectorId, mappings, sampleSourceData);

  return {
    inputPayload: sampleSourceData,
    appliedTransforms,
    outputPayload,
    readinessReport,
  };
}
