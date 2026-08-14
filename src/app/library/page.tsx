import React from 'react';
import Link from 'next/link';
import { BookOpen, Plus } from 'lucide-react';
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
    if (error) errorMsg = error.message;
    else publications = data ?? [];
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : 'Database query failed';
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/8 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#0D0F12] font-bold tracking-wider">PUBLICATION LIBRARY</h1>
            <span className="text-[10px] font-mono text-[#1E3A5F] px-2 py-0.5 rounded bg-[#1E3A5F]/10 border border-[#1E3A5F]/20">
              {publications.length} ITEMS
            </span>
          </div>
          <p className="text-xs text-[#6B7280] font-mono mt-1">
            Canonical publishing registry. Master PDFs, EPUBs, covers, metadata and listing status.
          </p>
        </div>
        <Link href="/library/new" className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1E3A5F] hover:bg-[#162d4a] text-white text-xs font-bold tracking-wider transition-colors">
          <Plus className="w-4 h-4" /> ADD PUBLICATION
        </Link>
      </div>

      {publications.length === 0 ? (
        <div className="industrial-panel p-16 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#F4F5F7] border border-black/8 flex items-center justify-center mx-auto">
            <BookOpen className="w-5 h-5 text-[#9CA3AF]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#3D4452]">No publications in library.</p>
            <p className="text-xs text-[#6B7280] mt-1">Upload your first PDF master file to start managing distribution.</p>
          </div>
          {errorMsg && (
            <div className="text-xs font-mono text-[#B91C1C] bg-red-50 border border-red-200 p-2 rounded max-w-md mx-auto">
              Note: {errorMsg}
            </div>
          )}
          <Link href="/library/new" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1E3A5F] hover:bg-[#162d4a] text-white text-xs font-bold tracking-wider transition-colors">
            <Plus className="w-4 h-4" /> ADD PUBLICATION
          </Link>
        </div>
      ) : (
        <div className="industrial-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#F4F5F7] border-b border-black/8 text-[10px] text-[#6B7280] uppercase">
                <tr>
                  <th className="p-4">Title / Author</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Language</th>
                  <th className="p-4">Default Price</th>
                  <th className="p-4">Created</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/6">
                {publications.map((pub) => (
                  <tr key={pub.id} className="hover:bg-[#F4F5F7] transition-colors">
                    <td className="p-4">
                      <Link href={`/library/${pub.id}`} className="font-bold text-[#0D0F12] hover:text-[#1E3A5F]">
                        {pub.title}
                      </Link>
                      <div className="text-[10px] text-[#9CA3AF] mt-0.5">{pub.author || 'No author'}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1E3A5F]/10 text-[#1E3A5F] border border-[#1E3A5F]/20">
                        {pub.status}
                      </span>
                    </td>
                    <td className="p-4 text-[#3D4452] uppercase">{pub.language || 'en'}</td>
                    <td className="p-4 text-[#0D0F12]">
                      {pub.default_price ? `${pub.default_currency || 'GBP'} £${pub.default_price}` : '—'}
                    </td>
                    <td className="p-4 text-[#6B7280]">{new Date(pub.created_at).toLocaleDateString('en-GB')}</td>
                    <td className="p-4 text-right">
                      <Link href={`/library/${pub.id}`} className="text-xs font-bold text-[#1E3A5F] hover:underline">OPEN →</Link>
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
