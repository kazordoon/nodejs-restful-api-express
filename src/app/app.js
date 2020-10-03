require('dotenv').config();
const express = require('express');
const cors = require('cors');
const consign = require('consign');
const setupRoutes = require('./routes');

class App {
  constructor() {
    this.express = express();

    this.load();
  }

  async load() {
    this.loadSettings();
    this.loadMiddlewares();
    await this.loadRoutes();
    this.handleRouteErrors();
  }

  loadSettings() {
    consign({ cwd: 'src/app', verbose: false })
      .then('controllers')
      .then('composers')
      .then('middlewares')
      .then('schemas')
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

  async loadRoutes() {
    await setupRoutes(this.express);
  }

  handleRouteErrors() {
    const {
      handleNotFoundPages,
      handleErrors,
    } = this.express.middlewares.errors;

    this.express.use(handleNotFoundPages);
    this.express.use(handleErrors);
  }

  async start() {
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
