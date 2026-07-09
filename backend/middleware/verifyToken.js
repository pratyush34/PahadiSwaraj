import jwt from 'jsonwebtoken';
<<<<<<< HEAD
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'replace_with_a_secure_secret';

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization header.' });
=======

export default function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing Authorization header' });
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
<<<<<<< HEAD
    return res.status(401).json({ error: 'Missing token.' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: payload.userId,
      email: payload.email
    };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
=======
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(err.name === 'TokenExpiredError' ? 401 : 403).json({ error: 'Invalid or expired token' });
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
  }
}
