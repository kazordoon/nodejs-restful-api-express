const router = require('express').Router();
const { courseSchema } = require('../../validators');

module.exports = (app) => {
  const { auth } = app.middlewares;
  const { checkRequiredSchema, checkOptionalSchema } = courseSchema;
  const { CoursesControllerComposer } = app.composers;

  const coursesController = CoursesControllerComposer.compose();

  router.get('/', (req, res) => coursesController.index(req, res));
  router.get('/:id', (req, res) => coursesController.show(req, res));
  router.post('/', checkRequiredSchema, auth, (req, res) => (
    coursesController.create(req, res)
  ));
  router.delete('/:id', auth, (req, res) => (
    coursesController.destroy(req, res)
  ));
  router.patch('/:id', checkOptionalSchema, auth, (req, res) => (
    coursesController.update(req, res)
  ));

  return router;
};
