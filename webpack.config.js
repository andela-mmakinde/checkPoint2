const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'public'),
  devtool: 'source-map',
  entry: './scripts.js',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  output: {
    path: `${__dirname}/public/`,
    filename: 'bundle.js',
  },
  plugins: debug ? [
    new ExtractTextPlugin('style.css'),
    new Dotenv({
      path: './.env',
    }),
  ] : [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};

