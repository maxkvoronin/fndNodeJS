const path = require('path');

module.exports.getAboutPage = (req, res) => {
  res.sendFile(path.resolve('public/about.html'));
};
