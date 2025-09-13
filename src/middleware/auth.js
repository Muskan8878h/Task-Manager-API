import jwt from 'jsonwebtoken';

function auth(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = payload; // payload typically contains id, email, role

    next(); // proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export default auth;
