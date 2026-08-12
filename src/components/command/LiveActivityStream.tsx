'use client';

import React from 'react';
import { Activity, Radio, TrendingUp, CheckCircle2, ShieldAlert } from 'lucide-react';
import { DEMO_LIVE_ACTIVITIES } from '@/lib/demo-data';

export default function LiveActivityStream() {
  return (
    <div className="industrial-panel p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#D6A84B]" />
          <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider">LIVE TELEMETRY ACTIVITY STREAM</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
          <span className="text-[10px] font-data text-[#22C55E]">STREAM ACTIVE</span>
        </div>
      </div>

      <div className="space-y-2.5">
        {DEMO_LIVE_ACTIVITIES.map((activity) => (
          <div 
            key={activity.id}
            className="industrial-panel-inset p-3 flex items-center justify-between hover:bg-[#17191E] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="font-data text-[10px] text-[#626770] px-2 py-0.5 bg-[#121418] rounded border border-white/5">
                {activity.timestamp}
              </span>
              <div>
                <span className="text-xs font-bold text-[#F5F6F7] mr-2">{activity.channel}:</span>
                <span className="text-xs text-[#A2A6AD] font-data">{activity.description}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {activity.amount && (
                <span className="font-data text-xs font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/20">
                  {activity.amount}
                </span>
              )}
              {activity.isDemo && (
                <span className="text-[9px] font-data text-[#D6A84B] px-1.5 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/20">
                  DEMO DATA
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
