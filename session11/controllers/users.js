const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

module.exports.signUp = async (req, res, next) => {
  try {

    await UserModel.create({
      login: req.body.username,
      password: req.body.password,
      fullname: req.body.fullname
    });

    res.status(201).json({ success: true, message: 'user created' });
  } catch (err) {
    next(err);
  }
};

module.exports.signIn = async (req, res, next) => {
  try {

    const user = await UserModel.findOne()
      .where({ login: req.body.username })
      .exec();

    if (!user) {
      return res.status(401).json({ success: false, message: 'unknown username' });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!err && isMatch) {
        const token = jwt.sign(user.toObject(), 'secret-word', { expiresIn: '1d' });
        return res.status(200).json({ success: true, token: 'JWT ' + token });
      }
      res.status(401).send({ success: false, message: 'Authentication failed. Wrong password' });
    });

  } catch (err) {
    next(err);
  }
};



