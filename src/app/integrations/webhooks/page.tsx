'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Radio, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Filter, 
  FileCode, 
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { DEMO_WEBHOOK_EVENTS, WebhookEventRecord } from '@/lib/connectors/webhook-engine';

export default function WebhookInspectorPage() {
  const [events, setEvents] = useState<WebhookEventRecord[]>(DEMO_WEBHOOK_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<WebhookEventRecord | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredEvents = events.filter(e => {
    if (filterStatus === 'ALL') return true;
    return e.processingStatus === filterStatus;
  });

  const handleReprocess = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, processingStatus: 'REPLAYED' as const, signatureVerified: true, errorMessage: undefined } : e));
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/integrations" className="text-[#626770] hover:text-[#F5F6F7] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">WEBHOOK EVENT INSPECTOR & REPLAY TOOL</h1>
            <span className="text-[10px] font-data text-[#22C55E] px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30">
              REAL-TIME LISTENER
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Signature verification, payload inspection, replay protection, and dead-letter handling (§24, §25, §26).
          </p>
        </div>
      </div>

      {/* Filter Status Toolbar */}
      <div className="flex items-center gap-2 p-3 bg-[#121418] rounded-xl border border-white/10 font-data text-xs">
        <Filter className="w-3.5 h-3.5 text-[#626770]" />
        <span className="text-[10px] font-display text-[#626770]">STATUS:</span>
        {(['ALL', 'PROCESSED', 'FAILED', 'REPLAYED'] as const).map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1 rounded-lg font-display text-xs transition-all border ${
              filterStatus === st
                ? 'bg-[#D6A84B] text-[#0A0B0D] border-[#D6A84B] font-bold shadow-md'
                : 'text-[#A2A6AD] border-white/10 hover:border-white/20'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Webhook Events Table (§26) */}
      <div className="industrial-panel p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-data text-xs">
            <thead className="bg-[#17191E] border-b border-white/10 font-display text-[10px] text-[#626770]">
              <tr>
                <th className="p-3">RECEIVED AT</th>
                <th className="p-3">CONNECTOR</th>
                <th className="p-3">CANONICAL EVENT</th>
                <th className="p-3">EXTERNAL TYPE</th>
                <th className="p-3">SIGNATURE</th>
                <th className="p-3">STATUS</th>
                <th className="p-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredEvents.map(ev => (
                <tr key={ev.id} className="hover:bg-[#17191E] transition-colors">
                  <td className="p-3 text-[#626770]">{ev.receivedAt}</td>
                  <td className="p-3 font-bold text-[#F5F6F7]">{ev.marketplaceName}</td>
                  <td className="p-3 text-[#D6A84B] font-bold">{ev.canonicalEvent}</td>
                  <td className="p-3 text-[#A2A6AD]">{ev.externalEventType}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-display ${
                      ev.signatureVerified ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30' : 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30'
                    }`}>
                      {ev.signatureVerified ? 'HMAC VALID ✓' : 'INVALID HMAC ✗'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-display ${
                      ev.processingStatus === 'PROCESSED' || ev.processingStatus === 'REPLAYED'
                        ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30'
                        : 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30'
                    }`}>
                      {ev.processingStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => setSelectedEvent(selectedEvent?.id === ev.id ? null : ev)}
                      className="text-[10px] font-display text-[#38BDF8] hover:underline"
                    >
                      INSPECT
                    </button>
                    {ev.processingStatus === 'FAILED' && (
                      <button
                        onClick={() => handleReprocess(ev.id)}
                        className="text-[10px] font-display text-[#22C55E] hover:underline"
                      >
                        REPLAY
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expandable Webhook Payload Inspector (§26) */}
      {selectedEvent && (
        <div className="industrial-panel p-5 space-y-4 border-l-4 border-l-[#38BDF8]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider uppercase">
              PAYLOAD INSPECTOR — EVENT {selectedEvent.id} ({selectedEvent.marketplaceName})
            </h3>
            <button onClick={() => setSelectedEvent(null)} className="text-[#626770] hover:text-[#F5F6F7]">✕</button>
          </div>

          <div className="space-y-3 font-data text-xs">
            {selectedEvent.errorMessage && (
              <div className="p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg text-[#EF4444]">
                <strong>Error:</strong> {selectedEvent.errorMessage}
              </div>
            )}

            <pre className="p-4 bg-[#0D0E11] rounded-xl border border-white/10 text-xs font-data text-[#D6A84B] overflow-x-auto">
              {JSON.stringify(selectedEvent.rawPayload, null, 2)}
            </pre>
          </div>
        </div>
      )}

    </div>
  );
}
