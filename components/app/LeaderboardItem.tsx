
import React from 'react';
import { User } from '../../types';
import { BADGES } from '../../constants';
import { Badge } from '../ui/Badge';

interface LeaderboardItemProps {
  user: User;
  rank: number;
}

export const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ user, rank }) => {
  const rankColor =
    rank === 1 ? 'bg-yellow-400 text-yellow-900' :
    rank === 2 ? 'bg-gray-300 text-gray-800' :
    rank === 3 ? 'bg-yellow-600 text-yellow-100' :
    'bg-gray-100 text-gray-700';

  const userBadges = BADGES
    .filter(badge => user.civilScore >= badge.threshold)
    .sort((a, b) => b.threshold - a.threshold);

  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg mr-4 ${rankColor}`}>
        {rank}
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800 text-lg">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.role === 1 ? 'Restaurant Partner' : 'Community Hero'}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
            {userBadges.map(badge => <Badge key={badge.level} badge={badge} />)}
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-orange-500">{user.civilScore}</p>
          <p className="text-xs text-gray-500">Points</p>
        </div>
      </div>
    </div>
  );
};
