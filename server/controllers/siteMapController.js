let siteMapController = {};
const postSchema = require('../models/postSchema');
const moment = require('moment');

const getDates = (startDate, stopDate) => {
    let dateArray = [];
    let beginDate = moment(startDate);
    let endDate = moment(stopDate);

    dateArray.push(moment(beginDate).format('YYYY-MM'))
    while (beginDate < endDate) {
        dateArray.push(moment(beginDate).add(1, 'M').format('YYYY-MM'))
        beginDate = moment(beginDate).add(1, 'M');
    }

    return [...new Set(dateArray)];
};

siteMapController.siteMap = (req, res) => {

    const oldestPost = postSchema.find({status: 'published'}).limit(1).sort([['createdAt', 1],['_id', 1] ]).exec();
    const lastPost = postSchema.find({status: 'published'}).limit(1).sort([['createdAt', -1],['_id', -1] ]).exec();

    const toDay = new Date();
    Promise.all([oldestPost, lastPost]).then(firstAndLastPostData => {

        const  firstPostDate = firstAndLastPostData[0][0].createdAt || firstAndLastPostData[0][0].updatedAt || firstAndLastPostData[0][0].lastModify || firstAndLastPostData[0][0]._id.getTimestamp()
        const lastPostDate = firstAndLastPostData[1][0].createdAt || firstAndLastPostData[1][0].updatedAt || firstAndLastPostData[1][0].lastModify || firstAndLastPostData[0][0]._id.getTimestamp()

        const firstMonthAndYear = firstPostDate.getFullYear() + "/" + (firstPostDate.getMonth() + 1)
        const lastMonthAndYear = lastPostDate.getFullYear() + "/" + (lastPostDate.getMonth() + 1)

        let data = {
            firstMonthAndYear,
            lastMonthAndYear,
            currentMonthAndYear: toDay.getFullYear() + "/" + (toDay.getMonth() + 1),
            allMonthsSinceStart: [],
        };

        if (data.firstMonthAndYear === data.lastMonthAndYear) {
            data.allMonthsSinceStart = [data.firstMonthAndYear]
        } else {
            data.allMonthsSinceStart = getDates(data.firstMonthAndYear, data.lastMonthAndYear);
        }

        let monthsSiteMap = ``;
        data.allMonthsSinceStart.forEach(month => {
            let fixedMonth = month.includes('/') ? month.replace('/', '-') : month
            monthsSiteMap +=
                '<sitemap>\n' +
                `<loc>${process.env.REACT_APP_PRODUCTION_URL}/sitemaps/${fixedMonth}.xml</loc>\n` +
                `<lastmod>${toDay.toISOString()}</lastmod>\n` +
                ' </sitemap>\n'
        });

        let sitemapDataWithParser = '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n' +
            `<!-- generated-on="${toDay.toUTCString()}" --> \n` +
            ' <sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            `${monthsSiteMap}` +
            '</sitemapindex>';

        res.set('Content-Type', 'text/xml');
        res.send(sitemapDataWithParser);
        res.end()
    }).catch(err => {
console.log(err )
        res.end()
    })
};

module.exports = siteMapController;