const LRUCache = require('lru-cache');
let pageCache = {}
pageCache.ssrCache = new LRUCache({
    max: 100 * 1024 * 1024, /* cache size will be 100 MB using `return n.length` as length() function */
    length: function (n, key) {
        return n.length
    },
    maxAge: 1000 * 60 * 60 * 24 * 30
});


pageCache.getCacheKey = (req)=> {
    return `${req.path}`
}


pageCache.renderAndCache = async (req, res,app)=>{
    const key = pageCache.getCacheKey(req);

    // If we have a page in the cache, let's serve it
    if (pageCache.ssrCache.has(key)) {
        //console.log(`serving from cache ${key}`);
        res.setHeader('x-cache', 'HIT');
        res.send(pageCache.ssrCache.get(key));
        return
    }

    try {
        //console.log(`key ${key} not found, rendering`);
        // If not let's render the page into HTML
        const html = await app.renderToHTML(req, res, req.path, req.query);

        // Something is wrong with the request, let's skip the cache
        if (res.statusCode !== 200) {
            res.send(html);
            return
        }

        // Let's cache this page
        pageCache.ssrCache.set(key, html);

        res.setHeader('x-cache', 'MISS');
        res.send(html)
    } catch (err) {
        console.log(err)
        // app.renderError(err, req, res, req.path, req.query)
    }
}


module.exports=pageCache