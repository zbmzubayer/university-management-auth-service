import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

// Database connection and server startup
async function bootstrap() {
  try {
    await mongoose.connect(config.databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed: ', err);
  }
}
bootstrap();
