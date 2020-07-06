const jwt = require('jsonwebtoken');

module.exports = (app) => {
  const { User } = app.models;

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

    console.log(process.env.JWT_KEY);
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const { id } = decoded;
      req.userId = id;

      if (!await User.findById(id)) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      return next();
    });
  };

  return auth;
};
