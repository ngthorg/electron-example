require('babel-core/register');
require('babel-polyfill');

global.__DEV__ = true;

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.dev');

const app = express();

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true }
}));
app.use(webpackHotMiddleware(compiler));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index-dev.html'));
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:3000');
});
