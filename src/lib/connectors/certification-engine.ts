// DRAWDOWN OS — ACTION-LEVEL CERTIFICATION ENGINE (§45, §46, §47, §48, §49, §91)

import { 
  ActionCertLevel, 
  ConnectorActionCertification, 
  ConnectorManifest 
} from './types';

export interface ActionCertificationCheck {
  connectorId: string;
  actionType: string;
  isAutopilotEligible: boolean;
  certLevel: ActionCertLevel;
  canExecuteAutonomously: boolean;
  blockReason?: string;
}

// Action-Level Certification Evaluator (§47, §91)
export function evaluateActionCertification(
  connector: ConnectorManifest,
  actionType: string,
  systemMode: 'OFF' | 'ADVISORY' | 'ASSISTED' | 'AUTOPILOT'
): ActionCertificationCheck {
  const cert = connector.actionCertifications[actionType];

  if (!cert) {
    return {
      connectorId: connector.id,
      actionType,
      isAutopilotEligible: false,
      certLevel: 'UNCERTIFIED',
      canExecuteAutonomously: false,
      blockReason: `Action "${actionType}" is UNCERTIFIED for connector ${connector.name}. Autopilot write blocked.`,
    };
  }

  const isCertified = cert.certLevel === 'AUTOPILOT_CERTIFIED';
  const isAutopilotMode = systemMode === 'AUTOPILOT';
  const canExecuteAutonomously = isCertified && cert.autopilotEligible && isAutopilotMode;

  let blockReason: string | undefined = undefined;

  if (cert.certLevel === 'SUSPENDED') {
    blockReason = `Connector ${connector.name} is SUSPENDED due to recent API or compliance failures.`;
  } else if (cert.certLevel === 'DEGRADED') {
    blockReason = `Connector ${connector.name} is DEGRADED. Read operations allowed, autonomous writes blocked.`;
  } else if (!isCertified) {
    blockReason = `Action "${actionType}" level is ${cert.certLevel}. Minimum required level is AUTOPILOT_CERTIFIED.`;
  } else if (systemMode !== 'AUTOPILOT') {
    blockReason = `System mode is currently ${systemMode}. Autonomous execution requires AUTOPILOT mode.`;
  }

  return {
    connectorId: connector.id,
    actionType,
    isAutopilotEligible: cert.autopilotEligible,
    certLevel: cert.certLevel,
    canExecuteAutonomously,
    blockReason,
  };
}

// Matrix Status Cell Formatter (§48)
export function getCertificationBadgeColor(certLevel: ActionCertLevel): string {
  switch (certLevel) {
    case 'AUTOPILOT_CERTIFIED':
      return 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30';
    case 'WRITE_CERTIFIED':
      return 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30';
    case 'READ_CERTIFIED':
      return 'bg-[#D6A84B]/10 text-[#D6A84B] border-[#D6A84B]/30';
    case 'CONFIGURED':
      return 'bg-white/5 text-[#A2A6AD] border-white/10';
    case 'DEGRADED':
    case 'SUSPENDED':
      return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30';
    case 'UNCERTIFIED':
    default:
      return 'bg-white/5 text-[#626770] border-white/5';
  }
}
