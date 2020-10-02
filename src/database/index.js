const mongoose = require('mongoose');
const { URL, options } = require('../config/database');

mongoose
  .connect(URL, options)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(`Error connecting to MongoDB:\n ${err}`));
