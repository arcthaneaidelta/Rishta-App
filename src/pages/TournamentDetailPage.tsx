import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { KnockoutBracket } from '../components/KnockoutBracket';
import { PlayerAvatar } from '../components/PlayerAvatar';
import { StatusBadge } from '../components/StatusBadge';
import { SimulatedCheckoutModal } from '../components/SimulatedCheckoutModal';
import {
  Trophy,
  Calendar,
  Users,
  DollarSign,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award
} from 'lucide-react';

export const TournamentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tournaments, currentUser } = useAppStore();

  const tournament = tournaments.find((t) => t.id === id || t.slug === id) || tournaments[0];
  const [activeTab, setActiveTab] = useState<'bracket' | 'overview' | 'participants'>('bracket');
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const isRegistered = tournament.participants.some((p) => p.id === currentUser.id);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Back to Tournaments */}
      <button
        onClick={() => navigate('/tournaments')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-muted hover:text-charcoal transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Tournaments</span>
      </button>

      {/* Tournament Hero Header */}
      <div className="relative rounded-panel overflow-hidden border border-stone-200 shadow-card bg-stone-900 text-surface">
        <div className="h-60 sm:h-72 w-full relative">
          <img
            src={tournament.bannerImage}
            alt={tournament.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold text-forest-950 shadow-subtle">
              {tournament.type}
            </span>
            <StatusBadge status={tournament.status} size="md" />
          </div>

          {/* Bottom Title & Details */}
          <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-gold block">
                Sanctioned Federation Knockout
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-surface mt-1">
                {tournament.name}
              </h1>
              <p className="text-xs text-stone-300 max-w-xl mt-1">
                {tournament.description}
              </p>
            </div>

            {/* Join or Registered CTA */}
            {tournament.status === 'registration_open' && !isRegistered ? (
              <button
                onClick={() => setCheckoutOpen(true)}
                className="px-6 py-3 rounded-xl bg-forest-500 hover:bg-forest-400 text-surface font-display font-bold text-xs tracking-wider shadow-elevated transition-all shrink-0"
              >
                JOIN TOURNAMENT (${tournament.entryFee.toFixed(2)})
              </button>
            ) : isRegistered ? (
              <div className="px-4 py-2.5 rounded-xl bg-forest-800/90 border border-forest-600 text-gold text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>You are Registered</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Quick Meta Footer Strip */}
        <div className="bg-forest-950/95 border-t border-forest-900/80 px-6 py-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-stone-400 text-[10px] uppercase block">Format</span>
            <span className="font-semibold text-stone-200">{tournament.type} Elimination</span>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] uppercase block">Prize Pool</span>
            <span className="font-bold text-gold">${tournament.prizePool.toLocaleString()} USD</span>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] uppercase block">Registrations</span>
            <span className="font-semibold text-stone-200">
              {tournament.participants.length} / {tournament.maxParticipants} Competitors
            </span>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] uppercase block">Start Date</span>
            <span className="font-mono text-stone-200">{tournament.startDate}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200">
        <button
          onClick={() => setActiveTab('bracket')}
          className={`py-3 px-6 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'bracket'
              ? 'border-forest-600 text-forest-800'
              : 'border-transparent text-charcoal-muted hover:text-charcoal'
          }`}
        >
          Knockout Bracket
        </button>

        <button
          onClick={() => setActiveTab('participants')}
          className={`py-3 px-6 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'participants'
              ? 'border-forest-600 text-forest-800'
              : 'border-transparent text-charcoal-muted hover:text-charcoal'
          }`}
        >
          Participants ({tournament.participants.length})
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-6 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'overview'
              ? 'border-forest-600 text-forest-800'
              : 'border-transparent text-charcoal-muted hover:text-charcoal'
          }`}
        >
          Tournament Rules & Overview
        </button>
      </div>

      {/* Bracket Tab */}
      {activeTab === 'bracket' && (
        <div className="space-y-4">
          <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-base text-charcoal">
                  Official Single Elimination Bracket
                </h3>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Click 'Simulate' or 'Launch Match' to progress winners through Quarter-Finals, Semi-Finals, and Championship Final.
                </p>
              </div>
            </div>

            <KnockoutBracket
              tournamentId={tournament.id}
              bracket={tournament.bracket}
              champion={tournament.champion}
            />
          </div>
        </div>
      )}

      {/* Participants Tab */}
      {activeTab === 'participants' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tournament.participants.map((player, idx) => (
            <div
              key={player.id}
              className="bg-surface rounded-panel p-4 border border-stone-200/90 shadow-card flex items-center gap-3"
            >
              <PlayerAvatar name={player.displayName} avatarUrl={player.avatar} size="md" />
              <div className="min-w-0">
                <div className="font-display font-bold text-xs text-charcoal truncate">
                  {player.displayName}
                </div>
                <div className="text-[11px] text-charcoal-muted truncate">
                  {player.country} • {player.rating} Elo
                </div>
                {player.id === currentUser.id && (
                  <span className="inline-block text-[9px] bg-forest-600 text-surface px-1.5 py-0.2 rounded font-bold uppercase mt-1">
                    Your Profile
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card space-y-4 text-xs text-charcoal leading-relaxed max-w-3xl">
          <h3 className="font-display font-bold text-base text-charcoal">
            Sanctioned Regulations & Fair Play
          </h3>
          <p className="text-charcoal-muted">
            All matches in the {tournament.name} are adjudicated under Federation Standard Regulations.
            Competitors must report to their match session within 15 minutes of fixture scheduling.
          </p>
          <div className="p-4 bg-stone-50 rounded-card border border-stone-200 space-y-2">
            <h4 className="font-semibold text-charcoal">Tiebreaker Mechanics</h4>
            <p className="text-charcoal-muted">
              In the event of a draw at the end of regulation tactical phases, a sudden-death golden goal simulation is initiated automatically.
            </p>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutOpen && (
        <SimulatedCheckoutModal
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          tournament={tournament}
        />
      )}
    </div>
  );
};
