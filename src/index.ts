import 'dotenv/config';
import { runParkingAgent } from './agent/parking-agent.js';

async function main() {
  // Get the user query from command line arguments
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('\n🚐 Motorhome Parking Agent');
    console.log('==========================\n');
    console.log('Usage: npm run dev "your search query"');
    console.log('Example: npm run dev "Find parking near Barcelona"');
    console.log('Example: npm run dev "Show me motorhome spots in Lyon, France"\n');
    process.exit(0);
  }

  const query = args.join(' ');

  console.log('\n🚐 Motorhome Parking Agent');
  console.log('==========================\n');
  console.log(`🔍 Searching for: "${query}"\n`);

  try {
    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ Error: OPENAI_API_KEY not found in environment variables');
      console.error('\nPlease:');
      console.error('1. Copy .env.example to .env');
      console.error('2. Get your API key from: https://platform.openai.com/api-keys');
      console.error('3. Add it to your .env file\n');
      process.exit(1);
    }

    // Generate response from the agent
    const result = await runParkingAgent(query);

    console.log('📍 Results:');
    console.log('============\n');
    console.log(result.text);
    console.log('\n✅ Search complete!\n');

  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : 'Unknown error');
    console.error('\nIf you see authentication errors, check your OPENAI_API_KEY in .env\n');
    process.exit(1);
  }
}

main();
