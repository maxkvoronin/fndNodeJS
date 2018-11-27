const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../models/User');

module.exports = function (passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'secret-word'
  };

  passport.use(new JwtStrategy(opts, function (jwpPayload, done) {
    userModel.findOne({ _id: jwpPayload._id }, function (err, user) {
      if (err) { return done(err, false); }
      if (user) { return done(null, user); }
      done(null, false);
    });
  }));
};
