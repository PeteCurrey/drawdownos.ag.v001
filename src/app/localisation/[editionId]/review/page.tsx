'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  Edit3, ChevronRight, CheckCircle2, XCircle, AlertTriangle,
  RotateCcw, ShieldCheck, Languages, BookOpen, Flag, MessageSquare, Database
} from 'lucide-react';

export default function SegmentReviewStudio({
  params,
}: {
  params: Promise<{ editionId: string }>;
}) {
  const { editionId } = use(params);
  const edition = { id: editionId, localeName: 'Unknown' };

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUnit: any = null;
  const [targetText, setTargetText] = useState('');

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/localisation" className="hover:text-[#A2A6AD]">GLOBAL LOCALISATION ENGINE</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/localisation/${edition.id}`} className="hover:text-[#A2A6AD]">{edition.localeName}</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">SEGMENT REVIEW STUDIO</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <Edit3 className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">SEGMENT REVIEW STUDIO — {edition.localeName}</h1>
            </div>
          </div>
          <Link href={`/localisation/${edition.id}`} className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO EDITION
          </Link>
        </div>

        <div className="bg-[#0E1014] border border-white/8 rounded-xl p-12 text-center space-y-3 industrial-panel">
          <Database className="w-8 h-8 text-[#626770] mx-auto" />
          <div className="font-display text-lg text-[#F5F6F7]">NO SEGMENTS TO REVIEW</div>
          <div className="text-sm text-[#626770] max-w-md mx-auto font-data">
            Segment Review Studio requires an active connection to the Translation Management System (TMS) to load translation units, TM matches, and compliance flags.
          </div>
        </div>

      </div>
    </div>
  );
}
