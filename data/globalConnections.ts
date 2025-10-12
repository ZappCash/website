/**
 * Global Financial Connectivity Network
 * Strategic high-impact connections representing ZappCash's worldwide reach
 */

export interface Connection {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
}

export const globalConnections: Connection[] = [
  // === North America - Europe (Transatlantic) ===
  {
    start: { lat: 40.7128, lng: -74.006 }, // New York
    end: { lat: 51.5074, lng: -0.1278 }, // London
  },
  {
    start: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    end: { lat: 51.5074, lng: -0.1278 }, // London
  },
  {
    start: { lat: 40.7128, lng: -74.006 }, // New York
    end: { lat: 50.1109, lng: 8.6821 }, // Frankfurt
  },
  {
    start: { lat: 43.6532, lng: -79.3832 }, // Toronto
    end: { lat: 51.5074, lng: -0.1278 }, // London
  },

  // === Europe - Asia ===
  {
    start: { lat: 51.5074, lng: -0.1278 }, // London
    end: { lat: 1.3521, lng: 103.8198 }, // Singapore
  },
  {
    start: { lat: 51.5074, lng: -0.1278 }, // London
    end: { lat: 22.3193, lng: 114.1694 }, // Hong Kong
  },
  {
    start: { lat: 50.1109, lng: 8.6821 }, // Frankfurt
    end: { lat: 35.6762, lng: 139.6503 }, // Tokyo
  },
  {
    start: { lat: 51.5074, lng: -0.1278 }, // London
    end: { lat: 25.2048, lng: 55.2708 }, // Dubai
  },
  {
    start: { lat: 48.8566, lng: 2.3522 }, // Paris
    end: { lat: 31.2304, lng: 121.4737 }, // Shanghai
  },

  // === Asia - Oceania ===
  {
    start: { lat: 1.3521, lng: 103.8198 }, // Singapore
    end: { lat: -33.8688, lng: 151.2093 }, // Sydney
  },
  {
    start: { lat: 22.3193, lng: 114.1694 }, // Hong Kong
    end: { lat: -33.8688, lng: 151.2093 }, // Sydney
  },

  // === Asia - Middle East / Africa ===
  {
    start: { lat: 1.3521, lng: 103.8198 }, // Singapore
    end: { lat: 25.2048, lng: 55.2708 }, // Dubai
  },
  {
    start: { lat: 19.076, lng: 72.8777 }, // Mumbai
    end: { lat: 25.2048, lng: 55.2708 }, // Dubai
  },

  // === North America - Asia (Transpacific) ===
  {
    start: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    end: { lat: 31.2304, lng: 121.4737 }, // Shanghai
  },
  {
    start: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    end: { lat: 39.9042, lng: 116.4074 }, // Beijing
  },
  {
    start: { lat: 40.7128, lng: -74.006 }, // New York
    end: { lat: 35.6762, lng: 139.6503 }, // Tokyo
  },

  // === North America - Latin America ===
  {
    start: { lat: 40.7128, lng: -74.006 }, // New York
    end: { lat: -23.5505, lng: -46.6333 }, // São Paulo
  },
  {
    start: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    end: { lat: 19.4326, lng: -99.1332 }, // Mexico City
  },
  {
    start: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    end: { lat: -23.5505, lng: -46.6333 }, // São Paulo
  },
  {
    start: { lat: 40.7128, lng: -74.006 }, // New York
    end: { lat: 9.9281, lng: -84.0907 }, // San José, Costa Rica
  },

  // === Latin America - Europe ===
  {
    start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
    end: { lat: 51.5074, lng: -0.1278 }, // London
  },
  {
    start: { lat: 19.4326, lng: -99.1332 }, // Mexico City
    end: { lat: 40.4168, lng: -3.7038 }, // Madrid
  },

  // === Africa - Europe ===
  {
    start: { lat: -26.2041, lng: 28.0473 }, // Johannesburg
    end: { lat: 51.5074, lng: -0.1278 }, // London
  },
  {
    start: { lat: 6.5244, lng: 3.3792 }, // Lagos
    end: { lat: 51.5074, lng: -0.1278 }, // London
  },

  // === Intra-Continental (Key Routes) ===
  // North America
  {
    start: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    end: { lat: 40.7128, lng: -74.006 }, // New York
  },
  // Europe
  {
    start: { lat: 51.5074, lng: -0.1278 }, // London
    end: { lat: 48.8566, lng: 2.3522 }, // Paris
  },
  // Asia
  {
    start: { lat: 31.2304, lng: 121.4737 }, // Shanghai
    end: { lat: 1.3521, lng: 103.8198 }, // Singapore
  },
  // Latin America
  {
    start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
    end: { lat: 19.4326, lng: -99.1332 }, // Mexico City
  },
  {
    start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
    end: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
  },
  {
    start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
    end: { lat: 4.7110, lng: -74.0721 }, // Bogotá
  },
  {
    start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
    end: { lat: -33.4489, lng: -70.6693 }, // Santiago
  },
  {
    start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
    end: { lat: 9.9281, lng: -84.0907 }, // San José, Costa Rica
  },
  // Middle East
  {
    start: { lat: 25.2048, lng: 55.2708 }, // Dubai
    end: { lat: 32.0853, lng: 34.7818 }, // Tel Aviv
  },
  // Africa
  {
    start: { lat: -26.2041, lng: 28.0473 }, // Johannesburg
    end: { lat: 6.5244, lng: 3.3792 }, // Lagos
  },
];
