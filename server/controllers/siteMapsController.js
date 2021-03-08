let siteMapsController = {}
const postSchema = require('../models/postSchema');
const settingSchema = require('../models/settings/settingSchema');
let siteProtocol ='http'


settingSchema.findOne({type:'identity'}).exec().then(setting=>{

    siteProtocol = setting? setting.data ? setting.data.siteProtocol || 'http':'http':'http'
}).catch(err=>{
    console.log( err)
    siteProtocol = 'http'
})


siteMapsController.siteMapMonths = (req, res) => {
    //const requestPath = siteProtocol + '://' + req.get('host') + '/'
    const requestPath = (process.env.REACT_APP_SSL ? 'https': siteProtocol) + '://' + req.get('host') + '/'
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

    postSchema.countDocuments({ lastModify: { $gte: parsedDate } }).exec().then(count => {

        let postsElements;
        let subSiteMaps;
        let xmlTemplate;
        let renderPostData;
        if (count <= size) {
            postSchema.find({ lastModify: { $gte: parsedDate } }).select(' title , lastModify ').limit(size).skip(size * (pageNo - 1)).exec().then(posts => {
                renderPostData = posts.map(post => {
                    let postUrl =requestPath + 'post/'+ encodeURIComponent(post.title)+'?id=' + post._id
                    postsElements +=
                        '<url>\n' +
                        `<loc>${ postUrl }</loc>\n` +
                        `<lastmod>${ post.lastModify }</lastmod>\n` +
                        '<changefreq>always</changefreq>\n' +
                        '<priority>0.6</priority>\n' +
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
            console.log('bigger than 500')
            let page = 0;
            const totalPages = Math.ceil(count / size);
            while ( page < totalPages ) {
                page += 1;
                subSiteMaps +=
                    '<sitemap>\n' +
                    `<loc>${requestPath }sitemap/${ month }/${ page }.xml</loc>\n` +
                    `<lastmod>2019-12-21T08:00:46+00:00</lastmod>\n` +
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