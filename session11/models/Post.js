const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const unlink = require('util').promisify(fs.unlink);
const postsCfg = require('../configs/posts.config');

const postSchema = mongoose.Schema({
  _id:             { type: mongoose.Schema.Types.ObjectId, auto: true },
  author:          { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  publicationDate: { type: Date, default: Date.now },
  text:            { type: String, text: true },
  picture:         { type: String }
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
  return this.findOne().where({ _id: id });
};

postSchema.statics.getPosts = function (authUserId, page, searchTxt = '') {
  return this.aggregate([
      { $match: {
          text: { $regex: new RegExp(searchTxt) } } },
      { $sort: {
          _id: -1} },
      { $facet : {
          meta: [
            { $count: "totalDocs" },
          ],
          posts: [
            { $skip: (page - 1) * postsCfg.postsPerPage },
            { $limit: postsCfg.postsPerPage },
            { $lookup: {
                "from": "users",
                "localField": "author",
                "foreignField": "_id",
                "as": "author" } },
            { $unwind: "$author"},
            { $lookup: {
                "from": "likes",
                "localField": "_id",
                "foreignField": "post",
                "as": "like" } },
            { $project: {
                "author._id": "$author._id",
                "author.firstName": "$author.firstName",
                "author.lastName":  "$author.lastName",
                "author.avatarUrl": "$author.avatarUrl",
                _id: 1,
                text: 1,
                picture: 1,
                publicationDate: 1,
                numberOfLikes: { $size: "$like" },
                isLiked:  { $in: [authUserId, "$like.author"]},
                editable: { $eq: [authUserId, "$author._id"]}, }
            },
          ]
      } },
      { $project: {
        isEnd: { $lte: [{$arrayElemAt: [ "$meta.totalDocs", 0 ]}, postsCfg.postsPerPage * page ]},
        posts: 1
    } }
  ]);
};

postSchema.statics.updatePost = function (req) {
  const nwPost = this.initProps(req);
  return this.where({ _id: req.params.postId }).updateOne(nwPost).exec();
};

postSchema.statics.deletePost = function (id) {
  this.deleteOne().where({ _id: id}).exec();
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
