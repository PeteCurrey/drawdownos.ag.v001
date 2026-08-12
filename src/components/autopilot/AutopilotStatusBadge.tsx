'use client';

import React, { useState } from 'react';
import { Shield, ShieldAlert, Play, Pause, AlertOctagon, RefreshCw, Zap } from 'lucide-react';
import { AutopilotStatus, AutopilotMode } from '@/lib/autopilot-data';

interface AutopilotStatusBadgeProps {
  initialStatus?: AutopilotStatus;
  initialMode?: AutopilotMode;
  onStatusChange?: (newStatus: AutopilotStatus) => void;
  compact?: boolean;
}

export default function AutopilotStatusBadge({
  initialStatus = 'ASSISTED',
  initialMode = 'ASSISTED',
  onStatusChange,
  compact = false,
}: AutopilotStatusBadgeProps) {
  const [status, setStatus] = useState<AutopilotStatus>(initialStatus);
  const [mode, setMode] = useState<AutopilotMode>(initialMode);
  const [isChanging, setIsChanging] = useState(false);

  const handleTogglePause = () => {
    setIsChanging(true);
    setTimeout(() => {
      const nextStatus = status === 'PAUSED' ? (mode === 'AUTOPILOT' ? 'ACTIVE' : mode) : 'PAUSED';
      setStatus(nextStatus);
      if (onStatusChange) onStatusChange(nextStatus);
      setIsChanging(false);
    }, 300);
  };

  const handleEmergencyStop = () => {
    if (confirm('EMERGENCY STOP: Prevent all autonomous write operations immediately? Running jobs will reach a safe stopping point.')) {
      setStatus('EMERGENCY_STOP');
      setMode('OFF');
      if (onStatusChange) onStatusChange('EMERGENCY_STOP');
    }
  };

  const getStatusColor = (s: AutopilotStatus) => {
    switch (s) {
      case 'ACTIVE':
        return 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30';
      case 'ASSISTED':
        return 'text-[#D6A84B] bg-[#D6A84B]/10 border-[#D6A84B]/30';
      case 'ADVISORY':
        return 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/30';
      case 'PAUSED':
        return 'text-[#FF6A18] bg-[#FF6A18]/10 border-[#FF6A18]/30';
      case 'DEGRADED':
        return 'text-[#FF6A18] bg-[#FF6A18]/10 border-[#FF6A18]/30';
      case 'EMERGENCY_STOP':
        return 'text-[#EF4444] bg-[#EF4444]/20 border-[#EF4444]/60 animate-pulse';
      case 'OFF':
      default:
        return 'text-[#626770] bg-white/5 border-white/10';
    }
  };

  const getPulseDot = (s: AutopilotStatus) => {
    switch (s) {
      case 'ACTIVE':
        return 'bg-[#22C55E] animate-pulse shadow-[0_0_8px_#22C55E]';
      case 'ASSISTED':
        return 'bg-[#D6A84B] shadow-[0_0_6px_#D6A84B]';
      case 'ADVISORY':
        return 'bg-[#38BDF8]';
      case 'PAUSED':
        return 'bg-[#FF6A18]';
      case 'EMERGENCY_STOP':
        return 'bg-[#EF4444] animate-ping';
      default:
        return 'bg-[#626770]';
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-data px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${getStatusColor(status)}`}>
          <span className={`w-2 h-2 rounded-full ${getPulseDot(status)}`} />
          <span className="font-bold">AUTOPILOT: {status}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 p-3 bg-[#121418] rounded-xl border border-white/10 shadow-lg">
      
      {/* Live Status Pill */}
      <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-data ${getStatusColor(status)}`}>
        <span className={`w-2.5 h-2.5 rounded-full ${getPulseDot(status)}`} />
        <div>
          <span className="text-[9px] font-display text-[#626770] block leading-none">SYSTEM STATUS</span>
          <span className="font-bold tracking-wider">{status}</span>
        </div>
      </div>

      {/* Mode Indicator */}
      <div className="hidden sm:flex flex-col text-left font-data text-xs px-3 border-l border-white/10">
        <span className="text-[9px] font-display text-[#626770]">CONFIGURED MODE</span>
        <span className="font-bold text-[#F5F6F7]">{mode}</span>
      </div>

      {/* Quick Actions Controls */}
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={handleTogglePause}
          disabled={isChanging || status === 'EMERGENCY_STOP'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-bold transition-all shadow-md ${
            status === 'PAUSED'
              ? 'bg-[#22C55E] hover:bg-[#20b054] text-[#0A0B0D]'
              : 'bg-[#1C1F24] hover:bg-white/10 text-[#F5F6F7] border border-white/10'
          }`}
        >
          {status === 'PAUSED' ? (
            <>
              <Play className="w-3.5 h-3.5 fill-current" /> RESUME AUTOPILOT
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5" /> PAUSE AUTOPILOT
            </>
          )}
        </button>

        <button
          onClick={handleEmergencyStop}
          disabled={status === 'EMERGENCY_STOP'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-bold transition-all shadow-md ${
            status === 'EMERGENCY_STOP'
              ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40 cursor-not-allowed'
              : 'bg-[#EF4444] hover:bg-[#dc2626] text-white shadow-[0_0_12px_rgba(239,68,68,0.4)]'
          }`}
          title="Immediately prevent all autonomous write operations"
        >
          <AlertOctagon className="w-3.5 h-3.5" /> EMERGENCY STOP
        </button>
      </div>

    </div>
  );
}
