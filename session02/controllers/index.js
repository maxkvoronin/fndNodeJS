const path = require('path');

module.exports.getIndexPage = (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
};
