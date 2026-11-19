import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Player, MatchType } from '../types';
import { PlayerAvatar } from '../components/PlayerAvatar';
import { Modal } from '../components/Modal';
import { Search, Swords, Trophy, Medal, CheckCircle2, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FriendlyMatchPage: React.FC = () => {
  const { players, currentUser, createChallenge } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [matchType, setMatchType] = useState<MatchType>('friendly');
  const [challengeSuccess, setChallengeSuccess] = useState(false);
  const navigate = useNavigate();

  // Filter other players
  const availableOpponents = players.filter(
    (p) => p.id !== currentUser.id && p.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendChallenge = () => {
    if (!selectedPlayer) return;
    createChallenge(selectedPlayer.id, matchType);
    setChallengeSuccess(true);
    setTimeout(() => {
      setChallengeSuccess(false);
      setSelectedPlayer(null);
      navigate('/challenges');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full mb-2">
            <Swords className="w-3.5 h-3.5 text-gold" />
            Matchmaking & Duels
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
            Friendly Match & Challenge Arena
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Discover verified Federation tacticians, inspect head-to-head stats, and issue match duels.
          </p>
        </div>

        <button
          onClick={() => navigate('/challenges')}
          className="px-4 py-2.5 rounded-xl border border-stone-200 bg-surface hover:bg-stone-50 text-xs font-semibold text-charcoal flex items-center gap-2 shadow-subtle transition-all self-start sm:self-auto"
        >
          <Swords className="w-4 h-4 text-forest-700" />
          <span>View Active Challenges</span>
        </button>
      </div>

      {/* Search & Discovery Toolbar */}
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

        <div className="flex items-center gap-2 text-xs text-charcoal-muted">
          <span>{availableOpponents.length} tacticians available online</span>
        </div>
      </div>

      {/* Opponent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableOpponents.map((opponent) => (
          <div
            key={opponent.id}
            className="bg-surface rounded-panel p-5 border border-stone-200/90 shadow-card hover:border-forest-300 hover:shadow-elevated transition-all flex flex-col justify-between space-y-4"
          >
            {/* Header: Avatar & Names */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <PlayerAvatar
                  name={opponent.displayName}
                  avatarUrl={opponent.avatar}
                  size="md"
                  showBadge
                />
                <div>
                  <h3 className="font-display font-bold text-sm text-charcoal">
                    {opponent.displayName}
                  </h3>
                  <span className="text-xs text-charcoal-muted">
                    {opponent.country}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-charcoal-muted uppercase block font-semibold">Elo Rating</span>
                <span className="font-mono font-bold text-sm text-forest-800 tabular-nums">
                  {opponent.rating}
                </span>
              </div>
            </div>

            {/* Tactical Style snippet */}
            <div className="text-[11px] text-charcoal-muted bg-stone-50 p-2.5 rounded-lg border border-stone-100">
              <span className="font-semibold text-charcoal block mb-0.5">Tactical Playstyle:</span>
              <span className="truncate block">{opponent.tacticalStyle || 'Dynamic Balanced Strategy'}</span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs py-1 border-y border-stone-100">
              <div>
                <span className="text-[10px] text-charcoal-muted uppercase block">Rank</span>
                <span className="font-semibold text-charcoal">#{opponent.rank}</span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-muted uppercase block">Matches</span>
                <span className="font-semibold text-charcoal">{opponent.matchesPlayed}</span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-muted uppercase block">Win Rate</span>
                <span className="font-semibold text-forest-700">{opponent.winRate}%</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setSelectedPlayer(opponent)}
              className="w-full py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface font-semibold text-xs shadow-subtle transition-all flex items-center justify-center gap-2"
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Challenge Tactician</span>
            </button>
          </div>
        ))}
      </div>

      {/* Challenge Player Modal */}
      {selectedPlayer && (
        <Modal
          isOpen={!!selectedPlayer}
          onClose={() => {
            if (!challengeSuccess) setSelectedPlayer(null);
          }}
          title="Issue Federation Match Challenge"
          description="Send a formal match request to this competitor"
          maxWidth="md"
        >
          {challengeSuccess ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-forest-100 text-forest-700 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-lg text-charcoal">
                Challenge Dispatched!
              </h4>
              <p className="text-xs text-charcoal-muted">
                {selectedPlayer.displayName} has been notified. Redirecting to your challenge management center...
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Opponent Card Preview */}
              <div className="bg-stone-50 rounded-card p-4 border border-stone-200/80 flex items-center gap-4">
                <PlayerAvatar name={selectedPlayer.displayName} avatarUrl={selectedPlayer.avatar} size="lg" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-base text-charcoal">
                    {selectedPlayer.displayName}
                  </h4>
                  <div className="text-xs text-charcoal-muted mt-0.5">
                    {selectedPlayer.country} • Elo {selectedPlayer.rating} • Global #{selectedPlayer.rank}
                  </div>
                  <div className="text-[11px] text-forest-700 font-medium mt-1">
                    {selectedPlayer.winRate}% win rate across {selectedPlayer.matchesPlayed} encounters
                  </div>
                </div>
              </div>

              {/* Match Type Selection */}
              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
                  Select Match Sanction Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMatchType('friendly')}
                    className={`p-3 rounded-card border text-left text-xs transition-all ${
                      matchType === 'friendly'
                        ? 'border-forest-600 bg-forest-50/70 text-forest-900 ring-1 ring-forest-600'
                        : 'border-stone-200 bg-surface text-charcoal hover:border-stone-300'
                    }`}
                  >
                    <div className="font-bold">Friendly Duel</div>
                    <div className="text-[10px] text-charcoal-muted mt-0.5">Unranked exhibition, no Elo risk</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMatchType('ranked')}
                    className={`p-3 rounded-card border text-left text-xs transition-all ${
                      matchType === 'ranked'
                        ? 'border-forest-600 bg-forest-50/70 text-forest-900 ring-1 ring-forest-600'
                        : 'border-stone-200 bg-surface text-charcoal hover:border-stone-300'
                    }`}
                  >
                    <div className="font-bold">Ranked Ladder Duel</div>
                    <div className="text-[10px] text-charcoal-muted mt-0.5">Sanctioned Elo recalculation (K=32)</div>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlayer(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal-muted hover:text-charcoal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSendChallenge}
                  className="px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface font-semibold text-xs shadow-subtle transition-all flex items-center gap-2"
                >
                  <Swords className="w-3.5 h-3.5" />
                  <span>Send Challenge Request</span>
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};
