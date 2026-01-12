import { Mastra, Agent } from '@mastra/core';
import { searchParkingTool, getLocationCoordinatesTool } from './tools/park4night.js';

const parkingAgent = new Agent({
  name: 'parkingAgent',
  instructions: `You are a helpful assistant that helps motorhome and camper van travelers find parking spots.

Your primary job is to:
1. Understand where the user wants to find parking
2. Convert location names to coordinates using the get-coordinates tool
3. Search for parking spots using the search-parking tool
4. Present the results in a clear, user-friendly format

When presenting parking spots, include:
- Name and type of spot
- Rating (if available)
- Number of reviews
- Brief description
- Coordinates for GPS

Be friendly and helpful. If a location can't be found, suggest alternatives or ask for clarification.`,
  model: {
    provider: 'ANTHROPIC',
    name: 'claude-sonnet-4-5-20250929',
  },
  tools: {
    getCoordinates: getLocationCoordinatesTool,
    searchParking: searchParkingTool,
  },
});

export const mastra = new Mastra({
  agents: { parkingAgent },
  bundler: {
    externals: ['supports-color', 'axios'],
  },
});
