module.exports = (app) => {
  const { Course } = app.models;
  const { CoursesController } = app.controllers;

  class CoursesControllerComposer {
    static compose() {
      return new CoursesController(Course);
    }
  }

  return CoursesControllerComposer;
};
