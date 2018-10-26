const jsonDataFile = require('../data/simple');

module.exports = (req, res) => {
  res.json(jsonDataFile);
};
