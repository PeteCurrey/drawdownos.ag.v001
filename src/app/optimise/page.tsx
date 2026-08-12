'use client';
import React from 'react';
import { OptimiseShell } from '@/components/optimise/OptimiseShell';
import { ExperimentCard } from '@/components/optimise/ExperimentCard';
import { DEMO_OPTIMISATION_STATS, DEMO_EXPERIMENTS, DEMO_OPTIMISATION_OPPORTUNITIES, DEMO_LEARNINGS } from '@/lib/optimise/demo-optimise-data';

export default function OptimisationPage() {
  const runningExperiments = DEMO_EXPERIMENTS.filter(e => e.state === 'RUNNING');
  const candidateExperiments = DEMO_EXPERIMENTS.filter(e => e.state === 'READY' || e.state === 'APPROVAL_REQUIRED').slice(0, 2);
  
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Running', value: '2' },
              { label: 'Awaiting Approval', value: '3' },
              { label: 'Completed MTD', value: '8' },
              { label: 'Winners', value: '5', color: 'text-[#22C55E]' },
              { label: 'Losers', value: '2', color: 'text-[#EF4444]' },
              { label: 'Inconclusive', value: '1', color: 'text-white/60' },
              { label: 'Guardrail Stopped', value: '1', color: 'text-[#EF4444]' },
              { label: 'Incremental Revenue', value: '+£12,400', color: 'text-[#22C55E]' },
              { label: 'Incremental Contribution', value: '+£8,620', color: 'text-[#22C55E]' },
              { label: 'Losses Prevented', value: '£1,450', color: 'text-[#D6A84B]' },
              { label: 'Avg Experiment ROI', value: '4.8x' },
              { label: 'Avg Days to Decision', value: '18.5d' },
              { label: 'Experiments/Mo', value: '12' },
              { label: 'Revenue Under Test', value: '28.4%' },
              { label: 'Learning Confidence', value: 'STRONG', color: 'text-[#D6A84B]' }
            ].map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-[#17191E] to-[#121418] border border-white/5 rounded-lg p-4">
                <div className="font-display text-[9px] text-white/40 uppercase mb-2">{stat.label}</div>
                <div className={`font-data text-lg ${stat.color || 'text-white'}`}>{stat.value}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Candidates */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="font-display text-sm tracking-widest text-[#D6A84B]">WHAT SHOULD WE TEST NEXT?</h2>
            </div>
            <div className="space-y-4">
              {candidateExperiments.map(exp => (
                <ExperimentCard key={exp.id} experiment={exp} />
              ))}
            </div>
          </section>

          {/* Live Running */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="font-display text-sm tracking-widest text-[#38BDF8]">LIVE RUNNING EXPERIMENTS</h2>
            </div>
            <div className="space-y-4">
              {runningExperiments.map(exp => (
                <ExperimentCard key={exp.id} experiment={exp} />
              ))}
            </div>
          </section>
        </div>

        {/* Winners & Learnings */}
        <section className="space-y-4 pt-4 border-t border-white/10">
           <h2 className="font-display text-sm tracking-widest text-white/80">RECENT WINNERS & LEARNINGS</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-[#17191E] border border-[#22C55E]/30 rounded-lg p-5 border-l-4 border-l-[#22C55E]">
                <div className="text-[10px] font-display text-[#22C55E] mb-2">TOP WINNER (exp-001)</div>
                <h3 className="text-white font-medium mb-1">Pricing Elasticity Test - Tier 2</h3>
                <p className="text-sm text-white/60 mb-3">Decreasing price by 5% increased conversion volume significantly to offset margin hit.</p>
                <div className="font-data text-[#22C55E]">+£8,200 ARR Impact</div>
             </div>
             <div className="bg-[#17191E] border border-[#D6A84B]/30 rounded-lg p-5 border-l-4 border-l-[#D6A84B]">
                <div className="text-[10px] font-display text-[#D6A84B] mb-2">KEY LEARNING (lrn-001)</div>
                <h3 className="text-white font-medium mb-1">Friction in Onboarding</h3>
                <p className="text-sm text-white/60">Adding a required phone number field decreased signup completion by 22% overall.</p>
                <div className="font-display text-xs text-white/40 mt-3">ACTION: Removed field.</div>
             </div>
           </div>
        </section>

      </div>
    </OptimiseShell>
  );
}
