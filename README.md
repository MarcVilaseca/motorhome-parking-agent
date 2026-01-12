# Motorhome Parking Agent

A simple, pragmatic AI agent built with [Mastra](https://mastra.ai) that helps you find motorhome parking spots using Park4Night data.

## Features

- Natural language search for motorhome parking spots
- Integrates with Park4Night's database of parking locations
- Powered by Google Gemini AI
- Simple CLI interface
- Shows ratings, reviews, and descriptions

## Quick Start

### 1. Get an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Copy your key
4. Add credits to your account at https://platform.openai.com/settings/organization/billing

### 2. Set Up the Project

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your API key to .env
# Edit .env and replace 'your_api_key_here' with your actual key
```

### 3. Run the Agent

```bash
# Search for parking
npm run dev "Find parking near Barcelona"

# Or try other queries
npm run dev "Show me motorhome spots in Lyon, France"
npm run dev "Where can I park my camper van near the beach in Portugal?"
```

## How It Works

The agent uses two main tools:

1. **Location Coordinates Tool**: Converts place names to GPS coordinates
2. **Parking Search Tool**: Searches Park4Night's API for nearby parking spots

When you ask a question, the agent:
1. Extracts the location from your query
2. Converts it to coordinates
3. Searches for parking spots
4. Presents the results in a friendly format

## Example Usage

```bash
$ npm run dev "Find parking near Madrid"

🚐 Motorhome Parking Agent
==========================

🔍 Searching for: "Find parking near Madrid"

📍 Results:
============

I found 200 parking spots near Madrid! Here are the top 10:

1. Parking Example Spot
   Type: Motorhome parking
   Rating: 4.5/5 (23 reviews)
   Location: 40.4168, -3.7038
   Description: Nice quiet spot near the city center

...

✅ Search complete!
```

## Project Structure

```
motorhome-parking-agent/
├── src/
│   ├── agent/
│   │   └── parking-agent.ts    # Agent configuration
│   ├── tools/
│   │   └── park4night.ts       # Park4Night API integration
│   └── index.ts                # CLI entry point
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Tech Stack

- **Mastra**: AI agent framework
- **OpenAI GPT-4o-mini**: LLM provider (fast and cost-effective)
- **Park4Night API**: Parking spot data
- **TypeScript**: Type-safe development

## Build for Production

```bash
# Compile TypeScript
npm run build

# Run compiled version
npm start "Find parking near Barcelona"
```

## Tips

- Be specific with locations: "Barcelona, Spain" works better than just "Barcelona"
- You can ask in natural language: "Where should I park tonight near Lyon?"
- The agent searches Park4Night's database of 200+ spots per location

## Limitations

- Uses Park4Night's public API (unofficial)
- Returns top 10 spots from each search
- Requires internet connection

## Future Enhancements

Some ideas if you want to expand this project:

- Add filtering by parking type (free, paid, wild camping)
- Show spots on a map
- Add web UI
- Save favorite spots
- Get directions to spots
- Filter by amenities (water, electricity, etc.)

## License

MIT

## Credits

- Built with [Mastra](https://mastra.ai)
- Data from [Park4Night](https://park4night.com)
- Geocoding by [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org)
