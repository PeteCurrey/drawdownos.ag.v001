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
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] flex flex-col font-sans selection:bg-[#D6A84B]/30 selection:text-[#D6A84B]">
        <Header />
        <main className="flex-1 p-4 md:p-6 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
