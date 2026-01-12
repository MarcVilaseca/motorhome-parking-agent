import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { runParkingAgent } from './agent/parking-agent.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint for parking search
app.post('/api/search', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    console.log(`🔍 Searching for: "${query}"`);

    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        error: 'ANTHROPIC_API_KEY not configured. Please check your .env file.'
      });
    }

    // Run the parking agent
    const result = await runParkingAgent(query);

    res.json({
      success: true,
      result: result.text,
      query: query,
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.ANTHROPIC_API_KEY,
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n🚐 Motorhome Parking Agent - Web Interface');
  console.log('==========================================\n');
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`📱 Open your browser and visit the URL above\n`);

  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('⚠️  WARNING: ANTHROPIC_API_KEY not found!');
    console.log('   Please add it to your .env file\n');
  }
});
