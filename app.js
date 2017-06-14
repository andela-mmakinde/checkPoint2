const express = require('express');
const logger = require('morgan');
const path = require('path');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config.js');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// compiler for webpack
const compiler = webpack(webpackConfig);

// express app setUp
const app = express();

// log requests to console
app.use(logger('dev'));

// import webpack into express server
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes/user')(app);
require('./server/routes/document')(app);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './index.html'))
);

module.exports = app;
