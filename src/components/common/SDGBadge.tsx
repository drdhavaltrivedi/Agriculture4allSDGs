import React from 'react';
import { getSdgByNumber } from '../../data/sdgs';

interface SDGBadgeProps {
  sdgNumber: number;
  size?: 'sm' | 'md' | 'lg';
  showTitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SDGBadge: React.FC<SDGBadgeProps> = ({
  sdgNumber,
  size = 'md',
  showTitle = false,
  className = '',
  onClick,
}) => {
  const sdg = getSdgByNumber(sdgNumber);
  if (!sdg) return null;

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs font-bold rounded',
    md: 'w-8 h-8 text-sm font-bold rounded-md',
    lg: 'w-10 h-10 text-base font-extrabold rounded-lg',
  };

  const badgeElement = (
    <div
      style={{ backgroundColor: sdg.color }}
      className={`inline-flex items-center justify-center text-white shadow-sm flex-shrink-0 select-none ${sizeClasses[size]} ${className}`}
      title={`${sdg.code}: ${sdg.title}`}
    >
      {sdg.number}
    </div>
  );

  if (showTitle) {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center gap-2 ${onClick ? 'cursor-pointer hover:opacity-90' : ''}`}
      >
        {badgeElement}
        <span className="font-medium text-stone-800 text-sm truncate">{sdg.title}</span>
      </div>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-forest-600 focus:ring-offset-1 rounded-md"
      >
        {badgeElement}
      </button>
    );
  }

  return badgeElement;
};
