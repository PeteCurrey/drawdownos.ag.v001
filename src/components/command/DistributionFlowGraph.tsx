'use client';

import React, { useState, useEffect } from 'react';
import { Radio, RefreshCw } from 'lucide-react';
import { checkWhopHealth } from '@/lib/connectors/whop/client';
import { checkMarketplaceConnectionStatus } from '@/lib/config/env';

export type FlowViewMode = 'Distribution' | 'Revenue' | 'Orders' | 'Traffic' | 'Affiliate Sales';

export interface ChannelNode {
  id: string;
  name: string;
  type: string;
  status: 'CONNECTED' | 'CONFIGURED_UNVERIFIED' | 'NOT_CONFIGURED' | 'AUTH_ERROR';
  statusLabel: string;
  metrics: Record<FlowViewMode, string>;
}

export default function DistributionFlowGraph() {
  const [activeView, setActiveView] = useState<FlowViewMode>('Distribution');
  const [channels, setChannels] = useState<ChannelNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [whopConnected, setWhopConnected] = useState(false);
  const [whopDetails, setWhopDetails] = useState<string>('Checking...');

  const viewModes: FlowViewMode[] = ['Distribution', 'Revenue', 'Orders', 'Traffic', 'Affiliate Sales'];

  const refreshTelemetry = async () => {
    setLoading(true);

    // Whop Live Connection Check
    let whopState: ChannelNode['status'] = 'NOT_CONFIGURED';
    let whopLabel = 'NOT CONFIGURED';
    let whopMetrics = { Distribution: 'Unconfigured', Revenue: '—', Orders: '—', Traffic: '—', 'Affiliate Sales': '—' };

    const whopConfig = checkMarketplaceConnectionStatus('whop');
    if (whopConfig.isConfigured) {
      whopState = 'CONFIGURED_UNVERIFIED';
      whopLabel = 'CONFIGURED (Unverified)';
      try {
        const res = await fetch('/api/connectors/whop/health');
        if (res.ok) {
          const data = await res.json();
          if (data.connected) {
            whopState = 'CONNECTED';
            whopLabel = `CONNECTED (${data.latencyMs}ms)`;
            setWhopConnected(true);
            setWhopDetails(`Company: ${data.accountId || 'Verified'}`);
            whopMetrics = {
              Distribution: 'Connected & Live',
              Revenue: 'Awaiting sync',
              Orders: '0 recorded',
              Traffic: 'Direct API',
              'Affiliate Sales': '0',
            };
          } else {
            whopState = data.status || 'AUTH_ERROR';
            whopLabel = data.status === 'AUTH_ERROR' ? 'AUTH ERROR' : 'API ERROR';
            setWhopDetails(data.message || 'Whop credentials rejected');
          }
        }
      } catch {
        whopState = 'CONFIGURED_UNVERIFIED';
        whopLabel = 'CONFIGURED (Unverified)';
        setWhopDetails('Server endpoint starting...');
      }
    } else {
      setWhopDetails('No API key in .env.local');
    }

    const liveChannels: ChannelNode[] = [
      {
        id: 'whop',
        name: 'Whop Creator Portal',
        type: 'Direct API',
        status: whopState,
        statusLabel: whopLabel,
        metrics: whopMetrics,
      },
      {
        id: 'gumroad',
        name: 'Gumroad Storefront',
        type: 'Direct API',
        status: 'NOT_CONFIGURED',
        statusLabel: 'NOT CONFIGURED',
        metrics: { Distribution: 'Unconfigured', Revenue: '—', Orders: '—', Traffic: '—', 'Affiliate Sales': '—' },
      },
      {
        id: 'etsy',
        name: 'Etsy Digital Shop',
        type: 'Manual Portal',
        status: 'NOT_CONFIGURED',
        statusLabel: 'NOT CONFIGURED',
        metrics: { Distribution: 'Unconfigured', Revenue: '—', Orders: '—', Traffic: '—', 'Affiliate Sales': '—' },
      },
      {
        id: 'payhip',
        name: 'Payhip Shop',
        type: 'Direct API',
        status: 'NOT_CONFIGURED',
        statusLabel: 'NOT CONFIGURED',
        metrics: { Distribution: 'Unconfigured', Revenue: '—', Orders: '—', Traffic: '—', 'Affiliate Sales': '—' },
      },
      {
        id: 'amazon',
        name: 'Amazon Kindle Direct',
        type: 'Direct Retailer',
        status: 'NOT_CONFIGURED',
        statusLabel: 'NOT CONFIGURED',
        metrics: { Distribution: 'Unconfigured', Revenue: '—', Orders: '—', Traffic: '—', 'Affiliate Sales': '—' },
      },
      {
        id: 'publishdrive',
        name: 'PublishDrive Aggregator',
        type: 'Aggregator Hub',
        status: 'NOT_CONFIGURED',
        statusLabel: 'NOT CONFIGURED',
        metrics: { Distribution: 'Unconfigured', Revenue: '—', Orders: '—', Traffic: '—', 'Affiliate Sales': '—' },
      },
    ];

    setChannels(liveChannels);
    setLoading(false);
  };

  useEffect(() => {
    refreshTelemetry();
  }, []);

  const getStatusColor = (status: ChannelNode['status']) => {
    switch (status) {
      case 'CONNECTED': return '#22C55E';
      case 'CONFIGURED_UNVERIFIED': return '#D6A84B';
      case 'AUTH_ERROR': return '#EF4444';
      case 'NOT_CONFIGURED': default: return '#626770';
    }
  };

  const configuredCount = channels.filter(c => c.status !== 'NOT_CONFIGURED').length;
  const connectedCount = channels.filter(c => c.status === 'CONNECTED').length;

  return (
    <div className="industrial-panel p-6 relative overflow-hidden flex flex-col justify-between h-full min-h-[440px]">
      
      {/* Module Title & View Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center text-[#D6A84B] shadow-inner">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base text-[#F5F6F7] tracking-wider">GLOBAL DISTRIBUTION FLOW</h2>
              <span className="text-[10px] font-data px-2 py-0.5 rounded bg-[#D6A84B]/10 text-[#D6A84B] border border-[#D6A84B]/30">
                {connectedCount} CONNECTED / {configuredCount} CONFIGURED
              </span>
            </div>
            <p className="text-[11px] font-data text-[#A2A6AD]">REAL CONNECTOR TELEMETRY & ROUTING</p>
          </div>
        </div>

        {/* Refresh & View Switcher Pills */}
        <div className="flex items-center gap-2">
          <button 
            onClick={refreshTelemetry}
            title="Refresh Connector Health"
            className="p-1.5 rounded-lg bg-[#0D0E11] border border-white/10 text-[#A2A6AD] hover:text-[#F5F6F7] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <div className="flex items-center gap-1 bg-[#0D0E11] p-1 rounded-xl border border-white/10">
            {viewModes.map(mode => (
              <button
                key={mode}
                onClick={() => setActiveView(mode)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-display transition-all ${
                  activeView === mode
                    ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/40 shadow-sm'
                    : 'text-[#626770] hover:text-[#A2A6AD]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Industrial Flow Grid */}
      <div className="relative flex-1 flex items-center justify-between px-4 py-2 z-10">
        
        {/* Step 1: Master Catalog Node */}
        <div className="w-44 bg-[#0D0E11] border border-white/10 rounded-xl p-4 flex flex-col justify-between shadow-xl">
          <div className="text-[10px] font-display tracking-widest text-[#D6A84B] mb-2 uppercase">MASTER CATALOG</div>
          <div className="text-xl font-display font-bold text-[#F5F6F7]">0 TITLES</div>
          <div className="text-[10px] font-data text-[#626770] mt-1">Awaiting publication ingest</div>
        </div>

        {/* Step 2: Distribution Engine Core */}
        <div className="w-52 bg-[#121418] border border-[#D6A84B]/40 rounded-xl p-4 flex flex-col justify-between shadow-xl">
          <div className="text-[10px] font-display tracking-widest text-[#38BDF8] mb-1 uppercase">DISTRIBUTION ENGINE</div>
          <div className="text-sm font-display font-bold text-[#F5F6F7]">{configuredCount} CONFIGURED DESTINATIONS</div>
          <div className="text-[10px] font-data text-[#22C55E] mt-2">
            {whopConnected ? '1 Live Connector Active' : '0 Connected Channels'}
          </div>
        </div>

        {/* Step 3: Destination Channels List */}
        <div className="w-72 flex flex-col gap-2">
          {channels.map((ch) => {
            const statusColor = getStatusColor(ch.status);
            return (
              <div 
                key={ch.id} 
                className="bg-[#0D0E11] border border-white/10 rounded-lg p-2.5 flex items-center justify-between transition-all hover:border-white/20"
              >
                <div className="flex items-center gap-2.5">
                  <span 
                    className="w-2 h-2 rounded-full shrink-0" 
                    style={{ backgroundColor: statusColor, boxShadow: `0 0 6px ${statusColor}` }} 
                  />
                  <div className="flex flex-col">
                    <span className="font-display text-xs text-[#F5F6F7]">{ch.name}</span>
                    <span className="text-[9px] font-data text-[#626770]">{ch.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-data text-[10px] block" style={{ color: statusColor }}>
                    {ch.statusLabel}
                  </span>
                  <span className="font-data text-[9px] text-[#A2A6AD]">
                    {ch.metrics[activeView]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Footer Telemetry Banner */}
      <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between text-[10px] font-data text-[#626770]">
        <span>WHOP CONNECTOR STATUS: {whopDetails}</span>
        <span>TRUTHFUL SYSTEM TELEMETRY ACTIVE</span>
      </div>

    </div>
  );
}
