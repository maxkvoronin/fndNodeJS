const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userStats = require('../plugins/user.stats');

const userSchema = mongoose.Schema({
  _id:            { type: mongoose.Schema.Types.ObjectId, auto: true },
  username:       { type: String, unique: true, required: [true, 'Username is required'] },
  password:       { type: String, required: [true, 'Password is required'] },
  firstName:      { type: String },
  lastName:       { type: String },
  description:    { type: String },
  avatarUrl:      { type: String, default: 'images/term.jpeg' },
  email:          { type: String },

}, { versionKey: false });

//userSchema.plugin(userStats);


userSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(this.password, salt, null, (err, hash) => {
        if (err) {
          return next(err);
        }
        this.password = hash;
        next();
      });
    });
  }
});

userSchema.methods.comparePassword = function (passwd, cb) {
  bcrypt.compare(passwd, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

// userSchema.path('login').validate({
//   validator: value => mongoose.model('User').countDocuments({ login: value })
//     .then(count => !count)
//     .catch(err => { throw err; }),
//   message: `login already registered`
// });

module.exports = mongoose.model('User', userSchema);
