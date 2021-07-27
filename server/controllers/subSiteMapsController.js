let subSiteMapsController = {};
const postSchema = require('../models/postSchema');
const moment = require('moment');

subSiteMapsController.subSiteMapsController = (req, res) => {

    let month = req.params.month;
    let pageNo = req.params.pageNo;
    pageNo = parseInt(pageNo.replace('.xml', ''));
    let parsedDate = new Date(month);
    const endDate = moment(parsedDate).add(1, 'M').format('YYYY-MM-DD hh:mm:ss A Z')        ;

    let postsElements;
    let xmlTemplate;
    let renderPostData;
    const size = 500;

    postSchema.find({ createdAt: { $gte: parsedDate,$lt: endDate } }).select(' title , lastModify , postType , createdAt , updatedAt').limit(size).skip(size * (pageNo - 1)).exec().then(posts => {
        renderPostData = posts.map(post => {
            if (post) {
                let lastModify = new Date(post.createdAt || post.lastModify || post.updatedAt|| post._id.getTimestamp());

                let postUrl =process.env.REACT_APP_PRODUCTION_URL + `/post/${post.postType}/${post._id}` ;
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