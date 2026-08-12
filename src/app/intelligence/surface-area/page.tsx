'use client';

import React, { useState, useMemo } from 'react';
import {
  Globe,
  TrendingUp,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Filter,
  BarChart2,
  Layers,
  Radio,
  DollarSign,
  MapPin,
  FileText,
  ShieldAlert,
  Play,
  ExternalLink,
} from 'lucide-react';
import {
  SURFACE_CHANNELS,
  SURFACE_AREA_METRICS,
  PUBLICATION_SURFACE_PROFILES,
  OPPORTUNITY_ACTIONS,
  PORTFOLIO_SURFACE_SUMMARY,
  type SurfaceChannel,
  type ChannelStatus,
  type OpportunityAction,
  type FormatType,
  type RegionCode,
} from '@/lib/surface-area-data';

// ─── UTILITY HELPERS ─────────────────────────────────────
function fmt(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${n}`;
}

function scoreColor(score: number) {
  if (score >= 80) return 'text-[#22C55E]';
  if (score >= 60) return 'text-[#D6A84B]';
  if (score >= 40) return 'text-[#FF6A18]';
  return 'text-[#EF4444]';
}

function scoreBg(score: number) {
  if (score >= 80) return 'bg-[#22C55E]/10 border-[#22C55E]/30';
  if (score >= 60) return 'bg-[#D6A84B]/10 border-[#D6A84B]/30';
  if (score >= 40) return 'bg-[#FF6A18]/10 border-[#FF6A18]/30';
  return 'bg-[#EF4444]/10 border-[#EF4444]/30';
}

const STATUS_CONFIG: Record<ChannelStatus, { label: string; color: string; dot: string }> = {
  LIVE:          { label: 'LIVE',         color: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30',   dot: 'bg-[#22C55E]' },
  ONBOARDING:    { label: 'ONBOARDING',   color: 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/30',   dot: 'bg-[#38BDF8]' },
  APPROVED:      { label: 'APPROVED',     color: 'text-[#D6A84B] bg-[#D6A84B]/10 border-[#D6A84B]/30',   dot: 'bg-[#D6A84B]' },
  ELIGIBLE:      { label: 'ELIGIBLE',     color: 'text-[#A2A6AD] bg-white/5 border-white/10',             dot: 'bg-[#A2A6AD]' },
  BLOCKED:       { label: 'BLOCKED',      color: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/30',   dot: 'bg-[#EF4444]' },
  NOT_ELIGIBLE:  { label: 'NOT ELIGIBLE', color: 'text-[#626770] bg-white/5 border-white/5',              dot: 'bg-[#626770]' },
  UNEXPLORED:    { label: 'UNEXPLORED',   color: 'text-[#626770] bg-white/5 border-white/5',              dot: 'bg-[#626770]' },
};

const PRIORITY_CONFIG: Record<string, string> = {
  CRITICAL: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/30',
  HIGH:     'text-[#FF6A18] bg-[#FF6A18]/10 border-[#FF6A18]/30',
  MEDIUM:   'text-[#D6A84B] bg-[#D6A84B]/10 border-[#D6A84B]/30',
  LOW:      'text-[#A2A6AD] bg-white/5 border-white/10',
};

const TYPE_COLORS: Record<string, string> = {
  LAUNCH:             'text-[#22C55E]',
  EXPAND_FORMAT:      'text-[#38BDF8]',
  EXPAND_REGION:      'text-[#D6A84B]',
  AFFILIATE_ACTIVATE: 'text-[#FF6A18]',
  PRICE_OPTIMISE:     'text-[#A78BFA]',
  COMPLIANCE_CLEAR:   'text-[#EF4444]',
};

const TYPE_LABELS: Record<string, string> = {
  LAUNCH:             'LAUNCH',
  EXPAND_FORMAT:      'FORMAT',
  EXPAND_REGION:      'REGION',
  AFFILIATE_ACTIVATE: 'AFFILIATE',
  PRICE_OPTIMISE:     'PRICING',
  COMPLIANCE_CLEAR:   'COMPLIANCE',
};

const FORMAT_LABELS: Record<FormatType, string> = {
  PDF: 'PDF', EPUB: 'EPUB', KINDLE: 'Kindle', AUDIO: 'Audio',
  PRINT: 'Print', COURSE: 'Course', WORKBOOK: 'Workbook',
};

const REGION_LABELS: Record<RegionCode, string> = {
  GB: '🇬🇧 UK', US: '🇺🇸 US', CA: '🇨🇦 CA', AU: '🇦🇺 AU', NZ: '🇳🇿 NZ',
  DE: '🇩🇪 DE', FR: '🇫🇷 FR', ES: '🇪🇸 ES', IT: '🇮🇹 IT', PL: '🇵🇱 PL',
  NL: '🇳🇱 NL', SE: '🇸🇪 SE', NO: '🇳🇴 NO', DK: '🇩🇰 DK',
  BR: '🇧🇷 BR', MX: '🇲🇽 MX', LATAM: '🌎 LATAM',
  IN: '🇮🇳 IN', SEA: '🌏 SEA', ME: '🕌 ME', AF: '🌍 AF', GLOBAL: '🌐 GLOBAL',
};

// ─── SUB-COMPONENTS ──────────────────────────────────────

function SurfaceScoreDial({ score, size = 96 }: { score: number; size?: number }) {
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? '#22C55E' : score >= 45 ? '#D6A84B' : score >= 25 ? '#FF6A18' : '#EF4444';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={6}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-data text-xl font-bold" style={{ color }}>{score}</span>
        <span className="font-display text-[8px] text-[#626770] tracking-wider">SCORE</span>
      </div>
    </div>
  );
}

function CaptureBar({ pct, live, potential }: { pct: number; live: number; potential: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-data text-[#A2A6AD]">
        <span className="text-[#22C55E] font-bold">{fmt(live)}/mo captured</span>
        <span className="text-[#626770]">{fmt(potential)}/mo potential</span>
      </div>
      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#22C55E] to-[#D6A84B]"
          style={{ width: `${Math.min(pct, 100)}%`, boxShadow: '0 0 8px rgba(34,197,94,0.4)', transition: 'width 0.8s ease' }}
        />
      </div>
      <div className="text-[10px] font-data text-right">
        <span className="text-[#D6A84B] font-bold">{pct.toFixed(1)}%</span>
        <span className="text-[#626770] ml-1">revenue surface captured</span>
      </div>
    </div>
  );
}

function ChannelRow({ channel, status }: { channel: SurfaceChannel; status?: ChannelStatus }) {
  const effectiveStatus = status ?? channel.status;
  const cfg = STATUS_CONFIG[effectiveStatus];
  return (
    <div className="flex items-center gap-3 p-3 bg-[#0D0E11] rounded-lg border border-white/5 hover:border-white/10 transition-all group">
      <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#F5F6F7] truncate">{channel.name}</span>
          <span className="text-[9px] font-display text-[#626770] shrink-0">{channel.type}</span>
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-[10px] font-data text-[#626770]">
            {channel.formatsSupported.slice(0, 3).join(' · ')}
          </span>
          <span className="text-[10px] font-data text-[#626770]">
            {channel.regions.slice(0, 2).join(' · ')}{channel.regions.length > 2 ? ` +${channel.regions.length - 2}` : ''}
          </span>
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-[10px] font-data text-[#22C55E] font-bold">
          {fmt(channel.estimatedMonthlyRevenue[0])}–{fmt(channel.estimatedMonthlyRevenue[1])}
        </div>
        <div className="text-[9px] font-data text-[#626770]">est/mo</div>
      </div>
      <div className="text-right shrink-0 w-[70px]">
        <span className={`text-[9px] font-display px-2 py-0.5 rounded border ${cfg.color}`}>
          {cfg.label}
        </span>
      </div>
      <div className="text-right shrink-0 w-[28px]">
        <span className={`font-data text-sm font-bold ${scoreColor(channel.opportunityScore)}`}>
          {channel.opportunityScore}
        </span>
      </div>
      <a
        href={channel.url}
        target="_blank"
        rel="noreferrer"
        className="opacity-0 group-hover:opacity-100 transition-opacity text-[#38BDF8]"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

function OpportunityCard({ action, onActivate }: { action: OpportunityAction; onActivate: () => void }) {
  return (
    <div className={`industrial-panel p-4 space-y-3 border-l-2 ${
      action.priority === 'CRITICAL' ? 'border-l-[#EF4444]' :
      action.priority === 'HIGH' ? 'border-l-[#FF6A18]' :
      action.priority === 'MEDIUM' ? 'border-l-[#D6A84B]' : 'border-l-white/10'
    }`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[9px] font-display px-1.5 py-0.5 rounded border ${PRIORITY_CONFIG[action.priority]}`}>
              {action.priority}
            </span>
            <span className={`text-[9px] font-display ${TYPE_COLORS[action.type]}`}>
              {TYPE_LABELS[action.type]}
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#F5F6F7] mt-1 leading-snug">{action.channelName}</h4>
        </div>
        <div className="text-right shrink-0">
          <div className="text-lg font-data font-bold text-[#22C55E]">+{fmt(action.estimatedMonthlyUplift)}</div>
          <div className="text-[9px] font-data text-[#626770]">est/mo uplift</div>
        </div>
      </div>

      <p className="text-[11px] text-[#A2A6AD] leading-relaxed">{action.description}</p>

      {action.blockers && action.blockers.length > 0 && (
        <div className="flex items-start gap-2 p-2 bg-[#EF4444]/5 border border-[#EF4444]/20 rounded-lg">
          <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444] shrink-0 mt-0.5" />
          <span className="text-[10px] text-[#EF4444]">{action.blockers[0]}</span>
        </div>
      )}

      <div className="p-2.5 bg-[#0D0E11] rounded-lg border border-white/5">
        <div className="text-[9px] font-display text-[#626770] mb-1">NEXT STEP</div>
        <p className="text-[11px] text-[#F5F6F7] leading-relaxed">{action.nextStep}</p>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1 text-[10px] font-data text-[#626770]">
          <Clock className="w-3 h-3" />
          <span>{action.estimatedEffortDays}d effort</span>
        </div>
        <button
          onClick={onActivate}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D6A84B] hover:bg-[#e2b558] text-[#0A0B0D] font-display text-[10px] font-bold shadow-md transition-colors"
        >
          <Play className="w-3 h-3 stroke-[3]" /> ACTIVATE
        </button>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────
type Tab = 'overview' | 'channels' | 'opportunities' | 'formats' | 'regions';

export default function SurfaceAreaPage() {
  const [selectedPubId, setSelectedPubId] = useState('pub-001-dd-htt-001');
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [channelFilter, setChannelFilter] = useState<string>('ALL');
  const [activatedId, setActivatedId] = useState<string | null>(null);

  const selectedMetrics = SURFACE_AREA_METRICS.find(m => m.publicationId === selectedPubId)!;
  const selectedProfile = PUBLICATION_SURFACE_PROFILES.find(p => p.publicationId === selectedPubId)!;
  const pubActions = OPPORTUNITY_ACTIONS.filter(a => a.publicationId === selectedPubId);
  const S = PORTFOLIO_SURFACE_SUMMARY;

  const totalUplift = pubActions.reduce((sum, a) => sum + a.estimatedMonthlyUplift, 0);

  // Channels annotated with per-publication status
  const annotatedChannels = useMemo(() => {
    return SURFACE_CHANNELS.map(ch => ({
      ...ch,
      pubStatus: (selectedProfile?.channelStatuses[ch.id] ?? 'UNEXPLORED') as ChannelStatus,
      complianceCleared: selectedProfile?.channelCompliance[ch.id] ?? null,
      monthlyRevenue: selectedProfile?.channelRevenue[ch.id] ?? null,
    }));
  }, [selectedProfile]);

  const filteredChannels = useMemo(() => {
    if (channelFilter === 'ALL') return annotatedChannels;
    return annotatedChannels.filter(ch => ch.pubStatus === channelFilter);
  }, [annotatedChannels, channelFilter]);

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview',       label: 'OVERVIEW',       icon: Globe },
    { id: 'channels',       label: 'CHANNEL MAP',    icon: Layers },
    { id: 'opportunities',  label: 'OPPORTUNITIES',  icon: Target },
    { id: 'formats',        label: 'FORMAT MATRIX',  icon: FileText },
    { id: 'regions',        label: 'REGION MAP',     icon: MapPin },
  ];

  return (
    <div className="space-y-6 pb-20">

      {/* ── PAGE HEADER ─────────────────────────────── */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#17191E] via-[#121418] to-[#0D0E11] border border-white/10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-display text-2xl text-[#F5F6F7] font-bold tracking-wider">REVENUE SURFACE AREA</h1>
              <span className="text-[10px] font-data px-2 py-0.5 rounded bg-[#D6A84B]/15 text-[#D6A84B] border border-[#D6A84B]/30">
                INTELLIGENCE ENGINE
              </span>
              <span className="text-[10px] font-data px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                LIVE ANALYSIS
              </span>
            </div>
            <p className="text-sm text-[#A2A6AD] font-data mt-1.5 max-w-2xl leading-relaxed">
              How much of the commercially viable global market for each Drawdown product are we currently exposing ourselves to — and what should we do next to increase that exposure?
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[9px] font-display text-[#626770]">PORTFOLIO SURFACE SCORE</div>
              <div className="text-3xl font-data font-bold text-[#D6A84B]">{S.portfolioSurfaceScore}<span className="text-sm text-[#626770]">/100</span></div>
              <div className="text-[9px] font-data text-[#22C55E]">▲ +{S.surfaceScoreChangeWoW.toFixed(1)} WoW</div>
            </div>
          </div>
        </div>

        {/* Portfolio Stat Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5 pt-4 border-t border-white/10">
          <div className="text-center p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="font-data text-xl font-bold text-[#22C55E]">{fmt(S.portfolioMonthlyRevenueLive)}</div>
            <div className="font-display text-[9px] text-[#626770] mt-0.5">LIVE MONTHLY</div>
          </div>
          <div className="text-center p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="font-data text-xl font-bold text-[#A2A6AD]">{fmt(S.portfolioMonthlyRevenuePotential)}</div>
            <div className="font-display text-[9px] text-[#626770] mt-0.5">TOTAL POTENTIAL</div>
          </div>
          <div className="text-center p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="font-data text-xl font-bold text-[#D6A84B]">{S.portfolioCapturedPercent.toFixed(1)}%</div>
            <div className="font-display text-[9px] text-[#626770] mt-0.5">SURFACE CAPTURED</div>
          </div>
          <div className="text-center p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="font-data text-xl font-bold text-[#FF6A18]">{S.totalEligibleUnexplored}</div>
            <div className="font-display text-[9px] text-[#626770] mt-0.5">ELIGIBLE UNEXPLORED</div>
          </div>
          <div className="text-center p-3 bg-[#0D0E11] rounded-xl border border-white/5">
            <div className="font-data text-xl font-bold text-[#22C55E]">+{fmt(S.topUnexploredUplift)}</div>
            <div className="font-display text-[9px] text-[#626770] mt-0.5">TOP OPPORTUNITY/MO</div>
          </div>
        </div>
      </div>

      {/* ── PUBLICATION SELECTOR ────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-display text-[#626770] tracking-wider">ANALYSE PUBLICATION:</span>
        {PUBLICATION_SURFACE_PROFILES.map(pub => {
          const m = SURFACE_AREA_METRICS.find(x => x.publicationId === pub.publicationId)!;
          const isSelected = pub.publicationId === selectedPubId;
          return (
            <button
              key={pub.publicationId}
              onClick={() => setSelectedPubId(pub.publicationId)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display transition-all border ${
                isSelected
                  ? 'bg-[#1C1F24] border-[#D6A84B]/40 text-[#D6A84B] shadow-md'
                  : 'bg-[#121418] border-white/10 text-[#A2A6AD] hover:border-white/20 hover:text-[#F5F6F7]'
              }`}
            >
              <span className="font-bold">{pub.canonicalId}</span>
              <span className="hidden sm:inline text-[10px] opacity-70 truncate max-w-[140px]">{pub.title}</span>
              <span className={`font-data font-bold ${scoreColor(m.surfaceAreaScore)}`}>{m.surfaceAreaScore}</span>
            </button>
          );
        })}
      </div>

      {/* ── PER-PUBLICATION METRICS STRIP ───────────── */}
      {selectedMetrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: 'SURFACE SCORE', value: selectedMetrics.surfaceAreaScore, suffix: '/100', color: scoreColor(selectedMetrics.surfaceAreaScore) },
            { label: 'LIVE CHANNELS', value: selectedMetrics.liveChannels, suffix: '', color: 'text-[#22C55E]' },
            { label: 'IN PIPELINE', value: selectedMetrics.approvedChannels + selectedMetrics.onboardingChannels, suffix: '', color: 'text-[#38BDF8]' },
            { label: 'ELIGIBLE UNEXPLORED', value: selectedMetrics.highValueUnexplored, suffix: '', color: 'text-[#FF6A18]' },
            { label: 'LIVE MONTHLY', value: fmt(selectedMetrics.liveMonthlyRevenue), suffix: '', color: 'text-[#22C55E]' },
            { label: 'POTENTIAL MONTHLY', value: fmt(selectedMetrics.potentialMonthlyRevenue), suffix: '', color: 'text-[#A2A6AD]' },
            { label: 'CAPTURED', value: `${selectedMetrics.capturedPercent.toFixed(1)}%`, suffix: '', color: 'text-[#D6A84B]' },
            { label: 'ACTIONS QUEUED', value: pubActions.length, suffix: '', color: 'text-[#D6A84B]' },
          ].map(stat => (
            <div key={stat.label} className="industrial-panel-inset p-3">
              <div className="text-[9px] font-display text-[#626770] tracking-wider truncate">{stat.label}</div>
              <div className={`font-data text-lg font-bold mt-1 ${stat.color}`}>{stat.value}{stat.suffix}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── CAPTURE BAR ────────────────────────────── */}
      {selectedMetrics && (
        <div className="industrial-panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <Radio className="w-4 h-4 text-[#D6A84B]" />
            <h2 className="font-display text-xs text-[#F5F6F7] tracking-wider">REVENUE SURFACE CAPTURE GAUGE — {selectedProfile.canonicalId}</h2>
          </div>
          <CaptureBar
            pct={selectedMetrics.capturedPercent}
            live={selectedMetrics.liveMonthlyRevenue}
            potential={selectedMetrics.potentialMonthlyRevenue}
          />
          <div className="mt-4 flex flex-wrap gap-4 text-[10px] font-data">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#22C55E]" />
              <span className="text-[#22C55E]">{selectedMetrics.liveChannels} LIVE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#38BDF8]" />
              <span className="text-[#38BDF8]">{selectedMetrics.onboardingChannels + selectedMetrics.approvedChannels} IN PIPELINE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FF6A18]" />
              <span className="text-[#FF6A18]">{selectedMetrics.highValueUnexplored} HIGH-VALUE UNEXPLORED</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#626770]" />
              <span className="text-[#626770]">{selectedMetrics.totalAddressableChannels - selectedMetrics.liveChannels - selectedMetrics.approvedChannels - selectedMetrics.onboardingChannels - selectedMetrics.highValueUnexplored} LOW-PRIORITY / NOT ELIGIBLE</span>
            </div>
          </div>
        </div>
      )}

      {/* ── TABS ─────────────────────────────────────── */}
      <div className="flex items-center gap-1 bg-[#121418] p-1 rounded-xl border border-white/10 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-display whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#1C1F24] text-[#D6A84B] border border-[#D6A84B]/30 shadow-md'
                  : 'text-[#A2A6AD] hover:text-[#F5F6F7] hover:bg-white/5'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? 'text-[#D6A84B]' : 'text-[#626770]'}`} />
              {tab.label}
              {tab.id === 'opportunities' && pubActions.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] bg-[#FF6A18]/20 text-[#FF6A18] font-data font-bold">
                  {pubActions.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── OVERVIEW TAB ─────────────────────────────── */}
      {activeTab === 'overview' && selectedMetrics && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Surface Dial + Key Stats */}
          <div className="lg:col-span-4 space-y-4">
            <div className="industrial-panel p-5 space-y-4">
              <h3 className="font-display text-xs text-[#626770] tracking-wider">COMMERCIAL SURFACE SCORE</h3>
              <div className="flex items-center gap-6">
                <SurfaceScoreDial score={selectedMetrics.surfaceAreaScore} size={110} />
                <div className="space-y-2 flex-1">
                  <div>
                    <div className="text-[9px] font-display text-[#626770]">ADDRESSABLE CHANNELS</div>
                    <div className="font-data text-base font-bold text-[#F5F6F7]">
                      {selectedMetrics.liveChannels}<span className="text-[#626770] text-sm"> / {selectedMetrics.totalAddressableChannels}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-display text-[#626770]">REVENUE CAPTURED</div>
                    <div className="font-data text-base font-bold text-[#D6A84B]">{selectedMetrics.capturedPercent.toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-display text-[#626770]">UNCAPTURED POTENTIAL</div>
                    <div className="font-data text-base font-bold text-[#FF6A18]">
                      {fmt(selectedMetrics.potentialMonthlyRevenue - selectedMetrics.liveMonthlyRevenue)}/mo
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dimension Scores */}
            <div className="industrial-panel p-5 space-y-3">
              <h3 className="font-display text-xs text-[#626770] tracking-wider">SURFACE DIMENSIONS</h3>
              {[
                { label: 'CHANNEL BREADTH', val: Math.round((selectedMetrics.liveChannels / selectedMetrics.totalAddressableChannels) * 100) },
                { label: 'REVENUE CAPTURE', val: Math.round(selectedMetrics.capturedPercent) },
                { label: 'FORMAT DIVERSITY', val: (() => { const f = Object.values(selectedMetrics.formatCoverage); const live = f.filter(x => x.live > 0).length; return Math.round((live / f.length) * 100); })() },
                { label: 'REGIONAL SPREAD', val: (() => { const r = Object.values(selectedMetrics.regionalCoverage).filter(x => x.total > 0); const live = r.filter(x => x.live > 0).length; return Math.round((live / r.length) * 100); })() },
                { label: 'PIPELINE DEPTH', val: Math.min(100, Math.round(((selectedMetrics.approvedChannels + selectedMetrics.onboardingChannels) / Math.max(selectedMetrics.totalAddressableChannels, 1)) * 100 + 15)) },
              ].map(dim => (
                <div key={dim.label} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-data">
                    <span className="text-[#626770]">{dim.label}</span>
                    <span className={scoreColor(dim.val)}>{dim.val}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#D6A84B] to-[#22C55E]"
                      style={{ width: `${dim.val}%`, transition: 'width 0.6s ease' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Opportunity Actions */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xs text-[#626770] tracking-wider">
                TOP PRIORITY OPPORTUNITIES — {fmt(totalUplift)}/MO POTENTIAL UPLIFT
              </h3>
              <button
                onClick={() => setActiveTab('opportunities')}
                className="text-[10px] font-display text-[#D6A84B] hover:underline flex items-center gap-1"
              >
                VIEW ALL {pubActions.length} <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {pubActions.slice(0, 4).map(action => (
                <OpportunityCard
                  key={action.id}
                  action={action}
                  onActivate={() => setActivatedId(action.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CHANNEL MAP TAB ──────────────────────────── */}
      {activeTab === 'channels' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-xs text-[#626770] tracking-wider">
              GLOBAL CHANNEL DISTRIBUTION MAP — {SURFACE_CHANNELS.length} REGISTERED CHANNELS
            </h3>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#626770]" />
              {(['ALL', 'LIVE', 'APPROVED', 'ELIGIBLE', 'UNEXPLORED', 'BLOCKED'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setChannelFilter(f)}
                  className={`px-2.5 py-1 rounded text-[10px] font-display transition-all border ${
                    channelFilter === f
                      ? 'bg-[#D6A84B] text-[#0A0B0D] border-[#D6A84B]'
                      : 'text-[#A2A6AD] border-white/10 hover:border-white/20'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Channel type grouping */}
          {['DIRECT', 'AGGREGATOR', 'AFFILIATE_NETWORK', 'COURSE', 'LIBRARY', 'SUBSCRIPTION', 'REGIONAL'].map(type => {
            const group = filteredChannels.filter(ch => ch.type === type);
            if (group.length === 0) return null;
            return (
              <div key={type} className="industrial-panel p-4 space-y-2">
                <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                  <span className="text-[10px] font-display text-[#D6A84B] tracking-wider">{type.replace('_', ' ')}</span>
                  <span className="text-[9px] font-data text-[#626770]">{group.length} channels</span>
                </div>
                <div className="space-y-2">
                  {group.map(ch => (
                    <ChannelRow key={ch.id} channel={ch} status={ch.pubStatus} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── OPPORTUNITIES TAB ────────────────────────── */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xs text-[#626770] tracking-wider">
              ACTION QUEUE — {pubActions.length} OPPORTUNITIES · {fmt(totalUplift)}/MO TOTAL POTENTIAL UPLIFT
            </h3>
          </div>

          {activatedId && (
            <div className="p-4 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
              <div>
                <div className="text-sm font-bold text-[#22C55E]">Opportunity Activated</div>
                <div className="text-xs text-[#A2A6AD] font-data mt-0.5">
                  Operations task created. Check Operations › Queue for workflow status.
                </div>
              </div>
              <button
                onClick={() => setActivatedId(null)}
                className="ml-auto text-[10px] text-[#626770] hover:text-[#A2A6AD]"
              >✕</button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pubActions.map(action => (
              <OpportunityCard
                key={action.id}
                action={action}
                onActivate={() => setActivatedId(action.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── FORMAT MATRIX TAB ───────────────────────── */}
      {activeTab === 'formats' && selectedMetrics && (
        <div className="space-y-4">
          <h3 className="font-display text-xs text-[#626770] tracking-wider">FORMAT COVERAGE MATRIX</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(Object.entries(selectedMetrics.formatCoverage) as [FormatType, { live: number; total: number }][])
              .filter(([, v]) => v.total > 0)
              .map(([fmt_key, coverage]) => {
                const pct = coverage.total > 0 ? Math.round((coverage.live / coverage.total) * 100) : 0;
                return (
                  <div key={fmt_key} className="industrial-panel p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-[#F5F6F7]">{FORMAT_LABELS[fmt_key]}</span>
                      <span className={`font-data text-lg font-bold ${scoreColor(pct)}`}>{pct}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#D6A84B] to-[#22C55E]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="text-[10px] font-data text-[#A2A6AD] flex justify-between">
                      <span className="text-[#22C55E]">{coverage.live} live</span>
                      <span className="text-[#626770]">{coverage.total} total channels</span>
                    </div>
                    {coverage.live === 0 && (
                      <div className="text-[10px] font-data text-[#FF6A18] flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Not yet distributed in this format
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          <div className="industrial-panel p-5 space-y-3">
            <h4 className="font-display text-xs text-[#626770] tracking-wider">FORMAT EXPANSION RECOMMENDATIONS</h4>
            <div className="space-y-2 font-data text-xs">
              {selectedMetrics.formatCoverage.AUDIO.live === 0 && (
                <div className="p-3 bg-[#FF6A18]/5 border border-[#FF6A18]/20 rounded-lg flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#FF6A18] shrink-0 mt-0.5" />
                  <span className="text-[#A2A6AD]"><span className="text-[#FF6A18] font-bold">Audio:</span> No audio version exists. Trading education podcasts generate 3–5× engagement vs PDF alone. Audiobook distribution via Findaway Voices or ACX (Audible) unlocks 400M+ listener base.</span>
                </div>
              )}
              {selectedMetrics.formatCoverage.COURSE.live === 0 && (
                <div className="p-3 bg-[#D6A84B]/5 border border-[#D6A84B]/20 rounded-lg flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#D6A84B] shrink-0 mt-0.5" />
                  <span className="text-[#A2A6AD]"><span className="text-[#D6A84B] font-bold">Course:</span> No structured course format. Kajabi/Teachable courses enable £199–£499 price points vs £49–£99 for PDF. 4–8× revenue per customer.</span>
                </div>
              )}
              {selectedMetrics.formatCoverage.PRINT.live === 0 && (
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#A2A6AD] shrink-0 mt-0.5" />
                  <span className="text-[#A2A6AD]"><span className="text-[#F5F6F7] font-bold">Print:</span> No print edition. IngramSpark or Amazon KDP print-on-demand can be enabled at near-zero upfront cost for premium hardcover positioning.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── REGION MAP TAB ──────────────────────────── */}
      {activeTab === 'regions' && selectedMetrics && (
        <div className="space-y-4">
          <h3 className="font-display text-xs text-[#626770] tracking-wider">REGIONAL DISTRIBUTION COVERAGE</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {(Object.entries(selectedMetrics.regionalCoverage) as [RegionCode, { live: number; total: number }][])
              .filter(([, v]) => v.total > 0)
              .sort(([, a], [, b]) => b.live - a.live)
              .map(([regionCode, coverage]) => {
                const pct = coverage.total > 0 ? Math.round((coverage.live / coverage.total) * 100) : 0;
                return (
                  <div key={regionCode} className="industrial-panel p-3 text-center space-y-2">
                    <div className="text-lg">{REGION_LABELS[regionCode].split(' ')[0]}</div>
                    <div className="text-[11px] font-display text-[#F5F6F7]">{REGION_LABELS[regionCode].split(' ').slice(1).join(' ')}</div>
                    <div className={`font-data text-base font-bold ${scoreColor(pct)}`}>{pct}%</div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: pct >= 70 ? '#22C55E' : pct >= 40 ? '#D6A84B' : '#FF6A18',
                        }}
                      />
                    </div>
                    <div className="text-[9px] font-data text-[#626770]">{coverage.live}/{coverage.total} ch</div>
                  </div>
                );
              })}
          </div>

          {/* Priority Zero Regions */}
          <div className="industrial-panel p-5 space-y-3">
            <h4 className="font-display text-xs text-[#626770] tracking-wider">PRIORITY ZERO REGIONAL GAPS</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  region: 'LATAM 🌎',
                  gap: 'Zero channels. Spanish-speaking retail traders underserved. Hotmart dominates.',
                  action: 'Commission Spanish translation → Launch Hotmart',
                  uplift: '$12,000',
                  priority: 'HIGH' as const,
                },
                {
                  region: 'Germany 🇩🇪',
                  gap: '1 of 7 channels live. Tolino ebook network (40% DE market share) unexplored.',
                  action: 'List via PublishDrive Tolino → Target Digistore24 finance affiliates',
                  uplift: '$8,000',
                  priority: 'HIGH' as const,
                },
                {
                  region: 'India 🇮🇳',
                  gap: 'Zero channels. 5M+ retail traders. Fast-growing English-language finance education market.',
                  action: 'Activate Amazon KDP India SKU → List on Pothi.com',
                  uplift: '$4,000',
                  priority: 'MEDIUM' as const,
                },
              ].map(gap => (
                <div key={gap.region} className={`p-4 rounded-xl border space-y-2 ${
                  gap.priority === 'HIGH' ? 'bg-[#FF6A18]/5 border-[#FF6A18]/20' : 'bg-white/3 border-white/10'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-[#F5F6F7]">{gap.region}</span>
                    <span className="font-data text-sm font-bold text-[#22C55E]">+{gap.uplift}/mo</span>
                  </div>
                  <p className="text-[11px] text-[#A2A6AD] leading-relaxed">{gap.gap}</p>
                  <div className="flex items-start gap-1.5 text-[10px] font-data text-[#D6A84B]">
                    <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" />
                    <span>{gap.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
