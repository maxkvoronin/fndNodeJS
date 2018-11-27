const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  _id:             { type: mongoose.Schema.Types.ObjectId, auto: true },
  post:            { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  author:          { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text:            { type: String /* , required: [true, 'Text is required'] */},
  publicationDate: { type: Date, default: Date.now() }
}, { versionKey: false });

// commentSchema.pre('save', function (next) {
//   this.publicationDate = new Date();
//   //this.author = mongoose.Types.ObjectId('5beeb6d6d6f6f8371d5791ee');
//   this._id = mongoose.Types.ObjectId();
//   next();
// });

module.exports = mongoose.model('Comment', commentSchema);
