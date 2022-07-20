import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import userModel from '../models/UserModel.js';

config();
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const tokenDecode = async (req) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')[1];
    try {
      const tokenDecoded = await jwt.verify(bearer, TOKEN_SECRET_KEY);
      return tokenDecoded;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

export const verifyToken = async (req, res, next) => {
  const tokenDecoded = await tokenDecode(req);
  if (tokenDecoded) {
    const user = await userModel.findById(tokenDecoded.id);

    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    req.user = user;
    next();
  } else {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
};
