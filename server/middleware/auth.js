const session = require('express-session');
const RedisStore = require('connect-redis')(session);
let redisClient = require('redis').createClient();
const url = require('url');

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

let redisConfig = {
  host: 'localhost', // Server hosting the postgres database
  port: 6379 //env var: PGPORT // this should NOT be the same as your server's port
};

console.log('redisConfig before', redisConfig.host, redisConfig.port)

if (process.env.REDIS_URL) {
  const params = url.parse(process.env.REDIS_URL);
  const auth = params.auth.split(':');

  redisConfig = {
    host: params.hostname,
    port: params.port,
    //database: params.pathname.split('/')[1],
    ssl: true
  };

  redisClient = require('redis').createClient(process.env.REDIS_URL);

};

console.log('redisConfig after', redisConfig.host, redisConfig.port)

let redisSession = session({
  store: new RedisStore({
    client: redisClient,
    host: redisConfig.host,
    port: redisConfig.port
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});

console.log('Connected to Redis')

module.exports.session = redisSession;
