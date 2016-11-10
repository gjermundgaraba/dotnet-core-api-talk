const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const bluebird   = require('bluebird');

const config = require('./config');
const bookRoutes = require('./model/book/book-router');

const app  = express();

mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/book', bookRoutes);

app.listen(config.server.port, function () {
  console.log(`Server listening on port ${config.server.port}`);
});

module.exports = app;
