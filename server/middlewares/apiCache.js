const apicache = require('apicache')
const cache = apicache.middleware;
const cacheOn = (req, res) => {
    return res.statusCode === 200 && req.body.cache;
}
const cacheSuccesses = cache('1 day', cacheOn);

module.exports = cacheSuccesses