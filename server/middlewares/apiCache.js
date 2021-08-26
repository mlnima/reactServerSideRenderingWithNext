const apicache = require('apicache')
const cache = apicache.middleware;

const cacheOn = (req, res) => {
    if(req.url === '/manifest.json') return true
    return res.statusCode === 200 && (req.body.cache || req.query.cache);
}

const cacheSuccesses = cache('1440 minutes', cacheOn);

module.exports = cacheSuccesses
