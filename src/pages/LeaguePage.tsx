import React from 'react';
import { useAppStore } from '../store';
import { PlayerAvatar } from '../components/PlayerAvatar';
import { StatusBadge } from '../components/StatusBadge';
import { TableProperties, Trophy, ArrowRight, Play, Zap, Calendar, Medal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LeaguePage: React.FC = () => {
  const { league, currentUser, completeMatch } = useAppStore();
  const navigate = useNavigate();

  const handleSimulateFixture = (fixtureId: string) => {
    const fixture = league.fixtures.find((f) => f.id === fixtureId);
    if (!fixture || fixture.isCompleted) return;

    // Simulate realistic score
    const scoreA = Math.floor(Math.random() * 3) + 1;
    const scoreB = Math.floor(Math.random() * 3);

    completeMatch(`FTB-LEAGUE-${fixture.id}`, scoreA, scoreB);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full mb-2">
            <TableProperties className="w-3.5 h-3.5 text-gold" />
            Round-Robin Championship
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
            {league.name}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            {league.season} • 8 Grandmaster Contenders • 14 Matchdays • Win = 3pts, Draw = 1pt
          </p>
        </div>
      </div>

      {/* 11.2 Standings Table */}
      <div className="bg-surface rounded-panel border border-stone-200/90 shadow-card overflow-hidden">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-base text-charcoal">
              Official League Table
            </h3>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Sorted by: Points → Goal Difference → Goals Scored
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-forest-100 text-forest-700">
            Season 4 Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-charcoal-muted uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-3 w-12 text-center">Pos</th>
                <th className="py-3 px-4">Tactician</th>
                <th className="py-3 px-3 text-center">P</th>
                <th className="py-3 px-3 text-center">W</th>
                <th className="py-3 px-3 text-center">D</th>
                <th className="py-3 px-3 text-center">L</th>
                <th className="py-3 px-3 text-center">GF</th>
                <th className="py-3 px-3 text-center">GA</th>
                <th className="py-3 px-3 text-center">GD</th>
                <th className="py-3 px-4 text-center font-bold text-forest-900">PTS</th>
                <th className="py-3 px-4 text-center hidden md:table-cell">Recent Form</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {league.teams.map((team, idx) => {
                const isCurrentUser = team.playerId === currentUser.id;
                return (
                  <tr
                    key={team.playerId}
                    onClick={() => navigate(`/players/${team.playerId}`)}
                    className={`hover:bg-forest-50/50 cursor-pointer transition-colors ${
                      isCurrentUser ? 'bg-forest-50/70 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-3 text-center font-display font-bold text-charcoal">
                      {idx === 0 ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold/20 text-gold-dark font-extrabold text-xs">
                          1
                        </span>
                      ) : (
                        idx + 1
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <PlayerAvatar
                          name={team.player.displayName}
                          avatarUrl={team.player.avatar}
                          size="xs"
                        />
                        <span className="font-semibold text-charcoal">{team.player.displayName}</span>
                        {isCurrentUser && (
                          <span className="text-[9px] bg-forest-600 text-surface px-1 rounded uppercase font-bold">
                            You
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center tabular-nums">{team.played}</td>
                    <td className="py-3.5 px-3 text-center tabular-nums text-forest-700 font-medium">{team.won}</td>
                    <td className="py-3.5 px-3 text-center tabular-nums text-amber-700">{team.drawn}</td>
                    <td className="py-3.5 px-3 text-center tabular-nums text-red-700">{team.lost}</td>
                    <td className="py-3.5 px-3 text-center tabular-nums">{team.goalsFor}</td>
                    <td className="py-3.5 px-3 text-center tabular-nums text-charcoal-muted">{team.goalsAgainst}</td>
                    <td className="py-3.5 px-3 text-center tabular-nums font-mono">
                      {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                    </td>

                    <td className="py-3.5 px-4 text-center font-display font-extrabold text-forest-800 text-sm tabular-nums">
                      {team.points}
                    </td>

                    <td className="py-3.5 px-4 text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        {team.form.map((f, i) => (
                          <span
                            key={i}
                            className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center text-surface ${
                              f === 'W'
                                ? 'bg-forest-600'
                                : f === 'D'
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 11.3 Fixtures Section */}
      <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-base text-charcoal">
              Matchday 7 Fixtures
            </h3>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Simulate or launch active league fixtures to witness instantaneous points table re-calculation.
            </p>
          </div>
          <span className="text-xs font-mono text-charcoal-muted flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-forest-700" />
            <span>Scheduled Today</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {league.fixtures.map((fixture) => {
            const isUserFixture =
              fixture.playerAId === currentUser.id || fixture.playerBId === currentUser.id;

            return (
              <div
                key={fixture.id}
                className={`p-4 rounded-card border transition-all ${
                  fixture.isCompleted
                    ? 'bg-stone-50/70 border-stone-200'
                    : isUserFixture
                    ? 'bg-forest-50/40 border-forest-300 ring-1 ring-forest-300'
                    : 'bg-surface border-stone-200/80 hover:border-forest-200'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 text-xs">
                  <span className="font-semibold text-charcoal-muted uppercase text-[10px]">
                    Matchday {fixture.round}
                  </span>
                  <StatusBadge status={fixture.isCompleted ? 'Completed' : 'Scheduled'} size="sm" />
                </div>

                <div className="py-3 flex items-center justify-between">
                  {/* Player A */}
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <PlayerAvatar name={fixture.playerA.displayName} avatarUrl={fixture.playerA.avatar} size="xs" />
                    <span className="font-semibold text-xs text-charcoal truncate">
                      {fixture.playerA.displayName}
                    </span>
                  </div>

                  {/* Score or VS */}
                  <div className="px-4 font-mono font-bold text-sm text-charcoal shrink-0">
                    {fixture.isCompleted ? (
                      <span className="text-forest-800">{fixture.scoreA} : {fixture.scoreB}</span>
                    ) : (
                      <span className="text-stone-400 text-xs">VS</span>
                    )}
                  </div>

                  {/* Player B */}
                  <div className="flex items-center justify-end gap-2.5 flex-1 min-w-0">
                    <span className="font-semibold text-xs text-charcoal truncate">
                      {fixture.playerB.displayName}
                    </span>
                    <PlayerAvatar name={fixture.playerB.displayName} avatarUrl={fixture.playerB.avatar} size="xs" />
                  </div>
                </div>

                {/* Fixture Action Button */}
                {!fixture.isCompleted && (
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleSimulateFixture(fixture.id)}
                      className="px-2.5 py-1 text-xs font-semibold text-forest-700 hover:bg-forest-100 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3 text-gold" />
                      <span>Simulate Result</span>
                    </button>

                    {isUserFixture && (
                      <button
                        onClick={() => navigate(`/matches/FTB-LEAGUE-${fixture.id}`)}
                        className="px-3 py-1 bg-forest-600 hover:bg-forest-700 text-surface text-xs font-semibold rounded-lg shadow-subtle flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Launch Match</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
