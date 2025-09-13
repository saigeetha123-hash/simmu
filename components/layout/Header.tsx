import React from 'react';
import { Page, User, Role } from '../../types';
// Fix: Import the Button component to resolve "Cannot find name 'Button'" errors.
import { Button } from '../ui/Button';

interface HeaderProps {
  setCurrentPage: (page: Page) => void;
  currentUser: User | null;
  logout: () => void;
  loginAs: (role: Role) => void;
}

const NavLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button onClick={onClick} className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
    {children}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ setCurrentPage, currentUser, logout, loginAs }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage(Page.HOME)}>
          <span className="text-2xl text-orange-500">🐾</span>
          <h1 className="text-xl font-bold text-gray-800">Street Paws Alliance</h1>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <NavLink onClick={() => setCurrentPage(Page.VOLUNTEER_DASHBOARD)}>Find Dogs</NavLink>
          <NavLink onClick={() => setCurrentPage(Page.RESTAURANT_DASHBOARD)}>Donate Food</NavLink>
          <NavLink onClick={() => setCurrentPage(Page.LEADERBOARD)}>Leaderboard</NavLink>
        </div>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="font-semibold text-gray-700 cursor-pointer" onClick={() => setCurrentPage(Page.PROFILE)}>{currentUser.name}</span>
                <p className="text-sm text-orange-500">{currentUser.civilScore} Points</p>
              </div>
              <Button onClick={logout} variant="secondary" className="py-1 px-3">Logout</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button onClick={() => loginAs(Role.USER)} variant="primary" className="py-1 px-3">Login User</Button>
              <Button onClick={() => loginAs(Role.RESTAURANT)} variant="ghost" className="py-1 px-3">Login Restaurant</Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};