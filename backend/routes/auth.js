import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import { z } from 'zod';
import User from '../models/User.js';

const router = express.Router();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts, please try again after 15 minutes.' }
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
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
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
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const isPasswordValid = user.password ? await bcrypt.compare(password, user.password) : false;
  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const token = createJwt(user);
  return res.status(200).json({ token, user: { name: user.name, email: user.email } });
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${FRONTEND_ORIGIN}/login?oauth=failed` }),
  (req, res) => {
    const token = createJwt(req.user);
    res.redirect(`${FRONTEND_ORIGIN}/oauth-callback?token=${token}`);
  }
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: `${FRONTEND_ORIGIN}/login?oauth=failed` }),
  (req, res) => {
    const token = createJwt(req.user);
    res.redirect(`${FRONTEND_ORIGIN}/oauth-callback?token=${token}`);
  }
);

export default router;
