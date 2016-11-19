const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const bluebird   = require('bluebird');
const cors       = require('cors');
const validator  = require('express-validator');

const config = require('./config');
const bookRoutes = require('./rest/book-router');

const app  = express();

mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());

app.use('/api/books', bookRoutes);

app.listen(config.server.port, function () {
  console.log(`Server listening on port ${config.server.port}`);
});

module.exports = app;
