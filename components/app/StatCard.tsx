
import React from 'react';

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center transform transition-transform hover:-translate-y-2">
      <div className="text-5xl mb-2">{icon}</div>
      <div className="text-4xl font-bold text-orange-600">{value}</div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
};
