'use client';

import React from 'react';
import { Briefcase, Clock, CheckCircle2, AlertTriangle, ShieldCheck, User } from 'lucide-react';

export default function OperationsPage() {
  const tasks = [
    { id: 'TASK-101', title: 'Review Spanish EPUB layout formatting for DD-HTT-001', module: 'FORMAT_FACTORY', priority: 'HIGH', status: 'IN_PROGRESS', assignee: 'Pete Currey' },
    { id: 'TASK-102', title: 'Approve FTC affiliate disclaimer copy for Hotmart rollout', module: 'COMPLIANCE', priority: 'MEDIUM', status: 'PENDING', assignee: 'Pete Currey' },
    { id: 'TASK-103', title: 'Reconcile Etsy July payout settlement against Stripe', module: 'FINANCE', priority: 'LOW', status: 'COMPLETED', assignee: 'Pete Currey' },
  ];

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl text-[#F5F6F7] font-bold tracking-wider">OPERATIONS QUEUE & TASK CENTER</h1>
            <span className="text-[10px] font-data text-[#D6A84B] px-2 py-0.5 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30">
              DISPATCHER ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#A2A6AD] font-data mt-1">
            Manual review queue, formatting approvals, compliance waivers, and task assignments
          </p>
        </div>
      </div>

      <div className="industrial-panel p-5 space-y-4">
        <h3 className="font-display text-xs text-[#626770] tracking-wider uppercase">
          OPERATIONAL DISPATCHER QUEUE
        </h3>

        <div className="space-y-3 font-data text-xs">
          {tasks.map(t => (
            <div key={t.id} className="industrial-panel-inset p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#D6A84B]">{t.id}</span>
                  <span className="text-[10px] text-[#626770] px-1.5 py-0.2 rounded bg-white/5">{t.module}</span>
                </div>
                <div className="text-sm font-bold text-[#F5F6F7] mt-1">{t.title}</div>
                <div className="text-[10px] text-[#A2A6AD] mt-1">Assigned to: {t.assignee}</div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-display px-2 py-0.5 rounded ${
                  t.priority === 'HIGH' ? 'bg-[#FF6A18]/10 text-[#FF6A18] border border-[#FF6A18]/30' : 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30'
                }`}>
                  {t.priority}
                </span>
                <span className="text-[10px] font-display px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
