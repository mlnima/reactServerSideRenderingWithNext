let siteMapController = {};
const postSchema = require('../../models/postSchema');
const moment = require('moment');
const toDay = new Date();

const monthsSitemapGenerator = async (allMonthsSinceStart) => {
    let finalXML = ''
    for await (const month of allMonthsSinceStart) {
        const fixedMonth = month.includes('/') ? month.replace('/', '-') : month;

        const startDate = new Date(month + '-01');
        const endDate = moment(startDate).endOf('month');

//{createdAt: {$exists: true}}
        const postQuery = {$or:[
                {$and: [{'createdAt': {$gte: startDate}}, {'createdAt': {$lte: endDate}}, {status: 'published'},{updatedAt: {$exists: false}}]},
                {$and: [{'updatedAt': {$gte: startDate}}, {'updatedAt': {$lte: endDate}}, {status: 'published'},{updatedAt: {$exists: true}}]},
            ]}

       // const postCountInThisMonth = await postSchema.countDocuments({$and: [{'createdAt': {$gte: startDate}}, {'updatedAt': {$lte: endDate}}, {status: 'published'}]});
        const postCountInThisMonth = await postSchema.countDocuments(postQuery).exec();

        // console.log(month,' : ',startDate,endDate,' count : ',postCountInThisMonth)
        // console.log(convertedStartDate,convertedEndDate,postCountInThisMonth)
        const lastDocumentUpdatedDate = await postSchema.findOne(postQuery)
            .select(['createdAt', 'updatedAt'])
            .limit(1)
            .sort([['updatedAt', -1]]).exec()

        if (postCountInThisMonth > 0) {
            const lastUpdate = lastDocumentUpdatedDate.updatedAt ?
                new Date(lastDocumentUpdatedDate.updatedAt) :
                new Date(lastDocumentUpdatedDate.createdAt)

            finalXML += `<sitemap>
                            <loc>${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemaps/${fixedMonth}.xml</loc>
                            <lastmod>${lastUpdate.toISOString()}</lastmod>
                      </sitemap>`
        }
    }
    return finalXML
}

const metaAndStaticPagesSitemapGenerator = () => {
    const pages = ['pages', 'categories', 'tags', 'actors']
    return pages.map(page => {
        return `<sitemap>
                    <loc>${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemaps/${page}.xml</loc>
                    <lastmod>${toDay.toISOString()}</lastmod>
               </sitemap>`
    })
        .join('\n')
}

const getDates = (firstCreatedPostDate, lastUpdatedPostDate) => {
    try {
        let dateArray = [];
        let beginDate = moment(new Date(firstCreatedPostDate + '/01'));
        let endDate = moment(new Date(lastUpdatedPostDate + '/01')).endOf('month');
        dateArray.push(moment(beginDate).format('YYYY-MM'))

        while (beginDate < endDate) {
            dateArray.push(moment(beginDate).add(1, 'M').format('YYYY-MM'))
            beginDate = moment(beginDate).add(1, 'M');
        }

        return [...new Set(dateArray)].reverse();
    } catch (err) {
        console.log('getDates :', err)
    }

};


siteMapController.siteMap = async (req, res) => {

    try {
        // const oldestPost = await postSchema.findOne({$and:[{status: 'published'},{updatedAt: {$exists:true}}]})
        //     .select(['createdAt','updatedAt'])
        //     .sort([['updatedAt', 1]])
        //     .exec();

        const oldestPost = await postSchema.findOne({$and: [{status: 'published'}, {createdAt: {$exists: true}}]})
            .select(['createdAt', 'updatedAt'])
            .sort([['createdAt', 1]])
            .exec();

        const lastPost = await postSchema.findOne({$and: [{status: 'published'}, {updatedAt: {$exists: true}}]})
            .select(['createdAt', 'updatedAt'])
            .sort([['updatedAt', -1]])
            .exec();

        const firstCreatedPostDate = `${oldestPost.createdAt.getFullYear()}/${oldestPost.createdAt.getMonth() + 1}`
        const lastUpdatedPostDate = `${lastPost.updatedAt.getFullYear()}/${lastPost.updatedAt.getMonth() + 1}`

        let data = {
            currentMonthAndYear: `${toDay.getFullYear()}/${toDay.getMonth() + 1}`,
            rangeOfTheMonths: firstCreatedPostDate === lastUpdatedPostDate ?
                                    [firstCreatedPostDate] :
                                    getDates(firstCreatedPostDate, lastUpdatedPostDate),
        };

        let sitemapDataWithParser = `<?xml version="1.0" encoding="UTF-8"?>
                                        <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
                                          <!-- generated-on="${toDay.toUTCString()}" -->     
                                            <sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                                                          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                                                          http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd" 
                                                          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                                                          ${metaAndStaticPagesSitemapGenerator()}    
                                                          ${await monthsSitemapGenerator(data.rangeOfTheMonths)}
                                            </sitemapindex>`;

        res.set('Content-Type', 'text/xml');
        res.send(sitemapDataWithParser);


    } catch (err) {
        console.log(err)
        res.end()
    }

};

module.exports = siteMapController;