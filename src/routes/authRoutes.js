const router = require('express').Router();

module.exports = (app) => {
  const { authController } = app.controllers;
  const { userSchema: checkSchema } = app.schemas;

  router.post('/register', checkSchema, authController.register);
  router.post('/authenticate', checkSchema, authController.authenticate);

  return router;
};
