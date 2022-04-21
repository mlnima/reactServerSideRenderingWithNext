const apiCache = require('apicache')
const cache = apiCache.middleware;

apiCache.options({
    // debug: process.env.NODE_ENV !== 'production',
    // debug: true,
    appendKey: (req, res) => {
        const userAgent = req.headers['user-agent'];
        const isMobile = Boolean(userAgent?.match(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        ))

        return  '-' +  (isMobile  ? 'Mobile' : 'Desktop')
    },
    statusCode:{
        include:[200]
    },
    enable:process.env.NODE_ENV === 'production'
})

const cacheOn = (req, res) => {

    const checkAbsoluteConditions = (req.body.cache === 'true' || !req.body.cache) &&
                                         (req.query.cache === 'true' || !req.query.cache) &&
                                         req.body.cache !== 'false' && req.query.cache !== 'false'&&
                                         res.statusCode === 200 &&
                                         process.env.NODE_ENV === 'production'

    const checkStaticRouteForCacheOption =  req.url.includes('/manifest.json') ||
                                            req.url.includes('/robots.txt')||
                                            req.url.includes('/sitemap')||
                                            req.url.includes('/sw.js')

    const notCacheUrls =  !req.url.includes('/workbox/') &&
                          !req.url.includes('/workbox') &&
                          !req.url.includes('/admin/') &&
                          !req.url.includes('/_next') &&
                          req.url !== '/admin'

    return checkAbsoluteConditions &&  (checkStaticRouteForCacheOption || notCacheUrls)
}

const cacheSuccesses = cache('480 minutes', cacheOn);

module.exports = cacheSuccesses


//const dynamicUrlMatch = req.url.includes('/sitemaps/') || req.url.includes('/sitemap/')


//const isCacheOn = checkAbsoluteConditions &&  (checkStaticRouteForCacheOption || dynamicUrlMatch || notCacheUrls)
// if (req.path === '/tags'){
//     console.log('checkAbsoluteConditions',checkAbsoluteConditions)
//     console.log('dynamicUrlMatch',dynamicUrlMatch)
//     console.log('checkStaticRouteForCacheOption',checkStaticRouteForCacheOption)
//     console.log('notCacheUrls',notCacheUrls)
//     console.log(isCacheOn,' user-agent => ',req.headers['user-agent'].substring(15),req.path)
// }else{
//     console.log(isCacheOn,' path => ',req.path)
// }

// const checkBodyCacheOption = (req.body.cache === 'true' || !req.body.cache) && req.body.cache !== 'false' ;
// const checkQueryCacheOption = (req.query.cache === 'true' || !req.query.cache) && req.query.cache !== 'false';
// const checkStatusForCacheOption =  res.statusCode === 200;
// //const checkEnvForCacheOption = process.env.NODE_ENV === 'production'
// const checkEnvForCacheOption =true
// const dynamicUrlMatch = req.url.includes('/sitemaps/') || req.url.includes('/sitemap/')
// const checkStaticRouteForCacheOption = req.url.match( /\/manifest.json|\/robots.txt|\/sitemap.xml|\/sitemap|\/sw.js/g )
//
// const notCacheUrls =  !req.url.includes('/_next') &&
//                       !req.url.includes('/workbox/') &&
//                       !req.url.includes('/workbox') &&
//                       !req.url.includes('/admin/') &&
//                       req.url !== '/admin'