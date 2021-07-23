const apicache = require('apicache')
const cache = apicache.middleware;
const cacheOn = (req, res) => {
    return res.statusCode === 200 && req.body.cache;
}
const cacheSuccesses = cache('365 day', cacheOn);

module.exports = cacheSuccesses



//should change with node cache,reason TimeoutOverflowWarning: 31536000000 does not fit into a 32-bit signed integer.
// Timeout duration was set to 1.
//https://medium.com/@danielsternlicht/caching-like-a-boss-in-nodejs-9bccbbc71b9b