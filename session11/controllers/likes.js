const LikeModel = require('../models/Like');
const PostModel = require('../models/Post');

module.exports.setLikeOrDislike = async (req, res, next) => {
  try {
    let postLikeIncrement = 1;
    await LikeModel.create({ post: req.params.postId, author: req.user._id })
      .catch( err => { //if Already liked
        if (err.name === 'MongoError' && err.code === 11000) {
          postLikeIncrement = -1;
          LikeModel.delete(req.params.postId, req.user._id);
        }
      });
    await PostModel.updateLikeCount(req.params.postId, postLikeIncrement);

    res.status(201).end();
  } catch (err) {
      next(err);
  }
};
