let siteMapController = {};
// const mongoose = require("mongoose");
const postSchema = require('../models/postSchema');
const settingSchema = require('../models/settings/settingSchema');
const moment = require('moment');
// const xml = require('xml');
// const DOMParser = require('xmldom').DOMParser;
let siteProtocol ='http'

 settingSchema.findOne({type:'identity'}).exec().then(setting=>{
     siteProtocol = setting.data.siteProtocol || 'http'
 }).catch(err=>{
     console.log( err)
     siteProtocol = 'http'
 })



const getDates = (startDate, stopDate) => {
    let dateArray = [];
    let beginDate = moment(startDate);
    let endDate = moment(stopDate);

    dateArray.push(moment(beginDate).format('YYYY-MM'))
    while ( beginDate < endDate ) {
        dateArray.push(moment(beginDate).add(1, 'M').format('YYYY-MM'))
        beginDate = moment(beginDate).add(1, 'M');
    }

    return [...new Set(dateArray)];
};

siteMapController.siteMap = (req, res) => {
    const requestPath = siteProtocol + '://' + req.get('host') + '/'
    // const requestPath = 'https' + '://' + req.get('host') + '/'
    const oldestPost = postSchema.find({}).limit(1).sort({_id:1}).exec();
    const lastPost = postSchema.find({}).limit(1).sort({_id:-1}).exec();

    const toDay = new Date();
    Promise.all([ oldestPost, lastPost ]).then(firstAndLastPostData => {
        // console.log(firstAndLastPostData )
        let data = {
            // oldestPostDate: firstAndLastPostData[0][0].lastModify,
            firstMonthAndYear: firstAndLastPostData[0][0].lastModify? firstAndLastPostData[0][0].lastModify.getFullYear() + "/" + (firstAndLastPostData[0][0].lastModify.getMonth() +1 ):'',
            lastMonthAndYear: firstAndLastPostData[1][0].lastModify ? firstAndLastPostData[1][0].lastModify.getFullYear() + "/" + (firstAndLastPostData[1][0].lastModify.getMonth() +1 ):'',
            currentMonthAndYear: toDay.getFullYear() + "/" + (toDay.getMonth() + 1),
            allMonthsSinceStart: [],
        };

        if (data.firstMonthAndYear===data.lastMonthAndYear){
            data.allMonthsSinceStart = [data.firstMonthAndYear]
        }else {
            data.allMonthsSinceStart = getDates(data.firstMonthAndYear, data.lastMonthAndYear);
        }


        let monthsSiteMap = ``;
//***
        data.allMonthsSinceStart.forEach(month => {
            let fixedMonth = month.includes('/')?month.replace('/','-'):month

            monthsSiteMap +=
                '<sitemap>\n' +
                `<loc>${ requestPath }sitemaps/${ fixedMonth }.xml</loc>\n` +
                `<lastmod>${ toDay.toISOString()  }</lastmod>\n` +
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
// console.log(err )
        res.end()
    })
};

module.exports = siteMapController;