import React from 'react';
import Link from 'next/link';
import { DollarSign, AlertCircle, Server } from 'lucide-react';
import { supabaseServer } from '@/lib/supabase/server';

export const revalidate = 0;

export default async function SalesPage() {
  let transactions: any[] = [];
  let errorMsg: string | null = null;

  try {
    const { data, error } = await supabaseServer
      .from('sales_transactions')
      .select('*, publications ( title ), marketplaces ( name )')
      .order('transacted_at', { ascending: false })
      .limit(50);
    if (error) errorMsg = error.message;
    else transactions = data ?? [];
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : 'Database query failed';
  }

  const grossTotal = transactions.reduce((sum, t) => sum + Number(t.gross_amount || 0), 0);
  const feesTotal = transactions.reduce((sum, t) => sum + Number(t.fees || 0), 0);
  const netTotal = transactions.reduce((sum, t) => sum + Number(t.net_amount || 0), 0);

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/8 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#0D0F12] font-bold tracking-wider">SALES & TRANSACTIONS</h1>
            <span className="text-[10px] font-mono text-[#1E3A5F] px-2 py-0.5 rounded bg-[#1E3A5F]/10 border border-[#1E3A5F]/20">TRUTH LAYER ACTIVE</span>
          </div>
          <p className="text-xs text-[#6B7280] font-mono mt-1">Canonical sales transaction ledger. Ingested via API webhooks or imported records.</p>
        </div>
        <Link href="/settings/integrations" className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-black/10 text-xs font-mono text-[#3D4452] hover:bg-[#F4F5F7] transition-colors">
          <Server className="w-3.5 h-3.5" /> API CONNECTORS
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        {[
          { label: 'Gross Revenue', value: grossTotal > 0 ? `£${grossTotal.toFixed(2)}` : '—', color: 'text-[#0D0F12]' },
          { label: 'Channel Fees', value: feesTotal > 0 ? `£${feesTotal.toFixed(2)}` : '—', color: 'text-[#B91C1C]' },
          { label: 'Net Settled', value: netTotal > 0 ? `£${netTotal.toFixed(2)}` : '—', color: 'text-[#166534]' },
          { label: 'Transaction Count', value: transactions.length, color: 'text-[#1D5F8A]' },
        ].map((c) => (
          <div key={c.label} className="industrial-panel p-4 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase">{c.label}</span>
            <span className={`text-xl font-bold mt-2 ${c.color}`}>{c.value}</span>
          </div>
        ))}
      </div>

      {transactions.length === 0 ? (
        <div className="industrial-panel p-12 text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-[#9CA3AF] mx-auto" />
          <div>
            <div className="text-sm font-bold font-mono text-[#0D0F12]">No transactions recorded yet.</div>
            <p className="text-xs font-mono text-[#6B7280] mt-1 max-w-md mx-auto">
              Sales records strictly reflect verified payments ingested from connected marketplace APIs or manually recorded orders.
            </p>
          </div>
          {errorMsg && (
            <div className="text-xs font-mono text-[#B91C1C] bg-red-50 border border-red-200 p-2 rounded max-w-md mx-auto">Note: {errorMsg}</div>
          )}
          <Link href="/settings/integrations" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1E3A5F] text-white font-mono text-xs font-bold hover:bg-[#162d4a] transition-colors">
            <Server className="w-3.5 h-3.5" /> CHECK CONNECTED APIS
          </Link>
        </div>
      ) : (
        <div className="industrial-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#F4F5F7] border-b border-black/8 text-[10px] text-[#6B7280] uppercase">
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
              <tbody className="divide-y divide-black/6">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-[#F4F5F7] transition-colors">
                    <td className="p-4 text-[#3D4452]">{new Date(t.transacted_at).toLocaleDateString('en-GB')}</td>
                    <td className="p-4 font-bold text-[#0D0F12]">{t.publications?.title || 'Publication'}</td>
                    <td className="p-4 text-[#3D4452]">{t.marketplaces?.name || t.source || 'Direct'}</td>
                    <td className="p-4 text-[#6B7280]">{t.order_id || '—'}</td>
                    <td className="p-4 text-[#0D0F12]">£{t.gross_amount}</td>
                    <td className="p-4 text-[#B91C1C]">£{t.fees || '0.00'}</td>
                    <td className="p-4 text-[#166534] font-bold">£{t.net_amount}</td>
                    <td className="p-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-50 text-[#166534] border border-green-200">{t.status}</span>
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
