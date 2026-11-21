import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // 1.4s display, then 0.4s fade out
    const timer = setTimeout(() => {
      setFadingOut(true);
    }, 1400);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 1800);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF4EA] px-6 transition-opacity duration-400 ease-out ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#FAF4EA' }}
    >
      <div className="flex flex-col items-center text-center max-w-md">
        {/* Wordmark */}
        <div className="flex items-baseline gap-1 animate-fade-in">
          <span
            className="text-5xl md:text-6xl tracking-tight text-[#2B2118] font-serif font-medium"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Sakeena
          </span>
          <span className="w-2 h-2 rounded-full bg-[#C99A2E] mb-2" />
        </div>

        {/* Delicate expanding gold line */}
        <div className="my-5 h-[1.5px] bg-[#C99A2E] animate-line-expand rounded-full" />

        {/* Tagline */}
        <p className="text-sm md:text-base text-[#756353] font-normal tracking-wide italic font-serif">
          A little more peace in finding your people.
        </p>

        {/* Subtle university badge */}
        <div className="mt-8 text-[11px] uppercase tracking-widest text-[#A34D28] font-medium">
          Muslim University Student Matchmaking
        </div>
      </div>

      {/* Discreet skip control */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 text-xs text-[#756353] hover:text-[#2B2118] tracking-wider uppercase transition-colors"
      >
        Skip Intro &rarr;
      </button>
    </div>
  );
};
