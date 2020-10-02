const jwt = require('jsonwebtoken');

module.exports = () => {
  class Token {
    static generate(payload) {
      return jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '1d',
      });
    }
  }

  return Token;
};
