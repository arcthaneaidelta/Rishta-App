import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Shield, RotateCcw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DemoBar: React.FC<{ onReplayIntro?: () => void }> = ({ onReplayIntro }) => {
  const { currentUser, loginAsDemo, resetDemoData } = useApp();

  return (
    <aside aria-label="Demo Controls" className="bg-[#2B2118] text-[#FAF4EA] text-xs py-1.5 px-4 border-b border-[#4A3B2C] sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#C99A2E]/20 text-[#FAF4EA] font-medium text-[11px] border border-[#C99A2E]/40">
            <Sparkles className="w-3 h-3 text-[#C99A2E]" />
            DEMO MODE
          </span>
          <span className="hidden sm:inline text-[#E8DCC3]/80">
            Interactive Presentation for Olympia Enterprises LLC
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2 text-[11px]">
          <span className="text-[#E8DCC3]/70 hidden md:inline">Switch Persona:</span>

          <button
            onClick={() => loginAsDemo('tariq_male_free')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
              currentUser?.name.includes('Tariq')
                ? 'bg-[#E8DCC3] text-[#2B2118] font-semibold'
                : 'text-[#E8DCC3] hover:bg-[#4A3B2C]'
            }`}
            title="Tests Male Free Plan: can browse & send likes, but cannot initiate new chats unless messaged"
          >
            <UserCheck className="w-3 h-3" />
            Tariq (Male • Free)
          </button>

          <button
            onClick={() => loginAsDemo('maryam_female_silver')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
              currentUser?.name.includes('Maryam')
                ? 'bg-[#E8DCC3] text-[#2B2118] font-semibold'
                : 'text-[#E8DCC3] hover:bg-[#4A3B2C]'
            }`}
            title="Tests Female Complimentary Silver: free unlimited search & views, limited capped messages"
          >
            <UserCheck className="w-3 h-3" />
            Maryam (Female • Silver)
          </button>

          <button
            onClick={() => loginAsDemo('zayd_male_gold')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
              currentUser?.name.includes('Zayd')
                ? 'bg-[#E8DCC3] text-[#2B2118] font-semibold'
                : 'text-[#E8DCC3] hover:bg-[#4A3B2C]'
            }`}
            title="Tests Gold Member: unlimited messaging and priority perks"
          >
            <UserCheck className="w-3 h-3" />
            Zayd (Male • Gold)
          </button>

          <button
            onClick={() => loginAsDemo('guest')}
            className={`px-2.5 py-1 rounded transition-colors ${
              !currentUser
                ? 'bg-[#E8DCC3] text-[#2B2118] font-semibold'
                : 'text-[#E8DCC3] hover:bg-[#4A3B2C]'
            }`}
          >
            Guest
          </button>

          <div className="h-3.5 w-px bg-[#4A3B2C] mx-1 hidden sm:block" />

          <Link
            to="/demo-admin"
            className="px-2 py-1 rounded text-[#E8DCC3] hover:bg-[#4A3B2C] flex items-center gap-1 transition-colors"
            title="Open simulated Admin dashboard"
          >
            <Shield className="w-3 h-3 text-[#C99A2E]" />
            <span className="hidden sm:inline">Admin Demo</span>
          </Link>

          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="px-2 py-1 rounded text-[#E8DCC3] hover:bg-[#4A3B2C] transition-colors"
              title="Replay initial brand intro loading animation"
            >
              Intro
            </button>
          )}

          <button
            onClick={resetDemoData}
            className="px-2 py-1 rounded text-[#FAF4EA] hover:bg-[#A34D28] flex items-center gap-1 transition-colors"
            title="Reset demo data and state to fresh initial mockup"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden lg:inline">Reset</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
