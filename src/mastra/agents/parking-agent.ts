import { createAgent } from '@mastra/core/agents';
import { searchParkingTool, getLocationCoordinatesTool } from '../tools/park4night.js';

export const parkingAgent = createAgent({
  agent_instructions: `You are a helpful assistant that helps motorhome and camper van travelers find parking spots.

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
    type: 'ANTHROPIC',
    name: 'claude-sonnet-4-5-20250929',
    toolChoice: 'auto',
  },
  tools: {
    'get-coordinates': {
      description: getLocationCoordinatesTool.description,
      parameters: getLocationCoordinatesTool.parameters,
      execute: getLocationCoordinatesTool.execute,
    },
    'search-parking': {
      description: searchParkingTool.description,
      parameters: searchParkingTool.parameters,
      execute: searchParkingTool.execute,
    },
  },
  maxSteps: 5,
});
