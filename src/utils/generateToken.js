const jwt = require('jsonwebtoken');

module.exports = (app) => {
  const generateToken = (params) => (
    jwt.sign(params, process.env.JWT_KEY, {
      expiresIn: '1d',
    })
  );

  return generateToken;
};
