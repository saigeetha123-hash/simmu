
import React from 'react';
import { DogReport, User } from '../../types';
import { DogCard } from '../app/DogCard';

interface VolunteerDashboardProps {
  reports: DogReport[];
  users: User[];
  onAcceptMission: (reportId: number) => void;
  onUploadProof: (reportId: number) => void;
  currentUser: User | null;
}

export const VolunteerDashboard: React.FC<VolunteerDashboardProps> = ({ reports, users, onAcceptMission, onUploadProof, currentUser }) => {
  const availableReports = reports.filter(r => r.status === 'reported');
  const myMissions = reports.filter(r => r.volunteerId === currentUser?.id && r.status !== 'fed');
  const completedMissions = reports.filter(r => r.volunteerId === currentUser?.id && r.status === 'fed');

  const findUser = (id: number) => users.find(u => u.id === id);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Volunteer Dashboard</h2>
      <p className="text-gray-600 mb-8">Be a hero. Find a dog nearby and offer a meal.</p>
      
      {myMissions.length > 0 && (
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-400 pb-2">My Active Missions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myMissions.map(report => (
              <DogCard
                key={report.id}
                report={report}
                reporter={findUser(report.reporterId)}
                volunteer={report.volunteerId ? findUser(report.volunteerId) : undefined}
                onAccept={onAcceptMission}
                onUploadProof={onUploadProof}
                currentUser={currentUser}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-400 pb-2">Nearby Dogs Reported</h3>
         {availableReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableReports.map(report => (
              <DogCard
                key={report.id}
                report={report}
                reporter={findUser(report.reporterId)}
                volunteer={report.volunteerId ? findUser(report.volunteerId) : undefined}
                onAccept={onAcceptMission}
                onUploadProof={onUploadProof}
                currentUser={currentUser}
              />
            ))}
          </div>
         ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-2xl">🐾</p>
            <p className="text-gray-600 mt-2">All dogs in your area have been claimed. Great job, community!</p>
          </div>
         )}
      </section>
    </div>
  );
};
