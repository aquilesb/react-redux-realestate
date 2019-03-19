const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')();
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

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
}, {'NODE_ENV': "'production'"});


module.exports = {
  mode: 'production',
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].[hash].js',
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
    'process.env': envKeys
  }),
  new CopyPlugin([
    {from: 'public/fonts/', to: 'fonts'},
    {from: 'public/images/', to: 'images'}
  ]),
  new HtmlWebpackPlugin({
    title: 'React Redux Real Estate',
    meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    base: "https://example.com/path/",
    template: 'public/template.html'
  }),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: [{ path: 'js', glob: '*.js' }],
    assets: [{ path: 'css', glob: '*.css' }],
    append: false,
    hash: function(assetName, hash) {
      assetName = assetName.replace(/\.js$/, '.' + hash + '.js');
      assetName = assetName.replace(/\.css$/, '.' + hash + '.css');
      return assetName;
    }
  })
  ]
};