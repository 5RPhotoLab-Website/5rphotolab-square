import { verifyToken } from '../config/auth.js'

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token; // read from cookie instead
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

