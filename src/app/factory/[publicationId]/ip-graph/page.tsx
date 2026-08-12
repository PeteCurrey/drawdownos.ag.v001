'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  GitBranch, ChevronRight, BookOpen, Layers, ShieldCheck,
  Search, ArrowRight, HelpCircle, FileText
} from 'lucide-react';
import { IP_GRAPH, HOW_TO_TRADE, PRODUCT_OPPORTUNITIES, CONTENT_ELEMENTS } from '@/lib/factory/demo-factory-data';

export default function IPGraphVisualizer({
  params,
}: {
  params: Promise<{ publicationId: string }>;
}) {
  const { publicationId } = use(params);
  const pub = HOW_TO_TRADE;
  const rootNode = IP_GRAPH.nodes[0];
  const [selectedElementId, setSelectedElementId] = useState<string>('ce-009');

  const selectedElement = CONTENT_ELEMENTS.find(e => e.id === selectedElementId) || CONTENT_ELEMENTS[0];

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F6F7] p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-data text-[10px] text-[#626770]">
              <Link href="/factory" className="hover:text-[#A2A6AD] transition-colors">PRODUCT FACTORY</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/factory/${publicationId}`} className="hover:text-[#A2A6AD] transition-colors">{pub.canonicalId}</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D6A84B]">IP GRAPH</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/30 flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-[#D6A84B]" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-wider text-[#F5F6F7]">IP GRAPH & PROVENANCE ENGINE</h1>
            </div>
          </div>
          <Link href={`/factory/${publicationId}`} className="font-display text-[10px] text-[#A2A6AD] hover:text-[#F5F6F7] bg-[#121418] border border-white/10 px-3 py-2 rounded-lg transition-colors">
            RETURN TO COMMAND CENTRE
          </Link>
        </div>

        {/* Top metrics */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'TOTAL NODES', value: IP_GRAPH.totalNodes, color: '#D6A84B' },
            { label: 'TOTAL EDGES', value: IP_GRAPH.totalEdges, color: '#38BDF8' },
            { label: 'PROVENANCE VERIFIED', value: '100%', color: '#22C55E' },
            { label: 'GRAPH GENERATED', value: IP_GRAPH.generatedAt.substring(0, 10), color: '#818CF8' },
          ].map(s => (
            <div key={s.label} className="bg-[#0E1014] border border-white/8 rounded-xl p-3 space-y-1">
              <div className="font-data text-[9px] text-[#626770] tracking-wider">{s.label}</div>
              <div className="font-data text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Visualizer split */}
        <div className="grid grid-cols-12 gap-6">

          {/* Left panel: Tree visualizer */}
          <div className="col-span-7 bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden p-4 space-y-4">
            <div className="font-display text-xs tracking-wider text-[#626770] flex items-center justify-between pb-2 border-b border-white/5">
              <span>HIERARCHICAL IP DERIVATION GRAPH</span>
              <span className="font-data text-[9px] text-[#D6A84B]">ROOT: {rootNode.label}</span>
            </div>

            <div className="space-y-3 font-data text-xs">
              {/* Root */}
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#1C1F24] border border-[#D6A84B]/40">
                <BookOpen className="w-4 h-4 text-[#D6A84B]" />
                <div className="flex-1">
                  <div className="font-display text-xs font-bold text-[#F5F6F7]">{rootNode.label}</div>
                  <div className="text-[9px] text-[#626770]">{pub.canonicalId} · CANONICAL MASTER</div>
                </div>
                <span className="text-[9px] text-[#22C55E] font-bold">100% COVERAGE</span>
              </div>

              {/* Children Nodes */}
              <div className="pl-6 space-y-2 border-l border-white/10 ml-4">
                {rootNode.children?.map(child => (
                  <div key={child.id} className="p-3 rounded-lg bg-[#121418] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: child.nodeType === 'DERIVATIVE' ? '#818CF8' : child.nodeType === 'BUNDLE' ? '#22C55E' : '#38BDF8' }} />
                        <span className="font-display text-xs text-[#F5F6F7] font-bold">{child.label}</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded border border-white/10 text-[#A2A6AD]">{child.nodeType}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[9px]">
                      <div>
                        <span className="text-[#626770]">Standalone: </span>
                        <span className="text-[#818CF8] font-bold">{child.standalonePotential}/100</span>
                      </div>
                      <div>
                        <span className="text-[#626770]">Commercial: </span>
                        <span className="text-[#22C55E] font-bold">{child.commercialPotential}/100</span>
                      </div>
                      {child.rsaUnlockPts && (
                        <div>
                          <span className="text-[#626770]">RSA Unlock: </span>
                          <span className="text-[#D6A84B] font-bold">+{child.rsaUnlockPts} pts</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: Provenance Inspector */}
          <div className="col-span-5 space-y-4">
            <div className="bg-[#0E1014] border border-[#D6A84B]/30 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#D6A84B]" />
                <span className="font-display text-xs tracking-wider text-[#D6A84B]">PROVENANCE TRACER</span>
              </div>
              
              <div className="space-y-1">
                <label className="font-data text-[10px] text-[#626770]">SELECT ELEMENT OR PRODUCT TO TRACE ORIGIN:</label>
                <select
                  value={selectedElementId}
                  onChange={e => setSelectedElementId(e.target.value)}
                  className="w-full bg-[#121418] border border-white/10 rounded-lg p-2.5 font-data text-xs text-[#F5F6F7] focus:outline-none focus:border-[#D6A84B]"
                >
                  {CONTENT_ELEMENTS.map(el => (
                    <option key={el.id} value={el.id}>
                      Ch.{el.chapterNum}: {el.chapterTitle} ({el.elementType})
                    </option>
                  ))}
                </select>
              </div>

              {/* Provenance Record Card */}
              <div className="bg-[#121418] border border-white/8 rounded-xl p-4 space-y-3 font-data text-xs">
                <div className="font-display text-xs font-bold text-[#F5F6F7] pb-2 border-b border-white/5 flex items-center justify-between">
                  <span>PROVENANCE RECORD</span>
                  <span className="text-[9px] text-[#22C55E]">VERIFIED</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#626770]">Source Publication:</span>
                    <span className="text-[#D6A84B] font-bold">{pub.title} ({pub.canonicalId})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#626770]">Chapter / Section:</span>
                    <span className="text-[#F5F6F7]">Ch.{selectedElement.chapterNum} — {selectedElement.chapterTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#626770]">Page Range:</span>
                    <span className="text-[#F5F6F7]">Pages {selectedElement.pageStart} to {selectedElement.pageEnd || selectedElement.pageStart}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#626770]">Content Fidelity:</span>
                    <span className="text-[#22C55E] font-bold">{selectedElement.contentFidelity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#626770]">Word Count:</span>
                    <span className="text-[#A2A6AD]">{selectedElement.wordCount} words</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <div className="text-[9px] text-[#626770] mb-1">PROVENANCE SUMMARY LINE</div>
                  <div className="text-[10px] text-[#D6A84B] bg-[#0A0B0D] p-2 rounded border border-white/5">
                    {pub.canonicalId} › Chapter {selectedElement.chapterNum} &ldquo;{selectedElement.chapterTitle}&rdquo; (p.{selectedElement.pageStart}) [{selectedElement.contentFidelity}]
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Graph Edges Table */}
        <div className="bg-[#0E1014] border border-white/8 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/8 font-display text-xs tracking-wider text-[#626770]">
            ALL GRAPH EDGES & RELATIONSHIPS
          </div>
          <div className="divide-y divide-white/5">
            {IP_GRAPH.edges.map((edge, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between font-data text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-[#D6A84B] font-bold">{edge.sourceNodeId}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#626770]" />
                  <span className="text-[#F5F6F7]">{edge.targetNodeId}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] px-2 py-0.5 rounded border border-white/10 text-[#818CF8]">{edge.relationshipType}</span>
                  <span className="text-[#626770]">Weight: <strong className="text-[#F5F6F7]">{edge.weight}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
