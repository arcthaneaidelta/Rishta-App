import React, { useState } from 'react';
import { useAppStore } from '../store';
import { PlayerAvatar } from '../components/PlayerAvatar';
import { Medal, Search, Globe, Trophy, ArrowUpDown, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RankingsPage: React.FC = () => {
  const { players, currentUser } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const navigate = useNavigate();

  // Extract unique countries
  const countries = ['All', ...Array.from(new Set(players.map((p) => p.country)))];

  // Sorted by rating descending
  const sortedPlayers = [...players].sort((a, b) => b.rating - a.rating);

  const filteredPlayers = sortedPlayers.filter((p) => {
    const matchesSearch = p.displayName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || p.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const highestRating = sortedPlayers[0]?.rating || 1620;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 13.1 Rankings Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full mb-2">
            <Medal className="w-3.5 h-3.5 text-gold" />
            Federation World Standings
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
            Global Elo Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Real-time Elo rating recalibrations calculated with Federation K-factor = 32.
          </p>
        </div>
      </div>

      {/* Top Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-surface rounded-card p-4 border border-stone-200/90 shadow-card">
          <span className="text-[10px] uppercase font-bold text-charcoal-muted block">Total Ranked Players</span>
          <span className="font-display font-bold text-2xl text-charcoal tabular-nums">{players.length * 150}+</span>
        </div>
        <div className="bg-surface rounded-card p-4 border border-stone-200/90 shadow-card">
          <span className="text-[10px] uppercase font-bold text-forest-700 block">Your Global Standing</span>
          <span className="font-display font-bold text-2xl text-forest-800 tabular-nums">#{currentUser.rank}</span>
        </div>
        <div className="bg-surface rounded-card p-4 border border-stone-200/90 shadow-card">
          <span className="text-[10px] uppercase font-bold text-gold block">Apex Rating</span>
          <span className="font-display font-bold text-2xl text-gold-dark tabular-nums">{highestRating} Elo</span>
        </div>
        <div className="bg-surface rounded-card p-4 border border-stone-200/90 shadow-card">
          <span className="text-[10px] uppercase font-bold text-charcoal-muted block">Starting Baseline</span>
          <span className="font-display font-bold text-2xl text-charcoal tabular-nums">1,000 Elo</span>
        </div>
      </div>

      {/* Search and Country Filter */}
      <div className="bg-surface p-4 rounded-panel border border-stone-200/90 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tactician by name..."
            className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Globe className="w-4 h-4 text-stone-400 shrink-0" />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="text-xs bg-warm-bg border border-stone-200 rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/20 cursor-pointer w-full sm:w-auto"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Countries' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 13.2 Leaderboard Table */}
      <div className="bg-surface rounded-panel border border-stone-200/90 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-charcoal-muted uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4 w-16 text-center">Rank</th>
                <th className="py-3 px-4">Tactician</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4 text-center font-bold text-forest-900">Rating (Elo)</th>
                <th className="py-3 px-4 text-center">Played</th>
                <th className="py-3 px-4 text-center">W</th>
                <th className="py-3 px-4 text-center">D</th>
                <th className="py-3 px-4 text-center">L</th>
                <th className="py-3 px-4 text-right">Win Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredPlayers.map((player, idx) => {
                const isCurrentUser = player.id === currentUser.id;
                return (
                  <tr
                    key={player.id}
                    onClick={() => navigate(`/players/${player.id}`)}
                    className={`hover:bg-forest-50/50 cursor-pointer transition-colors ${
                      isCurrentUser ? 'bg-forest-50/70 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center font-display font-bold text-charcoal">
                      {idx === 0 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gold/25 text-forest-950 font-black text-xs">
                          1
                        </span>
                      ) : idx === 1 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-stone-200 text-charcoal font-black text-xs">
                          2
                        </span>
                      ) : idx === 2 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-black text-xs">
                          3
                        </span>
                      ) : (
                        `#${idx + 1}`
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <PlayerAvatar name={player.displayName} avatarUrl={player.avatar} size="xs" />
                        <span className="font-semibold text-charcoal">{player.displayName}</span>
                        {isCurrentUser && (
                          <span className="text-[9px] bg-forest-600 text-surface px-1.5 py-0.2 rounded font-bold uppercase">
                            You
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-charcoal-muted">
                      {player.country}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono font-bold text-sm text-forest-800 tabular-nums">
                      {player.rating}
                    </td>

                    <td className="py-3.5 px-4 text-center tabular-nums text-charcoal font-medium">
                      {player.matchesPlayed}
                    </td>

                    <td className="py-3.5 px-4 text-center tabular-nums text-forest-700 font-medium">
                      {player.wins}
                    </td>

                    <td className="py-3.5 px-4 text-center tabular-nums text-amber-700">
                      {player.draws}
                    </td>

                    <td className="py-3.5 px-4 text-center tabular-nums text-red-700">
                      {player.losses}
                    </td>

                    <td className="py-3.5 px-4 text-right tabular-nums font-semibold text-charcoal">
                      {player.winRate}%
                    </td>
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
