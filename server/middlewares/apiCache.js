const apiCache = require('apicache')
const cache = apiCache.middleware;

apiCache.options({
    debug: process.env.NODE_ENV !== 'production',
    //debug: true,
    appendKey: (req, res) => {
        const userAgent = req.headers['user-agent'];
        const isMobile = Boolean(userAgent?.match(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        ))
        return  '-' +  (isMobile  ? 'Mobile' : 'Desktop')
    }
})


const cacheOn = (req, res) => {

    const checkBodyCacheOption = (req.body.cache === 'true' || !req.body.cache) && req.body.cache !== 'false' ;
    const checkQueryCacheOption = (req.query.cache === 'true' || !req.query.cache) && req.query.cache !== 'false';
    const checkStatusForCacheOption =  res.statusCode === 200;
    const checkEnvForCacheOption = process.env.NODE_ENV === 'production'
    const dynamicUrlMatch = req.url.includes('/sitemaps/') || req.url.includes('/sitemap/')
    const checkStaticRouteForCacheOption = req.url.match( /\/manifest.json|\/robots.txt|\/sitemap.xml|\/sitemap|\/sw.js/g )
    const notCacheUrls =  !req.url.includes('/_next') &&
                          !req.url.includes('/workbox/') &&
                          !req.url.includes('/workbox') &&
                          !req.url.includes('/admin/') &&
                          req.url !== '/admin'

    return (checkBodyCacheOption &&
        checkQueryCacheOption &&
        checkStatusForCacheOption &&
        checkEnvForCacheOption) || ((
            checkStaticRouteForCacheOption ||
            dynamicUrlMatch)
        && notCacheUrls)
}

const cacheSuccesses = cache('480 minutes', cacheOn);

module.exports = cacheSuccesses
