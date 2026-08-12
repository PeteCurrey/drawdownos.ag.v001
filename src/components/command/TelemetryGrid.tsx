'use client';

import React from 'react';
import { 
  BookOpen, 
  Sliders, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Award, 
  Globe2, 
  TrendingUp, 
  Activity 
} from 'lucide-react';
import { DEMO_TELEMETRY_METRICS } from '@/lib/demo-data';

export default function TelemetryGrid() {
  const metrics = DEMO_TELEMETRY_METRICS;

  const telemetryItems = [
    { title: 'LIVE PRODUCTS', value: metrics.liveProductsCount, sub: 'Across 6 commercial formats', icon: BookOpen, color: '#22C55E' },
    { title: 'ACTIVE CHANNELS', value: metrics.activeChannelsCount, sub: '9 direct, 3 aggregator', icon: Sliders, color: '#38BDF8' },
    { title: 'PUBLICATIONS QUEUED', value: metrics.queuedPublicationsCount, sub: 'Format factory processing', icon: Clock, color: '#D6A84B' },
    { title: 'FAILED SYNCS', value: metrics.failedSyncsCount, sub: 'Zero sync errors', icon: AlertTriangle, color: '#22C55E' },
    { title: 'PENDING APPROVALS', value: metrics.pendingApprovalsCount, sub: 'Compliance review required', icon: CheckCircle2, color: '#FF6A18' },
    { title: 'AFFILIATE SALES', value: metrics.affiliateSalesCount, sub: 'This month via 18 affiliates', icon: Users, color: '#D6A84B' },
    { title: 'BEST SELLER', value: 'DD-HTT-001', sub: 'HOW TO TRADE (PDF V1)', icon: Award, color: '#D6A84B' },
    { title: 'GLOBAL COVERAGE', value: `${metrics.globalCoveragePercent}%`, sub: 'US, UK, EU, LATAM, APAC', icon: Globe2, color: '#38BDF8' },
    { title: 'SYSTEM HEALTH', value: `${metrics.systemHealthPercent}%`, sub: 'All background workers OK', icon: Activity, color: '#22C55E' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-9 gap-3">
      {telemetryItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="industrial-panel p-3.5 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-display text-[#A2A6AD] tracking-wider">{item.title}</span>
              <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
            </div>
            <div className="my-2">
              <div className="font-data text-lg font-bold text-[#F5F6F7]">{item.value}</div>
              <div className="text-[9px] font-data text-[#626770] truncate">{item.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
