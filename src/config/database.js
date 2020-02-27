const mongoose = require('mongoose');

module.exports = (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error(`Erro ao conectar-se ao MongoDB:\n ${err}`));
};
