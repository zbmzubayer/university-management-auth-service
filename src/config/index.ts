import dotenv from 'dotenv';
dotenv.config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrlLocal: process.env.DATABASE_URL_LOCAL,
  databaseUrlRemote: process.env.DATABASE_URL_REMOTE,
};
