
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-6 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Street Paws Alliance. All Rights Reserved.</p>
        <p className="text-sm text-gray-400">Making the world a better place, one paw at a time.</p>
      </div>
    </footer>
  );
};
