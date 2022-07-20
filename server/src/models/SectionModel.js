import mongoose from 'mongoose';
import { schemaOption } from './ModelOption.js';

const sectionSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'board',
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
  schemaOption
);

const sectionModel = mongoose.model('section', sectionSchema);

export default sectionModel;
