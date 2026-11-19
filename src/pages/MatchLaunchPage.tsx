import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { PlayerAvatar } from '../components/PlayerAvatar';
import { StatusBadge } from '../components/StatusBadge';
import { MatchPitchSimulation } from '../components/MatchPitchSimulation';
import { UnityArchitectureModal } from '../components/UnityArchitectureModal';
import {
  ShieldCheck,
  Server,
  Monitor,
  Trophy,
  ArrowRight,
  TrendingUp,
  Clock,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Lock,
  Layers,
  ChevronRight,
  Play,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MatchLaunchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { matches, currentUser, players, completeMatch, tournaments, league } = useAppStore();

  const matchId = id || 'FTB-2026-9041';

  // Find or construct match
  const existingMatch = matches.find((m) => m.id === matchId);

  // Fallback match configuration if navigating directly
  const playerA = existingMatch?.playerA || currentUser;
  const playerB = existingMatch?.playerB || (players.find((p) => p.id !== currentUser.id) || players[1]);

  // If this match belongs to a tournament, link it
  const isTournamentMatch = matchId.includes('TOURN') || existingMatch?.type === 'tournament';
  const isLeagueMatch = matchId.includes('LEAGUE') || existingMatch?.type === 'league';

  const [connectionStage, setConnectionStage] = useState<number>(0);
  const [isHandshakeComplete, setIsHandshakeComplete] = useState<boolean>(
    existingMatch?.status === 'completed'
  );
  const [matchFinished, setMatchFinished] = useState<boolean>(existingMatch?.status === 'completed');
  const [finalResult, setFinalResult] = useState<{
    scoreA: number;
    scoreB: number;
    ratingDeltaA: number;
    ratingDeltaB: number;
  }>({
    scoreA: existingMatch?.scoreA || 0,
    scoreB: existingMatch?.scoreB || 0,
    ratingDeltaA: existingMatch?.ratingChangeA || 0,
    ratingDeltaB: existingMatch?.ratingChangeB || 0
  });

  const [archModalOpen, setArchModalOpen] = useState(false);

  // Unity Handshake sequence simulation
  useEffect(() => {
    if (isHandshakeComplete || existingMatch?.status === 'completed') return;

    const stages = [
      'Preparing Match Session & Allocating Nonce',
      'Validating Player ECDSA Credentials & Token Handshake',
      'Establishing Secure WebRTC Connection Channel',
      'Synchronizing with Unity Match Engine v2024.1',
      'Match Session Active & Ready'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setConnectionStage(current);
      if (current >= 4) {
        clearInterval(interval);
        setTimeout(() => {
          setIsHandshakeComplete(true);
        }, 600);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [isHandshakeComplete, existingMatch]);

  const handleFinishMatch = (scoreA: number, scoreB: number) => {
    const res = completeMatch(matchId, scoreA, scoreB);

    setFinalResult({
      scoreA,
      scoreB,
      ratingDeltaA: res.ratingChangeA,
      ratingDeltaB: res.ratingChangeB
    });
    setMatchFinished(true);

    if (scoreA > scoreB) {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const steps = [
    'Preparing Match Session',
    'Validating Credentials',
    'Establishing Connection',
    'Connecting Unity Engine',
    'Match Ready'
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Pre-Match Header & Metadata Bar */}
      <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1">
            <span className="font-mono text-charcoal bg-stone-100 px-2 py-0.5 rounded">
              MATCH ID: {matchId}
            </span>
            <span>•</span>
            <span>{existingMatch?.competitionName || (isTournamentMatch ? 'FUTBOLIÑO World Cup' : isLeagueMatch ? 'Premier Division' : 'Federation Global Ladder')}</span>
          </div>

          <h1 className="font-display font-extrabold text-2xl text-charcoal">
            {playerA.displayName} <span className="text-stone-400 font-normal">vs</span> {playerB.displayName}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Architecture Specification Button */}
          <button
            onClick={() => setArchModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-800 text-xs font-semibold border border-forest-200 transition-colors flex items-center gap-2 shadow-subtle"
            title="Inspect Website-to-Unity Technical Architecture"
          >
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>Unity Integration Docs</span>
          </button>

          <StatusBadge
            status={matchFinished ? 'Completed' : isHandshakeComplete ? 'In Progress' : 'Connecting'}
            size="md"
          />
        </div>
      </div>

      {/* 5-Stage Unity Connection Handshake Tracker (When initializing) */}
      {!isHandshakeComplete && !matchFinished && (
        <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-sm text-charcoal">
                Establishing Unity Engine Session Handshake
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Simulating secure token negotiation between Federation Web and authoritative game client
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-forest-700">
              Stage {Math.min(connectionStage + 1, 5)} / 5
            </span>
          </div>

          {/* Stepper Progress bar */}
          <div className="grid grid-cols-5 gap-2">
            {steps.map((stepName, idx) => (
              <div key={idx} className="space-y-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    connectionStage >= idx ? 'bg-forest-600' : 'bg-stone-200'
                  }`}
                />
                <span className={`text-[10px] block truncate ${connectionStage >= idx ? 'font-semibold text-forest-800' : 'text-charcoal-muted'}`}>
                  {stepName}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3 text-xs text-charcoal-muted">
            <Server className="w-4 h-4 text-forest-700 shrink-0 animate-pulse" />
            <span className="font-mono text-[11px]">
              {steps[Math.min(connectionStage, 4)]}... Authorized with short-lived session token.
            </span>
          </div>
        </div>
      )}

      {/* Match Active Interface / Pitch Simulation */}
      {isHandshakeComplete && !matchFinished && (
        <MatchPitchSimulation
          match={{
            id: matchId,
            type: existingMatch?.type || 'ranked',
            competitionName: existingMatch?.competitionName || 'Federation Ranked Match',
            playerAId: playerA.id,
            playerBId: playerB.id,
            playerA,
            playerB,
            scoreA: 0,
            scoreB: 0,
            status: 'in_progress',
            result: 'pending',
            ratingChangeA: 0,
            ratingChangeB: 0,
            date: new Date().toISOString().split('T')[0],
            duration: '15:00',
            unitySessionToken: `ses_${matchId}_auth`
          }}
          onFinishMatch={handleFinishMatch}
        />
      )}

      {/* 9.4 Final Match Result Presentation */}
      {matchFinished && (
        <div className="bg-surface rounded-panel p-8 border border-stone-200/90 shadow-card space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-forest-700">
              Official Match Record Concluded
            </span>
            <h2 className="font-display font-extrabold text-3xl text-charcoal">
              Match Dossier Finalized
            </h2>
            <p className="text-xs text-charcoal-muted max-w-md mx-auto">
              Authoritative result certified by Federation server engine. All Elo ratings and competitive brackets synchronized.
            </p>
          </div>

          {/* Central Score Card */}
          <div className="p-6 bg-warm-bg rounded-panel border border-stone-200/80 max-w-2xl mx-auto flex items-center justify-between">
            {/* Player A */}
            <div className="flex-1 text-center space-y-2">
              <PlayerAvatar name={playerA.displayName} avatarUrl={playerA.avatar} size="lg" className="mx-auto" />
              <div className="font-display font-bold text-base text-charcoal truncate">{playerA.displayName}</div>
              <div className="text-xs text-charcoal-muted">{playerA.country}</div>
              {finalResult.ratingDeltaA !== 0 && (
                <div className={`font-mono text-xs font-bold ${finalResult.ratingDeltaA > 0 ? 'text-forest-700' : 'text-red-700'}`}>
                  {finalResult.ratingDeltaA > 0 ? `+${finalResult.ratingDeltaA}` : finalResult.ratingDeltaA} Elo
                </div>
              )}
            </div>

            {/* Score */}
            <div className="px-6 text-center">
              <div className="font-mono text-4xl sm:text-5xl font-black text-forest-800 tracking-tight">
                {finalResult.scoreA} : {finalResult.scoreB}
              </div>
              <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-forest-100 text-forest-800">
                Full-Time Verified
              </span>
            </div>

            {/* Player B */}
            <div className="flex-1 text-center space-y-2">
              <PlayerAvatar name={playerB.displayName} avatarUrl={playerB.avatar} size="lg" className="mx-auto" />
              <div className="font-display font-bold text-base text-charcoal truncate">{playerB.displayName}</div>
              <div className="text-xs text-charcoal-muted">{playerB.country}</div>
              {finalResult.ratingDeltaB !== 0 && (
                <div className={`font-mono text-xs font-bold ${finalResult.ratingDeltaB > 0 ? 'text-forest-700' : 'text-red-700'}`}>
                  {finalResult.ratingDeltaB > 0 ? `+${finalResult.ratingDeltaB}` : finalResult.ratingDeltaB} Elo
                </div>
              )}
            </div>
          </div>

          {/* Result Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface font-semibold text-xs shadow-subtle transition-all flex items-center gap-2"
            >
              <span>Return to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {isTournamentMatch && (
              <button
                onClick={() => navigate('/tournaments/tourn-world-cup')}
                className="px-6 py-3 rounded-xl bg-surface border border-stone-200 hover:bg-stone-50 text-charcoal font-semibold text-xs shadow-subtle transition-all flex items-center gap-2"
              >
                <Trophy className="w-4 h-4 text-forest-700" />
                <span>View Tournament Bracket</span>
              </button>
            )}

            {isLeagueMatch && (
              <button
                onClick={() => navigate('/league')}
                className="px-6 py-3 rounded-xl bg-surface border border-stone-200 hover:bg-stone-50 text-charcoal font-semibold text-xs shadow-subtle transition-all flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-forest-700" />
                <span>View League Standings</span>
              </button>
            )}

            <button
              onClick={() => navigate('/history')}
              className="px-6 py-3 rounded-xl bg-surface border border-stone-200 hover:bg-stone-50 text-charcoal font-semibold text-xs shadow-subtle transition-all"
            >
              View Match History
            </button>
          </div>
        </div>
      )}

      {/* Unity Architecture Modal */}
      <UnityArchitectureModal
        isOpen={archModalOpen}
        onClose={() => setArchModalOpen(false)}
        matchId={matchId}
      />
    </div>
  );
};
