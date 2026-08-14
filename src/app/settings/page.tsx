import React from 'react';
import Link from 'next/link';
import { Database, Plug, Globe, HardDrive, Settings as SettingsIcon, ChevronRight } from 'lucide-react';

const SETTINGS_SECTIONS = [
  { title: 'Storage', href: '/settings/storage', icon: HardDrive, description: 'Cloudflare R2 storage configuration and status.' },
  { title: 'Integrations', href: '/settings/integrations', icon: Plug, description: 'API marketplace connections — Whop and Digistore24.' },
  { title: 'Marketplaces', href: '/settings/marketplaces', icon: Globe, description: 'Marketplace registry management.' },
  { title: 'Data', href: '/settings/data', icon: Database, description: 'Import, export and database management.' },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-black/8 pb-4">
        <h1 className="text-xl font-bold tracking-wider text-[#0D0F12] uppercase font-display">SETTINGS</h1>
        <p className="text-sm text-[#6B7280] mt-1">Configuration, storage, integrations and data management.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SETTINGS_SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="industrial-panel p-5 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 flex items-center justify-center group-hover:bg-[#1E3A5F]/20 transition-colors">
                  <Icon className="w-4 h-4 text-[#1E3A5F]" />
                </div>
                <h2 className="text-sm font-bold text-[#0D0F12] tracking-wide">{section.title}</h2>
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">{section.description}</p>
              <div className="flex items-center gap-1 mt-4 text-xs font-bold text-[#1E3A5F]">
                CONFIGURE <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
