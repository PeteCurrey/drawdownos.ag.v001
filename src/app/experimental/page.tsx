import React from 'react';
import Link from 'next/link';
import { FlaskConical } from 'lucide-react';

export default function ExperimentalPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
      <div className="w-12 h-12 rounded-xl bg-[#17191E] border border-white/10 flex items-center justify-center mx-auto">
        <FlaskConical className="w-5 h-5 text-[#D6A84B]" />
      </div>
      <div>
        <h1 className="text-lg font-bold tracking-wider text-[#F5F6F7] uppercase">Experimental</h1>
        <p className="text-sm text-[#A2A6AD] mt-2 leading-relaxed">
          This area contains capabilities that are under development or not yet part of the production operating surface.
          They are preserved for future use but are not available in the current release.
        </p>
      </div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] text-sm font-bold tracking-wider transition-colors"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
