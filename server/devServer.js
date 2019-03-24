const express = require('express'); // eslint-disable-line
const path = require('path'); // eslint-disable-line
const bodyParser = require('body-parser'); // eslint-disable-line
const compression = require('compression'); // eslint-disable-line
const addRouters2App = require('./serverRoutes'); // eslint-disable-line
const uuidv1 = require('uuid/v1'); // eslint-disable-line

const mockPropertiesPath = path.resolve(__dirname, '..', 'src', 'modules', 'Properties', 'Tests', 'properties.mock.json');

const mockPriceTypePath = path.resolve(__dirname, '..', 'src', 'modules', 'Search', 'Tests', 'priceType.mock.json');

const mockAgentsPath = path.resolve(__dirname, '..', 'src', 'modules', 'Agents', 'Tests', 'agents.mock.json');


const featuredProperties = require(mockPropertiesPath); // eslint-disable-line
const index = path.resolve(__dirname, '..', 'dist', 'index.html');

const getHome = (req, res) => res.sendFile(index);

const devServer = {
  port: 8008,
  contentBase: './dist',
  hot: true,
  proxy: {
    '/api': {
      target: 'http://localhost:1337',
      secure: false,
    },
  },
  setup: (app) => {
    app.use(bodyParser.json());
    app.use(compression());

    app.use('/static', express.static('dist'));
    app.get('/not-found', getHome);
    app.get('/search', getHome);
    app.get('/about', getHome);
    app.get('/agents', getHome);
    app.get('/blog', getHome);
    app.get('/contact', getHome);
    app.get('/property/:name', getHome);
    app.get('/blog/:name', getHome);
    app.get('/api/properties/featured', (req, res) => {
      res.sendFile(mockPropertiesPath);
    });
    app.get('/api/properties/recommended', (req, res) => {
      res.sendFile(mockPropertiesPath);
    });
    app.get('/api/properties/hot', (req, res) => {
      res.sendFile(mockPropertiesPath);
    });
    app.get('/api/properties/new', (req, res) => {
      res.status(404).json({ message: 'An error has happened loading new properties. Try again.' });
    });
    addRouters2App(app);
    app.get('/api/search', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        data: featuredProperties,
        total: 102,
      }));
    });
    app.get('/api/agents/list', (req, res) => {
      res.sendFile(mockAgentsPath);
    });
    app.get('/api/prices/list', (req, res) => {
      res.sendFile(mockPriceTypePath);
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
        && check('.ico')) {
        res.sendFile(index);
      } else {
        next();
      }
    });
  },
};

module.exports = devServer;
