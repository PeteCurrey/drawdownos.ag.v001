'use client';

import React, { useEffect, useState } from 'react';
import { 
  BookOpen, 
  Sliders, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Award, 
  Globe2, 
  Activity 
} from 'lucide-react';

export default function TelemetryGrid() {
  const [whopProductCount, setWhopProductCount] = useState<number>(0);
  const [whopProductName, setWhopProductName] = useState<string>('—');
  const [whopConnected, setWhopConnected] = useState<boolean>(false);

  useEffect(() => {
    async function loadWhopTelemetry() {
      try {
        const res = await fetch('/api/connectors/whop/products');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.products)) {
            setWhopConnected(true);
            setWhopProductCount(data.products.length);
            if (data.products.length > 0) {
              setWhopProductName(data.products[0].title);
            }
          }
        }
      } catch {
        // Unconnected
      }
    }
    loadWhopTelemetry();
  }, []);

  const telemetryItems = [
    { title: 'LIVE PRODUCTS', value: whopConnected ? whopProductCount : 0, sub: whopConnected ? 'Whop API Connected' : '0 Connected Products', icon: BookOpen, color: whopConnected ? '#22C55E' : '#626770' },
    { title: 'ACTIVE CHANNELS', value: whopConnected ? 1 : 0, sub: whopConnected ? '1 Live Channel (Whop)' : '0 Connected Channels', icon: Sliders, color: whopConnected ? '#22C55E' : '#626770' },
    { title: 'PUBLICATIONS QUEUED', value: 0, sub: 'Awaiting manuscript ingest', icon: Clock, color: '#626770' },
    { title: 'FAILED SYNCS', value: 0, sub: 'Zero sync errors', icon: AlertTriangle, color: '#22C55E' },
    { title: 'PENDING APPROVALS', value: 0, sub: 'No pending approvals', icon: CheckCircle2, color: '#626770' },
    { title: 'AFFILIATE SALES', value: 0, sub: 'Awaiting affiliate integration', icon: Users, color: '#626770' },
    { title: 'BEST SELLER', value: whopConnected && whopProductCount > 0 ? whopProductName : '—', sub: whopConnected && whopProductCount > 0 ? 'Whop Dashboard Title' : 'No sales records', icon: Award, color: whopConnected ? '#D6A84B' : '#626770' },
    { title: 'GLOBAL COVERAGE', value: whopConnected ? 'Whop Direct' : '0%', sub: whopConnected ? 'Whop Marketplace' : 'No active channels', icon: Globe2, color: whopConnected ? '#38BDF8' : '#626770' },
    { title: 'SYSTEM HEALTH', value: '100%', sub: 'Whop API Connector OK', icon: Activity, color: '#22C55E' },
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
              <div className="font-data text-base font-bold text-[#F5F6F7] truncate" title={String(item.value)}>{item.value}</div>
              <div className="text-[9px] font-data text-[#626770] truncate">{item.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
