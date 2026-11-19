import React, { useState, useEffect } from 'react';
import { Player, Match } from '../types';
import { PlayerAvatar } from './PlayerAvatar';
import { Play, Pause, Zap, Trophy, ShieldAlert, Award, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MatchPitchSimulationProps {
  match: Match;
  onFinishMatch: (scoreA: number, scoreB: number) => void;
}

export const MatchPitchSimulation: React.FC<MatchPitchSimulationProps> = ({
  match,
  onFinishMatch
}) => {
  const [matchMinutes, setMatchMinutes] = useState(12);
  const [currentScoreA, setCurrentScoreA] = useState(0);
  const [currentScoreB, setCurrentScoreB] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [commentary, setCommentary] = useState<string[]>([
    'Match kickoff: Both teams assume initial tactical shape.',
    'High-tempo opening minutes with possession centered in midfield.',
    'Careful defensive positioning by both competitors.'
  ]);

  // Live match clock simulation
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setMatchMinutes((prev) => {
        if (prev >= 90) {
          setIsPlaying(false);
          return 90;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleSimulateResult = (scenario: 'winA' | 'winB' | 'draw') => {
    let finalA = 0;
    let finalB = 0;

    if (scenario === 'winA') {
      finalA = Math.floor(Math.random() * 2) + 2; // 2 or 3
      finalB = Math.floor(Math.random() * 2); // 0 or 1
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } else if (scenario === 'winB') {
      finalA = Math.floor(Math.random() * 2); // 0 or 1
      finalB = Math.floor(Math.random() * 2) + 2; // 2 or 3
    } else {
      finalA = 1;
      finalB = 1;
    }

    setCurrentScoreA(finalA);
    setCurrentScoreB(finalB);
    setMatchMinutes(90);
    setIsPlaying(false);

    onFinishMatch(finalA, finalB);
  };

  return (
    <div className="space-y-6">
      {/* Stadium Pitch Canvas / Visual */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-panel overflow-hidden border border-forest-800 bg-[#1e4634] shadow-elevated select-none">
        {/* Subtle Pitch Grass Stripes */}
        <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(90deg,#000_0px,#000_60px,transparent_60px,transparent_120px)]" />

        {/* Tactical Pitch Markings (SVG) */}
        <svg className="absolute inset-0 w-full h-full stroke-white/40 fill-none" strokeWidth="2">
          {/* Border line */}
          <rect x="20" y="20" width="calc(100% - 40px)" height="calc(100% - 40px)" rx="4" />
          {/* Halfway line */}
          <line x1="50%" y1="20" x2="50%" y2="calc(100% - 20px)" />
          {/* Center circle */}
          <circle cx="50%" cy="50%" r="48" />
          <circle cx="50%" cy="50%" r="3" fill="white" className="fill-white/60" />
          {/* Penalty areas */}
          <rect x="20" y="25%" width="12%" height="50%" />
          <rect x="calc(88% - 20px)" y="25%" width="12%" height="50%" />
          {/* Goal areas */}
          <rect x="20" y="37%" width="5%" height="26%" />
          <rect x="calc(95% - 20px)" y="37%" width="5%" height="26%" />
        </svg>

        {/* Dynamic Animated Player Positioning Dots */}
        <div className="absolute top-[45%] left-[28%] w-4 h-4 rounded-full bg-forest-200 border-2 border-forest-900 shadow-md animate-ping opacity-75" />
        <div className="absolute top-[45%] left-[28%] w-4 h-4 rounded-full bg-forest-100 border-2 border-forest-900 shadow-md" />

        <div className="absolute top-[52%] right-[32%] w-4 h-4 rounded-full bg-amber-400 border-2 border-forest-900 shadow-md animate-subtle-pulse" />

        {/* Central Overlay Scoreboard HUD */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-charcoal/85 backdrop-blur-md text-surface border border-white/10 rounded-full px-5 py-2 shadow-elevated flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-bold truncate max-w-[100px] sm:max-w-[130px]">
              {match.playerA.displayName}
            </span>
            <PlayerAvatar name={match.playerA.displayName} avatarUrl={match.playerA.avatar} size="xs" />
          </div>

          <div className="flex items-center gap-3 font-mono text-xl sm:text-2xl font-bold text-gold">
            <span>{currentScoreA}</span>
            <span className="text-white/40 text-sm">:</span>
            <span>{currentScoreB}</span>
          </div>

          <div className="flex items-center gap-2">
            <PlayerAvatar name={match.playerB.displayName} avatarUrl={match.playerB.avatar} size="xs" />
            <span className="font-display text-sm font-bold truncate max-w-[100px] sm:max-w-[130px]">
              {match.playerB.displayName}
            </span>
          </div>

          <div className="pl-3 border-l border-white/20 flex items-center gap-1.5 text-xs text-stone-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-gold" />
            <span>{matchMinutes}'</span>
          </div>
        </div>

        {/* Bottom Banner Status */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-stone-300 bg-charcoal/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Unity Match Engine v2024.1 — Authoritative Telemetry Active</span>
          </div>
          <span className="font-mono text-stone-400 hidden sm:inline">Session: {match.unitySessionToken || 'LIVE_FEED_AUTH'}</span>
        </div>
      </div>

      {/* Demonstration Controls Panel */}
      <div className="bg-surface border border-stone-200 rounded-panel p-5 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-forest-700">
              <Zap className="w-3.5 h-3.5 text-gold" />
              Demo Simulation Console
            </div>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Select an intended match scenario to trigger instant authoritative resulting and synchronise all Federation tables.
            </p>
          </div>

          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-charcoal-muted uppercase">
            Demonstration Mode Only
          </span>
        </div>

        {/* Scenario Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleSimulateResult('winA')}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface font-semibold text-xs shadow-subtle transition-all active:scale-[0.99]"
          >
            <Trophy className="w-4 h-4 text-gold" />
            <span>Simulate Victory: {match.playerA.displayName}</span>
          </button>

          <button
            onClick={() => handleSimulateResult('draw')}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-charcoal font-semibold text-xs border border-stone-200 transition-all active:scale-[0.99]"
          >
            <span>Simulate Draw (1–1)</span>
          </button>

          <button
            onClick={() => handleSimulateResult('winB')}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface font-semibold text-xs shadow-subtle transition-all active:scale-[0.99]"
          >
            <Trophy className="w-4 h-4 text-gold" />
            <span>Simulate Victory: {match.playerB.displayName}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
