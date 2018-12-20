const LikeModel = require('../models/Like');

module.exports.setLikeOrDislike = async (req, res, next) => {
  try {
    const cond = {post: req.params.postId, author: req.user._id};

    const like = await LikeModel.findOne(cond);
    if (!like) {
      await LikeModel.create(cond);
    } else {
      await LikeModel.deleteOne(cond);
    }

    res.status(201).end();
  } catch (err) {
      next(err);
  }
};
