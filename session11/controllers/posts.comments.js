const CommentModel = require('../models/Comment');
const PostModel = require('../models/Post');

module.exports.findCommentById = async (req, res, next) => {
  try {
    const query = await CommentModel.findById(req.params.commentId);
    if (!query) {
      res.status(404).json({ success: false, message: 'unknown id' });
    } else {
      res.json(query);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.findComments = async (req, res, next) => {
  try {
    const query = await PostModel.findById(req.params.postId, '-text -picture -publicationDate -author_id -_id', {
      populate: { path: 'comments_id',
        options: { sort: { _id: -1 } },
        populate: { path: 'author_id', options: { select: '-__v' } } } });

    res.json(query);
  } catch (err) {
    next(err);
  }
};

module.exports.createComment = async (req, res, next) => {
  try {
    const commentQuery = await CommentModel.create({ text: req.body.text });
    await PostModel.findByIdAndUpdate(req.params.postId, {
      $push: { 'comments_id': commentQuery._id }
    });

    res.status(201).end();
  } catch (err) {
    next(err);
  }
};

module.exports.editComment = async (req, res, next) => {
  try {
    const query = await CommentModel.findByIdAndUpdate(req.params.commentId, { text: req.body.text });
    if (!query) {
      res.status(404).json({ success: false, message: 'unknown id' });
    } else {
      res.status(201).json({ success: false, result: query });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.deleteComment = async (req, res, next) => {
  try {
    const query = await CommentModel.deleteOne({ _id: req.params.commentId });

    if (query.n === 0) {
      res.status(404).json({ success: false, message: 'unknown id' });
    } else {
      res.status(204).json({ success: true });
    }
  } catch (err) {
    next(err);
  }
};
