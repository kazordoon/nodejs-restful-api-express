const jwt = require('jsonwebtoken');

module.exports = (app) => {
  const generateToken = (params) => (
    jwt.sign(params, process.env.SECRET_KEY, {
      expiresIn: 86400,
    })
  );

  return generateToken;
};
