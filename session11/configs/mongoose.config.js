const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/jex', {
  user: 'max2',
  pass: 'pass',
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
  console.log('mongo connected');
});

mongoose.connection.on('error', err => {
  console.log(err);
});

mongoose.connection.on('disconnected', () => {
  console.log('mongodb connection closed');
});

mongoose.set('useFindAndModify', false);
