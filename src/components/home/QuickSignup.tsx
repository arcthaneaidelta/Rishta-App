import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Heart, ArrowRight } from 'lucide-react';

export const QuickSignup: React.FC = () => {
  const navigate = useNavigate();
  const [iAm, setIAm] = useState<'man' | 'woman'>('man');
  const [lookingFor, setLookingFor] = useState<'woman' | 'man'>('woman');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass gender preferences via state to the signup page
    navigate('/join', { state: { initialGender: iAm, initialLookingFor: lookingFor } });
  };

  return (
    <div className="relative -mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      <div className="bg-[#FAF4EA] border border-[#E8DCC3] rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Header */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif font-medium text-[#2B2118] mb-1">
              Let's get you started.
            </h2>
            <p className="text-xs text-[#756353]">
              Discover Muslim students from universities across your region and worldwide.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleStart} className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
            {/* I am a */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#756353] flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#A34D28]" />
                I am a:
              </span>
              <div className="inline-flex rounded-lg border border-[#E8DCC3] bg-white p-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setIAm('man');
                    setLookingFor('woman');
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    iAm === 'man'
                      ? 'bg-[#2B2118] text-[#FAF4EA]'
                      : 'text-[#756353] hover:text-[#2B2118]'
                  }`}
                >
                  Man
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIAm('woman');
                    setLookingFor('man');
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    iAm === 'woman'
                      ? 'bg-[#2B2118] text-[#FAF4EA]'
                      : 'text-[#756353] hover:text-[#2B2118]'
                  }`}
                >
                  Woman
                </button>
              </div>
            </div>

            {/* Looking for */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#756353] flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-[#C99A2E]" />
                Looking for:
              </span>
              <div className="inline-flex rounded-lg border border-[#E8DCC3] bg-white p-0.5">
                <button
                  type="button"
                  onClick={() => setLookingFor('woman')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    lookingFor === 'woman'
                      ? 'bg-[#A34D28] text-white'
                      : 'text-[#756353] hover:text-[#2B2118]'
                  }`}
                >
                  Woman
                </button>
                <button
                  type="button"
                  onClick={() => setLookingFor('man')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    lookingFor === 'man'
                      ? 'bg-[#A34D28] text-white'
                      : 'text-[#756353] hover:text-[#2B2118]'
                  }`}
                >
                  Man
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <span>Join with Email</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C99A2E]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
