import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (payload: JwtPayload, secret: Secret, expireTime: string) => {
  const token = jwt.sign(payload, secret, { expiresIn: expireTime });
  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = { createToken, verifyToken };
