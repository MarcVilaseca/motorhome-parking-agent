import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import { searchParkingTool, getLocationCoordinatesTool } from '../tools/park4night.js';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const instructions = `You are a helpful assistant that helps motorhome and camper van travelers find parking spots.

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

Be friendly and helpful. If a location can't be found, suggest alternatives or ask for clarification.`;

export async function runParkingAgent(query: string) {
  const result = await generateText({
    model: anthropic('claude-sonnet-4-5-20250929'),
    system: instructions,
    prompt: query,
    tools: {
      'get-coordinates': getLocationCoordinatesTool,
      'search-parking': searchParkingTool,
    },
    maxSteps: 5,
  });

  return result;
}
