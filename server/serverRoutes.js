const uuidv1 = require('uuid/v1'); // eslint-disable-line
const db = require('./db.json');
const { save2Json, generateToken, tokenValidatorMiddleware } = require('./serverUtils');

const addRouters2App = (app) => {
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
      save2Json(db, () => {
        res.json({ id: user.id, token });
      });
    } else {
      res.status(500).json({ _error: 'Email and/or password are wrong.' });
    }
  });
};

module.exports = addRouters2App;
