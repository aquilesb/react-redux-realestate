const express = require('express'); // eslint-disable-line
const bodyParser = require('body-parser'); // eslint-disable-line
const uuidv1 = require('uuid/v1'); // eslint-disable-line
const db = require('./db.json');
const featuredProperties = require('../test/mockData/featuredProperties.json');
const { save2Json, generateToken, tokenValidatorMiddleware } = require('./serverUtils');

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
    app.get('/api/properties/new', (req, res) => {
      res.status(404).json({ message: 'An error has happened loading new properties. Try again.' });
    });
    // USER
    app.post('/api/user/validate', (req, res) => {
      const found = db.users.find(user => user.email === req.body.email);
      if (req.body.id) {
        if (found) {
          res.json({ message: 'ok' });
        } else {
          res.status(404).json({ _error: 'User not found.' });
        }
      } else if (found) {
        res.status(500).json({ email: 'Email is already used.' });
      } else {
        res.json({ message: 'ok' });
      }
    });
    // USER
    app.post('/api/user', (req, res) => {
      const found = db.users.find(user => user.email === req.body.email);
      if (req.body.id) {
        if (found) {
          db.users = db.users.map((user) => {
            if (user.id === req.body.id) {
              return Object.assign({}, found, req.body);
            }
            return user;
          });
          save2Json(db, () => {
            res.json({ message: 'ok' });
          });
        } else {
          res.status(404).json({ _error: 'User not found.' });
        }
      } else if (found) {
        res.status(500).json({ email: 'Email is already used.' });
      } else {
        const newUser = Object.assign(
          {},
          req.body,
          { id: uuidv1(), tokens: [], confirmPassword: undefined },
        );
        db.users.push(newUser);
        save2Json(db, () => {
          res.json({ message: 'ok' });
        });
      }
    });
    app.get('/api/user/email/:email', (req, res) => {
      const found = db.users.find(user => user.email === req.params.email);
      if (found) {
        res.status(500).json({ email: 'Invalid is already used.' });
      } else {
        res.json({ message: 'ok.' });
      }
    });
    app.get('/api/user/:id', tokenValidatorMiddleware, (req, res) => {
      const user = db.users.find(item => item.id === req.params.id);
      if (user) {
        res.json(Object.assign({}, user, { password: undefined, tokens: undefined }));
      } else {
        res.status(404).json({ email: 'User not found.' });
      }
    });
    app.post('/api/login', (req, res) => {
      const user = db.users
        .find(item => item.email === req.body.email && item.password === req.body.password);
      if (user) {
        const token = generateToken();
        user.tokens.push(token);
        res.json({ id: user.id, token });
      } else {
        res.status(500).json({ _error: 'Email and/or password are wrong.' });
      }
    });
    app.get('/api/search', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        data: featuredProperties,
        total: 102,
      }));
    });
    app.get('/api/agents/list', (req, res) => {
      res.sendFile(`${process.cwd()}/test/mockData/agents.json`);
    });
    app.get('/api/prices/list', (req, res) => {
      res.sendFile(`${process.cwd()}/test/mockData/priceType.json`);
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
        res.sendFile(`${process.cwd()}/dist/index.html`);
      } else {
        next();
      }
    });
  },
};

module.exports = devServer;
