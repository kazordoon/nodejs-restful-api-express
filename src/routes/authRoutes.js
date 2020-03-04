const router = require('express').Router();

module.exports = (app) => {
  const { authController } = app.controllers;
  const { userSchema: checkSchema } = app.schemas;

  router.post('/register', checkSchema, authController.register);
  router.post('/login', checkSchema, authController.login);

  return router;
};
