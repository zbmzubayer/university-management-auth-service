import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logErrror, logSuccess } from './shared/logger';

// Database connection and server startup
async function bootstrap() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    logSuccess.info('Connected to MongoDB');
    app.listen(config.port, () => {
      logSuccess.info(`Server is listening on port ${config.port}`);
    });
  } catch (err) {
    logErrror.error('Failed: ', err);
  }
}
bootstrap();
