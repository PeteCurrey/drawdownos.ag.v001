'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Server,
  RefreshCw
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
              setWhopProductName(prodData.products[0].title);
            }
          }
        }
      } catch {
        setWhopConnected(false);
      }
    }
    loadWhop();
  }, []);

  const marketplaces: MarketplaceItem[] = [
    {
      id: 'whop',
      name: 'Whop Creator Portal',
      category: 'Direct Digital Storefront',
      country: 'US/WW',
      isConnected: whopConnected,
      statusLabel: whopConnected ? 'CONNECTED (LIVE API)' : 'CHECKING API...',
      portalUrl: 'https://whop.com/dashboard',
    },
    {
      id: 'gumroad',
      name: 'Gumroad',
      category: 'Creator Commerce',
      country: 'US/WW',
      isConnected: false,
      statusLabel: 'NOT CONNECTED',
      portalUrl: 'https://gumroad.com/dashboard',
    },
    {
      id: 'etsy',
      name: 'Etsy Digital Shop',
      category: 'Handcrafted Marketplace',
      country: 'US/UK/EU',
      isConnected: false,
      statusLabel: 'NOT CONNECTED',
      portalUrl: 'https://etsy.com',
    },
    {
      id: 'payhip',
      name: 'Payhip Shop',
      category: 'Digital Products',
      country: 'US/UK',
      isConnected: false,
      statusLabel: 'NOT CONNECTED',
      portalUrl: 'https://payhip.com',
    },
    {
      id: 'amazon_kdp',
      name: 'Amazon KDP',
      category: 'Direct Global Retailer',
      country: 'US/UK/WW',
      isConnected: false,
      statusLabel: 'NOT CONNECTED',
      portalUrl: 'https://kdp.amazon.com',
    },
    {
      id: 'publishdrive',
      name: 'PublishDrive Aggregator',
      category: 'Ebook Distributor',
      country: 'EU/WW',
      isConnected: false,
      statusLabel: 'NOT CONNECTED',
      portalUrl: 'https://publishdrive.com',
    },
  ];

  const [selectedMarketplace, setSelectedMarketplace] = useState<MarketplaceItem>(marketplaces[0]);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">DISTRIBUTION ROUTING & MARKETPLACE REGISTRY</h1>
            <span className="text-[10px] font-data text-[#22C55E] px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30">
              {whopConnected ? '1 CONNECTED MARKETPLACE (WHOP)' : '0 CONNECTED MARKETPLACES'}
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Real marketplace connector registry. Only Whop is currently connected via API.
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
            MARKETPLACE REGISTRY
          </h2>

          {marketplaces.map(m => {
            const isSelected = selectedMarketplace.id === m.id;
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

            {selectedMarketplace.id === 'whop' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 space-y-2">
                  <div className="flex items-center gap-2 text-[#22C55E] font-display text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" /> WHOP API CONNECTOR IS LIVE
                  </div>
                  <p className="text-xs font-data text-[#A2A6AD]">
                    Authenticated via WHOP_API_KEY in .env.local.
                  </p>
                </div>

                <div className="p-4 bg-[#0D0E11] rounded-lg border border-white/10 space-y-2">
                  <span className="text-[10px] font-display text-[#626770] uppercase">LIVE WHOP PRODUCTS:</span>
                  <div className="font-data text-sm text-[#F5F6F7] font-bold">
                    {whopProductCount > 0 
                      ? `${whopProductCount} Product: "${whopProductName}"` 
                      : '0 Products returned by Whop API'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center border-dashed border-2 border-white/10 rounded-xl space-y-2">
                <AlertCircle className="w-8 h-8 text-[#626770] mx-auto" />
                <div className="font-display text-sm text-[#A2A6AD]">MARKETPLACE NOT CONNECTED</div>
                <p className="text-xs font-data text-[#626770] max-w-sm mx-auto">
                  {selectedMarketplace.name} is not linked to Drawdown OS. Add API credentials in your environment configuration to connect.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
