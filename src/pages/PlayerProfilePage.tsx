import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { PlayerAvatar } from '../components/PlayerAvatar';
import { StatusBadge } from '../components/StatusBadge';
import {
  User,
  ShieldCheck,
  Trophy,
  Medal,
  Award,
  Calendar,
  Swords,
  Layers,
  ArrowRight,
  TrendingUp,
  MapPin
} from 'lucide-react';

export const PlayerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { players, currentUser, matches, tournaments, league, createChallenge } = useAppStore();

  const player = id ? (players.find((p) => p.id === id) || currentUser) : currentUser;
  const isSelf = player.id === currentUser.id;

  const [activeTab, setActiveTab] = useState<'matches' | 'competitions'>('matches');

  // Player matches
  const playerMatches = matches.filter(
    (m) => m.playerAId === player.id || m.playerBId === player.id
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Profile Dossier Hero */}
      <div className="bg-surface rounded-panel p-6 sm:p-8 border border-stone-200/90 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-5 z-10">
          <PlayerAvatar name={player.displayName} avatarUrl={player.avatar} size="xl" showBadge />
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-forest-700 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>Verified Federation Competitor</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal mt-1">
              {player.displayName}
            </h1>
            <div className="flex items-center gap-3 text-xs text-charcoal-muted mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                {player.country}
              </span>
              <span>•</span>
              <span>Member since {player.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {!isSelf ? (
          <button
            onClick={() => {
              createChallenge(player.id, 'friendly');
              navigate('/challenges');
            }}
            className="px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface text-xs font-semibold shadow-subtle transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Challenge Player</span>
          </button>
        ) : (
          <div className="px-4 py-2 rounded-xl bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold self-start sm:self-auto">
            Your Active Federation Terminal
          </div>
        )}
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-surface rounded-card p-5 border border-stone-200/90 shadow-card">
          <span className="text-xs uppercase font-semibold tracking-wider text-charcoal-muted block mb-1">
            Elo Rating
          </span>
          <span className="font-display font-extrabold text-3xl text-forest-800 tabular-nums">
            {player.rating}
          </span>
          <span className="text-[11px] text-forest-600 block mt-1">K=32 Weighted</span>
        </div>

        <div className="bg-surface rounded-card p-5 border border-stone-200/90 shadow-card">
          <span className="text-xs uppercase font-semibold tracking-wider text-charcoal-muted block mb-1">
            Global Standing
          </span>
          <span className="font-display font-extrabold text-3xl text-charcoal tabular-nums">
            #{player.rank}
          </span>
          <span className="text-[11px] text-charcoal-muted block mt-1">Tier-1 Division</span>
        </div>

        <div className="bg-surface rounded-card p-5 border border-stone-200/90 shadow-card">
          <span className="text-xs uppercase font-semibold tracking-wider text-charcoal-muted block mb-1">
            Matches Contested
          </span>
          <span className="font-display font-extrabold text-3xl text-charcoal tabular-nums">
            {player.matchesPlayed}
          </span>
          <span className="text-[11px] text-charcoal-muted block mt-1">
            {player.wins}W • {player.draws}D • {player.losses}L
          </span>
        </div>

        <div className="bg-surface rounded-card p-5 border border-stone-200/90 shadow-card">
          <span className="text-xs uppercase font-semibold tracking-wider text-charcoal-muted block mb-1">
            Conversion Rate
          </span>
          <span className="font-display font-extrabold text-3xl text-forest-700 tabular-nums">
            {player.winRate}%
          </span>
          <span className="text-[11px] text-forest-600 block mt-1">
            {player.goalsFor} Goals Scored
          </span>
        </div>
      </div>

      {/* Bio & Tactical Strategy Dossier */}
      <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card space-y-3">
        <h3 className="font-display font-bold text-base text-charcoal">
          Tactical Profile & Methodology
        </h3>
        <p className="text-xs text-charcoal-muted leading-relaxed max-w-2xl">
          {player.bio || 'Verified Federation grandmaster contender with high-tempo possession orientation.'}
        </p>
        <div className="pt-2 flex items-center gap-3 text-xs">
          <span className="font-semibold text-charcoal">Registered Formation:</span>
          <span className="px-2.5 py-1 rounded-full bg-forest-50 text-forest-800 font-medium">
            {player.tacticalStyle || '4-3-3 High Possession'}
          </span>
        </div>
      </div>

      {/* Profile Tabs (Matches & Competitions) */}
      <div className="bg-surface rounded-panel border border-stone-200/90 shadow-card overflow-hidden">
        <div className="flex border-b border-stone-200">
          <button
            onClick={() => setActiveTab('matches')}
            className={`py-3 px-6 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'matches'
                ? 'border-forest-600 text-forest-800'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            Match Dossiers ({playerMatches.length})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-charcoal-muted uppercase text-[10px] font-bold">
                <th className="py-3 px-4">Match ID</th>
                <th className="py-3 px-4">Competition</th>
                <th className="py-3 px-4">Opponent</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {playerMatches.map((m) => {
                const opponent = m.playerAId === player.id ? m.playerB : m.playerA;
                const isPlayerA = m.playerAId === player.id;
                const score1 = isPlayerA ? m.scoreA : m.scoreB;
                const score2 = isPlayerA ? m.scoreB : m.scoreA;

                return (
                  <tr key={m.id} className="hover:bg-forest-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-forest-700">{m.id}</td>
                    <td className="py-3.5 px-4 text-charcoal-muted">{m.competitionName}</td>
                    <td className="py-3.5 px-4 font-semibold text-charcoal">{opponent.displayName}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-charcoal">
                      {score1} – {score2}
                    </td>
                    <td className="py-3.5 px-4 text-right text-charcoal-muted font-mono">{m.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
