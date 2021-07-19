let subSiteMapsController = {};
const postSchema = require('../models/postSchema');

subSiteMapsController.siteMap = (req, res) => {

    let month = req.params.month;
    let pageNo = req.params.pageNo;
    pageNo = parseInt(pageNo.replace('.xml', ''));
    let parsedDate = new Date(month);
    let postsElements;
    let xmlTemplate;
    let renderPostData;
    const size = 500;

    postSchema.find({ lastModify: { $gte: parsedDate } }).select(' title , lastModify , postType ').limit(size).skip(size * (pageNo - 1)).exec().then(posts => {

        renderPostData = posts.map(post => {

            if (post) {
                let lastModify = new Date(post.lastModify);
                let postUrl =process.env.REACT_APP_PRODUCTION_URL + (`/${post.postType}/` || '/post/')+ encodeURIComponent(post.title)+'?id=' + post._id
                postsElements += '<url> \n ' +
                    `<loc>${ postUrl }</loc>\n` +
                    `<lastmod>${ lastModify.toISOString() }</lastmod>\n` +
                    '<changefreq>always</changefreq>\n' +
                    '<priority>0.6</priority>\n' +
                    '</url>'
            }

        });
    }).then(() => {

        postsElements = postsElements.replace('undefined', '');
        xmlTemplate =
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n' +
            '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            postsElements +
            '\\n' +
            '</urlset>';

        res.set('Content-Type', 'text/xml');
        res.send(xmlTemplate);
        res.end()
    }).catch(err => {
        console.log(err)
    })
};

module.exports = subSiteMapsController;