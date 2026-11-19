import React, { useEffect, useState } from 'react';
import { BrandLogo } from './BrandLogo';

interface LoadingScreenProps {
  onComplete?: () => void;
  message?: string;
  duration?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  message = 'PREPARING YOUR FEDERATION EXPERIENCE',
  duration = 800
}) => {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete?.();
          }, 150);
          return 100;
        }
        return prev + 25;
      });
    }, duration / 4);

    return () => clearInterval(timer);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-warm-bg text-charcoal p-6 select-none animate-in fade-in duration-300">
      <div className="flex flex-col items-center space-y-6 max-w-xs w-full text-center">
        {/* Minimal Animated Football Symbol */}
        <div className="relative w-16 h-16 rounded-2xl bg-forest-600 flex items-center justify-center shadow-card animate-subtle-pulse">
          <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="15" stroke="#E8F0EA" strokeWidth="1.8" strokeOpacity="0.85" />
            <polygon points="20,10 27,15 25,24 15,24 13,15" fill="#E8F0EA" />
            <line x1="20" y1="10" x2="20" y2="5" stroke="#B69A60" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="27" y1="15" x2="33" y2="12" stroke="#B69A60" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="25" y1="24" x2="30" y2="31" stroke="#B69A60" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="15" y1="24" x2="10" y2="31" stroke="#B69A60" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="13" y1="15" x2="7" y2="12" stroke="#B69A60" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="20" cy="18" r="2.5" fill="#245C45" />
          </svg>
        </div>

        {/* Brand Wordmark */}
        <div className="space-y-1">
          <span className="font-display font-extrabold text-2xl tracking-tight text-charcoal">
            FUTBOLIÑO
          </span>
          <p className="text-[10px] uppercase font-bold tracking-widest text-forest-700">
            {message}
          </p>
        </div>

        {/* Thin Progress Indicator */}
        <div className="w-full bg-stone-200/80 rounded-full h-1 overflow-hidden">
          <div
            className="bg-forest-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
