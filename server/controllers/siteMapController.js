let siteMapController = {};
const postSchema = require('../models/postSchema');
const moment = require('moment');
const xml = require('xml');
const DOMParser = require('xmldom').DOMParser;

const getDates = (startDate, stopDate) => {
    let dateArray = [];
    let currentDate = moment(startDate);
    let endDate = moment(stopDate);
    while ( currentDate <= endDate ) {
        dateArray.push(moment(currentDate).format('YYYY-MM'))
        dateArray.push(moment(currentDate).add(1, 'M').format('YYYY-MM'))
        currentDate = moment(currentDate).add(1, 'M');
    }
    return dateArray;
};

siteMapController.siteMap = (req, res) => {
    const oldestPost = postSchema.find({}).limit(1).sort('_id').exec();
    const lastPost = postSchema.find({}).limit(1).sort('-_id').exec();

    const toDay = new Date();
    Promise.all([ oldestPost, lastPost ]).then(firstAndLastPostData => {
        let data = {
            // oldestPostDate: firstAndLastPostData[0][0].lastModify,
            firstMonthAndYear: firstAndLastPostData[0][0].lastModify.getFullYear() + "/" + (firstAndLastPostData[0][0].lastModify.getMonth() + 1),
            lastMonthAndYear: firstAndLastPostData[1][0].lastModify.getFullYear() + "/" + (firstAndLastPostData[1][0].lastModify.getMonth() + 1),
            currentMonthAndYear: toDay.getFullYear() + "/" + (toDay.getMonth() + 1),
            allMonthsSinceStart: [],
        };

        data.allMonthsSinceStart = getDates(data.firstMonthAndYear, data.lastMonthAndYear);
        let monthsSiteMap = ``;
//***
        data.allMonthsSinceStart.forEach(month => {
            monthsSiteMap +=
                '<sitemap>\n' +
                `<loc>${ process.env.REACT_APP_DOMAIN_NAME }sitemaps/${ month }.xml</loc>\n` +
                `<lastmod>${ toDay.toISOString() }</lastmod>\n` +
                ' </sitemap>\n'
        });

        let sitemapDataWithParser = '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n' +
            `<!-- generated-on="${ toDay.toUTCString() }" --> \n` +
            ' <sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            `${ monthsSiteMap }` +
            '</sitemapindex>';

        res.set('Content-Type', 'text/xml');
        res.send(sitemapDataWithParser);
        res.end()
    }).catch(err => {

        res.end()
    })
};

module.exports = siteMapController;