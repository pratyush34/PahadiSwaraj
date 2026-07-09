import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import { z } from 'zod';
import User from '../models/User.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const isProduction = process.env.NODE_ENV === 'production';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 5 : 50,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => !isProduction,
  message: { error: 'Too many authentication attempts. Please wait a few minutes and try again.' }
});

const invalidLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => false,
  message: { error: 'Too many invalid login attempts. Please wait a few minutes and try again.' }
});

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email must be valid'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const loginSchema = z.object({
  email: z.string().email('Email must be valid'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const createJwt = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET || 'replace_with_a_secure_secret',
    { expiresIn: '7d' }
  );
};

const isPlaceholderValue = (value) => {
  if (!value || typeof value !== 'string') return true;
  const normalized = value.trim().toLowerCase();
  return !normalized || normalized.includes('your_') || normalized.includes('your-') || normalized.includes('example') || normalized.includes('replace_with') || normalized.includes('changeme') || normalized.includes('placeholder');
};

const hasOAuthConfig = (provider) => {
  const clientIdKey = provider === 'google' ? 'GOOGLE_CLIENT_ID' : 'GITHUB_CLIENT_ID';
  const clientSecretKey = provider === 'google' ? 'GOOGLE_CLIENT_SECRET' : 'GITHUB_CLIENT_SECRET';
  return !isPlaceholderValue(process.env[clientIdKey]) && !isPlaceholderValue(process.env[clientSecretKey]);
};

const createOAuthFallbackUser = (provider) => ({
  _id: `${provider}-demo-user`,
  name: provider === 'google' ? 'Google Demo User' : 'GitHub Demo User',
  email: `${provider}-demo@pahadiswaraj.local`,
  provider
});

const oauthSetupHint = (provider) => {
  const providerLabel = provider === 'google' ? 'Google' : 'GitHub';
  return `${providerLabel} OAuth credentials are not configured. Add ${provider === 'google' ? 'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET' : 'GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET'} to backend/.env for real sign-in.`;
};

const redirectWithOAuthFallback = (req, res, provider) => {
  const returnTo = req.query.returnTo || '/dashboard';
  const user = createOAuthFallbackUser(provider);
  const token = createJwt(user);

  return res.redirect(`${FRONTEND_ORIGIN}/oauth-callback?token=${token}&returnTo=${encodeURIComponent(returnTo)}&provider=${provider}`);
};

router.post('/register', authLimiter, async (req, res) => {
  const parseResult = registerSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors.map((err) => err.message).join(', ') });
  }

  const { name, email, password } = parseResult.data;
  const normalizedEmail = email.toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({ name, email: normalizedEmail, password: hashedPassword, provider: 'local' });
  const token = createJwt(newUser);

  return res.status(201).json({ token, user: { name: newUser.name, email: newUser.email } });
});

router.post('/login', authLimiter, async (req, res) => {
  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors.map((err) => err.message).join(', ') });
  }

  const { email, password } = parseResult.data;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return invalidLoginLimiter(req, res, () => {
      res.status(400).json({ error: 'Invalid email or password' });
    });
  }

  const isPasswordValid = user.password ? await bcrypt.compare(password, user.password) : false;
  if (!isPasswordValid) {
    return invalidLoginLimiter(req, res, () => {
      res.status(400).json({ error: 'Invalid email or password' });
    });
  }

  const token = createJwt(user);
  return res.status(200).json({ token, user: { name: user.name, email: user.email } });
});

router.get('/verify', verifyToken, (req, res) => {
  return res.status(200).json({ authenticated: true, user: req.user });
});

router.get('/google', (req, res, next) => {
  if (!hasOAuthConfig('google')) {
    if (process.env.NODE_ENV === 'production') {
      return res.redirect(`${FRONTEND_ORIGIN}/login?oauth=failed&message=${encodeURIComponent(oauthSetupHint('google'))}`);
    }
    return redirectWithOAuthFallback(req, res, 'google');
  }
  const returnTo = req.query.returnTo || '/dashboard';
  return passport.authenticate('google', { scope: ['profile', 'email'], state: returnTo })(req, res, next);
});

router.get(
  '/google/callback',
  (req, res, next) => {
    if (!hasOAuthConfig('google')) {
      if (process.env.NODE_ENV === 'production') {
        return res.redirect(`${FRONTEND_ORIGIN}/login?oauth=failed&message=${encodeURIComponent(oauthSetupHint('google'))}`);
      }
      return redirectWithOAuthFallback(req, res, 'google');
    }
    return passport.authenticate('google', {
      session: false,
      failureRedirect: `${FRONTEND_ORIGIN}/login?oauth=failed&message=${encodeURIComponent('Google sign-in failed. Check your Google client ID, client secret, and redirect URI.')}`
    })(req, res, next);
  },
  (req, res) => {
    const token = createJwt(req.user);
    const returnTo = req.query.state || '/dashboard';
    res.redirect(`${FRONTEND_ORIGIN}/oauth-callback?token=${token}&returnTo=${encodeURIComponent(returnTo)}`);
  }
);

router.get('/github', (req, res, next) => {
  if (!hasOAuthConfig('github')) {
    if (process.env.NODE_ENV === 'production') {
      return res.redirect(`${FRONTEND_ORIGIN}/login?oauth=failed&message=${encodeURIComponent(oauthSetupHint('github'))}`);
    }
    return redirectWithOAuthFallback(req, res, 'github');
  }
  const returnTo = req.query.returnTo || '/dashboard';
  return passport.authenticate('github', { scope: ['user:email'], state: returnTo })(req, res, next);
});

router.get(
  '/github/callback',
  (req, res, next) => {
    if (!hasOAuthConfig('github')) {
      if (process.env.NODE_ENV === 'production') {
        return res.redirect(`${FRONTEND_ORIGIN}/login?oauth=failed&message=${encodeURIComponent(oauthSetupHint('github'))}`);
      }
      return redirectWithOAuthFallback(req, res, 'github');
    }
    return passport.authenticate('github', {
      session: false,
      failureRedirect: `${FRONTEND_ORIGIN}/login?oauth=failed&message=${encodeURIComponent('GitHub sign-in failed. Check your GitHub client ID, client secret, and redirect URI.')}`
    })(req, res, next);
  },
  (req, res) => {
    const token = createJwt(req.user);
    const returnTo = req.query.state || '/dashboard';
    res.redirect(`${FRONTEND_ORIGIN}/oauth-callback?token=${token}&returnTo=${encodeURIComponent(returnTo)}`);
  }
);

export default router;
