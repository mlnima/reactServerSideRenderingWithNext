let subSiteMapsController = {};
const postSchema = require('../../models/postSchema');
const moment = require('moment');

subSiteMapsController.subSiteMapsController = async (req, res) => {

    let month = req.params.month;
    let pageNamePath = req.params?.pageNo?.replace('.xml', '') || req.params?.pageNo || 1
    let pageNo = req.params.pageNo ? parseInt(pageNamePath) : 1;
    let startDate = new Date(month + '-01');

    const endDate = moment(startDate).add(1, 'M').format('YYYY-MM-DD hh:mm:ss A Z');

    let postsElements;
    let xmlTemplate;
    let renderPostData;
    const size = 500;

    const postQuery = {$or:[
            {$and: [{'createdAt': {$gte: startDate}}, {'createdAt': {$lte: endDate}}, {status: 'published'},{updatedAt: {$exists: false}}]},
            {$and: [{'updatedAt': {$gte: startDate}}, {'updatedAt': {$lte: endDate}}, {status: 'published'},{updatedAt: {$exists: true}}]},
        ]}
    postSchema.find(postQuery)
        .select(' title , lastModify , postType , createdAt , updatedAt')
        .limit(size)
        .skip(size * (pageNo - 1))
        .exec().then(posts => {
        renderPostData = posts.map(post => {
            if (post) {
                let lastModify = new Date(post?.updatedAt ||post?.createdAt   || post?._id?.getTimestamp());
                let postUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL + `/post/${post?.postType}/${post._id}`;
                postsElements += `
                   <url>
                    <loc>${postUrl}</loc>
                    <lastmod>${lastModify.toISOString()}</lastmod>
                    <changefreq>always</changefreq>
                    <priority>1</priority>
                   </url>
                `
            }
        });
    }).then(() => {

        postsElements = postsElements?.replace('undefined', '') || '';


        xmlTemplate =`<?xml version="1.0" encoding="UTF-8"?>
        <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
        <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${postsElements}
        </urlset>
        `

        res.set('Content-Type', 'text/xml');
        res.send(xmlTemplate);

    }).catch(err => {
        console.log(err)
    })
};

export default subSiteMapsController;


// let month = req.params.month;
// let pageNo = req.params.pageNo ? parseInt(req.params.pageNo.replace('.xml', '')) : 1;
// let startDate = new Date(month + '-01');
//
// const endDate = moment(startDate).add(1, 'M').format('YYYY-MM-DD hh:mm:ss A Z');
//
// let postsElements;
// let xmlTemplate;
// let renderPostData;
// const size = 500;
//
// const postQuery = {$or:[
//         {$and: [{'createdAt': {$gte: startDate}}, {'createdAt': {$lte: endDate}}, {status: 'published'},{updatedAt: {$exists: false}}]},
//         {$and: [{'updatedAt': {$gte: startDate}}, {'updatedAt': {$lte: endDate}}, {status: 'published'},{updatedAt: {$exists: true}}]},
//     ]}
// postSchema.find(postQuery)
//     .select(' title , lastModify , postType , createdAt , updatedAt')
//     .limit(size)
//     .skip(size * (pageNo - 1))
//     .exec().then(posts => {
//     renderPostData = posts.map(post => {
//         if (post) {
//             let lastModify = new Date(post.updatedAt|| post.lastModify  ||post.createdAt   || post._id.getTimestamp());
//             let postUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL + `/post/${post?.postType}/${post._id}`;
//             postsElements += `
//                    <url>
//                     <loc>${postUrl}</loc>
//                     <lastmod>${lastModify.toISOString()}</lastmod>
//                     <changefreq>always</changefreq>
//                     <priority>1</priority>
//                    </url>
//                 `
//         }
//     });
// }).then(() => {
//
//     postsElements = postsElements.replace('undefined', '');
//     xmlTemplate =
//         '<?xml version="1.0" encoding="UTF-8"?>\n' +
//         '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n' +
//         '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
//         postsElements +
//         '\\n' +
//         '</urlset>';
//
//     res.set('Content-Type', 'text/xml');
//     res.send(xmlTemplate);
//
// }).catch(err => {
//     console.log(err)
// })