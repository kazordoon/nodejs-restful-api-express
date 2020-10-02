const RedisStatic = require('ioredis');
const redisConfig = require('../config/redis');

class Redis {
  constructor() {
    this.redis = new RedisStatic(redisConfig);

    this.logger();
  }

  logger() {
    this.redis.on('connect', () => {
      console.log('Redis connected');
    });
    this.redis.on('error', (err) => {
      console.error(`Redis error: ${err.message}`);
    });
  }
}

module.exports = new Redis().redis;
