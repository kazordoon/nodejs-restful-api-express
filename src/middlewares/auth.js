const jwt = require('jsonwebtoken');

module.exports = (app) => {
  // eslint-disable-next-line consistent-return
  const auth = (req, res, next) => {
    // Authorization header syntax:
    // Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token was not provided' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Token error' });
    }

    const [scheme, token] = parts;

    if (scheme.toLowerCase() !== 'bearer') {
      return res.status(401).json({ error: 'Malformatted token' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      return next();
    });
  };

  return auth;
};
