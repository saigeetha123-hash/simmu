
export enum Page {
  HOME,
  REPORT_DOG,
  VOLUNTEER_DASHBOARD,
  RESTAURANT_DASHBOARD,
  LEADERBOARD,
  PROFILE,
}

export enum Role {
  USER,
  RESTAURANT,
  ADMIN,
}

export enum BadgeLevel {
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
}

export interface Badge {
  level: BadgeLevel;
  name: string;
  icon: JSX.Element;
  threshold: number;
}

export interface User {
  id: number;
  name:string;
  role: Role;
  civilScore: number;
  dogsFed: number;
  dogsReported: number;
  foodDonated: number;
}

export interface DogReport {
  id: number;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  notes: string;
  status: 'reported' | 'claimed' | 'fed';
  reporterId: number;
  volunteerId?: number;
  proofImageUrl?: string;
  timestamp: Date;
}

export interface FoodDonation {
  id: number;
  restaurantId: number;
  description: string;
  pickupTime: string;
  status: 'available' | 'claimed' | 'picked_up';
  volunteerId?: number;
}
