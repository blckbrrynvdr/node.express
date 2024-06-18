const redis = require('redis');
const config = require("../config");

const client = redis.createClient({ url: config.REDIS_URL });

(async () => {
    await client.connect();
})()

module.exports = client;