import dotenv from 'dotenv';
dotenv.config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrlLocal: process.env.DATABASE_URL_LOCAL,
  databaseUrlRemote: process.env.DATABASE_URL_REMOTE,
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
