const LRUCache = require('lru-cache');

const ssrCache = new LRUCache({
    max: 500 , /* cache size will be 100 MB using `return n.length` as length() function */
    maxSize: 5000,
    sizeCalculation: (value, key)=> {
        return 1
    },
    dispose: (value, key) => {
        // freeFromMemoryOrWhatever(value)
    }

});


let sitemapXmlCacheMiddleware = async (req, res, next) => {

    const key = req.url
    const hasCache = ssrCache.has(key)

    // End the request with page cache and bypass the rest code by omitting the next() and return
    if (hasCache) {
        console.log('we have the cache');
        res.setHeader('x-cache', 'HIT')
        return res.end(ssrCache.get(key))
    }else{
        console.log('we no NOT have the cache');
        const html = await app.render(req, res, req.path, {...req.query,...req.params});
        res.setHeader('x-cache', 'MISS');
        ssrCache.set(key, html)
        next()
    }
}

module.exports = sitemapXmlCacheMiddleware