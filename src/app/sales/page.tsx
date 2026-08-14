import React from 'react';
import Link from 'next/link';
import { DollarSign, BarChart3, AlertCircle, RefreshCw, Server, ArrowDownRight } from 'lucide-react';
import { supabaseServer } from '@/lib/supabase/server';

export const revalidate = 0;

export default async function SalesPage() {
  let transactions: any[] = [];
  let errorMsg: string | null = null;

  try {
    const { data, error } = await supabaseServer
      .from('sales_transactions')
      .select(`
        *,
        publications ( title ),
        marketplaces ( name )
      `)
      .order('transacted_at', { ascending: false })
      .limit(50);

    if (error) {
      errorMsg = error.message;
    } else {
      transactions = data ?? [];
    }
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : 'Database query failed';
  }

  const grossTotal = transactions.reduce((sum, t) => sum + Number(t.gross_amount || 0), 0);
  const feesTotal = transactions.reduce((sum, t) => sum + Number(t.fees || 0), 0);
  const netTotal = transactions.reduce((sum, t) => sum + Number(t.net_amount || 0), 0);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider uppercase">SALES & TRANSACTIONS</h1>
            <span className="text-[10px] font-mono text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              TRUTH LAYER ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-mono mt-1">
            Canonical sales transaction ledger. Ingested via API webhooks or imported records.
          </p>
        </div>

        <Link
          href="/settings/integrations"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1C1F24] border border-white/10 text-xs font-mono text-[#A2A6AD] hover:text-[#F5F6F7] transition-colors"
        >
          <Server className="w-3.5 h-3.5" /> API CONNECTORS
        </Link>
      </div>

      {/* Financial Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <div className="industrial-panel p-4 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-[#626770] uppercase">Gross Revenue</span>
          <span className="text-xl font-bold text-[#F5F6F7] mt-2">
            {grossTotal > 0 ? `£${grossTotal.toFixed(2)}` : '—'}
          </span>
        </div>

        <div className="industrial-panel p-4 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-[#626770] uppercase">Channel Fees</span>
          <span className="text-xl font-bold text-[#EF4444] mt-2">
            {feesTotal > 0 ? `£${feesTotal.toFixed(2)}` : '—'}
          </span>
        </div>

        <div className="industrial-panel p-4 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-[#626770] uppercase">Net Settled</span>
          <span className="text-xl font-bold text-[#22C55E] mt-2">
            {netTotal > 0 ? `£${netTotal.toFixed(2)}` : '—'}
          </span>
        </div>

        <div className="industrial-panel p-4 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-[#626770] uppercase">Transaction Count</span>
          <span className="text-xl font-bold text-[#38BDF8] mt-2">{transactions.length}</span>
        </div>
      </div>

      {/* Transaction Table / Empty State */}
      {transactions.length === 0 ? (
        <div className="industrial-panel p-12 text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-[#626770] mx-auto" />
          <div>
            <div className="text-sm font-bold font-mono text-[#F5F6F7]">No transactions recorded yet.</div>
            <p className="text-xs font-mono text-[#626770] mt-1 max-w-md mx-auto">
              Sales records strictly reflect verified payments ingested from connected marketplace APIs (Whop / Digistore24) or manually recorded orders.
            </p>
          </div>
          {errorMsg && (
            <div className="text-xs font-mono text-[#EF4444] bg-[#EF4444]/5 border border-[#EF4444]/20 p-2 rounded max-w-md mx-auto">
              Note: {errorMsg}
            </div>
          )}
          <Link
            href="/settings/integrations"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D6A84B] text-[#0A0B0D] font-mono text-xs font-bold hover:bg-[#e2b558] transition-colors"
          >
            <Server className="w-3.5 h-3.5" /> CHECK CONNECTED APIS
          </Link>
        </div>
      ) : (
        <div className="industrial-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#17191E] border-b border-white/10 text-[10px] text-[#626770] uppercase">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Publication</th>
                  <th className="p-4">Marketplace</th>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Gross</th>
                  <th className="p-4">Fees</th>
                  <th className="p-4">Net</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-[#A2A6AD]">
                      {new Date(t.transacted_at).toLocaleDateString('en-GB')}
                    </td>
                    <td className="p-4 font-bold text-[#F5F6F7]">
                      {t.publications?.title || 'Publication'}
                    </td>
                    <td className="p-4 text-[#A2A6AD]">
                      {t.marketplaces?.name || t.source || 'Direct'}
                    </td>
                    <td className="p-4 text-[#626770]">{t.order_id || '—'}</td>
                    <td className="p-4 text-[#F5F6F7]">{t.currency || 'GBP'} £{t.gross_amount}</td>
                    <td className="p-4 text-[#EF4444]">£{t.fees || '0.00'}</td>
                    <td className="p-4 text-[#22C55E] font-bold">£{t.net_amount}</td>
                    <td className="p-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E]">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
