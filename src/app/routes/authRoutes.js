const router = require('express').Router();
const { userSchema: checkSchema } = require('../../validators');

module.exports = (app) => {
  const { authController } = app.controllers;

  router.post('/register', checkSchema, authController.register);
  router.post('/login', checkSchema, authController.login);

  return router;
};
