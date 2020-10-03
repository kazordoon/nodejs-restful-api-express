require('dotenv').config();
const express = require('express');
const cors = require('cors');
const consign = require('consign');

class App {
  constructor() {
    this.express = express();

    this.loadSettings();
    this.loadMiddlewares();
    this.loadRoutes();
    this.handleRouteErrors();
  }

  loadSettings() {
    consign({ cwd: 'src/app', verbose: false })
      .then('models')
      .then('controllers')
      .then('middlewares')
      .then('schemas')
      .then('routes')
      .into(this.express);

    const PORT = process.env.PORT || 3000;
    this.express.set('PORT', PORT);
  }

  loadMiddlewares() {
    this.express.use(express.json());
    this.express.use(
      cors({
        origin: process.env.CORS_ORIGIN,
      }),
    );
  }

  loadRoutes() {
    const { courseRoutes, authRoutes } = this.express.routes;

    this.express.use('/courses', courseRoutes);
    this.express.use('/auth', authRoutes);
  }

  handleRouteErrors() {
    const {
      handleNotFoundPages,
      handleErrors,
    } = this.express.middlewares.errors;

    this.express.use(handleNotFoundPages);
    this.express.use(handleErrors);
  }

  start() {
    this.connection = this.express.listen(this.express.get('PORT'), () => {
      console.log(`Server running on *:${this.express.get('PORT')}`);
    });
  }

  close() {
    if (this.connection) {
      this.connection.close();
    }
  }
}

module.exports = new App();
