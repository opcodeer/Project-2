const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Note', NotesSchema);
