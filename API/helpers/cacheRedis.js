const { v4 } = require('uuid');
const client = require('redis').createClient({
  host: process.env.REDIS_IP,
  port: process.env.REDIS_PORT,
});
const { promisify } = require('util');

const getAsync = promisify(client.get).bind(client);
const asyncCatch = require('./asyncCatch');
require('dotenv').config({ path: '../config.env' });

client.on('error', (err) => {
  console.log(err);
});

module.exports = {
  getDataFromCache: asyncCatch(async (req, res, next) => {
    console.log(req.headers.cachekey);
    const data = await getAsync(req.headers.cachekey);
    if (data) {
      console.log('Data from cache');
      res.status(200).json(JSON.parse(data));
    } else {
      next();
    }
  }),
  setDataToCache: (data) => {
    const cacheKey = v4();
    const response = { cacheKey, ...data };
    client.setex(response.cacheKey, 1800, JSON.stringify(response));
    return response;
  },
};
