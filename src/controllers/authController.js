const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

module.exports = (app) => {
  const { User } = app.models;
  const { generateToken } = app.utils;

  const register = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }

      const { username } = req.body;

      if (await User.findOne({ username })) {
        return res.status(409).json({ error: 'This user already exists' });
      }

      const user = await User.create(req.body);

      return res.status(201).json({
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).json({ error: "Couldn't create a new account" });
    }
  };

  const authenticate = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }

      const { username, password } = req.body;

      // The "select" function is used to return the user's password
      const user = await User.findOne({ username }).select('+password');

      if (!user) {
        return res.status(400).json({ error: "This user doesn't exist" });
      }

      if (!await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      return res.json({
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  };

  return {
    register,
    authenticate,
  };
};
