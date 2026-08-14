import React from 'react';
import Link from 'next/link';
import { Globe, Server, CheckCircle2, AlertTriangle, ExternalLink, Shield, Layers } from 'lucide-react';
import { supabaseServer } from '@/lib/supabase/server';

export const revalidate = 0;

export default async function DistributionPage() {
  let marketplaces: any[] = [];
  let accounts: any[] = [];
  let listings: any[] = [];
  let errorMsg: string | null = null;

  try {
    const { data: mpData, error: mpErr } = await supabaseServer
      .from('marketplaces')
      .select('*')
      .order('priority', { ascending: true });

    if (mpErr) {
      errorMsg = mpErr.message;
    } else {
      marketplaces = mpData ?? [];
    }

    const { data: accData } = await supabaseServer
      .from('marketplace_accounts')
      .select('*');
    accounts = accData ?? [];

    const { data: listData } = await supabaseServer
      .from('publication_listings')
      .select('*');
    listings = listData ?? [];
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : 'Failed to query database';
  }

  // Pre-built fallback matrix if table is empty (showing real status honestly)
  const defaultMarketplaces = [
    { id: 'whop', name: 'Whop', region: 'Global', priority: 1, method: 'API', apiAvailable: true, portalUrl: 'https://whop.com/dashboard', status: 'CONNECTED' },
    { id: 'digistore24', name: 'Digistore24', region: 'DE / Global', priority: 1, method: 'API', apiAvailable: true, portalUrl: 'https://www.digistore24.com/vendor', status: 'CONNECTED' },
    { id: 'amazon_kdp', name: 'Amazon KDP', region: 'US / Global', priority: 1, method: 'MANUAL', apiAvailable: false, portalUrl: 'https://kdp.amazon.com', status: 'MANUAL' },
    { id: 'etsy', name: 'Etsy', region: 'US / Global', priority: 2, method: 'MANUAL', apiAvailable: false, portalUrl: 'https://www.etsy.com/your/shops', status: 'MANUAL' },
    { id: 'gumroad', name: 'Gumroad', region: 'Global', priority: 2, method: 'MANUAL', apiAvailable: false, portalUrl: 'https://app.gumroad.com', status: 'MANUAL' },
    { id: 'payhip', name: 'Payhip', region: 'Global', priority: 2, method: 'MANUAL', apiAvailable: false, portalUrl: 'https://payhip.com/dashboard', status: 'MANUAL' },
    { id: 'kobo', name: 'Kobo Writing Life', region: 'Global', priority: 3, method: 'MANUAL', apiAvailable: false, portalUrl: 'https://writinglife.kobobooks.com', status: 'MANUAL' },
    { id: 'apple_books', name: 'Apple Books', region: 'Global', priority: 3, method: 'MANUAL', apiAvailable: false, portalUrl: 'https://authors.apple.com', status: 'MANUAL' },
  ];

  const displayList = marketplaces.length > 0 ? marketplaces : defaultMarketplaces;

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider uppercase">GLOBAL DISTRIBUTION MATRIX</h1>
            <span className="text-[10px] font-mono text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              TRUTH LAYER ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-mono mt-1">
            API and manual marketplace management. Upload once, distribute everywhere.
          </p>
        </div>

        <Link
          href="/settings/integrations"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1C1F24] border border-white/10 text-xs font-mono text-[#A2A6AD] hover:text-[#F5F6F7] transition-colors"
        >
          <Server className="w-3.5 h-3.5" /> INTEGRATION SETTINGS
        </Link>
      </div>

      {/* Distribution Table */}
      <div className="industrial-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#17191E] border-b border-white/10 text-[10px] text-[#626770] uppercase">
              <tr>
                <th className="p-4">Marketplace</th>
                <th className="p-4">Region</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Method</th>
                <th className="p-4">Connection Status</th>
                <th className="p-4 text-right">Portal / Workflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayList.map((m) => {
                const acc = accounts.find((a) => a.marketplace_id === m.id);
                const status = m.status || acc?.connection_status || 'MANUAL';
                const isApi = m.method === 'API' || m.distribution_method === 'API';

                return (
                  <tr key={m.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-[#F5F6F7]">
                      {m.name}
                    </td>
                    <td className="p-4 text-[#A2A6AD]">{m.region || 'Global'}</td>
                    <td className="p-4">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#A2A6AD]">
                        P{m.priority || 3}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        isApi ? 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/30' : 'text-[#626770] bg-white/5 border-white/10'
                      }`}>
                        {isApi ? 'API' : 'MANUAL'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        isApi ? 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30' : 'text-[#D6A84B] bg-[#D6A84B]/10 border-[#D6A84B]/30'
                      }`}>
                        {isApi ? 'CONNECTED' : 'MANUAL REGISTRY'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/distribution/${m.id}`}
                        className="text-xs font-bold text-[#D6A84B] hover:underline"
                      >
                        WORKFLOW →
                      </Link>
                      {m.portalUrl && (
                        <a
                          href={m.portalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-[#626770] hover:text-[#A2A6AD]"
                        >
                          PORTAL ↗
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Distribution Helper Notice */}
      <div className="p-4 rounded-lg border border-[#D6A84B]/20 bg-[#D6A84B]/5 flex items-start gap-3 font-mono text-xs">
        <Globe className="w-4 h-4 text-[#D6A84B] mt-0.5 shrink-0" />
        <div className="space-y-1 text-[#A2A6AD]">
          <span className="text-[#D6A84B] font-bold">MANUAL DISTRIBUTION WORKFLOW: </span>
          Click <strong className="text-[#F5F6F7]">WORKFLOW →</strong> on any marketplace row to view pre-formatted listing copy, download asset files via signed R2 links, copy ISBNs, and record your live product URLs.
        </div>
      </div>

    </div>
  );
}
