import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info', // minimum log level
  format: format.combine(
    format.timestamp(), // adds timestamp to logs
    format.json()       // outputs logs in JSON format
  ),
  transports: [
    new transports.Console({ format: format.simple() }),            // logs to console in simple format
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // only error logs
    new transports.File({ filename: 'logs/combined.log' })          // all logs
  ]
});

// Allow morgan to log through Winston
logger.stream = {
  write: (message) => logger.info(message.trim())
};

export default logger;
