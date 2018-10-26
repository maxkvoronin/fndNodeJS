const express = require('express');
const indexRouter = require('./routes/index');
const measureCapacity = require('./middleware/measureCapacity');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(measureCapacity);

app.use('/', indexRouter);

module.exports = app;
