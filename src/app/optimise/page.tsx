'use client';
import React from 'react';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
import { ExperimentCard } from '@/components/optimise/ExperimentCard';

export default function OptimisationPage() {
  const runningExperiments: any[] = [];
  const candidateExperiments: any[] = [];
  
  return (
    <OptimiseShell currentPath="/optimise">
      <div className="p-8 max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <header>
          <h1 className="font-display text-3xl font-bold text-white tracking-wider uppercase">OPTIMISATION COMMAND</h1>
          <p className="text-white/50 mt-2 font-display text-xs tracking-widest uppercase">Turn assumptions into evidence.</p>
        </header>

        {/* Telemetry Grid */}
        <section>
          <div className="industrial-panel bg-[#0A0B0D] border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <div className="text-[#38BDF8] font-display text-sm tracking-widest mb-2">NO TELEMETRY DATA</div>
            <p className="text-white/60 text-sm font-data max-w-lg">
              Live experiment telemetry requires an active connection to your analytics or experiment engine. Connect a data source to view real-time performance.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Candidates */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="font-display text-sm tracking-widest text-[#D6A84B]">WHAT SHOULD WE TEST NEXT?</h2>
            </div>
            <div className="space-y-4">
              {candidateExperiments.length > 0 ? candidateExperiments.map(exp => (
                <ExperimentCard key={exp.id} experiment={exp} />
              )) : (
                <div className="industrial-panel bg-[#0A0B0D] border border-white/10 p-6 rounded-lg text-center">
                  <div className="text-[#D6A84B] font-display text-xs mb-1">NO EXPERIMENTS FOUND</div>
                  <div className="text-white/50 text-sm font-data">Connect your testing platform to sync candidate experiments.</div>
                </div>
              )}
            </div>
          </section>

          {/* Live Running */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="font-display text-sm tracking-widest text-[#38BDF8]">LIVE RUNNING EXPERIMENTS</h2>
            </div>
            <div className="space-y-4">
              {runningExperiments.length > 0 ? runningExperiments.map(exp => (
                <ExperimentCard key={exp.id} experiment={exp} />
              )) : (
                <div className="industrial-panel bg-[#0A0B0D] border border-white/10 p-6 rounded-lg text-center">
                  <div className="text-[#38BDF8] font-display text-xs mb-1">NO RUNNING EXPERIMENTS</div>
                  <div className="text-white/50 text-sm font-data">Deploy an experiment to view live monitoring.</div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Winners & Learnings */}
        <section className="space-y-4 pt-4 border-t border-white/10">
           <h2 className="font-display text-sm tracking-widest text-white/80">RECENT WINNERS & LEARNINGS</h2>
           <div className="industrial-panel bg-[#0A0B0D] border border-white/10 p-8 rounded-lg flex flex-col items-center justify-center text-center">
             <div className="text-[#22C55E] font-display text-xs tracking-widest mb-2">NO VALIDATED LEARNINGS</div>
             <p className="text-white/60 text-sm font-data max-w-lg">
               Drawdown OS requires verified experimental outcomes to display winners and learnings. Connect your testing platform to start building institutional memory.
             </p>
           </div>
        </section>

      </div>
    </OptimiseShell>
  );
}
