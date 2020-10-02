const { validationResult } = require('express-validator');
const { TokenGenerator, Encrypter } = require('../../utils');

module.exports = (app) => {
  const { User } = app.models;

  const register = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }

      const { username } = req.body;

      const userAlreadyExists = await User.findOne({ username });
      if (userAlreadyExists) {
        return res.status(409).json({ error: 'This user already exists' });
      }

      const user = await User.create(req.body);

      const token = TokenGenerator.generate({ id: user.id });
      return res.status(201).json({
        token,
      });
    } catch (err) {
      return res.status(400).json({ error: "Couldn't create a new account" });
    }
  };

  const login = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }

      const { username, password } = req.body;

      const user = await User.findOne({ username }).select('+password');

      if (!user) {
        return res.status(400).json({ error: "This user doesn't exist" });
      }

      const isThePasswordIncorrect = !(await Encrypter.compare(
        password,
        user.password,
      ));
      if (isThePasswordIncorrect) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      const token = TokenGenerator.generate({ id: user.id });
      return res.json({
        token,
      });
    } catch (err) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  };

  return {
    register,
    login,
  };
};
