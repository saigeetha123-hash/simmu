
import React from 'react';
import { Page } from '../../types';
import { Button } from '../ui/Button';
import { StatCard } from '../app/StatCard';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
  stats: {
    dogsFed: number;
    volunteersActive: number;
    foodSavedKg: number;
  }
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentPage, stats }) => {
  return (
    <div className="text-center">
      <section 
        className="py-20 md:py-32 bg-cover bg-center rounded-b-3xl"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://picsum.photos/seed/hero/1200/600')" }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            No Dog Sleeps Hungry
          </h2>
          <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Join a community of heroes. Report a hungry dog, volunteer to feed, or donate leftover food. Your small act of kindness can save a life.
          </p>
          <Button 
            onClick={() => setCurrentPage(Page.REPORT_DOG)} 
            className="px-10 py-4 text-xl"
          >
            Report a Hungry Dog Now
          </Button>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">Our Impact Today</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard icon="🐾" value={stats.dogsFed.toLocaleString()} label="Dogs Fed Today" />
            <StatCard icon="❤️" value={stats.volunteersActive.toLocaleString()} label="Volunteers Active" />
            <StatCard icon="🍲" value={`${stats.foodSavedKg.toLocaleString()}kg`} label="Food Saved from Waste" />
          </div>
        </div>
      </section>
    </div>
  );
};
