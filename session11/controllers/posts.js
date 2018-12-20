const CommentModel = require('../models/Comment');
const PostModel = require('../models/Post');

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
    //const resObj = {};
    const posts = await PostModel.getPosts(req.user._id, req.query.page, req.query.query);
    //resObj.isEnd = (await PostModel.countDocuments(
    // {text: new RegExp(req.query.query, 'g')}) <= ( postsCfg.postsPerPage * req.query.page ) );

    res.json(...posts);
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
