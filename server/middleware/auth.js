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

// let redisConfig = {
//   host: // Server hosting the postgres database
//   port: 6379 //env var: PGPORT // this should NOT be the same as your server's port
// };

//console.log('redisConfig before', redisConfig.host, redisConfig.port)

let params;
let auth;

if (process.env.REDIS_URL) {
  params = url.parse(process.env.REDIS_URL);
  auth = params.auth.split(':');
  redisClient = require('redis').createClient(process.env.REDIS_URL);
};

let redisConfig = {
    host: params.hostname ||  'localhost',
    port: params.port || 6379
    //database: params.pathname.split('/')[1],
    //ssl: true
};

console.log('redisConfig after', redisConfig.host, redisConfig.port, redisClient)

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
