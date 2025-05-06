import { Property, Owner, PropertyType } from "../types";

// List of US cities and states
const usCities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Miami",
  "Seattle",
  "Austin",
];
const usStates = ["NY", "CA", "IL", "TX", "AZ", "FL", "WA", "TX"];

// Predefined list of property image URLs
const propertyImageUrls = [
  "https://images.pexels.com/photos/102728/pexels-photo-102728.jpeg",
  "https://images.pexels.com/photos/46164/pexels-photo-46164.jpeg",
  "https://images.pexels.com/photos/46160/pexels-photo-46160.jpeg",
  "https://images.pexels.com/photos/2789098/pexels-photo-2789098.jpeg",
  "https://images.pexels.com/photos/20994227/pexels-photo-20994227.jpeg",
  "https://images.pexels.com/photos/2819994/pexels-photo-2819994.jpeg",
  "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg",
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
  "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg",
  "https://images.pexels.com/photos/2042161/pexels-photo-2042161.jpeg",
  "https://images.pexels.com/photos/754268/pexels-photo-754268.jpeg",
  "https://images.pexels.com/photos/31353860/pexels-photo-31353860.jpeg",
  "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
];

// Generate random properties for demonstration
export const mockProperties: Property[] = Array.from({ length: 50 }, (_, i) => {
  const propertyTypes: PropertyType[] = [
    "single_family",
    "multi_family",
    "condo",
    "townhouse",
    "vacant_land",
    "commercial",
    "industrial",
    "agricultural",
  ];

  const randomType =
    propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
  const randomValue = Math.floor(Math.random() * 1000000) + 100000; // $100k to $1.1M
  const randomSize = Math.floor(Math.random() * 5000) + 1000; // 1000 to 6000 sq ft
  const ownerId = `owner-${Math.floor(Math.random() * 20) + 1}`;

  const city = usCities[Math.floor(Math.random() * usCities.length)];
  const state = usStates[Math.floor(Math.random() * usStates.length)];

  // Helper to get two unique image URLs
  const getImageUrls = () => {
    const indexes = new Set<number>();
    while (indexes.size < 2) {
      indexes.add(Math.floor(Math.random() * propertyImageUrls.length));
    }
    return Array.from(indexes).map((i) => propertyImageUrls[i]);
  };

  return {
    id: `property-${i + 1}`,
    address: {
      street: `${1000 + i} Main St`,
      city,
      state,
      zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
    },
    type: randomType,
    value: randomValue,
    size: {
      area: randomSize,
      unit: "sqft",
    },
    yearBuilt: Math.floor(Math.random() * 70) + 1950, // 1950 to 2020
    lastSold: {
      date: `${2010 + Math.floor(Math.random() * 12)}-${
        Math.floor(Math.random() * 12) + 1
      }-${Math.floor(Math.random() * 28) + 1}`,
      price: randomValue * 0.9, // Slightly less than current value
    },
    imageUrls: getImageUrls(),
    ownerId,
    longitude: Math.random() * 50 - 120, // Somewhere in the US
    latitude: Math.random() * 10 + 35, // Somewhere in the US
    purchaseDate: `${2000 + Math.floor(Math.random() * 23)}-${
      Math.floor(Math.random() * 12) + 1
    }-${Math.floor(Math.random() * 28) + 1}`,
    taxAssessment: randomValue * 0.8,
    ownershipHistory: [
      {
        ownerId,
        startDate: `${2010 + Math.floor(Math.random() * 12)}-${
          Math.floor(Math.random() * 12) + 1
        }-${Math.floor(Math.random() * 28) + 1}`,
        endDate: null,
        purchasePrice: randomValue * 0.9,
      },
      {
        ownerId: `previous-owner-${i}`,
        startDate: `${2000 + Math.floor(Math.random() * 10)}-${
          Math.floor(Math.random() * 12) + 1
        }-${Math.floor(Math.random() * 28) + 1}`,
        endDate: `${2010 + Math.floor(Math.random() * 12)}-${
          Math.floor(Math.random() * 12) + 1
        }-${Math.floor(Math.random() * 28) + 1}`,
        purchasePrice: randomValue * 0.7,
      },
    ],
    transactions: [
      {
        id: `transaction-${i}-1`,
        date: `${2010 + Math.floor(Math.random() * 12)}-${
          Math.floor(Math.random() * 12) + 1
        }-${Math.floor(Math.random() * 28) + 1}`,
        type: "purchase",
        amount: randomValue * 0.9,
        description: "Property purchase",
      },
      {
        id: `transaction-${i}-2`,
        date: `${2015 + Math.floor(Math.random() * 7)}-${
          Math.floor(Math.random() * 12) + 1
        }-${Math.floor(Math.random() * 28) + 1}`,
        type: "refinance",
        amount: randomValue * 0.7,
        description: "Refinance mortgage",
      },
    ],
  };
});

// Generate random owners for demonstration
export const mockOwners: Owner[] = Array.from({ length: 20 }, (_, i) => {
  const type = ["individual", "company", "trust"][
    Math.floor(Math.random() * 3)
  ] as "individual" | "company" | "trust";
  const netWorthValue = Math.floor(Math.random() * 50000000) + 1000000; // $1M to $51M

  // Randomly assign properties to this owner
  const ownedProperties: string[] = [];
  mockProperties.forEach((property) => {
    if (property.ownerId === `owner-${i + 1}`) {
      ownedProperties.push(property.id);
    }
  });

  const realEstatePercentage = Math.floor(Math.random() * 60) + 20; // 20% to 80%
  const stocksPercentage = Math.floor(
    Math.random() * (100 - realEstatePercentage)
  ); // Remaining after real estate
  const otherPercentage = 100 - realEstatePercentage - stocksPercentage;

  const individualNames = [
    "John Smith",
    "Jane Doe",
    "Robert Johnson",
    "Emily Wang",
    "Michael Brown",
  ];
  const companyNames = [
    "Acme Corporation",
    "Global Enterprises",
    "Sunset Properties",
    "Blue Sky Holdings",
    "Mountain View Investments",
  ];
  const trustNames = [
    "Smith Family Trust",
    "Johnson Living Trust",
    "Wang Asset Trust",
    "Brown Family Trust",
    "Legacy Trust",
  ];

  const name =
    type === "individual"
      ? individualNames[Math.floor(Math.random() * individualNames.length)]
      : type === "company"
      ? companyNames[Math.floor(Math.random() * companyNames.length)]
      : trustNames[Math.floor(Math.random() * trustNames.length)];

  const roleOptions = ["CEO", "Director", "Investor", "Board Member"];
  const companyName =
    companyNames[Math.floor(Math.random() * companyNames.length)];
  const role =
    type === "individual"
      ? roleOptions[Math.floor(Math.random() * roleOptions.length)]
      : undefined;

  return {
    id: `owner-${i + 1}`,
    name,
    type,
    netWorth: {
      estimate: netWorthValue,
      confidenceScore: Math.floor(Math.random() * 50) + 50, // 50% to 100%
    },
    wealthSources: [
      {
        type: "real_estate",
        value: netWorthValue * (realEstatePercentage / 100),
        percentage: realEstatePercentage,
      },
      {
        type: "stocks",
        value: netWorthValue * (stocksPercentage / 100),
        percentage: stocksPercentage,
      },
      {
        type: "other",
        value: netWorthValue * (otherPercentage / 100),
        percentage: otherPercentage,
      },
    ],
    properties: ownedProperties,
    primaryAddress: {
      street: `${2000 + i} Oak Drive`,
      city: usCities[Math.floor(Math.random() * usCities.length)],
      state: usStates[Math.floor(Math.random() * usStates.length)],
      zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
    },
    associations: [
      {
        type: "company",
        name: companyName,
        role,
      },
    ],
  };
});
