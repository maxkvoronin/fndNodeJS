const LikeModel = require('../models/Like');

module.exports.setLikeOrDislike = async (req, res, next) => {
  try {
    const like = await LikeModel.findOne({post: req.params.postId, author: req.user._id});
    if (!like) {
      await LikeModel.create({post: req.params.postId, author: req.user._id});
    } else {
      await LikeModel.deleteOne({post: req.params.postId, author: req.user._id});
    }

    res.status(201).end();
  } catch (err) {
      next(err);
  }
};
