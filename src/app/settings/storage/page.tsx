'use client';

import React, { useEffect, useState } from 'react';
import { HardDrive, AlertTriangle, XCircle, Loader2, RefreshCw } from 'lucide-react';
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

  const statusColor = !status ? 'text-[#6B7280]'
    : !status.configured ? 'text-[#6B7280]'
    : status.connected ? 'text-[#166534]'
    : 'text-[#B91C1C]';

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3 border-b border-black/8 pb-4">
        <Link href="/settings" className="text-[#6B7280] hover:text-[#3D4452] transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-wider text-[#0D0F12] uppercase font-display">STORAGE</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">Cloudflare R2 object storage.</p>
        </div>
      </div>

      <div className="industrial-panel p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 flex items-center justify-center">
            <HardDrive className="w-4 h-4 text-[#1E3A5F]" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-wider text-[#0D0F12] uppercase">Cloudflare R2</h2>
            <p className="text-xs text-[#6B7280]">S3-compatible binary asset storage</p>
          </div>
          <div className="ml-auto">
            {loading ? (
              <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Checking...
              </span>
            ) : (
              <span className={`text-xs font-bold tracking-wider ${statusColor}`}>{statusLabel}</span>
            )}
          </div>
        </div>

        {status && !status.configured && (
          <div className="p-4 rounded-lg bg-[#F4F5F7] border border-black/8 space-y-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#D44E00] mt-0.5 shrink-0" />
              <div className="space-y-2">
                <p className="text-sm text-[#3D4452]">Cloudflare R2 is not configured. PDF upload and download will not be available.</p>
                <p className="text-xs text-[#6B7280]">Add the following environment variables to your Vercel project settings and .env.local:</p>
                <div className="font-mono text-xs text-[#1E3A5F] space-y-0.5 bg-white border border-black/8 p-3 rounded font-bold">
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
            <div className="flex justify-between p-2.5 bg-[#F4F5F7] rounded border border-black/6">
              <span className="text-[#6B7280]">Bucket</span>
              <span className="text-[#0D0F12] font-bold">{status.bucketName}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-[#F4F5F7] rounded border border-black/6">
              <span className="text-[#6B7280]">Endpoint</span>
              <span className="text-[#3D4452] truncate max-w-[240px]">{status.endpoint?.replace(/https?:\/\//, '')}</span>
            </div>
          </div>
        )}

        {status && status.configured && !status.connected && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-[#B91C1C] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-[#B91C1C] font-medium">Connection failed</p>
                <p className="text-xs text-[#3D4452] mt-1">{status.error ?? 'Could not connect to R2 bucket.'}</p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={checkStatus}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-black/10 hover:bg-[#F4F5F7] text-sm text-[#3D4452] transition-all disabled:opacity-50 font-mono"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            TEST CONNECTION
          </button>
        </div>
      </div>
    </div>
  );
}
