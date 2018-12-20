/* eslint-disable no-trailing-spaces */
const UserModel = require('../models/User');
const mongoose = require('mongoose');
const layoutPageTitle = 'Profile';

module.exports.render = async (req, res) => {
  res.render('profile', { title: layoutPageTitle });
};

module.exports.saveUserProfile = async (req, res, next) => {
  try {
    await UserModel
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
  const reqUserId = mongoose.Types.ObjectId(req.params.userId);
  const authUserId = mongoose.Types.ObjectId(req.user._id);

  try {
    const profile = await UserModel.aggregate([
      { $match: {
          _id:  reqUserId }},
      { $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "author",
          as: "posts",
      } },
      { $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "author",
          as: "likes" }},
      { $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "author",
          as: "comments" }},
      { $project: {
          username: 1, email: 1, firstName: 1, lastName: 1, description: 1, avatarUrl: 1,
          // password: {
          //   $cond: { if: {$eq: ['$_id', authUserId]}, then: '$password', else: null}
          // },
          editable:       { $eq: ['$_id', authUserId]},
          postsNumber:    { $size: '$posts'},
          likesNumber:    { $size: '$likes'},
          commentsNumber: { $size: '$comments'},
      }}]);

    res.json(...profile);
  }
  catch (err) {
    next(err);
  }
};
