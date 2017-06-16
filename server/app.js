import express from 'express';
import logger from 'morgan';
import path from 'path';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackConfig from '../webpack.config';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import documents from './routes/document';
import users from './routes/user';
import roles from './routes/role';

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

documents(app);
users(app);
roles(app);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../index.html'))
);

module.exports = app;
