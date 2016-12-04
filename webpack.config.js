var path = require("path");
var webpack = require('webpack');
module.exports = {
  context: __dirname,
  entry: {
    app: path.join(__dirname, 'frontend', 'main.js')
  },
  output: {
    path: path.join(__dirname, 'app','assets','javascripts'),
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude:[ /node_modules/,/frontend/]
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy'],
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
