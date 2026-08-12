'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Grid, 
  Table as TableIcon, 
  Activity, 
  DollarSign, 
  Filter, 
  Search, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Globe2, 
  Layers,
  ArrowRight
} from 'lucide-react';


export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<'Grid' | 'Table' | 'Status' | 'Commercial'>('Grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredPublications: any[] = [];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">MASTER CATALOG</h1>
            <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              SYSTEM OF RECORD
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Canonical publications, versioned releases, format variants and global SKU management
          </p>
        </div>

        {/* View Switcher & Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#121418] p-1 rounded-xl border border-white/10">
            {(['Grid', 'Table', 'Status', 'Commercial'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-display transition-colors ${
                  viewMode === mode 
                    ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30 shadow-sm'
                    : 'text-[#626770] hover:text-[#F5F6F7]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <Link
            href="/catalog/DD-HTT-001"
            className="flex items-center gap-1.5 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold px-3 py-2 rounded-lg shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" /> NEW TITLE
          </Link>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="industrial-panel p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-md bg-[#0D0E11] px-3 py-1.5 rounded-lg border border-white/10">
          <Search className="w-4 h-4 text-[#626770]" />
          <input
            type="text"
            placeholder="Filter by title, canonical ID (e.g. DD-HTT-001), category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-[#F5F6F7] placeholder-[#626770] focus:outline-none font-data"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-display text-[#626770]">STATUS:</span>
          {['ALL', 'LIVE', 'COMPLIANCE_REVIEW', 'DRAFT'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-2.5 py-1 rounded text-[11px] font-data border transition-colors ${
                statusFilter === status
                  ? 'bg-[#1C1F24] text-[#D6A84B] border-[#D6A84B]/40'
                  : 'bg-[#0D0E11] text-[#A2A6AD] border-white/5 hover:border-white/15'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'Grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPublications.length === 0 ? (
            <div className="col-span-full industrial-panel p-8 flex flex-col items-center justify-center text-center space-y-3">
              <AlertTriangle className="w-8 h-8 text-[#D6A84B]" />
              <div className="font-display text-sm font-bold text-[#F5F6F7]">NO REAL CATALOG DATA AVAILABLE</div>
              <div className="text-[10px] text-[#626770] max-w-md">
                Cannot display publications. Requires active connection to a real inventory system or CMS to list canonical publications.
              </div>
            </div>
          ) : (
            filteredPublications.map(pub => (
              <div key={pub.id} className="industrial-panel p-5 flex flex-col justify-between group hover:border-[#D6A84B]/40 transition-all">
                
                {/* Publication Header */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-data text-xs font-bold text-[#D6A84B] px-2 py-0.5 bg-[#D6A84B]/10 rounded border border-[#D6A84B]/20">
                        {pub.canonicalId}
                      </span>
                      <span className="text-[10px] font-data text-[#626770]">v{pub.version}</span>
                    </div>

                    <span className={`text-[10px] font-display px-2 py-0.5 rounded border uppercase ${
                      pub.status === 'LIVE' ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30' : 'bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30'
                    }`}>
                      {pub.status}
                    </span>
                  </div>

                  <h3 className="font-display text-base text-[#F5F6F7] font-bold mt-3 group-hover:text-[#D6A84B] transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-[#A2A6AD] font-data mt-1 line-clamp-2">
                    {pub.subtitle}
                  </p>
                </div>

                {/* Publication Telemetry Details */}
                <div className="mt-5 space-y-3 pt-4 border-t border-white/10 font-data text-xs">
                  
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="industrial-panel-inset p-2">
                      <span className="text-[#626770] block text-[9px] font-display">FORMATS</span>
                      <span className="text-[#F5F6F7] font-bold">{pub.formatCount} Commercial</span>
                    </div>
                    <div className="industrial-panel-inset p-2">
                      <span className="text-[#626770] block text-[9px] font-display">CHANNELS</span>
                      <span className="text-[#22C55E] font-bold">{pub.liveMarketplaces} Live Stores</span>
                    </div>
                    <div className="industrial-panel-inset p-2">
                      <span className="text-[#626770] block text-[9px] font-display">LIFETIME UNITS</span>
                      <span className="text-[#F5F6F7] font-bold">{pub.lifetimeUnits.toLocaleString()}</span>
                    </div>
                    <div className="industrial-panel-inset p-2">
                      <span className="text-[#626770] block text-[9px] font-display">LIFETIME REVENUE</span>
                      <span className="text-[#D6A84B] font-bold">£{pub.lifetimeRevenue.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Footer Controls */}
                  <div className="flex items-center justify-between pt-2 text-[10px] text-[#626770]">
                    <span>Updated: {pub.lastUpdate.split(' ')[0]}</span>
                    <Link 
                      href={`/catalog/${pub.canonicalId}`}
                      className="text-[#D6A84B] hover:underline font-display flex items-center gap-1 font-bold"
                    >
                      COMMAND SUITE <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                </div>

              </div>
            ))
          )}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'Table' && (
        <div className="industrial-panel overflow-x-auto">
          <table className="w-full text-left font-data text-xs">
            <thead className="bg-[#17191E] border-b border-white/10 font-display text-[10px] text-[#626770]">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">TITLE</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">FORMATS</th>
                <th className="p-3">CHANNELS</th>
                <th className="p-3">LIFETIME SALES</th>
                <th className="p-3">COMPLIANCE</th>
                <th className="p-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPublications.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <AlertTriangle className="w-8 h-8 text-[#D6A84B]" />
                      <div className="font-display text-sm font-bold text-[#F5F6F7]">NO REAL CATALOG DATA AVAILABLE</div>
                      <div className="text-[10px] text-[#626770] max-w-md">
                        Cannot display publications. Requires active connection to a real inventory system or CMS to list canonical publications.
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPublications.map(pub => (
                  <tr key={pub.id} className="hover:bg-[#17191E] transition-colors">
                    <td className="p-3 font-bold text-[#D6A84B]">{pub.canonicalId}</td>
                    <td className="p-3">
                      <div className="font-bold text-[#F5F6F7]">{pub.title}</div>
                      <div className="text-[10px] text-[#626770]">{pub.category}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 font-display">
                        {pub.status}
                      </span>
                    </td>
                    <td className="p-3 text-[#F5F6F7]">{pub.formatCount} Formats</td>
                    <td className="p-3 text-[#22C55E]">{pub.liveMarketplaces} Channels</td>
                    <td className="p-3 text-[#D6A84B] font-bold">£{pub.lifetimeRevenue.toLocaleString()}</td>
                    <td className="p-3">
                      <span className="text-[10px] text-[#22C55E] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> PASSED
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link href={`/catalog/${pub.canonicalId}`} className="text-[#D6A84B] hover:underline font-display font-bold text-[11px]">
                        OPEN →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
