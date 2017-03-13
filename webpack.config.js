const path = require('path');

module.exports = {
  entry: path.resolve(path.join(__dirname, '/src')),
  output: {
    path: path.resolve(path.join(__dirname, '/build')),
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'
      },
      {
        test: /\.txt$/, loader: 'raw-loader'
      }
    ]
  }
};
