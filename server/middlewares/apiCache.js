const apiCache = require('apicache')
const cache = apiCache.middleware;

const cacheOn = (req, res) => {
    const cacheOption = req.body.cache || req.query.cache || process.env.NODE_ENV !== 'production';
    if(req.url === '/manifest.json') return true
    else if(req.url === '/robots.txt') return true
    if (!cacheOption) return false
    else return res.statusCode === 200;
}

const cacheSuccesses = cache('120 minutes', cacheOn);

module.exports = cacheSuccesses
