'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Server,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

interface MarketplaceItem {
  id: string;
  name: string;
  category: string;
  country: string;
  isConnected: boolean;
  statusLabel: string;
  portalUrl: string;
}

export default function DistributionPage() {
  const [whopConnected, setWhopConnected] = useState(false);
  const [whopProductCount, setWhopProductCount] = useState(0);
  const [whopProductName, setWhopProductName] = useState('');
  const [whopLoading, setWhopLoading] = useState(true);

  const [ds24Connected, setDs24Connected] = useState(false);
  const [ds24ProductCount, setDs24ProductCount] = useState(0);
  const [ds24ProductName, setDs24ProductName] = useState('');
  const [ds24Loading, setDs24Loading] = useState(true);

  useEffect(() => {
    async function loadWhop() {
      try {
        const res = await fetch('/api/connectors/whop/health');
        if (res.ok) {
          const data = await res.json();
          setWhopConnected(data.connected);
        }
        const prodRes = await fetch('/api/connectors/whop/products');
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          if (prodData.success && Array.isArray(prodData.products)) {
            setWhopProductCount(prodData.products.length);
            if (prodData.products.length > 0) {
              setWhopProductName(prodData.products[0].title || prodData.products[0].name || '');
            }
          }
        }
      } catch {
        setWhopConnected(false);
      } finally {
        setWhopLoading(false);
      }
    }

    async function loadDs24() {
      try {
        const healthRes = await fetch('/api/connectors/digistore24/health');
        if (healthRes.ok) {
          const data = await healthRes.json();
          setDs24Connected(data.connected);
        }
        const prodRes = await fetch('/api/connectors/digistore24/products');
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          if (prodData.success && Array.isArray(prodData.products)) {
            setDs24ProductCount(prodData.products.length);
            if (prodData.products.length > 0) {
              setDs24ProductName(prodData.products[0].name || '');
            }
          }
        }
      } catch {
        setDs24Connected(false);
      } finally {
        setDs24Loading(false);
      }
    }

    loadWhop();
    loadDs24();
  }, []);

  const connectedCount = [whopConnected, ds24Connected].filter(Boolean).length;

  const marketplaces: MarketplaceItem[] = [
    {
      id: 'whop',
      name: 'Whop Creator Portal',
      category: 'Direct Digital Storefront',
      country: 'US/WW',
      isConnected: whopConnected,
      statusLabel: whopLoading ? 'CHECKING API...' : whopConnected ? 'CONNECTED (LIVE API)' : 'NOT CONNECTED',
      portalUrl: 'https://whop.com/dashboard',
    },
    {
      id: 'digistore24',
      name: 'Digistore24 Marketplace',
      category: 'Digital Vendor Platform',
      country: 'DE/UK/US/WW',
      isConnected: ds24Connected,
      statusLabel: ds24Loading ? 'CHECKING API...' : ds24Connected ? 'CONNECTED (LIVE API)' : 'NOT CONNECTED',
      portalUrl: 'https://www.digistore24.com/vendor',
    },
  ];

  const [selectedMarketplace, setSelectedMarketplace] = useState<MarketplaceItem>(marketplaces[0]);

  // Keep selected marketplace in sync with live data
  const liveSelected = marketplaces.find(m => m.id === selectedMarketplace.id) ?? marketplaces[0];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">DISTRIBUTION ROUTING &amp; MARKETPLACE REGISTRY</h1>
            <span className={`text-[10px] font-data px-2 py-0.5 rounded border ${
              connectedCount > 0
                ? 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30'
                : 'text-[#626770] bg-white/5 border-white/10'
            }`}>
              {connectedCount} CONNECTED MARKETPLACE{connectedCount !== 1 ? 'S' : ''} (LIVE API)
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Real marketplace connector registry. Only Whop and Digistore24 are currently connected via live API.
          </p>
        </div>

        <Link
          href="/integrations"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-xs font-bold shadow-md transition-colors"
        >
          <Server className="w-4 h-4" /> MANAGE INTEGRATIONS
        </Link>
      </div>

      {/* Main Grid: Marketplace List & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Marketplace List */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="font-display text-xs text-[#626770] tracking-wider uppercase px-1">
            MARKETPLACE REGISTRY — 2 API CONNECTORS
          </h2>

          {marketplaces.map(m => {
            const isSelected = liveSelected.id === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setSelectedMarketplace(m)}
                className={`industrial-panel p-4 cursor-pointer transition-all border ${
                  isSelected ? 'border-[#D6A84B] bg-[#17191E]' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-bold text-[#F5F6F7]">{m.name}</span>
                    <span className="text-[10px] font-data text-[#626770]">({m.country})</span>
                  </div>
                  <span className={`text-[9px] font-display px-2 py-0.5 rounded border uppercase ${
                    m.isConnected 
                      ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30 font-bold' 
                      : m.statusLabel === 'CHECKING API...'
                        ? 'bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30'
                        : 'bg-white/5 text-[#626770] border-white/10'
                  }`}>
                    {m.statusLabel}
                  </span>
                </div>
                <div className="text-xs text-[#A2A6AD] font-data mt-1">{m.category}</div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Marketplace Inspector */}
        <div className="lg:col-span-7">
          <div className="industrial-panel p-6 space-y-5">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[9px] font-display text-[#D6A84B] tracking-widest block uppercase">CONNECTOR INSPECTOR</span>
                <h2 className="font-display text-lg text-[#F5F6F7] font-bold">{liveSelected.name}</h2>
                <span className="text-xs font-data text-[#A2A6AD]">{liveSelected.category}</span>
              </div>

              <a
                href={liveSelected.portalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-data text-[#D6A84B] hover:underline"
              >
                OPEN PORTAL <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {liveSelected.id === 'whop' && (
              <div className="space-y-4">
                {whopLoading ? (
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-[#17191E]">
                    <Loader2 className="w-4 h-4 text-[#D6A84B] animate-spin" />
                    <span className="font-data text-xs text-[#A2A6AD]">Contacting Whop API...</span>
                  </div>
                ) : whopConnected ? (
                  <div className="p-4 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 space-y-2">
                    <div className="flex items-center gap-2 text-[#22C55E] font-display text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" /> WHOP API CONNECTOR IS LIVE
                    </div>
                    <p className="text-xs font-data text-[#A2A6AD]">
                      Authenticated via WHOP_API_KEY. API v5 responding.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 space-y-1">
                    <div className="flex items-center gap-2 text-[#EF4444] font-display text-xs font-bold">
                      <AlertCircle className="w-4 h-4" /> WHOP API NOT RESPONDING
                    </div>
                    <p className="text-xs font-data text-[#A2A6AD]">Check WHOP_API_KEY in environment variables.</p>
                  </div>
                )}

                <div className="p-4 bg-[#0D0E11] rounded-lg border border-white/10 space-y-2">
                  <span className="text-[10px] font-display text-[#626770] uppercase">LIVE WHOP PRODUCTS:</span>
                  <div className="font-data text-sm text-[#F5F6F7] font-bold">
                    {whopLoading
                      ? '—'
                      : whopProductCount > 0
                        ? `${whopProductCount} Product: "${whopProductName}"`
                        : '0 products returned by Whop API'}
                  </div>
                </div>
              </div>
            )}

            {liveSelected.id === 'digistore24' && (
              <div className="space-y-4">
                {ds24Loading ? (
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-[#17191E]">
                    <Loader2 className="w-4 h-4 text-[#D6A84B] animate-spin" />
                    <span className="font-data text-xs text-[#A2A6AD]">Contacting Digistore24 API...</span>
                  </div>
                ) : ds24Connected ? (
                  <div className="p-4 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 space-y-2">
                    <div className="flex items-center gap-2 text-[#22C55E] font-display text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" /> DIGISTORE24 API CONNECTOR IS LIVE
                    </div>
                    <p className="text-xs font-data text-[#A2A6AD]">
                      Authenticated via DIGISTORE24_API_KEY. API v1.2 responding.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 space-y-1">
                    <div className="flex items-center gap-2 text-[#EF4444] font-display text-xs font-bold">
                      <AlertCircle className="w-4 h-4" /> DIGISTORE24 API NOT RESPONDING
                    </div>
                    <p className="text-xs font-data text-[#A2A6AD]">Check DIGISTORE24_API_KEY in environment variables.</p>
                  </div>
                )}

                <div className="p-4 bg-[#0D0E11] rounded-lg border border-white/10 space-y-2">
                  <span className="text-[10px] font-display text-[#626770] uppercase">LIVE DIGISTORE24 PRODUCTS:</span>
                  <div className="font-data text-sm text-[#F5F6F7] font-bold">
                    {ds24Loading
                      ? '—'
                      : ds24ProductCount > 0
                        ? `${ds24ProductCount} Product: "${ds24ProductName}"`
                        : '0 products returned by Digistore24 API'}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
