const jwt = require('jsonwebtoken');

class TokenGenerator {
  static generate(payload) {
    return jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '1d',
    });
  }
}

module.exports = TokenGenerator;
