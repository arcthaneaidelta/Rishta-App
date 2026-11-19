import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { PlayerAvatar } from '../../components/PlayerAvatar';
import { StatusBadge } from '../../components/StatusBadge';
import { Users, Search, Ban, CheckCircle, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const AdminUsersPage: React.FC = () => {
  const { players, suspendUser, reactivateUser } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const navigate = useNavigate();

  const filtered = players.filter((p) => {
    const matchesSearch =
      p.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100 px-3 py-1 rounded-full mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-gold" />
            Federation High Command
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
            Tactician & User Management
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Administer verified player accounts, audit fair-play compliance, and manage sanction suspensions.
          </p>
        </div>

        <Link
          to="/admin"
          className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-charcoal hover:bg-stone-50 self-start sm:self-auto"
        >
          Back to Admin Dashboard
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-surface p-4 rounded-panel border border-stone-200/90 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by player, email or country..."
            className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-600"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'active', 'suspended'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                statusFilter === st
                  ? 'bg-forest-600 text-surface shadow-subtle'
                  : 'bg-warm-bg text-charcoal border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-panel border border-stone-200/90 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-charcoal-muted uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4 text-center">Elo Rating</th>
                <th className="py-3 px-4 text-center">Matches</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-forest-50/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <PlayerAvatar name={p.displayName} avatarUrl={p.avatar} size="xs" />
                      <div>
                        <div className="font-semibold text-charcoal">{p.displayName}</div>
                        <div className="text-[10px] text-charcoal-muted">Rank #{p.rank}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-charcoal-muted">
                    {p.email}
                  </td>

                  <td className="py-3.5 px-4 text-charcoal-muted">
                    {p.country}
                  </td>

                  <td className="py-3.5 px-4 text-center font-mono font-bold text-forest-800 tabular-nums">
                    {p.rating}
                  </td>

                  <td className="py-3.5 px-4 text-center tabular-nums text-charcoal">
                    {p.matchesPlayed} ({p.wins}W / {p.losses}L)
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={p.status} size="sm" />
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/players/${p.id}`)}
                        className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-charcoal text-[11px] font-semibold transition-colors"
                      >
                        Profile
                      </button>

                      {p.status === 'active' ? (
                        <button
                          onClick={() => suspendUser(p.id)}
                          className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 text-[11px] font-semibold border border-red-200 transition-colors flex items-center gap-1"
                        >
                          <Ban className="w-3 h-3" />
                          <span>Suspend</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => reactivateUser(p.id)}
                          className="px-2.5 py-1 rounded bg-forest-50 hover:bg-forest-100 text-forest-700 text-[11px] font-semibold border border-forest-200 transition-colors flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>Reactivate</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
