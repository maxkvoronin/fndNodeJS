var express = require('express');
var router = express.Router();

router.all('*', (req, res, next) => {
  res.status(200).end();
  next();
});


module.exports = router;
