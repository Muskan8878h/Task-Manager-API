import User from '../models/user.js';
import jwt from 'jsonwebtoken';

// ---------------- Signup ----------------
export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create new user
    const user = await User.create({ name, email, password, role });

    res.status(201).json({ id: user._id, email: user.email, role: user.role });
  } catch (err) {
    next(err); // Pass error to central error handler
  }
};

// ---------------- Login ----------------
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({ token, expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
  } catch (err) {
    next(err); // Pass error to central error handler
  }
};
