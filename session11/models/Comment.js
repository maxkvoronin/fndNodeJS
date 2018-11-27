const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  _id:             { type: mongoose.Schema.Types.ObjectId, auto: true },
  post:            { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  author:          { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text:            { type: String, required: [true, 'Text is required'] },
  publicationDate: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Comment', commentSchema);
