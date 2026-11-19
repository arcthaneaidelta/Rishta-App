import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { TableProperties, ShieldAlert, Zap, Calendar, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminLeaguesPage: React.FC = () => {
  const { league, completeMatch } = useAppStore();

  const handleSimulate = (fixtureId: string) => {
    const f = league.fixtures.find((fix) => fix.id === fixtureId);
    if (!f || f.isCompleted) return;

    completeMatch(`FTB-LEAGUE-${f.id}`, 2, 1);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100 px-3 py-1 rounded-full mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-gold" />
            League Operations
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
            League Management & Arbitration
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Oversee round-robin schedules, points allocations, and authoritative result verification.
          </p>
        </div>

        <Link
          to="/league"
          className="px-4 py-2 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface text-xs font-semibold shadow-subtle transition-all self-start sm:self-auto"
        >
          View Public League Table
        </Link>
      </div>

      {/* League Info Box */}
      <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-base text-charcoal">{league.name}</h3>
          <p className="text-xs text-charcoal-muted mt-0.5">
            {league.season} • 8 Grandmaster Teams • Scoring: Win=3pts, Draw=1pt
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-forest-100 text-forest-800 rounded-full">
          Active Round: Matchday 7
        </span>
      </div>

      {/* Fixture Control List */}
      <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card space-y-4">
        <h3 className="font-display font-bold text-base text-charcoal">
          Matchday 7 Scheduling Operations
        </h3>

        <div className="divide-y divide-stone-100">
          {league.fixtures.map((f) => (
            <div key={f.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-mono text-[10px] text-charcoal-muted block">FIXTURE {f.id}</span>
                <span className="font-semibold text-charcoal text-sm">
                  {f.playerA.displayName} vs {f.playerB.displayName}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {f.isCompleted ? (
                  <span className="font-mono font-bold text-forest-800 text-sm">
                    {f.scoreA} : {f.scoreB} (Final)
                  </span>
                ) : (
                  <button
                    onClick={() => handleSimulate(f.id)}
                    className="px-3 py-1.5 rounded-lg bg-forest-50 hover:bg-forest-100 text-forest-700 text-xs font-semibold border border-forest-200 flex items-center gap-1.5 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-gold" />
                    <span>Force Simulate Result</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
