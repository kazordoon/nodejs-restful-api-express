const router = require('express').Router();

module.exports = (app) => {
  const { courseController } = app.controllers;
  const { auth } = app.middlewares;

  router.get('/', courseController.index);
  router.post('/', auth, courseController.create);
  router.delete('/:id', auth, courseController.destroy);
  router.put('/:id', auth, courseController.update);

  return router;
};
