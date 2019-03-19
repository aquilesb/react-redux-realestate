const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const devServer = require('./server/devServer');
const dotenv = require('dotenv');

let env;
const getEnv = () => {
  if (!env) {
    env = dotenv.config({ path: `${process.cwd()}/config/dev.env`}).parsed;
  }
  return env;
};
  
const envKeys = Object.keys(getEnv()).reduce((prev, next) => {
  prev[`${next}`] = JSON.stringify(getEnv()[next]);
  return prev;
}, {'NODE_ENV': "'development'"});

module.exports = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    './src/indexDev.jsx',
  ],
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.(scss|css)$/,
      use: [{
        loader: "style-loader", // creates style nodes from JS strings
      }, {
        loader: "css-loader", // translates CSS into CommonJS
      }, {
        loader: "sass-loader", // compiles Sass to CSS
      }],
    },
    {
      test: /\.(woff|woff2|eot|ttf|gif|png|jpe?g|svg)$/,
      loader: 'url-loader?limit=100000',
    },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new CopyPlugin([
      {from: 'public/fonts/', to: 'fonts'},
      {from: 'public/images/', to: 'images'},
      {from: 'public/index.html', to: 'index.html'}
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': envKeys
    }),
  ],
  devServer,
};
