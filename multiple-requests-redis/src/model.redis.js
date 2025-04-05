const redis = require("redis");
const client = redis.createClient();

client.connect();

const get = (key) => client.get(key);
const set = (key, value) => client.set(key, value);
const incrby = (key, value) => client.incrBy(key, value);
const exists = (key) => client.exists(key);
const setnx = (key, value) => client.setNX(key, value);

module.exports = { get, set, incrby, exists, setnx };
