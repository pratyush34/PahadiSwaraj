import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Product Description Schema & Model
const descriptionSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  ingredients: { type: String, required: true },
  weight: { type: String, required: true },
  features: [String],
  tone: { type: String, required: true },
  generatedOutput: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Description = mongoose.model('Description', descriptionSchema);

// Helper function to simulate/construct keyword-rich e-commerce copy
// (In production, replace this logic with an active fetch/SDK call to your AI model)
function generateMockAICopy(productName, ingredients, weight, featuresArray, tone) {
  const featuresList = featuresArray.map(f => `• ${f.trim()}`).join('\n');
  
  if (tone === 'Premium') {
    return `Indulge in the luxury of pure mountain wellness with HimShakti's ${productName}. Crafted for the discerning palate, this exquisite ${weight} offering features premium ingredients including ${ingredients}.\n\nEvery element is sourced from pristine high-altitude regions, ensuring unparalleled quality, unmatched rich aroma, and sophisticated taste. Perfect as an elegant upgrade to your culinary ritual.\n\nKey Highlights:\n${featuresList}`;
  } else if (tone === 'Traditional') {
    return `Bring the time-honored heritage of the Himalayas straight to your kitchen table with HimShakti ${productName} (${weight}). Handed down through generations of local agricultural wisdom, this recipe spotlights pure ${ingredients}.\n\nProcessed using authentic traditional methods, it retains its rustic aroma and true regional character. A comforting taste of mountain culture.\n\nKey Highlights:\n${featuresList}`;
  } else {
    // Health-Focused
    return `Supercharge your daily nutrition with HimShakti ${productName} (${weight}). Formulated specifically for optimal health and vitality, this nutrient-dense mix leverages the raw, holistic power of ${ingredients}.\n\nDesigned to seamlessly fit into your health-conscious lifestyle, it provides essential macro and micro-nutrients without any artificial additives or preservatives.\n\nKey Highlights:\n${featuresList}`;
  }
}

// Routes
app.post('/api/generate', async (req, res) => {
  try {
    const { productName, ingredients, weight, features, tone } = req.body;

    if (!productName || !ingredients || !weight || !tone) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const featuresArray = typeof features === 'string' 
      ? features.split(',').map(f => f.trim()).filter(Boolean)
      : features;

    // Generate description text
    const generatedOutput = generateMockAICopy(productName, ingredients, weight, featuresArray, tone);

    // Save history point to MongoDB Atlas
    const newRecord = new Description({
      productName,
      ingredients,
      weight,
      features: featuresArray,
      tone,
      generatedOutput
    });
    
    await newRecord.save();

    res.status(200).json({ 
      success: true, 
      data: generatedOutput,
      recordId: newRecord._id 
    });
  } catch (error) {
    console.error('Generation Endpoint error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve history route
app.get('/api/history', async (req, res) => {
  try {
    const history = await Description.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    console.error('History retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve history logs', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`HimShakti Backend Engine running on port ${PORT}`);
});