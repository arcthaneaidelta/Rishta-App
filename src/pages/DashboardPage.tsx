import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { StatsCard } from '../components/StatsCard';
import { PlayerAvatar } from '../components/PlayerAvatar';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { Match } from '../types';
import {
  Trophy,
  Swords,
  Medal,
  Award,
  Gamepad2,
  TableProperties,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Zap,
  Play
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentUser, matches, tournaments, league, players, activityLogs } = useAppStore();
  const navigate = useNavigate();

  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // User matches (last 5)
  const userMatches = matches
    .filter((m) => m.playerAId === currentUser.id || m.playerBId === currentUser.id)
    .slice(0, 5);

  // Top 5 players
  const topFive = [...players].sort((a, b) => b.rating - a.rating).slice(0, 5);

  // Next tournament match (e.g. World Cup QF4)
  const activeTourn = tournaments.find((t) => t.id === 'tourn-world-cup');
  const upcomingMatch = activeTourn?.bracket.find(
    (bm) => (bm.playerA?.id === currentUser.id || bm.playerB?.id === currentUser.id) && !bm.isCompleted
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 7.1 Welcome Banner Section */}
      <div className="bg-surface rounded-panel p-6 sm:p-8 border border-stone-200/90 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-forest-50/70 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="flex items-center gap-4 sm:gap-5 z-10">
          <PlayerAvatar
            name={currentUser.displayName}
            avatarUrl={currentUser.avatar}
            size="xl"
            showBadge
          />
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-forest-700 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal mt-1">
              Good evening, {currentUser.displayName.split(' ')[0]}.
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
              Ready for your next competitive match? Division 1 fixtures are live.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 z-10 w-full md:w-auto">
          <Link
            to="/play"
            className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface font-semibold text-xs shadow-subtle transition-all flex items-center justify-center gap-2"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Quick Match</span>
          </Link>

          <Link
            to="/challenges"
            className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-warm-bg hover:bg-stone-100 text-charcoal border border-stone-200/90 font-semibold text-xs transition-all flex items-center justify-center gap-2"
          >
            <Swords className="w-4 h-4 text-forest-700" />
            <span>Challenges</span>
          </Link>
        </div>
      </div>

      {/* 7.2 Primary Statistic Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          label="Current Elo Rating"
          value={currentUser.rating}
          subvalue="K=32 Scaled"
          trend={{ positive: true, text: '+18' }}
          icon={TrendingUp}
        />
        <StatsCard
          label="World Ranking"
          value={`#${currentUser.rank}`}
          subvalue={`of ${players.length * 150}+ players`}
          trend={{ positive: true, text: 'Top Tier' }}
          icon={Medal}
        />
        <StatsCard
          label="Matches Played"
          value={currentUser.matchesPlayed}
          subvalue={`${currentUser.wins}W • ${currentUser.draws}D • ${currentUser.losses}L`}
          icon={Trophy}
        />
        <StatsCard
          label="Federation Win Rate"
          value={`${currentUser.winRate}%`}
          subvalue="Active Competitions"
          trend={{ positive: true, text: '64.7% Target' }}
          icon={Award}
        />
      </div>

      {/* 7.6 Upcoming Competition Highlight Card */}
      {upcomingMatch && (
        <div className="bg-forest-900 text-surface rounded-panel p-6 shadow-elevated border border-gold/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-gold">
                <span>Next Scheduled Fixture</span>
                <span>•</span>
                <span>FUTBOLIÑO World Cup</span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-surface mt-0.5">
                {upcomingMatch.roundName}: {upcomingMatch.playerA?.displayName} vs {upcomingMatch.playerB?.displayName}
              </h3>
              <p className="text-xs text-stone-300 mt-0.5">
                Single-elimination quarter-final. Winner advances directly to the semi-finals.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/matches/${upcomingMatch.matchId || `FTB-TOURN-${upcomingMatch.id}`}`)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-forest-950 font-display font-bold text-xs tracking-wider shadow-subtle transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>LAUNCH MATCH ENGINE</span>
          </button>
        </div>
      )}

      {/* Grid: Performance Overview & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7.3 Performance Overview */}
        <div className="lg:col-span-2 bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-charcoal">
                Performance Overview
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Match distribution across sanctioned Federation encounters
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-forest-50 text-forest-700">
              {currentUser.tacticalStyle || '4-3-3 Possession'}
            </span>
          </div>

          {/* Clean Performance Bar Visualization */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-charcoal mb-1.5">
                <span>Match Breakdown ({currentUser.matchesPlayed} total)</span>
                <span>{currentUser.winRate}% Win Rate</span>
              </div>
              <div className="h-3 w-full rounded-full bg-stone-100 flex overflow-hidden">
                <div
                  className="bg-forest-600 h-full transition-all duration-500"
                  style={{ width: `${(currentUser.wins / Math.max(1, currentUser.matchesPlayed)) * 100}%` }}
                  title={`Wins: ${currentUser.wins}`}
                />
                <div
                  className="bg-amber-400 h-full transition-all duration-500"
                  style={{ width: `${(currentUser.draws / Math.max(1, currentUser.matchesPlayed)) * 100}%` }}
                  title={`Draws: ${currentUser.draws}`}
                />
                <div
                  className="bg-red-400 h-full transition-all duration-500"
                  style={{ width: `${(currentUser.losses / Math.max(1, currentUser.matchesPlayed)) * 100}%` }}
                  title={`Losses: ${currentUser.losses}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2 text-center">
              <div className="p-3 rounded-card bg-forest-50/60 border border-forest-100">
                <span className="text-[10px] uppercase font-bold text-forest-700 block">Victories</span>
                <span className="font-display font-bold text-xl text-forest-900 tabular-nums">{currentUser.wins}</span>
                <span className="text-[10px] text-forest-600 block">3 pts equivalent</span>
              </div>
              <div className="p-3 rounded-card bg-amber-50/60 border border-amber-100">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Draws</span>
                <span className="font-display font-bold text-xl text-amber-900 tabular-nums">{currentUser.draws}</span>
                <span className="text-[10px] text-amber-600 block">1 pt equivalent</span>
              </div>
              <div className="p-3 rounded-card bg-red-50/60 border border-red-100">
                <span className="text-[10px] uppercase font-bold text-red-700 block">Defeats</span>
                <span className="font-display font-bold text-xl text-red-900 tabular-nums">{currentUser.losses}</span>
                <span className="text-[10px] text-red-600 block">0 pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7.5 Quick Actions & Federation Feed */}
        <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-display font-bold text-base text-charcoal mb-3">
              Federation Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                to="/play"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-stone-200/90 hover:border-forest-300 hover:bg-forest-50/40 text-xs font-semibold text-charcoal transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Gamepad2 className="w-4 h-4 text-forest-700" />
                  <span>Start Friendly Match</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </Link>

              <Link
                to="/challenges"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-stone-200/90 hover:border-forest-300 hover:bg-forest-50/40 text-xs font-semibold text-charcoal transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Swords className="w-4 h-4 text-forest-700" />
                  <span>Challenge Player</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </Link>

              <Link
                to="/tournaments"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-stone-200/90 hover:border-forest-300 hover:bg-forest-50/40 text-xs font-semibold text-charcoal transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-4 h-4 text-forest-700" />
                  <span>Join Tournament</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </Link>

              <Link
                to="/rankings"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-stone-200/90 hover:border-forest-300 hover:bg-forest-50/40 text-xs font-semibold text-charcoal transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Medal className="w-4 h-4 text-forest-700" />
                  <span>View Global Rankings</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </Link>
            </div>
          </div>

          {/* 7.8 Live Activity Logs */}
          <div className="pt-4 border-t border-stone-100">
            <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted block mb-2">
              Recent Account Activity
            </span>
            <div className="space-y-2">
              {activityLogs.slice(0, 3).map((log) => (
                <div key={log.id} className="text-[11px] text-charcoal-muted flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{log.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 7.4 Recent Matches Table & 7.7 Global Leaderboard Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7.4 Recent Matches */}
        <div className="lg:col-span-2 bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-charcoal">
                Recent Matches
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Latest 5 encounters recorded on the Federation ledger
              </p>
            </div>
            <Link
              to="/history"
              className="text-xs font-semibold text-forest-700 hover:text-forest-800 flex items-center gap-1"
            >
              <span>View History</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-100 text-charcoal-muted uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Opponent</th>
                  <th className="py-2.5 px-3">Competition</th>
                  <th className="py-2.5 px-3 text-center">Score</th>
                  <th className="py-2.5 px-3 text-center">Result</th>
                  <th className="py-2.5 px-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {userMatches.map((m) => {
                  const opponent = m.playerAId === currentUser.id ? m.playerB : m.playerA;
                  const isUserA = m.playerAId === currentUser.id;
                  const userScore = isUserA ? m.scoreA : m.scoreB;
                  const oppScore = isUserA ? m.scoreB : m.scoreA;

                  let resultBadge = 'Draw';
                  if (userScore > oppScore) resultBadge = 'Win';
                  else if (userScore < oppScore) resultBadge = 'Loss';

                  return (
                    <tr
                      key={m.id}
                      onClick={() => setSelectedMatch(m)}
                      className="hover:bg-forest-50/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <PlayerAvatar name={opponent.displayName} avatarUrl={opponent.avatar} size="xs" />
                          <span className="font-semibold text-charcoal">{opponent.displayName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-charcoal-muted">
                        {m.competitionName}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-charcoal">
                        {userScore} – {oppScore}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <StatusBadge status={resultBadge} size="sm" />
                      </td>
                      <td className="py-3 px-3 text-right text-charcoal-muted font-mono text-[11px]">
                        {m.date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 7.7 Global Leaderboard Preview */}
        <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-charcoal">
                Global Leaderboard
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5">Top 5 tacticians</p>
            </div>
            <Link
              to="/rankings"
              className="text-xs font-semibold text-forest-700 hover:text-forest-800"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {topFive.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => navigate(`/players/${p.id}`)}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                  p.id === currentUser.id
                    ? 'bg-forest-50/80 border-forest-300 font-semibold text-forest-900'
                    : 'bg-warm-bg/70 border-stone-200/70 hover:border-forest-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-display font-bold text-xs text-charcoal-muted w-4 text-center">
                    {idx + 1}
                  </span>
                  <PlayerAvatar name={p.displayName} avatarUrl={p.avatar} size="xs" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-charcoal block truncate">
                      {p.displayName}
                    </span>
                    <span className="text-[10px] text-charcoal-muted block truncate">
                      {p.country}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono font-bold text-xs text-forest-800 tabular-nums">
                  {p.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Match Details Modal */}
      {selectedMatch && (
        <Modal
          isOpen={!!selectedMatch}
          onClose={() => setSelectedMatch(null)}
          title={`Match Dossier — ${selectedMatch.id}`}
          description={`${selectedMatch.competitionName} • ${selectedMatch.date}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            {/* Score HUD */}
            <div className="p-4 bg-stone-50 rounded-card border border-stone-200 flex items-center justify-between text-center">
              <div className="flex-1">
                <PlayerAvatar name={selectedMatch.playerA.displayName} avatarUrl={selectedMatch.playerA.avatar} size="md" className="mx-auto mb-1.5" />
                <div className="font-display font-bold text-charcoal">{selectedMatch.playerA.displayName}</div>
                <div className="text-[11px] text-charcoal-muted">{selectedMatch.playerA.country}</div>
              </div>

              <div className="px-4">
                <span className="font-mono text-3xl font-extrabold text-forest-800">
                  {selectedMatch.scoreA} : {selectedMatch.scoreB}
                </span>
                <span className="block text-[10px] text-charcoal-muted uppercase mt-1">Full Time</span>
              </div>

              <div className="flex-1">
                <PlayerAvatar name={selectedMatch.playerB.displayName} avatarUrl={selectedMatch.playerB.avatar} size="md" className="mx-auto mb-1.5" />
                <div className="font-display font-bold text-charcoal">{selectedMatch.playerB.displayName}</div>
                <div className="text-[11px] text-charcoal-muted">{selectedMatch.playerB.country}</div>
              </div>
            </div>

            {/* Events timeline if present */}
            {selectedMatch.events && selectedMatch.events.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="font-semibold text-charcoal uppercase tracking-wider text-[11px]">Match Events Timeline</span>
                <div className="space-y-1.5 bg-warm-bg p-3 rounded-card border border-stone-200">
                  {selectedMatch.events.map((ev, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-forest-700 w-8">{ev.minute}'</span>
                      <span className="text-charcoal-muted">•</span>
                      <span className="font-medium text-charcoal">{ev.player}:</span>
                      <span className="text-charcoal-muted truncate">{ev.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedMatch(null)}
                className="px-4 py-2 rounded-xl bg-forest-600 text-surface font-semibold text-xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
