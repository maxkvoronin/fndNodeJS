const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
  _id:             { type: mongoose.Schema.Types.ObjectId, auto: true },
  post:            { type: mongoose.Schema.Types.ObjectId, ref: 'Post', unique: false },
  author:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: false },
}, { versionKey: false });

likeSchema.index({ "post": 1, "author": 1}, { "unique": true });

//получаем массив айдих постов пролайканых текущем юзером
likeSchema.statics.getLikedPostsIds = function (posts, authUserId) {
  const postIds = posts.map(post => post._id);

  return this.find({author: authUserId})
    .where('post')
    .in(postIds)
    .distinct('post')
    .exec()
};

likeSchema.statics.addLikesProperty = function (posts, likedPostsIds) {
  return posts.map(post => {
    post.isLiked = likedPostsIds.some(likedPostId => likedPostId.equals(post._id));
    return post;
  });
};

likeSchema.statics.delete = function (postId, authorId) {
  this.deleteOne().where({ post: postId, author: authorId }).exec();
};


module.exports = mongoose.model('Like', likeSchema);
