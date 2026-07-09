import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
<<<<<<< HEAD
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { body, validationResult } from 'express-validator';

import User from './models/User.js';
import { verifyToken } from './middleware/verifyToken.js';
=======
import passport from 'passport';
import authRoutes from './routes/auth.js';
import verifyToken from './middleware/verifyToken.js';
import './config/passport.js';
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const BACKEND_ORIGIN = process.env.BACKEND_ORIGIN || `http://localhost:${PORT}`;
const JWT_SECRET = process.env.JWT_SECRET || 'replace_with_a_secure_secret';
const JWT_EXPIRY = '7d';
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 12;

// Middleware
<<<<<<< HEAD
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());
app.use(passport.initialize());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many auth attempts, please try again in 15 minutes.' }
});

const registerValidation = [
  body('name').optional().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 })
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 })
];

const createJwtForUser = (user) => jwt.sign(
  { userId: user._id.toString(), email: user.email },
  JWT_SECRET,
  { expiresIn: JWT_EXPIRY }
);

const findOrCreateOAuthUser = async ({ email, name, provider, providerId }) => {
  if (!email) return null;
  let user = await User.findOne({ email });
  if (user) {
    if (!user.provider) {
      user.provider = provider;
      user.providerId = providerId;
      await user.save();
    }
    return user;
  }

  user = new User({
    email,
    name,
    provider,
    providerId,
    passwordHash: null
  });
  await user.save();
  return user;
};

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || `${BACKEND_ORIGIN}/api/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;
      const name = profile.displayName || profile.name?.givenName || '';
      const user = await findOrCreateOAuthUser({
        email,
        name,
        provider: 'google',
        providerId: profile.id
      });
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackURL: process.env.GITHUB_CALLBACK_URL || `${BACKEND_ORIGIN}/api/auth/github/callback`,
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value || profile._json?.email;
      const name = profile.displayName || profile.username || '';
      const user = await findOrCreateOAuthUser({
        email,
        name,
        provider: 'github',
        providerId: profile.id
      });
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

app.post('/api/auth/register', authLimiter, registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name } = req.body;
  const normalizedEmail = email.toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered.' });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = new User({ email: normalizedEmail, name, passwordHash });
  await user.save();
  return res.status(201).json({ success: true, message: 'Registration successful. Please log in.' });
});

app.post('/api/auth/login', authLimiter, loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !user.passwordHash) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = createJwtForUser(user);
  return res.status(200).json({ success: true, token, user: { email: user.email, name: user.name } });
});

app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/api/auth/google/callback', passport.authenticate('google', { session: false, failureRedirect: `${FRONTEND_ORIGIN}/login?oauth=failed` }), (req, res) => {
  const token = createJwtForUser(req.user);
  res.redirect(`${FRONTEND_ORIGIN}/oauth-callback?token=${token}`);
});

app.get('/api/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/api/auth/github/callback', passport.authenticate('github', { session: false, failureRedirect: `${FRONTEND_ORIGIN}/login?oauth=failed` }), (req, res) => {
  const token = createJwtForUser(req.user);
  res.redirect(`${FRONTEND_ORIGIN}/oauth-callback?token=${token}`);
});
=======
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/api', verifyToken);
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)

// MongoDB Connection with fallback and status flag
let dbConnected = false;
const LOCAL_FALLBACK = 'mongodb://127.0.0.1:27017/pahadiswaraj';

async function connectWithFallback() {
  const primary = process.env.MONGODB_URI;
  const attempts = [primary, LOCAL_FALLBACK].filter(Boolean);

  for (const uri of attempts) {
    if (!uri) continue;
    try {
      await mongoose.connect(uri);
      console.log('Connected to MongoDB at', uri.includes('127.0.0.1') ? 'local instance' : 'remote host');
      dbConnected = true;
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt failed for ${uri}:`, err.message || err);
    }
  }

  console.error('All MongoDB connection attempts failed. Continuing without DB connection.');
  dbConnected = false;
}

// Try to connect before starting the server
connectWithFallback();

// Product Description Schema & Model
const descriptionSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  ingredients: { type: String, required: true },
  weight: { type: String, required: true },
  features: [String],
  tone: { type: String, required: true },
  generatedOutput: { type: String, required: true },
  generatedOutputs: [String],
  createdAt: { type: Date, default: Date.now }
});

const Description = mongoose.model('Description', descriptionSchema);

// Helper function to simulate/construct keyword-rich e-commerce copy
// (In production, replace this logic with an active fetch/SDK call to your AI model)
function getRandomElement(items, seed) {
  return items[seed % items.length];
}

function productCategoryHint(productName, tone) {
  const name = productName.toLowerCase();
  if (/tea|coffee|herb|chai|spice/.test(name)) return 'Wellness Brew';
  if (/ghee|oil|milk|dairy/.test(name)) return 'Rich Dairy';
  if (/snack|cookies|crisp|biscuit/.test(name)) return 'Snack Time';
  if (/soap|cream|skincare|oil/.test(name)) return 'Beauty Ritual';
  if (/powder|mix|blend|meal/.test(name)) return 'Functional Blend';
  if (/seed|grain|rice|flour/.test(name)) return 'Rustic Grain';
  if (/jam|honey|preserve/.test(name)) return 'Sweet Harvest';
  return tone === 'Premium' ? 'Luxury Craft' : tone === 'Traditional' ? 'Heritage Classic' : 'Wellness Boost';
}

function assembleVariant(productName, ingredients, weight, featuresArray, tone, index) {
  const category = productCategoryHint(productName, tone);
  const featureTag = featuresArray.length ? featuresArray.map(f => `${f.trim()}`).join(', ') : 'natural ingredients';
  const prepStyles = [
    'crafted with care',
    'hand-processed for purity',
    'lovingly prepared',
    'artfully blended',
    'sustainably sourced'
  ];

  const benefitLines = [
    `a premium choice for modern kitchens`,
    `designed to elevate your everyday ritual`,
    `perfect for those seeking authentic mountain flavor`,
    `built for nourishment and indulgence`,
    `the ideal companion for mindful eating`
  ];

  const toneOpeners = {
    Premium: [
      `Experience the pinnacle of alpine luxury with ${productName}.`,
      `Elevate your culinary collection with ${productName}.`,
      `Discover the exquisite richness of ${productName} today.`,
      `Introducing ${productName}, the gold standard in premium mountain produce.`,
      `Refine every recipe with the unmatched elegance of ${productName}.`
    ],
    Traditional: [
      `Step into heritage with ${productName}.`,
      `Bring home the time-honored flavor of ${productName}.`,
      `Savor the age-old tradition behind ${productName}.`,
      `Enjoy the rustic charm of ${productName}.`,
      `A classic recipe revived with ${productName}.`
    ],
    'Health-Focused': [
      `Supercharge your day with ${productName}.`,
      `Fuel your best self with ${productName}.`,
      `Empower your wellness journey with ${productName}.`,
      `Choose nutrition-first with ${productName}.`,
      `A health-conscious pick for modern living: ${productName}.`
    ]
  };

  const formatStyles = [
    () => `• ${productName} (${weight}) — ${featureTag}.\n   ${getRandomElement(benefitLines, index)}.\n   Made using ${getRandomElement(prepStyles, index + 1)} with ${ingredients}.`,
    () => `Product: ${productName}\nSize: ${weight}\nIngredients: ${ingredients}\nFeatures: ${featureTag}\nTone: ${tone}\n\n${getRandomElement(toneOpeners[tone], index)} ${getRandomElement(benefitLines, index + 2)}.`,
    () => `${getRandomElement(toneOpeners[tone], index)} This ${category} creation blends ${ingredients} in a ${weight} package for ${featureTag}. ${getRandomElement(benefitLines, index + 3)}.`,
    () => `${productName} is a ${category.toLowerCase()} essential that features ${ingredients}. Crafted for ${tone.toLowerCase()} lovers and made to ${getRandomElement(benefitLines, index + 4)}.`,
    () => `Fresh from the hills, ${productName} (${weight}) brings ${featureTag} together with ${ingredients}. ${getRandomElement(prepStyles, index + 2)} for a naturally satisfying experience.`,
    () => `${productName} blends ${ingredients} into a ${weight} package that speaks to ${featureTag}. ${getRandomElement(toneOpeners[tone], index + 1)} ${getRandomElement(benefitLines, index)}.`,
    () => `Inspired by mountain tradition, ${productName} offers ${featureTag} in every ${weight} serving. Perfect for those who want ${getRandomElement(benefitLines, index + 5)}.`,
    () => `A signature ${category.toLowerCase()} selection, ${productName} combines ${ingredients} with ${featureTag}. ${getRandomElement(prepStyles, index + 3)} for a memorable premium experience.`,
    () => `${productName} captures the spirit of the hills, pairing ${ingredients} and ${featureTag} in ${weight} of pure goodness. ${getRandomElement(benefitLines, index + 6)}.`,
    () => `Rich, aromatic, and soulfully crafted, ${productName} is ${getRandomElement(benefitLines, index + 7)} using ${ingredients}. Every bite of this ${weight} batch is a tribute to mountain heritage.`,
    () => `${getRandomElement(toneOpeners[tone], index + 2)} This ${weight} offering is enriched with ${ingredients}, ${featureTag}, and the power of PahadiSwaraj tradition.`,
    () => `Designed for discerning customers, ${productName} uses ${ingredients} to create ${featureTag}. ${getRandomElement(prepStyles, index + 4)} and ready to brighten your table.`,
    () => `${productName} is a ${tone === 'Premium' ? 'luxury' : tone === 'Traditional' ? 'classic' : 'healthy'} expression of mountain wellness. It combines ${ingredients} with ${featureTag} in every ${weight} serving.`,
    () => `From the valley to your hands, ${productName} delivers ${featureTag} in a ${weight} package. Designed for ${tone.toLowerCase()} enjoyment and everyday ritual.`,
    () => `Bold flavor meets meaningful ingredients in ${productName}. ${ingredients} are balanced with ${featureTag}, creating a ${weight} experience made for modern mountain living.`,
    () => `Taste the authenticity of ${productName} with ${ingredients}, ${featureTag}, and a ${weight} presentation that honors alpine craftsmanship. ${getRandomElement(benefitLines, index + 8)}.`,
    () => `A thoughtful mountain choice, ${productName} blends ${ingredients} with ${featureTag}. Enjoy ${getRandomElement(benefitLines, index + 9)} in every ${weight}.`,
    () => `${productName} brings ${ingredients} and ${featureTag} together so you can enjoy ${getRandomElement(benefitLines, index + 10)}. Perfect for the health-conscious, tradition-loving, or premium-seeking shopper.`,
    () => `This ${weight} selection of ${productName} leverages ${ingredients} and ${featureTag} for an inspiring product story. ${getRandomElement(prepStyles, index + 5)} to keep the experience fresh.`,
    () => `${productName} is crafted to feel both authentic and modern. With ${ingredients}, ${featureTag}, and a ${weight} format built around your lifestyle, it delivers a rare and memorable mountain-inspired touch.`,
  ];

  return formatStyles[index % formatStyles.length]();
}

function generateMockAICopy(productName, ingredients, weight, featuresArray, tone) {
  const variants = [];
  for (let i = 0; i < 20; i += 1) {
    variants.push(assembleVariant(productName, ingredients, weight, featuresArray, tone, i));
  }
  return variants;
}

// Routes
app.post('/api/generate', verifyToken, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database unavailable. Check MongoDB connection.' });
    }
    const { productName, ingredients, weight, features, tone } = req.body;

    if (!productName || !ingredients || !weight || !tone) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const featuresArray = typeof features === 'string' 
      ? features.split(',').map(f => f.trim()).filter(Boolean)
      : features;

    // Generate a set of description variants
    const generatedOutputs = generateMockAICopy(productName, ingredients, weight, featuresArray, tone);
    const generatedOutput = generatedOutputs[0] || '';

    // Save history point to MongoDB Atlas
    const newRecord = new Description({
      productName,
      ingredients,
      weight,
      features: featuresArray,
      tone,
      generatedOutput,
      generatedOutputs
    });
    
    await newRecord.save();

    res.status(200).json({ 
      success: true, 
      data: generatedOutputs,
      recordId: newRecord._id 
    });
  } catch (error) {
    console.error('Generation Endpoint error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve history route with optional search/filter
app.get('/api/history', verifyToken, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database unavailable.' });
    }

    const { search } = req.query;
    const queryCondition = search ? { productName: { $regex: search, $options: 'i' } } : {};
    const history = await Description.find(queryCondition).sort({ createdAt: -1 }).limit(10);

    res.status(200).json({ success: true, data: history });
  } catch (error) {
    console.error('History retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve history logs' });
  }
});

// Graceful shutdown handlers
function shutdown() {
  console.log('Shutting down server...');
  mongoose.connection.close(false).then(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  }).catch(() => process.exit(1));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Delete a single history record
app.delete('/api/history/:id', verifyToken, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database unavailable. Check MongoDB connection.' });
    }
    const { id } = req.params;
    const deleted = await Description.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Record not found' });
    res.status(200).json({ success: true, message: 'Record deleted' });
  } catch (error) {
    console.error('Delete history error:', error);
    res.status(500).json({ error: 'Failed to delete history record', details: error.message });
  }
});

// Clear all history
app.delete('/api/history', verifyToken, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database unavailable. Check MongoDB connection.' });
    }
    await Description.deleteMany({});
    res.status(200).json({ success: true, message: 'All history cleared' });
  } catch (error) {
    console.error('Clear history error:', error);
    res.status(500).json({ error: 'Failed to clear history', details: error.message });
  }
});

// Get a single history record by ID
app.get('/api/history/:id', verifyToken, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database unavailable.' });
    }
    
    const record = await Description.findById(req.params.id);
    
    // Check if the item exists
    if (!record) {
      return res.status(404).json({ error: 'Record not found.' });
    }
    
    // Success status code
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error('Get single record error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 6. Update a single history record by ID
app.put('/api/history/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database unavailable.' });
    }

    const { productName, tone } = req.body;
    
    // Find and update the document, returning the modified version
    const updatedRecord = await Description.findByIdAndUpdate(
      req.params.id,
      { productName, tone },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ error: 'Record not found.' });
    }

    res.status(200).json({ success: true, data: updatedRecord });
  } catch (error) {
    console.error('Update record error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Global Error Caught:', err.stack);
  res.status(500).json({
    error: 'Something went wrong on the server!',
    details: err.message
  });
});

app.listen(PORT, () => {
  console.log(`PahadiSwaraj Backend Engine running on port ${PORT}`);
  if (!dbConnected) console.warn('Warning: Database is not connected. Routes that use the DB will return 503.');
});
