'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X, BookOpen } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickAddModal({ isOpen, onClose }: Props) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-[#17191E] border border-white/20 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <span className="text-xs font-bold tracking-wider text-[#F5F6F7] uppercase">Add New</span>
          <button onClick={onClose} className="text-[#626770] hover:text-[#F5F6F7]">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <button
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 border border-white/10 text-left transition-colors"
            onClick={() => { router.push('/library/new'); onClose(); }}
          >
            <div className="w-8 h-8 rounded-lg bg-[#D6A84B]/10 border border-[#D6A84B]/30 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#D6A84B]" />
            </div>
            <div>
              <div className="text-sm font-medium text-[#F5F6F7]">Add Publication</div>
              <div className="text-xs text-[#626770]">Upload a new PDF or digital product</div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
