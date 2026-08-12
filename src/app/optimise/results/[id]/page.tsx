'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
import { AlertCircle } from 'lucide-react';

export default function ResultDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <OptimiseShell>
      <div className="bg-[#0A0B0D] min-h-screen text-white p-8">
        <div className="mb-6">
          <Link href="/optimise/results" className="text-gray-500 hover:text-white font-display text-xs tracking-wider flex items-center space-x-2 transition-colors">
            <span>&lt;-</span>
            <span>BACK TO RESULTS</span>
          </Link>
        </div>

        <div className="industrial-panel bg-[#0A0B0D] border border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-10 h-10 text-[#D6A84B]/60 mb-4" />
          <div className="text-[#D6A84B] font-display text-base tracking-widest mb-2">NO EXPERIMENT RECORD</div>
          <p className="text-white/60 text-sm font-data max-w-lg">
            No record found for ID &quot;{id}&quot;. Experiment results strictly reflect recorded trials.
          </p>
        </div>
      </div>
    </OptimiseShell>
  );
}
