import React from 'react';

export function BayesianMeter({ probWinPct, label }: { probWinPct: number, label?: string }) {
  // Determine color based on probability
  let colorClass = 'bg-[#EF4444]'; // Danger (<45%)
  let textColorClass = 'text-[#EF4444]';
  if (probWinPct >= 80) {
    colorClass = 'bg-[#22C55E]'; // Success (>=80%)
    textColorClass = 'text-[#22C55E]';
  } else if (probWinPct >= 45) {
    colorClass = 'bg-[#D6A84B]'; // Amber (45-79%)
    textColorClass = 'text-[#D6A84B]';
  }

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex justify-between items-end">
        {label && <span className="font-display text-[10px] text-white/60">{label}</span>}
        <span className={`font-data text-sm font-medium tabular-nums ${textColorClass}`}>
          {probWinPct.toFixed(1)}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} transition-all duration-500`} 
          style={{ width: `${Math.min(Math.max(probWinPct, 0), 100)}%` }} 
        />
      </div>
    </div>
  );
}
