import { tool } from 'ai';
import { z } from 'zod';

interface ParkingSpot {
  id: string;
  nom: string;
  latitude: number;
  longitude: number;
  type: string;
  note?: number;
  nbComm?: number;
  description?: string;
}

export const searchParkingTool = tool({
  description: 'Search for motorhome parking spots near a location using Park4Night. Provide latitude and longitude coordinates.',
  parameters: z.object({
    latitude: z.number().describe('Latitude of the search location'),
    longitude: z.number().describe('Longitude of the search location'),
  }),
  execute: async ({ latitude, longitude }) => {
    try {
      const url = new URL('https://guest.park4night.com/services/V4.1/lieuxGetFilter.php');
      url.searchParams.append('latitude', latitude.toString());
      url.searchParams.append('longitude', longitude.toString());

      const response = await fetch(url.toString(), {
        method: 'GET',
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const spots = Array.isArray(data) ? data : [];
      const topSpots = spots.slice(0, 10).map((spot: ParkingSpot) => ({
        name: spot.nom || 'Unnamed spot',
        latitude: spot.latitude,
        longitude: spot.longitude,
        type: spot.type || 'Unknown',
        rating: spot.note || 'No rating',
        reviews: spot.nbComm || 0,
        description: spot.description || 'No description',
      }));

      return {
        spots: topSpots,
        count: spots.length,
      };
    } catch (error) {
      console.error('Error fetching parking spots:', error);
      return {
        spots: [],
        count: 0,
      };
    }
  },
});

export const getLocationCoordinatesTool = tool({
  description: 'Convert a location name (city, address) to GPS coordinates. Use this before searching for parking.',
  parameters: z.object({
    location: z.string().describe('The location name, city, or address to convert to coordinates'),
  }),
  execute: async ({ location }) => {
    try {
      // Using Nominatim (OpenStreetMap) for geocoding - free and no API key needed
      const url = new URL('https://nominatim.openstreetmap.org/search');
      url.searchParams.append('q', location);
      url.searchParams.append('format', 'json');
      url.searchParams.append('limit', '1');

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'User-Agent': 'MotorhomeParkingAgent/1.0',
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        return {
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon),
          displayName: result.display_name,
        };
      }

      throw new Error('Location not found');
    } catch (error) {
      console.error('Error getting coordinates:', error);
      throw new Error(`Could not find coordinates for "${location}"`);
    }
  },
});
