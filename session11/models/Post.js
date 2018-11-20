const mongoose = require('mongoose');
require('../models/User');
require('../models/Comment');

const postSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  publicationDate: {
    type: Date
  },
  text: {
    type: String,
    required: [true, 'Text is required']
  },
  picture: {
    type: String
  }
}, { versionKey: false, id: false });

postSchema.pre('save', function (next) {
  this.publicationDate = new Date();
  this.author_id = mongoose.Types.ObjectId('5beeb6d6d6f6f8371d5791ee');
  this._id = mongoose.Types.ObjectId();
  next();
});

postSchema.set('toJSON', {
  virtuals: true
});

postSchema.virtual('author', {
  ref: 'User',
  localField: 'author_id',
  foreignField: '_id'
});

module.exports = mongoose.model('Post', postSchema);
