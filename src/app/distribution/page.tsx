import React from 'react';
import Link from 'next/link';
import { Globe, Server } from 'lucide-react';
import { supabaseServer } from '@/lib/supabase/server';

export const revalidate = 0;

export default async function DistributionPage() {
  let marketplaces: any[] = [];
  let accounts: any[] = [];

  try {
    const { data: mpData } = await supabaseServer.from('marketplaces').select('*').order('priority', { ascending: true });
    marketplaces = mpData ?? [];
    const { data: accData } = await supabaseServer.from('marketplace_accounts').select('*');
    accounts = accData ?? [];
  } catch {}

  const defaultMarketplaces = [
    { id: 'whop', name: 'Whop', region: 'Global', priority: 1, method: 'API', portalUrl: 'https://whop.com/dashboard' },
    { id: 'digistore24', name: 'Digistore24', region: 'DE / Global', priority: 1, method: 'API', portalUrl: 'https://www.digistore24.com/vendor' },
    { id: 'amazon_kdp', name: 'Amazon KDP', region: 'US / Global', priority: 1, method: 'MANUAL', portalUrl: 'https://kdp.amazon.com' },
    { id: 'etsy', name: 'Etsy', region: 'US / Global', priority: 2, method: 'MANUAL', portalUrl: 'https://www.etsy.com/your/shops' },
    { id: 'gumroad', name: 'Gumroad', region: 'Global', priority: 2, method: 'MANUAL', portalUrl: 'https://app.gumroad.com' },
    { id: 'payhip', name: 'Payhip', region: 'Global', priority: 2, method: 'MANUAL', portalUrl: 'https://payhip.com/dashboard' },
    { id: 'kobo', name: 'Kobo Writing Life', region: 'Global', priority: 3, method: 'MANUAL', portalUrl: 'https://writinglife.kobobooks.com' },
    { id: 'apple_books', name: 'Apple Books', region: 'Global', priority: 3, method: 'MANUAL', portalUrl: 'https://authors.apple.com' },
  ];

  const displayList = marketplaces.length > 0 ? marketplaces : defaultMarketplaces;

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/8 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#0D0F12] font-bold tracking-wider">GLOBAL DISTRIBUTION MATRIX</h1>
            <span className="text-[10px] font-mono text-[#1E3A5F] px-2 py-0.5 rounded bg-[#1E3A5F]/10 border border-[#1E3A5F]/20">TRUTH LAYER ACTIVE</span>
          </div>
          <p className="text-xs text-[#6B7280] font-mono mt-1">API and manual marketplace management. Upload once, distribute everywhere.</p>
        </div>
        <Link href="/settings/integrations" className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-black/10 text-xs font-mono text-[#3D4452] hover:bg-[#F4F5F7] transition-colors">
          <Server className="w-3.5 h-3.5" /> INTEGRATION SETTINGS
        </Link>
      </div>

      <div className="industrial-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#F4F5F7] border-b border-black/8 text-[10px] text-[#6B7280] uppercase">
              <tr>
                <th className="p-4">Marketplace</th>
                <th className="p-4">Region</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Method</th>
                <th className="p-4">Connection Status</th>
                <th className="p-4 text-right">Portal / Workflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/6">
              {displayList.map((m: any) => {
                const isApi = m.method === 'API' || m.distribution_method === 'API';
                return (
                  <tr key={m.id} className="hover:bg-[#F4F5F7] transition-colors">
                    <td className="p-4 font-bold text-[#0D0F12]">{m.name}</td>
                    <td className="p-4 text-[#3D4452]">{m.region || 'Global'}</td>
                    <td className="p-4">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#ECEEF2] text-[#3D4452]">P{m.priority || 3}</span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        isApi ? 'text-[#1D5F8A] bg-blue-50 border-blue-200' : 'text-[#6B7280] bg-gray-100 border-gray-200'
                      }`}>
                        {isApi ? 'API' : 'MANUAL'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        isApi ? 'text-[#166534] bg-green-50 border-green-200' : 'text-[#1E3A5F] bg-[#1E3A5F]/8 border-[#1E3A5F]/20'
                      }`}>
                        {isApi ? 'CONNECTED' : 'MANUAL REGISTRY'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <Link href={`/distribution/${m.id}`} className="text-xs font-bold text-[#1E3A5F] hover:underline">WORKFLOW →</Link>
                      {m.portalUrl && (
                        <a href={m.portalUrl} target="_blank" rel="noreferrer" className="text-xs text-[#9CA3AF] hover:text-[#6B7280]">PORTAL ↗</a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 rounded-lg border border-[#1E3A5F]/20 bg-[#1E3A5F]/5 flex items-start gap-3 font-mono text-xs">
        <Globe className="w-4 h-4 text-[#1E3A5F] mt-0.5 shrink-0" />
        <div className="text-[#3D4452]">
          <span className="text-[#1E3A5F] font-bold">MANUAL DISTRIBUTION WORKFLOW: </span>
          Click <strong className="text-[#0D0F12]">WORKFLOW →</strong> on any marketplace row to view pre-formatted listing copy, download asset files, and record your live product URLs.
        </div>
      </div>
    </div>
  );
}
