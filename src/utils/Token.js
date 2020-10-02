const jwt = require('jsonwebtoken');

class Token {
  static generate(payload) {
    return jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '1d',
    });
  }
}

module.exports = Token;
