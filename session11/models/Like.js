const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
  _id:             { type: mongoose.Schema.Types.ObjectId, auto: true },
  post:            { type: mongoose.Schema.Types.ObjectId, ref: 'Post', unique: false, required: true },
  author:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: false, required: true },
}, { versionKey: false });

//получаем массив айдих постов пролайканых текущем юзером
// likeSchema.statics.getLikedPostsIds = function (posts, authUserId) {
//   const postIds = posts.map(post => post._id);
//
//   return this.find({author: authUserId})
//     .where('post')
//     .in(postIds)
//     .distinct('post')
// };
//
// likeSchema.statics.addLikesProperty = function (posts, likedPostsIds) {
//   return posts.map(post => {
//     post.isLiked = likedPostsIds.some(likedPostId => likedPostId.equals(post._id));
//     return post;
//   });
// };
//
// likeSchema.statics.getPostLikesCount = function (postId) {
//   return this.countDocuments({ post: postId });
// };

module.exports = mongoose.model('Like', likeSchema);
