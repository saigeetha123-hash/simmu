import React from 'react';
import { User } from '../../types';
import { BADGES } from '../../constants';
import { Card } from '../ui/Card';
// Fix: Import the Button component to resolve "Cannot find name 'Button'" error.
import { Button } from '../ui/Button';

interface ProfilePageProps {
  currentUser: User | null;
}

const ProfileStat: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-3xl font-bold text-orange-500">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const userBadges = BADGES
    .filter(badge => currentUser.civilScore >= badge.threshold)
    .sort((a, b) => b.threshold - a.threshold);

  const nextBadge = BADGES.find(badge => currentUser.civilScore < badge.threshold);
  const progressToNextBadge = nextBadge ? (currentUser.civilScore / nextBadge.threshold) * 100 : 100;

  return (
    <div className="container mx-auto px-6 py-12">
      <Card className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0 text-center">
             <div className="w-32 h-32 rounded-full bg-orange-200 flex items-center justify-center text-5xl mx-auto">
                {currentUser.name.charAt(0)}
             </div>
             <h2 className="text-3xl font-bold text-gray-800 mt-4">{currentUser.name}</h2>
             <p className="text-gray-600">{currentUser.role === 1 ? 'Restaurant Partner' : 'Community Hero'}</p>
          </div>
          <div className="flex-grow w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">My Contributions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                <ProfileStat value={currentUser.civilScore} label="Civil Score" />
                {currentUser.role === 0 && <ProfileStat value={currentUser.dogsFed} label="Dogs Fed" />}
                {currentUser.role === 0 && <ProfileStat value={currentUser.dogsReported} label="Dogs Reported" />}
                {currentUser.role === 1 && <ProfileStat value={currentUser.foodDonated} label="Donations Made" />}
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">My Badges</h3>
                {userBadges.length > 0 ? (
                    <div className="flex items-center gap-6">
                        {userBadges.map(badge => (
                            <div key={badge.level} className="text-center">
                                <div className="text-4xl">{badge.icon}</div>
                                <p className="text-sm font-medium">{badge.name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Start contributing to earn badges!</p>
                )}
            </div>

            {nextBadge && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Next Badge: {nextBadge.name}</h3>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                            className="bg-orange-500 h-4 rounded-full"
                            style={{ width: `${progressToNextBadge}%` }}
                        ></div>
                    </div>
                    <p className="text-right text-sm text-gray-600 mt-1">{currentUser.civilScore} / {nextBadge.threshold} points</p>
                </div>
            )}
             <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                <h3 className="font-semibold text-blue-800">Certificate of Awesomeness!</h3>
                <p className="text-blue-700">You fed {currentUser.dogsFed} dogs this month. Share your achievement!</p>
                <Button variant="secondary" className="mt-2 text-sm py-1 px-3">Share on Social Media</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};