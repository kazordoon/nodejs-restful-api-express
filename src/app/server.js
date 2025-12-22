const app = require('./app');
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

start();
