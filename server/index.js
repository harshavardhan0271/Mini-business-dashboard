const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Configure CORS for your frontend
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const headlines = [
  "Why {name} is {location}'s Top Choice in 2025",
  "Discover the Best of {location} at {name}",
  "{name}: {location}'s Hidden Gem You Can't Miss",
  "The Ultimate {location} Experience at {name}",
  "{name} - Redefining Excellence in {location}",
  "Why Everyone in {location} is Talking About {name}",
  "{name}: Setting New Standards in {location}",
  "The {location} Destination You've Been Waiting For - {name}",
  "{name}: Where Quality Meets Convenience in {location}",
  "Experience {location} Like Never Before at {name}"
];

// Business data endpoint
app.post('/business-data', (req, res) => {
  try {
    const { name, location } = req.body;
    
    if (!name || !location) {
      return res.status(400).json({ 
        error: 'Business name and location are required' 
      });
    }

    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
    const reviews = Math.floor(Math.random() * 450) + 50;
    const headlineTemplate = headlines[Math.floor(Math.random() * headlines.length)];
    const headline = headlineTemplate
      .replace('{name}', name)
      .replace('{location}', location);

    res.json({
      rating: parseFloat(rating),
      reviews,
      headline
    });
  } catch (error) {
    console.error('Error in /business-data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Regenerate headline endpoint
app.get('/regenerate-headline', (req, res) => {
  try {
    const { name, location, currentHeadline } = req.query;
    
    if (!name || !location) {
      return res.status(400).json({ 
        error: 'Business name and location are required' 
      });
    }

    let newHeadline;
    let attempts = 0;
    const maxAttempts = 10;
    
    do {
      const headlineTemplate = headlines[Math.floor(Math.random() * headlines.length)];
      newHeadline = headlineTemplate
        .replace('{name}', name)
        .replace('{location}', location);
      attempts++;
      
      if (attempts >= maxAttempts) break;
    } while (newHeadline === currentHeadline);

    res.json({ headline: newHeadline });
  } catch (error) {
    console.error('Error in /regenerate-headline:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});