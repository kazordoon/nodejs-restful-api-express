const app = require('./config/express');
const { Cluster } = require('../utils');
require('../database');

const cluster = new Cluster();

if (cluster.isMaster) {
  cluster.fork();
  cluster.logger();
} else {
  app.listen(app.get('PORT'), () => {
    console.log(`Server running on *:${app.get('PORT')}`);
  });
}
