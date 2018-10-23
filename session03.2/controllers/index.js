const fs = require('fs');
const split2 = require('split2');
const through2 = require('through2');

module.exports.readCSV = (req, res, next) => {
  res.set('Content-Type', 'application/json');

  fs.createReadStream('./data/sample.csv')
    .on('error', err => {
      next(err);
    })
    .once('data', () => {
      res.write('[');
    })
    .pipe(split2())
    .pipe(lineToJSON())
    .on('end', () => {
      res.write(']');
    })
    .pipe(res)
  };

const lineToJSON = () => {
  let isFirstLine = true;
  let keys = [];

  return through2((line, enc, cb) => {
    if (isFirstLine) {
      keys = line.toString().split(',');
      isFirstLine = false;
      return cb(null, null);
    }

    const resultObj = {};
    const values = line.toString().split(',');

    keys.forEach((key, i) => {
      resultObj[key] = values[i];
    });


    return cb(null, JSON.stringify(resultObj) + ',');
  });
};
