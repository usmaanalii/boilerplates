const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
    './charts/static/js/index': ['babel-polyfill', './charts/static/js/index'],
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
        test: /\.css/,
        loader: ExtractTextPlugin.extract('css-loader')
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].bundle.css')
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common/static/js/d3',
    //   minChunks: m => /node_modules\/(?:d3)/.test(m.context)
    // }),
  ]
};

module.exports = config;
