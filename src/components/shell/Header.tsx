'use client';

import React, { useState } from 'react';
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
    <header className="sticky top-0 z-40 bg-[#0A0B0D]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 gap-6">

          {/* Wordmark */}
          <Link href="/dashboard" className="flex items-center gap-3 shrink-0 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-b from-[#1C1F24] to-[#121418] border border-[#D6A84B]/40 flex items-center justify-center group-hover:border-[#D6A84B] transition-colors">
              <span className="font-mono text-xs text-[#D6A84B] font-bold">DD</span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-xs font-bold tracking-[0.12em] text-[#F5F6F7] uppercase">DRAWDOWN OS</span>
              <span className="text-[9px] text-[#626770] tracking-wider uppercase">Publishing Engine</span>
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
                      ? 'text-[#D6A84B] bg-[#D6A84B]/10'
                      : 'text-[#626770] hover:text-[#A2A6AD] hover:bg-white/5'
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] text-xs font-bold tracking-wider transition-colors"
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
