const app = require('./app');
const { Cluster } = require('../utils');
require('../database');

const cluster = new Cluster();

if (cluster.isMaster) {
  cluster.fork();
  cluster.logger();
} else {
  app.start();
}
