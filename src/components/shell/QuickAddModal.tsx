'use client';

import React, { useState } from 'react';
import { X, Plus, BookOpen, FileUp, ShieldCheck, Check } from 'lucide-react';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickAddModal({ isOpen, onClose }: QuickAddModalProps) {
  const [activeTab, setActiveTab] = useState<'NEW_PUB' | 'MANUAL_PACK' | 'COMPLIANCE'>('NEW_PUB');
  const [title, setTitle] = useState('');
  const [canonicalId, setCanonicalId] = useState('DD-NEW-004');
  const [category, setCategory] = useState('Trading Education');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#121418] border border-white/15 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-[#17191E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#D6A84B]" />
            <h3 className="font-display text-xs text-[#F5F6F7] tracking-wider">QUICK ACTION DISPATCHER</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded text-[#626770] hover:text-[#F5F6F7] hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/10 bg-[#0D0E11] p-1 gap-1">
          <button
            onClick={() => setActiveTab('NEW_PUB')}
            className={`flex-1 py-2 text-[11px] font-display rounded-lg transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'NEW_PUB' ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30' : 'text-[#A2A6AD] hover:text-[#F5F6F7]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> NEW PUBLICATION
          </button>
          <button
            onClick={() => setActiveTab('MANUAL_PACK')}
            className={`flex-1 py-2 text-[11px] font-display rounded-lg transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'MANUAL_PACK' ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30' : 'text-[#A2A6AD] hover:text-[#F5F6F7]'
            }`}
          >
            <FileUp className="w-3.5 h-3.5" /> SUBMISSION PACK
          </button>
          <button
            onClick={() => setActiveTab('COMPLIANCE')}
            className={`flex-1 py-2 text-[11px] font-display rounded-lg transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'COMPLIANCE' ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30' : 'text-[#A2A6AD] hover:text-[#F5F6F7]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> ADD EVIDENCE
          </button>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center border border-[#22C55E]/40">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-display text-sm text-[#F5F6F7]">ACTION DISPATCHED SUCCESSFULLY</h4>
            <p className="text-xs text-[#A2A6AD] font-data">Record registered in Supabase system of record and audit log.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            
            {activeTab === 'NEW_PUB' && (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-display text-[#A2A6AD] tracking-wider">CANONICAL IDENTIFIER</label>
                  <input
                    type="text"
                    value={canonicalId}
                    onChange={(e) => setCanonicalId(e.target.value)}
                    className="w-full bg-[#0D0E11] border border-white/10 rounded-lg px-3 py-2 text-xs font-data text-[#D6A84B] focus:outline-none focus:border-[#D6A84B]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-display text-[#A2A6AD] tracking-wider">PUBLICATION TITLE</label>
                  <input
                    type="text"
                    placeholder="e.g. INSTITUTIONAL LIQUIDITY HANDBOOK"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#0D0E11] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#F5F6F7] placeholder-[#626770] focus:outline-none focus:border-[#D6A84B]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-display text-[#A2A6AD] tracking-wider">PRIMARY CATEGORY</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0D0E11] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]"
                  >
                    <option value="Trading Education">Trading Education</option>
                    <option value="Market Structure">Market Structure</option>
                    <option value="Financial Risk">Financial Risk</option>
                    <option value="Psychology & Discipline">Psychology & Discipline</option>
                  </select>
                </div>
              </>
            )}

            {activeTab === 'MANUAL_PACK' && (
              <div className="space-y-3 text-xs text-[#A2A6AD]">
                <p>Generate a 1-click manual submission package for channels without full API capabilities (e.g. Etsy, Payhip, direct portal uploads).</p>
                <div className="p-3 bg-[#0D0E11] rounded-lg border border-white/5 font-data text-[11px] text-[#F5F6F7]">
                  Selected Title: HOW TO TRADE (DD-HTT-001)
                </div>
              </div>
            )}

            {activeTab === 'COMPLIANCE' && (
              <div className="space-y-3">
                <label className="text-[10px] font-display text-[#A2A6AD] tracking-wider">CLAIM REFERENCE / AUDIT PROOF URL</label>
                <input
                  type="url"
                  placeholder="https://audit.drawdown.os/proof/statement-2026.pdf"
                  className="w-full bg-[#0D0E11] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#F5F6F7] placeholder-[#626770] focus:outline-none focus:border-[#D6A84B]"
                  required
                />
              </div>
            )}

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-[#17191E] hover:bg-[#1C1F24] text-xs text-[#A2A6AD] font-display"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display font-bold text-xs shadow-md"
              >
                DISPATCH ACTION
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
