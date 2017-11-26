const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
    './example1/static/index': ['babel-polyfill', './example1/static/index'],
    './example2/static/index': ['babel-polyfill', './example2/static/index'],
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
      },
      {
        test: /\.sass/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].bundle.css')
  ]
};

module.exports = config;
