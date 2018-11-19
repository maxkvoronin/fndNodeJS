const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: [true, 'Text is required']
  },
  publicationDate: {
    type: Date
  }
}, { versionKey: false });

commentSchema.pre('save', function (next) {
  this.publicationDate = new Date();
  this.author_id = mongoose.Types.ObjectId('5beeb6d6d6f6f8371d5791ee');
  this._id = mongoose.Types.ObjectId();
  next();
});

module.exports = mongoose.model('Comment', commentSchema);
