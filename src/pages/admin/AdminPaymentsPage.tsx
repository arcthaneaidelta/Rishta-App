import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { Payment } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';
import { Layers, Search, ShieldAlert, CheckCircle, RefreshCcw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminPaymentsPage: React.FC = () => {
  const { payments, adminUpdatePaymentStatus } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = payments.filter((p) => {
    const matchesSearch =
      p.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.playerUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tournamentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalVolume = payments
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100 px-3 py-1 rounded-full mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-gold" />
            Federation Treasury
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
            Payment & Entry Fee Ledger
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Audit simulated tournament registration checkouts, inspect transaction hashes, and issue simulated refunds.
          </p>
        </div>

        <Link
          to="/admin"
          className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-charcoal hover:bg-stone-50 self-start sm:self-auto"
        >
          Back to Admin Dashboard
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-surface rounded-card p-4 border border-stone-200/90 shadow-card">
          <span className="text-[10px] uppercase font-bold text-charcoal-muted block">Settled Gross Volume</span>
          <span className="font-display font-extrabold text-2xl text-forest-800 tabular-nums">
            ${totalVolume.toFixed(2)} USD
          </span>
        </div>
        <div className="bg-surface rounded-card p-4 border border-stone-200/90 shadow-card">
          <span className="text-[10px] uppercase font-bold text-charcoal-muted block">Total Transactions</span>
          <span className="font-display font-extrabold text-2xl text-charcoal tabular-nums">
            {payments.length}
          </span>
        </div>
        <div className="bg-surface rounded-card p-4 border border-stone-200/90 shadow-card">
          <span className="text-[10px] uppercase font-bold text-charcoal-muted block">Security Integrity</span>
          <span className="font-display font-bold text-2xl text-forest-700">100% Verified</span>
        </div>
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
            placeholder="Search transaction, player or cup..."
            className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/20"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'paid', 'pending', 'refunded'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
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
                <th className="py-3 px-4">Transaction Nonce</th>
                <th className="py-3 px-4">Competitor</th>
                <th className="py-3 px-4">Sanctioned Cup</th>
                <th className="py-3 px-4 text-center">Amount</th>
                <th className="py-3 px-4 text-center">Method</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((pay) => (
                <tr key={pay.id} className="hover:bg-forest-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-forest-700">
                    {pay.transactionId}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-charcoal">
                    {pay.playerUsername}
                  </td>
                  <td className="py-3.5 px-4 text-charcoal-muted">
                    {pay.tournamentName}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-charcoal">
                    ${pay.amount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-center text-charcoal-muted">
                    {pay.method}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={pay.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {pay.status === 'Paid' ? (
                      <button
                        onClick={() => adminUpdatePaymentStatus(pay.id, 'Refunded')}
                        className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-charcoal text-[11px] font-semibold border border-stone-200 transition-colors inline-flex items-center gap-1"
                      >
                        <RefreshCcw className="w-3 h-3 text-stone-500" />
                        <span>Simulate Refund</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => adminUpdatePaymentStatus(pay.id, 'Paid')}
                        className="px-2.5 py-1 rounded bg-forest-50 hover:bg-forest-100 text-forest-700 text-[11px] font-semibold border border-forest-200 transition-colors inline-flex items-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3 text-forest-600" />
                        <span>Mark Settled</span>
                      </button>
                    )}
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
