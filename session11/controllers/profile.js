/* eslint-disable no-trailing-spaces */
const UserModel = require('../models/User');
const CommentModel = require('../models/Comment');
const PostModel = require('../models/Post');
const LikeModel = require('../models/Like');

//const hbs = require('hbs');

const layoutPageTitle = 'Profile';

// Helper for indication active css class in navigation bar
module.exports.render = async (req, res) => {
//   hbs.registerHelper({
//     activeProfileLayoutHelper: layout => layout.data.root.title === layoutPageTitle ? new hbs.SafeString('active') : ''
//   });
  //console.log(">>>>>>>>>>>>"+req.query.id);
  res.render('profile', { title: layoutPageTitle });
};

module.exports.saveUserProfile = async (req, res, next) => {
  try {
    const tmp = await UserModel
      .where({ _id: req.body.id })
      .updateOne({
        username :   req.body.username,
        password :   req.body.password,
        firstName:   req.body.firstName,
        lastName:    req.body.lastName,
        email:       req.body.email,
        description: req.body.description,
      })
      .exec();

    res.status(201).end();
  }
  catch (err) {
    next(err);
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  try {
    const profile = await UserModel.find()
      .where({ _id: req.params.userId})
      .lean();

    profile[0].editable = profile[0]._id.equals(req.user._id);
    profile[0].postsNumber = await PostModel.countDocuments({ author: req.user._id });
    profile[0].commentsNumber = await CommentModel.countDocuments({ author: req.user._id });
    profile[0].likesNumber = await LikeModel.countDocuments({ author: req.user._id });

    res.json(profile[0]);
  }
  catch (err) {
    next(err);
  }
};
