import mongoose from 'mongoose';
import { schemaOption } from './ModelOption.js';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
  },
  schemaOption
);

const userModel = mongoose.model('user', userSchema);

export default userModel;
