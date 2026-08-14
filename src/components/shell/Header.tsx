'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Globe,
  BarChart3,
  Settings,
  Plus,
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'DASHBOARD', href: '/dashboard', icon: LayoutDashboard },
  { name: 'LIBRARY', href: '/library', icon: BookOpen },
  { name: 'DISTRIBUTION', href: '/distribution', icon: Globe },
  { name: 'SALES', href: '/sales', icon: BarChart3 },
  { name: 'SETTINGS', href: '/settings', icon: Settings },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/dashboard'
      ? pathname === '/dashboard' || pathname === '/'
      : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-black/8 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 gap-6">

          {/* Wordmark */}
          <Link href="/dashboard" className="flex items-center gap-3 shrink-0 group">
            <div className="w-7 h-7 rounded-lg bg-[#1E3A5F] flex items-center justify-center group-hover:bg-[#162d4a] transition-colors">
              <span className="font-mono text-xs text-white font-bold">DD</span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-xs font-bold tracking-[0.12em] text-[#0D0F12] uppercase">DRAWDOWN OS</span>
              <span className="text-[9px] text-[#6B7280] tracking-wider uppercase">Publishing Engine</span>
            </div>
          </Link>

          {/* Primary Navigation */}
          <nav className="flex items-center gap-1 flex-1 overflow-x-auto scrollbar-none">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold tracking-wider whitespace-nowrap transition-all ${
                    active
                      ? 'text-[#1E3A5F] bg-[#1E3A5F]/10'
                      : 'text-[#6B7280] hover:text-[#3D4452] hover:bg-black/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/library/new"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E3A5F] hover:bg-[#162d4a] text-white text-xs font-bold tracking-wider transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ADD PUBLICATION</span>
              <span className="sm:hidden">ADD</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
