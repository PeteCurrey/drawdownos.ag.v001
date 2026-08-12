'use client';

import React from 'react';
import { Settings, ShieldCheck, Key, Server, Lock, UserCheck } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">PLATFORM SETTINGS & SECURITY</h1>
            <span className="text-[10px] font-data text-[#22C55E] px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30">
              SECURITY SECURE
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Supabase RLS configurations, Cloudflare R2 bucket policies, encrypted secret management, and RBAC user roles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Security & Access Controls */}
        <div className="industrial-panel p-5 space-y-4">
          <div className="flex items-center gap-2 text-[#D6A84B]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-display text-sm font-bold text-[#F5F6F7]">SECURITY & RLS POLICIES</h3>
          </div>

          <div className="space-y-2.5 font-data text-xs text-[#A2A6AD]">
            <div className="p-3 bg-[#0D0E11] rounded border border-white/5 flex justify-between items-center">
              <span>Supabase Row Level Security (RLS)</span>
              <span className="text-[#22C55E] font-bold">ENABLED</span>
            </div>
            <div className="p-3 bg-[#0D0E11] rounded border border-white/5 flex justify-between items-center">
              <span>Server-Side Credential Isolation</span>
              <span className="text-[#22C55E] font-bold">ACTIVE</span>
            </div>
            <div className="p-3 bg-[#0D0E11] rounded border border-white/5 flex justify-between items-center">
              <span>Signed R2 URL Expiry Default</span>
              <span className="text-[#D6A84B] font-bold">3600s (1 HR)</span>
            </div>
            <div className="p-3 bg-[#0D0E11] rounded border border-white/5 flex justify-between items-center">
              <span>Immutable Audit Trail Logging</span>
              <span className="text-[#22C55E] font-bold">STRICT APPEND-ONLY</span>
            </div>
          </div>
        </div>

        {/* Storage Provider Configurations */}
        <div className="industrial-panel p-5 space-y-4">
          <div className="flex items-center gap-2 text-[#38BDF8]">
            <Server className="w-5 h-5" />
            <h3 className="font-display text-sm font-bold text-[#F5F6F7]">CLOUDFLARE R2 BUCKET CONFIGURATION</h3>
          </div>

          <div className="space-y-2.5 font-data text-xs text-[#A2A6AD]">
            <div className="p-3 bg-[#0D0E11] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] block">PRODUCTION BUCKET:</span>
              <span className="text-[#F5F6F7] font-bold">drawdown-os-assets-production</span>
            </div>
            <div className="p-3 bg-[#0D0E11] rounded border border-white/5">
              <span className="text-[#626770] text-[10px] block">CUSTOM ASSETS DOMAIN:</span>
              <span className="text-[#38BDF8] font-bold">https://assets.drawdown.os</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
