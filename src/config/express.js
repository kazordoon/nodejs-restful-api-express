require('dotenv').config();
const express = require('express');
const cors = require('cors');
const consign = require('consign');

const app = express();

module.exports = () => {
  app.use(express.json());
  app.use(cors());

  consign({ cwd: 'src' })
    .then('models')
    .then('utils')
    .then('controllers')
    .then('middlewares')
    .then('schemas')
    .then('routes')
    .into(app);

  const { courseRoutes, authRoutes } = app.routes;

  app.use(courseRoutes);
  app.use('/auth', authRoutes);

  const PORT = process.env.PORT || 3000;
  app.set('PORT', PORT);

  return app;
};
