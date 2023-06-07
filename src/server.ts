import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import logger from './shared/logger';

// Database connection and server startup
async function bootstrap() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    logger.info('Connected to MongoDB');
    app.listen(config.port, () => {
      logger.info(`Server is listening on port ${config.port}`);
    });
  } catch (err) {
    logger.error('Failed: ', err);
  }
}
bootstrap();
