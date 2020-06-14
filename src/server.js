const app = require('./config/express')();
const Cluster = require('./utils/Cluster')();

require('./config/database')(process.env.MONGO_URL);

const cluster = new Cluster();

if (cluster.isMaster) {
  cluster.fork();
  cluster.logger();
} else {
  app.listen(app.get('PORT'), () => {
    console.log(`Server running on *:${app.get('PORT')}`);
  });
}
