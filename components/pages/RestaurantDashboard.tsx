
import React, { useState } from 'react';
import { FoodDonation, User } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface RestaurantDashboardProps {
  donations: FoodDonation[];
  onAddDonation: (description: string, pickupTime: string) => void;
  currentUser: User | null;
}

export const RestaurantDashboard: React.FC<RestaurantDashboardProps> = ({ donations, onAddDonation, currentUser }) => {
  const [description, setDescription] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  
  if (!currentUser || currentUser.role !== 1) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <Card className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800">Access Denied</h2>
          <p className="text-gray-600 mt-4">This page is for our restaurant partners. Please log in as a restaurant to continue.</p>
        </Card>
      </div>
    );
  }

  const myDonations = donations.filter(d => d.restaurantId === currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description && pickupTime) {
      onAddDonation(description, pickupTime);
      setDescription('');
      setPickupTime('');
    }
  };

  const StatusBadge: React.FC<{ status: FoodDonation['status'] }> = ({ status }) => {
    const styles = {
        available: 'bg-green-100 text-green-800',
        claimed: 'bg-yellow-100 text-yellow-800',
        picked_up: 'bg-gray-200 text-gray-800'
    };
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>{status.replace('_', ' ').toUpperCase()}</span>
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Restaurant Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-xl font-semibold mb-4">Post Available Leftovers</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Food Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., 5 large pizzas, leftover curry"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pickup Time</label>
                <input 
                  type="text"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  placeholder="e.g., Today, 9:00 PM"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  required 
                />
              </div>
              <Button type="submit" className="w-full">Add Donation</Button>
            </form>
          </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <h3 className="text-xl font-semibold mb-4">Your Donations</h3>
                <div className="space-y-4">
                    {myDonations.length > 0 ? myDonations.map(donation => (
                        <div key={donation.id} className="p-4 border rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-gray-800">{donation.description}</p>
                                <p className="text-sm text-gray-500">Pickup: {donation.pickupTime}</p>
                            </div>
                            <StatusBadge status={donation.status} />
                        </div>
                    )) : (
                        <p className="text-gray-500">You haven't posted any donations yet.</p>
                    )}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};
