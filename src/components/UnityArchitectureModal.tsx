import React from 'react';
import { Modal } from './Modal';
import { ShieldCheck, Server, Monitor, Lock, Key, CheckCircle2, ArrowRight } from 'lucide-react';

interface UnityArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchId?: string;
  sessionToken?: string;
}

export const UnityArchitectureModal: React.FC<UnityArchitectureModalProps> = ({
  isOpen,
  onClose,
  matchId = 'FTB-2026-9041',
  sessionToken = 'ses_9041_jwt_auth_signed'
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Unity Engine Integration Architecture"
      description="Production Federation Lifecycle & Security Specification (Section 25)"
      maxWidth="2xl"
    >
      <div className="space-y-6 text-charcoal">
        {/* Architecture Flow Diagram */}
        <div className="bg-stone-50 border border-stone-200/90 rounded-card p-4 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
            End-to-End Handshake Flow
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-xs">
            {/* Stage 1: Federation Web */}
            <div className="p-3 bg-surface rounded-xl border border-stone-200 space-y-1 shadow-subtle">
              <div className="flex items-center gap-1.5 font-bold text-forest-700">
                <Server className="w-4 h-4" />
                <span>1. Federation API</span>
              </div>
              <p className="text-[11px] text-charcoal-muted">
                Generates Match ID ({matchId}), signs short-lived ECDSA session JWT, authorizes both competitors.
              </p>
            </div>

            {/* Stage 2: Unity Engine Client */}
            <div className="p-3 bg-surface rounded-xl border border-forest-300 ring-1 ring-forest-200 space-y-1 shadow-subtle">
              <div className="flex items-center gap-1.5 font-bold text-forest-800">
                <Monitor className="w-4 h-4" />
                <span>2. Unity Match Engine</span>
              </div>
              <p className="text-[11px] text-charcoal-muted">
                Launches dedicated match room, connects peers, runs physics & rules engine, records telemetry.
              </p>
            </div>

            {/* Stage 3: Match Verification */}
            <div className="p-3 bg-surface rounded-xl border border-stone-200 space-y-1 shadow-subtle">
              <div className="flex items-center gap-1.5 font-bold text-forest-700">
                <ShieldCheck className="w-4 h-4" />
                <span>3. Server Validation</span>
              </div>
              <p className="text-[11px] text-charcoal-muted">
                Idempotent result ingestion, replay signature verification, atomic Elo recalibration.
              </p>
            </div>
          </div>
        </div>

        {/* Security Principles */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-2">
            Key Security & Reliability Guarantees
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2 p-2.5 bg-warm-bg rounded-lg border border-stone-200/70">
              <Lock className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-charcoal font-semibold">Short-Lived Ephemeral Tokens</strong>
                <span className="text-charcoal-muted text-[11px]">No permanent user credentials or database keys are ever exposed to the client binary.</span>
              </div>
            </div>

            <div className="flex items-start gap-2 p-2.5 bg-warm-bg rounded-lg border border-stone-200/70">
              <ShieldCheck className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-charcoal font-semibold">Server-Authoritative Resulting</strong>
                <span className="text-charcoal-muted text-[11px]">Unity matches report events to an authoritative game server; client tampered scores are rejected.</span>
              </div>
            </div>

            <div className="flex items-start gap-2 p-2.5 bg-warm-bg rounded-lg border border-stone-200/70">
              <Key className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-charcoal font-semibold">Idempotent Webhooks</strong>
                <span className="text-charcoal-muted text-[11px]">Duplicate finish events are deduplicated via unique nonces to prevent double rating or bracket updates.</span>
              </div>
            </div>

            <div className="flex items-start gap-2 p-2.5 bg-warm-bg rounded-lg border border-stone-200/70">
              <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-charcoal font-semibold">Automatic State Synchronization</strong>
                <span className="text-charcoal-muted text-[11px]">Tournament brackets advance instantly, league tables re-sort, and leaderboards update synchronously.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Simulated Session Payload Sample */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-charcoal-muted uppercase tracking-wider text-[11px]">
              Simulated Handshake Payload (JSON)
            </span>
            <span className="font-mono text-[10px] text-forest-700 bg-forest-50 px-2 py-0.5 rounded">
              Status: Handshake Authorized
            </span>
          </div>
          <pre className="p-3 bg-stone-900 text-stone-200 rounded-card font-mono text-[11px] overflow-x-auto leading-relaxed border border-stone-800">
{`{
  "match_id": "${matchId}",
  "session_token": "${sessionToken}",
  "engine_target": "unity://futbolino.match.fed.net:7777",
  "auth_valid_seconds": 600,
  "telemetry_protocol": "v2.4_wss",
  "verification_mode": "server_authoritative"
}`}
          </pre>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface text-xs font-semibold shadow-subtle transition-colors"
          >
            Close Architecture Overview
          </button>
        </div>
      </div>
    </Modal>
  );
};
