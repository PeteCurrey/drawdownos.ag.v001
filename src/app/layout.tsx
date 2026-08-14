import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/shell/Header';

export const metadata: Metadata = {
  title: 'DRAWDOWN OS - Publishing, Distribution & Revenue Operating System',
  description: 'Central operating system for Drawdown publishing business: ingest, package, compliance, pricing, channels, distribution, and revenue reconciliation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen bg-[#F4F5F7] text-[#0D0F12] flex flex-col font-sans selection:bg-[#1E3A5F]/20 selection:text-[#1E3A5F]">
        <Header />
        <main className="flex-1 p-4 md:p-6 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
