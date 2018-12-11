const CommentModel = require('../models/Comment');
const PostModel = require('../models/Post');

module.exports.findCommentById = async (req, res, next) => {
  try {
    const comment = await CommentModel.findOne()
      .where({ _id: req.params.commentId })
      .exec();

    if (!comment) {
      res.status(404).json({ success: false, message: 'unknown id' });
    } else {
      res.json(comment);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.findComments = async (req, res, next) => {
  try {
    const comments = await CommentModel.find()
      .where({ post: req.params.postId })
      .sort({ _id: -1 })
      .populate('author')
      .lean();

    res.json(_addCommentEditableField(comments, req.user._id));

  } catch (err) {
    next(err);
  }
};

module.exports.createComment = async (req, res, next) => {
  try {
      await CommentModel.create({
          text: req.body.text,
          post: req.params.postId,
          author: req.user._id
        });

      res.status(201).end();

  } catch (err) {
    next(err);
  }
};

module.exports.editComment = async (req, res, next) => {
  try {
    const post = await PostModel.find()
      .where({ _id: req.params.postId })
      .exec();

    if (!post) {
      res.status(404).json({ success: false, message: 'unknown post id' });
    } else {

      const comment = await CommentModel
        .where({ _id: req.params.commentId })
        .updateOne({ text: req.body.text })
        .exec();

      if (!comment) {
        res.status(404).json({ success: false, message: 'unknown comment id' });
      } else {
        res.status(201).json({ success: true, message: 'comment updated' });
      }
    }

  } catch (err) {
    next(err);
  }
};

module.exports.deleteComment = async (req, res, next) => {
  try {
      await CommentModel.deleteOne({ _id: req.params.commentId }).exec();

      res.status(204).json({ success: true });

  } catch (err) {
    next(err);
  }
};

const _addCommentEditableField = (comments, authUserId) => {
  return comments.map(comment => {
    comment.editable = comment.author._id.equals(authUserId);
    return comment;
  });
};
