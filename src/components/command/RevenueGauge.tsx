'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, DollarSign, AlertCircle, RefreshCw } from 'lucide-react';
import { getWhopPayments } from '@/lib/connectors/whop/client';

export default function RevenueGauge() {
  const [loading, setLoading] = useState(true);
  const [whopConnected, setWhopConnected] = useState(false);
  const [totalsByCurrency, setTotalsByCurrency] = useState<Record<string, number>>({});
  const [totalOrdersCount, setTotalOrdersCount] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('Awaiting marketplace data');

  const loadRevenueData = async () => {
    setLoading(true);
    try {
      const res = await getWhopPayments();
      if (res.success && res.payments.length > 0) {
        setWhopConnected(true);
        setTotalOrdersCount(res.payments.length);

        const currencyMap: Record<string, number> = {};
        for (const p of res.payments) {
          const curr = p.currency || 'USD';
          currencyMap[curr] = (currencyMap[curr] || 0) + p.grossAmount;
        }

        setTotalsByCurrency(currencyMap);
        setStatusMessage(`${res.payments.length} live Whop payment(s) imported`);
      } else if (res.error) {
        setStatusMessage(res.error);
      } else {
        setStatusMessage('No live transactions recorded on Whop');
      }
    } catch {
      setStatusMessage('Whop connection unverified or awaiting credentials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRevenueData();
  }, []);

  const currencies = Object.keys(totalsByCurrency);

  return (
    <div className="industrial-panel p-6 relative overflow-hidden flex flex-col justify-between h-full min-h-[440px]">
      
      {/* Title & Status */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1C1F24] border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] shadow-inner">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-display text-base text-[#F5F6F7] tracking-wider">REVENUE ENGINE</h2>
            <p className="text-[11px] font-data text-[#A2A6AD]">REAL COMMERCIAL PAYOUT & RECONCILIATION</p>
          </div>
        </div>

        <button 
          onClick={loadRevenueData}
          title="Refresh Live Revenue"
          className="p-1.5 rounded-lg bg-[#0D0E11] border border-white/10 text-[#A2A6AD] hover:text-[#F5F6F7] transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Primary Telemetry Displays */}
      <div className="flex flex-col gap-4 my-auto py-2">
        
        {/* Real Native Currency Totals */}
        <div className="bg-[#0D0E11] border border-white/10 rounded-xl p-5 shadow-xl">
          <span className="text-[10px] font-display tracking-widest text-[#626770] uppercase block mb-1">
            GROSS REVENUE RECORDED (MTD)
          </span>
          
          {currencies.length > 0 ? (
            <div className="flex flex-col gap-1">
              {currencies.map(curr => (
                <div key={curr} className="font-data text-2xl font-bold text-[#22C55E]">
                  {curr} ${totalsByCurrency[curr]?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              ))}
            </div>
          ) : (
            <div className="font-data text-3xl font-bold text-[#F5F6F7]">
              —
            </div>
          )}

          <div className="text-[11px] font-data text-[#A2A6AD] mt-2 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#D6A84B]" />
            <span>{statusMessage}</span>
          </div>
        </div>

        {/* Supporting Metric Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0D0E11] border border-white/10 rounded-lg p-3">
            <span className="text-[9px] font-display text-[#626770] uppercase block mb-1">ORDERS (MTD)</span>
            <span className="font-data text-lg text-[#F5F6F7]">{totalOrdersCount}</span>
            <span className="text-[9px] font-data text-[#626770] block mt-0.5">Canonical orders</span>
          </div>

          <div className="bg-[#0D0E11] border border-white/10 rounded-lg p-3">
            <span className="text-[9px] font-display text-[#626770] uppercase block mb-1">MONTHLY TARGET</span>
            <span className="font-data text-xs text-[#D6A84B] font-bold block mt-1">NOT SET</span>
            <span className="text-[9px] font-data text-[#626770] block mt-0.5">User config required</span>
          </div>

          <div className="bg-[#0D0E11] border border-white/10 rounded-lg p-3">
            <span className="text-[9px] font-display text-[#626770] uppercase block mb-1">FORECAST</span>
            <span className="font-data text-[10px] text-[#A2A6AD] block mt-1">INSUFFICIENT HISTORY</span>
          </div>

          <div className="bg-[#0D0E11] border border-white/10 rounded-lg p-3">
            <span className="text-[9px] font-display text-[#626770] uppercase block mb-1">PRIOR PERIOD</span>
            <span className="font-data text-[10px] text-[#A2A6AD] block mt-1">NO PRIOR PERIOD</span>
          </div>
        </div>

      </div>

      {/* Footer Notice */}
      <div className="border-t border-white/5 pt-3 text-[10px] font-data text-[#626770] flex justify-between items-center">
        <span>FX FEED: NOT CONFIGURED</span>
        <span>NO FABRICATED FIGURES</span>
      </div>

    </div>
  );
}
