/* eslint-disable class-methods-use-this */
const os = require('os');
const cluster = require('cluster');

class Cluster {
  constructor() {
    this.numCPUs = os.cpus().length;
    this.isMaster = cluster.isMaster;
  }

  fork() {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.numCPUs; i++) {
      cluster.fork();
    }
  }

  logger() {
    cluster.on('online', (worker) => {
      console.log(`The worker with the PID ${worker.process.pid} is online.`);
    });

    cluster.on('disconnect', (worker) => {
      console.warn(
        `The worker with the PID ${worker.process.pid} has been disconnected.`,
      );
      console.warn('Creating a new worker...');
      cluster.fork();
    });
  }
}

module.exports = Cluster;
