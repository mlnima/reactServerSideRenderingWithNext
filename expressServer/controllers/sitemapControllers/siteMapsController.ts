import {
    postsXmlTemplateGenerator,
    postXmlTemplateGenerator
} from "../../_variables/sitemapVariables/xmlTemplateGenerators";
import postSchema from '../../models/postSchema';
import moment from 'moment';

export const monthSitemapController = async (req, res)=>{
    try {
        if (req.params?.month){
            const cleanParams = req.params.month.replace('.xml', '')
            const splitParams =  cleanParams.split('-')
            const month = splitParams.slice(0,2)
            const page = splitParams.length === 3 ? splitParams[splitParams.length -1]: 1
            let startDate = new Date(month + '-01');
            const endDate = moment(startDate).endOf('month');
            const postsQuery = {$and: [{'createdAt': {$gte: startDate}}, {'createdAt': {$lte: endDate}}, {status: 'published'}]}
            const posts = await postSchema.find(postsQuery).limit(500).skip(500 * (page - 1)).exec()
            console.log(month,page)
            res.set('Content-Type', 'text/xml');
            res.send(
                postsXmlTemplateGenerator(
                    postXmlTemplateGenerator(posts)
                )
            );
        }
    }catch (error){
        console.log(error)
        res.send('something webt wrong')
    }
}


// let siteMapsController = {}

// const size = 500;
// const toDay = new Date();

// const renderPostsItems = async (posts)=>{
//     let postsElements = '';
//     for (const post of posts){
//         let postUrl =process.env.NEXT_PUBLIC_PRODUCTION_URL + `/post/${post?.postType}/${post._id}` ;
//         let lastModify = new Date(post.updatedAt);
//         postsElements += `<url>
//                                 <loc>${ postUrl }</loc>
//                                 <lastmod>${ lastModify.toISOString()}</lastmod>
//                                 <changefreq>always</changefreq>
//                                 <priority>1</priority>
//                           </url>`
//     }
//     return postsElements
// }

// siteMapsController.siteMapMonths = async (req, res) => {
//
//     try {
//         let month = req.params?.month ? req.params.month.replace('.xml', '') : null ;
//         let startDate = new Date(month + '-01');
//         const endDate = moment(startDate).endOf('month');
//         const postQuery = {$or:[
//                 {$and: [{'createdAt': {$gte: startDate}}, {'createdAt': {$lte: endDate}}, {status: 'published'},{updatedAt: {$exists: false}}]},
//                 {$and: [{'updatedAt': {$gte: startDate}}, {'updatedAt': {$lte: endDate}}, {status: 'published'},{updatedAt: {$exists: true}}]},
//             ]}
//
//
//        // const postsCountUpdatedInThisMonth = await postSchema.countDocuments({ $and:[{updatedAt: { $gte: parsedDate }},{updatedAt: {$lt: endDate }},{status:'published'}] }).exec()
//         const postsCountUpdatedInThisMonth = await postSchema.countDocuments(postQuery).exec()
//
//
//         if (postsCountUpdatedInThisMonth <= size && postsCountUpdatedInThisMonth !==0 ){
//             //const posts = await postSchema.find({ $and:[{updatedAt: { $gte: startDate }},{updatedAt: {$lt: endDate }},{status:'published'}] }).exec()
//             const posts = await postSchema.find(postQuery).exec()
//
//             const xmlTemplate = `<?xml version="1.0" encoding="UTF-8"?>
//                                  <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
//                                  <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//                                          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
//                                          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//                                   ${await renderPostsItems(posts) }
//                                  </urlset>`;
//             res.set('Content-Type', 'text/xml');
//             res.send(xmlTemplate)
//         }else if (postsCountUpdatedInThisMonth >= size && postsCountUpdatedInThisMonth !==0) {
//             let subSiteMaps='';
//             let page = 0;
//             const totalPages = Math.ceil(postsCountUpdatedInThisMonth / size);
//
//             while ( page < totalPages ) {
//                 page += 1;
//                 subSiteMaps += `<sitemap>
//                                   <loc>${process.env.NEXT_PUBLIC_PRODUCTION_URL }/sitemap/${ month }/${ page }.xml</loc>
//                                   <lastmod>${endDate.toISOString()}</lastmod>
//                                 </sitemap>`
//             }
//
//           const  xmlTemplate = `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
//                                 <!-- generated-on="${toDay.toUTCString()}" -->
//                                 <sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//                                               xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd"
//                                               xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//                                               ${ subSiteMaps }
//                                  </sitemapindex>`;
//
//             res.set('Content-Type', 'text/xml');
//             res.send(xmlTemplate);
//         }else {
//             const  xmlTemplate = `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
//                                 <!-- generated-on="${toDay.toUTCString()}" -->
//                                 <sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//                                               xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd"
//                                               xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//
//                                  </sitemapindex>`;
//
//             res.set('Content-Type', 'text/xml');
//             res.send(xmlTemplate);
//         }
//
//     }catch (err){
//         console.log('+500',err)
//         res.end()
//     }
// };
//
// export default siteMapsController;


