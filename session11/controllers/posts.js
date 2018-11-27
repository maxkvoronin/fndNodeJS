const CommentModel = require('../models/Comment');
const PostModel = require('../models/Post');

const path = require('path');
const fs = require('fs');
const unlink = require('util').promisify(fs.unlink);

module.exports.findOnePost = async (req, res, next) => {
  try {
    const post = await PostModel.findOne()
      .where({ _id: req.params.postId })
      .exec();

    if (!post) {
      res.status(404).json({ success: false, message: 'unknown id' });
    } else {
      res.json(post);
    }

  } catch (err) {
    next(err);
  }
};

module.exports.findPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find()
      .sort({ _id: -1 })
      .populate('author')
      .lean();

    res.json(_addPostEditableField(posts, req.user._id));

  } catch (err) {
    next(err);
  }
};

module.exports.createPost = async (req, res, next) => {
  try {
    const post = _initPostObjFields(req);
    await PostModel.create(post);

    res.status(201).json({ success: true, message: 'post created' });

  } catch (err) {
    next(err);
  }
};

module.exports.editPost = async (req, res, next) => {
  try {
    const nwPostFields = _initPostObjFields(req);

    if (req.uploadfilename) {
      await _deletePicture(req.params.postId);
    }

    const result = await PostModel
      .where({ _id: req.params.postId })
      .updateOne(nwPostFields)
      .exec();

    if (result.n === 0) {
      res.status(404).json({ success: false, message: 'unknown id' });
    } else {
      res.status(201).json({ success: true, message: 'post updated' });
    }

  } catch (err) {
    next(err);
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    await _deletePicture(req.params.postId);
    await PostModel.deleteOne()
      .where({ _id: req.params.postId })
      .exec();

    await CommentModel.deleteMany()
      .where({ post: req.params.postId })
      .exec();

    res.status(204).json({ success: true });

  } catch (err) {
    next(err);
  }
};

const _initPostObjFields = (req) => {
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

const _deletePicture = (postId) => {
  return PostModel.findOne()
    .where({ _id: postId })
    .select('picture')
    .exec()
    .then((post) => {
      if (post.picture) {
        unlink(path.join('public', post.picture));
      }
    });
};

const _addPostEditableField = (posts, authUserId) => {
  return posts.map(post => {
    post.editable = post.author._id.equals(authUserId);
    return post;
  });
};
