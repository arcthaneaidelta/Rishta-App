import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Tournament } from '../types';
import { SimulatedCheckoutModal } from '../components/SimulatedCheckoutModal';
import { StatusBadge } from '../components/StatusBadge';
import { Trophy, Users, Calendar, DollarSign, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TournamentsPage: React.FC = () => {
  const { tournaments, currentUser } = useAppStore();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'registration_open' | 'upcoming'>('all');
  const [checkoutTournament, setCheckoutTournament] = useState<Tournament | null>(null);
  const navigate = useNavigate();

  const filteredTournaments = tournaments.filter((t) => {
    if (activeTab === 'all') return true;
    return t.status === activeTab;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full mb-2">
            <Trophy className="w-3.5 h-3.5 text-gold" />
            Sanctioned Federation Events
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
            Tournaments & Championship Cups
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Compete in premier knockout brackets, test tactical stamina, and contest global prize pools.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-forest-600 text-surface shadow-subtle'
              : 'bg-surface border border-stone-200 text-charcoal hover:bg-stone-50'
          }`}
        >
          All Tournaments ({tournaments.length})
        </button>

        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'active'
              ? 'bg-forest-600 text-surface shadow-subtle'
              : 'bg-surface border border-stone-200 text-charcoal hover:bg-stone-50'
          }`}
        >
          In Progress ({tournaments.filter((t) => t.status === 'active').length})
        </button>

        <button
          onClick={() => setActiveTab('registration_open')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'registration_open'
              ? 'bg-forest-600 text-surface shadow-subtle'
              : 'bg-surface border border-stone-200 text-charcoal hover:bg-stone-50'
          }`}
        >
          Registration Open ({tournaments.filter((t) => t.status === 'registration_open').length})
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'upcoming'
              ? 'bg-forest-600 text-surface shadow-subtle'
              : 'bg-surface border border-stone-200 text-charcoal hover:bg-stone-50'
          }`}
        >
          Upcoming ({tournaments.filter((t) => t.status === 'upcoming').length})
        </button>
      </div>

      {/* Tournament Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTournaments.map((tourn) => {
          const isRegistered = tourn.participants.some((p) => p.id === currentUser.id);

          return (
            <div
              key={tourn.id}
              className="bg-surface rounded-panel overflow-hidden border border-stone-200/90 shadow-card hover:border-forest-300 hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              {/* Artwork Banner */}
              <div
                onClick={() => navigate(`/tournaments/${tourn.id}`)}
                className="relative h-44 bg-stone-900 cursor-pointer overflow-hidden group"
              >
                <img
                  src={tourn.bannerImage}
                  alt={tourn.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

                <div className="absolute top-3 right-3">
                  <StatusBadge status={tourn.status} size="sm" />
                </div>

                <div className="absolute bottom-3 left-4">
                  <span className="text-[10px] uppercase font-bold text-gold tracking-widest">
                    {tourn.type}
                  </span>
                  <h3 className="font-display font-bold text-base text-surface">
                    {tourn.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed">
                  {tourn.description}
                </p>

                {/* Key Meta row */}
                <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-card bg-stone-50 border border-stone-100 text-xs text-center">
                  <div>
                    <span className="text-[10px] text-charcoal-muted uppercase block">Entry</span>
                    <strong className="text-charcoal font-semibold">
                      {tourn.entryFee === 0 ? 'Free' : `$${tourn.entryFee.toFixed(2)}`}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-charcoal-muted uppercase block">Slots</span>
                    <strong className="text-charcoal font-semibold">
                      {tourn.participants.length} / {tourn.maxParticipants}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-charcoal-muted uppercase block">Prize Pool</span>
                    <strong className="text-forest-700 font-bold">
                      ${tourn.prizePool.toLocaleString()}
                    </strong>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/tournaments/${tourn.id}`)}
                    className="flex-1 py-2.5 rounded-xl border border-stone-200 bg-surface hover:bg-stone-50 text-charcoal text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Bracket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {tourn.status === 'registration_open' && !isRegistered && (
                    <button
                      onClick={() => setCheckoutTournament(tourn)}
                      className="flex-1 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface text-xs font-semibold shadow-subtle transition-all"
                    >
                      Join Tournament
                    </button>
                  )}

                  {isRegistered && (
                    <span className="px-3 py-2 text-xs font-semibold text-forest-700 bg-forest-50 rounded-xl flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Registered</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Modal */}
      {checkoutTournament && (
        <SimulatedCheckoutModal
          isOpen={!!checkoutTournament}
          onClose={() => setCheckoutTournament(null)}
          tournament={checkoutTournament}
        />
      )}
    </div>
  );
};
