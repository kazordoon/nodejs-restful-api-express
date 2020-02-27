const router = require('express').Router();

module.exports = (app) => {
  const { authController } = app.controllers;

  router.post('/register', authController.register);
  router.post('/authenticate', authController.authenticate);

  return router;
};
