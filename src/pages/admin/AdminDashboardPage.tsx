import React from 'react';
import { useAppStore } from '../../store';
import { StatsCard } from '../../components/StatsCard';
import { PlayerAvatar } from '../../components/PlayerAvatar';
import { StatusBadge } from '../../components/StatusBadge';
import {
  ShieldAlert,
  Users,
  Swords,
  Trophy,
  TableProperties,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  const { players, matches, tournaments, league, payments, challenges, resetDemoData } = useAppStore();
  const navigate = useNavigate();

  const totalPlayers = players.length;
  const activePlayers = players.filter((p) => p.status === 'active').length;
  const totalMatches = matches.length;
  const activeTournaments = tournaments.filter((t) => t.status === 'active').length;
  const pendingPayments = payments.filter((p) => p.status === 'Pending').length;
  const totalRevenue = payments
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Admin Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100 px-3 py-1 rounded-full mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-gold" />
            Federation High Command
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
            Administration & Operations Console
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Real-time management of competitor profiles, authoritative match arbitration, tournaments, and payment ledgers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/tournaments"
            className="px-4 py-2 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface text-xs font-semibold shadow-subtle transition-all"
          >
            Create Tournament
          </Link>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          label="Registered Tacticians"
          value={totalPlayers}
          subvalue={`${activePlayers} active in ladder`}
          icon={Users}
        />
        <StatsCard
          label="Federation Matches"
          value={totalMatches}
          subvalue="Server Authoritative"
          icon={Swords}
        />
        <StatsCard
          label="Active Competitions"
          value={activeTournaments + 1}
          subvalue="World Cup & Premier Div"
          icon={Trophy}
        />
        <StatsCard
          label="Processed Entries"
          value={`$${totalRevenue.toFixed(2)}`}
          subvalue="Simulated Sandbox"
          icon={Layers}
        />
      </div>

      {/* Admin Quick Nav Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <Link
          to="/admin/users"
          className="p-4 bg-surface rounded-card border border-stone-200/90 shadow-card hover:border-forest-300 hover:bg-forest-50/30 transition-all text-center space-y-1"
        >
          <Users className="w-5 h-5 text-forest-700 mx-auto" />
          <div className="font-display font-bold text-xs text-charcoal">User Control</div>
          <div className="text-[10px] text-charcoal-muted">{players.length} Accounts</div>
        </Link>

        <Link
          to="/admin/matches"
          className="p-4 bg-surface rounded-card border border-stone-200/90 shadow-card hover:border-forest-300 hover:bg-forest-50/30 transition-all text-center space-y-1"
        >
          <Swords className="w-5 h-5 text-forest-700 mx-auto" />
          <div className="font-display font-bold text-xs text-charcoal">Matches</div>
          <div className="text-[10px] text-charcoal-muted">{matches.length} Records</div>
        </Link>

        <Link
          to="/admin/tournaments"
          className="p-4 bg-surface rounded-card border border-stone-200/90 shadow-card hover:border-forest-300 hover:bg-forest-50/30 transition-all text-center space-y-1"
        >
          <Trophy className="w-5 h-5 text-forest-700 mx-auto" />
          <div className="font-display font-bold text-xs text-charcoal">Tournaments</div>
          <div className="text-[10px] text-charcoal-muted">{tournaments.length} Cups</div>
        </Link>

        <Link
          to="/admin/leagues"
          className="p-4 bg-surface rounded-card border border-stone-200/90 shadow-card hover:border-forest-300 hover:bg-forest-50/30 transition-all text-center space-y-1"
        >
          <TableProperties className="w-5 h-5 text-forest-700 mx-auto" />
          <div className="font-display font-bold text-xs text-charcoal">League Ops</div>
          <div className="text-[10px] text-charcoal-muted">Season 4 Active</div>
        </Link>

        <Link
          to="/admin/payments"
          className="p-4 bg-surface rounded-card border border-stone-200/90 shadow-card hover:border-forest-300 hover:bg-forest-50/30 transition-all text-center space-y-1"
        >
          <Layers className="w-5 h-5 text-forest-700 mx-auto" />
          <div className="font-display font-bold text-xs text-charcoal">Payments</div>
          <div className="text-[10px] text-charcoal-muted">{payments.length} Transactions</div>
        </Link>
      </div>

      {/* Two Column Section: Recent Matches Audit & Pending Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Matches Audit */}
        <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-charcoal">
              Authoritative Match Ingestion Audit
            </h3>
            <Link to="/admin/matches" className="text-xs font-semibold text-forest-700 hover:text-forest-800">
              Manage Matches
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {matches.slice(0, 4).map((m) => (
              <div key={m.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-mono text-[11px] font-semibold text-forest-700">{m.id}</div>
                  <div className="font-semibold text-charcoal mt-0.5">
                    {m.playerA.displayName} ({m.scoreA}) vs {m.playerB.displayName} ({m.scoreB})
                  </div>
                  <div className="text-[10px] text-charcoal-muted">{m.competitionName}</div>
                </div>
                <div className="text-right">
                  <StatusBadge status={m.status} size="sm" />
                  <span className="block text-[10px] text-charcoal-muted font-mono mt-1">{m.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Sanction Status */}
        <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-charcoal">
              Player Account Status & Compliance
            </h3>
            <Link to="/admin/users" className="text-xs font-semibold text-forest-700 hover:text-forest-800">
              View All Players
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {players.slice(0, 4).map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <PlayerAvatar name={p.displayName} avatarUrl={p.avatar} size="xs" />
                  <div>
                    <div className="font-semibold text-charcoal">{p.displayName}</div>
                    <div className="text-[10px] text-charcoal-muted">{p.country} • {p.rating} Elo</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge status={p.status} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
