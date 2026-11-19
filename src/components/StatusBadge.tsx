import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = ''
}) => {
  const norm = status.toLowerCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';

  if (norm.includes('win') || norm === 'completed' || norm === 'active' || norm === 'paid' || norm === 'accepted') {
    styles = 'bg-forest-100 text-forest-700 border-forest-200';
  } else if (norm.includes('loss') || norm === 'failed' || norm === 'suspended' || norm === 'cancelled' || norm === 'declined') {
    styles = 'bg-status-loss-bg text-status-loss border-red-200';
  } else if (norm.includes('draw') || norm === 'pending' || norm === 'upcoming') {
    styles = 'bg-status-draw-bg text-status-draw border-amber-200';
  } else if (norm.includes('registration_open') || norm === 'ready') {
    styles = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  } else if (norm.includes('in_progress') || norm === 'connecting') {
    styles = 'bg-blue-50 text-blue-700 border-blue-200';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${sizeClasses} ${styles} ${className}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
};
