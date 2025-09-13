import logger from '../logger/index.js';

export default function errorHandler(err, req, res, next) {
  // Log full error details
  logger.error(`${err.message} - ${req.method} ${req.originalUrl} - ${err.stack}`);

  // Set HTTP status code (default 500)
  const status = err.status || 500;

  // Send JSON error response
  res.status(status).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message
  });
}
