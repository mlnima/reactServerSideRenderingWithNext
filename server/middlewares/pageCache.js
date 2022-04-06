const cacheableResponse = require('cacheable-response')


const cacheManager = cacheableResponse({
    ttl: 1000 * 60 * 60, // 1hour
    get: async ({req, res, pagePath, queryParams}) => {
        try {
            return {data: await nextApp.renderToHTML(req, res, pagePath, queryParams)}
        } catch (e) {
            return {data: "error: " + e}
        }
    },
    send: ({data, res}) => {
        // res.send(data);
    }
});