const jsonDataFile = require('../data/simple');

module.exports = (req, res, next) => {
  const reqUserId = req.params.id;

  if (isNaN(parseInt(reqUserId))) {
    res.status(400).end('invalid id');
    return next();
  }

  for (let record of jsonDataFile) {
    if (record.id === reqUserId) {
      res.json(record);
    }
  }

  res.status(404).end('id not found');
};
