'use strict';

var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ENV = process.env.NODE_ENV;
const SRC = path.resolve(`${__dirname}/src`);
const DEST = path.resolve(`${__dirname}/public`);

module.exports = [{
  context: path.join(__dirname, 'src'),
  entry: {
    style: './style.scss'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].css'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader?-url&minimize&sourceMap!sass-loader')
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}, {
  entry: './src/script.js',
  module : {
    loaders: [
      {
        test   : /\.js$/,
        loader : 'babel-loader',
        exclude: /node_modules/,
        query  : {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.ProvidePlugin({
  	}),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: [`${DEST}`] },
      open: true,
      files: [
        `${DEST}/*.php`,
        `${DEST}/*.html`,
        `${DEST}/*.css`,
        `${DEST}/*.js`
      ]
    })
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'script.js'
  }
}];
