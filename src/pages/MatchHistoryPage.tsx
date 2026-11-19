import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Match, MatchType } from '../types';
import { PlayerAvatar } from '../components/PlayerAvatar';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { History, Search, Filter, Trophy, ArrowUpDown, ChevronRight } from 'lucide-react';

export const MatchHistoryPage: React.FC = () => {
  const { matches, currentUser } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Filter matches involving user or all demo matches
  const userMatches = matches.filter(
    (m) => m.playerAId === currentUser.id || m.playerBId === currentUser.id
  );

  const winsCount = userMatches.filter(
    (m) => (m.playerAId === currentUser.id && m.scoreA > m.scoreB) || (m.playerBId === currentUser.id && m.scoreB > m.scoreA)
  ).length;

  const drawsCount = userMatches.filter((m) => m.scoreA === m.scoreB && m.status === 'completed').length;
  const lossesCount = userMatches.filter(
    (m) => (m.playerAId === currentUser.id && m.scoreA < m.scoreB) || (m.playerBId === currentUser.id && m.scoreB < m.scoreA)
  ).length;

  const filteredMatches = userMatches.filter((m) => {
    const opp = m.playerAId === currentUser.id ? m.playerB : m.playerA;
    const matchesSearch = opp.displayName.toLowerCase().includes(searchTerm.toLowerCase()) || m.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || m.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full mb-2">
          <History className="w-3.5 h-3.5 text-gold" />
          Official Match Ledger
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
          Match History & Dossiers
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
          Archived performance records, scorelines, and verified Elo adjustments.
        </p>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-surface rounded-card p-4 border border-stone-200/90 shadow-card">
          <span className="text-[10px] uppercase font-bold text-charcoal-muted block">Total Logged</span>
          <span className="font-display font-bold text-2xl text-charcoal tabular-nums">{userMatches.length}</span>
        </div>
        <div className="bg-surface rounded-card p-4 border border-stone-200/90 shadow-card">
          <span className="text-[10px] uppercase font-bold text-forest-700 block">Victories</span>
          <span className="font-display font-bold text-2xl text-forest-800 tabular-nums">{winsCount}</span>
        </div>
        <div className="bg-surface rounded-card p-4 border border-stone-200/90 shadow-card">
          <span className="text-[10px] uppercase font-bold text-amber-700 block">Draws</span>
          <span className="font-display font-bold text-2xl text-amber-800 tabular-nums">{drawsCount}</span>
        </div>
        <div className="bg-surface rounded-card p-4 border border-stone-200/90 shadow-card">
          <span className="text-[10px] uppercase font-bold text-red-700 block">Defeats</span>
          <span className="font-display font-bold text-2xl text-red-800 tabular-nums">{lossesCount}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface p-4 rounded-panel border border-stone-200/90 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search opponent or Match ID..."
            className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-600"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'ranked', 'tournament', 'league', 'friendly'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                filterType === type
                  ? 'bg-forest-600 text-surface shadow-subtle'
                  : 'bg-warm-bg text-charcoal border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Matches Table */}
      <div className="bg-surface rounded-panel border border-stone-200/90 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-charcoal-muted uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Match ID</th>
                <th className="py-3 px-4">Opponent</th>
                <th className="py-3 px-4">Competition</th>
                <th className="py-3 px-4 text-center">Type</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4 text-center">Result</th>
                <th className="py-3 px-4 text-center">Elo Change</th>
                <th className="py-3 px-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredMatches.map((m) => {
                const opponent = m.playerAId === currentUser.id ? m.playerB : m.playerA;
                const isUserA = m.playerAId === currentUser.id;
                const userScore = isUserA ? m.scoreA : m.scoreB;
                const oppScore = isUserA ? m.scoreB : m.scoreA;
                const userDelta = isUserA ? m.ratingChangeA : m.ratingChangeB;

                let badge = 'Draw';
                if (userScore > oppScore) badge = 'Win';
                else if (userScore < oppScore) badge = 'Loss';

                return (
                  <tr
                    key={m.id}
                    onClick={() => setSelectedMatch(m)}
                    className="hover:bg-forest-50/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-medium text-forest-700">
                      {m.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <PlayerAvatar name={opponent.displayName} avatarUrl={opponent.avatar} size="xs" />
                        <span className="font-semibold text-charcoal">{opponent.displayName}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-charcoal-muted truncate max-w-[140px]">
                      {m.competitionName}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="capitalize text-charcoal-muted font-medium">{m.type}</span>
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono font-bold text-sm text-charcoal">
                      {userScore} – {oppScore}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge status={badge} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono font-semibold">
                      {userDelta > 0 ? (
                        <span className="text-forest-700">+{userDelta}</span>
                      ) : userDelta < 0 ? (
                        <span className="text-red-700">{userDelta}</span>
                      ) : (
                        <span className="text-stone-400">0</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right text-charcoal-muted font-mono text-[11px]">
                      {m.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Match Detail Modal */}
      {selectedMatch && (
        <Modal
          isOpen={!!selectedMatch}
          onClose={() => setSelectedMatch(null)}
          title={`Match Dossier — ${selectedMatch.id}`}
          description={`${selectedMatch.competitionName} • ${selectedMatch.stage || selectedMatch.type}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
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
                <span className="block text-[10px] text-charcoal-muted uppercase mt-1">Full-Time</span>
              </div>

              <div className="flex-1">
                <PlayerAvatar name={selectedMatch.playerB.displayName} avatarUrl={selectedMatch.playerB.avatar} size="md" className="mx-auto mb-1.5" />
                <div className="font-display font-bold text-charcoal">{selectedMatch.playerB.displayName}</div>
                <div className="text-[11px] text-charcoal-muted">{selectedMatch.playerB.country}</div>
              </div>
            </div>

            {selectedMatch.events && selectedMatch.events.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="font-semibold text-charcoal uppercase tracking-wider text-[11px]">Simulated Events</span>
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
