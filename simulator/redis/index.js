const redisConfig = require('../config/default.json').redis;
const Redis = require("ioredis");
const redis = new Redis(redisConfig.port, redisConfig.host);

module.exports = {
    redis: redis
}