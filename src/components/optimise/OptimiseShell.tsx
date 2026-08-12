'use client';

import React from 'react';
import Link from 'next/link';

interface OptimiseShellProps {
  children: React.ReactNode;
  currentPath?: string;
  /** Optional header text displayed above main content */
  header?: string;
  /** Optional subtitle below header */
  description?: string;
  /** Alias for header */
  title?: string;
  /** Alias for description */
  subtitle?: string;
}

export function OptimiseShell({
  children,
  currentPath = '/optimise',
  header,
  description,
  title,
  subtitle,
}: OptimiseShellProps) {
  const navItems = [
    { label: 'COMMAND CENTRE', href: '/optimise' },
    { label: 'EXPERIMENT QUEUE', href: '/optimise/queue' },
    { label: 'RUNNING', href: '/optimise/running' },
    { label: 'RESULTS', href: '/optimise/results' },
    { label: 'WINNERS', href: '/optimise/winners' },
    { label: 'LOSERS', href: '/optimise/losers' },
    { label: 'OPPORTUNITIES', href: '/optimise/opportunities' },
    { label: 'HYPOTHESES', href: '/optimise/new' },
    { label: 'LEARNING LIBRARY', href: '/optimise/learning' },
    { label: 'OPTIMISATION MAP', href: '/optimise/map' },
    { label: 'ROLLOUTS', href: '/optimise/rollouts' },
    { label: 'GUARDRAILS', href: '/optimise/guardrails' },
    { label: 'CONFLICTS', href: '/optimise/conflicts' },
    { label: 'CALENDAR', href: '/optimise/calendar' },
    { label: 'AI LAB / ANALYST', href: '/optimise/analyst' },
    { label: 'SETTINGS', href: '/optimise/settings' },
  ];

  const headingText = header ?? title;
  const subtitleText = description ?? subtitle;

  return (
    <div className="flex min-h-screen bg-[#0A0B0D] text-[#F5F6F7]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0A0B0D] flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse"></div>
            <span className="font-display text-xs tracking-[0.08em] text-white/60">DRAWDOWN OS</span>
          </div>
          <h1 className="font-display text-[#D6A84B] text-lg font-bold">OPTIMISATION ENGINE</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <li key={item.label}>
                  <Link href={item.href}>
                    <div className={`px-3 py-2 rounded-md font-display text-xs transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                      {item.label}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="font-display text-[10px] text-white/40 tracking-[0.08em]">
            COMPOUNDING COMMERCIAL INTELLIGENCE
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {(headingText || subtitleText) && (
          <div className="px-8 pt-8 pb-4 border-b border-white/5">
            {headingText && (
              <h2 className="font-display text-2xl font-bold text-[#F5F6F7] tracking-[0.04em] mb-1">
                {headingText}
              </h2>
            )}
            {subtitleText && (
              <p className="font-data text-sm text-[#626770]">{subtitleText}</p>
            )}
          </div>
        )}
        <div className={headingText || subtitleText ? 'p-8' : ''}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default OptimiseShell;
