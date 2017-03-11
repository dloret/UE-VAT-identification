import path from 'path';

module.exports = {
  entry: path.resolve(__dirname, '/src'),
  output: {
    path: path.resolve(__dirname, '/dist'),
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
