const CommentModel = require('../models/Comment');
const PostModel = require('../models/Post');
const LikeModel = require('../models/Like');

module.exports.findOnePost = async (req, res, next) => {
  try {
    const post = await PostModel.getPost(req.params.postId);

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
    let posts = await PostModel.getPosts();
    posts = PostModel.addEditableProperty(posts, req.user._id);

    const likedPostsIds = await LikeModel.getLikedPostsIds(posts, req.user._id);
    posts = LikeModel.addLikesProperty(posts, likedPostsIds);

    res.json(posts);
  } catch (err) {
    next(err);
  }
};

module.exports.createPost = async (req, res, next) => {
  try {
    await PostModel.createPost(req);

    res.status(201).json({ success: true, message: 'post created' });

  } catch (err) {
    next(err);
  }
};

module.exports.editPost = async (req, res, next) => {
  try {
    const result = PostModel.updatePost(req);

    if (req.uploadfilename) {
      await PostModel.deletePicture(req.params.postId);
    }

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
    await PostModel.deletePicture(req.params.postId);
    await PostModel.deletePost(req.params.postId);
  //todo delete likes
    await CommentModel.deleteMany().where({ post: req.params.postId }).exec();

    res.status(204).json({ success: true });

  } catch (err) {
    next(err);
  }
};
