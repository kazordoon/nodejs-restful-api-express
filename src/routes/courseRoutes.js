const router = require('express').Router();

module.exports = (app) => {
  const { courseController } = app.controllers;
  const { auth } = app.middlewares;
  const { requiredSchema, optionalSchema } = app.schemas.courseSchema;

  router.get('/', courseController.index);
  router.post('/', requiredSchema, auth, courseController.create);
  router.delete('/:id', auth, courseController.destroy);
  router.put('/:id', optionalSchema, auth, courseController.update);

  return router;
};
