
import React from 'react';
import { Badge as BadgeType } from '../../types';

interface BadgeProps {
  badge: BadgeType;
}

export const Badge: React.FC<BadgeProps> = ({ badge }) => {
  return (
    <div className="relative group flex items-center">
      {badge.icon}
      <div className="absolute bottom-full mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {badge.name} ({badge.level})
      </div>
    </div>
  );
};
