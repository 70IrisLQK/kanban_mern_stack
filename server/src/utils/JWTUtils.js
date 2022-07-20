import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

export const createToken = async (payload) => {
  return jwt.sign(payload, TOKEN_SECRET_KEY, { expiresIn: '24h' });
};
