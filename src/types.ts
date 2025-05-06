export interface Property {
  longitude: any;
  latitude: any;
  id: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  type: PropertyType;
  value: number;
  size: {
    area: number;
    unit: 'sqft' | 'acres';
  };
  yearBuilt: number;
  lastSold: {
    date: string;
    price: number;
  };
  imageUrls: string[];
  ownerId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  taxAssessment: number;
  ownershipHistory: OwnershipRecord[];
  transactions: Transaction[];
}

export interface OwnershipRecord {
  ownerId: string;
  startDate: string;
  endDate: string | null;
  purchasePrice: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'purchase' | 'sale' | 'refinance' | 'tax';
  amount: number;
  description: string;
}

export type PropertyType = 
  | 'single_family'
  | 'multi_family'
  | 'condo'
  | 'townhouse'
  | 'vacant_land'
  | 'commercial'
  | 'industrial'
  | 'agricultural';

export interface Owner {
  id: string;
  name: string;
  type: 'individual' | 'company' | 'trust';
  netWorth: {
    estimate: number;
    confidenceScore: number;
  };
  wealthSources: WealthSource[];
  properties: string[]; // Array of property IDs
  primaryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  associations: Association[];
}

export interface WealthSource {
  amount: any;
  type: 'real_estate' | 'stocks' | 'private_equity' | 'other';
  value: number;
  percentage: number;
}

export interface Association {
  type: 'company' | 'organization' | 'family';
  name: string;
  role?: string;
}

export interface Filter {
  id: string;
  type: 'value' | 'size' | 'propertyType' | 'location' | 'netWorth';
  operator: 'equals' | 'greater_than' | 'less_than' | 'between' | 'contains';
  value: any;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  companyId: string;
}

export interface Company {
  id: string;
  name: string;
  plan: 'basic' | 'pro' | 'enterprise';
  usageStats: {
    searchesThisMonth: number;
    exportsThisMonth: number;
    usersCount: number;
  };
}