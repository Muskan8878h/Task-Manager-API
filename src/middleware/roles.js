function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    // Check if user is attached by auth middleware
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if user's role is in allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }

    // User is authorized
    next();
  };
}

export { authorizeRole };
