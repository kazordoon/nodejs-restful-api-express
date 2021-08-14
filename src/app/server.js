const app = require('./app');
const { Cluster } = require('../utils');
const MongoDB = require('../infra/strategies/mongodb');

const start = async () => {
  await MongoDB.connect();
  app.start();
};

process.on('SIGINT', async () => {
  await MongoDB.disconnect();
  app.close();

  process.exit(0);
});

const cluster = new Cluster();

if (cluster.isMaster) {
  cluster.fork();
  cluster.logger();
} else {
  start();
}
