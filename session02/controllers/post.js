const path = require('path');

module.exports.getPostPage = (req, res) => {
  res.sendFile(path.resolve('public/post.html'));
};

module.exports.getPostData = (req, res) => {
  const data = require('../data/post.json');
  res.json(data);
};
