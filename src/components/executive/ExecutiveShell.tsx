'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Terminal, Calendar, FileText, Target, Zap, 
  ShieldAlert, Briefcase, GitBranch, Handshake, 
  LineChart, Radio, BrainCircuit, Activity, Cpu, Settings
} from 'lucide-react';

interface ExecutiveShellProps {
  children: React.ReactNode;
  currentPath?: string;
}

const NAV_ITEMS = [
  { label: 'COMMAND CENTRE', href: '/executive', icon: Terminal },
  { label: 'TODAY', href: '/executive/today', icon: Calendar },
  { label: 'BRIEFINGS', href: '/executive/briefings', icon: FileText },
  { label: 'OBJECTIVES', href: '/executive/objectives', icon: Target },
  { label: 'OPPORTUNITIES', href: '/executive/opportunities', icon: Zap },
  { label: 'RISKS', href: '/executive/risks', icon: ShieldAlert },
  { label: 'PORTFOLIO', href: '/executive/portfolio', icon: Briefcase },
  { label: 'SCENARIOS', href: '/executive/scenarios', icon: GitBranch },
  { label: 'DECISIONS', href: '/executive/decisions', icon: Handshake },
  { label: 'FORECAST', href: '/executive/forecast', icon: LineChart },
  { label: 'INTELLIGENCE', href: '/executive/intelligence', icon: Radio },
  { label: 'AI ANALYST', href: '/executive/analyst', icon: BrainCircuit },
  { label: 'INTERVENTIONS', href: '/executive/interventions', icon: Activity },
  { label: 'AUTONOMY', href: '/executive/autonomy', icon: Cpu },
  { label: 'SETTINGS', href: '/executive/settings', icon: Settings },
];

export default function ExecutiveShell({ children }: ExecutiveShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#0A0B0D] text-[#F5F6F7]">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-52 shrink-0 border-r border-white/5 bg-[#121418]/50">
        <div className="p-5 flex flex-col gap-4 border-b border-white/5">
          <div className="flex flex-col gap-1">
            <div className="font-display text-[10px] text-[#A2A6AD] tracking-[0.2em]">DRAWDOWN OS</div>
            <div className="font-display text-xs text-[#D6A84B]">EXECUTIVE INTELLIGENCE</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full status-beacon-amber animate-pulse" />
            <div className="font-data text-[10px] text-[#A2A6AD]">HEALTH: AMBER</div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <nav className="flex flex-col gap-1 px-3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md font-display text-[10px] transition-all
                    ${isActive 
                      ? 'bg-[#1C1F24] text-[#D6A84B] border-l-2 border-[#D6A84B] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                      : 'text-[#626770] hover:text-[#F5F6F7] hover:bg-white/5 border-l-2 border-transparent'}
                  `}
                >
                  <Icon size={14} className={isActive ? 'text-[#D6A84B]' : 'opacity-70'} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/5 flex flex-col gap-3">
          <div className="font-display text-[9px] px-2 py-1 rounded bg-[#1C1F24] border border-white/10 text-center text-[#A2A6AD]">
            AUTONOMY MODE: OPERATOR
          </div>
          <div className="font-display text-[9px] px-2 py-1 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30 text-center text-[#D6A84B]">
            PENDING APPROVALS: 3
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
