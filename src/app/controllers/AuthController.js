const { validationResult } = require('express-validator');
const { TokenGenerator, Encrypter } = require('../../utils');

module.exports = () => {
  class AuthController {
    constructor(userModel) {
      this.userModel = userModel;
    }

    async register(req, res) {
      try {
        console.log(this);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(422).json(errors.array());
        }

        const { username } = req.body;

        const userAlreadyExists = await this.userModel.findOne({ username });
        if (userAlreadyExists) {
          return res.status(409).json({ error: 'This user already exists' });
        }

        const user = await this.userModel.create(req.body);

        const token = TokenGenerator.generate({ id: user.id });
        return res.status(201).json({
          token,
        });
      } catch (err) {
        console.error(err);
        return res.status(400).json({ error: "Couldn't create a new account" });
      }
    }

    async login(req, res) {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(422).json(errors.array());
        }

        const { username, password } = req.body;

        const user = await this.userModel
          .findOne({ username })
          .select('+password');

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
    }
  }

  return AuthController;
};
