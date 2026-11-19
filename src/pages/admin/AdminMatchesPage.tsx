import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { Match } from '../../types';
import { PlayerAvatar } from '../../components/PlayerAvatar';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';
import { Swords, Search, Edit3, XCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminMatchesPage: React.FC = () => {
  const { matches, adminCorrectMatch } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [newScoreA, setNewScoreA] = useState<number>(0);
  const [newScoreB, setNewScoreB] = useState<number>(0);

  const filtered = matches.filter((m) => {
    return (
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.playerA.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.playerB.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.competitionName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleOpenEdit = (m: Match) => {
    setEditingMatch(m);
    setNewScoreA(m.scoreA);
    setNewScoreB(m.scoreB);
  };

  const handleSaveCorrection = () => {
    if (!editingMatch) return;
    adminCorrectMatch(editingMatch.id, newScoreA, newScoreB);
    setEditingMatch(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100 px-3 py-1 rounded-full mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-gold" />
            Match Arbitration
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
            Match Management & Score Corrections
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Audit server-authoritative telemetry, review disputed scorelines, and correct ledger anomalies.
          </p>
        </div>

        <Link
          to="/admin"
          className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-charcoal hover:bg-stone-50 self-start sm:self-auto"
        >
          Back to Admin Dashboard
        </Link>
      </div>

      {/* Search */}
      <div className="bg-surface p-4 rounded-panel border border-stone-200/90 shadow-card flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Match ID or competitor..."
            className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/20"
          />
        </div>
        <span className="text-xs text-charcoal-muted hidden sm:inline">
          {filtered.length} matches logged
        </span>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-panel border border-stone-200/90 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-charcoal-muted uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Match ID</th>
                <th className="py-3 px-4">Competition</th>
                <th className="py-3 px-4">Competitors</th>
                <th className="py-3 px-4 text-center">Scoreline</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Arbitration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-forest-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-forest-700">{m.id}</td>
                  <td className="py-3.5 px-4 text-charcoal-muted">{m.competitionName}</td>
                  <td className="py-3.5 px-4 font-semibold text-charcoal">
                    {m.playerA.displayName} vs {m.playerB.displayName}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-sm text-charcoal">
                    {m.scoreA} – {m.scoreB}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={m.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleOpenEdit(m)}
                      className="px-2.5 py-1 rounded bg-stone-100 hover:bg-forest-50 text-charcoal hover:text-forest-700 text-[11px] font-semibold border border-stone-200 transition-colors inline-flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3 text-gold" />
                      <span>Correct Result</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Score Correction Modal */}
      {editingMatch && (
        <Modal
          isOpen={!!editingMatch}
          onClose={() => setEditingMatch(null)}
          title={`Arbitrate Match Result — ${editingMatch.id}`}
          description="Adjust the official scoreline recorded on the Federation ledger"
          maxWidth="sm"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center bg-stone-50 p-4 rounded-card border border-stone-200">
              <div>
                <span className="text-xs font-semibold text-charcoal block mb-1">
                  {editingMatch.playerA.displayName}
                </span>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={newScoreA}
                  onChange={(e) => setNewScoreA(parseInt(e.target.value) || 0)}
                  className="w-16 text-center font-mono text-lg font-bold bg-surface border border-stone-200 rounded-lg p-1.5 mx-auto"
                />
              </div>

              <div>
                <span className="text-xs font-semibold text-charcoal block mb-1">
                  {editingMatch.playerB.displayName}
                </span>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={newScoreB}
                  onChange={(e) => setNewScoreB(parseInt(e.target.value) || 0)}
                  className="w-16 text-center font-mono text-lg font-bold bg-surface border border-stone-200 rounded-lg p-1.5 mx-auto"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingMatch(null)}
                className="px-3 py-1.5 text-xs text-charcoal-muted hover:text-charcoal"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCorrection}
                className="px-4 py-2 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface text-xs font-semibold shadow-subtle"
              >
                Save Correction
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
