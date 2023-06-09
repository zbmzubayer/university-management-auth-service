import path from 'path';
import { createLogger, format, transports } from 'winston';

// Format
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp).toLocaleString('en-GB');
  return `${date} [${label}] ${level}: ${message}`;
});

// Log success
const logSuccess = createLogger({
  level: 'info',
  format: combine(label({ label: 'ZBM' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
    }),
  ],
});
// Log error
const logErrror = createLogger({
  level: 'error',
  format: combine(label({ label: 'ZBM' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
  ],
});

export { logErrror, logSuccess };
