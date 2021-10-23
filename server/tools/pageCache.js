const LRUCache = require('lru-cache');
let pageCache = {}
pageCache.ssrCache = new LRUCache({
    max: 4000 * 1024 * 1024, /* cache size will be 100 MB using `return n.length` as length() function */
    length: function (n, key) {
        return n
    },
    maxAge: 1000 * 60 * 60 * 24 * 30
});

pageCache.getCacheKey = (req)=> {

    return `${req.path}`
}

pageCache.renderAndCache = async (req, res,targetComponent,queryParams,app)=>{
    const key = pageCache.getCacheKey(req);

    // If we have a page in the cache, let's serve it
    if (pageCache.ssrCache.has(key)) {
        res.setHeader('x-cache', 'HIT');
        res.send(pageCache.ssrCache.get(key));

    }else{
        try {
            const html = await app.render(req, res, targetComponent, queryParams);

            if (res.statusCode !== 200) {
                res.send(html);
            }
            pageCache.ssrCache.set(key, html);

            res.setHeader('x-cache', 'MISS');
            res.send(html)
        } catch (err) {
            console.log(err)
            await app.renderError(err, req, res, targetComponent, queryParams)
        }
    }


}


module.exports=pageCache