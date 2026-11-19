import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Sparkles, RotateCcw, ShieldCheck, UserCheck, ChevronDown, Check } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { currentUser, players, switchUser, isAdmin, toggleAdmin, resetDemoData } = useAppStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleReset = () => {
    resetDemoData();
    setResetConfirm(true);
    setTimeout(() => setResetConfirm(false), 2500);
  };

  return (
    <div className="bg-forest-900 text-stone-200 text-xs px-3 sm:px-6 py-1.5 border-b border-forest-800 flex flex-wrap items-center justify-between gap-2 z-50">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 font-semibold text-gold px-1.5 py-0.5 rounded bg-forest-800/80 uppercase tracking-wider text-[10px]">
          <Sparkles className="w-3 h-3" />
          Interactive Demo
        </span>
        <span className="hidden md:inline text-stone-300">
          Simulated live state • Local persistence active • Unity handshake ready
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Switch Persona Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-forest-800 hover:bg-forest-700 text-stone-100 transition-colors"
            title="Switch demo persona"
          >
            <UserCheck className="w-3 h-3 text-gold" />
            <span className="font-medium truncate max-w-[110px]">{currentUser.displayName}</span>
            <ChevronDown className="w-3 h-3 text-stone-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-56 bg-surface text-charcoal rounded-xl shadow-elevated border border-stone-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted border-b border-stone-100">
                Switch Test Account
              </div>
              {players.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    switchUser(p.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-forest-50 transition-colors text-xs ${
                    p.id === currentUser.id ? 'font-semibold text-forest-700 bg-forest-50/50' : 'text-charcoal'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{p.displayName}</span>
                    <span className="text-[10px] text-charcoal-muted">({p.rating} Elo)</span>
                  </div>
                  {p.id === currentUser.id && <Check className="w-3.5 h-3.5 text-forest-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Toggle Admin */}
        <button
          onClick={() => toggleAdmin()}
          className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
            isAdmin ? 'bg-gold text-forest-950 font-semibold' : 'bg-forest-800 hover:bg-forest-700 text-stone-200'
          }`}
          title="Toggle Federation Admin View"
        >
          <ShieldCheck className="w-3 h-3" />
          <span>{isAdmin ? 'Admin View: ON' : 'Admin'}</span>
        </button>

        {/* Reset State Button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-forest-800 hover:bg-forest-700 text-stone-300 hover:text-stone-100 transition-colors"
          title="Reset all demo data to pristine initial state"
        >
          <RotateCcw className={`w-3 h-3 ${resetConfirm ? 'rotate-180 transition-transform duration-500 text-emerald-400' : ''}`} />
          <span>{resetConfirm ? 'Reset Complete!' : 'Reset Data'}</span>
        </button>
      </div>
    </div>
  );
};
