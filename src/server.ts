import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logError, logSuccess } from './shared/logger';

let server: Server;

process.on('uncaughtException', err => {
  logError.error('Uncaught Exception: ', err);
  process.exit(1);
});

// Database connection and server startup
async function bootstrap() {
  try {
    await mongoose.connect(config.databaseUrlRemote as string);
    logSuccess.info('Connected to MongoDB');
    server = app.listen(config.port, () => {
      logSuccess.info(`Server is listening on port ${config.port}`);
    });
  } catch (err) {
    logError.error('Failed: ', err);
  }
  process.on('unhandledRejection', err => {
    logError.error('Unhandled Rejection: ', err);
    if (server) {
      server.close();
    }
    process.exit(1);
  });
}
bootstrap();

process.on('SIGTERM', () => {
  logSuccess.info('SIGTERM received. Shutting down gracefully');
  if (server) {
    server.close();
  }
});
