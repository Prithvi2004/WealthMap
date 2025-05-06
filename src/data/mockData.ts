import { Property, Owner, PropertyType } from '../types';

// Generate random properties for demonstration
export const mockProperties: Property[] = Array.from({ length: 50 }, (_, i) => {
  const propertyTypes: PropertyType[] = [
    'single_family', 'multi_family', 'condo', 'townhouse', 
    'vacant_land', 'commercial', 'industrial', 'agricultural'
  ];
  
  const randomType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
  const randomValue = Math.floor(Math.random() * 1000000) + 100000; // $100k to $1.1M
  const randomSize = Math.floor(Math.random() * 5000) + 1000; // 1000 to 6000 sq ft
  const ownerId = `owner-${Math.floor(Math.random() * 20) + 1}`;
  
  return {
    id: `property-${i + 1}`,
    address: {
      street: `${1000 + i} Main St`,
      city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
      state: ['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)],
      zipCode: `${Math.floor(Math.random() * 90000) + 10000}`
    },
    type: randomType,
    value: randomValue,
    size: {
      area: randomSize,
      unit: 'sqft'
    },
    yearBuilt: Math.floor(Math.random() * 70) + 1950, // 1950 to 2020
    lastSold: {
      date: `${2010 + Math.floor(Math.random() * 12)}-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
      price: randomValue * 0.9 // Slightly less than current value
    },
    imageUrls: [
      `https://images.pexels.com/photos/${1000000 + i * 10000}/pexels-photo-${1000000 + i * 10000}.jpeg`,
      `https://images.pexels.com/photos/${1000000 + i * 10000 + 1}/pexels-photo-${1000000 + i * 10000 + 1}.jpeg`,
    ],
    ownerId,
    coordinates: {
      lat: (Math.random() * 10) + 35, // Somewhere in the US
      lng: (Math.random() * 50) - 120 // Somewhere in the US
    },
    taxAssessment: randomValue * 0.8,
    ownershipHistory: [
      {
        ownerId,
        startDate: `${2010 + Math.floor(Math.random() * 12)}-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
        endDate: null,
        purchasePrice: randomValue * 0.9
      },
      {
        ownerId: `previous-owner-${i}`,
        startDate: `${2000 + Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
        endDate: `${2010 + Math.floor(Math.random() * 12)}-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
        purchasePrice: randomValue * 0.7
      }
    ],
    transactions: [
      {
        id: `transaction-${i}-1`,
        date: `${2010 + Math.floor(Math.random() * 12)}-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
        type: 'purchase',
        amount: randomValue * 0.9,
        description: 'Property purchase'
      },
      {
        id: `transaction-${i}-2`,
        date: `${2015 + Math.floor(Math.random() * 7)}-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
        type: 'refinance',
        amount: randomValue * 0.7,
        description: 'Refinance mortgage'
      }
    ]
  };
});

// Generate random owners for demonstration
export const mockOwners: Owner[] = Array.from({ length: 20 }, (_, i) => {
  const type = ['individual', 'company', 'trust'][Math.floor(Math.random() * 3)] as 'individual' | 'company' | 'trust';
  const netWorthValue = Math.floor(Math.random() * 50000000) + 1000000; // $1M to $51M
  
  // Randomly assign properties to this owner
  const ownedProperties: string[] = [];
  mockProperties.forEach(property => {
    if (property.ownerId === `owner-${i + 1}`) {
      ownedProperties.push(property.id);
    }
  });
  
  const realEstatePercentage = Math.floor(Math.random() * 60) + 20; // 20% to 80%
  const stocksPercentage = Math.floor(Math.random() * (100 - realEstatePercentage)); // Whatever is left after real estate
  const otherPercentage = 100 - realEstatePercentage - stocksPercentage; // The remainder
  
  return {
    id: `owner-${i + 1}`,
    name: type === 'individual' 
      ? ['John Smith', 'Jane Doe', 'Robert Johnson', 'Emily Wang', 'Michael Brown'][Math.floor(Math.random() * 5)]
      : type === 'company'
        ? ['Acme Corporation', 'Global Enterprises', 'Sunset Properties', 'Blue Sky Holdings', 'Mountain View Investments'][Math.floor(Math.random() * 5)]
        : ['Smith Family Trust', 'Johnson Living Trust', 'Wang Asset Trust', 'Brown Family Trust', 'Legacy Trust'][Math.floor(Math.random() * 5)],
    type,
    netWorth: {
      estimate: netWorthValue,
      confidenceScore: Math.floor(Math.random() * 50) + 50 // 50% to 100%
    },
    wealthSources: [
      {
        type: 'real_estate',
        value: netWorthValue * (realEstatePercentage / 100),
        percentage: realEstatePercentage
      },
      {
        type: 'stocks',
        value: netWorthValue * (stocksPercentage / 100),
        percentage: stocksPercentage
      },
      {
        type: 'other',
        value: netWorthValue * (otherPercentage / 100),
        percentage: otherPercentage
      }
    ],
    properties: ownedProperties,
    primaryAddress: {
      street: `${2000 + i} Oak Drive`,
      city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
      state: ['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)],
      zipCode: `${Math.floor(Math.random() * 90000) + 10000}`
    },
    associations: [
      {
        type: 'company',
        name: ['Acme Corporation', 'Global Enterprises', 'Sunset Properties', 'Blue Sky Holdings', 'Mountain View Investments'][Math.floor(Math.random() * 5)],
        role: type === 'individual' ? ['CEO', 'Director', 'Investor', 'Board Member'][Math.floor(Math.random() * 4)] : undefined
      }
    ]
  };
});