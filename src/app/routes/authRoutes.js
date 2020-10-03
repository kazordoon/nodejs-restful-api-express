const router = require('express').Router();
const { userSchema: checkSchema } = require('../../validators');

module.exports = (app) => {
  const { AuthControllerComposer } = app.composers;

  const authController = AuthControllerComposer.compose();

  router.post('/register', checkSchema, (req, res) => (
    authController.register(req, res)
  ));
  router.post('/login', checkSchema, (req, res) => (
    authController.login(req, res)
  ));

  return router;
};
