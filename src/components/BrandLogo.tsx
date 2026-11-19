import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  to?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  to = '/'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const Content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Vector Emblem */}
      <div className={`relative flex items-center justify-center rounded-xl bg-forest-600 text-surface shadow-subtle shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 40 40" className="w-5/6 h-5/6" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      {/* Typography */}
      <div className="flex flex-col">
        <span className={`font-display font-extrabold tracking-tight text-charcoal leading-none ${textSizes[size]}`}>
          FUTBOLIÑO
        </span>
        {showSubtitle && (
          <span className="text-[10px] uppercase font-semibold tracking-widest text-forest-600 mt-0.5">
            Gaming Federation
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return <Link to={to} className="inline-block hover:opacity-95 transition-opacity">{Content}</Link>;
  }

  return Content;
};
