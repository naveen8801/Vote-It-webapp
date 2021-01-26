import mongoose from 'mongoose';
import { v4 } from 'uuid';

const pollsSchema = mongoose.Schema({
  title: String,
  choices: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
      name: String,
      count: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const pollsDoc = mongoose.model('pollsDoc', pollsSchema);

export default pollsDoc;
