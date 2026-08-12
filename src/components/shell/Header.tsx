'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Plus, 
  Bell, 
  User, 
  Activity, 
  ChevronDown, 
  ShieldCheck, 
  Radio, 
  Command,
  Sliders,
  Layers,
  BarChart3,
  Users,
  Megaphone,
  Brain,
  FileCheck,
  Briefcase,
  Settings,
  Zap,
  Server,
  Factory,
  Globe,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import CommandPalette from './CommandPalette';
import NotificationsDrawer from './NotificationsDrawer';
import QuickAddModal from './QuickAddModal';

export default function Header() {
  const pathname = usePathname();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  const navLinks = [
    { name: 'EXECUTIVE', href: '/executive', icon: Brain },
    { name: 'OPTIMISE', href: '/optimise', icon: Zap },
    { name: 'COMMAND', href: '/command', icon: Radio },
    { name: 'CATALOG', href: '/catalog', icon: Layers },
    { name: 'FACTORY', href: '/factory', icon: Factory },
    { name: 'DISTRIBUTION', href: '/distribution', icon: Sliders },
    { name: 'MERCHANDISING', href: '/merchandising', icon: Sliders },
    { name: 'LOCALISATION', href: '/localisation', icon: Globe },
    { name: 'GROWTH', href: '/growth', icon: TrendingUp },
    { name: 'FINANCE', href: '/finance', icon: DollarSign },
    { name: 'INTEGRATIONS', href: '/integrations', icon: Server },
    { name: 'REVENUE', href: '/revenue', icon: BarChart3 },
    { name: 'AFFILIATES', href: '/affiliates', icon: Users },
    { name: 'MARKETING', href: '/marketing', icon: Megaphone },
    { name: 'INTELLIGENCE', href: '/intelligence', icon: Activity },
    { name: 'AUTOPILOT', href: '/autopilot', icon: Zap },
    { name: 'COMPLIANCE', href: '/compliance', icon: FileCheck },
    { name: 'OPERATIONS', href: '/operations', icon: Briefcase },
    { name: 'SETTINGS', href: '/settings', icon: Settings },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0A0B0D]/95 backdrop-blur border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left Wordmark Logo & Branding */}
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/executive" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#1C1F24] to-[#121418] border border-[#D6A84B]/40 flex items-center justify-center shadow-lg group-hover:border-[#D6A84B] transition-colors">
                <span className="font-display text-sm text-[#D6A84B] font-bold">DD</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm tracking-widest text-[#F5F6F7] font-bold">DRAWDOWN OS</span>
                  <span className="text-[10px] font-data px-1.5 py-0.5 rounded bg-[#D6A84B]/10 text-[#D6A84B] border border-[#D6A84B]/30">v1.2</span>
                </div>
                <span className="text-[9px] font-data text-[#626770] tracking-wider uppercase">Publishing Engine</span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Module */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#121418] p-1 rounded-xl border border-white/10">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/command' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-display transition-all ${
                    isActive
                      ? link.name === 'EXECUTIVE'
                        ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30 shadow-md'
                        : 'bg-[#1C1F24] text-[#F5F6F7] border border-white/20 shadow-md'
                      : link.name === 'EXECUTIVE'
                        ? 'text-[#D6A84B]/80 hover:text-[#D6A84B] hover:bg-[#D6A84B]/5 border border-transparent hover:border-[#D6A84B]/20'
                        : 'text-[#A2A6AD] hover:text-[#F5F6F7] hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? (link.name === 'EXECUTIVE' ? 'text-[#D6A84B]' : 'text-[#F5F6F7]') : (link.name === 'EXECUTIVE' ? 'text-[#D6A84B]/80' : 'text-[#626770]')}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools & Telemetry Status */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Global Search Bar (Triggers Cmd+K) */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className="flex items-center gap-3 bg-[#121418] hover:bg-[#17191E] border border-white/10 text-[#A2A6AD] hover:text-[#F5F6F7] px-3 py-1.5 rounded-lg text-xs transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-[#626770]" />
              <span className="hidden sm:inline text-[11px]">Search titles, SKUs, channels...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-data bg-[#1C1F24] text-[#626770] px-1.5 py-0.5 rounded border border-white/5">
                <Command className="w-3 h-3" /> K
              </kbd>
            </button>

            {/* Quick Add Button */}
            <button
              onClick={() => setIsQuickAddOpen(true)}
              className="flex items-center gap-1.5 bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">QUICK ADD</span>
            </button>

            {/* Automation System Status Indicator */}
            <div className="hidden xl:flex items-center gap-2 bg-[#121418] border border-white/10 px-2.5 py-1.5 rounded-lg text-[11px] font-data">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_8px_#22C55E]" />
              <span className="text-[#A2A6AD]">AUTO QUEUE:</span>
              <span className="text-[#22C55E] font-bold">ACTIVE</span>
            </div>

            {/* Notifications Button */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative bg-[#121418] hover:bg-[#17191E] border border-white/10 text-[#A2A6AD] hover:text-[#F5F6F7] p-2 rounded-lg transition-colors"
              title="Telemetry Notifications"
            >
              <Bell className="w-4 h-4 text-[#A2A6AD]" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D6A84B] shadow-[0_0_6px_#D6A84B]" />
            </button>

            {/* User & Role Pill */}
            <div className="flex items-center gap-2 bg-[#121418] border border-white/10 px-2.5 py-1.5 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-[#1C1F24] border border-[#D6A84B]/40 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-[#D6A84B]" />
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[11px] font-bold text-[#F5F6F7] leading-none">Pete Currey</span>
                <span className="text-[9px] font-data text-[#D6A84B] leading-none mt-0.5">SUPERADMIN</span>
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* Modals & Drawers */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
      <NotificationsDrawer isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <QuickAddModal isOpen={isQuickAddOpen} onClose={() => setIsQuickAddOpen(false)} />
    </>
  );
}
