'use client';

import React from 'react';
import { X, Bell } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsDrawer({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed right-0 top-14 z-50 w-80 bg-[#17191E] border border-white/10 border-t-0 shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#D6A84B]" />
            <span className="text-xs font-bold tracking-wider text-[#F5F6F7] uppercase">Notifications</span>
          </div>
          <button onClick={onClose} className="text-[#626770] hover:text-[#F5F6F7] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-8 text-center">
          <p className="text-xs text-[#626770]">Nothing requires attention.</p>
        </div>
      </div>
    </>
  );
}
