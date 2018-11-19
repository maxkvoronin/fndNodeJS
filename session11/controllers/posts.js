const PostModel = require('../models/Post');
const CommentModel = require('../models/Comment');

const path = require('path');

module.exports.findPostById = async (req, res, next) => {
  try {
    const query = await PostModel.findById(req.params.postId, '-_id -comments_id');
    if (!query) {
      res.status(404).json({ success: false, message: 'unknown id' });
    } else {
      res.json(query);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.findPosts = async (req, res, next) => {
  try {
    const query = await PostModel.find({ 'author_id': '5beeb6d6d6f6f8371d5791ee' }, null, { sort: { _id: -1 } })
      .populate({ path: 'author_id', select: '-_id -__v' });

    res.json(query);
  } catch (err) {
    next(err);
  }
};

module.exports.createPost = async (req, res, next) => {
  try {
    const postData = {
      text: req.body.text
    };

    if (req.files) {
      postData.picture = path.join('img', Date.now() + '.jpg');
      await req.files.picture.mv(path.join('public', postData.picture));
    }

    await PostModel.create(postData);

    res.status(201).end();
  } catch (err) {
    next(err);
  }
};

module.exports.editPost = async (req, res, next) => {
  try {
    const date = Date.now();

    const newQuery = {
      publicationDate: new Date(date),
      text: req.body.text
    };

    if (req.files) {
      newQuery.picture = path.join('img', date.toString() + '.jpg');
      await req.files.picture.mv(path.join('public', newQuery.picture));
    }

    const query = await PostModel.findByIdAndUpdate(req.params.postId, newQuery);
    if (!query) {
      res.status(404).json({ success: false, message: 'unknown id' });
    } else {
      res.status(201).json({ success: true, result: query });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    const postQuery = await PostModel.findById(req.params.postId, 'comments_id');
    await CommentModel.deleteMany({ _id: { $in: postQuery.comments_id } });
    await PostModel.deleteOne({ _id: req.params.postId });

    res.status(204).json({ success: true });
  } catch (err) {
    next(err);
  }
};
