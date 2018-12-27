var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');


module.exports = {
  context: __dirname,
  entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './frontend/assets/js/index'
  ],
  mode: 'development',
  output: {
      path: path.resolve('./frontend/assets/bundles/'),
      filename: "[name].js",
      publicPath: 'http://localhost:3000/assets/bundles/', // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    rules: [
      // we pass the output from babel loader to react-hot loader
      { 
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'], 
      },
      {
        test: /\.css$/,  
        include: /node_modules/,  
        loaders: ['style-loader', 'css-loader'],
      }
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },
}
