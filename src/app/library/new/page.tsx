'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, HardDrive, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

export default function NewPublicationPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [storageConfigured, setStorageConfigured] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('en');
  const [price, setPrice] = useState('19.99');
  const [currency, setCurrency] = useState('GBP');

  useEffect(() => {
    async function checkStorage() {
      try {
        const res = await fetch('/api/storage/status');
        const data = await res.json();
        setStorageConfigured(data.configured && data.connected);
      } catch {
        setStorageConfigured(false);
      }
    }
    checkStorage();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          subtitle,
          author,
          description,
          language,
          default_price: parseFloat(price) || 0,
          default_currency: currency,
          status: 'DRAFT',
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || 'Failed to save publication');
      }

      const data = await res.json();
      router.push(`/library/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-black/8 pb-4">
        <Link href="/library" className="text-[#6B7280] hover:text-[#3D4452] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-xl text-[#0D0F12] font-bold tracking-wider uppercase">ADD NEW PUBLICATION</h1>
          <p className="text-xs text-[#6B7280] font-mono mt-0.5">
            Step {step} of 3: {step === 1 ? 'Metadata' : step === 2 ? 'Description & Pricing' : 'Asset Files'}
          </p>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center gap-2 font-mono text-xs">
        <button
          onClick={() => setStep(1)}
          className={`flex-1 p-3 rounded-lg border text-left transition-colors ${
            step === 1 ? 'border-[#1E3A5F] bg-[#1E3A5F]/10 text-[#1E3A5F] font-bold' : 'border-black/10 text-[#6B7280]'
          }`}
        >
          1. Metadata
        </button>
        <button
          onClick={() => title && setStep(2)}
          disabled={!title}
          className={`flex-1 p-3 rounded-lg border text-left transition-colors disabled:opacity-40 ${
            step === 2 ? 'border-[#1E3A5F] bg-[#1E3A5F]/10 text-[#1E3A5F] font-bold' : 'border-black/10 text-[#6B7280]'
          }`}
        >
          2. Description & Pricing
        </button>
        <button
          onClick={() => title && setStep(3)}
          disabled={!title}
          className={`flex-1 p-3 rounded-lg border text-left transition-colors disabled:opacity-40 ${
            step === 3 ? 'border-[#1E3A5F] bg-[#1E3A5F]/10 text-[#1E3A5F] font-bold' : 'border-black/10 text-[#6B7280]'
          }`}
        >
          3. Asset Files
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="industrial-panel p-6 space-y-6">
        
        {step === 1 && (
          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-[#3D4452] uppercase font-bold mb-1">Publication Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How to Trade: Complete Blueprint"
                className="w-full p-3 rounded bg-[#F4F5F7] border border-black/10 text-[#0D0F12] focus:border-[#1E3A5F] outline-none"
              />
            </div>

            <div>
              <label className="block text-[#3D4452] uppercase font-bold mb-1">Subtitle</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Systematic risk management for retail traders"
                className="w-full p-3 rounded bg-[#F4F5F7] border border-black/10 text-[#0D0F12] focus:border-[#1E3A5F] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#3D4452] uppercase font-bold mb-1">Primary Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Pete Currey"
                  className="w-full p-3 rounded bg-[#F4F5F7] border border-black/10 text-[#0D0F12] focus:border-[#1E3A5F] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#3D4452] uppercase font-bold mb-1">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-3 rounded bg-[#F4F5F7] border border-black/10 text-[#0D0F12] focus:border-[#1E3A5F] outline-none"
                >
                  <option value="en">English (en)</option>
                  <option value="de">German (de)</option>
                  <option value="es">Spanish (es)</option>
                  <option value="fr">French (fr)</option>
                  <option value="pt">Portuguese (pt)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                disabled={!title.trim()}
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded bg-[#1E3A5F] text-white font-bold tracking-wider hover:bg-[#162d4a] disabled:opacity-40 transition-colors"
              >
                NEXT: DESCRIPTION & PRICING →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-[#3D4452] uppercase font-bold mb-1">Full Description</label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed commercial overview of the publication..."
                className="w-full p-3 rounded bg-[#F4F5F7] border border-black/10 text-[#0D0F12] focus:border-[#1E3A5F] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#3D4452] uppercase font-bold mb-1">Default Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 rounded bg-[#F4F5F7] border border-black/10 text-[#0D0F12] focus:border-[#1E3A5F] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#3D4452] uppercase font-bold mb-1">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full p-3 rounded bg-[#F4F5F7] border border-black/10 text-[#0D0F12] focus:border-[#1E3A5F] outline-none"
                >
                  <option value="GBP">GBP (£)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded border border-black/10 text-[#6B7280] hover:text-[#0D0F12]"
              >
                ← BACK
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded bg-[#1E3A5F] text-white font-bold tracking-wider hover:bg-[#162d4a] transition-colors"
              >
                NEXT: ASSET FILES →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 rounded-lg bg-[#F4F5F7] border border-black/6 space-y-3">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-[#1E3A5F]" />
                <span className="font-bold text-[#0D0F12] uppercase">Binary Storage (Cloudflare R2)</span>
              </div>

              {storageConfigured === false ? (
                <div className="p-3 rounded bg-red-50 border border-red-200 text-[#B91C1C]">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertTriangle className="w-4 h-4" /> STORAGE NOT CONFIGURED
                  </div>
                  <p className="mt-1 text-[11px] text-[#6B7280]">
                    Cloudflare R2 is not configured. You can create the publication record now, and upload PDF/cover files once R2 credentials are added to .env.local.
                  </p>
                </div>
              ) : storageConfigured === true ? (
                <div className="p-3 rounded bg-green-50 border border-green-200 text-[#166534]">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> R2 STORAGE READY
                  </div>
                  <p className="mt-1 text-[11px] text-[#6B7280]">
                    Direct upload enabled. Files will be stored in your Cloudflare R2 bucket.
                  </p>
                </div>
              ) : (
                <div className="text-[#6B7280]">Checking storage status...</div>
              )}
            </div>

            {error && (
              <div className="p-3 rounded bg-red-50 border border-red-200 text-[#B91C1C]">
                {error}
              </div>
            )}

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded border border-black/10 text-[#6B7280] hover:text-[#0D0F12]"
              >
                ← BACK
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded bg-[#1E3A5F] text-white font-bold tracking-wider hover:bg-[#162d4a] disabled:opacity-50 transition-colors"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                CREATE PUBLICATION RECORD
              </button>
            </div>
          </div>
        )}

      </form>

    </div>
  );
}
