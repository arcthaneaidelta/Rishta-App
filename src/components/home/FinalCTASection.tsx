import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF4EA] to-[#F3EBDD] border-t border-[#E8DCC3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4EA] border border-[#C99A2E]/60 text-[#2B2118] text-xs font-semibold mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C99A2E]" />
          <span>Ready in under 2 minutes</span>
        </div>

        <h2
          className="text-4xl sm:text-5xl font-serif font-medium text-[#2B2118] leading-tight mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Your next meaningful connection starts here.
        </h2>

        <p className="text-sm sm:text-base text-[#756353] max-w-lg mx-auto mb-8 leading-relaxed">
          No card. No complicated signup. Just six simple details.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/join"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
          >
            <span>Join Sakeena — It's Free</span>
            <ArrowRight className="w-4 h-4 text-[#C99A2E] group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            to="/browse"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-[#E8DCC3]/40 border border-[#E8DCC3] text-[#2B2118] font-medium text-sm transition-all text-center"
          >
            Browse Member Profiles
          </Link>
        </div>
      </div>
    </section>
  );
};
