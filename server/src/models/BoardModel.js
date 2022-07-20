import mongoose from 'mongoose';
import { schemaOption } from './ModelOption.js';

const boardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    icon: {
      type: String,
      default: '📃',
    },
    title: {
      type: String,
      default: 'Untitled',
    },
    description: {
      type: String,
      default: `Add description here
        + You can add multiline description
        + Let's start
      `,
    },
    position: {
      type: Number,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    favoritePosition: {
      type: Number,
      default: '0',
    },
  },
  schemaOption
);

const boardModel = mongoose.model('board', boardSchema);

export default boardModel;
