'use client';

import React, { useEffect, useState } from 'react';
import { HardDrive, CheckCircle2, AlertTriangle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface StorageStatus {
  configured: boolean;
  connected: boolean;
  bucketName: string | null;
  endpoint: string | null;
  error?: string;
}

export default function StorageSettingsPage() {
  const [status, setStatus] = useState<StorageStatus | null>(null);
  const [loading, setLoading] = useState(true);

  async function checkStatus() {
    setLoading(true);
    try {
      const res = await fetch('/api/storage/status');
      const data = await res.json();
      setStatus(data);
    } catch {
      setStatus({ configured: false, connected: false, bucketName: null, endpoint: null, error: 'Failed to reach storage status endpoint.' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { checkStatus(); }, []);

  const statusLabel = !status ? '—'
    : !status.configured ? 'NOT CONFIGURED'
    : status.connected ? 'CONNECTED'
    : 'ERROR';

  const statusColor = !status ? 'text-[#626770]'
    : !status.configured ? 'text-[#626770]'
    : status.connected ? 'text-[#22C55E]'
    : 'text-[#EF4444]';

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <Link href="/settings" className="text-[#626770] hover:text-[#A2A6AD] transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-wider text-[#F5F6F7] uppercase">STORAGE</h1>
          <p className="text-sm text-[#A2A6AD] mt-0.5">Cloudflare R2 object storage.</p>
        </div>
      </div>

      <div className="industrial-panel p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#D6A84B]/10 border border-[#D6A84B]/20 flex items-center justify-center">
            <HardDrive className="w-4 h-4 text-[#D6A84B]" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-wider text-[#F5F6F7] uppercase">Cloudflare R2</h2>
            <p className="text-xs text-[#626770]">S3-compatible binary asset storage</p>
          </div>
          <div className="ml-auto">
            {loading ? (
              <span className="flex items-center gap-1.5 text-xs text-[#626770]">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Checking...
              </span>
            ) : (
              <span className={`text-xs font-bold tracking-wider ${statusColor}`}>{statusLabel}</span>
            )}
          </div>
        </div>

        {status && !status.configured && (
          <div className="p-4 rounded-lg bg-[#17191E] border border-white/10 space-y-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#D6A84B] mt-0.5 shrink-0" />
              <div className="space-y-2">
                <p className="text-sm text-[#A2A6AD]">Cloudflare R2 is not configured. PDF upload and download will not be available.</p>
                <p className="text-xs text-[#626770]">Add the following environment variables to your Vercel project settings and .env.local:</p>
                <div className="font-mono text-xs text-[#D6A84B] space-y-0.5 bg-[#0D0E11] p-3 rounded">
                  <div>R2_ENDPOINT</div>
                  <div>R2_ACCESS_KEY_ID</div>
                  <div>R2_SECRET_ACCESS_KEY</div>
                  <div>R2_BUCKET_NAME</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {status && status.configured && status.connected && (
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between p-2.5 bg-[#0D0E11] rounded">
              <span className="text-[#626770]">Bucket</span>
              <span className="text-[#F5F6F7]">{status.bucketName}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-[#0D0E11] rounded">
              <span className="text-[#626770]">Endpoint</span>
              <span className="text-[#A2A6AD] truncate max-w-[240px]">{status.endpoint?.replace(/https?:\/\//, '')}</span>
            </div>
          </div>
        )}

        {status && status.configured && !status.connected && (
          <div className="p-4 rounded-lg bg-[#EF4444]/5 border border-[#EF4444]/20">
            <div className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-[#EF4444] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-[#EF4444] font-medium">Connection failed</p>
                <p className="text-xs text-[#A2A6AD] mt-1">{status.error ?? 'Could not connect to R2 bucket.'}</p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={checkStatus}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:border-white/20 text-sm text-[#A2A6AD] hover:text-[#F5F6F7] transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            TEST CONNECTION
          </button>
        </div>
      </div>
    </div>
  );
}
