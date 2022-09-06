"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var apicache_1 = tslib_1.__importDefault(require("apicache"));
var cache = apicache_1.default.middleware;
apicache_1.default.options({
    // debug: process.env.NODE_ENV !== 'production',
    // debug: true,
    appendKey: function (req, res) {
        var userAgent = req.headers['user-agent'];
        var isMobile = Boolean(userAgent === null || userAgent === void 0 ? void 0 : userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
        return '-' + (isMobile ? 'Mobile' : 'Desktop');
    },
    //@ts-ignore
    statusCode: {
        include: [200]
    },
    enable: process.env.NODE_ENV === 'production'
});
var cacheOn = function (req, res) {
    var checkAbsoluteConditions = (req.body.cache === 'true' || !req.body.cache) &&
        (req.query.cache === 'true' || !req.query.cache) &&
        req.body.cache !== 'false' && req.query.cache !== 'false' &&
        res.statusCode === 200 &&
        process.env.NODE_ENV === 'production';
    var checkStaticRouteForCacheOption = req.url.includes('/manifest.json') ||
        req.url.includes('/robots.txt') ||
        req.url.includes('/sitemap') ||
        req.url.includes('/sw.js');
    var notCacheUrls = !req.url.includes('/workbox/') &&
        !req.url.includes('/workbox') &&
        !req.url.includes('/admin/') &&
        !req.url.includes('/_next') &&
        req.url !== '/admin';
    return checkAbsoluteConditions && (checkStaticRouteForCacheOption || notCacheUrls);
};
var cacheSuccesses = cache('30 minutes', cacheOn);
exports.default = cacheSuccesses;
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
//# sourceMappingURL=apiCache.js.map