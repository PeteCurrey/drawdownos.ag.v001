import React from 'react';

type ConfidenceLevel = 'VERIFIED' | 'HIGH' | 'MODERATE' | 'LOW' | 'SPECULATIVE';

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  pct?: number;
}

const colorMap: Record<ConfidenceLevel, string> = {
  VERIFIED: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20',
  HIGH: 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/20',
  MODERATE: 'text-[#D6A84B] bg-[#D6A84B]/10 border-[#D6A84B]/20',
  LOW: 'text-[#FF6A18] bg-[#FF6A18]/10 border-[#FF6A18]/20',
  SPECULATIVE: 'text-[#626770] bg-[#626770]/10 border-[#626770]/20',
};

export default function ConfidenceBadge({ level, pct }: ConfidenceBadgeProps) {
  return (
    <div className={`inline-flex items-center px-1.5 py-0.5 rounded border ${colorMap[level]} font-data text-[9px] uppercase tracking-wider`}>
      {pct !== undefined ? `${pct}% ${level}` : level}
    </div>
  );
}
