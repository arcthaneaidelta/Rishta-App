import React, { useState } from 'react';
import { useAppStore } from '../store';
import { PlayerAvatar } from '../components/PlayerAvatar';
import { StatusBadge } from '../components/StatusBadge';
import { Swords, Check, X, Play, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ChallengesPage: React.FC = () => {
  const { challenges, currentUser, respondToChallenge } = useAppStore();
  const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing' | 'accepted'>('incoming');
  const navigate = useNavigate();

  const incoming = challenges.filter(
    (c) => c.receiverId === currentUser.id && c.status === 'pending'
  );

  const outgoing = challenges.filter(
    (c) => c.senderId === currentUser.id && c.status === 'pending'
  );

  const accepted = challenges.filter((c) => c.status === 'accepted');

  const handleAccept = (challengeId: string) => {
    const matchId = respondToChallenge(challengeId, 'accept');
    if (matchId) {
      navigate(`/matches/${matchId}`);
    }
  };

  const handleDecline = (challengeId: string) => {
    respondToChallenge(challengeId, 'decline');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full mb-2">
            <Swords className="w-3.5 h-3.5 text-gold" />
            Federation Match Hub
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
            Challenge Management
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Accept pending duels, track outgoing requests, and launch sanctioned match environments.
          </p>
        </div>

        <button
          onClick={() => navigate('/play')}
          className="px-4 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface text-xs font-semibold shadow-subtle transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Swords className="w-3.5 h-3.5" />
          <span>New Challenge</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200">
        <button
          onClick={() => setActiveTab('incoming')}
          className={`py-3 px-5 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'incoming'
              ? 'border-forest-600 text-forest-800'
              : 'border-transparent text-charcoal-muted hover:text-charcoal'
          }`}
        >
          <span>Incoming Requests</span>
          {incoming.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-forest-950 font-bold">
              {incoming.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('outgoing')}
          className={`py-3 px-5 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'outgoing'
              ? 'border-forest-600 text-forest-800'
              : 'border-transparent text-charcoal-muted hover:text-charcoal'
          }`}
        >
          <span>Outgoing Sent</span>
          <span className="text-[11px] text-charcoal-muted">({outgoing.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('accepted')}
          className={`py-3 px-5 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'accepted'
              ? 'border-forest-600 text-forest-800'
              : 'border-transparent text-charcoal-muted hover:text-charcoal'
          }`}
        >
          <span>Accepted / Ready</span>
          <span className="text-[11px] text-charcoal-muted">({accepted.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'incoming' && (
        <div className="space-y-4">
          {incoming.length === 0 ? (
            <div className="bg-surface rounded-panel p-8 text-center border border-stone-200/90 text-charcoal-muted text-xs space-y-2">
              <CheckCircle2 className="w-8 h-8 text-forest-600 mx-auto opacity-70" />
              <p className="font-semibold text-charcoal">No pending incoming challenges</p>
              <p>When opponents issue a challenge, they will appear here with instant accept triggers.</p>
            </div>
          ) : (
            incoming.map((chal) => (
              <div
                key={chal.id}
                className="bg-surface rounded-panel p-5 border border-stone-200/90 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <PlayerAvatar name={chal.sender.displayName} avatarUrl={chal.sender.avatar} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-sm text-charcoal">
                        {chal.sender.displayName}
                      </h4>
                      <StatusBadge status={chal.matchType} size="sm" />
                    </div>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      {chal.sender.country} • Rating: {chal.sender.rating} Elo • Sent {chal.createdAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleDecline(chal.id)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-charcoal-muted hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Decline</span>
                  </button>

                  <button
                    onClick={() => handleAccept(chal.id)}
                    className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface text-xs font-semibold shadow-subtle transition-all flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept & Launch Match</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'outgoing' && (
        <div className="space-y-4">
          {outgoing.length === 0 ? (
            <div className="bg-surface rounded-panel p-8 text-center border border-stone-200/90 text-charcoal-muted text-xs space-y-2">
              <p className="font-semibold text-charcoal">No outgoing challenges currently pending</p>
              <p>Explore the player directory to find opponents and issue challenges.</p>
            </div>
          ) : (
            outgoing.map((chal) => (
              <div
                key={chal.id}
                className="bg-surface rounded-panel p-5 border border-stone-200/90 shadow-card flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <PlayerAvatar name={chal.receiver.displayName} avatarUrl={chal.receiver.avatar} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-sm text-charcoal">
                        {chal.receiver.displayName}
                      </h4>
                      <StatusBadge status="Pending Opponent Acceptance" size="sm" />
                    </div>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      {chal.receiver.country} • Rating: {chal.receiver.rating} Elo • Dispatched {chal.createdAt}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-medium text-charcoal-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Awaiting Response</span>
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'accepted' && (
        <div className="space-y-4">
          {accepted.length === 0 ? (
            <div className="bg-surface rounded-panel p-8 text-center border border-stone-200/90 text-charcoal-muted text-xs">
              No accepted matches ready to launch.
            </div>
          ) : (
            accepted.map((chal) => (
              <div
                key={chal.id}
                className="bg-surface rounded-panel p-5 border border-stone-200/90 shadow-card flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex -space-x-2">
                    <PlayerAvatar name={chal.sender.displayName} avatarUrl={chal.sender.avatar} size="sm" />
                    <PlayerAvatar name={chal.receiver.displayName} avatarUrl={chal.receiver.avatar} size="sm" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-sm text-charcoal">
                        {chal.sender.displayName} vs {chal.receiver.displayName}
                      </h4>
                      <StatusBadge status="Ready to Launch" size="sm" />
                    </div>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      Match ID: <strong className="font-mono text-forest-700">{chal.matchId || 'FTB-2026-LIVE'}</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/matches/${chal.matchId || 'FTB-2026-LIVE'}`)}
                  className="px-4 py-2 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface text-xs font-semibold shadow-subtle transition-all flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Enter Match Engine</span>
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
