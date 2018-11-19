const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: [true, 'Username is required']
  },
  avatar: {
    type: String
  }
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);
