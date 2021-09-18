let siteMapsController = {}
const postSchema = require('../../models/postSchema');
const moment = require('moment');
siteMapsController.siteMapMonths = (req, res) => {

    let month = req.params.month;
    let pageNo = req.params.pageNo;
    const size = 500;
    if (month) {
        month = month.replace('.xml', '')
    }
    if (pageNo) {
        pageNo = parseInt(pageNo.replace('.xml', ''))
    } else {
        pageNo = 1
    }

    let parsedDate = new Date(month);

    const endDate = moment(parsedDate).add(1, 'M').format('YYYY-MM-DD hh:mm:ss A Z');
    const findPostsOptions = { $and:[{createdAt: { $gte: parsedDate,$lt: endDate }},{status:'published'}] }
    postSchema.countDocuments(findPostsOptions).exec().then(count => {

        let postsElements;
        let subSiteMaps;
        let xmlTemplate;
        let renderPostData;
        if (count <= size) {
            postSchema.find({ createdAt: { $gte: parsedDate,$lt: endDate } }).select(' title , lastModify , postType ').limit(size).skip(size * (pageNo - 1)).exec().then(posts => {
                renderPostData = posts.map(post => {
                    //let postUrl =process.env.REACT_APP_PRODUCTION_URL + (`/${post.postType}/` || '/post/')+ encodeURIComponent(post.title)+'?id=' + post._id
                    let postUrl =process.env.REACT_APP_PRODUCTION_URL + `/post/${post.postType}/${post._id}` ;
                    let lastModify = new Date(post.updatedAt || post.lastModify || post.createdAt || post._id.getTimestamp());

                    postsElements +=
                        '<url>\n' +
                        `<loc>${ postUrl }</loc>\n` +
                        `<lastmod>${ lastModify.toISOString()}</lastmod>\n` +
                        '<changefreq>never</changefreq>\n' +
                        '<priority>1</priority>\n' +
                        '</url>'
                });
            }).then(() => {
                xmlTemplate =
                    '<?xml version="1.0" encoding="UTF-8"?>\n' +
                    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n' +
                    '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
                    `${ postsElements }\n` +
                    '</urlset>';
                res.set('Content-Type', 'text/xml');
                res.send(xmlTemplate)
                res.end()
            }).catch(err => {
                console.log(err)
            })
        } else {
            let page = 0;
            const totalPages = Math.ceil(count / size);
            console.log('xxxx')
            while ( page < totalPages ) {
                page += 1;
                subSiteMaps +=
                    '<sitemap>\n' +
                    `<loc>${process.env.REACT_APP_PRODUCTION_URL }/sitemap/${ month }/${ page }.xml</loc>\n` +
                    `<lastmod>${endDate}</lastmod>\n` +
                    ' </sitemap>\n'
            }
            xmlTemplate = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n' +
                '<!-- generated-on="${toDay.toUTCString()}" -->\n' +
                ' <sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
                `${ subSiteMaps }` +
                '</sitemapindex>';
            res.set('Content-Type', 'text/xml');
            res.send(xmlTemplate);
            res.end()
        }
    });
};
module.exports = siteMapsController

