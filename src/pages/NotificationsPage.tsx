import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Bell, CheckCheck, Swords, Trophy, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, respondToChallenge } = useAppStore();
  const [filter, setFilter] = useState<string>('all');
  const navigate = useNavigate();

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const handleAction = (notif: typeof notifications[0]) => {
    markNotificationRead(notif.id);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const handleAcceptChallenge = (notif: typeof notifications[0]) => {
    if (notif.challengeId) {
      const matchId = respondToChallenge(notif.challengeId, 'accept');
      markNotificationRead(notif.id);
      if (matchId) {
        navigate(`/matches/${matchId}`);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full mb-2">
            <Bell className="w-3.5 h-3.5 text-gold" />
            Federation Dispatches
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
            Notification Center
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Real-time match alerts, incoming challenges, and tournament scheduling notices.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-4 py-2 rounded-xl border border-stone-200 bg-surface hover:bg-stone-50 text-xs font-semibold text-charcoal flex items-center gap-2 self-start sm:self-auto shadow-subtle"
        >
          <CheckCheck className="w-4 h-4 text-forest-700" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        {['all', 'challenge', 'match_result', 'tournament', 'system'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
              filter === f
                ? 'bg-forest-600 text-surface shadow-subtle'
                : 'bg-surface border border-stone-200 text-charcoal hover:bg-stone-50'
            }`}
          >
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-surface rounded-panel border border-stone-200/90 shadow-card divide-y divide-stone-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-charcoal-muted">
            No notifications in this category.
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => handleAction(n)}
              className={`p-5 hover:bg-stone-50 cursor-pointer transition-colors flex items-start justify-between gap-4 ${
                !n.isRead ? 'bg-forest-50/40' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 shrink-0">
                  {n.type === 'challenge' ? (
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Swords className="w-4 h-4" />
                    </div>
                  ) : n.type === 'tournament' ? (
                    <div className="w-9 h-9 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                      <Trophy className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-bold text-sm text-charcoal">
                      {n.title}
                    </h4>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-forest-600" />
                    )}
                  </div>
                  <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                    {n.message}
                  </p>
                  <span className="text-[10px] text-charcoal-light mt-1.5 block">
                    {n.date}
                  </span>

                  {/* Challenge Action Button */}
                  {n.type === 'challenge' && n.challengeId && !n.isRead && (
                    <div className="mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcceptChallenge(n);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface text-xs font-semibold shadow-subtle flex items-center gap-1.5"
                      >
                        <Swords className="w-3.5 h-3.5" />
                        <span>Accept & Launch Match</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {n.link && (
                <div className="text-stone-400 hover:text-charcoal shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
