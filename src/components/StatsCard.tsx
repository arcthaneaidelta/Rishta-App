import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  subvalue?: string;
  trend?: {
    positive?: boolean;
    text: string;
  };
  icon?: LucideIcon;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  subvalue,
  trend,
  icon: Icon,
  className = ''
}) => {
  return (
    <div className={`bg-surface border border-stone-200/90 rounded-card p-4 sm:p-5 shadow-card hover:border-forest-200 transition-all ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs uppercase font-semibold tracking-wider text-charcoal-muted">
          {label}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-forest-50 text-forest-700 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-charcoal tabular-nums">
          {value}
        </span>
        {subvalue && (
          <span className="text-xs text-charcoal-muted font-medium">
            {subvalue}
          </span>
        )}
      </div>

      {trend && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium">
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold ${
              trend.positive
                ? 'bg-forest-100 text-forest-700'
                : 'bg-stone-100 text-charcoal-muted'
            }`}
          >
            {trend.positive ? '↑ ' : ''}{trend.text}
          </span>
          <span className="text-[11px] text-charcoal-muted">vs previous cycle</span>
        </div>
      )}
    </div>
  );
};
