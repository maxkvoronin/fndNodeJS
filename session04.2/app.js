var express = require('express');
var indexRouter = require('./routes/index');
var app = express();

const collectStat = require('./middleware/collectStat.js');

app.use(collectStat);
app.use('/', indexRouter);

module.exports = app;
