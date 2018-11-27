const path = require('path');

module.exports = (req, res, next) => {

  if (req.files !== null) {
    if (req.files.picture.mimetype === 'image/jpeg') {

      const pictureUrl = path.join('upload', Date.now() + '.jpg'/* path.extname(req.files.picture.name) */);

      req.files.picture.mv(path.join('public', pictureUrl), err => {
        if (err) {
          return next(err);
        }
        req.uploadfilename = pictureUrl;
        next();
      });

    } else {
      res.send(415).json({ success: false, message: 'accept only images' });
    }
  } else {
    next();
  }
};
