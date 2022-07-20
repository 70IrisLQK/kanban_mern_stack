import mongoose from 'mongoose';
import { schemaOption } from './ModelOption.js';

const taskSchema = new mongoose.Schema(
  {
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'section',
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    position: {
      type: Number,
    },
  },
  schemaOption
);

const taskModel = mongoose.model('task', taskSchema);

export default taskModel;
