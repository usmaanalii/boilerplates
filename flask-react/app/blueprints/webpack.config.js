const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    './example/static/js/index': ['babel-polyfill', './example/static/js/index'],
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};

module.exports = config;
