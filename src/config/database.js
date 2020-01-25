const mongoose = require('mongoose');

module.exports = function(url) {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('Banco de dados conectado em ' + url))
  .catch(err => console.error(err));
}