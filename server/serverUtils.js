const fs = require('fs');
const db = require('./db.json');

const save2Json = (obj, callback, file = 'db.json') => {
  const json = JSON.stringify(obj);
  fs.writeFile(`${process.cwd()}/server/${file}`, json, 'utf8', callback);
};

const generateToken = (length = 64) => {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];
  for (let i = 0; i < length; i += 1) {
    const j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join('');
};

const tokenValidatorMiddleware = (req, res, next) => {
  let found = null;
  let token = null;
  if (req.headers.authorization && req.headers.authorization.indexOf('Bearer') > -1) {
    token = req.headers.authorization.substr(7);
    found = db.users.filter(user => user.tokens.find(userToken => userToken === token));
  }
  if (found && token) {
    req.accessToken = found[0].tokens.find(userToken => userToken === token);
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized request' });
  }
};

module.exports = {
  save2Json,
  generateToken,
  tokenValidatorMiddleware,
};
