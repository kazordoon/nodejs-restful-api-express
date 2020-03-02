const mongoose = require('mongoose');

module.exports = (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(`Error connecting to MongoDB:\n ${err}`));
};
