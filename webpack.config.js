'use strict';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');


const sassLoaders = [
  'css-loader',
  'autoprefixer-loader',
  'sass-loader?indentedSyntax=scss&includePaths[]=' + path.join(__dirname, 'src') + '&includePaths[]=' + path.join(__dirname, 'node_modules')
];

const config = Object.create({
	debug: false,
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.sass', '.scss', '.css'],
    modulesDirectories: ['src', 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            ['syntax-async-functions'],
            ['transform-decorators-legacy']
          ]
        }
      }, {
        test: /\.(sass|scss|css)$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'), {
					publicPath: path.join(__dirname, 'public/')
				})
      }, {
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: 'url-loader?limit=10240'
			}, {
				test: /\.(eot|woff2|woff|ttf|svg)$/,
				loader: 'url-loader'
			}
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: { warnings: false },
      output: { comments: false }
    })
  ],
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here (mysql, mongodb, and so on..)
  ]
});

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
