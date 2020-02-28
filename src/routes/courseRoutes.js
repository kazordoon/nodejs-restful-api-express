const router = require('express').Router();

module.exports = (app) => {
  const { courseController } = app.controllers;
  const { auth } = app.middlewares;
  const {
    courseSchema: {
      required: requiredPayload,
      optional: optionalPayload,
    },
  } = app.schemas;

  router.get('/', courseController.index);
  router.post('/', requiredPayload, auth, courseController.create);
  router.delete('/:id', auth, courseController.destroy);
  router.put('/:id', optionalPayload, auth, courseController.update);

  return router;
};
