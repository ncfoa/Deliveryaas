// API simulation for delivery data
export interface DeliveryLeg {
  transport: string;
  airline?: string;
  from: string;
  to: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  packageArrivalDate: string;
  packageArrivalTime: string;
  duration: string;
  travelerRating: number;
  successRate: number;
  tripCount: number;
}

export interface FlightData {
  price: string;
  badge: string | null;
  legs: DeliveryLeg[];
  totalDuration: string;
  travelerImage: string;
  travelerName: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockResults: FlightData[] = [
  {
    price: "$77",
    badge: "Cheapest",
    legs: [
      {
        transport: "Flight",
        airline: "aircanada",
        from: "Montreal",
        to: "Paris",
        startDate: "Jan 15",
        startTime: "17:50",
        endDate: "Jan 16",
        endTime: "06:50",
        packageArrivalDate: "Jan 16",
        packageArrivalTime: "07:30",
        duration: "7h 00m",
        travelerRating: 4.8,
        successRate: 98,
        tripCount: 47
      }
    ],
    totalDuration: "1 day",
    travelerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    travelerName: "Traveler 1",
  },
  {
    price: "$78",
    badge: "Best",
    legs: [
      {
        transport: "Flight",
        airline: "aircanada",
        from: "Montreal",
        to: "Paris",
        startDate: "Jan 15",
        startTime: "17:50",
        endDate: "Jan 16",
        endTime: "06:50",
        packageArrivalDate: "Jan 16",
        packageArrivalTime: "07:30",
        duration: "7h 00m",
        travelerRating: 4.8,
        successRate: 98,
        tripCount: 47
      },
      {
        transport: "Flight",
        airline: "tunisair",
        from: "Paris",
        to: "Tunis",
        startDate: "Jan 16",
        startTime: "14:30",
        endDate: "Jan 16",
        endTime: "17:00",
        packageArrivalDate: "Jan 16",
        packageArrivalTime: "17:45",
        duration: "2h 30m",
        travelerRating: 4.6,
        successRate: 95,
        tripCount: 23
      }
    ],
    totalDuration: "2 days",
    travelerImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    travelerName: "Traveler 2",
  },
  {
    price: "$80",
    badge: null,
    legs: [
      {
        transport: "Flight",
        airline: "aircanada",
        from: "Montreal",
        to: "Paris",
        startDate: "Jan 15",
        startTime: "17:50",
        endDate: "Jan 16",
        endTime: "06:50",
        packageArrivalDate: "Jan 16",
        packageArrivalTime: "07:30",
        duration: "7h 00m",
        travelerRating: 4.8,
        successRate: 98,
        tripCount: 47
      },
      {
        transport: "Flight",
        airline: "tunisair",
        from: "Paris",
        to: "Tunis",
        startDate: "Jan 16",
        startTime: "14:30",
        endDate: "Jan 16",
        endTime: "17:00",
        packageArrivalDate: "Jan 16",
        packageArrivalTime: "17:45",
        duration: "2h 30m",
        travelerRating: 4.6,
        successRate: 95,
        tripCount: 23
      },
      {
        transport: "Car",
        from: "Tunis",
        to: "Sfax",
        startDate: "Jan 16",
        startTime: "18:00",
        endDate: "Jan 16",
        endTime: "20:45",
        packageArrivalDate: "Jan 16",
        packageArrivalTime: "21:15",
        duration: "2h 45m",
        travelerRating: 4.9,
        successRate: 99,
        tripCount: 156
      }
    ],
    totalDuration: "3 days",
    travelerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    travelerName: "Traveler 3",
  },
  {
    price: "$85",
    badge: null,
    legs: [
      {
        transport: "Flight",
        airline: "lufthansa",
        from: "Montreal",
        to: "Frankfurt",
        startDate: "Jan 15",
        startTime: "21:20",
        endDate: "Jan 16",
        endTime: "05:35",
        packageArrivalDate: "Jan 16",
        packageArrivalTime: "06:15",
        duration: "8h 15m",
        travelerRating: 4.7,
        successRate: 96,
        tripCount: 34
      },
      {
        transport: "Flight",
        airline: "lufthansa",
        from: "Frankfurt",
        to: "Tunis",
        startDate: "Jan 16",
        startTime: "08:30",
        endDate: "Jan 16",
        endTime: "11:15",
        packageArrivalDate: "Jan 16",
        packageArrivalTime: "12:00",
        duration: "2h 45m",
        travelerRating: 4.5,
        successRate: 93,
        tripCount: 18
      }
    ],
    totalDuration: "2 days",
    travelerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    travelerName: "Traveler 4",
  },
  {
    price: "$90",
    badge: null,
    legs: [
      {
        transport: "Flight",
        airline: "airfrance",
        from: "Montreal",
        to: "Paris",
        startDate: "Jan 15",
        startTime: "18:45",
        endDate: "Jan 16",
        endTime: "02:15",
        packageArrivalDate: "Jan 16",
        packageArrivalTime: "03:00",
        duration: "7h 30m",
        travelerRating: 4.9,
        successRate: 99,
        tripCount: 89
      },
      {
        transport: "Flight",
        airline: "tunisair",
        from: "Paris",
        to: "Tunis",
        startDate: "Jan 16",
        startTime: "14:30",
        endDate: "Jan 16",
        endTime: "17:00",
        packageArrivalDate: "Jan 16",
        packageArrivalTime: "17:45",
        duration: "2h 30m",
        travelerRating: 4.6,
        successRate: 95,
        tripCount: 23
      },
      {
        transport: "Car",
        from: "Tunis",
        to: "Sfax",
        startDate: "Jan 16",
        startTime: "18:00",
        endDate: "Jan 16",
        endTime: "20:45",
        packageArrivalDate: "Jan 16",
        packageArrivalTime: "21:15",
        duration: "2h 45m",
        travelerRating: 4.9,
        successRate: 99,
        tripCount: 156
      }
    ],
    totalDuration: "4 days",
    travelerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    travelerName: "Traveler 5",
  }
];

// API functions
export const searchDeliveries = async (params: {
  from: string;
  to: string;
  date: string;
  package: string;
}): Promise<FlightData[]> => {
  console.log('🔍 Searching deliveries with params:', params);
  
  // Simulate API delay
  await delay(1500 + Math.random() * 1000); // 1.5-2.5 seconds
  
  // Simulate random results
  const shuffled = [...mockResults].sort(() => Math.random() - 0.5);
  const results = shuffled.slice(0, 3 + Math.floor(Math.random() * 3)); // 3-5 results
  
  console.log('✅ Found deliveries:', results.length);
  return results;
};

export const loadMoreDeliveries = async (offset: number): Promise<FlightData[]> => {
  console.log('📦 Loading more deliveries, offset:', offset);
  
  // Simulate API delay
  await delay(800 + Math.random() * 700); // 0.8-1.5 seconds
  
  // Return more results
  const moreResults = mockResults.slice(offset, offset + 3);
  
  console.log('✅ Loaded more deliveries:', moreResults.length);
  return moreResults;
};
