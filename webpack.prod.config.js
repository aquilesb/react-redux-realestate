const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')();
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
  mode: 'production',
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].[hash].bundle.js',
  },
  devtool: "none",
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: {
                safe: true,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"],
              },
              plugins: () => [
                autoprefixer,
              ],
            },
          },
          {
            loader: "sass-loader",
            options: {},
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: path.resolve(__dirname, 'node_modules'),
          name: 'vendors',
          enforce: true
        },
      },
    }
  },
  plugins: [
    new UglifyJSPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode : 'static'
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new HtmlWebpackPlugin({
    inject: false,
    hash: true,
    template: './public/test.html',
    filename: 'test.html'
  }),
  new WebpackMd5Hash()
  ]
};