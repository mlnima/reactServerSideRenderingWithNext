// const cacheableResponse = require('cacheable-response')
//
//
// const ssrCache = cacheableResponse({
//     ttl: 1000 * 60 * 60, // 1hour
//     get: async ({ req, res }) => {
//         const rawResEnd = res.end
//         const data = await new Promise((resolve) => {
//             res.end = (payload) => {
//                 resolve(res.statusCode === 200 && payload)
//             }
//             app.render(req, res, req.path)
//         })
//         //res.end = rawResEnd
//         return { data }
//     },
//     send: ({ data, res }) => res.send(data),
// })
//
//
//
// module.exports = async (req, res, next) => {
//     let getCacheKey = req =>{
//         return req.url
//     }
//     const key = getCacheKey(req)
//
//     // End the request with page cache and bypass the rest code by omitting the next() and return
//     if (ssrCache.has(key)) {
//         res.setHeader('x-cache', 'HIT')
//         res.end(ssrCache.get(key))
//         return
//     }
//
//     // cache miss, then pass the control to the rest code to render by next() and cache rendered page by hooking the res.end method
//     res.setHeader('x-cache', 'MISS');
//     const _resEnd = res.end.bind(res)
//     res.end =  payload => {
//         if (res.statusCode === 200) {
//             ssrCache.set(key, payload)
//         }
//         return _resEnd(payload)
//     }
//     next()
// }