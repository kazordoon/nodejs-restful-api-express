const router = require('express').Router();
const { courseSchema } = require('../../validators');

module.exports = (app) => {
  const { coursesController } = app.controllers;
  const { auth } = app.middlewares;
  const {
    requiredSchema: checkRequiredSchema,
    optionalSchema: checkOptionalSchema,
  } = courseSchema;

  router.get('/', coursesController.index);
  router.get('/:id', coursesController.getOne);
  router.post('/', checkRequiredSchema, auth, coursesController.create);
  router.delete('/:id', auth, coursesController.destroy);
  router.patch('/:id', checkOptionalSchema, auth, coursesController.update);

  return router;
};
