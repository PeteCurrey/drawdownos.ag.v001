'use client';

import React, { useState } from 'react';
import { 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  FileUp, 
  Lock, 
  ExternalLink, 
  ShieldCheck, 
  Info,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { AutomationMode, MarketplaceCapabilities } from '@/lib/adapters/marketplace-adapter';

interface MarketplaceItem {
  id: string;
  name: string;
  category: string;
  country: string;
  mode: AutomationMode;
  status: 'LIVE' | 'CONNECTED' | 'MANUAL_PORTAL' | 'AGGREGATOR';
  capabilities: Partial<MarketplaceCapabilities>;
  portalUrl: string;
}

const MARKETPLACES: MarketplaceItem[] = [
  {
    id: 'amazon_kdp',
    name: 'Amazon KDP',
    category: 'Direct Global Retailer',
    country: 'US/UK/WW',
    mode: 'FULL_AUTOMATION',
    status: 'LIVE',
    portalUrl: 'https://kdp.amazon.com',
    capabilities: { canCreateProduct: true, canUpdatePrice: true, canReadOrders: true, supportsTerritorialPricing: true }
  },
  {
    id: 'whop',
    name: 'Whop Creator Portal',
    category: 'Direct Digital Storefront',
    country: 'US/WW',
    mode: 'FULL_AUTOMATION',
    status: 'LIVE',
    portalUrl: 'https://whop.com/dashboard',
    capabilities: { canCreateProduct: true, canUpdatePrice: true, canReadOrders: true, supportsWebhooks: true }
  },
  {
    id: 'gumroad',
    name: 'Gumroad',
    category: 'Creator Commerce',
    country: 'US/WW',
    mode: 'FULL_AUTOMATION',
    status: 'LIVE',
    portalUrl: 'https://gumroad.com/dashboard',
    capabilities: { canCreateProduct: true, canUpdatePrice: true, canReadOrders: true, supportsAffiliateProgramme: true }
  },
  {
    id: 'etsy',
    name: 'Etsy Digital Shop',
    category: 'Handcrafted Marketplace',
    country: 'US/UK/EU',
    mode: 'MANUAL_PORTAL',
    status: 'MANUAL_PORTAL',
    portalUrl: 'https://etsy.com/your/shops',
    capabilities: { canCreateProduct: false, canUpdatePrice: false, canReadOrders: true, requiresManualReview: true }
  },
  {
    id: 'publishdrive',
    name: 'PublishDrive Aggregator',
    category: 'Ebook Distributor',
    country: 'EU/WW',
    mode: 'AGGREGATOR_MANAGED',
    status: 'AGGREGATOR',
    portalUrl: 'https://publishdrive.com',
    capabilities: { canCreateProduct: true, canUpdatePrice: true, aggregatorManaged: true }
  },
  {
    id: 'ingram_spark',
    name: 'IngramSpark',
    category: 'Print POD Distributor',
    country: 'US/WW',
    mode: 'PARTIAL_AUTOMATION',
    status: 'CONNECTED',
    portalUrl: 'https://ingramspark.com',
    capabilities: { canCreateProduct: true, canUpdatePrice: false, canReadOrders: true }
  }
];

export default function DistributionPage() {
  const [selectedMarketplace, setSelectedMarketplace] = useState<MarketplaceItem>(MARKETPLACES[3]); // Etsy manual
  const [showSubmissionPack, setShowSubmissionPack] = useState(false);
  const [copiedPack, setCopiedPack] = useState(false);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">DISTRIBUTION ROUTING & MARKETPLACE REGISTRY</h1>
            <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              6 CHANNELS REGISTERED
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Marketplace capabilities matrix, automation modes, destination collision prevention, and manual portal submission packs
          </p>
        </div>
      </div>

      {/* Destination Collision Alert Banner */}
      <div className="p-4 rounded-xl bg-[#D6A84B]/10 border border-[#D6A84B]/30 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#D6A84B] shrink-0 mt-0.5" />
        <div className="text-xs font-data">
          <span className="font-bold text-[#F5F6F7]">ROUTE COLLISION GUARD ACTIVE:</span> PublishDrive distributor sends titles to Kobo. Direct Kobo connector is currently set to PAUSED to prevent duplicate channel listings.
        </div>
      </div>

      {/* Main Grid: Marketplace List & Capability Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Marketplace Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="font-display text-xs text-[#626770] tracking-wider uppercase px-1">
            REGISTERED CONNECTORS & PORTALS
          </h2>

          {MARKETPLACES.map(m => {
            const isSelected = selectedMarketplace.id === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setSelectedMarketplace(m)}
                className={`industrial-panel p-4 cursor-pointer transition-all ${
                  isSelected ? 'border-[#D6A84B] bg-[#17191E] shadow-md' : 'hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-bold text-[#F5F6F7]">{m.name}</span>
                    <span className="text-[10px] font-data text-[#626770]">({m.country})</span>
                  </div>
                  <span className={`text-[9px] font-display px-2 py-0.5 rounded border uppercase ${
                    m.mode === 'FULL_AUTOMATION' ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30' :
                    m.mode === 'MANUAL_PORTAL' ? 'bg-[#FF6A18]/10 text-[#FF6A18] border-[#FF6A18]/30' :
                    'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30'
                  }`}>
                    {m.mode.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-xs text-[#A2A6AD] font-data mt-1">{m.category}</div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Marketplace Inspector & Submission Pack Generator (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="industrial-panel p-6 space-y-5">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[9px] font-display text-[#D6A84B] tracking-widest block">CONNECTOR INSPECTOR</span>
                <h2 className="font-display text-lg text-[#F5F6F7] font-bold">{selectedMarketplace.name}</h2>
                <span className="text-xs font-data text-[#A2A6AD]">{selectedMarketplace.category}</span>
              </div>

              <a
                href={selectedMarketplace.portalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-data text-[#D6A84B] hover:underline"
              >
                OPEN PORTAL <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Capability Flags Matrix */}
            <div>
              <h3 className="font-display text-xs text-[#626770] tracking-wider uppercase mb-3">
                VERIFIED CAPABILITY MATRIX
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs font-data">
                {Object.entries(selectedMarketplace.capabilities).map(([key, val]) => (
                  <div key={key} className="p-2.5 bg-[#0D0E11] rounded border border-white/5 flex items-center justify-between">
                    <span className="text-[#A2A6AD] text-[11px]">{key}</span>
                    <span className={`font-bold text-[10px] px-1.5 py-0.2 rounded ${val ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-red-500/20 text-red-400'}`}>
                      {val ? 'TRUE' : 'FALSE'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Manual Submission Pack Tool */}
            {selectedMarketplace.mode === 'MANUAL_PORTAL' && (
              <div className="p-4 bg-[#17191E] rounded-xl border border-[#FF6A18]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#FF6A18]">
                  <FileUp className="w-4 h-4" />
                  <span className="font-display text-xs font-bold">MANUAL MARKETPLACE SUBMISSION PACK GENERATOR</span>
                </div>
                <p className="text-xs text-[#A2A6AD] font-data">
                  Generate a complete 1-click submission pack for {selectedMarketplace.name} including optimized covers, metadata, risk disclaimers, and step-by-step instructions.
                </p>
                
                <button
                  onClick={() => setShowSubmissionPack(true)}
                  className="w-full py-2.5 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md transition-colors"
                >
                  GENERATE 1-CLICK SUBMISSION PACK (DD-HTT-001)
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Submission Pack Modal */}
      {showSubmissionPack && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#121418] border border-[#D6A84B]/40 rounded-xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-display text-sm text-[#D6A84B] font-bold">ETSY DIGITAL SHOP SUBMISSION PACK (DD-HTT-001)</h3>
              <button onClick={() => setShowSubmissionPack(false)} className="text-[#626770] hover:text-[#F5F6F7]">✕</button>
            </div>

            <div className="space-y-3 font-data text-xs max-h-96 overflow-y-auto">
              <div className="p-3 bg-[#0D0E11] rounded border border-white/5">
                <span className="text-[#626770] text-[10px] font-display block">TITLE:</span>
                <span className="text-[#F5F6F7] font-bold">HOW TO TRADE: Institutional Drawdown Management Playbook (PDF)</span>
              </div>
              <div className="p-3 bg-[#0D0E11] rounded border border-white/5">
                <span className="text-[#626770] text-[10px] font-display block">CATEGORIES & TAGS:</span>
                <span className="text-[#A2A6AD]">Crafts & Tools &gt; Digital &gt; Trading Guide, Forex PDF, Prop Firm Workbook</span>
              </div>
              <div className="p-3 bg-[#0D0E11] rounded border border-white/5">
                <span className="text-[#626770] text-[10px] font-display block">R2 DOWNLOAD LINK FOR LISTING PDF:</span>
                <span className="text-[#38BDF8] break-all">https://assets.drawdown.os/masters/dd-htt-001/v1.2.pdf?token=exp900</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button 
                onClick={() => {
                  setCopiedPack(true);
                  setTimeout(() => setCopiedPack(false), 2000);
                }}
                className="px-4 py-2 rounded-lg bg-[#D6A84B] text-[#0A0B0D] font-display font-bold text-xs flex items-center gap-1.5"
              >
                {copiedPack ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedPack ? 'PACK COPIED TO CLIPBOARD' : 'COPY ENTIRE PACK'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
