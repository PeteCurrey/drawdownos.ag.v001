import React from 'react';
import Link from 'next/link';
import { Database, Plug, Globe, HardDrive, Settings as SettingsIcon } from 'lucide-react';

const SETTINGS_SECTIONS = [
  { title: 'General', href: '/settings/general', icon: SettingsIcon, description: 'Application preferences and defaults.' },
  { title: 'Storage', href: '/settings/storage', icon: HardDrive, description: 'Cloudflare R2 storage configuration and status.' },
  { title: 'Integrations', href: '/settings/integrations', icon: Plug, description: 'API marketplace connections and status.' },
  { title: 'Marketplaces', href: '/settings/marketplaces', icon: Globe, description: 'Marketplace registry management.' },
  { title: 'Data', href: '/settings/data', icon: Database, description: 'Import, export and database management.' },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-xl font-bold tracking-wider text-[#F5F6F7] uppercase">SETTINGS</h1>
        <p className="text-sm text-[#A2A6AD] mt-1">Configuration, storage, integrations and data management.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SETTINGS_SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="industrial-panel p-5 hover:border-white/20 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#D6A84B]/10 border border-[#D6A84B]/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#D6A84B]" />
                </div>
                <h2 className="text-sm font-bold tracking-wider text-[#F5F6F7] group-hover:text-[#D6A84B] transition-colors uppercase">{section.title}</h2>
              </div>
              <p className="text-xs text-[#626770] leading-relaxed">{section.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
