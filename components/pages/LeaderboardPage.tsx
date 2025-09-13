
import React from 'react';
import { User } from '../../types';
import { LeaderboardItem } from '../app/LeaderboardItem';

interface LeaderboardPageProps {
  users: User[];
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ users }) => {
  const sortedUsers = [...users]
    .filter(u => u.role !== 2) // Filter out admins
    .sort((a, b) => b.civilScore - a.civilScore);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">🏆 Community Leaderboard 🏆</h2>
      <p className="text-gray-600 mb-8 text-center">Top heroes making a difference in our community.</p>

      <div className="max-w-3xl mx-auto space-y-4">
        {sortedUsers.map((user, index) => (
          <LeaderboardItem key={user.id} user={user} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};
