'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ChevronRight, 
  ArrowLeft,
  FileCode,
  Zap,
  ExternalLink
} from 'lucide-react';
import { CONNECTOR_MANIFESTS_REGISTRY } from '@/lib/connectors/registry';
import { CapabilityStatus, ConnectorManifest } from '@/lib/connectors/types';

export default function ConnectorLibraryPage() {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const manifests = Object.values(CONNECTOR_MANIFESTS_REGISTRY);

  const filteredManifests = manifests.filter(m => {
    if (filterCategory === 'ALL') return true;
    return m.category === filterCategory;
  });

  const getCapColor = (st?: CapabilityStatus) => {
    switch (st) {
      case 'SUPPORTED':
        return 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30';
      case 'PARTIAL':
        return 'text-[#D6A84B] bg-[#D6A84B]/10 border-[#D6A84B]/30';
      case 'UNSUPPORTED':
        return 'text-[#EF4444]/60 bg-white/3 border-white/5';
      case 'RESEARCH_REQUIRED':
      default:
        return 'text-[#626770] bg-white/5 border-white/5';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/integrations" className="text-[#626770] hover:text-[#F5F6F7] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">CONNECTOR MANIFEST LIBRARY & CAPABILITY MATRIX</h1>
            <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              17 CHANNELS
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Machine-readable connector manifests, official capability assertions, evidence links, and standard internal vocabulary (§3, §5, §48).
          </p>
        </div>
      </div>

      {/* Filter Category Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-[#121418] rounded-xl border border-white/10 font-data text-xs">
        <Filter className="w-3.5 h-3.5 text-[#626770]" />
        <span className="text-[10px] font-display text-[#626770]">CATEGORY:</span>
        {(['ALL', 'DIRECT_API', 'OAUTH_API', 'AGGREGATOR', 'HYBRID', 'MANUAL_PORTAL'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1 rounded-lg font-display text-xs transition-all border ${
              filterCategory === cat
                ? 'bg-[#D6A84B] text-[#0A0B0D] border-[#D6A84B] font-bold shadow-md'
                : 'text-[#A2A6AD] border-white/10 hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Standard Capability Matrix Table (§48) */}
      <div className="industrial-panel p-5 space-y-4 overflow-x-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="font-display text-xs text-[#F5F6F7] tracking-wider uppercase">
            ACTION CAPABILITY MATRIX (17 CONNECTORS × 10 KEY DOMAINS)
          </h2>
          <div className="flex items-center gap-4 text-[10px] font-data">
            <span className="flex items-center gap-1 text-[#22C55E]">● SUPPORTED</span>
            <span className="flex items-center gap-1 text-[#D6A84B]">◐ PARTIAL</span>
            <span className="flex items-center gap-1 text-[#626770]">○ RESEARCH</span>
          </div>
        </div>

        <table className="w-full text-left font-data text-xs min-w-[900px]">
          <thead className="bg-[#17191E] border-b border-white/10 font-display text-[9px] text-[#626770]">
            <tr>
              <th className="p-3">CONNECTOR</th>
              <th className="p-3">CATEGORY</th>
              <th className="p-3">CREATE LISTING</th>
              <th className="p-3">UPDATE PRICE</th>
              <th className="p-3">UPLOAD FILES</th>
              <th className="p-3">READ ORDERS</th>
              <th className="p-3">READ ROYALTIES</th>
              <th className="p-3">WEBHOOKS</th>
              <th className="p-3">IDEMPOTENCY</th>
              <th className="p-3 text-right">AUTOPILOT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredManifests.map(m => {
              const c = m.capabilities;
              return (
                <tr key={m.id} className="hover:bg-[#17191E] transition-colors">
                  <td className="p-3">
                    <Link href={`/integrations/connectors/${m.id}`} className="font-bold text-[#F5F6F7] hover:text-[#D6A84B]">
                      {m.name}
                    </Link>
                  </td>
                  <td className="p-3 text-[10px] text-[#626770]">{m.category}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-display border ${getCapColor(c.canCreateListing)}`}>
                      {c.canCreateListing}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-display border ${getCapColor(c.canUpdatePrice)}`}>
                      {c.canUpdatePrice}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-display border ${getCapColor(c.canUploadFiles)}`}>
                      {c.canUploadFiles}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-display border ${getCapColor(c.canReadOrders)}`}>
                      {c.canReadOrders}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-display border ${getCapColor(c.canReadRoyalties)}`}>
                      {c.canReadRoyalties}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-display border ${getCapColor(c.supportsWebhooks)}`}>
                      {c.supportsWebhooks}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-display border ${getCapColor(c.supportsIdempotency)}`}>
                      {c.supportsIdempotency}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/integrations/connectors/${m.id}`}
                      className="text-[10px] font-display text-[#38BDF8] hover:underline"
                    >
                      INSPECT →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
