const Context = require('../../infra/strategies/base/ContextStrategy');
const MongoDB = require('../../infra/strategies/mongodb');
const { User } = require('../../infra/strategies/mongodb/schemas');

module.exports = (app) => {
  const { AuthController } = app.controllers;

  class AuthControllerComposer {
    static async compose() {
      const connection = await MongoDB.connect();
      const mongodb = new MongoDB(connection, User);
      const context = new Context(mongodb);
      return new AuthController(context);
    }
  }

  return AuthControllerComposer;
};
