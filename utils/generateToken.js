
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_very_secure_secret_key';

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
