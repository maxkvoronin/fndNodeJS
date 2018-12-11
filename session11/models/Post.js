const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const unlink = require('util').promisify(fs.unlink);

require('../models/User');
require('../models/Comment');

const postSchema = mongoose.Schema({
  _id:             { type: mongoose.Schema.Types.ObjectId, auto: true },
  author:          { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  publicationDate: { type: Date, default: Date.now },
  text:            { type: String },
  picture:         { type: String },
  numberOfLikes:   { type: Number, default: 0 }
}, { versionKey: false });

postSchema.pre('validate', function (next) {
  if (!this.text && !this.picture) {
    next(new Error('Post text or picture required'));
  } else {
    next();
  }
});

postSchema.statics.createPost = function (req) {
  const post = this.initProps(req);
  return this.create(post);
};

postSchema.statics.getPost = function (id) {
  return this.findOne().where({ _id: id }).exec();
};

postSchema.statics.getPosts = function () {
  return this.find().sort({ _id: -1 }).populate('author').lean();
};

postSchema.statics.updatePost = function (req) {
  const nwPost = this.initProps(req);
  return this.where({ _id: req.params.postId }).updateOne(nwPost).exec();
};

postSchema.statics.deletePost = function (id) {
  this.deleteOne().where({ _id: id}).exec();
};

postSchema.statics.addEditableProperty = function (posts, authUserId) {
  return posts.map(post => {
    post.editable = post.author._id.equals(authUserId);
    return post;
  });
};

postSchema.statics.updateLikeCount = function (postId, increment) {
  return this.findOneAndUpdate({ _id: postId }, {$inc : {'numberOfLikes' : increment}}).exec();
};

postSchema.statics.deletePicture = function (postId) {
  return this.findOne()
    .where({ _id: postId })
    .then((post) => {
      if (post.picture) {
        unlink(path.join('public', post.picture));
      }
    });
};

postSchema.statics.initProps = function (req) {
  const post = {};
  if (req.body.text) {
    post.text = req.body.text;
  }
  if (req.uploadfilename) {
    post.picture = req.uploadfilename;
  }

  post.author = req.user._id;

  return post;
};

module.exports = mongoose.model('Post', postSchema);
