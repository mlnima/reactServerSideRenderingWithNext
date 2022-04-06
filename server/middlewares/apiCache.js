const apiCache = require('apicache')
const cache = apiCache.middleware;
apiCache.options({
    debug: process.env.NODE_ENV !== 'production',
    appendKey: (req, res) => {
        const userAgent = req.headers['user-agent'];
        const isMobile = Boolean(userAgent?.match(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        ))
        return  '-' +  (isMobile  ? 'Mobile' : 'Desktop')

    }
})




const cacheOn = (req, res) => {

    const checkBodyCacheOption = req.body.cache === 'true' || !req.body.cache;
    const checkQueryCacheOption = req.query.cache === 'true' || !req.query.cache;
    const checkStatusForCacheOption =  res.statusCode === 200;
    const checkEnvForCacheOption = process.env.NODE_ENV === 'production'

    const dynamicUrlMatch = req.url.includes('/sitemaps/') || req.url.includes('/sitemap/')
    const checkStaticRouteForCacheOption = req.url.match( /\/manifest.json|\/robots.txt|\/sitemap.xml|\/sitemap|\/sw.js/g )

    const cacheOption = (checkBodyCacheOption &&
                        checkQueryCacheOption &&
                        checkStatusForCacheOption &&
                        checkEnvForCacheOption) ||
                        checkStaticRouteForCacheOption ||
                        dynamicUrlMatch


    return cacheOption
}

const cacheSuccesses = cache('480 minutes', cacheOn);

module.exports = cacheSuccesses
