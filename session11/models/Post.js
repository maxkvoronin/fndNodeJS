const mongoose = require('mongoose');
require('../models/User');
require('../models/Comment');

const postSchema = mongoose.Schema({
  _id:             { type: mongoose.Schema.Types.ObjectId, auto: true },
  author:          { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  publicationDate: { type: Date, default: Date.now },
  text:            { type: String },
  picture:         { type: String }
}, { versionKey: false });

postSchema.pre('validate', function (next) {
  if (!this.text && !this.picture) {
    next(new Error('Post text or picture required'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Post', postSchema);
