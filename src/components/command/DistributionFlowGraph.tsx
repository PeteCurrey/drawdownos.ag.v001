'use client';

import React, { useState } from 'react';
import { Layers, Sliders, CheckCircle2, AlertTriangle, RefreshCw, Radio } from 'lucide-react';

export type FlowViewMode = 'Distribution' | 'Revenue' | 'Orders' | 'Traffic' | 'Affiliate Sales';

export interface ChannelNode {
  id: string;
  name: string;
  type: string;
  status: 'live' | 'processing' | 'problem' | 'inactive' | 'aggregator';
  metrics: Record<FlowViewMode, string>;
}

const CHANNELS: ChannelNode[] = [
  { id: 'ch-1', name: 'Amazon Kindle Direct', type: 'Direct Retailer', status: 'live', metrics: { Distribution: '100% Synced', Revenue: '£1,420.00', Orders: '29 units', Traffic: '4,820 visits', 'Affiliate Sales': '8 sales' } },
  { id: 'ch-2', name: 'Whop Creator Portal', type: 'Direct Portal', status: 'live', metrics: { Distribution: '100% Synced', Revenue: '£1,840.00', Orders: '38 units', Traffic: '2,940 visits', 'Affiliate Sales': '24 sales' } },
  { id: 'ch-3', name: 'Gumroad Storefront', type: 'Direct Store', status: 'processing', metrics: { Distribution: 'Syncing v1.2', Revenue: '£380.00', Orders: '8 units', Traffic: '1,120 visits', 'Affiliate Sales': '6 sales' } },
  { id: 'ch-4', name: 'Etsy Digital Shop', type: 'Manual Portal', status: 'live', metrics: { Distribution: '100% Synced', Revenue: '£200.00', Orders: '7 units', Traffic: '890 visits', 'Affiliate Sales': '4 sales' } },
  { id: 'ch-5', name: 'PublishDrive Aggregator', type: 'Aggregator Hub', status: 'aggregator', metrics: { Distribution: 'Kobo & Apple', Revenue: '£1,420.50', Orders: '31 units', Traffic: '3,410 visits', 'Affiliate Sales': '0 sales' } },
  { id: 'ch-6', name: 'IngramSpark Print', type: 'POD Network', status: 'inactive', metrics: { Distribution: 'Setup Pending', Revenue: '£0.00', Orders: '0 units', Traffic: '0 visits', 'Affiliate Sales': '0 sales' } },
];

export default function DistributionFlowGraph() {
  const [activeView, setActiveView] = useState<FlowViewMode>('Distribution');

  const viewModes: FlowViewMode[] = ['Distribution', 'Revenue', 'Orders', 'Traffic', 'Affiliate Sales'];

  const getStatusColor = (status: ChannelNode['status']) => {
    switch (status) {
      case 'live': return '#22C55E';
      case 'processing': return '#D6A84B';
      case 'problem': return '#EF4444';
      case 'inactive': return '#626770';
      case 'aggregator': return '#38BDF8';
    }
  };

  return (
    <div className="industrial-panel p-6 relative overflow-hidden flex flex-col justify-between h-full min-h-[440px]">
      
      {/* Module Title & View Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center text-[#D6A84B] shadow-inner">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h2 className="font-display text-base text-[#F5F6F7] tracking-wider">GLOBAL DISTRIBUTION FLOW</h2>
            <p className="text-[11px] font-data text-[#A2A6AD]">INDUSTRIAL TELEMETRY ROUTING PIPELINE</p>
          </div>
        </div>

        {/* View Switcher Pills */}
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

      {/* Industrial SVG Flow Network */}
      <div className="relative flex-1 flex items-center justify-between px-4 py-2">
        
        {/* SVG Flow Lines Background Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="amberFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D6A84B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Dynamic flow paths from Catalog Node -> Distribution Engine Node -> Channels */}
          <path d="M 120 180 C 200 180, 220 180, 280 180" stroke="url(#amberFlow)" strokeWidth="3" fill="none" className="animate-pulse" />
          
          {CHANNELS.map((ch, idx) => {
            const startY = 180;
            const endY = 50 + idx * 56;
            const strokeColor = getStatusColor(ch.status);
            return (
              <g key={ch.id}>
                <path
                  d={`M 380 ${startY} C 460 ${startY}, 480 ${endY}, 560 ${endY}`}
                  stroke={strokeColor}
                  strokeWidth={ch.status === 'live' ? "2.5" : "1.5"}
                  strokeDasharray={ch.status === 'processing' ? "4 4" : undefined}
                  fill="none"
                  opacity={ch.status === 'inactive' ? 0.3 : 0.85}
                />
              </g>
            );
          })}
        </svg>

        {/* Node 1: Master Catalog */}
        <div className="relative z-10 w-44 industrial-panel-elevated p-4 text-center border-l-4 border-l-[#D6A84B]">
          <span className="text-[9px] font-display text-[#D6A84B] tracking-widest block">SYSTEM OF RECORD</span>
          <h3 className="font-display text-xs text-[#F5F6F7] font-bold mt-1">MASTER CATALOG</h3>
          <div className="mt-3 p-2 bg-[#0D0E11] rounded border border-white/5 font-data text-[10px] text-[#A2A6AD]">
            <span className="text-[#F5F6F7] font-bold">14</span> Active SKUs
          </div>
        </div>

        {/* Node 2: Distribution Engine */}
        <div className="relative z-10 w-48 industrial-panel-elevated p-4 text-center border-l-4 border-l-[#FF6A18] amber-glow-box">
          <span className="text-[9px] font-display text-[#FF6A18] tracking-widest block">AUTOMATION CORE</span>
          <h3 className="font-display text-xs text-[#F5F6F7] font-bold mt-1">DISTRIBUTION ENGINE</h3>
          <div className="mt-3 p-2 bg-[#0D0E11] rounded border border-white/5 font-data text-[10px] text-[#A2A6AD] flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
            <span className="text-[#22C55E] font-bold">6 ROUTES LIVE</span>
          </div>
        </div>

        {/* Node 3: Marketplace Channels Array */}
        <div className="relative z-10 space-y-2.5 w-64">
          {CHANNELS.map(ch => {
            const statusColor = getStatusColor(ch.status);
            return (
              <div 
                key={ch.id}
                className="industrial-panel-inset p-2.5 flex items-center justify-between border-l-2 transition-transform hover:scale-[1.02]"
                style={{ borderLeftColor: statusColor }}
              >
                <div>
                  <div className="text-xs font-bold text-[#F5F6F7] flex items-center gap-1.5">
                    <span>{ch.name}</span>
                  </div>
                  <div className="text-[10px] font-data text-[#A2A6AD]">
                    {ch.metrics[activeView]}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: statusColor, boxShadow: `0 0 6px ${statusColor}` }} 
                  />
                  <span className="text-[9px] font-display uppercase text-[#626770]">
                    {ch.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Industrial Status Legend Footer */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-data text-[#626770]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#22C55E]" /> Live / Healthy</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#D6A84B]" /> Processing</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#EF4444]" /> Problem</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#38BDF8]" /> Aggregator</span>
        </div>
        <span>DESTINATION ROUTING: 0 CONFLICTS DETECTED</span>
      </div>

    </div>
  );
}
