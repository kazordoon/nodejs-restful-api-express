const routes = require('express').Router();
const { courseSchema } = require('../../validators');

module.exports = async (app) => {
  const { auth } = app.middlewares;
  const { checkRequiredSchema, checkOptionalSchema } = courseSchema;
  const { CoursesControllerComposer } = app.composers;

  const coursesController = await CoursesControllerComposer.compose();

  routes.get('/', (req, res) => coursesController.index(req, res));
  routes.get('/:id', (req, res) => coursesController.show(req, res));
  routes.post('/', checkRequiredSchema, auth, (req, res) => coursesController.create(req, res));
  routes.delete('/:id', auth, (req, res) => coursesController.destroy(req, res));
  routes.patch('/:id', checkOptionalSchema, auth, (req, res) => coursesController.update(req, res));

  app.use('/courses', routes);
};
