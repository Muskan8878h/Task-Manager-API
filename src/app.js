import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import logger from './logger/index.js';
import errorHandler from './middleware/errorHandler.js';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

// ---------------- Security & Parsing ----------------
app.use(helmet()); // Adds security headers
app.use(express.json()); // Parses incoming JSON requests
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' })); // Enables CORS

// ---------------- Rate Limiting ----------------
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX || 100), // max 100 requests per IP
});
app.use(limiter);

// ---------------- Logging ----------------
app.use(morgan('combined', { stream: logger.stream })); // Morgan logs through Winston

// ---------------- Routes ----------------
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// ---------------- 404 Handler ----------------
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

// ---------------- Central Error Handler ----------------
app.use(errorHandler);

export default app;
