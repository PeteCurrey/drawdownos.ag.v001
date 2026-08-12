import { ExecutiveSignal, ExecutiveInsight, InsightCategory, InsightStatus } from './types';

export function processSignals(signals: ExecutiveSignal[]): ExecutiveInsight[] {
  const insights: ExecutiveInsight[] = [];
  const grouped = groupSignalsByEntity(signals);

  grouped.forEach((entitySignals, entityId) => {
    const signalIds = entitySignals.map(s => s.id);
    const affectedEntityNames = Array.from(new Set(entitySignals.map(s => s.entityName)));
    const totalExposure = entitySignals.reduce((acc, s) => acc + (s.deltaAbsolute || 0), 0);

    const isDemo = entitySignals.some(s => s.isDemo);
    
    let category: InsightCategory = 'PERFORMANCE';
    if (entitySignals.some(s => s.type === 'OPPORTUNITY_DETECTED')) category = 'OPPORTUNITY';
    if (entitySignals.some(s => s.type === 'REFUND_ANOMALY')) category = 'ANOMALY';
    
    let status: InsightStatus = 'NEW';

    insights.push({
      id: `insight-${entityId}-${Date.now()}`,
      signalIds,
      category,
      status,
      title: `Combined insights for ${affectedEntityNames.join(', ')}`,
      narrative: `Detected ${entitySignals.length} signals impacting this entity.`,
      whyItMatters: 'Requires attention due to aggregated signal volume.',
      financialExposureGbp: totalExposure,
      affectedEntityNames,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDemo
    });
  });

  return insights;
}

export function groupSignalsByEntity(signals: ExecutiveSignal[]): Map<string, ExecutiveSignal[]> {
  const map = new Map<string, ExecutiveSignal[]>();
  for (const signal of signals) {
    const key = signal.entityId || 'system-wide';
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(signal);
  }
  return map;
}

export function calculateSignalVelocity(signal: ExecutiveSignal): 'ACCELERATING' | 'STABLE' | 'DECELERATING' {
  if (!signal.deltaPct) return 'STABLE';
  if (signal.deltaPct > 10) return 'ACCELERATING';
  if (signal.deltaPct < -10) return 'DECELERATING';
  return 'STABLE';
}
