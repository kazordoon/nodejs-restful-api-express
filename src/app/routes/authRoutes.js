const routes = require('express').Router();
const { userSchema: checkSchema } = require('../../validators');

module.exports = async (app) => {
  const { AuthControllerComposer } = app.composers;

  const authController = await AuthControllerComposer.compose();

  routes.post('/register', checkSchema, (req, res) => authController.register(req, res));

  routes.post('/login', checkSchema, (req, res) => authController.login(req, res));

  app.use('/auth', routes);
};
