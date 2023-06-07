import path from 'path';
import winston from 'winston';

// Log success
const logSuccess = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
    }),
  ],
});
// Log error
const logErrror = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
  ],
});

export { logSuccess, logErrror };
