import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

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
    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'winston', 'successes', 'UMS-%DATE%-success.log'),
      datePattern: 'YYYY-MM-DD', // YYYY-MM-DD-HH for hourly
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
// Log error
const logError = createLogger({
  level: 'error',
  format: combine(label({ label: 'ZBM' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'winston', 'errors', 'UMS-%DATE%-error.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { logError, logSuccess };
