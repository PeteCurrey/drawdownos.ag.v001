'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_LINKS = [
  { label: 'Dashboard', href: '/dashboard', description: 'Overview and attention items' },
  { label: 'Library', href: '/library', description: 'Manage publications' },
  { label: 'Add Publication', href: '/library/new', description: 'Upload a new publication' },
  { label: 'Distribution', href: '/distribution', description: 'Marketplace management' },
  { label: 'Sales', href: '/sales', description: 'Revenue and transactions' },
  { label: 'Settings', href: '/settings', description: 'Configuration and integrations' },
  { label: 'Storage', href: '/settings/storage', description: 'Cloudflare R2 status' },
  { label: 'Integrations', href: '/settings/integrations', description: 'API connections' },
];

export default function CommandPalette({ isOpen, onClose }: Props) {
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60" onClick={onClose} />
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-[#17191E] border border-white/20 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <span className="text-xs font-bold tracking-wider text-[#A2A6AD] uppercase">Quick Navigation</span>
          <button onClick={onClose} className="text-[#626770] hover:text-[#F5F6F7]">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="py-1">
          {QUICK_LINKS.map((link) => (
            <button
              key={link.href}
              className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/5 text-left transition-colors"
              onClick={() => { router.push(link.href); onClose(); }}
            >
              <span className="text-sm text-[#F5F6F7] font-medium">{link.label}</span>
              <span className="text-xs text-[#626770]">{link.description}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
