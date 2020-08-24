const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = (app) => {
  const { User } = app.models;

  const auth = async (req, res, next) => {
    // Authorization header syntax:
    // Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token was not provided' });
    }

    const parts = authHeader.split(' ');

    const invalidAuthorizationHeader = parts.length !== 2;
    if (invalidAuthorizationHeader) {
      return res.status(401).json({ error: 'Token error' });
    }

    const [scheme, token] = parts;

    const invalidScheme = scheme.toLowerCase() !== 'bearer';
    if (invalidScheme) {
      return res.status(401).json({ error: 'Malformatted token' });
    }

    try {
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);

      const { id } = decoded;
      req.userId = id;

      const userNotFound = !(await User.findById(id));
      if (userNotFound) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };

  return auth;
};
