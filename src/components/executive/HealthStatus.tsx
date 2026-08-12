import React from 'react';

type Status = 'GREEN' | 'AMBER' | 'RED';

interface HealthStatusProps {
  status: Status;
  reason?: string;
  size?: 'sm' | 'md' | 'lg';
}

const beaconClassMap: Record<Status, string> = {
  GREEN: 'status-beacon-green',
  AMBER: 'status-beacon-amber',
  RED: 'status-beacon-red',
};

export default function HealthStatus({ status, reason, size = 'sm' }: HealthStatusProps) {
  if (size === 'lg') {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${beaconClassMap[status]} animate-pulse`} />
          <div className="font-display text-lg tracking-widest text-[#F5F6F7]">
            PORTFOLIO HEALTH &mdash; <span className={status === 'GREEN' ? 'text-[#22C55E]' : status === 'AMBER' ? 'text-[#D6A84B]' : 'text-[#EF4444]'}>{status}</span>
          </div>
        </div>
        {reason && <div className="font-data text-xs text-[#A2A6AD] ml-7">{reason}</div>}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full ${beaconClassMap[status]} animate-pulse`} />
      <span className="font-display text-[10px] tracking-wider">PORTFOLIO HEALTH — {status}</span>
      {reason && size === 'md' && <span className="font-data text-[10px] text-[#626770] ml-1">{reason}</span>}
    </div>
  );
}
