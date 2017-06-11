const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// express app setUp
const app = express();

// log requests to console
app.use(logger('dev'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes/user')(app);
require('./server/routes/document')(app);

app.get('*', (req, res) => res.status(200).send({
  message: "welcome to Efe's corner"
}));

module.exports = app;
