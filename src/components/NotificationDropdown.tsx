import React from 'react';
import { useAppStore } from '../store';
import { Bell, CheckCheck, ExternalLink, Swords, Trophy, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose
}) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, respondToChallenge } = useAppStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleAction = (notif: typeof notifications[0]) => {
    markNotificationRead(notif.id);
    if (notif.link) {
      navigate(notif.link);
      onClose();
    }
  };

  const handleAcceptChallenge = (e: React.MouseEvent, notif: typeof notifications[0]) => {
    e.stopPropagation();
    if (notif.challengeId) {
      const matchId = respondToChallenge(notif.challengeId, 'accept');
      markNotificationRead(notif.id);
      onClose();
      if (matchId) {
        navigate(`/matches/${matchId}`);
      }
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface text-charcoal rounded-panel shadow-modal border border-stone-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
      {/* Header */}
      <div className="px-4 py-3 bg-stone-50 border-b border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-forest-700" />
          <h4 className="font-display font-bold text-sm text-charcoal">
            Notifications
          </h4>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="text-[11px] font-semibold text-forest-700 hover:text-forest-800 flex items-center gap-1 transition-colors"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Mark all read</span>
        </button>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-charcoal-muted">
            No notifications at this time.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleAction(n)}
              className={`p-3.5 hover:bg-stone-50 cursor-pointer transition-colors flex items-start gap-3 ${
                !n.isRead ? 'bg-forest-50/40' : ''
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {n.type === 'challenge' ? (
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Swords className="w-3.5 h-3.5" />
                  </div>
                ) : n.type === 'tournament' ? (
                  <div className="w-7 h-7 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center">
                    <Trophy className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="font-semibold text-xs text-charcoal truncate">
                    {n.title}
                  </h5>
                  <span className="text-[10px] text-charcoal-muted shrink-0">
                    {n.date}
                  </span>
                </div>
                <p className="text-[11px] text-charcoal-muted mt-0.5 leading-relaxed line-clamp-2">
                  {n.message}
                </p>

                {/* Inline challenge accept action */}
                {n.type === 'challenge' && n.challengeId && !n.isRead && (
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={(e) => handleAcceptChallenge(e, n)}
                      className="px-2.5 py-1 rounded bg-forest-600 hover:bg-forest-700 text-surface text-[10px] font-semibold transition-colors"
                    >
                      Accept & Launch Match
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-stone-50 border-t border-stone-100 text-center">
        <Link
          to="/notifications"
          onClick={onClose}
          className="text-xs font-semibold text-forest-700 hover:text-forest-800"
        >
          View All Notifications Center
        </Link>
      </div>
    </div>
  );
};
