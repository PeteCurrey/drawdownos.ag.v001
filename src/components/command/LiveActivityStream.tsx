'use client';

import React, { useEffect, useState } from 'react';
import { Activity, RefreshCw } from 'lucide-react';

interface SystemEvent {
  id: string;
  timestamp: string;
  channel: string;
  description: string;
  amount?: string;
  eventType: string;
}

export default function LiveActivityStream() {
  const [events, setEvents] = useState<SystemEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<string>('');

  const loadEvents = async () => {
    setLoading(true);
    try {
      // In production this will query audit_logs from Supabase via a server route
      // For now: show empty truthful state until real events are recorded
      setEvents([]);
      setLastChecked(new Date().toLocaleTimeString());
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="industrial-panel p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#D6A84B]" />
          <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider">SYSTEM ACTIVITY LOG</h3>
        </div>
        <div className="flex items-center gap-3">
          {lastChecked && (
            <span className="text-[10px] font-data text-[#626770]">Checked {lastChecked}</span>
          )}
          <button
            onClick={loadEvents}
            title="Refresh Activity Log"
            className="p-1 rounded bg-[#0D0E11] border border-white/10 text-[#A2A6AD] hover:text-[#F5F6F7] transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="py-10 text-center">
          <Activity className="w-8 h-8 text-[#626770] mx-auto mb-3" />
          <div className="font-display text-sm text-[#A2A6AD]">NO ACTIVITY RECORDED YET</div>
          <div className="text-[11px] font-data text-[#626770] mt-2 max-w-sm mx-auto">
            Real events will appear here once a marketplace connector is authenticated and data is synced.
            Connect Whop via the Integrations page to begin.
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {events.map((event) => (
            <div
              key={event.id}
              className="industrial-panel-inset p-3 flex items-center justify-between hover:bg-[#17191E] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-data text-[10px] text-[#626770] px-2 py-0.5 bg-[#121418] rounded border border-white/5">
                  {event.timestamp}
                </span>
                <div>
                  <span className="text-xs font-bold text-[#F5F6F7] mr-2">{event.channel}:</span>
                  <span className="text-xs text-[#A2A6AD] font-data">{event.description}</span>
                </div>
              </div>
              {event.amount && (
                <span className="font-data text-xs font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/20">
                  {event.amount}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
