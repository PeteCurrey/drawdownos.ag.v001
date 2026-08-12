'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, ChevronRight, Image, FileText, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function CreativeLibraryPage() {
  const demoCreatives = [
    { id: 'cr-001', name: 'How to Trade — LatAm Affiliate Pack (Portuguese)', type: 'AFFILIATE_CREATIVE_PACK', sku: 'DD-HTT-001-PT-BR', compliance: 'APPROVED', format: 'BANNER + COPY' },
    { id: 'cr-002', name: 'Pre-Trade Risk Checklist Lead Magnet PDF', type: 'LEAD_MAGNET_ASSET', sku: 'DD-HTT-001', compliance: 'APPROVED', format: 'PDF WORKSHEET' },
    { id: 'cr-003', name: 'German DACH Tolino Launch Creative Set', type: 'LOCALISATION_PACK', sku: 'DD-HTT-001-DE-DE', compliance: 'PENDING', format: 'COVER + BANNER' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/growth" className="hover:text-[#A2A6AD]">GROWTH COMMAND</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#F97316]">CREATIVE LIBRARY</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#F97316]/30 flex items-center justify-center">
                <Eye className="w-4 h-4 text-[#F97316]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">APPROVED CREATIVE DERIVATIVE LIBRARY</h1>
            </div>
          </div>
          <Link href="/growth" className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO CONTROL ROOM
          </Link>
        </div>

        {/* Creatives Grid */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl p-5 space-y-4 font-data text-xs">
          <div className="font-display text-xs tracking-wider text-[#626770] border-b border-white/8 pb-2">
            DERIVATIVE ASSETS FROM PRODUCT FACTORY & MERCHANDISING ENGINE
          </div>
          <div className="space-y-3">
            {demoCreatives.map(c => (
              <div key={c.id} className="bg-[#121418] border border-white/5 rounded-lg p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-bold text-[#F5F6F7]">{c.name}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${c.compliance === 'APPROVED' ? 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30' : 'text-[#F97316] bg-[#F97316]/10 border-[#F97316]/30'}`}>
                      {c.compliance}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#626770]">SKU: {c.sku} · Format: {c.format}</div>
                </div>
                <button className="bg-[#1C1F24] hover:bg-white/10 text-[#F5F6F7] font-display text-[9px] font-bold px-3 py-1.5 rounded border border-white/10">
                  DOWNLOAD PACK
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
