const apiCache = require('apicache')
const cache = apiCache.middleware;

const cacheOn = (req, res) => {
    if(req.url === '/manifest.json') return true
    if(req.url === '/robots.txt') return true
    return res.statusCode === 200 && (req.body.cache || req.query.cache);
}

const cacheSuccesses = cache('1440 minutes', cacheOn);

module.exports = cacheSuccesses
