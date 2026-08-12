'use client';

import React from 'react';
import { X, Bell, CheckCircle2, AlertTriangle, Radio, TrendingUp, ShieldAlert } from 'lucide-react';
import { DEMO_LIVE_ACTIVITIES } from '@/lib/demo-data';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#121418] border-l border-white/10 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-[#17191E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#D6A84B]" />
            <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider">TELEMETRY NOTIFICATIONS</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded text-[#626770] hover:text-[#F5F6F7] hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Telemetry Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {DEMO_LIVE_ACTIVITIES.map(activity => (
            <div 
              key={activity.id}
              className="p-3 rounded-lg bg-[#17191E] border border-white/5 hover:border-white/15 transition-colors flex items-start gap-3"
            >
              <div className="mt-0.5">
                {activity.type === 'SALE' && <TrendingUp className="w-4 h-4 text-[#22C55E]" />}
                {activity.type === 'SYNC' && <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />}
                {activity.type === 'PAYMENT' && <TrendingUp className="w-4 h-4 text-[#D6A84B]" />}
                {activity.type === 'OPPORTUNITY' && <Radio className="w-4 h-4 text-[#FF6A18]" />}
                {activity.type === 'COMPLIANCE' && <ShieldAlert className="w-4 h-4 text-[#22C55E]" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F5F6F7]">{activity.channel}</span>
                  <span className="font-data text-[10px] text-[#626770]">{activity.timestamp}</span>
                </div>
                <p className="text-xs text-[#A2A6AD] mt-1">{activity.description}</p>
                {activity.amount && (
                  <span className="inline-block text-xs font-data text-[#22C55E] font-bold mt-1">
                    {activity.amount}
                  </span>
                )}
                {activity.isDemo && (
                  <span className="ml-2 text-[9px] font-data text-[#D6A84B] px-1 py-0.2 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/20">
                    DEMO
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-[#0D0E11] text-center">
          <span className="text-[10px] font-data text-[#626770]">SYSTEM HEALTH: 99.8% • ALL AUTOMATION QUEUES HEALTHY</span>
        </div>

      </div>
    </div>
  );
}
