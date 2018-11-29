const webpack = require('webpack');
const express = require('express');

module.exports = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx',
  ],
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.scss$/,
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
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: 8008,
    contentBase: './dist',
    hot: true,
    proxy: {
      "/api": {
        target: "http://localhost:1337",
        secure: false,
      },
    },
    setup: (app) => {
      app.use('/static', express.static('dist'));
      app.get('/search', (req, res) => {
        res.sendFile(`${process.cwd()}/dist/index.html`);
      });
      app.get('/about', (req, res) => {
        res.sendFile(`${process.cwd()}/dist/index.html`);
      });
      app.get('/agents', (req, res) => {
        res.sendFile(`${process.cwd()}/dist/index.html`);
      });
      app.get('/blog', (req, res) => {
        res.sendFile(`${process.cwd()}/dist/index.html`);
      });
      app.get('/contact', (req, res) => {
        res.sendFile(`${process.cwd()}/dist/index.html`);
      });
      app.get('/property/:name', (req, res) => {
        res.sendFile(`${process.cwd()}/dist/index.html`);
      });
      app.get('/blog/:name', (req, res) => {
        res.sendFile(`${process.cwd()}/dist/index.html`);
      });
      app.get('/api/properties/featured', (req, res) => {
        res.sendFile(`${process.cwd()}/test/mockData/featuredProperties.json`);
      });
      app.get('/api/properties/recommended', (req, res) => {
        res.sendFile(`${process.cwd()}/test/mockData/featuredProperties.json`);
      });
      app.get('/api/properties/hot', (req, res) => {
        res.sendFile(`${process.cwd()}/test/mockData/featuredProperties.json`);
      });
      app.get('/api/search', (req, res) => {
        const data = require(`${process.cwd()}/test/mockData/featuredProperties.json`);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          data,
          total: 102,
        }));
      });
      app.get('/api/agents/list', (req, res) => {
        res.sendFile(`${process.cwd()}/test/mockData/agents.json`);
      });
      app.get('/api/prices/list', (req, res) => {
        res.sendFile(`${process.cwd()}/test/mockData/priceType.json`);
      });
      app.get('/api/user/:id', (req, res) => {
        res.sendFile(`${process.cwd()}/test/mockData/userDetail.json`);
      });
      app.get('*', (req, res, next) => {
        const check = ext => req.originalUrl.indexOf(ext) === -1;
        if (
          check('.js')
          && check('.css')
          && check('.jpg')
          && check('.png')
          && check('.svg')
          && check('.ttf')
          && check('.eot')
          && check('.woff')
          && check('.ico')
        ){
          res.sendFile(`${process.cwd()}/dist/index.html`);
        } else {
          next();
        }
      });
    },
  },
};
