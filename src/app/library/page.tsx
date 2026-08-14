import React from 'react';
import Link from 'next/link';
import { BookOpen, Plus, Search, Filter, FileText, Globe, Tag } from 'lucide-react';
import { supabaseServer } from '@/lib/supabase/server';

export const revalidate = 0;

export default async function LibraryPage() {
  let publications: any[] = [];
  let errorMsg: string | null = null;

  try {
    const { data, error } = await supabaseServer
      .from('publications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      errorMsg = error.message;
    } else {
      publications = data ?? [];
    }
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : 'Database query failed';
  }

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider uppercase">PUBLICATION LIBRARY</h1>
            <span className="text-[10px] font-mono text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              {publications.length} ITEMS
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-mono mt-1">
            Canonical publishing registry. Master PDFs, EPUBs, covers, metadata and listing status.
          </p>
        </div>

        <Link
          href="/library/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] text-xs font-bold tracking-wider transition-colors"
        >
          <Plus className="w-4 h-4" /> ADD PUBLICATION
        </Link>
      </div>

      {/* Publications Table / List */}
      {publications.length === 0 ? (
        <div className="industrial-panel p-16 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#17191E] border border-white/10 flex items-center justify-center mx-auto">
            <BookOpen className="w-5 h-5 text-[#626770]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#A2A6AD]">No publications in library.</p>
            <p className="text-xs text-[#626770] mt-1">
              Upload your first PDF master file to start managing distribution across marketplaces.
            </p>
          </div>
          {errorMsg && (
            <div className="text-xs font-mono text-[#EF4444] bg-[#EF4444]/5 border border-[#EF4444]/20 p-2 rounded max-w-md mx-auto">
              Note: {errorMsg}
            </div>
          )}
          <Link
            href="/library/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] text-xs font-bold tracking-wider transition-colors"
          >
            <Plus className="w-4 h-4" /> ADD PUBLICATION
          </Link>
        </div>
      ) : (
        <div className="industrial-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#17191E] border-b border-white/10 text-[10px] text-[#626770] uppercase">
                <tr>
                  <th className="p-4">Title / Author</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Language</th>
                  <th className="p-4">Default Price</th>
                  <th className="p-4">Created</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {publications.map((pub) => (
                  <tr key={pub.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <Link href={`/library/${pub.id}`} className="font-bold text-[#F5F6F7] hover:text-[#D6A84B]">
                        {pub.title}
                      </Link>
                      <div className="text-[10px] text-[#626770] mt-0.5">{pub.author || 'No author'}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D6A84B]/10 text-[#D6A84B] border border-[#D6A84B]/30">
                        {pub.status}
                      </span>
                    </td>
                    <td className="p-4 text-[#A2A6AD] uppercase">{pub.language || 'en'}</td>
                    <td className="p-4 text-[#F5F6F7]">
                      {pub.default_price ? `${pub.default_currency || 'GBP'} £${pub.default_price}` : '—'}
                    </td>
                    <td className="p-4 text-[#626770]">
                      {new Date(pub.created_at).toLocaleDateString('en-GB')}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/library/${pub.id}`}
                        className="text-xs font-bold text-[#D6A84B] hover:underline"
                      >
                        OPEN →
                      </Link>
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
