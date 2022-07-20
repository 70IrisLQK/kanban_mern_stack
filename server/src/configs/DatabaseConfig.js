import mongoose from 'mongoose';
import { config } from 'dotenv';
import { LOGGER } from '../log/index.js';
config();

const MONGO_URL = process.env.MONGO_URL;

const connectDatabase = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      LOGGER.info('Connect DB success');
    })
    .catch((error) => {
      LOGGER.error('Connect DB failed at', error.message);
    });
};

export default connectDatabase;
