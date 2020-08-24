const router = require('express').Router();

module.exports = (app) => {
  const { coursesController } = app.controllers;
  const { auth } = app.middlewares;
  const { requiredSchema, optionalSchema } = app.schemas.courseSchema;

  router.get('/', coursesController.index);
  router.get('/:id', coursesController.getOne);
  router.post('/', requiredSchema, auth, coursesController.create);
  router.delete('/:id', auth, coursesController.destroy);
  router.patch('/:id', optionalSchema, auth, coursesController.update);

  return router;
};
