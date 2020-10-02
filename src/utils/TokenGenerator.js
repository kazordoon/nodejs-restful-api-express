const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/token')();

class TokenGenerator {
  static generate(payload) {
    return jwt.sign(payload, secretKey, {
      expiresIn: '1d',
    });
  }
}

module.exports = TokenGenerator;
