const PostModel = require('../models/Post');
const path = require('path');
const fs = require('fs');
const unlink = require('util').promisify(fs.unlink);

const createPost = (req) => {
  const post = initProps(req);
  return PostModel.create(post);
};

const getPost = (id) => {
  return PostModel.findOne().where({ _id: id }).exec();
};

const getPosts = () => {
  return PostModel.find().sort({ _id: -1 }).populate('author').lean();
};

const updatePost = (req) => {
  const nwPost = initProps(req);
  return PostModel.where({ _id: req.params.postId }).updateOne(nwPost).exec();
};

const deletePost = (id) => {
  PostModel.deleteOne().where({ _id: id}).exec();
};

const addEditableProperty = (posts, authUserId) => {
  return posts.map(post => {
    post.editable = post.author._id.equals(authUserId);
    return post;
  });
};

const deletePicture = (postId) => {
  return PostModel.findOne()
    .where({ _id: postId })
    .then((post) => {
      if (post.picture) {
        unlink(path.join('public', post.picture));
      }
    });
};

const initProps = (req) => {
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

module.exports = {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  addEditableProperty,
  deletePicture
};
