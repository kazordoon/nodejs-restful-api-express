const Context = require('../../infra/strategies/base/ContextStrategy');
const MongoDB = require('../../infra/strategies/mongodb');
const { Course } = require('../../infra/strategies/mongodb/schemas');

module.exports = (app) => {
  const { CoursesController } = app.controllers;

  class CoursesControllerComposer {
    static async compose() {
      const connection = await MongoDB.connect();
      const mongodb = new MongoDB(connection, Course);
      const context = new Context(mongodb);
      return new CoursesController(context);
    }
  }

  return CoursesControllerComposer;
};
