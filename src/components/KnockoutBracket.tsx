import React from 'react';
import { BracketMatch, Player } from '../types';
import { PlayerAvatar } from './PlayerAvatar';
import { Trophy, Play, CheckCircle, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

interface KnockoutBracketProps {
  tournamentId: string;
  bracket: BracketMatch[];
  champion?: Player;
  onSimulateMatch?: (matchIndex: number) => void;
}

export const KnockoutBracket: React.FC<KnockoutBracketProps> = ({
  tournamentId,
  bracket,
  champion,
  onSimulateMatch
}) => {
  const navigate = useNavigate();
  const { advanceTournamentMatch, currentUser } = useAppStore();

  const qfMatches = bracket.filter((m) => m.round === 1);
  const sfMatches = bracket.filter((m) => m.round === 2);
  const finalMatch = bracket.find((m) => m.round === 3);

  const handleSimulateQuick = (matchIndex: number) => {
    const match = bracket[matchIndex];
    if (!match?.playerA || !match?.playerB || match.isCompleted) return;

    // Simulate realistic tournament score
    let scoreA = Math.floor(Math.random() * 3) + 1;
    let scoreB = Math.floor(Math.random() * 3);
    if (scoreA === scoreB) {
      scoreA += 1;
    }

    advanceTournamentMatch(tournamentId, matchIndex, scoreA, scoreB);
  };

  const renderMatchCard = (match: BracketMatch) => {
    const isReady = !!match.playerA && !!match.playerB && !match.isCompleted;
    const isAlexInvolved = match.playerA?.id === currentUser.id || match.playerB?.id === currentUser.id;

    return (
      <div
        key={match.id}
        className={`relative bg-surface rounded-xl border transition-all duration-200 overflow-hidden shadow-card ${
          isReady
            ? isAlexInvolved
              ? 'border-forest-500 ring-2 ring-forest-500/20'
              : 'border-stone-300 hover:border-forest-300'
            : match.isCompleted
            ? 'border-stone-200'
            : 'border-dashed border-stone-200/80 bg-stone-50/50'
        }`}
      >
        {/* Round Badge header */}
        <div className="bg-stone-50/80 px-3 py-1 border-b border-stone-100 flex items-center justify-between text-[11px]">
          <span className="font-semibold text-charcoal-muted uppercase tracking-wider">
            {match.roundName}
          </span>
          {match.isCompleted ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-forest-700 bg-forest-100 px-1.5 py-0.2 rounded-full">
              <CheckCircle className="w-2.5 h-2.5" /> Final
            </span>
          ) : isReady ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded-full animate-subtle-pulse">
              Ready to Play
            </span>
          ) : (
            <span className="text-[10px] text-charcoal-light">TBD</span>
          )}
        </div>

        {/* Players Slot */}
        <div className="p-3 space-y-2">
          {/* Player A */}
          <div
            className={`flex items-center justify-between p-1.5 rounded-lg transition-colors ${
              match.winnerId && match.winnerId === match.playerA?.id
                ? 'bg-forest-50 font-semibold text-forest-900'
                : match.winnerId && match.winnerId !== match.playerA?.id
                ? 'opacity-40 text-charcoal-muted'
                : 'text-charcoal'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              {match.playerA ? (
                <>
                  <PlayerAvatar name={match.playerA.displayName} avatarUrl={match.playerA.avatar} size="xs" />
                  <span className="text-xs truncate">{match.playerA.displayName}</span>
                  {match.playerA.id === currentUser.id && (
                    <span className="text-[9px] bg-forest-600 text-surface px-1 rounded uppercase font-bold">You</span>
                  )}
                </>
              ) : (
                <span className="text-xs text-charcoal-light italic">Waiting for opponent...</span>
              )}
            </div>
            <span className="font-mono text-sm font-bold ml-2">
              {match.scoreA !== undefined ? match.scoreA : '-'}
            </span>
          </div>

          <div className="border-t border-stone-100" />

          {/* Player B */}
          <div
            className={`flex items-center justify-between p-1.5 rounded-lg transition-colors ${
              match.winnerId && match.winnerId === match.playerB?.id
                ? 'bg-forest-50 font-semibold text-forest-900'
                : match.winnerId && match.winnerId !== match.playerB?.id
                ? 'opacity-40 text-charcoal-muted'
                : 'text-charcoal'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              {match.playerB ? (
                <>
                  <PlayerAvatar name={match.playerB.displayName} avatarUrl={match.playerB.avatar} size="xs" />
                  <span className="text-xs truncate">{match.playerB.displayName}</span>
                  {match.playerB.id === currentUser.id && (
                    <span className="text-[9px] bg-forest-600 text-surface px-1 rounded uppercase font-bold">You</span>
                  )}
                </>
              ) : (
                <span className="text-xs text-charcoal-light italic">Waiting for opponent...</span>
              )}
            </div>
            <span className="font-mono text-sm font-bold ml-2">
              {match.scoreB !== undefined ? match.scoreB : '-'}
            </span>
          </div>
        </div>

        {/* Action footer for active match */}
        {isReady && (
          <div className="p-2 bg-stone-50/90 border-t border-stone-100 flex items-center justify-end gap-2">
            <button
              onClick={() => handleSimulateQuick(match.matchIndex)}
              className="px-2 py-1 text-[11px] font-semibold text-forest-700 hover:bg-forest-100 rounded-md transition-colors flex items-center gap-1"
              title="Quickly simulate match result locally"
            >
              <Zap className="w-3 h-3 text-gold" />
              Simulate
            </button>

            {isAlexInvolved && (
              <button
                onClick={() => navigate(`/matches/${match.matchId || `FTB-TOURN-${match.id}`}`)}
                className="px-2.5 py-1 text-[11px] font-semibold bg-forest-600 hover:bg-forest-700 text-surface rounded-md shadow-subtle transition-all flex items-center gap-1"
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                Launch Match
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Champion Banner if completed */}
      {champion && (
        <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900 text-surface p-6 rounded-panel shadow-elevated border border-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-gold shadow-inner shrink-0">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-gold">
                Tournament Champion
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight mt-0.5">
                {champion.displayName}
              </h3>
              <p className="text-xs text-stone-300">
                Federation World Cup Victor • {champion.country}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-stone-300 uppercase tracking-wider block">Winner Prize</span>
              <span className="font-display font-extrabold text-xl text-gold">$2,000 USD</span>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Knockout Bracket Layout */}
      <div className="overflow-x-auto pb-6 pt-2">
        <div className="min-w-[820px] grid grid-cols-3 gap-8 items-center">
          {/* Quarter-Finals (Column 1) */}
          <div className="space-y-4">
            <div className="text-center font-display text-xs font-bold uppercase tracking-wider text-charcoal-muted pb-2 border-b border-stone-200">
              Quarter-Finals (4 Matches)
            </div>
            <div className="space-y-4">
              {qfMatches.map((m) => renderMatchCard(m))}
            </div>
          </div>

          {/* Semi-Finals (Column 2) */}
          <div className="space-y-6">
            <div className="text-center font-display text-xs font-bold uppercase tracking-wider text-charcoal-muted pb-2 border-b border-stone-200">
              Semi-Finals (2 Matches)
            </div>
            <div className="space-y-16 py-8">
              {sfMatches.map((m) => renderMatchCard(m))}
            </div>
          </div>

          {/* Grand Final (Column 3) */}
          <div className="space-y-6">
            <div className="text-center font-display text-xs font-bold uppercase tracking-wider text-charcoal-muted pb-2 border-b border-stone-200">
              Grand Championship Final
            </div>
            <div className="py-20">
              {finalMatch && renderMatchCard(finalMatch)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
