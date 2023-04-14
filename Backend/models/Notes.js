//This is mongoose models files, we use mongoose because it helps us organize our database as mongodb has no proper organization of database and we can insert whatever we like
import mongoose from 'mongoose';
const {Schema} = mongoose;
const NotesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('notes', NotesSchema);