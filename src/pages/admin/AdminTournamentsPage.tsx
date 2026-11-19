import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { Tournament } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';
import { Trophy, Plus, ShieldAlert, Calendar, Users, DollarSign, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const AdminTournamentsPage: React.FC = () => {
  const { tournaments, adminCreateTournament } = useAppStore();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  // Form fields
  const [name, setName] = useState('');
  const [format, setFormat] = useState<'Knockout 8' | 'Knockout 16' | 'Round Robin'>('Knockout 8');
  const [entryFee, setEntryFee] = useState<number>(15);
  const [prizePool, setPrizePool] = useState<number>(1200);
  const [startDate, setStartDate] = useState('2026-12-05');
  const [description, setDescription] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    adminCreateTournament({
      name,
      type: format,
      entryFee,
      prizePool,
      startDate,
      description: description || 'Sanctioned Federation knockout competition.'
    });

    setCreateModalOpen(false);
    setName('');
    setDescription('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100 px-3 py-1 rounded-full mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-gold" />
            Competition Operations
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
            Tournament Management & Sanctioning
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Deploy new tournament brackets, set prize structures, and manage competitor rosters.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface text-xs font-semibold shadow-subtle transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Tournament</span>
        </button>
      </div>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((t) => (
          <div
            key={t.id}
            className="bg-surface rounded-panel border border-stone-200/90 shadow-card p-5 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-forest-700 tracking-wider">
                  {t.type}
                </span>
                <StatusBadge status={t.status} size="sm" />
              </div>
              <h3 className="font-display font-bold text-base text-charcoal">{t.name}</h3>
              <p className="text-xs text-charcoal-muted line-clamp-2">{t.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-card bg-stone-50 border border-stone-100 text-xs text-center">
              <div>
                <span className="text-[10px] text-charcoal-muted uppercase block">Fee</span>
                <span className="font-semibold text-charcoal">${t.entryFee}</span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-muted uppercase block">Prize</span>
                <span className="font-bold text-forest-700">${t.prizePool}</span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-muted uppercase block">Slots</span>
                <span className="font-semibold text-charcoal">
                  {t.participants.length}/{t.maxParticipants}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate(`/tournaments/${t.id}`)}
                className="w-full py-2 rounded-xl bg-stone-100 hover:bg-forest-50 text-charcoal hover:text-forest-800 text-xs font-semibold transition-colors"
              >
                Inspect Bracket & Fixtures
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tournament Creation Modal */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Sanction New Federation Tournament"
          description="Initialize a competitive bracket and define prize allocation parameters"
          maxWidth="md"
        >
          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1">
                Tournament Title
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Iberian Winter Cup 2026"
                className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl px-3 py-2 text-charcoal"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1">
                  Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl px-3 py-2 text-charcoal"
                >
                  <option value="Knockout 8">Knockout 8</option>
                  <option value="Knockout 16">Knockout 16</option>
                  <option value="Round Robin">Round Robin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1">
                  Entry Fee ($ USD)
                </label>
                <input
                  type="number"
                  min="0"
                  step="5"
                  value={entryFee}
                  onChange={(e) => setEntryFee(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl px-3 py-2 text-charcoal"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1">
                  Prize Pool ($ USD)
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={prizePool}
                  onChange={(e) => setPrizePool(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl px-3 py-2 text-charcoal"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl px-3 py-2 text-charcoal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1">
                Description & Bylaws
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of competition parameters..."
                className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl px-3 py-2 text-charcoal h-20"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="px-3 py-2 text-charcoal-muted hover:text-charcoal"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface font-semibold shadow-subtle"
              >
                Publish Tournament
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
