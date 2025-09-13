
import React from 'react';
import { Badge, BadgeLevel, DogReport, FoodDonation, Role, User } from './types';

export const POINTS = {
  REPORT: 2,
  VOLUNTEER: 5,
  RESTAURANT_DONATE: 3,
};

const PawIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.383-.598 18.365 18.365 0 01-2.903-2.221c-.751-.750-1.395-1.592-1.993-2.524a18.377 18.377 0 01-1.395-3.232c-.398-1.223-.62-2.53-.693-3.852a18.6 18.6 0 01.344-3.996c.228-.96.539-1.898.92-2.782.38-.88.82-1.708 1.314-2.464.495-.756 1.052-1.42 1.68-1.99a18.426 18.426 0 012.23-1.823c.333-.248.67-.483 1.01-.703a1.493 1.493 0 011.01-.256c.343.046.666.195.932.421.267.226.475.514.618.84.144.326.21.688.2.1051-.01.362-.088.718-.232 1.054a10.6 10.6 0 00-.479 1.132c-.183.398-.358.804-.525 1.218-.168.413-.328.832-.48 1.254a18.17 18.17 0 01-1.4 3.98c-.22.62-.41 1.256-.57 1.902a18.258 18.258 0 01-.48 1.952 17.65 17.65 0 01-1.04 2.833 16.51 16.51 0 01-1.46 2.37A15.247 15.247 0 0111.645 20.91z" />
  </svg>
);

export const BADGES: Badge[] = [
  { level: BadgeLevel.BRONZE, name: 'Dog Lover', icon: <PawIcon className="text-yellow-600" />, threshold: 10 },
  { level: BadgeLevel.SILVER, name: 'Street Hero', icon: <PawIcon className="text-gray-400" />, threshold: 50 },
  { level: BadgeLevel.GOLD, name: 'Animal Savior', icon: <PawIcon className="text-yellow-400" />, threshold: 150 },
];

export const INITIAL_USERS: User[] = [
  { id: 1, name: 'Alex Johnson', role: Role.USER, civilScore: 155, dogsFed: 25, dogsReported: 25, foodDonated: 0 },
  { id: 2, name: 'Maria Garcia', role: Role.USER, civilScore: 78, dogsFed: 12, dogsReported: 14, foodDonated: 0 },
  { id: 3, name: 'Chen Wei', role: Role.USER, civilScore: 42, dogsFed: 5, dogsReported: 11, foodDonated: 0 },
  { id: 4, name: 'Pizza Palace', role: Role.RESTAURANT, civilScore: 90, dogsFed: 0, dogsReported: 0, foodDonated: 30 },
  { id: 5, name: 'Curry House', role: Role.RESTAURANT, civilScore: 63, dogsFed: 0, dogsReported: 0, foodDonated: 21 },
  { id: 6, name: 'Sarah Miller', role: Role.USER, civilScore: 12, dogsFed: 2, dogsReported: 1, foodDonated: 0 },
  { id: 7, name: 'Admin', role: Role.ADMIN, civilScore: 999, dogsFed: 0, dogsReported: 0, foodDonated: 0 },
];

export const INITIAL_DOG_REPORTS: DogReport[] = [
  { id: 1, imageUrl: 'https://picsum.photos/seed/dog1/400/300', location: { lat: 0, lng: 0, address: 'Near Central Park' }, notes: 'Very friendly but looks hungry.', status: 'fed', reporterId: 2, volunteerId: 1, proofImageUrl: 'https://picsum.photos/seed/proof1/400/300', timestamp: new Date(Date.now() - 86400000 * 2) },
  { id: 2, imageUrl: 'https://picsum.photos/seed/dog2/400/300', location: { lat: 0, lng: 0, address: 'Downtown Square' }, notes: 'A small puppy, seems lost.', status: 'reported', reporterId: 3, timestamp: new Date(Date.now() - 3600000) },
  { id: 3, imageUrl: 'https://picsum.photos/seed/dog3/400/300', location: { lat: 0, lng: 0, address: 'Riverside Walkway' }, notes: '3 puppies with their mother, all very weak.', status: 'claimed', reporterId: 6, volunteerId: 2, timestamp: new Date(Date.now() - 7200000) },
  { id: 4, imageUrl: 'https://picsum.photos/seed/dog4/400/300', location: { lat: 0, lng: 0, address: 'Old Industrial Area' }, notes: 'Seems injured on one leg.', status: 'reported', reporterId: 1, timestamp: new Date(Date.now() - 1800000) },
];

export const INITIAL_FOOD_DONATIONS: FoodDonation[] = [
  { id: 1, restaurantId: 4, description: '5 large pizzas (veg & non-veg)', pickupTime: 'Today, 9:00 PM', status: 'available' },
  { id: 2, restaurantId: 5, description: 'Leftover rice, naan, and chicken curry.', pickupTime: 'Today, 10:00 PM', status: 'claimed', volunteerId: 3 },
  { id: 3, restaurantId: 4, description: 'Pasta and breadsticks', pickupTime: 'Yesterday, 9:00 PM', status: 'picked_up', volunteerId: 1 },
];
