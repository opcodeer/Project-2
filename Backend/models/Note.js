import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User' // 'User' should match the model name used for users
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: 'General'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Note', NotesSchema);
