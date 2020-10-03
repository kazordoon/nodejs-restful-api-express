module.exports = (app) => {
  const { User } = app.models;
  const { AuthController } = app.controllers;

  class AuthControllerComposer {
    static compose() {
      return new AuthController(User);
    }
  }

  return AuthControllerComposer;
};
