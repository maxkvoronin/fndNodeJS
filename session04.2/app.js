const express = require('express');
const indexRouter = require('./routes/index');
const app = express();

const collectStat = require('./middleware/collectStat.js');

app.use(collectStat);
app.use('/', indexRouter);

module.exports = app;
